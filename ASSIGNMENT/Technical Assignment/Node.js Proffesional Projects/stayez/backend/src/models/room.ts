export class Room {
  id: string;
  title: string;
  location: string;
  price: number;
  amenities: string[];
  imageUrl: string;
  rating: number;
  description: string;

  constructor(
    id: string,
    title: string,
    location: string,
    price: number,
    amenities: string[],
    imageUrl: string,
    rating: number,
    description: string
  ) {
    this.id = id;
    this.title = title;
    this.location = location;
    this.price = price;
    this.amenities = amenities;
    this.imageUrl = imageUrl;
    this.rating = rating;
    this.description = description;
  }
}
