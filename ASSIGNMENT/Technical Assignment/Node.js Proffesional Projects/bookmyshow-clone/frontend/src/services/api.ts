const API_URL = 'http://localhost:5000';

export interface Movie {
  id: string;
  title: string;
  language: string;
  releaseDate: string;
  poster: string;
  genre: string;
  rating?: string;
}

export const api = {
  getMovies: async () => {
    const res = await fetch(`${API_URL}/movies`);
    if (!res.ok) throw new Error('Failed to fetch movies');
    return res.json();
  },
  
  searchMovies: async (query: string) => {
    const res = await fetch(`${API_URL}/search-movies?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Failed to search movies');
    return res.json();
  },
  
  bookTicket: async (data: { movieId: string; seatNumber: string; userEmail: string }) => {
    const res = await fetch(`${API_URL}/book-ticket`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to book ticket');
    return json;
  },

  getBookings: async () => {
    const res = await fetch(`${API_URL}/bookings`);
    if (!res.ok) throw new Error('Failed to fetch bookings');
    return res.json();
  }
};
