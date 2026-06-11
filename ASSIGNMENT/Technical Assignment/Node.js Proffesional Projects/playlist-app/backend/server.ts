import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { Song, songs } from './song';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 1. Root route
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Playlist App');
});

// 3. GET /songs
app.get('/songs', (req: Request, res: Response) => {
    const { search } = req.query;
    if (search && typeof search === 'string') {
        const filtered = songs.filter(s => s.title.toLowerCase().includes(search.toLowerCase()));
        return res.json(filtered);
    }
    res.json(songs);
});

// 4. POST /songs & 5. Validation
app.post('/songs', (req: Request, res: Response) => {
    const { title, artist, duration, bannerUrl, audioUrl } = req.body;

    // Validation
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Title must not be empty' });
    }
    if (duration === undefined || typeof duration !== 'number' || duration <= 0) {
        return res.status(400).json({ error: 'Duration must be a positive number' });
    }

    const newSong = new Song(title.trim(), artist || 'Unknown Artist', duration, bannerUrl, audioUrl);
    songs.push(newSong);

    res.status(201).json(songs);
});

// EXTRA: DELETE /songs/:title
app.delete('/songs/:title', (req: Request, res: Response) => {
    const title = req.params.title as string;
    const index = songs.findIndex(s => s.title.toLowerCase() === title.toLowerCase());
    
    if (index !== -1) {
        songs.splice(index, 1);
        res.json(songs);
    } else {
        res.status(404).json({ error: 'Song not found' });
    }
});

// EXTRA: 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// EXTRA: Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
