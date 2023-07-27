import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Relation,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from "typeorm";
import Bill from "./bill.entity.js";
import Expense from "./expense.entity.js";
import Debt from "./debt.entity.js";

@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  email: string;

  @Column({ default: false })
  isRegistered: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  createdOn: Date;

  // NOTE: must call save() of entity manager to update
  @UpdateDateColumn({ type: "timestamptz" })
  lastLoggedInOn: Date;

  // Bills that the user is a member of
  @ManyToMany(() => Bill, (bill) => bill.members)
  bills: Relation<Bill[]>;

  // Expenses that the user paid for
  @OneToMany(() => Expense, (expense) => expense.payer)
  expenses: Relation<Expense[]>;

  // The debts that the user owes
  @OneToMany(() => Debt, (debt) => debt.debtor)
  debts: Relation<Debt[]>;
}

export default User;
