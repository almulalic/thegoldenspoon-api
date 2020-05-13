import { Restaurant, UserRestaurantRecord, User } from "../../Models/Entities";
import _ from "lodash";

require("dotenv").config();

class StatisticsService {
  public FetchUserStatistics = (req, res) => {
    UserRestaurantRecord.findAll({
      include: [
        {
          model: User,
          where: { username: req.params.username ?? req.user.username },
        },
        { model: Restaurant },
      ],
    })
      .then((userDataResponse) => {
        let categoryTotals = Array(5).fill(0);
        let subcategoryTotals = Array(39).fill(0);
        let statusTotals = Array(3).fill(0);

        userDataResponse.map((record) => {
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

  public FetchStatisticsByDate = (req, res) => {
    UserRestaurantRecord.findAll({
      include: {
        model: User,
        where: { username: req.body.username ?? req.user.username },
      },
      where: {
        dateVisited: { $between: [req.body.dateFrom, req.body.dateTo] },
      },
    })
      .then((userRecordResponse) => {
        return res.send(userRecordResponse);
      })
      .error((err) => {
        console.log(err);
      });
  };

  public FetchGoldenSpoonProgress = (req, res) => {
    UserRestaurantRecord.findAll({
      include: {
        model: User,
        where: { username: req.params.username ?? req.user.username },
      },
    })
      .then((userRecordResponse) => {
        const visited = _.countBy(userRecordResponse, (x) => {
          return x.status === 2;
        }).true;
        const precent = Math.round(
          (visited / Number(process.env.TOTAL_RESTAURANTS), 2)
        );

        return res.json({
          visited: visited,
          precent: precent,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.json(4);
      });
  };

  public FetchCategoriesStatistics = (req, res) => {
    UserRestaurantRecord.findAll({
      include: [
        {
          model: User,
          where: { username: req.body.username ?? req.user.username },
        },
        { model: Restaurant },
      ],
    })
      .then((userRecordResponse) => {
        let categoryTotals = Array(5).fill(0);

        return res.send(userRecordResponse);
      })
      .catch((err) => {
        console.log(err);
        return res.json(4);
      });
  };
}

export default new StatisticsService();
