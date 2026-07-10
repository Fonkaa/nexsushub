import express from "express";
import verifyToken from "../middleware/authMiddleware.js";

import {
    getWorkRequests,
    createWorkRequest,
    updateWorkRequest,
    deleteWorkRequest
} from "../controllers/workRequestController.js";


const router = express.Router();


// Get all requests
router.get("/", verifyToken, getWorkRequests);


// Create new request
router.post("/", verifyToken, createWorkRequest);


// Update request status
router.put("/:id", verifyToken, updateWorkRequest);


// Delete request
router.delete("/:id", verifyToken, deleteWorkRequest);



export default router;