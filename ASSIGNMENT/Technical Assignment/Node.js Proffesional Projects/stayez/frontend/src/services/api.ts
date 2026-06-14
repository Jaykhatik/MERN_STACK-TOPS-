const API_URL = 'http://localhost:5000';

export interface Room {
  id: string;
  title: string;
  location: string;
  price: number;
  amenities: string[];
  imageUrl: string;
  rating: number;
  description: string;
}

export const api = {
  getRooms: async () => {
    const res = await fetch(`${API_URL}/rooms`);
    if (!res.ok) throw new Error('Failed to fetch rooms');
    return res.json();
  },
  
  searchRooms: async (location: string) => {
    const res = await fetch(`${API_URL}/rooms/search?location=${encodeURIComponent(location)}`);
    if (!res.ok) throw new Error('Failed to search rooms');
    return res.json();
  },
  
  getFeaturedRooms: async () => {
    const res = await fetch(`${API_URL}/rooms/featured`);
    if (!res.ok) throw new Error('Failed to fetch featured rooms');
    return res.json();
  },

  reserveRoom: async (data: any) => {
    const res = await fetch(`${API_URL}/reserve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to reserve room');
    return json;
  }
};
