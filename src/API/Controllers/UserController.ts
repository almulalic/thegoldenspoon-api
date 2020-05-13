import express from "express";
import cors from "cors";
import Auth from "../../Auth/Auth";
import UserService from "../../Services/User/UserService";

const UserController = express.Router();

UserController.use(cors());

UserController.get("/fetchAllUsers", Auth.Authorize(), (req, res) => {
  UserService.FetchAllUsers(req, res);
});

UserController.get("/fetchUser/:username", Auth.Authorize(), (req, res) => {
  UserService.FetchUser(req, res);
});

UserController.get("/fetchUser", Auth.Authorize(), (req, res) => {
  UserService.FetchUser(req, res);
});

export default UserController;
