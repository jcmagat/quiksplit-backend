import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Relation,
} from "typeorm";
import User from "./user.entity.js";

@Entity()
class Bill {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.bills)
  user: Relation<User>;
}

export default Bill;
