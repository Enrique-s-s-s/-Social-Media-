const express = require('express');
const Post = require('../models/post');
const User = require('../models/user');
const { protect } = require('../middlewire/Authorization');

const router = express.Router();

router.get('/profile', protect, async (req, res) => {
  res.json({ message: 'Profile data', user: await User.findById(req.user._id).populate('posts') }); 
});

router.post('/post/create', protect, async (req, res) => {
  const { title, content, imageUrl } = req.body;
  const userId = req.user._id; 

  try {
    if (!title || !content) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newPost = new Post({
      author: userId,
      title,
      content,
      imageUrl
    });

    const savedPost = await newPost.save();

    await User.findByIdAndUpdate(userId, { $push: { posts: savedPost._id } });

    return res.status(201).json(savedPost); 
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.delete("/post/:id", async (req, res) => {
  const { id } = req.params; 

  try {
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put('/update-profile', protect, async (req, res) => {
  const { username, email, bio } = req.body;
  const user = req.user; 

  try {
    user.username = username;
    user.email = email;
    user.bio = bio || ''; 

    await user.save();

    res.status(200).json({message:'Succesful'});
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'An error occurred while updating the profile. Please try again.' });
  }
});

router.put('/update-password', protect, async (req, res) => {
  const { Password, confirmPassword } = req.body;
  const user = req.user; 

  try {
    const isMatch = await user.comparePassword(Password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect.' });
    }

    user.password = confirmPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'An error occurred while updating the password. Please try again.' });
  }
});


module.exports = router;