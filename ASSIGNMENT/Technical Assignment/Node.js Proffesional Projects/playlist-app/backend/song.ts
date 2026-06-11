export class Song {
    title: string;
    artist: string;
    duration: number;

    constructor(title: string, artist: string, duration: number) {
        this.title = title;
        this.artist = artist;
        this.duration = duration;
    }
}

export const songs: Song[] = [
    new Song("Bohemian Rhapsody", "Queen", 354),
    new Song("Hotel California", "Eagles", 390),
    new Song("Stairway to Heaven", "Led Zeppelin", 482)
];
