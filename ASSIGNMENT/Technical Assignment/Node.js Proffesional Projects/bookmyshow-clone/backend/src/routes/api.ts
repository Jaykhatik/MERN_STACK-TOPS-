import express from 'express';
import { getMovies, searchMovies, bookTicket, getBookings, deleteBooking } from '../controllers/movieController';

const router = express.Router();

router.get('/movies', getMovies);
router.get('/search-movies', searchMovies);
router.post('/book-ticket', bookTicket);
router.get('/bookings', getBookings);
router.delete('/booking/:id', deleteBooking);

export default router;
