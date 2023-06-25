import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Relation,
} from "typeorm";
import Bill from "./bill.entity.js";

@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @OneToMany(() => Bill, (bill) => bill.user)
  bills: Relation<Bill[]>;
}

export default User;
