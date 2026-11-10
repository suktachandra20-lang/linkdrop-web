import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', overflowX: 'hidden' }}>
      
      {/* Top Navigation Bar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid #1e293b', position: 'sticky', top: 0, backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(10px)', zIndex: 1000 }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8' }}>
          🔗 LinkDrop
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a href="#features" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Features</a>
          <a href="#analytics" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Analytics</a>
          <Link to="/login" style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>Login</Link>
          <Link to="/register" style={{ backgroundColor: '#2563eb', color: '#fff', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '100px 20px 80px 20px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'inline-block', backgroundColor: '#1e293b', color: '#38bdf8', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', marginBottom: '20px', border: '1px solid #334155' }}>
          ✨ Ultimate Bio Link & Click Analytics Platform
        </div>
        <h1 style={{ fontSize: '52px', fontWeight: '800', marginBottom: '20px', lineHeight: '1.2', letterSpacing: '-1px' }}>
          The Ultimate Link & <span style={{ color: '#38bdf8' }}>Media Hub</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '18px', marginBottom: '40px', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto 40px auto' }}>
          A handpicked collection of your links, social profiles, and media — organized and updated in real-time. Share your public bio and track precise visitor device and location insights.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/register" style={{ backgroundColor: '#2563eb', color: '#fff', padding: '14px 28px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px', boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.4)' }}>
            Explore the Collection →
          </Link>
        </div>

        {/* Quick App/Dashboard Link Box */}
        <div style={{ marginTop: '50px', backgroundColor: '#1e293b', border: '1px solid #334155', padding: '30px', borderRadius: '16px', maxWidth: '600px', margin: '50px auto 0 auto', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Quick Access</span>
            <span style={{ fontSize: '12px', color: '#22c55e', backgroundColor: 'rgba(34, 197, 94, 0.1)', padding: '2px 8px', borderRadius: '6px' }}>● Live & Active</span>
          </div>
          <Link to="/dashboard" style={{ display: 'block', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#f8fafc', padding: '14px 16px', borderRadius: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '15px', marginBottom: '12px' }}>
            🚀 Open LinkDrop Dashboard
          </Link>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Public Bio Preview: <code style={{ color: '#38bdf8' }}>linkdrop-web.vercel.app/u/yourname</code></span>
        </div>
      </section>

      {/* Features Section (Scroll Down) */}
      <section id="features" style={{ padding: '90px 20px', backgroundColor: '#0b0f19', borderTop: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '12px' }}>Built for a Seamless Experience</h2>
          <p style={{ color: '#94a3b8', marginBottom: '60px', fontSize: '16px' }}>Everything you need to manage your links and analyze traffic, on any device.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', textAlign: 'left' }}>
            
            {/* Card 1 */}
            <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '28px', borderRadius: '16px', transition: 'transform 0.2s' }}>
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>🔒</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>End-to-End Encrypted</h3>
              <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>All account data and links are secured with robust authentication protocols. Browse with absolute confidence.</p>
            </div>

            {/* Card 2 */}
            <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '28px', borderRadius: '16px' }}>
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>📊</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Real-time Click Analytics</h3>
              <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>Track visitor device, browser, operating system, and geographic location instantly upon every click.</p>
            </div>

            {/* Card 3 */}
            <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '28px', borderRadius: '16px' }}>
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>📂</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Organized Collections</h3>
              <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>Your links, titles, and custom slugs are sorted into clean, easy-to-manage dashboard panels.</p>
            </div>

            {/* Card 4 */}
            <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '28px', borderRadius: '16px' }}>
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>🌍</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Access Anywhere</h3>
              <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>Access your centralized link library and analytics from mobile, tablet, or desktop seamlessly.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Community / Newsletter Section */}
      <section style={{ padding: '90px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '24px', padding: '50px', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ flex: '1 1 400px' }}>
            <span style={{ fontSize: '12px', textTransform: 'uppercase', color: '#38bdf8', fontWeight: 'bold', letterSpacing: '1px' }}>Community</span>
            <h2 style={{ fontSize: '30px', fontWeight: 'bold', margin: '10px 0 16px 0' }}>Join the LinkDrop Community</h2>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px', lineHeight: '1.6' }}>
              Get exclusive access to new features, dashboard tips, and developer updates directly.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, color: '#cbd5e1', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>✓ Early access to advanced analytics features</li>
              <li>✓ Custom slug optimization tips</li>
              <li>✓ Security updates & best practices</li>
            </ul>
          </div>

          <div style={{ flex: '1 1 300px', backgroundColor: '#0f172a', padding: '28px', borderRadius: '16px', border: '1px solid #334155' }}>
            <p style={{ fontWeight: '600', marginBottom: '16px', fontSize: '16px' }}>Stay Updated</p>
            <input type="email" placeholder="Enter your email address" style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#fff', marginBottom: '14px', outline: 'none' }} />
            <button style={{ width: '100%', backgroundColor: '#2563eb', color: '#fff', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer' }}>
              Subscribe Now
            </button>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '30px', borderTop: '1px solid #1e293b', color: '#64748b', fontSize: '13px' }}>
        <p>© 2026 LinkDrop. All rights reserved. Powered by MERN Stack & Vercel.</p>
      </footer>

    </div>
  );
};

export default Landing;