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
}

export default new RestaurantService();
