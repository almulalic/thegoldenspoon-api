import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import {
  ResendConfirmationEnums,
  ChangeConfirmationEnums,
  RegisterEnums,
  ConfirmationEnums,
  LoginEnums,
  TokenValidationEnums,
} from "./Enums";
import EmailService from "../EmailServices/EmailService";
import { ResetPasswordEnums } from "./Enums/ResetPasswordEnum";
import { ResetPasswordConfirmations } from "./Enums/ResetPasswordConfirmations";
import { Identity, User } from "../../Models/Entities";

require("dotenv").config();

export interface IIdentityService {
  RegisterUser(body, res): any;
  ResendConfirmation(body, res): any;
  ChangeConfirmationEmail(body, res): any;
  ConfirmUser(body, res): any;
  LoginUser(body, res): any;
  ResetPasswordRequest?(body, res): any;
  ResetPasswordConfim?(token, body, res): any;
}

class IdentityService implements IIdentityService {
  public RegisterUser = (body: any, res: any) => {
    Identity.findOne({
      where: { [Op.or]: [{ email: body.email }, { username: body.email }] },
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
            Identity.create({
              ...userIdentityData,
              password: hash,
            })
              .then((identityResponse) => {
                userData.identityId = identityResponse.dataValues.id;
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
                      where: { id: userData.identityId },
                    })
                      .then((tempIdentity) => {
                        tempIdentity.destroy();
                        return res.sendStatus(400)({
                          status: RegisterEnums.InternalServerError,
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                        return res.sendStatus(400).json({
                          status: RegisterEnums.InternalServerError,
                        });
                      });
                  });
              })
              .catch((err) => {
                console.log(err);
                return res.json({
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
        return res.json({
          status: RegisterEnums.InternalServerError,
        });
      });
  };

  public ResendConfirmation = (body, res) => {
    Identity.findOne({
      where: { email: body.email },
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
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.EMAIL_SECRET);

      Identity.findOne({
        where: { id: decodedToken.userIdentityId },
      })
        .then((identityResponse) => {
          if (identityResponse.isConfirmed) {
            res.status(200);
            return res.json(ConfirmationEnums.UserAlreadyConfirmed);
          } else {
            Identity.update(
              { isConfirmed: 1, confirmedAt: new Date() },
              { where: { Id: identityResponse.id } }
            )
              .then(() => {
                res.status(200);
                return res.json(ConfirmationEnums.UserSuccessfullyConfirmed);
              })
              .catch((err) => {
                console.log(err);
                res.status(200);
                return res.json(ConfirmationEnums.InternalServerError);
              });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(200);
          return res.json(ConfirmationEnums.ConfirmationTokenRejected);
        });
    } catch (err) {
      res.status(200);
      return res.json(ConfirmationEnums.ConfirmationTokenMalformed);
    }
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
            let accessToken = jwt.sign(
              {
                user: {
                  id: identityResponse.id,
                  username: identityResponse.username,
                  email: identityResponse.email,
                },
              },
              process.env.JWT_SECRET,
              {
                expiresIn: "5sec",
              }
            );

            let refreshToken = jwt.sign(
              {
                user: {
                  id: identityResponse.id,
                  username: identityResponse.username,
                  email: identityResponse.email,
                },
              },
              process.env.JWT_REFRESH_SECRET
            );

            identityResponse
              .update({ RefreshToken: refreshToken })
              .then(() => {
                res.status(200);
                return res.json({
                  accessToken: accessToken,
                  refreshToken: refreshToken,
                });
              })
              .catch(() => {
                res.status(200);
                return res.json(LoginEnums.InternalServerError);
              });
          } else {
            res.status(200);
            return res.json(LoginEnums.LoginDataNotValid);
          }
        } else {
          res.status(200);
          return res.json(LoginEnums.UserDontExist);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(200);
        return res.json(LoginEnums.InternalServerError);
      });
  };

  public ResetPassword = (body, res) => {
    Identity.findOne({
      where: { [Op.or]: [{ email: body.email }, { username: body.email }] },
    })
      .then((identityResponse) => {
        if (identityResponse) {
          if (!identityResponse.isConfirmed)
            return res.json(ResetPasswordEnums.UserNotConfirmed);

          const confirmationEmailSuccess = EmailService.SendResetPasswordEmail(
            identityResponse
          );

          if (confirmationEmailSuccess)
            return res.json(
              ResetPasswordEnums.ConfirmationEmailSentSuccessfully
            );
          else return res.json(ResetPasswordEnums.FailedToGenerateToken);
        } else {
          return res.json(ResetPasswordEnums.UserNotFound);
        }
      })
      .catch((err) => {
        console.log(err);
        return res.json(ResetPasswordEnums.InternalServerError);
      });
  };

  public ResetPasswordConfim = (token, body, res) => {
    const decodedToken = jwt.verify(token, process.env.PASSWORD_RESET_SECRET);

    Identity.findOne({
      where: { id: decodedToken.userIdentityId },
    })
      .then((identityResponse) => {
        bcrypt.hash(body.password, 10, (err, hash) => {
          Identity.update(
            { password: hash },
            { where: { Id: identityResponse.id } }
          )
            .then(() => {
              return res.json(
                ResetPasswordConfirmations.PasswordSuccessfullyChanged
              );
            })
            .catch((err) => {
              console.log(err);
              return res.json(
                ResetPasswordConfirmations.ConfirmationTokenRejected
              );
            });
        });
      })
      .catch((err) => {
        console.log(err);
        return res.json(ResetPasswordConfirmations.InternalServerError);
      });
  };

  public IsUniqueEmail = (email, res) => {
    Identity.findOne({ where: { email: email } }).then((IdentityResponse) => {
      if (IdentityResponse) return res.json(0);
      else return res.json(1);
    });
  };

  public IsUniqueUsername = (username, res) => {
    Identity.findOne({ where: { username: username } }).then(
      (IdentityResponse) => {
        if (IdentityResponse) return res.json(0);
        else return res.json(1);
      }
    );
  };

  public ValidateToken = (token, res) => {
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      Identity.findOne({
        where: { id: decodedToken.user.id },
      })
        .then((identityResponse) => {
          if (identityResponse) {
            res.status(200);
            return res.json(TokenValidationEnums.TokenValid);
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(200);
          return res.json(TokenValidationEnums.TokenRejected);
        });
    } catch (err) {
      console.log(err);
      res.status(200);
      return res.json(TokenValidationEnums.TokenMalformed);
    }
  };

  public DecodeToken = (token, res) => {
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      Identity.findOne({
        where: { id: decodedToken.user.id },
      })
        .then((identityResponse) => {
          if (identityResponse) {
            res.status(200);
            return res.json(decodedToken);
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(200);
          return res.json(TokenValidationEnums.TokenRejected);
        });
    } catch (err) {
      console.log(err);
      res.status(200);
      return res.json(TokenValidationEnums.TokenMalformed);
    }
  };

  public RefreshToken = (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken === null) return res.status(401);

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err) => {
      if (!err) {
        Identity.findOne({ where: { RefreshToken: refreshToken } })
          .then((identityResponse) => {
            let accessToken = jwt.sign(
              {
                user: {
                  id: identityResponse.id,
                  username: identityResponse.username,
                  email: identityResponse.email,
                },
              },
              process.env.JWT_SECRET,
              {
                expiresIn: "10sec",
              }
            );
            res.json({ accessToken: accessToken });
          })
          .catch((err) => {
            console.log(err);
            res.send(403);
          });
      } else {
        res.send(401);
      }
    });
  };
}

export default new IdentityService();
