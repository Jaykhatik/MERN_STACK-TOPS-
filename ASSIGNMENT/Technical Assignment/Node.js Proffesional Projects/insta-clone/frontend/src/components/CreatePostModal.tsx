import { useState } from 'react';
import { X } from 'lucide-react';

interface CreatePostModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreatePostModal({ onClose, onSuccess }: CreatePostModalProps) {
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;

    setIsLoading(true);
    try {
      await fetch('http://localhost:5000/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl, caption })
      });
      onSuccess();
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100, padding: '20px'
    }}>
      <div className="card slide-down" style={{
        width: '100%', maxWidth: '500px', padding: '24px',
        position: 'relative'
      }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', color: 'var(--text-muted)' }}
        >
          <X size={24} />
        </button>
        
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '20px', textAlign: 'center' }}>
          Create New Post
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
              Image URL
            </label>
            <input 
              type="url" 
              required
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              style={{
                width: '100%', padding: '10px 12px',
                borderRadius: '8px', border: '1px solid var(--border-color)',
                background: '#f8fafc'
              }}
            />
            {imageUrl && (
              <div style={{ marginTop: '12px', borderRadius: '8px', overflow: 'hidden', height: '150px' }}>
                <img src={imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.currentTarget.style.display = 'none'} />
              </div>
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
              Caption
            </label>
            <textarea 
              value={caption}
              onChange={e => setCaption(e.target.value)}
              placeholder="Write a caption..."
              rows={4}
              style={{
                width: '100%', padding: '10px 12px',
                borderRadius: '8px', border: '1px solid var(--border-color)',
                background: '#f8fafc', resize: 'vertical'
              }}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isLoading || !imageUrl}
            style={{ marginTop: '8px', opacity: (isLoading || !imageUrl) ? 0.7 : 1, padding: '12px' }}
          >
            {isLoading ? 'Sharing...' : 'Share Post'}
          </button>
        </form>
      </div>
    </div>
  );
}
