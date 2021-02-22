import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("identity", { schema: "heroku_124147cbc6e7932" })
export class Identity {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Email", length: 254 })
  email: string;

  @Column("varchar", { name: "Username", length: 25 })
  username: string;

  @Column("varchar", { name: "Password", length: 64 })
  password: string;

  @Column("tinyint", { name: "IsConfirmed", width: 1 })
  isConfirmed: boolean;

  @Column("datetime", { name: "ConfirmedAt", nullable: true })
  confirmedAt: Date | null;

  @Column("varchar", { name: "RefreshToken", nullable: true, length: 450 })
  refreshToken: string | null;

  @Column("timestamp", {
    name: "LastModified",
    default: () => "CURRENT_TIMESTAMP",
  })
  lastModified: Date;

  @Column("datetime", { name: "Created" })
  created: Date;

  @Column("datetime", { name: "ArchivedAt", nullable: true })
  archivedAt: Date | null;

  @OneToOne(() => User, (user) => user.identity)
  user: User;
}
