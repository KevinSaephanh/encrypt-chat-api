import { getRepository, Repository } from "typeorm";
import { FRIEND_STATUS } from "../constants";
import Friendship from "../db/entity/Friendship";
import FriendshipRequest from "../interfaces/friendship/FriendshipRequest";

export default class FriendshipService {
  private friendshipRepository: Repository<Friendship>;

  constructor() {
    this.friendshipRepository = getRepository(Friendship);
  }

  public async postFriendship(payload: FriendshipRequest): Promise<any> {
    const friendship = new Friendship();

    try {
      await this.friendshipRepository.save({
        ...friendship,
        ...payload,
      });
    } catch (error) {
      return error;
    }
  }

  public async searchFriendships(payload: FriendshipRequest, skip: number): Promise<Friendship[]> {
    try {
      const { senderId, recipientId, status } = payload;
      const friendships = await this.friendshipRepository
        .createQueryBuilder("friendships")
        .where("sender_id = :senderId AND recipient_id = :recipientId AND status :status", {
          senderId,
          recipientId,
          status,
        })
        .skip(skip)
        .take(25)
        .getMany();
      return friendships;
    } catch (error) {
      return error;
    }
  }

  public async updateFriendship(id: number, status: string): Promise<any> {
    const friendship = new Friendship();
    friendship.status = status;

    try {
      const updatedFriendship = await this.friendshipRepository.save({ id, friendship });
      return updatedFriendship;
    } catch (error) {
      return error;
    }
  }

  public async deleteFriendship(id: number): Promise<any> {
    try {
      const deleted = await this.friendshipRepository.delete(id);
      return deleted;
    } catch (error) {
      return error;
    }
  }
}
