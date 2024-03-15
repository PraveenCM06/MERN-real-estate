import express from 'express'
import { google, signIn, signUp, signOut } from '../controllers/auth.controller.js';

const router= express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/google', google);
router.get('/signout', signOut);
export default router;
