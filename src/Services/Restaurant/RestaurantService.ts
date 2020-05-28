import _ from "lodash";
import { createQueryBuilder, getConnection } from "typeorm";
import { IRestaurantService } from "../../Common/Interfaces/IRestaurantService";
import { Restaurants } from "./../../Database/Entities/Restaurants";

class RestaurantService implements IRestaurantService {
  public FetchCategories = async (res) => {
    try {
      return res.json(await createQueryBuilder("Restaurantcategory").getMany());
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  };

  public FetchSubcategories = async (res) => {
    try {
      res.json(await createQueryBuilder("Restaurantsubcategory").getMany());
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  };

  public FetchRestaurants = async (res) => {
    try {
      res.json(await createQueryBuilder("Restaurant").getMany());
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
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
      res.sendStatus(400);
    }
  };

  public FetchResorts = async (res) => {
    try {
      res.json(await createQueryBuilder("Resort").getMany());
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
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
      res.sendStatus(400);
    }
  };

  public FetchRestaurant = async (req, res) => {
    try {
      let result = await createQueryBuilder("Restaurants")
        .where("Restaurants.Id = :id", { id: req.params.id })
        .getOne();

      res.json(result ?? 1);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  };

  public AddNewRestaurant = async (req, res) => {
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into("Restaurants")
        .values(req.body)
        .execute();

      return res.send("Restaurant successfully created");
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  };

  public ModifyRestaurant = async (req, res) => {
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into("Restaurants")
        .values(req.body)
        .execute();

      return res.send("Restaurant successfully modified");
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  };

  public RemoveRestaurant = async (req, res) => {
    try {
      let response = await createQueryBuilder("Restaurants")
        .where("Restaurants.Id = :id", { id: req.params.id })
        .andWhere("Restaurants.ArchivedAt IS NULL")
        .getOne();

      if (!response) res.json(1);

      await getConnection()
        .createQueryBuilder()
        .update(Restaurants)
        .set({ archivedAt: new Date() })
        .where("Restaurants.Id = :id", { id: req.params.id })
        .execute();

      return res.send("Restaurant successfully removed");
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  };
}

export default new RestaurantService();
