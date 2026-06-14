import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  location: string;
  imageUrl: string;
  createdAt: string;
}

let products: Product[] = [
  {
    id: 'p1',
    title: 'iPhone 13 Pro - Excellent Condition',
    description: 'Used for 6 months. Battery health 98%. No scratches.',
    category: 'Mobiles',
    price: 650,
    location: 'New York, NY',
    imageUrl: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=400',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'p2',
    title: 'Modern Leather Sofa',
    description: '3-seater leather sofa. Dark brown. Moving out sale.',
    category: 'Furniture',
    price: 300,
    location: 'Chicago, IL',
    imageUrl: 'https://images.unsplash.com/photo-1540574163026-643ea20d25b5?auto=format&fit=crop&q=80&w=400',
    createdAt: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: 'p3',
    title: 'Sony Alpha A7III Camera',
    description: 'Mirrorless camera body only. Shutter count < 10k.',
    category: 'Electronics',
    price: 1200,
    location: 'San Francisco, CA',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400',
    createdAt: new Date(Date.now() - 259200000).toISOString()
  },
  {
    id: 'p4',
    title: 'Trek Mountain Bike',
    description: '21 speed, 29 inch wheels. Perfect for trails.',
    category: 'Bikes',
    price: 450,
    location: 'Denver, CO',
    imageUrl: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=400',
    createdAt: new Date(Date.now() - 345600000).toISOString()
  },
  {
    id: 'p5',
    title: 'Honda Civic 2018 EX',
    description: 'Clean title. 45,000 miles. Well maintained.',
    category: 'Cars',
    price: 18500,
    location: 'Austin, TX',
    imageUrl: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=400',
    createdAt: new Date(Date.now() - 432000000).toISOString()
  }
];

export const getProducts = (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: products });
};

export const getProductById = (req: Request, res: Response) => {
  const { id } = req.params;
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  res.status(200).json({ success: true, data: product });
};

export const addProduct = (req: Request, res: Response) => {
  const { title, description, category, price, location, imageUrl } = req.body;

  if (!title || !description || !category || !price || !location || !imageUrl) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const newProduct: Product = {
    id: uuidv4(),
    title,
    description,
    category,
    price: Number(price),
    location,
    imageUrl,
    createdAt: new Date().toISOString()
  };

  products.unshift(newProduct);

  res.status(201).json({ success: true, data: products });
};

export const deleteProduct = (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLength = products.length;
  products = products.filter(p => p.id !== id);

  if (products.length === initialLength) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  res.status(200).json({ success: true, data: products });
};

export const searchProducts = (req: Request, res: Response) => {
  const query = req.query.q as string;
  if (!query) {
    return res.status(200).json({ success: true, data: products });
  }

  const lowerQuery = query.toLowerCase();
  const filtered = products.filter(p => 
    p.title.toLowerCase().includes(lowerQuery) || 
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );

  res.status(200).json({ success: true, data: filtered });
};

export const getCategories = (req: Request, res: Response) => {
  const categories = Array.from(new Set(products.map(p => p.category)));
  res.status(200).json({ success: true, data: categories });
};

export const getRecent = (req: Request, res: Response) => {
  // Sort by createdAt desc
  const recent = [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
  res.status(200).json({ success: true, data: recent });
};

export const uploadImage = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded or invalid file format' });
  }

  const url = `/uploads/${req.file.filename}`;
  res.status(200).json({ success: true, url });
};
