import express from "express";
import cors from "cors";
import IdentityService from "../../Services/IdentityServices/IdentityService";

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

export default IdentityController;
