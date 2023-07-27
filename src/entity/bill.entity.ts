import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Relation,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import User from "./user.entity.js";
import Expense from "./expense.entity.js";

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

  @ManyToMany(() => User, (user) => user.bills)
  @JoinTable({ name: "bill_members" })
  members: Relation<User[]>;

  @OneToMany(() => Expense, (expense) => expense.bill)
  expenses: Relation<Expense[]>;
}

export default Bill;
