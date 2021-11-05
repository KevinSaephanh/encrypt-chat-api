import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  BaseEntity,
  JoinColumn,
} from "typeorm";
import Message from "../message/message.entity";
import User from "../user/user.entity";

@ObjectType()
@Entity("reactions")
export default class Reaction extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  emoji: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Message, (message: Message) => message.reactions, {
    cascade: ["insert", "update"],
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "message_id" })
  message: Message;

  @Field()
  @CreateDateColumn({ select: false })
  createdAt: Date;
}
