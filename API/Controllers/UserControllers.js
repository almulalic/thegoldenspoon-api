const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

var User = require("../../Models/UserModel");
// const Service = require("../../Service/UserService");

users.use(cors());

process.env.SECRET_KEY = "secret";

users.post("/register", (req, res) => {
  const today = new Date();
  const userData = {
    FirstName: req.body.firstName,
    LastName: req.body.lastName,
    BornOn: req.body.BornOn,
    Email: req.body.email,
    Username: req.body.username,
    Password: req.body.password,
    created: today,
  };

  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.Password = hash;
          User.create(userData)
            .then((user) => {
              res.json({ status: user.Email + " successfully registered" });
            })
            .catch((err) => {
              res.send("error: " + err);
            });
        });
      } else {
        res.json({ error: "User already exist" });
      }
    })
    .catch((err) => {
      res.send("error " + err);
    });
});

users.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.Password)) {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });
          res.send(token);
        } else {
          res.status(400).json({ error: "Login data not correct" });
        }
      } else {
        res.status(400).json({ error: "User dont not exist" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

module.exports = users;
