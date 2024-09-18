// import express from 'express';
// import cors from 'cors'

// const app = express();

// app.use(cors())

// app.get('/', (req,res)=>{
//     res.json('test ok')
// });

// app.post('/register', (req,res) => {
//     res.json('test on register')
// })
// app.listen(4000, () => {
//     console.log('server is running');
    
// });

// import express from 'express';
// import cors from 'cors';

// const app = express();

// app.use(cors());
// app.use(express.json()); // To parse JSON request bodies

// // GET request for /register (optional, not needed unless you want to return a page)
// app.get('/register', (req, res) => {
//     res.send('Register page is GET, but you should POST');
// });

// // POST request to /register (what your frontend should use)
// app.post('/register', (req, res) => {
//     const { username, password } = req.body; // Assuming you send JSON data
//     console.log('Register data received:', { username, password });
//     res.json('Registration successful');
// });

// app.listen(4000, () => {
//     console.log('Server is running on port 4000');
// });


import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

app.post('/register', (req, res) => {
    const { username, password } = req.body; // This should now work correctly
    console.log('Register data received:', { username, password });
    res.json('Registration successful');
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
