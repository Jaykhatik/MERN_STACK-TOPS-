import React from 'react';
import { Palette, Image as ImageIcon, Type, Home, Settings, FolderHeart } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const items = [
    { id: 'templates', icon: Home, label: 'Templates' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'background', icon: Palette, label: 'Background' },
    { id: 'upload', icon: ImageIcon, label: 'Upload' },
    { id: 'designs', icon: FolderHeart, label: 'Designs' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <aside className="sidebar">
      {items.map((item) => (
        <button
          key={item.id}
          className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
          onClick={() => setActiveTab(item.id)}
        >
          <item.icon size={24} />
          <span>{item.label}</span>
        </button>
      ))}
    </aside>
  );
};
