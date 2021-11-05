import { Request, Response } from "express";
import MessageService from "../services/message";

export default class MessageController {
  private messageService: MessageService;

  constructor() {
    this.messageService = new MessageService();
  }

  public async postMessage(req: Request, res: Response): Promise<any> {
    try {
      await this.messageService.postMessage(req.body);
      res.status(201).json("Message created successfully!");
    } catch (error) {
      res.status(400).json({ error: "Failed to create message" });
    }
  }

  public async getMessages(res: Response): Promise<any> {
    try {
      const messages = await this.messageService.getMessages();
      res.status(200).json({ messages });
    } catch (error) {
      res.status(400).json({ error: "Failed to retrieve messages" });
    }
  }

  public async getMessageById(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    try {
      const message = await this.messageService.getMessageById(+id);
      res.status(200).json({ message });
    } catch (error) {
      res.status(404).json({ error: `Message with id: ${id} could not be found` });
    }
  }

  public async updateMessage(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const { content } = req.body;

    try {
      const message = await this.messageService.updateMessage(+id, content);
      res.status(200).json({ message, text: "Message updated successfully!" });
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  public async deleteMessage(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    try {
      await this.messageService.deleteMessage(+id);
      res.status(200).json({ message: "Message deleted successfully!" });
    } catch (error) {
      res.status(404).json({ error: `Message with id: ${id} could not be deleted` });
    }
  }
}
