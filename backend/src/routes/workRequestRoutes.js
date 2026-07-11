import express from "express";

import {
    getWorkRequests,
    createWorkRequest,
    updateWorkRequest,
    assignRequest,
    deleteWorkRequest
} from "../controllers/workRequestController.js";


import verifyToken from "../middleware/authMiddleware.js";


const router = express.Router();


// Get requests
router.get(
    "/",
    verifyToken,
    getWorkRequests
);


// Employee can create request
router.post(
    "/",
    verifyToken,
    createWorkRequest
);


// Admin only actions
router.put(
    "/:id",
    verifyToken,
    updateWorkRequest
);


router.put(
    "/assign/:id",
    verifyToken,
    assignRequest
);

router.put(
    "/:id",
    verifyToken,
    updateWorkRequest
);
router.delete(
    "/:id",
    verifyToken,
    deleteWorkRequest
);


export default router;