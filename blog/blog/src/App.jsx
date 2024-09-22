import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogHomepage from './Pages/BlogPage';
import PostDetail from './Pages/PostDetail'; // Import the PostDetail component
import Navbar from './Pages/Navbar';

function App() {
  return (
  
    <Router>
      <Navbar/ >
      <div>
        <Routes>
          {/* Route for the blog homepage */}
          <Route path="/" element={<BlogHomepage />} />
          
          {/* Route for viewing the full blog post detail when "Read More" is clicked */}
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
