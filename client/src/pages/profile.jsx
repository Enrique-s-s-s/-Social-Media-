import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile, createPost, deletePost } from '../services/userService';
import FormComponent from '../components/FormComponent';
import defaultProfilePicture from '../assets/default.png';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userData = await fetchUserProfile(navigate);
        setUser(userData);
        setPosts(userData.posts);
      } catch (err) {
        setError(err.message);
      }
    };

    getUserProfile();
  }, [navigate]);

  const handlePostSubmit = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await createPost(formData, token);
      console.log(response);
      setPosts((prevPosts) => [...prevPosts, response]);
      setShowForm(false); 
    } catch (err) {
      setError('Failed to create post. Please try again later.', err);
    }
  };

  const toggleForm = () => {
    setShowForm((prevState) => !prevState); 
  };

  const handlePostDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );
  }

  if (!user) {
    return ( 
      <div className="loading-container">
        <div className="spinner"></div> 
            <p>Loading...</p>
      </div> 
    );
  }

  return (
    <>
      <Helmet>
          <title>{user.username} | ET.NETWORK</title>
          <meta name="description" content="" />
      </Helmet>
      <div className="container profile-page-container py-5 mt-5">
        <div className="card profile-card shadow-sm mx-auto">
          <div className="profile-header card shadow-sm">
            <div className="profile-cover position-relative">
              <img src={defaultProfilePicture}  alt="Profile" 
               className="profile-picture position-absolute top-100 start-50 translate-middle" />
            </div>
            <div className="profile-content text-center mt-5">
              <h3 className="mt-5">{user.username}</h3>
              <h5>{user.email}</h5>
              <p>{user.bio}</p>
            </div>
          </div>


          <div className="card-body">
            <h4>Your Posts</h4>
            <button  className="btn btn-primary mb-3"  onClick={toggleForm}>
              {showForm ? 'Cancel' : '+ Add'}
            </button>

            {showForm && (
              <FormComponent
                fields={[
                  { name: 'title', label: 'Title', type: 'text', required: true },
                  { name: 'content', label: 'Content', type: 'textarea', required: true },
                  { name: 'imageUrl', label: 'Image URL(link from other WEB)', type: 'text', required: false },
                ]}
                onSubmit={handlePostSubmit}
                buttonText="Create Post"
              />
            )}

            <ul className="list-group mt-3">
              {posts.map((post) => (
                <li key={post._id}  className="list-group-item d-flex justify-content-between align-items-center p-3 shadow-sm" >
                  <div className="d-flex align-items-start gap-3">
                    {post.imageUrl && (
                      <img  src={post.imageUrl} alt="Post" className="rounded"
                        style={{ width: "100px", height: "100px", objectFit: "cover", border: "1px solid #ddd" }} />
                    )}
                    <div>
                      <h5 className="mb-1 text-primary fw-bold">{post.title}</h5>
                      <p className="mb-2 text-muted small" style={{ maxWidth: "400px" }}>{post.content}</p>
                    </div>
                  </div>
                  <button className="btn btn-sm btn-outline-danger align-self-center" onClick={() => handlePostDelete(post._id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-footer text-center">
            <button className="btn btn-danger w-50"  onClick={() => { localStorage.removeItem('token');  navigate('/login');  }}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
