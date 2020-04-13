const express = require("express");
const identitiyRouter = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const authorize = require("../../Shared/auth-middleware");
const config = require("../../Shared/config");

identitiyRouter.use(cors());
var InventoryService = require("../../Services/IdentityService");

identitiyRouter.post("/register", (req, res) => {
  InventoryService.RegisterUser(req.body, res);
});

identitiyRouter.post("/login", (req, res) => {
  InventoryService.LoginUser(req.body, res);
});

identitiyRouter.post("/testToken", authorize(), (req, res) => {
  jwt.verify(req.token, config.secretKey, (err, authData) => {
    res.send({ message: "Successfuly tested", authData: authData });
  });
});

identitiyRouter.post("/testAdminToken", authorize("role:read"), (req, res) => {
  jwt.verify(req.token, config.secretKey, (err, authData) => {
    res.send({ message: "Successfuly tested", authData: authData });
  });
});

module.exports = identitiyRouter;
