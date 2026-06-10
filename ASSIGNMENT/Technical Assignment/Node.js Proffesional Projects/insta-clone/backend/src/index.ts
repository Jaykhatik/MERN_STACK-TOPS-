import express from 'express';
import cors from 'cors';
import { profile, posts } from './data';
import { Post } from './types';

const app = express();
app.use(cors());
app.use(express.json());

// 1. GET /profile
app.get('/profile', (req, res) => {
  res.json(profile);
});

// 2. POST /post
app.post('/post', (req, res) => {
  const { imageUrl, caption } = req.body;
  
  if (!imageUrl) {
    return res.status(400).json({ error: 'imageUrl is required' });
  }

  const newPost: Post = {
    postId: `p${Date.now()}`,
    username: profile.username,
    profileImage: profile.profileImage,
    imageUrl,
    caption: caption || '',
    likes: 0,
    createdAt: new Date().toISOString()
  };

  posts.unshift(newPost); // Add to beginning (newest first)
  profile.posts += 1;
  
  res.status(201).json(newPost);
});

// 3. GET /feed
app.get('/feed', (req, res) => {
  res.json(posts);
});

// 4. POST /like
app.post('/like', (req, res) => {
  const { postId } = req.body;
  
  if (!postId) {
    return res.status(400).json({ error: 'postId is required' });
  }

  const post = posts.find(p => p.postId === postId);
  
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  post.likes += 1;
  res.json({ likes: post.likes });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
