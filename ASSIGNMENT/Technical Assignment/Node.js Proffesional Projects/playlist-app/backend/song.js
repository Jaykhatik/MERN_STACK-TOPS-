class Song {
    constructor(title, artist, duration) {
        this.title = title;
        this.artist = artist;
        this.duration = duration;
    }
}

const songs = [
    new Song("Bohemian Rhapsody", "Queen", 354),
    new Song("Hotel California", "Eagles", 390),
    new Song("Stairway to Heaven", "Led Zeppelin", 482)
];

module.exports = { Song, songs };
