import {
  RestaurantCategory,
  RestaurantSubcategory,
  Restaurant,
  UserRestaurantRecord,
  Identity,
  User,
} from "../../Models/Entities";
import _ from "lodash";

export interface IRestaurantService {
  FetchCategories(res);
  FetchSubcategories(res);
  FetchRestaurants(res);
  FetchUserRecord(req, res);
  UpdateRestaurantRecord(req, res);
  ModifyRestaurantRecord(req, res);
}

class RestaurantService implements IRestaurantService {
  public FetchCategories = (res) => {
    RestaurantCategory.findAll().then((categoryReposne) => {
      return res.json(categoryReposne);
    });
  };

  public FetchSubcategories = (res) => {
    RestaurantSubcategory.findAll().then((resp) => {
      return res.json(resp);
    });
  };

  public FetchRestaurants = (res) => {
    Restaurant.findAll().then((resp) => {
      return res.json(resp);
    });
  };

  public FetchUserRecord = (req, res) => {
    User.findOne({
      include: [
        {
          model: Identity,
          where: { username: req.params.username ?? req.user.username },
        },
      ],
      attributes: ["id"],
    })
      .then((userResponse) => {
        UserRestaurantRecord.findAll({
          where: { userId: userResponse.id },
          order: [["restaurantId", "ASC"]],
        }).then((resp) => {
          return res.json(resp);
        });
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  };

  public UpdateRestaurantRecord = (req, res) => {
    const { body } = req;
    UserRestaurantRecord.findOne({
      where: [{ userId: req.user.id, restaurantId: body.restaurantId }],
    }).then((restaurantRecord) => {
      if (restaurantRecord === null) {
        body.userId = req.user.id;
        UserRestaurantRecord.create({ ...body, created: new Date() })
          .then(() => {
            return res.json({ status: "Record successfully added" });
          })
          .catch((err) => {
            console.log(err);
            return res.json({ status: "Error during creation." });
          });
      } else {
        body.userId = req.user.id;
        restaurantRecord
          .update({ ...body })
          .then(() => {
            return res.json({ status: "Record successfully updated" });
          })
          .catch((err) => {
            console.log(err);
            return res.json({ status: "Error during update." });
          });
      }
    });
  };

  public ModifyRestaurantRecord = (body, res) => {
    UserRestaurantRecord.findOne({
      where: { username: body.username },
    }).then((userRecordResponse) => {});
  };
}

export default new RestaurantService();
