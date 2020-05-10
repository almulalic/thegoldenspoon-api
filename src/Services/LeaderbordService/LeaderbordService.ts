import {
  RestaurantCategory,
  RestaurantSubcategory,
  Restaurant,
  UserRestaurantRecord,
  Identity,
  User,
} from "../../Models/Entities";
import _ from "lodash";
import { Country } from "./../../Models/Entities/Country";

export interface ILeaderboardService {
  FetchOverallLeaderboard(req, res);
}

class LeaderboardService implements ILeaderboardService {
  public FetchOverallLeaderboard = (req, res) => {
    User.findAll({ include: [Country] })
      .then((userRestaurantResponse) => {
        let leaderboardData = [];

        userRestaurantResponse.forEach((user) => {
          leaderboardData.push({
            username: user.username,
            fullName:
              user.firstName + " " + (user.middleName ?? "") + user.lastName,
            country: { code: user.country.id, name: user.country.name },
            progress: Math.random() * 10,
          });
        });

        return res.json(
          leaderboardData.sort((a, b) => {
            return b.progress - a.progress;
          })
        );
      })
      .catch((err) => {
        console.log(err);
        return res.json(4);
      });
  };
}

export default new LeaderboardService();
