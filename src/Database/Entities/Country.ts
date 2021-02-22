import { Column, Entity, OneToMany } from "typeorm";
import { User } from "./User";

@Entity("country", { schema: "heroku_124147cbc6e7932" })
export class Country {
  @Column("varchar", { primary: true, name: "id", length: 2 })
  id: string;

  @Column("text", { name: "name", nullable: true })
  name: string | null;

  @OneToMany(() => User, (user) => user.country)
  users: User[];
}
