import express from "express";


import {

getResources,
createResource,
updateResource,
editResource,
deleteResource

} from "../controllers/resourceController.js";


import verifyToken from "../middleware/authMiddleware.js";


const router = express.Router();





const adminOnly=(req,res,next)=>{


    if(req.user.role !== "admin"){


        return res.status(403).json({

            message:"Admin access required"

        });


    }


    next();


};







// VIEW RESOURCES

router.get(

"/",

verifyToken,

getResources

);








// ADD RESOURCE

router.post(

"/",

verifyToken,

adminOnly,

createResource

);







// CHANGE AVAILABLE STATUS

router.put(

"/:id",

verifyToken,

adminOnly,

updateResource

);







// EDIT DETAILS

router.put(

"/edit/:id",

verifyToken,

adminOnly,

editResource

);








// DELETE

router.delete(

"/:id",

verifyToken,

adminOnly,

deleteResource

);






export default router;