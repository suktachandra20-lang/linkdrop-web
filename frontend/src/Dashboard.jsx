import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'https://linkdrop-web.onrender.com/api';

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [slug, setSlug] = useState(''); 
  const [copied, setCopied] = useState(false);
  
  
  const [analyticsData, setAnalyticsData] = useState([]);
  const [selectedLinkTitle, setSelectedLinkTitle] = useState('');
  const [showModal, setShowModal] = useState(false);

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
      const res = await fetch(`${API_URL}/links`, {
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
      const res = await fetch(`${API_URL}/links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, url, slug: slug.trim() ? slug : undefined })
      });

      const data = await res.json();
      if (res.ok) {
        setLinks([...links, data.newLink || data]);
        setTitle('');
        setUrl('');
        setSlug('');
      } else {
        alert(data.error || 'Failed to create link');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/links/${id}`, {
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

  
  const fetchAnalytics = async (linkId, linkTitle) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/analytics/${linkId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setAnalyticsData(data);
        setSelectedLinkTitle(linkTitle);
        setShowModal(true);
      } else {
        alert(data.error || 'Could not load analytics.');
      }
    } catch (err) {
      console.error(err);
      alert('Could not load analytics.');
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
            <p style={{ fontSize: '14px', color: '#94a3b8', margin: '4px 0 0 0' }}>Manage your links & track performance</p>
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

        {/* Add Link Form with Custom Slug */}
        <form onSubmit={handleAddLink} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '20px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#f8fafc' }}>Add New Link</h3>
          <input 
            type="text" 
            placeholder="Link Title (e.g. My Portfolio)" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            style={{ padding: '10px 14px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff', outline: 'none' }} 
          />
          <input 
            type="url" 
            placeholder="URL (https://...)" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
            required 
            style={{ padding: '10px 14px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff', outline: 'none' }} 
          />
          <input 
            type="text" 
            placeholder="Custom Slug / Short name (Optional, e.g. my-brand)" 
            value={slug} 
            onChange={(e) => setSlug(e.target.value)} 
            style={{ padding: '10px 14px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff', outline: 'none' }} 
          />
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
                  <a href={item.url} target="_blank" rel="noreferrer" style={{ color: '#94a3b8', fontSize: '13px', textDecoration: 'none', display: 'block', marginBottom: '4px' }}>{item.url}</a>
                  {item.slug && (
                    <p style={{ fontSize: '12px', color: '#818cf8', margin: '0 0 4px 0' }}>Slug: /{item.slug}</p>
                  )}
                  <span style={{ fontSize: '12px', backgroundColor: '#334155', padding: '2px 8px', borderRadius: '4px', color: '#a5b4fc', fontWeight: 'bold', display: 'inline-block' }}>
                    👆 {item.clicks || 0} Clicks
                  </span>
                </div>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  {/* Analytics Button */}
                  <button onClick={() => fetchAnalytics(item._id, item.title)} style={{ padding: '6px 12px', backgroundColor: '#8b5cf6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                    Analytics
                  </button>
                  {/* Delete Button */}
                  <button onClick={() => handleDelete(item._id)} style={{ padding: '6px 12px', backgroundColor: '#ef444422', color: '#f87171', border: '1px solid #ef4444', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Analytics Modal */}
        {showModal && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '16px' }}>
            <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '500px', color: '#fff', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '4px', color: '#38bdf8' }}>Analytics: {selectedLinkTitle}</h2>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px' }}>Detailed visitor device & location logs</p>

              <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
                {analyticsData.length === 0 ? (
                  <p style={{ color: '#94a3b8', textAlign: 'center', padding: '20px 0', fontSize: '14px' }}>No click analytics recorded yet.</p>
                ) : (
                  analyticsData.map((stat, idx) => (
                    <div key={idx} style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                      <div>
                        <p style={{ margin: '0 0 2px 0' }}>💻 <strong>{stat.device}</strong> ({stat.browser} / {stat.os})</p>
                        <p style={{ margin: 0, color: '#94a3b8' }}>📍 {stat.city || 'Unknown City'}, {stat.country || 'Unknown Country'}</p>
                      </div>
                      <div style={{ textAlign: 'right', fontSize: '11px', color: '#94a3b8' }}>
                        {new Date(stat.createdAt).toLocaleDateString()}<br />
                        {new Date(stat.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <button onClick={() => setShowModal(false)} style={{ marginTop: '16px', padding: '10px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}>
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;