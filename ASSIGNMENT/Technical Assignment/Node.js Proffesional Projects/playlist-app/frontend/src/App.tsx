import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Music, Search, Plus, Play, Clock, User, 
  Trash2, X, CheckCircle, Music4, ChevronUp,
  Pause, SkipForward, SkipBack, Volume2, VolumeX,
  Repeat, Shuffle, Volume1
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

  // Audio Control States
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [songDuration, setSongDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

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
        if (playingSong && playingSong.title === title) {
          setPlayingSong(null);
          setIsPlaying(false);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatDuration = (seconds: number) => {
    if (isNaN(seconds) || seconds === undefined) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find index of playing song
  const currentSongIndex = useMemo(() => {
    return songs.findIndex((s) => s.title === playingSong?.title);
  }, [songs, playingSong]);

  // Audio Control Handlers
  const handlePrev = () => {
    if (songs.length === 0 || currentSongIndex === -1) return;
    let prevIndex = currentSongIndex - 1;
    if (prevIndex < 0) prevIndex = songs.length - 1;
    setPlayingSong(songs[prevIndex]);
  };

  const handleNext = () => {
    if (songs.length === 0 || currentSongIndex === -1) return;
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      setPlayingSong(songs[randomIndex]);
    } else {
      let nextIndex = currentSongIndex + 1;
      if (nextIndex >= songs.length) nextIndex = 0;
      setPlayingSong(songs[nextIndex]);
    }
  };

  // HTML5 Audio element listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    const handleLoadedMetadata = () => {
      setSongDuration(audio.duration);
    };
    const handleEnded = () => {
      if (isLooping) {
        audio.currentTime = 0;
        audio.play().catch((err) => console.log(err));
      } else {
        handleNext();
      }
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [playingSong, isLooping, isShuffle, songs, currentSongIndex]);

  // Handle song source changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingSong) {
      audio.src = playingSong.audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
      audio.load();
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) =>
          console.log("Playback interrupted or blocked by browser:", err),
        );
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [playingSong]);

  // Volume control
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => console.log(err));
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = Number(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="min-h-screen">
      {/* Hidden Persistent Audio Tag */}
      <audio ref={audioRef} />

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

      {/* Spotify-like Bottom Persistent Player Bar */}
      {playingSong && (
        <div className="spotify-bottom-bar animate-fade-in">
          {/* Song Info */}
          <div className="song-info">
            {playingSong.bannerUrl ? (
              <img src={playingSong.bannerUrl} alt={playingSong.title} />
            ) : (
              <div className="song-icon banner-img flex items-center justify-center bg-slate-800 text-white">
                <Music size={20} />
              </div>
            )}
            <div className="text-details">
              <span className="title">{playingSong.title}</span>
              <span className="artist">{playingSong.artist}</span>
            </div>
            <button 
              className="text-slate-400 hover:text-white ml-2 p-1 rounded-full hover:bg-white/10 transition" 
              onClick={() => setPlayingSong(null)} 
              title="Close Player"
            >
              <X size={14} />
            </button>
          </div>

          {/* Controls Center */}
          <div className="player-controls-center">
            <div className="control-buttons">
              <button 
                className={`control-btn ${isShuffle ? 'active' : ''}`} 
                onClick={() => setIsShuffle(!isShuffle)}
                title="Shuffle"
              >
                <Shuffle size={16} />
              </button>
              <button className="control-btn" onClick={handlePrev} title="Previous">
                <SkipBack size={18} />
              </button>
              <button className="control-btn play-pause-toggle" onClick={togglePlayPause} title={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="translate-x-[1px]" />}
              </button>
              <button className="control-btn" onClick={handleNext} title="Next">
                <SkipForward size={18} />
              </button>
              <button 
                className={`control-btn ${isLooping ? 'active' : ''}`} 
                onClick={() => setIsLooping(!isLooping)}
                title="Repeat"
              >
                <Repeat size={16} />
              </button>
            </div>
            <div className="progress-bar-container">
              <span className="time-label">{formatDuration(currentTime)}</span>
              <input 
                type="range" 
                min="0" 
                max={songDuration || playingSong.duration || 100} 
                value={currentTime} 
                onChange={handleSeekChange}
                className="progress-slider"
              />
              <span className="time-label">{formatDuration(songDuration || playingSong.duration)}</span>
            </div>
          </div>

          {/* Right Utilities */}
          <div className="player-utilities-right">
            <div className="volume-container">
              <button className="control-btn" onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}>
                {isMuted || volume === 0 ? <VolumeX size={18} /> : volume < 0.5 ? <Volume1 size={18} /> : <Volume2 size={18} />}
              </button>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={isMuted ? 0 : volume} 
                onChange={handleVolumeChange}
                className="volume-slider"
              />
            </div>
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
      <footer className="footer" style={{ paddingBottom: playingSong ? '7rem' : '2.5rem' }}>
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
