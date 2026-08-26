import React, { useState, useEffect } from 'react';
import AuthModal from './AuthModal';

export default function App() {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      fetchLinks(token);
    }
  }, []);

  
  const fetchLinks = async (token) => {
    try {
      const res = await fetch('http://localhost:5000/api/links', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
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
      const res = await fetch('http://localhost:5000/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, url })
      });
      const newLink = await res.json();
      if (res.ok) {
        setLinks([...links, newLink]);
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
      const res = await fetch(`http://localhost:5000/api/links/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setLinks(links.filter((link) => link._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setLinks([]);
  };

  if (!user) {
    return <AuthModal onLoginSuccess={(userData) => {
      setUser(userData);
      fetchLinks(localStorage.getItem('token'));
    }} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Link Input Form */}
        <form onSubmit={handleAddLink} className="flex flex-col gap-3 mb-6">
          <input
            type="text"
            placeholder="Link Title"
            className="border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="url"
            placeholder="URL (https://...)"
            className="border p-2 rounded"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700"
          >
            Add Link
          </button>
        </form>

        {/* Links List */}
        <div className="space-y-3">
          {links.map((link) => (
            <div key={link._id} className="flex justify-between items-center border p-3 rounded">
              <div>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  {link.title}
                </a>
                <p className="text-xs text-gray-500">{link.url}</p>
              </div>
              <button
                onClick={() => handleDelete(link._id)}
                className="text-red-500 text-sm hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
          {links.length === 0 && (
            <p className="text-center text-gray-500 text-sm">No links added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}