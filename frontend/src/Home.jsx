import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 8%', backgroundColor: '#1e293b', borderBottom: '1px solid #334155' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#818cf8', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🔗 LinkDrop
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Link to="/about" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '600', padding: '8px 16px' }}>About</Link>
          <Link to="/login" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '600', padding: '8px 16px' }}>Sign In</Link>
          <Link to="/register" style={{ backgroundColor: '#6366f1', color: '#fff', textDecoration: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold' }}>Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '80px 8% 60px 8%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 500px', maxWidth: '600px' }}>
          
          <div style={{ display: 'inline-block', padding: '6px 14px', backgroundColor: '#312e81', color: '#a5b4fc', borderRadius: '20px', fontSize: '13px', fontWeight: '600', marginBottom: '20px', border: '1px solid #4338ca' }}>
            🚀 ALL-IN-ONE LINK MANAGEMENT
          </div>

          <h1 style={{ fontSize: '48px', fontWeight: '800', lineHeight: '1.2', marginBottom: '20px' }}>
            One Link for <br />
            <span style={{ color: '#818cf8' }}>All Your Content</span>
          </h1>

          <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: '1.6', marginBottom: '32px' }}>
            Share all your social profiles, portfolio, and links in one single bio link. Easy to set up, fully customizable, and free forever.
          </p>

          <div style={{ display: 'flex', gap: '16px' }}>
            <Link to="/register" style={{ backgroundColor: '#6366f1', color: '#fff', textDecoration: 'none', padding: '14px 28px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px' }}>
              Get Started →
            </Link>
            <Link to="/login" style={{ border: '1px solid #475569', color: '#f8fafc', textDecoration: 'none', padding: '14px 28px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px' }}>
              Sign In
            </Link>
          </div>
        </div>

        {/* Hero Illustration Box */}
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '420px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '24px', padding: '30px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#6366f1', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px' }}>👤</div>
            <h3 style={{ fontSize: '20px', margin: '0 0 6px 0' }}>@yourname</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>Welcome to my public bio page!</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '10px', color: '#38bdf8', fontWeight: '600', fontSize: '14px' }}>🌐 My Portfolio</div>
              <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '10px', color: '#38bdf8', fontWeight: '600', fontSize: '14px' }}>💻 GitHub Projects</div>
              <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '10px', color: '#38bdf8', fontWeight: '600', fontSize: '14px' }}>📩 Contact Me</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section style={{ backgroundColor: '#1e293b', padding: '40px 8%', borderTop: '1px solid #334155', borderBottom: '1px solid #334155', marginTop: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '30px', textAlign: 'center' }}>
          <div>
            <h2 style={{ fontSize: '32px', color: '#818cf8', margin: '0' }}>100%</h2>
            <p style={{ color: '#94a3b8', margin: '4px 0 0 0', fontSize: '14px' }}>Free to Use</p>
          </div>
          <div>
            <h2 style={{ fontSize: '32px', color: '#818cf8', margin: '0' }}>⚡ Instant</h2>
            <p style={{ color: '#94a3b8', margin: '4px 0 0 0', fontSize: '14px' }}>Link Sharing</p>
          </div>
          <div>
            <h2 style={{ fontSize: '32px', color: '#818cf8', margin: '0' }}>🔒 Secure</h2>
            <p style={{ color: '#94a3b8', margin: '4px 0 0 0', fontSize: '14px' }}>JWT Auth</p>
          </div>
          <div>
            <h2 style={{ fontSize: '32px', color: '#818cf8', margin: '0' }}>24/7</h2>
            <p style={{ color: '#94a3b8', margin: '4px 0 0 0', fontSize: '14px' }}>Live Support</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;