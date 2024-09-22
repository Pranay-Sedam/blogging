import React, { useState, useEffect } from "react";
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    if (image) {
      formData.append('image', image);
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/posts/${currentPostId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post('http://localhost:5000/api/posts', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      // Refresh the posts list
      const response = await axios.get('http://localhost:5000/api/posts');
      setPosts(response.data);
      resetForm();
    } catch (error) {
      console.error('Error submitting post:', error);
      alert(error.response?.data?.message || 'Error submitting post');
    }
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setSummary(post.summary);
    setCurrentImage(post.imageUrl);
    setIsEditing(true);
    setCurrentPostId(post._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      const response = await axios.get('http://localhost:5000/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error deleting post:', error);
      alert(error.response?.data?.message || 'Error deleting post');
    }
  };

  const resetForm = () => {
    setTitle("");
    setSummary("");
    setImage(null);
    setCurrentImage("");
    setIsEditing(false);
  };

  return (
    <div className="admin-panel">
      <nav className="navbar">
        <h1 className="navbar-title">Blog</h1>
      </nav>
      <div className="center-content">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="summary">Summary:</label>
              <textarea
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Upload Image:</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {isEditing && currentImage && (
                <img src={`http://localhost:5000/${currentImage}`} alt="Current" className="current-image" />
              )}
            </div>
            <button type="submit" className="post-button">
              {isEditing ? "Update Post" : "Post"}
            </button>
          </form>
        </div>
        <div className="posts-list">
          {posts.map((post) => (
            <div className="post-item" key={post._id}>
              <img src={`http://localhost:5000/${post.imageUrl}`} alt="Uploaded" className="post-image" />
              <h2>{post.title}</h2>
              <p className="date">{new Date(post.date).toLocaleDateString()}</p>
              <p>{post.summary}</p>
              <div className="post-actions">
                <button className="edit-button" onClick={() => handleEdit(post)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => handleDelete(post._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
