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
import { Resort } from "./Resort";

@Index("FK_themepark_resort", ["resortId"], {})
@Entity("themepark", { schema: "heroku_7cf11dd7d1ff7dc" })
export class Themepark {
  @PrimaryGeneratedColumn({ type: "tinyint", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 40 })
  name: string;

  @Column("tinyint", { name: "resortId", nullable: true })
  resortId: number | null;

  @Column("datetime", { name: "created" })
  created: Date;

  @Column("timestamp", {
    name: "lastmodified",
    default: () => "CURRENT_TIMESTAMP",
  })
  lastmodified: Date;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.themePark)
  restaurants: Restaurant[];

  @ManyToOne(() => Resort, (resort) => resort.themeparks, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "resortId", referencedColumnName: "id" }])
  resort: Resort;
}
