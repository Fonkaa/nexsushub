import express from "express";

import {
    getTeamMembers,
    createTeamMember
} from "../controllers/teamController.js";


const router = express.Router();


router.get("/", getTeamMembers);


router.post("/", createTeamMember);


export default router;