import express from "express";

import {
    getWorkRequests,
    createWorkRequest,
    updateWorkRequest,
    deleteWorkRequest,
    assignRequest
} from "../controllers/workRequestController.js";


import verifyToken from "../middleware/authMiddleware.js";


const router = express.Router();


router.get("/", verifyToken, getWorkRequests);


router.post("/", verifyToken, createWorkRequest);


router.put("/:id", verifyToken, updateWorkRequest);


// Assign request
router.put("/assign/:id", verifyToken, assignRequest);


router.delete("/:id", verifyToken, deleteWorkRequest);


export default router;