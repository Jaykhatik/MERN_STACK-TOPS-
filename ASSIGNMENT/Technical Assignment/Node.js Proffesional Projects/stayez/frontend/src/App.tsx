import React, { useState, useEffect } from 'react';
import { api, type Room } from './services/api';
import { useToasts } from './hooks/useToasts';
import { motion, AnimatePresence } from 'framer-motion';
import { addDays, format } from 'date-fns';
import { 
  Search, Heart, Star, MapPin, CheckCircle, 
  Wifi, Snowflake, Coffee, Home, X, User
} from 'lucide-react';
import './index.css';

const amenityIcons: Record<string, any> = {
  'Wifi': Wifi,
  'Air conditioning': Snowflake,
  'Kitchen': Coffee,
  'Pool': Home,
  'Elevator': Home,
  'Gym': Home,
  'Beachfront': MapPin,
  'Mountain view': MapPin,
  'Heating': Snowflake,
  'Restaurant': Coffee,
  'Desert Safari': MapPin
};

function App() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const { toasts, addToast } = useToasts();
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [reservationSuccess, setReservationSuccess] = useState<any>(null);
  
  // Booking form state
  const [bookName, setBookName] = useState('');
  const [bookEmail, setBookEmail] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    fetchRooms('');
  }, []);

  const fetchRooms = async (location: string) => {
    setLoading(true);
    try {
      if (location) {
        const res = await api.searchRooms(location);
        setRooms(res.data);
      } else {
        const res = await api.getRooms();
        setRooms(res.data);
      }
    } catch (error) {
      addToast('Failed to fetch rooms', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRooms(searchQuery);
    addToast('Search Completed', 'success');
  };

  const toggleWishlist = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(id)) {
      newWishlist.delete(id);
    } else {
      newWishlist.add(id);
      addToast('✓ Added to Wishlist', 'success');
    }
    setWishlist(newWishlist);
  };

  const handleReserve = async () => {
    if (!bookName || !bookEmail) {
      addToast('Please enter your name and email', 'error');
      return;
    }

    if (!selectedRoom) return;

    setIsBooking(true);
    try {
      const payload = {
        roomId: selectedRoom.id,
        name: bookName,
        email: bookEmail,
        checkIn: format(new Date(), 'yyyy-MM-dd'),
        checkOut: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
        guests: 2
      };
      const res = await api.reserveRoom(payload);
      setReservationSuccess(res.data);
      addToast('✓ Reservation successful!', 'success');
      setSelectedRoom(null);
    } catch (error: any) {
      addToast(error.message || 'Failed to reserve', 'error');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-brand" onClick={() => {setSearchQuery(''); fetchRooms('');}}>
          <Home color="var(--primary)" fill="var(--primary)" />
          StayEZ
        </div>
        
        <div className="nav-links">
          <div className="nav-link">Anywhere</div>
          <div className="nav-link">Experiences</div>
          <div className="nav-link">Wishlist</div>
        </div>

        <div className="profile-menu">
          <div style={{ padding: '0 0.5rem' }}>☰</div>
          <div style={{ background: '#717171', color: 'white', borderRadius: '50%', padding: '0.25rem' }}>
            <User size={20} />
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="hero-title">Find Your Perfect Stay</h1>
          <p className="hero-subtitle">Book unique places around the world.</p>
          
          <form className="search-container" onSubmit={handleSearch}>
            <div className="search-field">
              <label className="search-label">Location</label>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Where are you going?" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="search-field">
              <label className="search-label">Check-in</label>
              <input type="text" className="search-input" placeholder="Add dates" disabled />
            </div>
            <div className="search-field">
              <label className="search-label">Check-out</label>
              <input type="text" className="search-input" placeholder="Add dates" disabled />
            </div>
            <div className="search-field">
              <label className="search-label">Guests</label>
              <input type="text" className="search-input" placeholder="Add guests" disabled />
            </div>
            <button type="submit" className="search-btn">
              <Search size={20} />
            </button>
          </form>
        </motion.div>
      </section>

      {/* MAIN CONTENT */}
      <main className="container">
        <h2 className="section-title">
          {searchQuery ? `Stays in "${searchQuery}"` : 'Featured Rooms'}
        </h2>

        {loading ? (
          <div className="room-grid">
            {[1,2,3,4].map(i => (
              <div key={i} className="room-card" style={{ height: '350px', backgroundColor: '#e2e8f0', borderRadius: '1rem', animation: 'pulse 1.5s infinite' }} />
            ))}
          </div>
        ) : rooms.length > 0 ? (
          <div className="room-grid">
            {rooms.map(room => (
              <div key={room.id} className="room-card" onClick={() => setSelectedRoom(room)}>
                <div className="image-container">
                  <button className="wishlist-btn" onClick={(e) => toggleWishlist(e, room.id)}>
                    <Heart size={24} fill={wishlist.has(room.id) ? "var(--primary)" : "rgba(0,0,0,0.5)"} color="white" />
                  </button>
                  <img src={room.imageUrl} alt={room.title} className="room-image" loading="lazy" />
                </div>
                <div className="room-header">
                  <div className="room-title">{room.title}</div>
                  <div className="room-rating">
                    <Star size={14} fill="var(--text-dark)" /> {room.rating}
                  </div>
                </div>
                <div className="room-location">{room.location}</div>
                <div className="room-price"><span style={{ fontWeight: 700 }}>${room.price}</span> night</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={48} style={{ color: 'var(--text-light)', margin: '0 auto 1rem' }} />
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Rooms Found</h2>
            <p style={{ color: 'var(--text-light)' }}>Try adjusting your search criteria.</p>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} StayEZ, Inc. All rights reserved.</p>
      </footer>

      {/* ROOM DETAILS MODAL */}
      <AnimatePresence>
        {selectedRoom && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRoom(null)}
          >
            <motion.div 
              className="modal-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="close-btn" onClick={() => setSelectedRoom(null)}>
                <X size={16} />
              </button>

              <div className="details-header">
                <h1 className="details-title">{selectedRoom.title}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-light)', fontSize: '0.875rem', fontWeight: 500 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-dark)' }}>
                    <Star size={14} fill="var(--text-dark)" /> {selectedRoom.rating}
                  </span>
                  <span>·</span>
                  <span style={{ textDecoration: 'underline' }}>{selectedRoom.location}</span>
                </div>
              </div>

              <div className="details-gallery">
                <img src={selectedRoom.imageUrl} alt={selectedRoom.title} />
              </div>

              <div className="details-body">
                <div>
                  <div style={{ paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Hosted by StayEZ Superhost</h2>
                    <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>{selectedRoom.description}</p>
                  </div>

                  <div style={{ paddingTop: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>What this place offers</h2>
                    <div className="amenities-grid">
                      {selectedRoom.amenities.map(amenity => {
                        const Icon = amenityIcons[amenity] || CheckCircle;
                        return (
                          <div key={amenity} className="amenity-item">
                            <Icon size={24} style={{ color: 'var(--text-light)' }} />
                            <span>{amenity}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="booking-widget">
                    <div className="booking-price">
                      ${selectedRoom.price} <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-light)' }}>night</span>
                    </div>

                    <div className="booking-inputs">
                      <div className="booking-row">
                        <div className="booking-cell">
                          <div className="booking-label">CHECK-IN</div>
                          <div>{format(new Date(), 'MM/dd/yyyy')}</div>
                        </div>
                        <div className="booking-cell">
                          <div className="booking-label">CHECKOUT</div>
                          <div>{format(addDays(new Date(), 3), 'MM/dd/yyyy')}</div>
                        </div>
                      </div>
                      <div className="booking-row" style={{ borderBottom: '1px solid var(--border)' }}>
                        <div className="booking-cell" style={{ borderRight: 'none' }}>
                          <div className="booking-label">GUESTS</div>
                          <div>2 guests</div>
                        </div>
                      </div>
                      <div style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                        <input 
                          type="text" 
                          placeholder="Your Name" 
                          value={bookName}
                          onChange={(e) => setBookName(e.target.value)}
                          style={{ width: '100%', border: 'none', outline: 'none', padding: '0.25rem 0', fontFamily: 'inherit' }}
                        />
                      </div>
                      <div style={{ padding: '0.75rem' }}>
                        <input 
                          type="email" 
                          placeholder="Your Email" 
                          value={bookEmail}
                          onChange={(e) => setBookEmail(e.target.value)}
                          style={{ width: '100%', border: 'none', outline: 'none', padding: '0.25rem 0', fontFamily: 'inherit' }}
                        />
                      </div>
                    </div>

                    <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1rem' }} onClick={handleReserve} disabled={isBooking}>
                      {isBooking ? 'Processing...' : 'Reserve'}
                    </button>
                    <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-light)' }}>
                      You won't be charged yet
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {reservationSuccess && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setReservationSuccess(null)}
          >
            <motion.div 
              className="modal-content"
              style={{ maxWidth: '500px', textAlign: 'center' }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <CheckCircle size={64} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Booking Confirmed!</h2>
              <div style={{ textAlign: 'left', background: 'var(--background)', padding: '1.5rem', borderRadius: '1rem', marginBottom: '2rem' }}>
                <p><strong>Booking ID:</strong> {reservationSuccess.id}</p>
                <p><strong>Room:</strong> {reservationSuccess.room.title}</p>
                <p><strong>Name:</strong> {reservationSuccess.user.name}</p>
                <p><strong>Email:</strong> {reservationSuccess.user.email}</p>
                <p><strong>Check-In:</strong> {reservationSuccess.checkIn}</p>
                <p><strong>Check-Out:</strong> {reservationSuccess.checkOut}</p>
                <p><strong>Total Price:</strong> ${reservationSuccess.totalPrice}</p>
              </div>
              <button className="btn btn-primary" onClick={() => setReservationSuccess(null)} style={{ width: '100%' }}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOASTS */}
      <div className="toast-container">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div 
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="toast"
            >
              <CheckCircle color="var(--primary)" size={20} />
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
