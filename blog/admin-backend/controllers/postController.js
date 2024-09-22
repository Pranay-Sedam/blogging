import Post from '../models/Post.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const createPost = async (req, res) => {
  const { title, summary } = req.body;
  const imageUrl = req.file.filename; 

  try {
    const newPost = new Post({ title, summary, imageUrl });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const updatePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const updatedData = {
      title: req.body.title,
      summary: req.body.summary,
    };

    if (req.file) {
      updatedData.imageUrl = req.file.filename; 
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const imagePath = path.join(__dirname, '../uploads', post.imageUrl);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Post.findByIdAndDelete(postId);
    res.json({ message: 'Post deleted' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPostById = async (req, res) => {
    const postId = req.params.id;
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  