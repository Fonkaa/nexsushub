import express from "express";


import {

getTeamMembers,
createTeamMember,
updateTeamMember,
deleteTeamMember

} from "../controllers/teamController.js";


import verifyToken from "../middleware/authMiddleware.js";


const router=express.Router();




const adminOnly=(req,res,next)=>{


if(req.user.role!=="admin"){


return res.status(403).json({

message:"Admin access required"

});


}


next();


};





router.get(

"/",

verifyToken,

getTeamMembers

);






router.post(

"/",

verifyToken,

adminOnly,

createTeamMember

);







router.put(

"/:id",

verifyToken,

adminOnly,

updateTeamMember

);







router.delete(

"/:id",

verifyToken,

adminOnly,

deleteTeamMember

);





export default router;