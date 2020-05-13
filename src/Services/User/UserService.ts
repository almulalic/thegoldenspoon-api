import { Identity, User as UserOld } from "../../Models/Entities";
import sequelize from "sequelize";
import { Country } from "../../Models/Entities/Country";
import { getRepository, createQueryBuilder } from "typeorm";
import { User } from "../../Database/Entities/User";
import { Userrestaurantrecord } from "./../../Database/Entities/Userrestaurantrecord";

class UserService {
  public FetchAllUsers = async (req, res) => {
    try {
      res.json(
        await createQueryBuilder("User")
          .leftJoin("User.country", "Country")
          .getMany()
      );
    } catch (err) {
      res.sendStatus(400);
    }

    // User.findAll({
    //   include: [
    //     { model: Identity, attributes: [], isConfirmed: true },
    //     { model: Country, attributes: [] },
    //   ],
    //   attributes: [
    //     "id",
    //     "firstName",
    //     "lastName",
    //     "avatar",
    //     "countryId",
    //     "identity.username",
    //   ],
    //   raw: true,
    //   where: { id: { [sequelize.Op.not]: req.user.id } },
    // })
    //   .then((usersResponse) => {
    //     return res.send(usersResponse);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return res.json({ status: "error" });
    //   });
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

    // UserOld.findAll({
    //   include: [
    //     {
    //       model: Identity,
    //       where: {
    //         username: req.params.username ?? req.user.username,
    //         isConfirmed: true,
    //       },
    //       attributes: [],
    //     },
    //   ],
    //   attributes: [
    //     "id",
    //     "firstName",
    //     "lastName",
    //     "avatar",
    //     "countryId",
    //     "identity.username",
    //     "identity.email",
    //   ],
    //   raw: true,
    // })
    //   .then((usersResponse) => {
    //     return res.send(usersResponse);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return res.json({ status: "error" });
    //   });
  };
}

export default new UserService();
