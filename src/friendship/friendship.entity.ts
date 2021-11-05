import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  BaseEntity,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { FRIEND_STATUS } from "../shared/constants";
import User from "../user/user.entity";

@ObjectType()
@Entity("friendships")
export default class Friendship extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "recipient_id" })
  sender: User;

  @OneToOne(() => User)
  @JoinColumn({ name: "sender_id" })
  recipient: User;

  @Field()
  @Column({ default: FRIEND_STATUS.PENDING })
  status: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
