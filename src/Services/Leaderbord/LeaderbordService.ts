import _ from "lodash";
import { classToPlain } from "class-transformer";
import { createQueryBuilder } from "typeorm";
import { RoundTwoDecimals } from "../../Shared/Helpers";

export interface ILeaderboardService {
  FetchOverallLeaderboard(req, res);
}

class LeaderboardService implements ILeaderboardService {
  public FetchOverallLeaderboard = async (req, res) => {
    try {
      let usersDataResponse = classToPlain(
        await createQueryBuilder("User")
          .innerJoinAndSelect(
            "User.userrestaurantrecords",
            "Userrestaurantrecord"
          )
          .innerJoinAndSelect("Userrestaurantrecord.restaurant", "Restaurant")
          .innerJoinAndSelect("User.country", "Country")
          .getMany()
      ) as any;

      let leaderboardData = [];

      usersDataResponse.forEach((user) => {
        leaderboardData.push({
          username: user.username,
          fullName:
            user.firstName + " " + (user.middleName ?? "") + user.lastName,
          country: { code: user.country.id, name: user.country.name },
          progress: this.CalculateGoldenSpoonProgress(
            user.userrestaurantrecords
          ),
        });
      });

      return res.json(
        leaderboardData.sort((a, b) => {
          return b.progress - a.progress;
        })
      );
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  };

  private CalculateGoldenSpoonProgress = (userRestaurantData) => {
    const visited = _.countBy(userRestaurantData, (x) => {
      return x.status === 2;
    }).true;

    return RoundTwoDecimals(
      ((visited ?? 0) / Number(process.env.TOTAL_RESTAURANTS)) * 100
    );
  };
}

export default new LeaderboardService();
