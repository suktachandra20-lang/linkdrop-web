import React, { useState, useEffect } from 'react';

function App() {
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  
  // NEW: Username State Management
  const [username, setUsername] = useState('username');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState('username');

  // Fetching links from database
  useEffect(() => {
    fetch('http://localhost:5000/api/links')
      .then(res => res.json())
      .then(data => setLinks(data))
      .catch(err => console.error("Error fetching links:", err));
  }, []);

  // Save new link function
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
      } else {
        alert(newLinkData.error || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error saving link:", err);
    }
  };

  // NEW: Save updated username handler
  const handleSaveUsername = () => {
    if (!tempUsername.trim()) return alert("Username cannot be empty!");
    // Remove spaces and make it lowercase like real profile URLs
    const formattedUsername = tempUsername.trim().toLowerCase().replace(/\s+/g, '');
    setUsername(formattedUsername);
    setIsEditingUsername(false);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif', paddingBottom: '40px' }}>
      
      {/* Navigation Bar */}
      <nav>
        <h1>🔗 Linkdrop</h1>
        <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#34d399', fontSize: '12px', padding: '4px 10px', borderRadius: '9999px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          Full-Stack + Dynamic Bio
        </div>
      </nav>

      {/* Main Grid Container */}
      <div className="grid-container">
        
        {/* Left Side: Profile Card (Updated with Dynamic Username) */}
        <div className="profile-card">
          <div className="avatar">{username.substring(0, 2).toUpperCase()}</div>
          
          {isEditingUsername ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
              <input 
                type="text" 
                value={tempUsername} 
                onChange={(e) => setTempUsername(e.target.value)}
                style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '6px 10px', borderRadius: '6px', color: 'white', fontSize: '14px', textAlign: 'center' }}
              />
              <button 
                onClick={handleSaveUsername}
                style={{ backgroundColor: '#10b981', color: 'white', padding: '6px', borderRadius: '6px', border: 'none', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Save Name
              </button>
            </div>
          ) : (
            <div style={{ width: '100%' }}>
              <h2 style={{ margin: '0', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                @{username}
                <button 
                  onClick={() => { setTempUsername(username); setIsEditingUsername(true); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}
                  title="Edit Username"
                >
                  ✏️
                </button>
              </h2>
            </div>
          )}

          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '12px 0 0 0' }}>Welcome to my Linkdrop bio profile page!</p>
          
          <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(51, 65, 85, 0.5)', fontSize: '12px', textAlign: 'left', marginTop: '24px' }}>
            <span style={{ color: '#64748b' }}>Live Bio Link URL:</span>
            <p style={{ color: '#818cf8', fontFamily: 'monospace', margin: '4px 0 0 0', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              localhost:5173/{username}
            </p>
          </div>
        </div>

        {/* Right Side: Link Management Dashboard */}
        <div className="dashboard-area">
          
          {/* Add New Link Form Box */}
          <div className="links-box">
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>➕ Add New Bio Link</h3>
            <form onSubmit={handleAddLink} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input 
                type="text" 
                placeholder="Link Title (e.g., My Facebook)" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '12px', borderRadius: '8px', color: 'white', fontSize: '14px' }}
              />
              <input 
                type="url" 
                placeholder="Target URL (https://...)" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '12px', borderRadius: '8px', color: 'white', fontSize: '14px' }}
              />
              <button 
                type="submit" 
                style={{ backgroundColor: '#6366f1', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Save Link to Database
              </button>
            </form>
          </div>

          {/* Active Links Box */}
          <div className="links-box">
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>🚀 Active Bio Links</h3>
            <div>
              {links.length === 0 ? (
                <p style={{ color: '#64748b', fontSize: '14px' }}>No links found in database. Add your first link above!</p>
              ) : (
                links.map((link) => (
                  <div key={link._id || link.id} className="link-item">
                    <div>
                      <h4>{link.title}</h4>
                      <p>{link.url}</p>
                    </div>
                    <div>
                      <span className="click-badge">📈 {link.clicks || 0} clicks</span>
                    </div>
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
