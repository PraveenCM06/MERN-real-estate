import express from "express";
import { createListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router=express.Router();
//request,response,next
router.post('/create', verifyToken, createListing);

export default router;