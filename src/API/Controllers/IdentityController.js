const express = require("express");
const identitiyRouter = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const authorize = require("../../Shared/auth-middleware");

identitiyRouter.use(cors());
const InventoryService = require("../../Services/IdentityService");

identitiyRouter.post("/register", (req, res) => {
  InventoryService.RegisterUser(req.body, res);
});

identitiyRouter.post("/login", (req, res) => {
  InventoryService.LoginUser(req.body, res);
});

identitiyRouter.post("/confirmation/resend", (req, res) => {
  InventoryService.ResendConfirmation(req.body, res);
});

identitiyRouter.post("/confirmation/resetEmail", (req, res) => {
  InventoryService.ChangeConfirmationEmail(req.body, res);
});

identitiyRouter.get("/confirmation/:token", (req, res) => {
  InventoryService.ConfirmUser(req.params.token, res);
});

identitiyRouter.post("/testToken", authorize(), (req, res) => {
  jwt.verify(req.token, process.env.secretKey, (err, authData) => {
    res.send({ message: "Successfuly tested", authData: authData });
  });
});

identitiyRouter.post("/testAdminToken", authorize("role:read"), (req, res) => {
  jwt.verify(req.token, process.env.secretKey, (err, authData) => {
    res.send({ message: "Successfuly tested", authData: authData });
  });
});

module.exports = identitiyRouter;
