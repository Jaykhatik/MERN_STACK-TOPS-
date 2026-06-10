import { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import type { Post } from '../types';

interface PostCardProps {
  post: Post;
  onLike: () => void;
}

export default function PostCard({ post, onLike }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(post.likes);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = async () => {
    if (isLiked) return;
    
    // Optimistic UI update
    setIsLiked(true);
    setLocalLikes(prev => prev + 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);

    try {
      await fetch('http://localhost:5000/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: post.postId })
      });
      onLike(); // Refresh from server
    } catch (e) {
      console.error(e);
      // Revert optimistic update on failure
      setIsLiked(false);
      setLocalLikes(prev => prev - 1);
    }
  };

  const handleDoubleTap = () => {
    if (!isLiked) handleLike();
  };

  const timeAgo = (dateStr: string) => {
    const diff = new Date().getTime() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) {
      const mins = Math.floor(diff / (1000 * 60));
      return `${mins}m`;
    }
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  return (
    <div className="card fade-in" style={{ padding: '0', overflow: 'hidden' }}>
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src={post.profileImage} alt={post.username} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
        <span style={{ fontWeight: 600, fontSize: '14px' }}>{post.username}</span>
      </div>
      
      <div style={{ position: 'relative', cursor: 'pointer' }} onDoubleClick={handleDoubleTap}>
        <img src={post.imageUrl} alt="Post" style={{ width: '100%', maxHeight: '600px', objectFit: 'cover', display: 'block' }} />
        {isAnimating && (
          <Heart 
            size={80} 
            color="white" 
            fill="white" 
            style={{ 
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              opacity: 0.9, animation: 'heartPop 0.5s ease-out forwards', pointerEvents: 'none'
            }} 
          />
        )}
      </div>

      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button onClick={handleLike}>
              <Heart size={24} className={isLiked ? 'animate-heart' : ''} color={isLiked ? '#ef4444' : 'var(--text-main)'} fill={isLiked ? '#ef4444' : 'none'} />
            </button>
            <button><MessageCircle size={24} /></button>
            <button><Send size={24} /></button>
          </div>
          <button><Bookmark size={24} /></button>
        </div>

        <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>
          {localLikes} likes
        </div>

        <div style={{ fontSize: '14px', marginBottom: '8px' }}>
          <span style={{ fontWeight: 600, marginRight: '8px' }}>{post.username}</span>
          {post.caption}
        </div>

        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          {timeAgo(post.createdAt)} ago
        </div>
      </div>
    </div>
  );
}
