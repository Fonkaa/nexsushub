import express from "express";

import { 
register,
login,
forgotPassword,
verifyOTP,
resetPassword
} from "../controllers/authController.js";


const router = express.Router();



router.get("/test", (req,res)=>{

    res.json({

        message:"Auth route connected"

    });

});



router.post(
    "/register",
    register
);



router.post(
    "/login",
    login
);



router.post(
    "/forgot-password",
    forgotPassword
);



router.post(
    "/verify-otp",
    verifyOTP
);



router.post(
    "/reset-password",
    resetPassword
);



console.log("AUTH ROUTES LOADED");
console.log("fiker");


export default router;