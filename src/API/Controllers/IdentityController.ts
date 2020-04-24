import express from "express";
import cors from "cors";
import IdentityService from "../../Services/IdentityService/IdentityService";
import Auth from "../../Auth/Auth";

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

IdentityController.post("/resetPassword", Auth.Authorize(), (req, res) => {
  IdentityService.ResetPassword(req.body, res);
});

IdentityController.get("/resetPasswordConfirmation/:token", (req, res) => {
  IdentityService.ResetPasswordConfim(req.params.token, req.body, res);
});

IdentityController.get("/isUniqueEmail/:email", (req, res) => {
  IdentityService.IsUniqueEmail(req.params.email, res);
});

IdentityController.get("/isUniqueUsername/:username", (req, res) => {
  IdentityService.IsUniqueUsername(req.params.username, res);
});

export default IdentityController;
