import express from 'express';
import { createPost, getPosts,getPostById, updatePost, deletePost } from '../controllers/postController.js';

const router = express.Router();

// Define your routes
router.post('/', createPost);
router.get('/', getPosts);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.get('/:id', getPostById);


export default router;
