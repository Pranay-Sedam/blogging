

import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true }, 
  imageUrl: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);
export default Post;
