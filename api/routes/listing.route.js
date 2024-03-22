import express from "express";
import { createListing,deleteListing,editListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router=express.Router();
//request,response,next
router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/edit/:id', verifyToken, editListing);
export default router;