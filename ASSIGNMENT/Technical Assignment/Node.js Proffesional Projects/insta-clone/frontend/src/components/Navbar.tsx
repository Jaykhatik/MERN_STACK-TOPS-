import { Search, Heart, PlusSquare, Home } from 'lucide-react';

interface NavbarProps {
  onOpenModal: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  profileImage?: string;
}

export default function Navbar({ onOpenModal, searchQuery, setSearchQuery, profileImage }: NavbarProps) {
  return (
    <nav className="glass" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, 
      height: '60px', display: 'flex', alignItems: 'center'
    }}>
      <div style={{
        maxWidth: '900px', margin: '0 auto', width: '100%', padding: '0 20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: "'Inter', sans-serif", letterSpacing: '-0.5px' }}>
          Instaclone
        </div>
        
        <div style={{ position: 'relative', width: '250px' }}>
          <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%', padding: '8px 16px 8px 36px',
              borderRadius: '8px', border: 'none', background: '#f1f5f9',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button><Home size={24} /></button>
          <button onClick={onOpenModal}><PlusSquare size={24} /></button>
          <button><Heart size={24} /></button>
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%',
            overflow: 'hidden', border: '1px solid var(--border-color)'
          }}>
            <img src={profileImage || 'https://via.placeholder.com/150'} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </nav>
  );
}
