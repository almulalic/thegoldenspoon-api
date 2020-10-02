import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  ResendConfirmationEnums,
  ChangeConfirmationEnums,
  RegisterEnums,
  ConfirmationEnums,
  LoginEnums,
  TokenValidationEnums,
} from "../../Common/Enumerations/Identity/Service";
import EmailService from "../../Email/EmailService";
import { ResetPasswordEnums } from "../../Common/Enumerations/Identity/Service/ResetPasswordEnum";
import { ResetPasswordConfirmations } from "../../Common/Enumerations/Identity/Service/ResetPasswordConfirmations";
import { IIdentityService } from "../../Common/Interfaces/IIdentityInterface";
import { createQueryBuilder, getConnection } from "typeorm";
import { classToPlain } from "class-transformer";

require("dotenv").config();

class IdentityService implements IIdentityService {
  public RegisterUser = async (body, res) => {
    let identityResponse;

    try {
      identityResponse = await createQueryBuilder("Identity")
        .where("Identity.email =:email", { email: body.email })
        .orWhere("Identity.username =:username", { username: body.usernaeme })
        .getOne();
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        status: RegisterEnums.InternalServerError,
      });
    }

    if (identityResponse)
      return res.status(409).send({
        status: RegisterEnums.NotUniqueUser,
      });

    const userData = {
      firstName: body.firstName,
      lastName: body.lastName,
      bornOn: require("moment")(body.bornOn).format("YYYY-MM-DD"),
      identityId: null,
      role: body.role,
      created: new Date(),
    };
    const userIdentityData = {
      email: body.email,
      username: body.username,
      password: body.password,
      isConfirmed: 0,
    };

    bcrypt.hash(body.password, 10, async (err, hash) => {
      let createResponse;

      try {
        createResponse = classToPlain(
          await getConnection()
            .createQueryBuilder()
            .insert()
            .into("Identity")
            .values({
              ...userIdentityData,
              password: hash,
            })
            .execute()
        );
      } catch (err) {
        console.log(err);
        return res.status(500).send({
          status: RegisterEnums.InternalServerError,
        });
      }

      userData.identityId = createResponse.identifiers[0].id;
      try {
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into("User")
          .values(userData)
          .execute();
      } catch (err) {
        console.log(err);
        await getConnection()
          .createQueryBuilder()
          .delete()
          .from("Identity")
          .where("id = :id", { id: userData.identityId })
          .execute();
        return res.status(500).send({
          status: RegisterEnums.InternalServerError,
        });
      }

      const confirmationEmailSuccess = EmailService.SendConfirmationEmail(
        userData.identityId,
        body
      );
      if (confirmationEmailSuccess)
        return res.json({
          status: RegisterEnums.RegisteredNeedsConfirmation,
        });
      else
        return res.json({
          status: RegisterEnums.RegisteredConfirmationFailed,
        });
    });
  };

  public ResendConfirmation = async (body, res) => {
    let identityResponse;

    try {
      identityResponse = await createQueryBuilder("Identity")
        .where("Identity.email =:email", { email: body.email })
        .getOne();
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        status: ResendConfirmationEnums.InternalServerError,
      });
    }

    if (identityResponse) {
      if (identityResponse.isConfirmed)
        return res.json(ResendConfirmationEnums.UserAlreadyConfirmed);

      const confirmationEmailSuccess = EmailService.ResendConfirmationEmail(
        identityResponse
      );
      if (confirmationEmailSuccess)
        return res.json(
          ResendConfirmationEnums.ConfirmationEmailSentSuccessfully
        );
      else return res.json(ResendConfirmationEnums.FailedToGenerateToken);
    } else {
      return res.json(ResendConfirmationEnums.UserNotFound);
    }
  };

  public ChangeConfirmationEmail = async (body, res) => {
    let identityResponse;

    try {
      identityResponse = await createQueryBuilder("Identity")
        .where("Identity.username =:username", { username: body.username })
        .getOne();
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        status: ResendConfirmationEnums.InternalServerError,
      });
    }

    if (identityResponse) {
      if (identityResponse.isConfirmed)
        return res.json(ResendConfirmationEnums.UserAlreadyConfirmed);

      if (identityResponse.email == body.newEmail)
        return res.json(ChangeConfirmationEnums.EmailMustBeNew);

      if (bcrypt.compareSync(body.password, identityResponse.password)) {
        try {
          await getConnection()
            .createQueryBuilder()
            .update("Identity")
            .set({ email: body.newEmail })
            .where("Identity.id = :id", {
              id: identityResponse,
            })
            .execute();
          return res.json(
            ChangeConfirmationEnums.ConfirmationEmailSentSuccessfully
          );
        } catch (err) {
          console.log(err);
          return res.json(ChangeConfirmationEnums.InternalServerError);
        }
      } else {
        return res.json(ChangeConfirmationEnums.UserNotFound);
      }
    }
  };

  public ConfirmUser = async (token, res) => {
    let decodedToken;
    let identityResponse;

    decodedToken = jwt.verify(token, process.env.EMAIL_SECRET);

    try {
      identityResponse = await createQueryBuilder("Identity")
        .where("Identity.username =:username", {
          username: decodedToken.username,
        })
        .getOne();
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        status: ResendConfirmationEnums.InternalServerError,
      });
    }

    if (identityResponse.isConfirmed) {
      res.status(200);
      return res.json(ConfirmationEnums.UserAlreadyConfirmed);
    } else {
      try {
        await getConnection()
          .createQueryBuilder()
          .update("Identity")
          .set({ isConfirmed: 1, dateConfimed: new Date() } as any)
          .where("Identity.id = :id", {
            id: identityResponse,
          })
          .execute();
        return res.json(
          ChangeConfirmationEnums.ConfirmationEmailSentSuccessfully
        );
      } catch (err) {
        console.log(err);
        return res.json(ChangeConfirmationEnums.InternalServerError);
      }
    }
  };

  public LoginUser = async (body, res) => {
    let userResponse;
    try {
      userResponse = await createQueryBuilder("User")
        .innerJoinAndSelect("User.identity", "Identity")
        .where("Identity.username =:username", { username: body.credential })
        .orWhere("Identity.email =:email", { email: body.credential })
        .getOne();
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        status: LoginEnums.InternalServerError,
      });
    }

    if (userResponse) {
      if (!userResponse.identity.isConfirmed)
        return res.json(LoginEnums.AccountNotConfirmed);

      if (bcrypt.compareSync(body.password, userResponse.identity.password)) {
        let accessToken = jwt.sign(
          {
            user: {
              id: userResponse.identity.id,
              username: userResponse.identity.username,
              email: userResponse.identity.email,
              firstName: userResponse.firstName,
              middleName: userResponse.middleName,
              lastName: userResponse.lastName,
              country: userResponse.country,
            },
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "20min",
          }
        );

        let refreshToken = jwt.sign(
          {
            user: {
              id: userResponse.identity.id,
              username: userResponse.identity.username,
              email: userResponse.identity.email,
              firstName: userResponse.firstName,
              middleName: userResponse.middleName,
              lastName: userResponse.lastName,
              country: userResponse.country,
            },
          },
          process.env.JWT_REFRESH_SECRET
        );

        try {
          await getConnection()
            .createQueryBuilder()
            .update("Identity")
            .set({ refreshToken: refreshToken })
            .where("Identity.id = :id", {
              id: userResponse.identity.id,
            })
            .execute();
          return res.json({
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
        } catch (err) {
          console.log(err);
          return res.json(LoginEnums.InternalServerError);
        }
      } else {
        res.status(200);
        return res.json(LoginEnums.LoginDataNotValid);
      }
    } else {
      res.status(200);
      return res.json(LoginEnums.UserDontExist);
    }
  };

  public ResetPassword = async (body, res) => {
    let identityResponse;

    try {
      identityResponse = await createQueryBuilder("Identity")
        .where("Identity.email =:email", { email: body.email })
        .getOne();
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        status: ResetPasswordEnums.InternalServerError,
      });
    }

    if (identityResponse) {
      if (!identityResponse.isConfirmed)
        return res.json(ResetPasswordEnums.UserNotConfirmed);

      const confirmationEmailSuccess = EmailService.SendResetPasswordEmail(
        identityResponse
      );

      if (confirmationEmailSuccess)
        return res.json(ResetPasswordEnums.ConfirmationEmailSentSuccessfully);
      else return res.json(ResetPasswordEnums.FailedToGenerateToken);
    } else {
      return res.json(ResetPasswordEnums.UserNotFound);
    }
  };

  public ResetPasswordConfirm = async (token, body, res) => {
    let identityResponse;
    const decodedToken = jwt.verify(token, process.env.PASSWORD_RESET_SECRET);

    try {
      identityResponse = await createQueryBuilder("Identity")
        .where("Identity.id =:id", { id: decodedToken.id })
        .getOne();
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        status: ResetPasswordConfirmations.InternalServerError,
      });
    }

    bcrypt.hash(body.password, 10, async (err, hash) => {
      try {
        await getConnection()
          .createQueryBuilder()
          .update("Identity")
          .set({ password: hash })
          .where("Identity.id = :id", {
            id: identityResponse.id,
          })
          .execute();
        return res.json(ResetPasswordConfirmations.PasswordSuccessfullyChanged);
      } catch (err) {
        console.log(err);
        return res.json(ResetPasswordConfirmations.ConfirmationTokenRejected);
      }
    });
  };

  public IsUniqueEmail = async (email, res) => {
    let identityResponse;

    try {
      identityResponse = await createQueryBuilder("Identity")
        .where("Identity.email =:email", { email: email })
        .getOne();
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        status: ResetPasswordConfirmations.InternalServerError,
      });
    }

    if (identityResponse) return res.json(0);
    else return res.json(1);
  };

  public IsUniqueUsername = async (username, res) => {
    let identityResponse;

    try {
      identityResponse = await createQueryBuilder("Identity")
        .where("Identity.username =:username", { username: username })
        .getOne();
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        status: ResetPasswordConfirmations.InternalServerError,
      });
    }

    if (identityResponse) return res.json(0);
    else return res.json(1);
  };

  public ValidateToken = async (token, res) => {
    let identityResponse;

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    try {
      identityResponse = await createQueryBuilder("Identity")
        .where("Identity.id =:id", { id: decodedToken.user.id })
        .getOne();
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        status: res.json(TokenValidationEnums.TokenMalformed),
      });
    }

    if (identityResponse) {
      res.status(200);
      return res.json(TokenValidationEnums.TokenValid);
    } else {
      res.status(200);
      return res.json(TokenValidationEnums.TokenRejected);
    }
  };

  public DecodeToken = async (token, res) => {
    let identityResponse;
    let decodedToken;

    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.log(err);
    }

    try {
      identityResponse = await createQueryBuilder("Identity")
        .where("Identity.id =:id", { id: decodedToken.user.id })
        .getOne();
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        status: TokenValidationEnums.TokenMalformed,
      });
    }

    if (identityResponse) {
      res.status(200);
      return res.json(decodedToken);
    } else {
      res.status(200);
      return res.json(TokenValidationEnums.TokenRejected);
    }
  };

  public RefreshToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    let userResponse;
    if (refreshToken === null) return res.status(401);

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err) => {
      if (!err) {
        try {
          userResponse = await createQueryBuilder("User")
            .innerJoinAndSelect("User.identity", "Identity")
            .where("Identity.refreshToken =:refreshToken", {
              refreshToken: refreshToken,
            })
            .getOne();
        } catch (err) {
          console.log(err);
          return res.status(500).send({
            status: TokenValidationEnums.TokenMalformed,
          });
        }

        if (userResponse) {
          let accessToken = jwt.sign(
            {
              user: {
                id: userResponse.identity.id,
                username: userResponse.identity.username,
                email: userResponse.identity.email,
                firstName: userResponse.firstName,
                middleName: userResponse.middleName,
                lastName: userResponse.lastName,
                country: userResponse.country,
              },
            },
            process.env.JWT_SECRET
          );
          res.json({ accessToken: accessToken });
        } else {
          res.send(403);
        }
      } else {
        res.send(401);
      }
    });
  };
}

export default new IdentityService();
