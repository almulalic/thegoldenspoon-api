import { IdentityServices } from "../../Services/IdentityServices/IdentityServices";
import express from "express";
import cors from "cors";

const IdentityController = express.Router();

IdentityController.use(cors());

IdentityController.post("/register", (req, res) => {
  IdentityServices.RegisterUser(req.body, res);
});

IdentityController.post("/login", (req, res) => {
  IdentityServices.LoginUser(req.body, res);
});

IdentityController.post("/confirmation/resend", (req, res) => {
  IdentityServices.ResendConfirmation(req.body, res);
});

IdentityController.post("/confirmation/resetEmail", (req, res) => {
  IdentityServices.ChangeConfirmationEmail(req.body, res);
});

IdentityController.get("/confirmation/:token", (req, res) => {
  IdentityServices.ConfirmUser(req.params.token, res);
});

export default IdentityController;
