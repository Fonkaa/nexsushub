import express from "express";

import {
    getResources,
    createResource
} from "../controllers/resourceController.js";

import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

const adminOnly = (req, res, next) => {

    if (req.user.role !== "admin") {

        return res.status(403).json({
            message: "Admin access required"
        });

    }

    next();

};

router.get(
    "/",
    verifyToken,
    getResources
);

router.post(
    "/",
    verifyToken,
    adminOnly,
    createResource
);

export default router;