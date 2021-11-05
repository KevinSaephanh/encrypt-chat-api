import { Request, Response } from "express";
import ReactionService from "./reaction.service";

export default class ReactionController {
  private reactionService: ReactionService;

  constructor() {
    this.reactionService = new ReactionService();
  }

  public async postReaction(req: Request, res: Response): Promise<any> {
    try {
      await this.reactionService.postReaction(req.body);
      res.status(201).json("Reaction created successfully!");
    } catch (error) {
      res.status(400).json({ error: "Failed to create reaction" });
    }
  }

  public async updateReaction(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const { emoji } = req.body;

    try {
      const reaction = await this.reactionService.updateReaction(+id, emoji);
      res.status(200).json({ reaction, message: "Reaction updated successfully!" });
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  public async deleteReaction(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    try {
      await this.reactionService.deleteReaction(+id);
      res.status(200).json({ message: "Reaction deleted successfully!" });
    } catch (error) {
      res.status(404).json({ error: `Reaction with id: ${id} could not be deleted` });
    }
  }
}
