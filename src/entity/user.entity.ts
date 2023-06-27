import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Relation,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import Bill from "./bill.entity.js";

@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  email: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdOn: Date;

  // NOTE: must call save() of entity manager to update
  @UpdateDateColumn({ type: "timestamptz" })
  lastLoggedInOn: Date;

  @OneToMany(() => Bill, (bill) => bill.user)
  bills: Relation<Bill[]>;
}

export default User;
