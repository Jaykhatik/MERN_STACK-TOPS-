import { useState, useEffect } from 'react';
import type { Post, UserProfile } from './types';
import Navbar from './components/Navbar';
import Stories from './components/Stories';
import Feed from './components/Feed';
import Profile from './components/Profile';
import CreatePostModal from './components/CreatePostModal';

const API_URL = 'http://localhost:5000';

function App() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/profile`);
      const data = await res.json();
      setProfile(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchFeed = async () => {
    try {
      const res = await fetch(`${API_URL}/feed`);
      const data = await res.json();
      setPosts(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProfile();
    fetchFeed();
  }, []);

  const handlePostCreated = () => {
    fetchFeed();
    fetchProfile(); // update post count
  };

  const filteredPosts = posts.filter(post => 
    post.caption.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <Navbar 
        onOpenModal={() => setIsModalOpen(true)} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        profileImage={profile?.profileImage}
      />
      
      <main className="main-layout fade-in">
        <div className="feed-section" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Stories />
          <Feed posts={filteredPosts} onLike={fetchFeed} />
        </div>
        
        <div className="sidebar-section" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {profile ? <Profile profile={profile} /> : <div className="card" style={{ padding: '20px' }}>Loading profile...</div>}
          <div className="card" style={{ padding: '20px', fontSize: '14px', color: 'var(--text-muted)' }}>
            © 2026 INSTA-CLONE BY ENGINEER
          </div>
        </div>
      </main>

      {isModalOpen && (
        <CreatePostModal 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={handlePostCreated} 
        />
      )}
    </div>
  );
}

export default App;
