import React, { useState, useEffect } from 'react';

function App() {
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('username');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState('username');

  // Edit Link Modal/State
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editUrl, setEditUrl] = useState('');

  const [isAdminView, setIsAdminView] = useState(true);

  // Fetch all links
  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = () => {
    fetch('https://linkdrop-web.onrender.com/api/links')
      .then(res => res.json())
      .then(data => setLinks(data))
      .catch(err => console.error("Error fetching links:", err));
  };

  // Add Link Handler
  const handleAddLink = async (e) => {
    e.preventDefault();
    if (!title || !url) return alert("Please fill in both fields!");

    try {
      const response = await fetch('https://linkdrop-web.onrender.com/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, url })
      });
      const newLinkData = await response.json();
      if (response.ok) {
        setLinks([newLinkData, ...links]);
        setTitle('');
        setUrl('');
      }
    } catch (err) {
      console.error("Error saving link:", err);
    }
  };

  // Delete Link Handler
  const handleDeleteLink = async (id) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      try {
        const response = await fetch(`https://linkdrop-web.onrender.com/api/links/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setLinks(links.filter(link => link._id !== id));
        }
      } catch (err) {
        console.error("Error deleting link:", err);
      }
    }
  };

  // Start Editing Link
  const handleStartEdit = (link) => {
    setEditingId(link._id);
    setEditTitle(link.title);
    setEditUrl(link.url);
  };

  // Save Updated Link (Fixed localhost -> render)
  const handleSaveEdit = async (id) => {
    try {
      const response = await fetch(`https://linkdrop-web.onrender.com/api/links/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, url: editUrl })
      });
      const updatedData = await response.json();
      if (response.ok) {
        setLinks(links.map(link => link._id === id ? updatedData : link));
        setEditingId(null);
      }
    } catch (err) {
      console.error("Error updating link:", err);
    }
  };

  // Click Count Handler (Fixed localhost -> render)
  const handleLinkClick = async (id, targetUrl) => {
    try {
      await fetch(`https://linkdrop-web.onrender.com/api/links/${id}/click`, {
        method: 'PATCH',
      });
      // UI-তে ইনস্ট্যান্ট ক্লিক সংখ্যা বাড়িয়ে দেখানো
      setLinks(links.map(l => l._id === id ? { ...l, clicks: (l.clicks || 0) + 1 } : l));
    } catch (err) {
      console.error("Error updating click count:", err);
    }
  };

  // Save Username Handler
  const handleSaveUsername = () => {
    if (!tempUsername.trim()) return alert("Username cannot be empty!");
    const formattedUsername = tempUsername.trim().toLowerCase().replace(/\s+/g, '');
    setUsername(formattedUsername);
    setIsEditingUsername(false);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif', paddingBottom: '40px' }}>
      
      {/* Navigation Bar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', backgroundColor: '#1e293b' }}>
        <h1>🔗 Linkdrop</h1>
        
        <button 
          onClick={() => setIsAdminView(!isAdminView)}
          style={{ backgroundColor: isAdminView ? '#6366f1' : '#10b981', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
        >
          {isAdminView ? '👁️ View as Public Visitor' : '🛠️ Back to Admin Dashboard'}
        </button>
      </nav>

      {/* Main Layout Container */}
      <div className="grid-container" style={{ display: 'flex', gap: '30px', justifyContent: 'center', margin: '40px auto', maxWidth: '1000px', flexWrap: 'wrap' }}>
        
        {/* Left Side: Profile Card */}
        <div className="profile-card" style={{ backgroundColor: '#1e293b', padding: '30px 20px', borderRadius: '16px', textAlign: 'center', width: '260px', height: 'fit-content' }}>
          <div className="avatar" style={{ width: '80px', height: '80px', backgroundColor: '#6366f1', borderRadius: '50%', margin: '0 auto 15px', fontSize: '28px', fontWeight: 'bold', lineHeight: '80px' }}>
            {username.substring(0, 2).toUpperCase()}
          </div>
          
          {isAdminView && isEditingUsername ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input 
                type="text" 
                value={tempUsername} 
                onChange={(e) => setTempUsername(e.target.value)}
                style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '6px', borderRadius: '6px', color: 'white', textAlign: 'center' }}
              />
              <button onClick={handleSaveUsername} style={{ backgroundColor: '#10b981', color: 'white', padding: '6px', borderRadius: '6px', border: 'none', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Save</button>
            </div>
          ) : (
            <h2>
              @{username} 
              {isAdminView && <button onClick={() => { setTempUsername(username); setIsEditingUsername(true); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>✏️</button>}
            </h2>
          )}

          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '12px' }}>Welcome to my Linkdrop bio profile page!</p>
          
          <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', padding: '12px', borderRadius: '12px', fontSize: '12px', textAlign: 'left', marginTop: '24px' }}>
            <span style={{ color: '#64748b' }}>Live Bio Link URL:</span>
            <p style={{ color: '#818cf8', fontFamily: 'monospace', margin: '4px 0 0 0' }}>{username}</p>
          </div>
        </div>

        {/* Right Side Area */}
        <div className="dashboard-area" style={{ flex: '1', minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Add Link Form (Admin Only) */}
          {isAdminView && (
            <div className="links-box" style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '16px' }}>
              <h3 style={{ margin: '0 0 16px 0' }}>➕ Add New Bio Link</h3>
              <form onSubmit={handleAddLink} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input 
                  type="text" 
                  placeholder="Link Title (e.g., My Facebook)" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '12px', borderRadius: '8px', color: 'white' }}
                />
                <input 
                  type="url" 
                  placeholder="Target URL (https://...)" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '12px', borderRadius: '8px', color: 'white' }}
                />
                <button type="submit" style={{ backgroundColor: '#6366f1', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
                  Save Link to Database
                </button>
              </form>
            </div>
          )}

          {/* Active Bio Links List */}
          <div className="links-box" style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '16px' }}>
            <h3 style={{ margin: '0 0 16px 0' }}>{isAdminView ? '🚀 Active Bio Links' : '🔗 Quick Links'}</h3>
            <div>
              {links.length === 0 ? (
                <p style={{ color: '#64748b' }}>No links found.</p>
              ) : (
                links.map((link) => (
                  <div key={link._id || link.id} style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '12px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(51, 65, 85, 0.6)' }}>
                    
                    {/* EDIT MODE FORM */}
                    {editingId === link._id ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                        <input 
                          type="text" 
                          value={editTitle} 
                          onChange={(e) => setEditTitle(e.target.value)} 
                          style={{ backgroundColor: '#1e293b', border: '1px solid #6366f1', padding: '8px', borderRadius: '6px', color: 'white' }}
                        />
                        <input 
                          type="url" 
                          value={editUrl} 
                          onChange={(e) => setEditUrl(e.target.value)} 
                          style={{ backgroundColor: '#1e293b', border: '1px solid #6366f1', padding: '8px', borderRadius: '6px', color: 'white' }}
                        />
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => handleSaveEdit(link._id)} style={{ backgroundColor: '#10b981', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Save</button>
                          <button onClick={() => setEditingId(null)} style={{ backgroundColor: '#64748b', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      /* NORMAL VIEW */
                      <>
                        <div>
                          <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={() => handleLinkClick(link._id, link.url)}
                            style={{ color: '#e2e8f0', textDecoration: 'none', fontWeight: 'bold' }}
                          >
                            {link.title} ↗
                          </a>
                          <p style={{ color: '#64748b', fontSize: '12px', margin: '4px 0 0' }}>{link.url}</p>
                        </div>

                        {/* Admin Action Buttons */}
                        {isAdminView && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ backgroundColor: '#1e293b', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', color: '#818cf8', fontFamily: 'monospace' }}>
                              📈 {link.clicks || 0} clicks
                            </span>
                            <button onClick={() => handleStartEdit(link)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }} title="Edit">✏️</button>
                            <button onClick={() => handleDeleteLink(link._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }} title="Delete">🗑️</button>
                          </div>
                        )}
                      </>
                    )}

                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;