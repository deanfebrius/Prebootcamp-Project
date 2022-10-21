import express from "express";
import {
    getPosts,
    getPostsById,
    savePosts,
    updatePosts,
    deletePosts
} from "../controllers/postController.js"

const router = express.Router();

router.get('/posts', getPosts);
router.get('/posts/:id', getPostsById);
router.post('/posts', savePosts);
router.patch('/posts/:id', updatePosts);
router.delete('/posts/:id', deletePosts);

export default router;