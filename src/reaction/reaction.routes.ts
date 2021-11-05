import { Request, Response, Router } from "express";
import ReactionController from "../controllers/reaction";
import { authenticateToken } from "../middleware/auth";

const router = Router();
const reactionController = new ReactionController();

router.post("/", authenticateToken, (req: Request, res: Response) => {
  return reactionController.postReaction(req, res);
});

router.patch("/:id", authenticateToken, (req: Request, res: Response) => {
  return reactionController.updateReaction(req, res);
});

router.delete("/:id", authenticateToken, (req: Request, res: Response) => {
  return reactionController.deleteReaction(req, res);
});

export default router;
