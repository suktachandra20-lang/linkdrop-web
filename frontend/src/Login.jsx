import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('https://linkdrop-web.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed');
      } else {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#030712', 
      backgroundImage: `radial-gradient(circle at 20% 30%, rgba(56, 189, 248, 0.08) 0%, transparent 40%),
                        radial-gradient(circle at 80% 70%, rgba(129, 140, 248, 0.08) 0%, transparent 40%),
                        linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)`,
      backgroundSize: '100% 100%, 100% 100%, 40px 40px, 40px 40px',
      color: '#f9fafb', 
      minHeight: '100vh', 
      fontFamily: 'system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      
      {/* Top Brand Logo/Name */}
      <div style={{ fontSize: '28px', fontWeight: '800', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px', letterSpacing: '-0.5px' }}>
        <img src="https://img.icons8.com/color/48/chain.png" alt="logo" style={{ width: '36px', height: '36px' }} />
        LinkDrop
      </div>

      {/* Login Card */}
      <div style={{ 
        backgroundColor: 'rgba(15, 23, 42, 0.85)', 
        border: '1px solid rgba(255,255,255,0.08)', 
        padding: '40px', 
        borderRadius: '24px', 
        width: '100%', 
        maxWidth: '440px',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
      }}>
        
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', textAlign: 'center', color: '#f3f4f6' }}>Welcome Back</h2>
        <p style={{ color: '#9ca3af', fontSize: '14px', textAlign: 'center', marginBottom: '28px' }}>Enter your credentials to access your dashboard</p>

        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '12px', borderRadius: '10px', fontSize: '14px', marginBottom: '20px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#9ca3af', marginBottom: '8px' }}>Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', backgroundColor: '#030712', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none', fontSize: '15px', boxSizing: 'border-box' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#9ca3af', marginBottom: '8px' }}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', backgroundColor: '#030712', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none', fontSize: '15px', boxSizing: 'border-box' }} 
            />
          </div>

          <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg, #0284c7 0%, #4f46e5 100%)', color: '#fff', padding: '14px', borderRadius: '12px', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '10px', boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)' }}>
            Sign In to Dashboard →
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#9ca3af' }}>
          Don't have an account? <Link to="/register" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: '600' }}>Register now</Link>
        </div>

      </div>

    </div>
  );
};

export default Login;