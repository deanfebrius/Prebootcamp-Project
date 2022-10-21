import express from "express";
import {getUsers, SignUp, SignIn, SignOut} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', SignUp);
router.post('/signin', SignIn);
router.get('/token', refreshToken);
router.delete('/signout', SignOut);

export default router;