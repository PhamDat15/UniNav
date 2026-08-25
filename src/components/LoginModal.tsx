"use client";

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginModal() {
  const { login, showLoginModal, setShowLoginModal } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!showLoginModal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const success = await login(username, password);
    if (success) {
      setShowLoginModal(false);
      setUsername('');
      setPassword('');
    } else {
      setError('Tài khoản hoặc mật khẩu không chính xác.');
    }
    setLoading(false);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      animation: 'fadeIn 0.2s ease'
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .login-input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 8px;
          border: 1px solid var(--border-light);
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--text-dark);
          transition: all 0.2s;
        }
        .login-input:focus {
          border-color: var(--primary-blue);
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
      `}</style>
      
      <div style={{
        background: 'var(--bg-card)',
        width: '100%',
        maxWidth: '400px',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        padding: '32px',
        position: 'relative',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <button 
          onClick={() => setShowLoginModal(false)}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '1.5rem', color: 'var(--text-muted)'
          }}
        >
          &times;
        </button>
        
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '8px' }}>
            Đăng nhập UniNav
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Vui lòng đăng nhập để tham gia thảo luận.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {error && (
            <div style={{ padding: '10px 12px', background: '#fee2e2', color: '#b91c1c', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 500 }}>
              {error}
            </div>
          )}
          
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '6px' }}>Tên đăng nhập</label>
            <input 
              type="text" 
              className="login-input"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Nhập tên tài khoản"
              required
            />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '6px' }}>Mật khẩu</label>
            <input 
              type="password" 
              className="login-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
            style={{ marginTop: '8px', width: '100%', padding: '14px', fontSize: '1rem' }}
          >
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
        </form>
        
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Tài khoản demo: <br/> 
          <b>a</b> / <b>a</b> (User cũ) - <b>b</b> / <b>b</b> (User mới)
        </div>
      </div>
    </div>
  );
}
