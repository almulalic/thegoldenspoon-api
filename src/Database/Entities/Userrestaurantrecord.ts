import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Restaurant } from "./Restaurant";
import { User } from "./User";

@Index("fk_userRecords_user", ["userId"], {})
@Entity("userrestaurantrecord", { schema: "heroku_124147cbc6e7932" })
export class Userrestaurantrecord {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("int", { name: "UserId" })
  userId: number;

  @Column("tinyint", { name: "Status" })
  status: number;

  @Column("tinyint", { name: "IsFavorite", width: 1 })
  isFavorite: boolean;

  @Column("date", { name: "DateVisited", nullable: true })
  dateVisited: string | null;

  @Column("tinytext", { name: "Comment", nullable: true })
  comment: string | null;

  @Column("datetime", { name: "Created" })
  created: Date;

  @Column("timestamp", {
    name: "LastModified",
    default: () => "CURRENT_TIMESTAMP",
  })
  lastModified: Date;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.userrestaurantrecords, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "RestaurantId", referencedColumnName: "id" }])
  restaurant: Restaurant;

  @ManyToOne(() => User, (user) => user.userrestaurantrecords, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: User;
}
