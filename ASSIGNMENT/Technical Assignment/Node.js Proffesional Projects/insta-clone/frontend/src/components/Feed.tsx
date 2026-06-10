import type { Post } from '../types';
import PostCard from './PostCard';

interface FeedProps {
  posts: Post[];
  onLike: () => void;
}

export default function Feed({ posts, onLike }: FeedProps) {
  if (posts.length === 0) {
    return <div className="card" style={{ padding: '40px', textAlign: 'center' }}>No posts found.</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {posts.map(post => (
        <PostCard key={post.postId} post={post} onLike={onLike} />
      ))}
    </div>
  );
}
