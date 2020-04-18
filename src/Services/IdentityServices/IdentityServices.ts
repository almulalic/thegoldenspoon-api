import { EmailService } from "../EmailServices/EmailService";
import Identity from "../../Models/Entities/Identity";
import User from "../../Models/Entities/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import {
  RegisterUserDTO,
  ResendConfirmationDTO,
  ChangeConfirmationEmail,
  ConfirmUserDTO,
  LoginDTO,
} from "./DTO/index";
import {
  ResendConfirmationEnums,
  ChangeConfirmationEnums,
  RegisterEnums,
  ConfirmationEnums,
  LoginEnums,
} from "./Enums";

require("dotenv").config();

export interface IIdentityServices {
  RegisterUser(body: RegisterUserDTO, res: Response): any;
  ResendConfirmation(body: ResendConfirmationDTO, res: Response): any;
  ChangeConfirmationEmail(body: ChangeConfirmationEmail, res: any): any;
  ConfirmUser(token: ConfirmUserDTO, res: Response): any;
  LoginUser(body: LoginDTO, res: Response): any;
}

export class IdentityServices {
  static RegisterUser = (body: RegisterUserDTO, res) => {
    const userData = {
      FirstName: body.firstName,
      LastName: body.lastName,
      BornOn: require("moment")(body.bornOn).format("YYYY-MM-DD"),
      IdentityId: null,
      Role: body.role,
      Created: new Date(),
    };
    const userIdentityData = {
      Email: body.email,
      Username: body.username,
      Password: body.password,
      IsConfirmed: 0,
    };

    Identity.findOne({
      where: {
        [Op.or]: [
          {
            email: body.email,
          },
          { username: body.username },
        ],
      },
    })
      .then((user) => {
        if (!user) {
          bcrypt.hash(body.password, 10, (err, hash) => {
            userIdentityData.Password = hash;
            Identity.create(userIdentityData)
              .then((identityResponse: any) => {
                userData.IdentityId = identityResponse.dataValues.Id;
                User.create(userData)
                  .then(() => {
                    const confirmationEmailSuccess = EmailService.SendConfirmationEmail(
                      userData.IdentityId,
                      body
                    );

                    if (confirmationEmailSuccess)
                      return res.json({
                        status: RegisterEnums.RegisteredNeedsConfirmation,
                      });
                    else {
                      return res.json({
                        status: RegisterEnums.RegisteredConfirmationFailed,
                      });
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    Identity.findOne({
                      where: { Id: userData.IdentityId },
                    })
                      .then((tempIdentity) => {
                        tempIdentity.destroy();
                        console.log(tempIdentity);
                        return res.sendStatus(400)({
                          status: RegisterEnums.InternalServerError,
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                        return res.sendStatus(400)({
                          status: RegisterEnums.InternalServerError,
                        });
                      });
                  });
              })
              .catch((err) => {
                console.log(err);
                return res.sendStatus(400)({
                  status: RegisterEnums.InternalServerError,
                });
              });
          });
        } else {
          return res.json({ status: RegisterEnums.NotUniqueUser });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.sendStatus(400)({
          status: RegisterEnums.InternalServerError,
        });
      });
  };

  static ResendConfirmation = (body, res) => {
    Identity.findOne({
      where: {
        email: body.email,
      },
    })
      .then((identityResponse) => {
        if (identityResponse) {
          if (identityResponse.IsConfirmed)
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
      })
      .catch((err) => {
        console.log(err);
        return res.json(ResendConfirmationEnums.InternalServerError);
      });
  };

  static ChangeConfirmationEmail = (body, res) => {
    Identity.findOne({
      where: { username: body.username },
    })
      .then((identityResponse) => {
        if (identityResponse) {
          if (bcrypt.compareSync(body.password, identityResponse.Password)) {
            if (identityResponse.IsConfirmed)
              return res.json(ChangeConfirmationEnums.UserAlreadyConfirmed);
            else if (identityResponse.Email == body.newEmail)
              return res.json(ChangeConfirmationEnums.EmailMustBeNew);

            Identity.update(
              { Email: body.newEmail },
              { where: { Id: identityResponse.Id } }
            )
              .then(() => {
                return res.json(
                  ChangeConfirmationEnums.ConfirmationEmailSentSuccessfully
                );
              })
              .catch((err) => {
                console.log(err);
                return res.json(ChangeConfirmationEnums.InternalServerError);
              });
          } else {
            return res.json(ChangeConfirmationEnums.LoginDataNotValid);
          }
        } else {
          return res.json(ChangeConfirmationEnums.UserNotFound);
        }
      })
      .catch((err) => {
        console.log(err);
        return res.json(ChangeConfirmationEnums.UserNotFound);
      });
  };

  static ConfirmUser = (token, res) => {
    const decodedToken = jwt.verify(token, process.env.EMAIL_SECRET);

    Identity.findOne({
      where: { Id: decodedToken.userIdentityId },
    })
      .then((identityResponse) => {
        if (identityResponse.IsConfirmed)
          return res.json(ConfirmationEnums.UserAlreadyConfirmed);
        else {
          Identity.update(
            { IsConfirmed: 1, ConfirmedAt: new Date() },
            { where: { Id: identityResponse.Id } }
          )
            .then(() => {
              return res.json(ConfirmationEnums.UserSuccessfullyConfirmed);
            })
            .catch((err) => {
              console.log(err);
              return res.json(ConfirmationEnums.InternalServerError);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.json(ConfirmationEnums.ConfirmationTokenRejected);
      });
  };

  static LoginUser = (body, res) => {
    Identity.findOne({
      where: { [Op.or]: [{ email: body.email }, { username: body.email }] },
    })
      .then((identityResponse) => {
        if (identityResponse) {
          if (!identityResponse.IsConfirmed)
            return res.json(LoginEnums.AccountNotConfirmed);

          if (
            bcrypt.compareSync(
              body.password,
              identityResponse.dataValues.Password
            )
          ) {
            let token = jwt.sign(
              identityResponse.dataValues,
              process.env.JWT_SECRET,
              {
                expiresIn: "30m",
              }
            );
            return res.send(token);
          } else {
            return res.json(LoginEnums.LoginDataNotValid);
          }
        } else {
          return res.json(LoginEnums.UserDontExist);
        }
      })
      .catch((err) => {
        console.log(err);
        return res.json(LoginEnums.InternalServerError);
      });
  };
}
