import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Relation,
} from "typeorm";
import Bill from "./bill.entity.js";
import User from "./user.entity.js";
import Expense from "./expense.entity.js";

@Entity()
class Debt {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  amount: number;

  // The debtor that owes the debt to expense.payer
  @ManyToOne(() => User, (user) => user.debts)
  debtor: Relation<User>;

  // The expense that the debt is a part of
  @ManyToOne(() => Expense, (expense) => expense.debts)
  expense: Relation<Expense>;
}

export default Debt;
