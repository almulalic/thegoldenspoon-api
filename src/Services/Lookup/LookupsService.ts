import _ from "lodash";
import {
  Types,
  Experience,
  MealPeriod,
  Availability,
  Resorts,
  ThemeParks,
} from "../../Common/Enumerations/Restaurant/RestaurantTypes";
import { EnumToObject } from "../../Shared/Helpers";

class LookupsService {
  public FetchResorts = (res) => {
    return res.json(EnumToObject(Resorts));
  };

  public FetchThemeParks = (res) => {
    return res.json(EnumToObject(ThemeParks));
  };

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
