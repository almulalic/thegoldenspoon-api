import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Identity } from "../../../output/entities/Identity";
import { Country } from "./Country";
import { Userrestaurantrecord } from "../../../output/entities/Userrestaurantrecord";

@Index("fk_users_identitiy", ["identityId"], {})
@Index("CountryId", ["countryId"], {})
@Entity("user", { schema: "heroku_7cf11dd7d1ff7dc" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "FirstName", length: 20 })
  firstName: string;

  @Column("varchar", { name: "MiddleName", nullable: true, length: 20 })
  middleName: string | null;

  @Column("varchar", { name: "LastName", length: 20 })
  lastName: string;

  @Column("varchar", { name: "Username", nullable: true, length: 20 })
  username: string | null;

  @Column("date", { name: "BornOn" })
  bornOn: string;

  @Column("tinyint", { name: "Sex", width: 1 })
  sex: boolean;

  @Column("varchar", { name: "CountryId", nullable: true, length: 2 })
  countryId: string | null;

  @Column("varchar", { name: "Adress", nullable: true, length: 60 })
  adress: string | null;

  @Column("int", { name: "IdentityId", unique: true })
  identityId: number;

  @Column("varchar", { name: "Avatar", nullable: true, length: 128 })
  avatar: string | null;

  @Column("tinyint", { name: "Role" })
  role: number;

  @Column("datetime", { name: "Created" })
  created: Date;

  @Column("timestamp", {
    name: "ModifiedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  modifiedAt: Date;

  @Column("datetime", { name: "ArchivedAt", nullable: true })
  archivedAt: Date | null;

  @OneToOne(() => Identity, (identity) => identity.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "IdentityId", referencedColumnName: "id" }])
  identity: Identity;

  @ManyToOne(() => Country, (country) => country.users, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "CountryId", referencedColumnName: "id" }])
  country: Country;

  @OneToMany(
    () => Userrestaurantrecord,
    (userrestaurantrecord) => userrestaurantrecord.user
  )
  userrestaurantrecords: Userrestaurantrecord[];
}
