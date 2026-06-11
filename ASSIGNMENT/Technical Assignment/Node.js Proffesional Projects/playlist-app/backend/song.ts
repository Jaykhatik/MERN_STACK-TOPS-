export class Song {
    title: string;
    artist: string;
    duration: number;
    bannerUrl?: string;

    constructor(title: string, artist: string, duration: number, bannerUrl?: string) {
        this.title = title;
        this.artist = artist;
        this.duration = duration;
        this.bannerUrl = bannerUrl || "";
    }
}

export const songs: Song[] = [
    new Song("Saiyaara", "Saiyaara", 253, "/images/Saiyaara_new.jpg"),
    new Song("Dil", "Galliyan Returns", 230, "/images/dil.jpg"),
    new Song("Dhun", "Saiyaara", 215, "/images/dhun.jpg")
];
