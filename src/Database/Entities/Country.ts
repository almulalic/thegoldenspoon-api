import { BaseEntity, Column, Entity, OneToMany } from "typeorm";
import { User } from "./User";

@Entity("country", { schema: "heroku_7cf11dd7d1ff7dc" })
export class Country extends BaseEntity {
  @Column("varchar", { primary: true, name: "id", length: 2 })
  id?: string;

  @Column("text", { name: "name", nullable: true })
  name?: string | null;

  @OneToMany(() => User, (user) => user.country)
  users?: User[];
}
