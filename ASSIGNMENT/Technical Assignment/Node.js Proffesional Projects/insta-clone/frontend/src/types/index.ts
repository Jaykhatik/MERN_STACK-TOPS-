export interface Post {
  postId: string;
  username: string;
  profileImage: string;
  imageUrl: string;
  caption: string;
  likes: number;
  createdAt: string;
}

export interface UserProfile {
  username: string;
  profileImage: string;
  followers: number;
  following: number;
  posts: number;
  bio: string;
}
