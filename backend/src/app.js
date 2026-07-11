import express from "express";
import cors from "cors";
import { getDashboardStats } from "./controllers/dashboardController.js";

import workRequestRoutes from "./routes/workRequestRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";   // ✅ add here
import verifyToken from "./middleware/authMiddleware.js";
const app = express();


app.use(cors());
app.use(express.json());
app.use(
"/uploads",
express.static("uploads")
);


// API Routes

app.use("/api/auth", authRoutes);

app.use("/api/team", teamRoutes);

app.use("/api/resources", resourceRoutes);

app.use("/api/requests", workRequestRoutes);
app.use(
    "/api/profile",
    profileRoutes
);



// Dashboard user information

app.get("/api/dashboard", verifyToken, (req, res) => {

    res.json({

        message: "Welcome to NexusHub Dashboard",

        user: req.user

    });

});




// Dashboard statistics

app.get(
    "/api/dashboard/stats",
    verifyToken,
    getDashboardStats
);




// Test route

app.get("/", (req, res) => {

    res.send("NexusHub Backend Running");

});





export default app;