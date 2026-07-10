import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import verifyToken from "./middleware/authMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("NexusHub Backend Running");
});

app.get("/api/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "Welcome to NexusHub Dashboard",
    user: req.user,
  });
});

export default app;