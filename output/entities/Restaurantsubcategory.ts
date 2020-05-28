import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Restaurant } from "./Restaurant";
import { Restaurantcategory } from "./Restaurantcategory";

@Index("fk_subcategory_category", ["categoryId"], {})
@Entity("restaurantsubcategory", { schema: "heroku_7cf11dd7d1ff7dc" })
export class Restaurantsubcategory {
  @PrimaryGeneratedColumn({ type: "tinyint", name: "Id" })
  id: number;

  @Column("varchar", { name: "Name", length: 30 })
  name: string;

  @Column("tinyint", { name: "CategoryId" })
  categoryId: number;

  @Column("datetime", { name: "Created" })
  created: Date;

  @Column("timestamp", {
    name: "LastModified",
    default: () => "CURRENT_TIMESTAMP",
  })
  lastModified: Date;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.subcategory)
  restaurants: Restaurant[];

  @ManyToOne(
    () => Restaurantcategory,
    (restaurantcategory) => restaurantcategory.restaurantsubcategories,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "CategoryId", referencedColumnName: "id" }])
  category: Restaurantcategory;
}
