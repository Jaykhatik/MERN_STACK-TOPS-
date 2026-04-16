export interface Address {
  city?: string;
  street?: string;
  zipcode?: string;
}

export interface User {
  id: number;
  username: string;
  password?:string;
  email: string;
  phone: string;
  address?: Address; // ✅ optional everywhere
}