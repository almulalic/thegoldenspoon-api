import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Restaurant } from "./Restaurant";
import { Restaurantsubcategory } from "./Restaurantsubcategory";

@Entity("restaurantcategory", { schema: "heroku_7cf11dd7d1ff7dc" })
export class Restaurantcategory {
  @PrimaryGeneratedColumn({ type: "tinyint", name: "Id" })
  id: number;

  @Column("varchar", { name: "Name", length: 30 })
  name: string;

  @Column("datetime", { name: "Created" })
  created: Date;

  @Column("timestamp", {
    name: "LastModified",
    default: () => "CURRENT_TIMESTAMP",
  })
  lastModified: Date;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.category)
  restaurants: Restaurant[];

  @OneToMany(
    () => Restaurantsubcategory,
    (restaurantsubcategory) => restaurantsubcategory.category
  )
  restaurantsubcategories: Restaurantsubcategory[];
}
