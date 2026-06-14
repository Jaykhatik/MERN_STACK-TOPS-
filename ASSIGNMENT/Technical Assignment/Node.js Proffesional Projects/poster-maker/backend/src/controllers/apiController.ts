import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

// Template Interface
interface Template {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  description: string;
}

// In-memory designs store
let designs: any[] = [];
let backgroundColor: string = '#ffffff';

const templates: Template[] = [
  {
    id: 't1',
    name: 'Minimalist Event',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600',
    category: 'Event',
    description: 'Clean and modern poster for events'
  },
  {
    id: 't2',
    name: 'Creative Agency',
    imageUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=600',
    category: 'Business',
    description: 'Vibrant colors for creative businesses'
  },
  {
    id: 't3',
    name: 'Music Festival',
    imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=600',
    category: 'Music',
    description: 'Dark theme for music concerts'
  },
  {
    id: 't4',
    name: 'Sale Promotion',
    imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=600',
    category: 'Marketing',
    description: 'High contrast design for sales'
  },
  {
    id: 't5',
    name: 'Nature Photography',
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=600',
    category: 'Photography',
    description: 'Beautiful landscape placeholder'
  }
];

export const getTemplates = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: templates
  });
};

export const createDesign = (req: Request, res: Response) => {
  const { templateId, text, backgroundColor: bgColor } = req.body;

  const template = templates.find(t => t.id === templateId);

  if (!template) {
     return res.status(400).json({ success: false, message: 'Invalid template ID' });
  }

  const newDesign = {
    designId: uuidv4(),
    template: template || null,
    text: text || '',
    backgroundColor: bgColor || backgroundColor,
    createdAt: new Date().toISOString()
  };

  designs.push(newDesign);

  res.status(201).json({
    success: true,
    data: newDesign
  });
};

export const getDesigns = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: designs
  });
};

export const deleteDesign = (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLength = designs.length;
  designs = designs.filter(d => d.designId !== id);

  if (designs.length === initialLength) {
    return res.status(404).json({ success: false, message: 'Design not found' });
  }

  res.status(200).json({ success: true, message: 'Design deleted successfully' });
};

export const uploadImage = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  const url = `/uploads/${req.file.filename}`;
  res.status(200).json({
    success: true,
    url
  });
};

export const setBackground = (req: Request, res: Response) => {
  const { backgroundColor: color } = req.body;
  if (!color) {
    return res.status(400).json({ success: false, message: 'Background color is required' });
  }
  backgroundColor = color;
  res.status(200).json({
    success: true,
    message: 'Background color updated',
    backgroundColor
  });
};
