import {
  RestaurantCategory,
  RestaurantSubcategory,
  Restaurant,
  UserRestaurantRecord,
} from "../../Models/Entities";

class RestaurantService {
  public FetchCategories = (res) => {
    RestaurantCategory.findAll().then((categoryReposne) => {
      return res.json(categoryReposne);
    });
  };

  public FetchExpandedCategories = (res) => {
    RestaurantCategory.findAll().then((categoriesResponse) => {
      let _expandedCategories = [];
      let _temp = {
        categoryData: {},
        subcategoryData: {},
      };
      // console.log(categoriesResponse[0]);
      // categoriesResponse.dataValues.forEach((category) => {
      //   RestaurantSubcategory.findAll({
      //     where: { categoryId: category.id },
      //   }).then((subcategoryResponse) => {
      //     _expandedCategories.push({
      //       categoryData: category,
      //       subcategoryData: subcategoryResponse,
      //     });
      //   });
      // });
      return res.json(_expandedCategories);
    });
  };

  public FetchSubcategires = (res) => {
    RestaurantSubcategory.findAll().then((resp) => {
      return res.json(resp);
    });
  };

  public FetchRestaurants = (res) => {
    Restaurant.findAll().then((resp) => {
      return res.json(resp);
    });
  };

  public FetchUserRecord = (id, res) => {
    UserRestaurantRecord.findAll({
      where: { userId: id },
      order: [["restaurantId", "ASC"]],
    }).then((resp) => {
      return res.json(resp);
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
        if (body.status !== 0) {
          restaurantRecord
            .update({ ...body })
            .then(() => {
              return res.json({ status: "Record successfully updated" });
            })
            .catch((err) => {
              console.log(err);
              return res.json({ status: "Error during update." });
            });
        } else {
          restaurantRecord
            .destroy()
            .then(() => {
              return res.json({ status: "Record successfully removed" });
            })
            .catch((err) => {
              console.log(err);
              return res.json({ status: "Error during removal." });
            });
        }
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
