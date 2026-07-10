import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import verifyToken from "./middleware/authMiddleware.js";
import db from "./config/db.js";


const app = express();


app.use(cors());

app.use(express.json());



// Authentication routes
app.use("/api/auth", authRoutes);



// Test route
app.get("/", (req,res)=>{

    res.send("NexusHub Backend Running");

});



// Protected Dashboard route
app.get("/api/dashboard", verifyToken, (req,res)=>{


    const sql = `
        SELECT 
        id,
        name,
        username,
        email,
        role,
        created_at
        FROM users
        WHERE id=?
    `;


    db.query(
        sql,
        [req.user.id],
        (err,result)=>{


            if(err){

                return res.status(500).json({
                    message:"Database error",
                    error:err
                });

            }



            if(result.length === 0){

                return res.status(404).json({
                    message:"User not found"
                });

            }



            res.json({

                message:"Welcome to NexusHub Dashboard",

                user: result[0]

            });


        }
    );


});



export default app;