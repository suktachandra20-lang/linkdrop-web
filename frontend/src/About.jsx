import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 8%', backgroundColor: '#1e293b', borderBottom: '1px solid #334155' }}>
        <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#818cf8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🔗 LinkDrop
        </Link>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '600' }}>Home</Link>
          <Link to="/login" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '600' }}>Sign In</Link>
          <Link to="/register" style={{ backgroundColor: '#6366f1', color: '#fff', textDecoration: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold' }}>Get Started</Link>
        </div>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#818cf8', marginBottom: '16px', textAlign: 'center' }}>About LinkDrop</h1>
        <p style={{ fontSize: '18px', color: '#94a3b8', textAlign: 'center', lineHeight: '1.6', marginBottom: '40px' }}>
          LinkDrop is a modern, full-stack bio-link management platform designed to consolidate all your important links into one stylish, shareable page.
        </p>

        {/* Tech Stack Cards */}
        <h2 style={{ fontSize: '22px', marginBottom: '20px', color: '#f8fafc' }}>Tech Stack Used:</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
            <h3 style={{ color: '#38bdf8', margin: '0 0 8px 0' }}>Frontend</h3>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>React.js, React Router, Vite</p>
          </div>
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
            <h3 style={{ color: '#4ade80', margin: '0 0 8px 0' }}>Backend</h3>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>Node.js, Express.js, JWT Auth</p>
          </div>
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
            <h3 style={{ color: '#facc15', margin: '0 0 8px 0' }}>Database & Host</h3>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>MongoDB Atlas, Vercel, Render</p>
          </div>
        </div>

        {/* Developer Info Box */}
        <div style={{ backgroundColor: '#1e293b', padding: '30px', borderRadius: '16px', border: '1px solid #334155', textAlign: 'center' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>Developed with ❤️</h2>
          <p style={{ color: '#94a3b8', margin: '0 0 20px 0', fontSize: '15px' }}>Built as a production-ready Web Application project.</p>
          <Link to="/register" style={{ backgroundColor: '#6366f1', color: '#fff', textDecoration: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 'bold', display: 'inline-block' }}>
            Create Your Bio Link Now
          </Link>
        </div>
      </div>

    </div>
  );
};

export default About;