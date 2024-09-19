
// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import UserModel from './models/User.js'; // Adjust path if needed
// import bcrypt from 'bcrypt'

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json()); // To parse JSON request bodies

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://princeleogaming:princeleo@login.w67ku.mongodb.net/?retryWrites=true&w=majority&appName=login', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// // POST request to /register (what your frontend should use)
// app.post('/register', async (req, res) => {
//     const { username, password } = req.body; // Get the data from the request body
//     console.log('Register data received:', { username, password });
    
//     try {
//         // Create a new user using the UserModel
//         const newUser = new UserModel({ username, password });

//         // Save the user to the database
//         await newUser.save();

//         // Send a success response
//         res.json({ message: 'User registered successfully!' });
//     } catch (err) {
//         console.error('Error saving user:', err);
//         res.status(500).json({ error: 'Failed to register user' });
//     }
// });

// app.listen(4000, () => {
//     console.log('Server is running on port 4000');
// });


import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import UserModel from './models/User.js'; // Adjust path if needed
import jwt from 'jsonwebtoken'; // Import jwt for token generation

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Connect to MongoDB
mongoose.connect('mongodb+srv://princeleogaming:princeleo@login.w67ku.mongodb.net/?retryWrites=true&w=majority&appName=login', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// POST request to /register
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log('Register data received:', { username, password });
    
    try {
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ username, password: hashedPassword });
        await newUser.save();

        res.json({ message: 'User registered successfully!' });
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// POST request to /login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Login data received:', { username, password });

    try {
        // Find the user by username
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Create a JWT token
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' }); // Use a secure secret

        // Send the token and success message
        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Failed to login' });
    }
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

