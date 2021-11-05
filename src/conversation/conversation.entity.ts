import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from "typeorm";
import Message from "../message/message.entity";
import User from "../user/user.entity";

@ObjectType()
@Entity("conversations")
export default class Conversation extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  creator: User;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
