import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Restaurants } from "./Restaurants";

@Index("fk_menu_restaurant", ["restaurantId"], {})
@Entity("menu", { schema: "heroku_7cf11dd7d1ff7dc" })
export class Menu {
  @PrimaryGeneratedColumn({ type: "bigint", name: "Id" })
  id: string;

  @Column("bigint", { name: "RestaurantId" })
  restaurantId: string;

  @Column("tinyint", { name: "MealPeriod" })
  mealPeriod: number;

  @Column("tinyint", { name: "ModifiedCategory" })
  modifiedCategory: number;

  @Column("tinyint", { name: "DisneyCategory", nullable: true })
  disneyCategory: number | null;

  @Column("varchar", { name: "Item", length: 180 })
  item: string;

  @Column("text", { name: "Soruce", nullable: true })
  soruce: string | null;

  @Column("date", { name: "CreatedAt" })
  createdAt: string;

  @Column("timestamp", {
    name: "ModifiedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  modifiedAt: Date;

  @Column("date", { name: "ArchivedAt", nullable: true })
  archivedAt: string | null;

  @ManyToOne(() => Restaurants, (restaurants) => restaurants.menus, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "RestaurantId", referencedColumnName: "id" }])
  restaurant: Restaurants;
}
