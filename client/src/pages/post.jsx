import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { fetchPostById, likePost, addComment } from '../services/exploreService';

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postData = await fetchPostById(id);
        setPost(postData);
      } catch (err) {
        alert('Failed to fetch the post');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const handleLike = async () => {
    try {
      const updatedPost = await likePost(id);
  
      if (updatedPost.message) {
        alert(updatedPost.message); 
      } else {
        setPost(updatedPost);  
      }
    } catch (err) {
      alert('Something went wrong while liking the post.');
      console.error('Error liking the post:', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const updatedPost = await addComment(id, { text: commentText });
      setPost(updatedPost);
      setCommentText('');
    } catch (err) {
      console.error('Failed to add comment', err);
    }
  };

  if (loading) {
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
          <title>{post.title} | ET.NETWORK</title>
          <meta name="description" content="" />
      </Helmet>
      <div className="post-page-wrapper container py-5 mt-5">
        {post && (
          <div className="post-card shadow-lg border-radius-lg mt-5">
            <div className="image-container position-relative">
              <img
                src={post.imageUrl || 'https://via.placeholder.com/600x300'}
                className="card-img-top post-img rounded-top"
                alt={post.title}
              />
              <div className="like-section">
                <button className="btn btn-like" onClick={handleLike}>
                  👍
                </button>
                <span className="like-count">{post.likes.length}</span>
              </div>
            </div>
            <div className="card-body">
              <h2 className="card-title text-center fw-bold mb-3">{post.title}</h2>
              <p className="text-muted text-center">
                By: <strong>{post.author.username}</strong>
              </p>
              <p className="card-text">{post.content}</p>
            </div>
            <div className="card-footer comments-section">
              <h5 className="fw-bold text-dark mb-3">Comments</h5>
              {post.comments.length > 0 ? (
                <ul className="list-group mb-3">
                  {post.comments.map((comment, index) => (
                    <li key={index} className="list-group-item">
                      <p className="mb-1">
                        <strong>{comment.user?.username || 'Anonymous'}</strong>:
                      </p>
                      <p className="mb-0">{comment.text}</p>
                      <small className="text-muted">
                        {new Date(comment.date).toLocaleDateString()}
                      </small>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No comments yet. Be the first to comment!</p>
              )}
              <form onSubmit={handleCommentSubmit}>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Write a comment..."
                    rows="3"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  ></textarea>
                </div>
                <div className="text-end">
                  <button type="submit" className="btn btn-primary">
                    Add Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
   </> 
  );
}

export default PostPage;
