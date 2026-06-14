import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { api, type Movie } from './services/api';
import { useToasts } from './hooks/useToasts';
import { useDebounce } from './hooks/useDebounce';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X, Search as SearchIcon } from 'lucide-react';
import './index.css';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 300);
  const { toasts, addToast } = useToasts();
  
  // Booking Modal State
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  
  const [bookedSeats, setBookedSeats] = useState<string[]>(['A3', 'B5', 'C2', 'D8']);
  const allSeats = Array.from({ length: 32 }, (_, i) => {
    const row = String.fromCharCode(65 + Math.floor(i / 8));
    const col = (i % 8) + 1;
    return `${row}${col}`;
  });

  useEffect(() => {
    fetchMovies(debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    if (selectedMovie) {
      fetchBookings(selectedMovie.id);
    }
  }, [selectedMovie]);

  const fetchBookings = async (movieId: string) => {
    try {
      const res = await api.getBookings();
      // res.data contains all bookings, filter by movieId
      const movieBookings = res.data.filter((b: any) => b.movieId === movieId);
      const seats = movieBookings.map((b: any) => b.seatNumber);
      // Combine with hardcoded for demo or just use backend ones
      setBookedSeats(['A3', 'B5', 'C2', 'D8', ...seats]);
    } catch (error) {
      console.error('Failed to fetch bookings', error);
    }
  };

  const fetchMovies = async (query: string) => {
    setLoading(true);
    try {
      if (query) {
        const res = await api.searchMovies(query);
        setMovies(res.data);
      } else {
        const res = await api.getMovies();
        setMovies(res.data);
      }
    } catch (error) {
      addToast('Failed to fetch movies', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleBookTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMovie || !selectedSeat || !email) {
      addToast('Please select a seat and enter your email', 'error');
      return;
    }
    
    setIsBooking(true);
    try {
      await api.bookTicket({
        movieId: selectedMovie.id,
        seatNumber: selectedSeat,
        userEmail: email
      });
      addToast('✓ Booking Confirmed!', 'success');
      
      // Close modal & reset
      setSelectedMovie(null);
      setSelectedSeat(null);
      setEmail('');
    } catch (error: any) {
      addToast(error.message || 'Failed to book ticket', 'error');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="app">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Hero />

      <main className="container">
        <h2 className="section-title">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Recommended Movies'}
        </h2>

        {loading ? (
          <div className="movie-grid">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="movie-card" style={{ height: '400px', backgroundColor: '#e2e8f0', animation: 'pulse 1.5s infinite' }} />
            ))}
          </div>
        ) : movies.length > 0 ? (
          <div className="movie-grid">
            {movies.map(movie => (
              <div key={movie.id} className="movie-card">
                <img src={movie.poster} alt={movie.title} className="movie-poster" loading="lazy" />
                <div className="movie-info">
                  <h3 className="movie-title">{movie.title}</h3>
                  <div className="movie-meta">
                    {movie.language} • {movie.genre}
                    <br />
                    Release: {new Date(movie.releaseDate).toLocaleDateString()}
                  </div>
                  <button 
                    className="btn btn-primary" 
                    style={{ width: '100%', marginTop: 'auto' }}
                    onClick={() => setSelectedMovie(movie)}
                  >
                    Book Tickets
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <SearchIcon size={48} style={{ marginBottom: '1rem', color: 'var(--text-light)' }} />
            <h2>No movies found</h2>
            <p>Try searching for a different title.</p>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} BookMyShow Clone. Built for Demo.</p>
      </footer>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedMovie && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMovie(null)}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3 className="modal-title">Book Tickets: {selectedMovie.title}</h3>
                <button className="close-btn" onClick={() => setSelectedMovie(null)}>
                  <X size={24} />
                </button>
              </div>

              <div className="screen" />
              
              <div className="seat-grid">
                {allSeats.map(seat => {
                  const isBooked = bookedSeats.includes(seat);
                  const isSelected = selectedSeat === seat;
                  return (
                    <div 
                      key={seat}
                      className={`seat ${isBooked ? 'booked' : 'available'} ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        if (!isBooked) setSelectedSeat(seat);
                      }}
                    >
                      {seat}
                    </div>
                  );
                })}
              </div>

              <form onSubmit={handleBookTicket}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="Enter email to receive tickets"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <p style={{ marginBottom: '1rem', fontWeight: 500 }}>
                    Selected Seat: <span style={{ color: 'var(--primary)' }}>{selectedSeat || 'None'}</span>
                  </p>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ width: '100%' }}
                    disabled={!selectedSeat || !email || isBooking}
                  >
                    {isBooking ? 'Processing...' : 'Confirm Booking'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toasts */}
      <div className="toast-container">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div 
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className="toast"
            >
              {toast.type === 'success' ? <CheckCircle color="#22c55e" size={20} /> : <AlertCircle color="#ef4444" size={20} />}
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
