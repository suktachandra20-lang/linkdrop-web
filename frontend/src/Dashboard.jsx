import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [user, setUser] = useState(null);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));
    fetchLinks(token);
  }, [navigate]);

  const fetchLinks = async (token) => {
    try {
      const res = await fetch('https://linkdrop-web-1.onrender.com/api/links', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setLinks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddLink = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('https://linkdrop-web-1.onrender.com/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, url })
      });

      const data = await res.json();
      if (res.ok) {
        setLinks([...links, data]);
        setTitle('');
        setUrl('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`https://linkdrop-web-1.onrender.com/api/links/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        setLinks(links.filter((link) => link._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const copyPublicLink = () => {
    const publicUrl = `${window.location.origin}/u/${user?.username}`;
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', padding: '24px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#818cf8', margin: 0 }}>
              Welcome, {user?.username || 'User'} 👋
            </h1>
            <p style={{ fontSize: '14px', color: '#94a3b8', margin: '4px 0 0 0' }}>Manage your links & bio page</p>
          </div>
          <button onClick={handleLogout} style={{ padding: '8px 16px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            Logout
          </button>
        </div>

        {/* Public Bio Share Box */}
        {user?.username && (
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block' }}>Your Public Bio Link:</span>
              <a href={`/u/${user.username}`} target="_blank" rel="noreferrer" style={{ color: '#38bdf8', fontSize: '14px', textDecoration: 'none', fontWeight: '600' }}>
                {window.location.origin}/u/{user.username}
              </a>
            </div>
            <button onClick={copyPublicLink} style={{ padding: '8px 12px', backgroundColor: copied ? '#10b981' : '#334155', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>
              {copied ? 'Copied! ✨' : 'Copy Bio Link'}
            </button>
          </div>
        )}

        {/* Add Link Form */}
        <form onSubmit={handleAddLink} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '20px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#f8fafc' }}>Add New Link</h3>
          <input type="text" placeholder="Link Title (e.g. My Portfolio)" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ padding: '10px 14px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff', outline: 'none' }} />
          <input type="url" placeholder="URL (https://...)" value={url} onChange={(e) => setUrl(e.target.value)} required style={{ padding: '10px 14px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff', outline: 'none' }} />
          <button type="submit" style={{ padding: '10px', backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Add Link</button>
        </form>

        {/* Saved Links List */}
        <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>Your Saved Links</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {links.length === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>No links added yet.</p>
          ) : (
            links.map((item) => (
              <div key={item._id} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '10px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#38bdf8' }}>{item.title}</h4>
                  <a href={item.url} target="_blank" rel="noreferrer" style={{ color: '#94a3b8', fontSize: '13px', textDecoration: 'none' }}>{item.url}</a>
                </div>
                <button onClick={() => handleDelete(item._id)} style={{ padding: '6px 12px', backgroundColor: '#ef444422', color: '#f87171', border: '1px solid #ef4444', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;