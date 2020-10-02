import _ from "lodash";
import { createQueryBuilder, getConnection } from "typeorm";
import { IRestaurantService } from "../../Common/Interfaces/IRestaurantService";
import { Restaurant } from "../../Database/Entities/Restaurant";

class RestaurantService implements IRestaurantService {
  public FetchRestaurants = async (res) => {
    try {
      res.json(
        await createQueryBuilder("Restaurant")
          .orderBy("Restaurant.CreatedAt", "DESC")
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
      res.json(await createQueryBuilder("Themepark").getMany());
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  };

  public FetchRestaurant = async (req, res) => {
    try {
      let result = await createQueryBuilder("Restaurant")
        .where("Restaurant.Id = :id", { id: req.params.id })
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
        .into("Restaurant")
        .values(req.body)
        .execute();

      return res.json("Restaurant successfully created");
    } catch (err) {
      console.log(err);
      res.json(1);
    }
  };

  public ModifyRestaurant = async (req, res) => {
    try {
      await getConnection()
        .createQueryBuilder()
        .update(Restaurant)
        .set(req.body)
        .where("Restaurants.Id = :id", { id: req.body.id })
        .execute();

      return res.json("Restaurant successfully modified");
    } catch (err) {
      console.log(err);
      res.json(1);
    }
  };

  public RemoveRestaurant = async (req, res) => {
    try {
      let response = await createQueryBuilder("Restaurants")
        .where("Restaurants.Id = :id", { id: req.params.id })
        .andWhere("Restaurants.ArchivedAt IS NULL")
        .getOne();

      if (!response) {
        res.json(1);
        return;
      }

      await getConnection()
        .createQueryBuilder()
        .update(Restaurant)
        .set({ archivedAt: new Date() })
        .where("Restaurants.Id = :id", { id: req.params.id })
        .execute();

      return res.send("Restaurant successfully removed");
    } catch (err) {
      console.log(err);
      res.json(1);
    }
  };
}

export default new RestaurantService();
