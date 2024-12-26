import axios from "axios";

/**
 * Fetches the user profile details using the stored token.
 * Redirects to login if token is missing or invalid.
 *
 * @param {Function} navigate - The navigation function to redirect users.
 * @returns {Object} - User profile data.
 * @throws {Error} - Throws an error if the profile can't be fetched.
 */
export const fetchUserProfile = async (navigate) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("You are not logged in.");
    }

    const response = await axios.get("/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.user;
  } catch (error) {
    console.error("Error fetching profile details:", error);
    localStorage.removeItem("token");
    navigate("/login"); 
    throw new Error("Unable to fetch profile details. Please log in again.");
  }
};

/**
 * Creates a new post by sending the form data to the server.
 *
 * @param {Object} formData - The data for the post.
 * @param {string} token - The authentication token.
 * @returns {Object} - The response data from the server.
 * @throws {Error} - Throws an error if the post creation fails.
 */
export const createPost = async (formData, token) => {
  try {
    const response = await axios.post(
      '/api/user/post/create', formData, 
      {
        headers: {
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}`,  
        }
      }
    );
    return response.data; 
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to create post');
  }
};

/**
 * Deletes a post by its ID.
 *
 * @param {string} id - The ID of the post to delete.
 * @throws {Error} - Throws an error if the post deletion fails.
 */
export const deletePost = async (id) => {
  try {
    await axios.delete(`api/user/post/${id}`); 
    return; 
  } catch (error) {
    console.error("Error deleting the post:", error);
    throw error; 
  }
};

/**
 * Updates the user's password.
 *
 * @param {string} password - The new password.
 * @param {string} confirmPassword - The confirmation of the new password.
 * @param {string} token - The authentication token.
 * @returns {Object} - The response from the server after updating the password.
 * @throws {Error} - Throws an error if the password update fails.
 */
export const updatePassword = async (password, confirmPassword, token) => {
  try {
    const response = await axios.put(
      `/api/user/update-password`, 
      { password, confirmPassword }, 
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

/**
 * Updates the user's profile with the provided form data.
 *
 * @param {Object} formData - The updated user profile data.
 * @param {string} token - The authentication token.
 * @returns {Object} - The response from the server after updating the profile.
 * @throws {Error} - Throws an error if the profile update fails.
 */
export const updateProfile = async (formData, token) => {
  try {
    const response = await axios.put(
      `api/user/update-profile`, 
      formData, 
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
