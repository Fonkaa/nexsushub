import express from "express";


import {
    getProfile,
    updateProfile,
    updateProfileImage,
    changePassword
} from "../controllers/profileController.js";


import verifyToken from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";


const router = express.Router();




// GET PROFILE

router.get(
    "/",
    verifyToken,
    getProfile
);





// UPDATE NAME, USERNAME, EMAIL

router.put(
    "/",
    verifyToken,
    updateProfile
);





// UPDATE PROFILE IMAGE

router.put(
    "/image",
    verifyToken,

    (req,res,next)=>{


        upload.single("profile_image")(req,res,(err)=>{


            if(err){


                console.log(
                    "UPLOAD ERROR:",
                    err.message
                );


                return res.status(500).json({

                    message:err.message

                });

            }



            next();


        });


    },

    updateProfileImage
);






// CHANGE PASSWORD

router.put(
    "/password",
    verifyToken,
    changePassword
);




export default router;