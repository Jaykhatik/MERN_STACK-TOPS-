const MOCK_STORIES = [
  { id: 1, username: 'your_story', img: 'https://i.pravatar.cc/150?u=0' },
  { id: 2, username: 'alex_cool', img: 'https://i.pravatar.cc/150?u=3' },
  { id: 3, username: 'jane_smith', img: 'https://i.pravatar.cc/150?u=2' },
  { id: 4, username: 'sarah_w', img: 'https://i.pravatar.cc/150?u=4' },
  { id: 5, username: 'mike_t', img: 'https://i.pravatar.cc/150?u=5' },
  { id: 6, username: 'john_doe', img: 'https://i.pravatar.cc/150?u=1' },
];

export default function Stories() {
  return (
    <div className="card no-scrollbar" style={{ 
      padding: '16px', display: 'flex', gap: '16px', overflowX: 'auto', 
      scrollSnapType: 'x mandatory'
    }}>
      {MOCK_STORIES.map(story => (
        <div key={story.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '70px', cursor: 'pointer' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%', padding: '2px',
            background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
            marginBottom: '4px',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img src={story.img} alt={story.username} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '2px solid white' }} />
          </div>
          <span style={{ fontSize: '12px', maxWidth: '70px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {story.username}
          </span>
        </div>
      ))}
    </div>
  );
}
