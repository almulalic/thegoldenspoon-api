import _ from "lodash";
import { classToPlain } from "class-transformer";
import { createQueryBuilder, getConnection } from "typeorm";
import { IRestaurantRecord } from "../../Common/Interfaces/IRestaurantRecord";

class RestaurantService implements IRestaurantRecord {
  public FetchUserRecord = async (req, res) => {
    try {
      let userDataResponse = classToPlain(
        await createQueryBuilder("User")
          .innerJoinAndSelect(
            "User.userrestaurantrecords",
            "Userrestaurantrecord"
          )
          .where("User.username = :username", {
            username: req.params.username ?? req.user.username,
          })
          .getOne()
      ) as any;

      if (userDataResponse == undefined) res.json(0);
      else return res.json(userDataResponse.userrestaurantrecords);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  };

  public UpsertRestaurantRecord = async (req, res) => {
    try {
      const { body } = req;

      let restaurantRecordResponse = classToPlain(
        await createQueryBuilder("Userrestaurantrecord")
          .where("Userrestaurantrecord.userId = :uid", {
            uid: req.user.id,
          })
          .andWhere("Userrestaurantrecord.restaurantId = :rid", {
            rid: body.restaurantId,
          })
          .getOne()
      ) as any;

      body.userId = req.user.id;
      body.created = new Date();
      if (restaurantRecordResponse === undefined) {
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into("Userrestaurantrecord")
          .values(body)
          .execute();
        res.send("Record successfully created");
      } else {
        await getConnection()
          .createQueryBuilder()
          .update("Userrestaurantrecord")
          .set(body)
          .where("Userrestaurantrecord.userId = :uid", {
            uid: req.user.id,
          })
          .andWhere("Userrestaurantrecord.restaurantId = :rid", {
            rid: body.restaurantId,
          })
          .execute();
        res.send("Record successfully updated");
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  };

  public ModifyRestaurantRecord = (body, res) => {
    res.sendStatus(501);
  };
}

export default new RestaurantService();
