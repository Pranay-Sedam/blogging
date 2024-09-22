import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/postRoutes.js';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


app.use('/api/posts', upload.single('image'), postRoutes); 


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
