import axios from 'axios';

/**
 * Fetches content for the explore page using the stored token.
 * 
 * @returns {Object} - The response data containing the explore content.
 * @throws {Error} - Throws an error if the explore content can't be fetched.
 */
export const fetchExploreContent = async () => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await axios.get('/api/explore', { 
      headers: {
        Authorization: `Bearer ${token}`, 
      }
    }); 
    return response.data; 
  } catch (error) {
    throw new Error('Failed to fetch explore content'); 
  }
};

/**
 * Fetches a specific post's details by its ID.
 *
 * @param {string} id - The ID of the post to fetch.
 * @returns {Object} - The response data containing the post details.
 * @throws {Error} - Throws an error if the post can't be fetched.
 */
export const fetchPostById = async (id) => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await axios.get(`/api/explore/post/${id}`, { 
      headers: {
        Authorization: `Bearer ${token}`, 
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching post:', error); 
    throw new Error('Failed to fetch post'); 
  }
};

/**
 * Likes a post by sending a POST request to the server.
 *
 * @param {string} postId - The ID of the post to like.
 * @returns {Object} - The response data from the server after liking the post.
 * @throws {Error} - Returns an error message if the like request fails.
 */
export const likePost = async (postId) => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await axios.post(`/api/explore/post/${postId}/like`, null, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data; 
  } catch (error) {
    if (error.response && error.response.data) {
      return { message: error.response.data.message }; 
    } else {
      return { message: 'Unknown error occurred' }; 
    }
  }
};

/**
 * Adds a comment to a post.
 *
 * @param {string} postId - The ID of the post to add the comment to.
 * @param {Object} commentData - The comment data to be added.
 * @returns {Object} - The response data containing the added comment.
 * @throws {Error} - Throws an error if adding the comment fails.
 */
export const addComment = async (postId, commentData) => {
  try {
    const token = localStorage.getItem('token'); // Getting the token from localStorage
    const response = await axios.post(`/api/explore/post/${postId}/comment`, commentData, { 
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error adding comment:', error); 
    throw error; 
  }
};
