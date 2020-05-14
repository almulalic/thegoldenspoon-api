import { createQueryBuilder } from "typeorm";
import { IUserInterface } from "../../Common/Interfaces/IUserInterface";

class UserService implements IUserInterface {
  public FetchAllUsers = async (req, res) => {
    try {
      res.json(
        await createQueryBuilder("User")
          .select([
            "User.id",
            "User.firstName",
            "User.middleName",
            "User.lastName",
            "User.username",
            "User.avatar",
          ])
          .leftJoinAndSelect("User.country", "Country")
          .getMany()
      );
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  };

  public FetchAllUsersWithSummary = async (req, res) => {
    try {
      res.json(
        await createQueryBuilder("User")
          .leftJoin("User.country", "Country")
          .getMany()
      );
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  };

  public FetchUser = async (req, res) => {
    try {
      res.json(
        await createQueryBuilder("User")
          .leftJoin("User.country", "Country")
          .where("User.username = :username", {
            username: req.params.username ?? req.user.username,
          })
          .getOne()
      );
    } catch (err) {
      res.sendStatus(400);
    }
  };
}

export default new UserService();
