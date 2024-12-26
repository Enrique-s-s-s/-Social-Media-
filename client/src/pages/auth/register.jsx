import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { registerUser } from "../../services/authService";

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    try {
      await registerUser({ username, email, password });
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register | ET.NETWORK</title>
        <meta name="description" content="Register to create an account on ET.NETWORK." />
      </Helmet>
      <div className="auth-container">
        <a href="/" className="back-home" aria-label="Back to homepage"></a>
        <div className="auth-box">
          <form onSubmit={handleSubmit} className="auth-form">
            <h2 className="auth-title">Register</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-group">
              <label htmlFor="name">UserName:</label>
              <input
                type="text"
                id="name"
                name="username"
                value={formData.username} 
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
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
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="button mt-4">
              Register
            </button>
            <div className="auth-link">
              Already have an account?{" "}
              <a href="/login" className="login-link" aria-label="Go to the login page">
                Login here
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
