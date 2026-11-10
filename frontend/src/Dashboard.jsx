import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState('');
  const [username, setUsername] = useState('xor');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('https://linkdrop-web.onrender.com/api/links', {
      headers: { 'x-auth-token': token }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setLinks(data);
      })
      .catch(err => console.error(err));
  }, [navigate]);

  const handleAddLink = async (e) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('https://linkdrop-web.onrender.com/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ title, url, slug })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to add link');
      } else {
        setLinks([data, ...links]);
        setTitle('');
        setUrl('');
        setSlug('');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`https://linkdrop-web.onrender.com/api/links/${id}`, {
      method: 'DELETE',
      headers: { 'x-auth-token': token }
    });
    if (res.ok) {
      setLinks(links.filter(l => l._id !== id));
    }
  };

  const totalClicks = links.reduce((sum, link) => sum + (link.clicks || 0), 0);

  return (
    <div style={{ backgroundColor: '#030712', color: '#f9fafb', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', paddingBottom: '60px' }}>
      
      {/* Top Header */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(3,7,18,0.9)', backdropFilter: 'blur(10px)' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '8px' }}>
          ⚡ LinkDrop
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '14px', color: '#9ca3af' }}>Welcome, <strong style={{ color: '#fff' }}>{username}</strong> 👋</span>
          <button onClick={() => { localStorage.removeItem('token'); navigate('/login'); }} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Grid Layout */}
      <div style={{ maxWidth: '1280px', margin: '40px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '30px' }}>
        
        {/* Left Main Content */}
        <div>
          {/* Stats & Device Traffic Overview */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '35px' }}>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', padding: '24px', borderRadius: '16px' }}>
              <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '8px', textTransform: 'uppercase' }}>Total Active Links</p>
              <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#38bdf8' }}>{links.length}</h2>
            </div>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', padding: '24px', borderRadius: '16px' }}>
              <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '8px', textTransform: 'uppercase' }}>Global Lifetime Clicks</p>
              <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#4ade80' }}>{totalClicks}</h2>
            </div>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', padding: '24px', borderRadius: '16px' }}>
              <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '8px', textTransform: 'uppercase' }}>Global Traffic by Device</p>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px', fontSize: '12px', color: '#9ca3af' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'conic-gradient(#38bdf8 0% 55%, #4ade80 55% 75%, #f43f5e 75% 100%)' }}></div>
                <div>
                  <p style={{ color: '#38bdf8' }}>● Desktop 55%</p>
                  <p style={{ color: '#4ade80' }}>● Mobile 20%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Public Bio Link Box */}
          <div style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', padding: '20px 24px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
            <div>
              <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Your Public Bio Link:</p>
              <code style={{ color: '#38bdf8', fontSize: '14px' }}>https://linkdrop-web.vercel.app/u/{username}</code>
            </div>
            <button onClick={() => navigator.clipboard.writeText(`https://linkdrop-web.vercel.app/u/${username}`)} style={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
              Copy Link
            </button>
          </div>

          {/* Add New Link Form */}
          <div style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', padding: '28px', borderRadius: '16px', marginBottom: '35px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>Add New Link</h3>
            {error && <p style={{ color: '#ef4444', marginBottom: '15px', fontSize: '14px' }}>{error}</p>}
            <form onSubmit={handleAddLink} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="text" placeholder="Link Title (e.g. My Portfolio)" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ padding: '12px 16px', borderRadius: '10px', backgroundColor: '#030712', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' }} />
              <input type="url" placeholder="URL (https://...)" value={url} onChange={(e) => setUrl(e.target.value)} required style={{ padding: '12px 16px', borderRadius: '10px', backgroundColor: '#030712', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' }} />
              <input type="text" placeholder="Custom Slug (Optional, e.g. my-brand)" value={slug} onChange={(e) => setSlug(e.target.value)} style={{ padding: '12px 16px', borderRadius: '10px', backgroundColor: '#030712', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' }} />
              <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', padding: '12px', borderRadius: '10px', border: 'none', fontWeight: '600', cursor: 'pointer', fontSize: '15px' }}>
                Add Link
              </button>
            </form>
          </div>

          {/* Saved Links List with QR Code preview */}
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>Your Saved Links</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {links.map((link) => (
              <div key={link._id} style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', padding: '20px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#38bdf8', marginBottom: '4px' }}>{link.title}</h4>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#9ca3af', fontSize: '13px', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>{link.url}</a>
                  <span style={{ backgroundColor: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                    🔥 {link.clicks || 0} Clicks
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* Mock QR Code Box */}
                  <div style={{ width: '45px', height: '45px', backgroundColor: '#fff', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#000', fontWeight: 'bold' }}>
                    QR
                  </div>
                  <button onClick={() => navigate(`/analytics/${link._id}`)} style={{ backgroundColor: '#334155', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
                    Analytics
                  </button>
                  <button onClick={() => handleDelete(link._id)} style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Expanded & Big Quick Actions */}
        <div>
          <div style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', padding: '28px', borderRadius: '16px', position: 'sticky', top: '20px' }}>
            <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: '#f3f4f6', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>⚡ Quick Actions</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '15px' }}>
              <div style={{ padding: '16px', backgroundColor: '#030712', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', fontWeight: '600', color: '#38bdf8' }}>
                🎨 Design Customization
              </div>
              <div style={{ padding: '16px', backgroundColor: '#030712', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', fontWeight: '600', color: '#4ade80' }}>
                🌐 Domain Management
              </div>
              <div style={{ padding: '16px', backgroundColor: '#030712', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', fontWeight: '600', color: '#f43f5e' }}>
                📊 Traffic Insights
              </div>
              <div style={{ padding: '16px', backgroundColor: '#030712', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', fontWeight: '600', color: '#c084fc' }}>
                ⚙️ Link Expiry Settings
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;