export class Song {
    title: string;
    artist: string;
    duration: number;
    bannerUrl?: string;
    audioUrl?: string;

    constructor(title: string, artist: string, duration: number, bannerUrl?: string, audioUrl?: string) {
        this.title = title;
        this.artist = artist;
        this.duration = duration;
        this.bannerUrl = bannerUrl || "";
        this.audioUrl = audioUrl || "";
    }
}

export const songs: Song[] = [
    new Song("Saiyaara", "Saiyaara", 253, "/images/Saiyaara_new.jpg", "/audio/Saiyaara.mp3"),
    new Song("Dil", "Galliyan Returns", 230, "/images/dil.jpg", "/audio/dil.mp3"),
    new Song("Dhun", "Saiyaara", 215, "/images/dhun.jpg", "/audio/dhun.mp3")
];
