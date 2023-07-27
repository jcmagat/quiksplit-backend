import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Relation,
  OneToMany,
} from "typeorm";
import Bill from "./bill.entity.js";
import User from "./user.entity.js";
import Debt from "./debt.entity.js";

export enum SplitType {
  EQUAL = "equal",
  INDIVIDUAL = "individual",
}

@Entity()
class Expense {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  cost: number;

  @Column({ type: "enum", enum: SplitType })
  splitType: SplitType;

  // The payer of the expense
  @ManyToOne(() => User, (user) => user.expenses)
  payer: Relation<User>;

  // The bill that the expense is a part of
  @ManyToOne(() => Bill, (bill) => bill.expenses, {
    nullable: false,
    onDelete: "CASCADE",
  })
  bill: Relation<Bill>;

  // The debts that the expense is split to
  @OneToMany(() => Debt, (debt) => debt.expense)
  debts: Relation<Debt[]>;
}

export default Expense;
