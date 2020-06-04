import express from "express";
import cors from "cors";
import Auth from "../../Auth/Auth";
import IdentityService from "../../Services/Identity/IdentityService";

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
  IdentityService.ResetPasswordConfirm(req.params.token, req.body, res);
});

IdentityController.get("/isUniqueEmail/:email", (req, res) => {
  IdentityService.IsUniqueEmail(req.params.email, res);
});

IdentityController.get("/isUniqueUsername/:username", (req, res) => {
  IdentityService.IsUniqueUsername(req.params.username, res);
});

IdentityController.get("/validateToken/:token", (req, res) => {
  IdentityService.ValidateToken(req.params.token, res);
});

IdentityController.get("/decodeToken/:token", (req, res) => {
  IdentityService.DecodeToken(req.params.token, res);
});

IdentityController.post("/refreshToken", (body, res) => {
  IdentityService.RefreshToken(body, res);
});

export default IdentityController;
