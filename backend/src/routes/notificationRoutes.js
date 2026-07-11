import express from "express";

import {

getNotifications,
markNotificationRead

} from "../controllers/notificationController.js";


import verifyToken from "../middleware/authMiddleware.js";



const router = express.Router();





router.get(

"/",

verifyToken,

getNotifications

);





router.put(

"/:id",

verifyToken,

markNotificationRead

);





export default router;