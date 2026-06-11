import React, { useState, useEffect } from 'react';
import { 
  Music, Search, Plus, Play, Clock, User, 
  Trash2, X, CheckCircle, Music4, ChevronUp 
} from 'lucide-react';
import './index.css';

// Types
interface Song {
  title: string;
  artist: string;
  duration: number;
  bannerUrl?: string;
  audioUrl?: string;
}

interface ToastMessage {
  id: number;
  message: string;
}

const API_URL = 'http://localhost:5000';

function App() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playingSong, setPlayingSong] = useState<Song | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Form State
  const [newSong, setNewSong] = useState({ title: '', artist: '', duration: '', bannerUrl: '', audioUrl: '' });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchSongs();
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchSongs = async (search = '') => {
    try {
      const url = search ? `${API_URL}/songs?search=${encodeURIComponent(search)}` : `${API_URL}/songs`;
      const res = await fetch(url);
      const data = await res.json();
      setSongs(data);
    } catch (err) {
      console.error('Error fetching songs:', err);
    } finally {
      setTimeout(() => setLoading(false), 600);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    fetchSongs(val);
  };

  const showToast = (message: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleAddSong = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (!newSong.title.trim()) {
      setFormError('Title is required');
      return;
    }
    
    const durationNum = Number(newSong.duration);
    if (!durationNum || durationNum <= 0) {
      setFormError('Duration must be a positive number');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/songs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newSong.title,
          artist: newSong.artist,
          duration: durationNum,
          bannerUrl: newSong.bannerUrl,
          audioUrl: newSong.audioUrl
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        setFormError(errorData.error || 'Failed to add song');
        return;
      }

      await fetchSongs(searchTerm);
      setIsModalOpen(false);
      setNewSong({ title: '', artist: '', duration: '', bannerUrl: '', audioUrl: '' });
      showToast('Song Added Successfully');
    } catch (err) {
      setFormError('Network error occurred');
    }
  };

  const handleDelete = async (title: string) => {
    try {
      const res = await fetch(`${API_URL}/songs/${encodeURIComponent(title)}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchSongs(searchTerm);
        showToast('Song Deleted');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Toast Container */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className="animate-slide-in toast-item">
            <CheckCircle size={20} className="text-green-500" />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Sticky Navbar */}
      <nav className="nav-fixed glass-nav">
        <div className="max-w-7xl nav-inner">
          <div className="logo-container">
            <div className="logo-icon">
              <Music4 size={22} />
            </div>
            <span className="logo-text">PlaylistPro</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="search-container">
              <Search className="search-icon" size={18} />
              <input 
                type="text" 
                placeholder="Search songs..." 
                value={searchTerm}
                onChange={handleSearch}
                className="input-field"
              />
            </div>
            <button onClick={() => setIsModalOpen(true)} className="btn-primary">
              <Plus size={18} />
              <span>Add Song</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="floating-note note-1"><Music size={40} /></div>
        <div className="floating-note note-2"><Music4 size={60} /></div>
        <div className="floating-note note-3"><Music size={30} /></div>
        
        <div className="animate-fade-up">
          <h1 className="hero-title">
            Your Favorite <span className="text-primary">Playlist</span>
          </h1>
          <p className="hero-subtitle">
            Manage your music beautifully. Discover, organize, and experience your perfect soundtrack with our premium interface.
          </p>
          {/* <div className="flex justify-center">
            <button onClick={() => setIsModalOpen(true)} className="btn-primary">
              <Plus size={22} /> Add New Song
            </button>
          </div> */}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl main-content">
        <div className="section-header">
          <h2 className="section-title">
            <Music className="text-primary" />
            All Songs
            <span className="song-count">{songs.length}</span>
          </h2>
        </div>

        {/* Playlist Grid */}
        {loading ? (
          <div className="grid">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="glass skeleton-card skeleton">
                <div className="flex gap-4">
                  <div className="skeleton-icon"></div>
                  <div className="song-details">
                    <div className="skeleton-text-1"></div>
                    <div className="skeleton-text-2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : songs.length === 0 ? (
          <div className="glass empty-state animate-fade-in">
            <div className="empty-icon">
              <Music size={48} />
            </div>
            <h3 className="empty-title">No Songs Found</h3>
            <p className="empty-subtitle">We couldn't find anything matching your search.</p>
            <button onClick={() => {setSearchTerm(''); fetchSongs();}} className="btn-primary">
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid">
            {songs.map((song, idx) => (
              <div 
                key={idx} 
                className="song-card glass animate-fade-up clickable-card"
                style={{ animationDelay: `${idx * 0.1}s` }}
                onClick={() => setPlayingSong(song)}
              >
                <div className="card-hover-edge"></div>
                
                <div className="flex justify-between">
                  <div className="flex items-center gap-4">
                    {song.bannerUrl ? (
                      <img src={song.bannerUrl} alt={song.title} className="song-icon banner-img" />
                    ) : (
                      <div className="song-icon">
                        <Music size={24} />
                      </div>
                    )}
                    <div className="song-details">
                      <h3 className="song-title" title={song.title}>{song.title}</h3>
                      <p className="song-artist">
                        <User size={14} />
                        {song.artist}
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(song.title); }}
                    className="btn-icon"
                    title="Delete Song"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="card-footer">
                  <div className="duration-badge">
                    <Clock size={16} className="text-primary" />
                    {formatDuration(song.duration)}
                  </div>
                  
                  <button className="play-btn">
                    <Play size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add Song Modal */}
      {isModalOpen && (
        <div className="modal-overlay animate-fade-in">
          <div className="modal-content animate-slide-in">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="modal-close"
            >
              <X size={20} />
            </button>
            
            <h2 className="modal-title">
              <Plus className="text-primary" />
              Add New Song
            </h2>
            
            {formError && (
              <div className="error-msg animate-fade-in">
                <X size={16} />
                {formError}
              </div>
            )}
            
            <form onSubmit={handleAddSong}>
              <div className="form-group">
                <label className="form-label">Song Title <span className="text-red">*</span></label>
                <input 
                  type="text" 
                  value={newSong.title}
                  onChange={e => setNewSong({...newSong, title: e.target.value})}
                  className="input-field modal-input"
                  placeholder="e.g. Bohemian Rhapsody"
                  autoFocus
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Artist Name</label>
                <input 
                  type="text" 
                  value={newSong.artist}
                  onChange={e => setNewSong({...newSong, artist: e.target.value})}
                  className="input-field modal-input"
                  placeholder="e.g. Queen"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Duration (seconds) <span className="text-red">*</span></label>
                <input 
                  type="number" 
                  value={newSong.duration}
                  onChange={e => setNewSong({...newSong, duration: e.target.value})}
                  className="input-field modal-input"
                  placeholder="e.g. 354"
                  min="1"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Banner Image URL</label>
                <input 
                  type="text" 
                  value={newSong.bannerUrl}
                  onChange={e => setNewSong({...newSong, bannerUrl: e.target.value})}
                  className="input-field modal-input"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Audio File URL</label>
                <input 
                  type="text" 
                  value={newSong.audioUrl}
                  onChange={e => setNewSong({...newSong, audioUrl: e.target.value})}
                  className="input-field modal-input"
                  placeholder="/audio/your-song.mp3"
                />
              </div>
              
              <button type="submit" className="btn-primary w-full">
                Save to Playlist
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Now Playing Modal */}
      {playingSong && (
        <div className="modal-overlay animate-fade-in" onClick={() => setPlayingSong(null)}>
          <div className="modal-content playing-modal animate-slide-in" onClick={e => e.stopPropagation()}>
            <button onClick={() => setPlayingSong(null)} className="modal-close">
              <X size={20} />
            </button>
            <div className="playing-cover-container">
              {playingSong.bannerUrl ? (
                <img src={playingSong.bannerUrl} alt={playingSong.title} className="playing-cover animate-pulse-slow" />
              ) : (
                <div className="playing-cover playing-cover-placeholder">
                  <Music size={64} />
                </div>
              )}
            </div>
            <h2 className="playing-title">{playingSong.title}</h2>
            <p className="playing-artist">{playingSong.artist}</p>
            
            <audio 
              src={playingSong.audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"}
              controls 
              autoPlay 
              className="audio-player"
            >
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      )}

      {/* Back to top button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="back-to-top animate-fade-in"
        >
          <ChevronUp size={24} />
        </button>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">
          <Music4 size={20} />
          PlaylistPro
        </div>
        <p>© 2026 Playlist Management App. Designed with precision.</p>
      </footer>
    </div>
  );
}

export default App;
