import Identity from "../../Models/Entities/Identity";
import User from "../../Models/Entities/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import {
  ResendConfirmationEnums,
  ChangeConfirmationEnums,
  RegisterEnums,
  ConfirmationEnums,
  LoginEnums,
} from "./Enums";
import EmailService from "../EmailServices/EmailService";

require("dotenv").config();

export interface IIdentityService {
  RegisterUser(body, res): any;
  ResendConfirmation(body, res): any;
  ChangeConfirmationEmail(body, res): any;
  ConfirmUser(body, res): any;
  LoginUser(body, res): any;
}

class IdentityService implements IIdentityService {
  public RegisterUser = (body: any, res: any) => {
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

          bcrypt.hash(body.password, 10, (err, hash) => {
            userIdentityData.password = hash;
            Identity.create(userIdentityData)
              .then((identityResponse) => {
                userData.identityId = identityResponse.dataValues.Id;
                User.create(userData)
                  .then(() => {
                    const confirmationEmailSuccess = EmailService.SendConfirmationEmail(
                      userData.identityId,
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
                      where: { Id: userData.identityId },
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

  public ResendConfirmation = (body, res) => {
    Identity.findOne({
      where: {
        email: body.email,
      },
    })
      .then((identityResponse) => {
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
      })
      .catch((err) => {
        console.log(err);
        return res.json(ResendConfirmationEnums.InternalServerError);
      });
  };

  public ChangeConfirmationEmail = (body, res) => {
    Identity.findOne({
      where: { username: body.username },
    })
      .then((identityResponse) => {
        if (identityResponse) {
          if (bcrypt.compareSync(body.password, identityResponse.password)) {
            if (identityResponse.isConfirmed)
              return res.json(ChangeConfirmationEnums.UserAlreadyConfirmed);
            else if (identityResponse.email == body.newEmail)
              return res.json(ChangeConfirmationEnums.EmailMustBeNew);

            Identity.update(
              { Email: body.newEmail },
              { where: { id: identityResponse.id } }
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

  public ConfirmUser = (token, res) => {
    const decodedToken = jwt.verify(token, process.env.EMAIL_SECRET);

    Identity.findOne({
      where: { id: decodedToken.userIdentityId },
    })
      .then((identityResponse) => {
        if (identityResponse.isConfirmed)
          return res.json(ConfirmationEnums.UserAlreadyConfirmed);
        else {
          Identity.update(
            { isConfirmed: 1, confirmedAt: new Date() },
            { where: { Id: identityResponse.id } }
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

  public LoginUser = (body, res) => {
    Identity.findOne({
      where: { [Op.or]: [{ email: body.email }, { username: body.email }] },
    })
      .then((identityResponse) => {
        if (identityResponse) {
          if (!identityResponse.isConfirmed)
            return res.json(LoginEnums.AccountNotConfirmed);

          if (
            bcrypt.compareSync(
              body.password,
              identityResponse.dataValues.password
            )
          ) {
            let token = jwt.sign(
              identityResponse.dataValues,
              process.env.JWT_SECRET,
              {
                expiresIn: "30min",
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

export default new IdentityService();
