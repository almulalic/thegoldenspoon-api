import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("migrations", { schema: "heroku_124147cbc6e7932" })
export class Migrations {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("bigint", { name: "timestamp" })
  timestamp: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;
}
