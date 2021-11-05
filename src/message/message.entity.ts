import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  BaseEntity,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import Conversation from "../conversation/conversation.entity";
import Reaction from "../reaction/reaction.entity";
import User from "../user/user.entity";

@ObjectType()
@Entity("messages")
export default class Message extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 255 })
  content: string;

  @Field()
  @Column({ default: false })
  edited: boolean;

  @OneToMany(() => Reaction, (reaction) => reaction.message)
  reactions: Reaction[];

  @ManyToOne(() => User)
  @JoinColumn({ name: "sender_id" })
  sender: User;

  @ManyToOne(() => Conversation, {
    cascade: ["insert", "update"],
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "conversation_id" })
  conversation: Conversation;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
