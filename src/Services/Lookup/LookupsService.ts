import _ from "lodash";
import {
  Types,
  Experience,
  MealPeriod,
  Availability,
} from "../../Common/Enumerations/Restaurant/RestaurantTypes";
import { EnumToObject } from "../../Shared/Helpers";

class LookupsService {
  public FetchRestaurantTypes = (res) => {
    return res.json(EnumToObject(Types));
  };

  public FetchRestaurantExperience = (res) => {
    return res.json(EnumToObject(Experience));
  };

  public FetchRestaurantMealPeriod = (res) => {
    return res.json(EnumToObject(MealPeriod));
  };

  public FetchRestaurantAvailability = (res) => {
    return res.json(EnumToObject(Availability));
  };
}

export default new LookupsService();
