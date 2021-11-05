import { getRepository, Repository } from "typeorm";
import Message from "../db/entity/Message";

export default class MessageService {
  private messageRepository: Repository<Message>;

  constructor() {
    this.messageRepository = getRepository(Message);
  }

  public async postMessage(payload: any): Promise<any> {
    const message = new Message();

    try {
      await this.messageRepository.save({
        ...message,
        ...payload,
      });
    } catch (error) {
      return error;
    }
  }

  public async getMessages(): Promise<any> {
    try {
      const messages = await this.messageRepository.find();
      return messages;
    } catch (error) {
      return error;
    }
  }

  public async getMessageById(id: number): Promise<any> {
    try {
      const message = await this.messageRepository.findOne({ id });
      return message;
    } catch (error) {
      return error;
    }
  }

  public async updateMessage(id: number, content: string): Promise<any> {
    const message = new Message();
    message.content = content;
    message.edited = true;

    try {
      const updatedMessage = await this.messageRepository.save({ id, message });
      return updatedMessage;
    } catch (error) {
      return error;
    }
  }

  public async deleteMessage(id: number): Promise<any> {
    try {
      const deleted = await this.messageRepository.delete(id);
      return deleted;
    } catch (error) {
      return error;
    }
  }
}
