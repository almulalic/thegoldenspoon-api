const express = require("express");
const usersRouter = express.Router();
const cors = require("cors");

var InventoryService = require("../../Services/IdentityService");
// const Service = require("../../Service/UserService");

usersRouter.use(cors());

usersRouter.post("/register", (req, res) => {
  InventoryService.RegisterUser(req.body, res);
});

usersRouter.post("/login", (req, res) => {
  InventoryService.LoginUser(req.body, res);
});

module.exports = usersRouter;
