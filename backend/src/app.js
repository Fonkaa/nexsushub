import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import "./config/db.js";

import searchRoutes from "./routes/searchRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import workRequestRoutes from "./routes/workRequestRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";

import verifyToken from "./middleware/authMiddleware.js";
import { getDashboardStats } from "./controllers/dashboardController.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/search", searchRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/requests", workRequestRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/api/dashboard", verifyToken, (req, res) => {
    res.json({
        message: "Welcome to NexusHub Dashboard",
        user: req.user
    });
});

app.get(
    "/api/dashboard/stats",
    verifyToken,
    getDashboardStats
);

app.get("/", (req, res) => {
    res.send("NexusHub Backend Running");
});

export default app;