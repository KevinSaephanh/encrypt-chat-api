import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  BaseEntity,
  OneToMany,
  JoinTable,
} from "typeorm";
import { FRIEND_STATUS } from "../shared/constants";
import Conversation from "../conversation/conversation.entity";
import Friendship from "../friendship/friendship.entity";

@ObjectType()
@Entity("users")
export default class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 15, unique: true })
  username: string;

  @Field()
  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 50, select: false })
  password: string;

  @Field()
  @Column({ nullable: true })
  avatar: string;

  @Field()
  @Column({ default: false })
  isActive: boolean;

  @Field()
  @Column({ default: false, select: false })
  isAdmin: boolean;

  @ManyToMany(() => Conversation, (conversation) => conversation.users)
  @JoinTable()
  conversations: Conversation[];

  @OneToMany(
    () => Friendship,
    (friendship) => friendship.sender && friendship.status == FRIEND_STATUS.ACCEPTED
  )
  friends: Friendship[];

  @OneToMany(
    () => Friendship,
    (friendship) => friendship.sender && friendship.status == FRIEND_STATUS.PENDING
  )
  pendingRequests: Friendship[];

  @OneToMany(
    () => Friendship,
    (friendship) => friendship.sender && friendship.status == FRIEND_STATUS.BLOCKED
  )
  blockedUsers: Friendship[];

  @Field()
  @CreateDateColumn({ select: false })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @Field()
  @UpdateDateColumn()
  lastLogin: Date;
}
