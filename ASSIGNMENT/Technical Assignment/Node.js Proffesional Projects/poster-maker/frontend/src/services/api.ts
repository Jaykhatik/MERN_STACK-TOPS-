const API_URL = 'http://localhost:5000';

export const api = {
  getTemplates: async () => {
    const res = await fetch(`${API_URL}/templates`);
    if (!res.ok) throw new Error('Failed to fetch templates');
    return res.json();
  },
  
  createDesign: async (data: { templateId: string; text: string; backgroundColor?: string }) => {
    const res = await fetch(`${API_URL}/design`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create design');
    return res.json();
  },
  
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData
    });
    if (!res.ok) throw new Error('Failed to upload image');
    return res.json();
  },
  
  setBackground: async (color: string) => {
    const res = await fetch(`${API_URL}/background`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ backgroundColor: color })
    });
    if (!res.ok) throw new Error('Failed to update background');
    return res.json();
  },

  getDesigns: async () => {
    const res = await fetch(`${API_URL}/designs`);
    if (!res.ok) throw new Error('Failed to fetch designs');
    return res.json();
  },

  deleteDesign: async (id: string) => {
    const res = await fetch(`${API_URL}/design/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete design');
    return res.json();
  }
};
