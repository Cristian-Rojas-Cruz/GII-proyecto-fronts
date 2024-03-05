import express from "express";
import { DataValidationMiddleware } from "../middlewares/index.js";
import { AuthController } from "../controllers/index.js";

const router = express.Router();

router.post("/signin", AuthController.signin);
router.post("/signup",[
        DataValidationMiddleware.checkRolesExisted,
        DataValidationMiddleware.checkDuplicateUsernameOrEmail
    ], AuthController.signup);

export default router;