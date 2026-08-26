import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleAddLink = (e) => {
    e.preventDefault();
    if (!title || !url) return;
    setLinks([...links, { id: Date.now(), title, url }]);
    setTitle('');
    setUrl('');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid #334155', paddingBottom: '16px' }}>
          <h1 style={{ fontSize: '24px', color: '#818cf8', margin: 0 }}>LinkDrop Dashboard</h1>
          <button onClick={handleLogout} style={{ padding: '8px 16px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            Logout
          </button>
        </div>

        {/* Add Link Form */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '32px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '16px' }}>Add New Link</h3>
          <form onSubmit={handleAddLink} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Link Title (e.g. My Portfolio)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ flex: '1', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#fff' }}
            />
            <input
              type="url"
              placeholder="URL (https://...)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{ flex: '1', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#fff' }}
            />
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
              Add Link
            </button>
          </form>
        </div>

        {/* Links List */}
        <div>
          <h3>Your Saved Links</h3>
          {links.length === 0 ? (
            <p style={{ color: '#94a3b8' }}>No links added yet. Add your first link above!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {links.map((item) => (
                <div key={item.id} style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '8px', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', color: '#38bdf8' }}>{item.title}</h4>
                    <a href={item.url} target="_blank" rel="noreferrer" style={{ color: '#94a3b8', fontSize: '14px', textDecoration: 'none' }}>{item.url}</a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;