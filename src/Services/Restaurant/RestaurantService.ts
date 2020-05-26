import _ from "lodash";
import { createQueryBuilder, getConnection } from "typeorm";
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

  public FetchNewRestaraunts = async (res) => {
    try {
      res.json(
        await createQueryBuilder("Restaurants")
          .orderBy("Restaurants.CreatedAt", "DESC")
          .getMany()
      );
    } catch (err) {
      console.log(err);
    }
  };

  public FetchResorts = async (res) => {
    try {
      res.json(await createQueryBuilder("Resort").getMany());
    } catch (err) {
      console.log(err);
    }
  };

  public FetchThemeParks = async (res) => {
    try {
      res.json(
        await createQueryBuilder("Themepark")
          .orderBy("Restaurants.CreatedAt", "DESC")
          .getMany()
      );
    } catch (err) {
      console.log(err);
    }
  };

  public AddNewRestaurant = async (req, res) => {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into("Restaurants")
      .values(req.body)
      .execute();

    return res.send("Restaurant successfully created");
  };
}

export default new RestaurantService();
