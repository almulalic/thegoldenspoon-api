import { Identity, User } from "../../Models/Entities";
import sequelize from "sequelize";
import { Country } from "../../Models/Entities/Country";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserService {
  public FetchAllUsers = async (req, res) => {
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

    const allUsers = await prisma.user.findMany();
    return res.json(allUsers);
  };
  public FetchUser = (req, res) => {
    User.findAll({
      include: [
        {
          model: Identity,
          where: {
            username: req.params.username ?? req.user.username,
            isConfirmed: true,
          },
          attributes: [],
        },
      ],
      attributes: [
        "id",
        "firstName",
        "lastName",
        "avatar",
        "countryId",
        "identity.username",
        "identity.email",
      ],
      raw: true,
    })
      .then((usersResponse) => {
        return res.send(usersResponse);
      })
      .catch((err) => {
        console.log(err);
        return res.json({ status: "error" });
      });
  };
}

export default new UserService();
