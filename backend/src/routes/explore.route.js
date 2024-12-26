const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const { protect } = require('../middlewire/Authorization'); 

router.get('/', protect, async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);       
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' }); 
  }
});

router.get('/post/:id', protect, async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id)
      .populate('author', 'username email')
      .populate('likes', 'username email') 
      .populate('comments.user', 'username email'); 

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/post/:id/like', protect, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: 'User has already liked this post' });
    }

    post.likes.push(userId);

    await post.save();

    const updatedPost = await Post.findById(postId)
      .populate('author', 'username email')  
      .populate('likes', 'username email') 
      .populate('comments.user', 'username email');  

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error('Error liking the post:', err);
    res.status(500).json({ message: 'Failed to like the post', err: err.message });
  }
});

router.post('/post/:id/comment', protect, async (req, res) => {
  try {
    const postId = req.params.id;
    const { text } = req.body;
    const userId = req.user._id; 

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const commentData = {
      user: userId,
      text,
    };

    await post.addComment(commentData);

    const updatedPost = await Post.findById(postId)
    .populate('author', 'username email')  
    .populate('likes', 'username email') 
    .populate('comments.user', 'username email');  

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error('Failed to add comment', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
