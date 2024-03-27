import express from 'express'
import {test, updateUser, deleteUser, getUserListing,getUser} from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js';

const router= express.Router();

router.get('/test' , test)
//router.post(request, response, next);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/userlistings/:id', verifyToken, getUserListing);
router.get('/:id',verifyToken, getUser);
export default router;