import { Request, Response, Router } from "express";
import MessageController from "../controllers/message";
import { authenticateToken } from "../middleware/auth";

const router = Router();
const messageController = new MessageController();

router.post("/", authenticateToken, (req: Request, res: Response) => {
  return messageController.postMessage(req, res);
});

router.get("/", authenticateToken, (_req: Request, res: Response) => {
  return messageController.getMessages(res);
});

router.get("/:id", authenticateToken, (req: Request, res: Response) => {
  return messageController.getMessageById(req, res);
});

router.patch("/:id", authenticateToken, (req: Request, res: Response) => {
  return messageController.updateMessage(req, res);
});

router.delete("/:id", authenticateToken, (req: Request, res: Response) => {
  return messageController.deleteMessage(req, res);
});

export default router;
