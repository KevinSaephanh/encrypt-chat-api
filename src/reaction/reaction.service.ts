import { getRepository, Repository } from "typeorm";
import Reaction from "./reaction.entity";

export default class ReactionService {
  private reactionRepository: Repository<Reaction>;

  constructor() {
    this.reactionRepository = getRepository(Reaction);
  }

  public async postReaction(payload: any): Promise<any> {
    const reaction = new Reaction();

    try {
      await this.reactionRepository.save({
        ...reaction,
        ...payload,
      });
    } catch (error) {
      return error;
    }
  }

  public async updateReaction(id: number, emoji: string): Promise<any> {
    const reaction = new Reaction();
    reaction.emoji = emoji;

    try {
      const updatedReaction = await this.reactionRepository.save({ id, reaction });
      return updatedReaction;
    } catch (error) {
      return error;
    }
  }

  public async deleteReaction(id: number): Promise<any> {
    try {
      const deleted = await this.reactionRepository.delete(id);
      return deleted;
    } catch (error) {
      return error;
    }
  }
}
