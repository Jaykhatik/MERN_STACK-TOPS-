import type { UserProfile } from "../types";

interface ProfileProps {
  profile: UserProfile;
}

export default function Profile({ profile }: ProfileProps) {
  return (
    <div className="card slide-down" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <img 
        src={profile.profileImage} 
        alt={profile.username}
        style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '16px', border: '3px solid var(--primary)', padding: '2px' }}
      />
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '4px' }}>{profile.username}</h2>
      
      <div style={{ display: 'flex', gap: '16px', margin: '16px 0', fontSize: '14px' }}>
        <div><strong>{profile.posts}</strong> posts</div>
        <div><strong>{profile.followers}</strong> followers</div>
        <div><strong>{profile.following}</strong> following</div>
      </div>
      
      <p style={{ fontSize: '14px', color: 'var(--text-muted)', whiteSpace: 'pre-line', marginBottom: '16px' }}>
        {profile.bio}
      </p>

      <button className="btn-primary" style={{ width: '100%' }}>Edit Profile</button>
    </div>
  );
}
