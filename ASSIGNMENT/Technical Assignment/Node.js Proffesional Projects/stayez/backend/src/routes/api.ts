import express from 'express';
import { getRooms, searchRooms, getRoomById, getFeatured, getPopular, reserveRoom } from '../controllers/roomController';

const router = express.Router();

router.get('/rooms', getRooms);
router.get('/rooms/search', searchRooms);
router.get('/rooms/featured', getFeatured);
router.get('/rooms/popular', getPopular);
router.get('/rooms/:id', getRoomById);
router.post('/reserve', reserveRoom);

export default router;
