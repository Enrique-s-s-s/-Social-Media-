import React from 'react';
import { Helmet } from 'react-helmet';

const HomePage = () => {
  return (
    <>
      <Helmet>
          <title>Home | ET.NETWORK</title>
          <meta name="description" content="" />
      </Helmet>
      <div className="home-container mt-5">
        <header className="hero mt-3">
          <h1 className="hero-title">Connect, Share, and Grow</h1>
          <p className="hero-subtitle">
            Join the ultimate platform to connect with friends and share your journey.
          </p>
        </header>

        <section className="features">
          <h2 className="features-title">Why Choose SocialMedia?</h2>
          <div className="feature-cards">
            <div className="card">
              <i className="fas fa-users icon"></i>
              <h3 className="card-title">Build Connections</h3>
              <p className="card-text">Meet people who share your interests.</p>
            </div>
            <div className="card">
              <i className="fas fa-share icon"></i>
              <h3 className="card-title">Share Your Story</h3>
              <p className="card-text">Post updates, photos, and more.</p>
            </div>
            <div className="card">
              <i className="fas fa-lock icon"></i>
              <h3 className="card-title">Stay Secure</h3>
              <p className="card-text">Your privacy is our top priority.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
