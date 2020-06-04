import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Restaurantcategory } from "../../../output/entities/Restaurantcategory";
import { Country } from "./Country";
import { Restaurantsubcategory } from "../../../output/entities/Restaurantsubcategory";
import { Userrestaurantrecord } from "../../../output/entities/Userrestaurantrecord";

@Index("fk_restaurant_category", ["categoryId"], {})
@Index("fk_restaurant_subcategory", ["subcategoryId"], {})
@Index("CountryId", ["countryId"], {})
@Entity("restaurant", { schema: "heroku_7cf11dd7d1ff7dc" })
export class Restaurant {
  @PrimaryGeneratedColumn({ type: "smallint", name: "Id" })
  id: number;

  @Column("varchar", { name: "Name", length: 120 })
  name: string;

  @Column("tinyint", { name: "SubcategoryId" })
  subcategoryId: number;

  @Column("tinyint", { name: "CategoryId" })
  categoryId: number;

  @Column("varchar", { name: "CountryId", nullable: true, length: 2 })
  countryId: string | null;

  @Column("varchar", { name: "Adress", nullable: true, length: 60 })
  adress: string | null;

  @Column("varchar", { name: "Image", nullable: true, length: 164 })
  image: string | null;

  @Column("datetime", { name: "Created" })
  created: Date;

  @Column("timestamp", {
    name: "LastModified",
    default: () => "CURRENT_TIMESTAMP",
  })
  lastModified: Date;

  @ManyToOne(
    () => Restaurantcategory,
    (restaurantcategory) => restaurantcategory.restaurants,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "CategoryId", referencedColumnName: "id" }])
  category: Restaurantcategory;

  @ManyToOne(() => Country, (country) => country.restaurants, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "CountryId", referencedColumnName: "id" }])
  country: Country;

  @ManyToOne(
    () => Restaurantsubcategory,
    (restaurantsubcategory) => restaurantsubcategory.restaurants,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "SubcategoryId", referencedColumnName: "id" }])
  subcategory: Restaurantsubcategory;

  @OneToMany(
    () => Userrestaurantrecord,
    (userrestaurantrecord) => userrestaurantrecord.restaurant
  )
  userrestaurantrecords: Userrestaurantrecord[];
}
