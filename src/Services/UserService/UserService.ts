import { Identity, User } from "../../Models/Entities";
import sequelize from "sequelize";

class UserService {
  public FetchAllUsers = (req, res) => {
    User.findAll({
      include: [{ model: Identity, attributes: [] }],
      attributes: [
        "id",
        "firstName",
        "lastName",
        "avatar",
        "country",
        "identity.username",
      ],
      raw: true,
      where: { id: { [sequelize.Op.not]: req.decodedToken.id } },
    })
      .then((usersResponse) => {
        return res.send(usersResponse);
      })
      .catch((err) => {
        console.log(err);
        return res.json({ status: "error" });
      });
  };
  public FetchUser = (username, res) => {
    User.findAll({
      include: [
        { model: Identity, where: { username: username }, attributes: [] },
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
