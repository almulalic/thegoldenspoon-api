import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Restaurant } from "./Restaurant";
import { Themepark } from "./Themepark";

@Entity("resort", { schema: "heroku_7cf11dd7d1ff7dc" })
export class Resort {
  @PrimaryGeneratedColumn({ type: "tinyint", name: "Id" })
  id: number;

  @Column("varchar", { name: "Name", length: 30 })
  name: string;

  @Column("varchar", { name: "CountryId", nullable: true, length: 2 })
  countryId: string | null;

  @Column("varchar", { name: "City", nullable: true, length: 60 })
  city: string | null;

  @Column("datetime", { name: "Created" })
  created: Date;

  @Column("timestamp", {
    name: "LastModified",
    default: () => "CURRENT_TIMESTAMP",
  })
  lastModified: Date;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.resort)
  restaurants: Restaurant[];

  @OneToMany(() => Themepark, (themepark) => themepark.resort)
  themeparks: Themepark[];
}
