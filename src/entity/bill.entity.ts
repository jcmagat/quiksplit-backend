import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Relation,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./user.entity.js";

@Entity()
class Bill {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdOn: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  lastUpdatedOn: Date;

  @ManyToOne(() => User, (user) => user.bills, { nullable: false })
  user: Relation<User>;
}

export default Bill;
