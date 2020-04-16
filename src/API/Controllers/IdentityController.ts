import { IdentityService } from "../../Services/IdentityServices/IdentityService";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { Auth } from "../../Auth/Auth";

const IdentityController = express.Router();

IdentityController.use(cors());

IdentityController.post("/register", (req, res) => {
  IdentityService.RegisterUser(req.body, res);
});

IdentityController.post("/login", (req, res) => {
  IdentityService.LoginUser(req.body, res);
});

IdentityController.post("/confirmation/resend", (req, res) => {
  IdentityService.ResendConfirmation(req.body, res);
});

IdentityController.post("/confirmation/resetEmail", (req, res) => {
  IdentityService.ChangeConfirmationEmail(req.body, res);
});

IdentityController.get("/confirmation/:token", (req, res) => {
  IdentityService.ConfirmUser(req.params.token, res);
});

IdentityController.post("/testToken", Auth.Authorize(), (req: any, res) => {
  jwt.verify(req.token, process.env.secretKey, (err, authData) => {
    res.send({ message: "Successfuly tested", authData: authData });
  });
});

IdentityController.post(
  "/testAdminToken",
  Auth.Authorize("role:read"),
  (req: any, res) => {
    jwt.verify(req.token, process.env.secretKey, (err, authData) => {
      res.send({ message: "Successfuly tested", authData: authData });
    });
  }
);

export default IdentityController;
