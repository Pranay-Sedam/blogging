// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './BlogPage.css';

// const BlogPage = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/posts');
//         const data = await response.json();
//         setPosts(data);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <div className="content-section">
//       {posts.map((post) => (
//         <div className="blog-card" key={post._id}>
//           {post.imageUrl && <img src={`http://localhost:5000/${post.imageUrl}`} alt={post.title} />}
//           <h2>{post.title}</h2>
//           <p><strong>Created on:</strong> {new Date(post.date).toLocaleDateString()}</p>
//           <p>{post.summary}</p>
//           <Link to={`/post/${post._id}`}>Read More</Link>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BlogPage;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BlogPage.css';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const truncateSummary = (summary) => {
    const lines = summary.split('\n'); // Split by lines
    if (lines.length > 2) {
      return lines.slice(0, 1).join('\n') + '...'; // Keep only the first 5 lines
    }
    return summary;
  };

  return (
    <div className="content-section">
      {posts.map((post) => (
        <div className="blog-card" key={post._id}>
          {post.imageUrl && <img src={`http://localhost:5000/${post.imageUrl}`} alt={post.title} />}
          <h2>{post.title}</h2>
          <p><strong>Created on:</strong> {new Date(post.date).toLocaleDateString()}</p>
          <p>{truncateSummary(post.summary)}</p> {/* Truncated summary */}
          <Link to={`/post/${post._id}`} className="read-more-link">Read More</Link>
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
