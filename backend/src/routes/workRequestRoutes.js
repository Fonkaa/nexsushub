import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import {
    getWorkRequests,
    createWorkRequest,
    updateWorkRequest,
    deleteWorkRequest
} from "../controllers/workRequestController.js";


const router = express.Router();


router.get("/", verifyToken, getWorkRequests);

router.post("/", verifyToken, createWorkRequest);


router.put("/:id", updateWorkRequest);


router.delete("/:id", deleteWorkRequest);


export default router;