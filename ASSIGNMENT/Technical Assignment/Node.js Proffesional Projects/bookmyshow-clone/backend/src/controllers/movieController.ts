import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

interface Movie {
  id: string;
  title: string;
  language: string;
  releaseDate: string;
  poster: string;
  genre: string;
  rating?: string;
}

const movies: Movie[] = [
  {
    id: 'm1',
    title: 'Dune: Part Two',
    language: 'English',
    releaseDate: '2024-03-01',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=400',
    genre: 'Sci-Fi/Action',
    rating: '8.8/10'
  },
  {
    id: 'm2',
    title: 'Kung Fu Panda 4',
    language: 'English, Hindi',
    releaseDate: '2024-03-08',
    poster: 'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?auto=format&fit=crop&q=80&w=400',
    genre: 'Animation/Comedy',
    rating: '7.5/10'
  },
  {
    id: 'm3',
    title: 'Fighter',
    language: 'Hindi',
    releaseDate: '2024-01-25',
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=400',
    genre: 'Action/Thriller',
    rating: '8.0/10'
  },
  {
    id: 'm4',
    title: 'Deadpool & Wolverine',
    language: 'English',
    releaseDate: '2024-07-26',
    poster: 'https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?auto=format&fit=crop&q=80&w=400',
    genre: 'Action/Comedy',
    rating: 'NA'
  },
  {
    id: 'm5',
    title: 'Kalki 2898 AD',
    language: 'Telugu, Hindi',
    releaseDate: '2024-05-09',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=400',
    genre: 'Sci-Fi/Action',
    rating: 'NA'
  }
];

let bookedSeats: any[] = [];

export const getMovies = (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: movies });
};

export const searchMovies = (req: Request, res: Response) => {
  const query = req.query.q as string;
  if (!query) {
    return res.status(200).json({ success: true, data: movies });
  }

  const lowerQuery = query.toLowerCase();
  const filtered = movies.filter(m => m.title.toLowerCase().includes(lowerQuery));
  
  res.status(200).json({ success: true, data: filtered });
};

export const bookTicket = (req: Request, res: Response) => {
  const { movieId, seatNumber, userEmail } = req.body;

  if (!movieId || !seatNumber || !userEmail) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  // AI-assisted implementation: Seat validation logic
  // We check if there's any existing booking that matches the requested movieId and seatNumber.
  // This prevents duplicate bookings for the same seat in the same movie.
  const isBooked = bookedSeats.some(b => b.movieId === movieId && b.seatNumber === seatNumber);

  if (isBooked) {
    return res.status(400).json({ success: false, message: 'Seat already booked' });
  }

  const booking = {
    id: uuidv4(),
    movieId,
    seatNumber,
    userEmail,
    bookedAt: new Date().toISOString()
  };

  bookedSeats.push(booking);

  res.status(201).json({
    success: true,
    message: 'Booking confirmed',
    data: booking
  });
};

export const getBookings = (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: bookedSeats });
};

export const deleteBooking = (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLength = bookedSeats.length;
  bookedSeats = bookedSeats.filter(b => b.id !== id);

  if (bookedSeats.length === initialLength) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }

  res.status(200).json({ success: true, message: 'Booking deleted successfully' });
};
