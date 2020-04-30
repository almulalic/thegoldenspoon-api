import {
  RestaurantCategory,
  RestaurantSubcategory,
  Restaurant,
  UserRestaurantRecord,
  Identity,
  User,
} from "../../Models/Entities";
import _ from "lodash";

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

  public FetchUserRecord = (req, res) => {
    if (req.params.username) {
      User.findOne({
        include: [
          { model: Identity, where: { username: req.params.username } },
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
    } else {
      UserRestaurantRecord.findAll({
        where: { userId: req.user.id },
        order: [["restaurantId", "ASC"]],
      }).then((resp) => {
        return res.json(resp);
      });
    }
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

  public FetchUserStatistics = (req, res) => {
    UserRestaurantRecord.findAll({
      include: [Restaurant],
      where: { userId: req.params.uid ?? req.user.id },
    })
      .then((userDataResponse) => {
        let categoryTotals = Array(5).fill(0);
        let subcategoryTotals = Array(39).fill(0);
        let statusTotals = Array(3).fill(0);

        userDataResponse.map((record) => {
          categoryTotals[record.restaurant.categoryId - 1]++;
          subcategoryTotals[record.restaurant.subcategoryId - 1]++;
          statusTotals[record.status - 1]++;
        });

        res.json({
          total: userDataResponse.length,
          categoryTotal: categoryTotals,
          subcategoryTotals: subcategoryTotals,
          statusTotals: statusTotals,
          totalFavorites: _.filter(userDataResponse, (x) => {
            if (x.isFavorite) return x;
          }).length,
        });
      })
      .catch((err) => {
        console.log(err);
        res.send("error");
      });
  };
}

export default new RestaurantService();
