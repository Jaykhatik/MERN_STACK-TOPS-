import { Request, Response } from 'express';
import { Room } from '../models/room';
import { v4 as uuidv4 } from 'uuid';

const bookings: any[] = [];

const rooms: Room[] = [
  new Room(
    'r1',
    'Luxury Villa Goa',
    'Goa, India',
    150,
    ['Pool', 'Wifi', 'Kitchen', 'Air conditioning'],
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800',
    4.9,
    'Stunning 4-bedroom villa with private pool and beach access.'
  ),
  new Room(
    'r2',
    'Mountain Cabin Manali',
    'Manali, India',
    85,
    ['Wifi', 'Heating', 'Kitchen', 'Mountain view'],
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800',
    4.8,
    'Cozy wooden cabin surrounded by snow-capped peaks.'
  ),
  new Room(
    'r3',
    'Beach House Goa',
    'Goa, India',
    120,
    ['Beachfront', 'Wifi', 'Air conditioning'],
    'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800',
    4.7,
    'Wake up to the sound of waves in this beautiful beachfront home.'
  ),
  new Room(
    'r4',
    'City Apartment Mumbai',
    'Mumbai, India',
    95,
    ['Wifi', 'Kitchen', 'Elevator', 'Gym'],
    'https://images.unsplash.com/photo-1502672260266-1c1de2d9d000?auto=format&fit=crop&q=80&w=800',
    4.6,
    'Modern apartment in the heart of South Mumbai.'
  ),
  new Room(
    'r5',
    'Desert Resort Jaisalmer',
    'Jaisalmer, India',
    200,
    ['Pool', 'Restaurant', 'Desert Safari', 'Air conditioning'],
    'https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&q=80&w=800',
    4.9,
    'Experience royal living in our luxury desert camp.'
  )
];

export const getRooms = (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: rooms });
};

export const searchRooms = (req: Request, res: Response) => {
  const { location } = req.query;
  
  if (!location) {
    return res.status(200).json({ success: true, data: rooms });
  }

  const query = (location as string).toLowerCase();
  const filtered = rooms.filter(room => room.location.toLowerCase().includes(query));

  res.status(200).json({ success: true, data: filtered });
};

export const getRoomById = (req: Request, res: Response) => {
  const { id } = req.params;
  const room = rooms.find(r => r.id === id);

  if (!room) {
    return res.status(404).json({ success: false, message: 'Room not found' });
  }

  res.status(200).json({ success: true, data: room });
};

export const getFeatured = (req: Request, res: Response) => {
  const featured = rooms.filter(r => r.rating >= 4.8);
  res.status(200).json({ success: true, data: featured });
};

export const getPopular = (req: Request, res: Response) => {
  const popular = [...rooms].sort((a, b) => b.rating - a.rating).slice(0, 3);
  res.status(200).json({ success: true, data: popular });
};

export const reserveRoom = (req: Request, res: Response) => {
  const { roomId, name, email, checkIn, checkOut, guests } = req.body;

  if (!roomId || !name || !email || !checkIn || !checkOut || !guests) {
    return res.status(400).json({ success: false, message: 'All reservation fields are required' });
  }

  const room = rooms.find(r => r.id === roomId);
  if (!room) {
    return res.status(404).json({ success: false, message: 'Room not found' });
  }

  const reservation = {
    id: uuidv4(),
    room,
    user: { name, email },
    checkIn,
    checkOut,
    guests,
    totalPrice: room.price * 3, // Mocking 3 nights calculation
    bookedAt: new Date().toISOString()
  };

  bookings.push(reservation);

  res.status(201).json({
    success: true,
    message: 'Reservation successful',
    data: reservation
  });
};
