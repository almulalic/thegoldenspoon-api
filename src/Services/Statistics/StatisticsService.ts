import _ from "lodash";
import { createQueryBuilder } from "typeorm";
import { classToPlain } from "class-transformer";
import { RoundTwoDecimals } from "../../Shared/Helpers";
import { IStatisticsService } from "../../Common/Interfaces/IStatisticsService";

require("dotenv").config();

class StatisticsService implements IStatisticsService {
  public FetchUserStatistics = async (req, res) => {
    try {
      let userDataResponse = classToPlain(
        await createQueryBuilder("User")
          .innerJoinAndSelect(
            "User.userrestaurantrecords",
            "Userrestaurantrecord"
          )
          .innerJoinAndSelect("Userrestaurantrecord.restaurant", "Restaurant")
          .where("User.username = :username", { username: req.user.username })
          .getOne()
      ) as any;

      let categoryTotals = Array(5).fill(0);
      let subcategoryTotals = Array(39).fill(0);
      let statusTotals = Array(3).fill(0);

      userDataResponse.userrestaurantrecords.map((record) => {
        categoryTotals[record.restaurant.categoryId - 1]++;
        subcategoryTotals[record.restaurant.subcategoryId - 1]++;
        statusTotals[record.status]++;
      });

      statusTotals[0] =
        Number(process.env.TOTAL_RESTAURANTS) -
        statusTotals[1] -
        statusTotals[2];

      res.json({
        total: userDataResponse.length,
        categoryTotal: categoryTotals,
        subcategoryTotals: subcategoryTotals,
        statusTotals: statusTotals,
        totalFavorites: _.filter(
          userDataResponse.userrestaurantrecords,
          (x) => {
            if (x.isFavorite) return x;
          }
        ).length,
      });
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  };

  public FetchStatisticsByDate = (req, res) => {
    // UserRestaurantRecord.findAll({
    //   include: {
    //     model: User,
    //     where: { username: req.body.username ?? req.user.username },
    //   },
    //   where: {
    //     dateVisited: { $between: [req.body.dateFrom, req.body.dateTo] },
    //   },
    // })
    //   .then((userRecordResponse) => {
    //     return res.send(userRecordResponse);
    //   })
    //   .error((err) => {
    //     console.log(err);
    //   });
  };

  public FetchGoldenSpoonProgress = async (req, res) => {
    try {
      let userDataResponse = classToPlain(
        await createQueryBuilder("User")
          .innerJoinAndSelect(
            "User.userrestaurantrecords",
            "Userrestaurantrecord"
          )
          .innerJoinAndSelect("Userrestaurantrecord.restaurant", "Restaurant")
          .where("User.username = :username", { username: req.user.username })
          .getOne()
      ) as any;

      const visited = _.countBy(userDataResponse.userrestaurantrecords, (x) => {
        return x.status === 2;
      }).true;

      const precent = RoundTwoDecimals(
        visited ?? (0 / Number(process.env.TOTAL_RESTAURANTS)) * 100
      );

      return res.json({
        visited: visited,
        precent: precent,
      });
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  };

  public FetchCategoriesStatistics = (req, res) => {
    // UserRestaurantRecord.findAll({
    //   include: [
    //     {
    //       model: User,
    //       where: { username: req.body.username ?? req.user.username },
    //     },
    //     { model: Restaurant },
    //   ],
    // })
    //   .then((userRecordResponse) => {
    //     let categoryTotals = Array(5).fill(0);
    //     return res.send(userRecordResponse);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return res.json(4);
    //   });
  };
}

export default new StatisticsService();
