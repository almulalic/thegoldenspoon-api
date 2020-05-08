import { Restaurant, UserRestaurantRecord, User } from "../../Models/Entities";
import _ from "lodash";

class StatisticsService {
  public FetchUserStatistics = (req, res) => {
    UserRestaurantRecord.findAll({
      include: [Restaurant],
      where: { userId: req.params.uid ?? req.user.id },
    })
      .then((userDataResponse) => {
        let categoryTotals = Array(5).fill(0);
        let subcategoryTotals = Array(39).fill(0);
        let statusTotals = Array(3).fill(0);

        userDataResponse.map((record) => {
          categoryTotals[record.restaurant.categoryId - 1]++;
          subcategoryTotals[record.restaurant.subcategoryId - 1]++;
          statusTotals[record.status - 1]++;
        });

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

  //   public FetchStatisticsByCategories = (req,res) => {
  //       UserRestaurantRecord.
  //   }
}

export default new StatisticsService();
