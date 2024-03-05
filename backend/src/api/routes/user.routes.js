import express from "express";
import { AuthMiddleware } from "../middlewares/index.js";
import { UserController } from "../controllers/index.js";

const router = express.Router();

router.get("/all", UserController.allAccess);
router.get(
    "/user",
    [AuthMiddleware.verifyToken],
    UserController.userBoard
);
router.get(
    "/mod",
    [AuthMiddleware.verifyToken, AuthMiddleware.isModerator],
    UserController.moderatorBoard
);
router.get(
    "/admin",
    [AuthMiddleware.verifyToken, AuthMiddleware.isAdmin],
    UserController.adminBoard
);

export default router;