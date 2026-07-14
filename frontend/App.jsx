import React, { useState, useEffect } from 'react';

function App() {
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('username');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState('username');

  // NEW: State to switch between Admin Dashboard and Public Visitor View
  const [isAdminView, setIsAdminView] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/links')
      .then(res => res.json())
      .then(data => setLinks(data))
      .catch(err => console.error("Error fetching links:", err));
  }, []);

  const handleAddLink = async (e) => {
    e.preventDefault();
    if (!title || !url) return alert("Please fill in both fields!");

    try {
      const response = await fetch('http://localhost:5000/api/links', {
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
        
        {/* NEW: Toggle button to switch views live in front of the teacher */}
        <button 
          onClick={() => setIsAdminView(!isAdminView)}
          style={{ backgroundColor: isAdminView ? '#6366f1' : '#10b981', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
        >
          {isAdminView ? '👁️ View as Public Visitor' : '🛠️ Back to Admin Dashboard'}
        </button>
      </nav>

      {/* Main Layout Container */}
      <div className="grid-container" style={{ display: 'flex', gap: '30px', justifyContent: 'center', margin: '40px auto', maxWidth: '1000px', flexWrap: 'wrap' }}>
        
        {/* Left Side: Profile Card (Visible to everyone) */}
        <div className="profile-card" style={{ backgroundColor: '#1e293b', padding: '30px 20px', borderRadius: '16px', textAlign: 'center', width: '260px' }}>
          <div className="avatar" style={{ width: '80px', height: '80px', backgroundColor: '#6366f1', borderRadius: '50%', margin: '0 auto 15px', fontSize: '28px', fontWeight: 'bold', lineHeight: '80px' }}>
            {username.substring(0, 2).toUpperCase()}
          </div>
          
          {/* Hide editing controls if it's the public visitor view */}
          {isAdminView && isEditingUsername ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input 
                type="text" 
                value={tempUsername} 
                onChange={(e) => setTempUsername(e.target.value)}
                style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '6px', borderRadius: '6px', color: 'white', textAlign: 'center' }}
              />
              <button onClick={handleSaveUsername} style={{ backgroundColor: '#10b981', color: 'white', padding: '6px', borderRadius: '6px', border: 'none', fontSize: '12px', fontWeight: 'bold' }}>Save</button>
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
            <p style={{ color: '#818cf8', fontFamily: 'monospace', margin: '4px 0 0 0' }}>localhost:5173/{username}</p>
          </div>
        </div>

        {/* Right Side Area */}
        <div className="dashboard-area" style={{ flex: '1', minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* CONDITION: Only show Add Link Form if Admin is logged in */}
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

          {/* Active Bio Links List (Visible to everyone) */}
          <div className="links-box" style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '16px' }}>
            <h3 style={{ margin: '0 0 16px 0' }}>{isAdminView ? '🚀 Active Bio Links' : '🔗 Quick Links'}</h3>
            <div>
              {links.length === 0 ? (
                <p style={{ color: '#64748b' }}>No links found.</p>
              ) : (
                links.map((link) => (
                  <div key={link._id || link.id} style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '12px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(51, 65, 85, 0.6)' }}>
                    <div>
                      {/* Public users can click directly to navigate */}
                      <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#e2e8f0', textDecoration: 'none', fontWeight: 'bold' }}>
                        {link.title} ↗
                      </a>
                      <p style={{ color: '#64748b', fontSize: '12px', margin: '4px 0 0' }}>{link.url}</p>
                    </div>
                    {/* Only Admin can see analytics/clicks badges */}
                    {isAdminView && (
                      <div>
                        <span style={{ backgroundColor: '#1e293b', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', color: '#818cf8', fontFamily: 'monospace' }}>
                          📈 {link.clicks || 0} clicks
                        </span>
                      </div>
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
