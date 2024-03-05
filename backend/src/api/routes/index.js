import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";

export const configRoutes = (handler) => {
    handler.use("/api/auth", authRoutes);
    handler.use("/api/test", userRoutes);
};
