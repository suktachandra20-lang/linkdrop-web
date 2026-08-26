import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PublicBio = () => {
  const { username } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://linkdrop-web-1.onrender.com/api/user/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error('User not found');
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [username]);

  if (loading) return <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading profile...</div>;
  if (error) return <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f87171', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>User Not Found!</div>;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', padding: '40px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* Profile Avatar & Name */}
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#6366f1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold', margin: '0 auto 16px auto' }}>
          {data.user.username[0].toUpperCase()}
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: 'bold', margin: '0 0 4px 0' }}>@{data.user.username}</h1>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>Welcome to my official links!</p>

        {/* Links List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {data.links.map((link) => (
            <a
              key={link._id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              style={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                padding: '14px 20px',
                borderRadius: '12px',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.2s',
                display: 'block'
              }}
            >
              {link.title}
            </a>
          ))}
        </div>

        <p style={{ marginTop: '40px', fontSize: '12px', color: '#64748b' }}>Powered by LinkDrop</p>
      </div>
    </div>
  );
};

export default PublicBio;