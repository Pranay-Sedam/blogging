// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import './PostDetail.css';

// const PostDetail = () => {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true); // To handle loading state

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/posts/${id}`);

//         if (!response.ok) {
//           if (response.status === 404) {
//             console.error('Post not found');
//             setPost(null); // Post not found
//           } else {
//             throw new Error('Failed to fetch post');
//           }
//         } else {
//           const data = await response.json();
//           setPost(data); // Set the post data if successful
//         }
//       } catch (error) {
//         console.error('Error fetching post:', error);
//       } finally {
//         setLoading(false); // Set loading to false after fetch is complete
//       }
//     };

//     fetchPost();
//   }, [id]);

//   if (loading) {
//     return <p>Loading...</p>; // Show loading state
//   }

//   if (!post) {
//     return <p>Post not found!</p>; // Handle post not found
//   }

//   return (
//     <div className="post-detail">
//       {post.imageUrl && <img src={`http://localhost:5000/${post.imageUrl}`} alt={post.title} />}
//       <h1>{post.title}</h1>
//       <p><strong>Created on:</strong> {new Date(post.date).toLocaleDateString()}</p>
//       {/* <p><strong>Author:</strong> {post.userId}</p> */}
//       <p>{post.summary}</p>
//       <p>{post.fullContent}</p>
//     </div>
//   );
// };

// export default PostDetail;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            console.error('Post not found');
            setPost(null); // Post not found
          } else {
            throw new Error('Failed to fetch post');
          }
        } else {
          const data = await response.json();
          setPost(data); // Set the post data if successful
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <p>Post not found!</p>;
  }

  return (
    <div className="post-detail">
      {post.imageUrl && <img src={`http://localhost:5000/${post.imageUrl}`} alt={post.title} />}
      <h1>{post.title}</h1>
      <p><strong>Created on:</strong> {new Date(post.date).toLocaleDateString()}</p>
      {/* <p><strong>Author:</strong> {post.userId}</p> */}
      <p>{post.summary}</p> {/* Display summary here for context */}
      <p>{post.fullContent}</p> {/* Display full content */}
    </div>
  );
};

export default PostDetail;
