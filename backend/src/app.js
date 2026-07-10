import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import verifyToken from "./middleware/authMiddleware.js";


const app = express();


app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/resources", resourceRoutes);


// Dashboard route
app.get("/api/dashboard", verifyToken, (req,res)=>{

    res.json({

        message:"Welcome to NexusHub Dashboard",

        user:req.user

    });

});



app.get("/",(req,res)=>{

    res.send("NexusHub Backend Running");

});


export default app;