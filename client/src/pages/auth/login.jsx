import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { loginUser } from "../../services/authService";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      
      alert("Login successful!");
      navigate("/"); 
    } catch (err) {
      setError(err.message); 
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | ET.NETWORK</title>
        <meta name="description" content="Login page for ET.NETWORK" />
      </Helmet>
      <div className="auth-container">
        <a href="/" className="back-home" aria-label="Back to homepage">
        </a>
        <div className="auth-box">
          <form onSubmit={handleSubmit} className="auth-form">
            <h2 className="auth-title">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="button mt-4">
              Login
            </button>
            <div className="auth-link">
              Don't have an account?{" "}
              <a href="/register" className="register-link" aria-label="Go to the registration page">
                Register here
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
