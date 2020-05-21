import _ from "lodash";
import { createQueryBuilder } from "typeorm";
import { IRestaurantService } from "../../Common/Interfaces/IRestaurantService";

class RestaurantService implements IRestaurantService {
  public FetchCategories = async (res) => {
    try {
      return res.json(await createQueryBuilder("Restaurantcategory").getMany());
    } catch (err) {
      console.log(err);
    }
  };

  public FetchSubcategories = async (res) => {
    try {
      res.json(await createQueryBuilder("Restaurantsubcategory").getMany());
    } catch (err) {
      console.log(err);
    }
  };

  public FetchRestaurants = async (res) => {
    try {
      res.json(await createQueryBuilder("Restaurant").getMany());
    } catch (err) {
      console.log(err);
    }
  };
}

export default new RestaurantService();
