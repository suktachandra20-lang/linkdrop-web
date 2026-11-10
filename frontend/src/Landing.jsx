import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div style={{ backgroundColor: '#030712', color: '#f9fafb', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', overflowX: 'hidden' }}>
      
      {/* Top Navigation */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 48px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', position: 'sticky', top: 0, backdropFilter: 'blur(12px)', backgroundColor: 'rgba(3, 7, 18, 0.8)', zIndex: 1000 }}>
        <div style={{ fontSize: '22px', fontWeight: '800', background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'flex', alignItems: 'center', gap: '10px' }}>
          ⚡ LinkDrop
        </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="#features" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.2s' }}>Features</a>
          <a href="#analytics" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Analytics</a>
          <Link to="/login" style={{ color: '#f3f4f6', textDecoration: 'none', fontSize: '14px', fontWeight: '500', padding: '8px 16px' }}>Login</Link>
          <Link to="/register" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #4f46e5 100%)', color: '#fff', padding: '10px 20px', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', fontWeight: '600', boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)' }}>
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '120px 20px 90px 20px', maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', padding: '6px 16px', borderRadius: '30px', fontSize: '13px', fontWeight: '600', marginBottom: '24px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
          🚀 Next-Gen Bio Links & Real-Time Intelligence
        </div>
        
        <h1 style={{ fontSize: '58px', fontWeight: '900', marginBottom: '24px', lineHeight: '1.15', letterSpacing: '-1.5px' }}>
          One Link for Everything. <br />
          <span style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Track Every Single Click.
          </span>
        </h1>
        
        <p style={{ color: '#9ca3af', fontSize: '19px', marginBottom: '45px', lineHeight: '1.6', maxWidth: '720px', margin: '0 auto 45px auto' }}>
          Empower your online presence with a stunning public bio page and deep visitor telemetry—covering precise device type, browser, OS, and location analytics.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/register" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #4f46e5 100%)', color: '#fff', padding: '16px 32px', borderRadius: '14px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px', boxShadow: '0 10px 25px rgba(2, 132, 199, 0.3)' }}>
            Create Your Hub Now →
          </Link>
        </div>

        {/* Floating Preview Card Box */}
        <div style={{ marginTop: '60px', background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '35px', borderRadius: '24px', maxWidth: '640px', margin: '60px auto 0 auto', textAlign: 'left', backdropFilter: 'blur(20px)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '12px', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 'bold' }}>Live Dashboard Preview</span>
            <span style={{ fontSize: '12px', color: '#4ade80', backgroundColor: 'rgba(74, 222, 128, 0.1)', padding: '3px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>● System Operational</span>
          </div>
          <Link to="/dashboard" style={{ display: 'block', backgroundColor: '#030712', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#f3f4f6', padding: '16px 20px', borderRadius: '12px', textDecoration: 'none', fontWeight: '600', fontSize: '15px', marginBottom: '14px', transition: 'all 0.2s' }}>
            ⚡ Access Interactive Creator Dashboard
          </Link>
          <div style={{ fontSize: '13px', color: '#6b7280' }}>
            Your Public URL Endpoint: <code style={{ color: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.08)', padding: '2px 6px', borderRadius: '4px' }}>linkdrop-web.vercel.app/u/yourname</code>
          </div>
        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section id="features" style={{ padding: '100px 20px', backgroundColor: '#020617', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '38px', fontWeight: '800', marginBottom: '14px', letterSpacing: '-0.5px' }}>Engineered for High Performance</h2>
          <p style={{ color: '#9ca3af', marginBottom: '64px', fontSize: '16px' }}>Packed with advanced modules designed to give you total control over your traffic.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', textAlign: 'left' }}>
            
            {/* Feature 1 */}
            <div style={{ background: 'linear-gradient(145deg, #0f172a 0%, #090d16 100%)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '32px', borderRadius: '20px' }}>
              <div style={{ fontSize: '30px', marginBottom: '18px' }}>🛡️</div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#f3f4f6' }}>Secure MERN Architecture</h3>
              <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.6' }}>Built on robust Node.js and MongoDB infrastructure with encrypted authentication protocols.</p>
            </div>

            {/* Feature 2 */}
            <div style={{ background: 'linear-gradient(145deg, #0f172a 0%, #090d16 100%)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '32px', borderRadius: '20px' }}>
              <div style={{ fontSize: '30px', marginBottom: '18px' }}>📊</div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#f3f4f6' }}>Deep Telemetry Analytics</h3>
              <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.6' }}>Log every click with granular geographic lookup, device detection, and browser identification.</p>
            </div>

            {/* Feature 3 */}
            <div style={{ background: 'linear-gradient(145deg, #0f172a 0%, #090d16 100%)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '32px', borderRadius: '20px' }}>
              <div style={{ fontSize: '30px', marginBottom: '18px' }}>🔗</div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#f3f4f6' }}>Custom Slugs & Routing</h3>
              <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.6' }}>Create custom vanity URLs and short slugs instantly with collision prevention checks.</p>
            </div>

            {/* Feature 4 */}
            <div style={{ background: 'linear-gradient(145deg, #0f172a 0%, #090d16 100%)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '32px', borderRadius: '20px' }}>
              <div style={{ fontSize: '30px', marginBottom: '18px' }}>☁️</div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#f3f4f6' }}>Cloud Native Deployment</h3>
              <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.6' }}>Seamlessly deployed across Vercel edge networks and Render cloud backend clusters.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '40px 20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', color: '#6b7280', fontSize: '13px', backgroundColor: '#020617' }}>
        <p>© 2026 LinkDrop Inc. Engineered with precision for modern creators.</p>
      </footer>

    </div>
  );
};

export default Landing;