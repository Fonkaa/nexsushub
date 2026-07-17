import express from "express";

import {
    getNotifications,
    markNotificationRead,
    deleteNotification
} from "../controllers/notificationController.js";

import verifyToken from "../middleware/authMiddleware.js";


const router = express.Router();



router.get(
    "/",
    verifyToken,
    getNotifications
);



router.put(
    "/:id/read",
    verifyToken,
    markNotificationRead
);



router.delete(
    "/:id",
    verifyToken,
    deleteNotification
);



export default router;