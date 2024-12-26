import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { fetchExploreContent } from '../services/exploreService';

function ExplorePage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExploreContent = async () => {
      try {
        const content = await fetchExploreContent();
        setPosts(content);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch explore content');
        setLoading(false);
      }
    };

    loadExploreContent();
  }, []);

  return (
    <>
      <Helmet>
              <title>Explore | ET.NETWORK</title>
              <meta name="description" content="" />
      </Helmet>
      <div className="explore-page container py-5 mt-5">
        <h2 className="text-center mb-4 animate__animated animate__fadeInDown text-uppercase fw-bold mt-3">
          Explore Content
        </h2>

        {loading && (
          <div className="row">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div className="col-md-4 mb-4" key={n}>
                <div className="card placeholder-card">
                  <div className="placeholder-img"></div>
                  <div className="card-body">
                    <div className="placeholder-title"></div>
                    <div className="placeholder-text"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}

        {!loading && !error && (
          <div className="row">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div className="col-lg-4 col-md-6 mb-4" key={post._id}>
                  <div className="card explore-card animate__animated animate__fadeInUp">
                    <img
                      src={post.imageUrl || 'https://via.placeholder.com/300'}
                      alt={post.title}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-text">
                        {post.content.substring(0, 70)}...
                      </p>
                      <Link
                        to={`/post/${post._id}`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p className="text-muted">No content found to explore.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ExplorePage;
