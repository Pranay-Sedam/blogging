import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });

app.post('/api/posts', upload.single('image'), createPost);
app.put('/api/posts/:id', upload.single('image'), updatePost);
