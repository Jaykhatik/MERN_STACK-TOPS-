import { Post, UserProfile } from './types';

export const users = [
  { username: 'john_doe', profileImage: 'https://i.pravatar.cc/150?u=1' },
  { username: 'jane_smith', profileImage: 'https://i.pravatar.cc/150?u=2' },
  { username: 'alex_cool', profileImage: 'https://i.pravatar.cc/150?u=3' },
  { username: 'sarah_w', profileImage: 'https://i.pravatar.cc/150?u=4' },
  { username: 'mike_t', profileImage: 'https://i.pravatar.cc/150?u=5' }
];

export const profile: UserProfile = {
  username: 'current_user',
  profileImage: 'https://i.pravatar.cc/150?u=0',
  followers: 1240,
  following: 340,
  posts: 10,
  bio: 'Just another developer building cool things ✨\nCoffee lover ☕️'
};

export const posts: Post[] = [
  {
    postId: 'p1',
    username: 'john_doe',
    profileImage: 'https://i.pravatar.cc/150?u=1',
    imageUrl: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=800&q=80',
    caption: 'Beautiful sunset today! 🌅',
    likes: 124,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
  },
  {
    postId: 'p2',
    username: 'jane_smith',
    profileImage: 'https://i.pravatar.cc/150?u=2',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    caption: 'Workspace goals 💻✨',
    likes: 89,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
  },
  {
    postId: 'p3',
    username: 'alex_cool',
    profileImage: 'https://i.pravatar.cc/150?u=3',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    caption: 'Food coma... 🍔🍟',
    likes: 456,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
  },
  {
    postId: 'p4',
    username: 'sarah_w',
    profileImage: 'https://i.pravatar.cc/150?u=4',
    imageUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80',
    caption: 'Nature is beautiful 🌲',
    likes: 32,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  },
  {
    postId: 'p5',
    username: 'mike_t',
    profileImage: 'https://i.pravatar.cc/150?u=5',
    imageUrl: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=800&q=80',
    caption: 'Profile setup! 😎',
    likes: 112,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
  },
  {
    postId: 'p6',
    username: 'jane_smith',
    profileImage: 'https://i.pravatar.cc/150?u=2',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    caption: 'Hardware internals looking clean ⚙️',
    likes: 245,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString()
  },
  {
    postId: 'p7',
    username: 'john_doe',
    profileImage: 'https://i.pravatar.cc/150?u=1',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    caption: 'Late night coding sessions 🌙',
    likes: 88,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString()
  },
  {
    postId: 'p8',
    username: 'sarah_w',
    profileImage: 'https://i.pravatar.cc/150?u=4',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    caption: 'Team meeting vibes 🤝',
    likes: 156,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString()
  },
  {
    postId: 'p9',
    username: 'alex_cool',
    profileImage: 'https://i.pravatar.cc/150?u=3',
    imageUrl: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80',
    caption: 'Minimalist setup 🖥️',
    likes: 290,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 144).toISOString()
  },
  {
    postId: 'p10',
    username: 'mike_t',
    profileImage: 'https://i.pravatar.cc/150?u=5',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    caption: 'Data analysis visualization 📊',
    likes: 77,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 168).toISOString()
  }
];
