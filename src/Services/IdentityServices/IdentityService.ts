import { EmailService } from "../EmailServices/EmailService";
import Identity from "../../Models/Entities/Identity";
import User from "../../Models/Entities/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
require("dotenv").config();

const Op = require("Sequelize").Op;

export class IdentityService {
  static RegisterUser = (body, res) => {
    const userData = {
      FirstName: body.firstName,
      LastName: body.lastName,
      BornOn: require("moment")(body.bornOn).format("YYYY-MM-DD"),
      IdentityId: null,
      Role: body.role,
      Created: new Date(),
      IsConfirmed: 0,
    };
    const userIdentityData = {
      Email: body.email,
      Username: body.username,
      Password: body.password,
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
                        status: "Successfully registered,needs confirmation",
                      });
                    else {
                      return res.json({
                        status:
                          "Successfully registered but failed to generate confirmation token",
                      });
                    }
                  })
                  .catch((err) => {
                    Identity.findOne({
                      where: { Id: userData.IdentityId },
                    })
                      .then((tempIdentity) => {
                        tempIdentity.destroy();
                        return res.send("error: " + err.message);
                      })
                      .catch((err) => {
                        return res.send("error: " + err.message);
                      });
                  });
              })
              .catch((err) => {
                return res.send("error: " + err.message);
              });
          });
        } else {
          return res.json({ error: "User already exist" });
        }
      })
      .catch((err) => {
        return res.send("error " + err.message);
      });
  };

  static ResendConfirmation = (body, res) => {
    User.findOne({
      where: {
        email: body.email,
      },
    })
      .then((userDataResponse) => {
        if (userDataResponse) {
          if (userDataResponse.IsConfirmed)
            return res.json({ status: "User is already confirmed" });

          const confirmationEmailSuccess = EmailService.ResendConfirmationEmail(
            userDataResponse
          );
          if (confirmationEmailSuccess)
            return res.json({
              status: "Confirmation email successfully sent!",
            });
          else
            return res.json({
              status: "Failed to generate new token",
            });
        } else {
          return res.json({ error: "User already exist" });
        }
      })
      .catch((err) => {
        res.send({ error: "User not found" });
      });
  };

  static ChangeConfirmationEmail = (body, res) => {
    User.findOne({
      include: [{ include: [Identity], where: { username: body.username } }],
    })
      .then((userDataResponse) => {
        if (userDataResponse) {
          if (
            bcrypt.compareSync(
              body.password,
              userDataResponse.Identity.Password
            )
          ) {
            if (userDataResponse.IsConfirmed)
              return res.json({ status: "User is already confirmed" });

            Identity.update(
              { Email: body.newEmail },
              { where: { Id: userDataResponse.IdentityId } }
            )
              .then((novi) => {
                res.sendStatus(200);
              })
              .catch(() => {
                res.sendStatus(400);
              });
          } else {
            res.status(400).json({ error: "Login data not correct" });
          }
        } else {
          res.status(400).json({ error: "User dont not exist" });
        }
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  };

  static ConfirmUser = (token, res) => {
    const decodedToken = jwt.verify(token, process.env.EMAIL_SECRET);

    User.findOne({
      where: { identityId: decodedToken.userIdentityId },
    })
      .then((user) => {
        if (user.IsConfirmed) res.send({ message: "User already confirmed" });
        else {
          User.update(
            { IsConfirmed: 1 },
            { where: { IdentityId: user.IdentityId } }
          )
            .then(() => {
              res.send({ message: "User successfully confirmed" });
            })
            .catch(() => {
              res.send({ message: "Error occured" });
            });
        }
      })
      .catch((err) => {
        res.send({ error: "Confirmation token rejected" });
      });
  };

  static LoginUser = (body, res) => {
    User.findOne({
      include: [
        {
          model: Identity,
          $or: [{ email: body.email }, { username: body.email }],
        },
      ],
    })
      .then((userResponse) => {
        console.log(body);
        if (userResponse) {
          if (!userResponse.IsConfirmed)
            throw new Error("Confirm the account first.");

          if (
            bcrypt.compareSync(body.password, userResponse.Identity.Password)
          ) {
            let token = jwt.sign(
              userResponse.dataValues,
              process.env.JWT_SECRET,
              {
                expiresIn: "30m",
              }
            );
            res.send(token);
          } else {
            res.status(400).json({ error: "Login data not correct" });
          }
        } else {
          res.status(400).json({ error: "User dont not exist" });
        }
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  };
}
