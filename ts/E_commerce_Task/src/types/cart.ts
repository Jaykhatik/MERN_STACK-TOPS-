export interface Cart {
  id: number; // API
  userId: number;
  productId: number;
  quantity: number;
}

export interface CartItem {
  productId: number; // Local Redux
  userId: number;
  quantity: number;
}