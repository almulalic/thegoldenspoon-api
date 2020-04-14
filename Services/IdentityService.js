const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

var UserDTO = require("../Models/UserDTO");
var IdentityDTO = require("../Models/IdentityDTO");
var EmailService = require("./EmailService");

class IdentitiesService {
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

    IdentityDTO.findOne({
      where: {
        email: body.email,
      },
    })
      .then((user) => {
        if (!user) {
          bcrypt.hash(body.password, 10, (err, hash) => {
            userIdentityData.Password = hash;
            IdentityDTO.create(userIdentityData)
              .then((identityResponse) => {
                userData.IdentityId = identityResponse.dataValues.Id;
                UserDTO.create(userData)
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
                    IdentityDTO.findOne({
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
    IdentityDTO.findOne({
      where: {
        email: body.email,
      },
    })
      .then((userData) => {
        if (userData) {
          if (userData.IsConfirmed)
            return res.json({ status: "User is already confirmed" });

          const confirmationEmailSuccess = EmailService.ResendConfirmationEmail(
            userData
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

  static ConfirmUser = (token, res) => {
    const decodedToken = jwt.verify(token, process.env.EMAIL_SECRET);

    UserDTO.findOne({
      where: { identityId: decodedToken.userIdentityId },
    })
      .then((user) => {
        if (user.IsConfirmed) res.send({ message: "User already confirmed" });
        else {
          UserDTO.update(
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
    UserDTO.findOne({
      include: [{ model: IdentityDTO, where: { email: body.email } }],
    })
      .then((userResponse) => {
        if (userResponse) {
          if (!userResponse.IsConfirmed)
            throw new Error("Confirm the account first.");

          if (
            bcrypt.compareSync(body.password, userResponse.identity.Password)
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

module.exports = IdentitiesService;
