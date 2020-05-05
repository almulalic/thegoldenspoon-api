import { Identity, User } from "../../Models/Entities";
import sequelize from "sequelize";

class UserService {
  public FetchAllUsers = (req, res) => {
    User.findAll({
      include: [{ model: Identity, attributes: [], isConfirmed: true }],
      attributes: [
        "id",
        "firstName",
        "lastName",
        "avatar",
        "country",
        "identity.username",
      ],
      raw: true,
      where: { id: { [sequelize.Op.not]: req.user.id } },
    })
      .then((usersResponse) => {
        return res.send(usersResponse);
      })
      .catch((err) => {
        console.log(err);
        return res.json({ status: "error" });
      });
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
        "country",
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
