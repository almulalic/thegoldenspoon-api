import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Resort } from "./Resort";
import { Themepark } from "./Themepark";

@Index("fk_restaurant_resort", ["resortId"], {})
@Index("fk_restaurant_themePark", ["themeParkId"], {})
@Entity("restaurants", { schema: "heroku_7cf11dd7d1ff7dc" })
export class Restaurants {
  @PrimaryGeneratedColumn({ type: "smallint", name: "Id" })
  id: number;

  @Column("varchar", { name: "Name", length: 120 })
  name: string;

  @Column("tinyint", { name: "ResortId" })
  resortId: number;

  @Column("tinyint", { name: "ThemeParkId" })
  themeParkId: number;

  @Column("varchar", { name: "Land", nullable: true, length: 120 })
  land: string | null;

  @Column("varchar", { name: "Pavilion", nullable: true, length: 120 })
  pavilion: string | null;

  @Column("varchar", { name: "ResortHotel", nullable: true, length: 60 })
  resortHotel: string | null;

  @Column("tinyint", { name: "Type" })
  type: number;

  @Column("tinyint", { name: "Experience" })
  experience: number;

  @Column("tinyint", { name: "MealPeriod" })
  mealPeriod: number;

  @Column("tinyint", { name: "Availability" })
  availability: number;

  @Column("tinyint", { name: "Cusine", nullable: true })
  cusine: number | null;

  @Column("tinyint", { name: "IsGoldenSpoonPoint", width: 1 })
  isGoldenSpoonPoint: boolean;

  @Column("tinyint", { name: "IsBonusPoint", width: 1 })
  isBonusPoint: boolean;

  @Column("tinyint", { name: "HasMobileOrder", width: 1 })
  hasMobileOrder: boolean;

  @Column("datetime", { name: "CreatedAt" })
  createdAt: Date;

  @Column("timestamp", {
    name: "ModifiedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  modifiedAt: Date;

  @ManyToOne(() => Resort, (resort) => resort.restaurants, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "ResortId", referencedColumnName: "id" }])
  resort: Resort;

  @ManyToOne(() => Themepark, (themepark) => themepark.restaurants, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "ThemeParkId", referencedColumnName: "id" }])
  themePark: Themepark;
}
