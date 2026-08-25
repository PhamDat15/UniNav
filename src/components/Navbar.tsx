"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { mockUniversities, UniversityProgram } from '../data/mockUniversities';
import { massiveUniversities } from '../data/massiveUniversities';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [addedPrograms, setAddedPrograms] = useState<UniversityProgram[]>([]);
  const [notifications, setNotifications] = useState<{id: number, text: string, time: number}[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isRinging, setIsRinging] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { user, isLoggedIn, logout, setShowLoginModal } = useAuth();

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isDrawerOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadWishlist = () => {
    try {
      const data = localStorage.getItem('wishlist');
      if (data) {
        const arr = JSON.parse(data);
        if (Array.isArray(arr)) {
          const cleanId = (str?: string) => str ? str.toString().normalize('NFC').trim() : '';
          const programs = arr
            .map(id => {
              const target = cleanId(id);
              return mockUniversities.find(u => cleanId(u.id) === target || u.id === id) || 
                     massiveUniversities.find(u => cleanId(u.id) === target || u.id === id);
            })
            .filter((u): u is UniversityProgram => u !== undefined);
          
          const validIds = programs.map(p => p.id);
          setAddedPrograms(programs);
          setWishlistIds(validIds);

          if (validIds.length !== arr.length || !arr.every((val, index) => val === validIds[index])) {
            localStorage.setItem('wishlist', JSON.stringify(validIds));
          }
        } else {
          setWishlistIds([]);
          setAddedPrograms([]);
        }
      } else {
        setWishlistIds([]);
        setAddedPrograms([]);
      }
    } catch (e) {
      setWishlistIds([]);
      setAddedPrograms([]);
    }
  };

  useEffect(() => {
    const handleWishlistChange = () => {
      loadWishlist();
      // Kích hoạt hiệu ứng lắc chuông khi danh sách thay đổi/thêm mới
      setIsRinging(false);
      setTimeout(() => setIsRinging(true), 10);
      setTimeout(() => setIsRinging(false), 750);
    };

    loadWishlist();
    window.addEventListener('storage', handleWishlistChange);
    window.addEventListener('wishlistUpdated', handleWishlistChange);
    
    const loadNotifications = () => {
      try {
        const data = localStorage.getItem('system_notifications');
        if (data) setNotifications(JSON.parse(data));
      } catch(e) {}
    };
    const handleNotif = () => {
      loadNotifications();
      setIsRinging(false);
      setTimeout(() => setIsRinging(true), 10);
      setTimeout(() => setIsRinging(false), 750);
    };
    loadNotifications();
    window.addEventListener('notificationsUpdated', handleNotif);
    
    return () => {
      window.removeEventListener('storage', handleWishlistChange);
      window.removeEventListener('wishlistUpdated', handleWishlistChange);
      window.removeEventListener('notificationsUpdated', handleNotif);
    };
  }, []);

  // Đóng dropdown khi click ra bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const removeItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newIds = wishlistIds.filter(item => item !== id);
    localStorage.setItem('wishlist', JSON.stringify(newIds));
    loadWishlist();
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const navbarLinks = [
    { href: '/', label: 'Trang chủ' },
    { href: '/hot-majors', label: 'Ngành Hot 🔥' },
    { href: '/community', label: 'Cộng đồng' },
    { href: '/lookup', label: 'Tra cứu' },
  ];

  const toolsLinks = [
    { href: '/profile', label: 'Hồ sơ & Trắc nghiệm' },
    { href: '/search', label: 'Phân tích' },
    { href: '/lookup', label: 'Tra cứu điểm' },
    { href: '/wishlist', label: 'Danh sách nguyện vọng' },
  ];

  return (
    <>
      <style>{`
        .nav-link-hover {
          position: relative;
          color: var(--text-dark);
          text-decoration: none;
          font-weight: 600;
          display: flex;
          align-items: center;
          height: 100%; /* Cao ngang thanh menu */
          padding: 0 16px;
          margin: 0;
          border-radius: 4px;
          overflow: hidden;
          transition: color 0.3s ease, background 0.3s ease;
          z-index: 1;
          white-space: nowrap;
        }
        .nav-link-hover.active {
          color: var(--primary-blue);
          background: rgba(59, 130, 246, 0.08);
        }
        .nav-link-hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, var(--primary-blue), var(--primary-purple));
          transform: translateY(-100%);
          border-radius: 0 0 50% 50%;
          transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), border-radius 0.4s ease-in-out;
          z-index: -1;
        }
        .nav-link-hover:hover::before {
          transform: translateY(0);
          border-radius: 0;
        }
        .nav-link-hover:hover {
          color: white !important;
        }
        .nav-link-hover.active:hover {
          border-bottom-color: transparent;
        }
        .drawer-link-hover {
          position: relative;
          color: var(--text-dark);
          text-decoration: none;
          font-weight: 600;
          display: flex;
          align-items: center;
          padding: 12px 16px;
          border-radius: 7px;
          overflow: hidden;
          transition: color 0.3s ease, background 0.3s ease;
          z-index: 1;
        }
        .drawer-link-hover.active {
          color: var(--primary-blue);
          background: rgba(59, 130, 246, 0.08);
        }
        .drawer-link-hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, var(--primary-blue), var(--primary-purple));
          transform: translateX(-100%);
          border-radius: 0 50% 50% 0;
          transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), border-radius 0.4s ease-in-out;
          z-index: -1;
        }
        .drawer-link-hover:hover::before {
          transform: translateX(0);
          border-radius: 0;
        }
        .drawer-link-hover:hover {
          color: white !important;
        }
      `}</style>
      <nav style={{ 
      background: 'var(--bg-card)', 
      borderBottom: '1px solid var(--border-light)',
      boxShadow: isScrolled ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      height: isScrolled ? '64px' : '80px',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button 
              onClick={() => setIsDrawerOpen(true)}
              title="Mở menu"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '16px',
                width: '24px',
                padding: 0
              }}
            >
              <div style={{ width: '24px', height: '2.5px', background: 'var(--text-dark)', borderRadius: '2px', transition: 'all 0.2s ease' }} />
              <div style={{ width: '24px', height: '2.5px', background: 'var(--text-dark)', borderRadius: '2px', transition: 'all 0.2s ease' }} />
              <div style={{ width: '16px', height: '2.5px', background: 'var(--text-dark)', borderRadius: '2px', transition: 'all 0.2s ease' }} />
            </button>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: '14px' }}>
              <img src="/logos/logo.png" alt="Logo" style={{ height: isScrolled ? '40px' : '52px', width: 'auto', transition: 'all 0.3s ease' }} />
              <span className="gradient-text" style={{ fontSize: isScrolled ? '1.5rem' : '1.8rem', fontWeight: 900, fontFamily: 'var(--font-display)', letterSpacing: '-0.5px', transition: 'all 0.3s ease' }}>UniNav</span>
            </Link>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '0', alignItems: 'center', height: '100%' }}>
          {navbarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`nav-link-hover ${isActive ? 'active' : ''}`}
                style={{ paddingTop: '3px' }}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Biểu tượng Thông Báo riêng biệt (Notification Bell / List Icon) */}
          <div ref={dropdownRef} style={{ position: 'relative', marginLeft: '16px' }}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              title="Thông báo các ngành đã thêm"
              style={{ 
                background: showDropdown ? 'var(--light-blue)' : '#f8fafc',
                border: '1px solid var(--border-light)',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.08)';
                e.currentTarget.style.borderColor = 'var(--primary-purple)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = 'var(--border-light)';
              }}
            >
              {/* SVG Icon Bell with Ringing Animation */}
              <svg 
                width="22" 
                height="22" 
                viewBox="0 0 24 24" 
                fill={addedPrograms.length > 0 ? "var(--primary-purple)" : "none"} 
                stroke={addedPrograms.length > 0 ? "var(--primary-purple)" : "currentColor"} 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={isRinging ? "bell-ringing" : ""}
                style={{ transition: 'all 0.3s ease', transformOrigin: 'top center' }}
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>

              {/* Notification Badge number */}
              {notifications.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: '#ef4444',
                  color: '#fff',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  borderRadius: '9999px',
                  padding: '2px 5px',
                  minWidth: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(239, 68, 68, 0.5)',
                  border: '2px solid #fff',
                  animation: 'pulse 1.5s infinite'
                }}>
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Bảng Thông báo danh sách (Dropdown Notification Panel) */}
            {showDropdown && (
              <div style={{
                position: 'absolute',
                top: '54px',
                right: 0,
                width: '380px',
                background: '#ffffff',
                border: '1px solid var(--border-light)',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                zIndex: 100,
                overflow: 'hidden',
                animation: 'fadeIn 0.15s ease-out'
              }}>
                <div style={{ padding: '16px', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '1rem' }}>
                    🔔 Thông Báo ({notifications.length})
                  </div>
                  <button 
                    onClick={() => setShowDropdown(false)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700 }}
                    title="Đóng"
                  >
                    &times;
                  </button>
                </div>

                <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
                  {notifications.length === 0 ? (
                    <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      Bạn không có thông báo nào.
                    </div>
                  ) : (
                    <>
                      <div style={{ padding: '8px 16px', background: '#f1f5f9', fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Thông báo hệ thống
                      </div>
                      {notifications.map(n => (
                        <div key={n.id} style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', fontSize: '0.9rem', color: 'var(--primary-blue)', background: '#f0f9ff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontWeight: 600 }}>{n.text}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>{new Date(n.time).toLocaleTimeString()}</div>
                          </div>
                          <button 
                            onClick={() => {
                              const newNotifs = notifications.filter(x => x.id !== n.id);
                              setNotifications(newNotifs);
                              localStorage.setItem('system_notifications', JSON.stringify(newNotifs));
                            }}
                            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem' }}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          {/* User Auth Section */}
          <div 
            ref={userDropdownRef} 
            style={{ marginLeft: '8px', position: 'relative', display: 'flex', alignItems: 'center', height: '100%' }}
            onMouseEnter={() => setShowUserDropdown(true)}
            onMouseLeave={() => setShowUserDropdown(false)}
          >
            {isLoggedIn && user ? (
              <>
                <div style={{ padding: '10px 0', display: 'flex', alignItems: 'center' }}>
                  <button 
                    onClick={() => router.push('/account')}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} 
                    title={user.displayName}
                  >
                    <div style={{ position: 'relative' }}>
                      <img 
                        src={user.avatar} 
                        alt={user.displayName} 
                        style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-purple)', padding: '2px' }} 
                        onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=C+C&background=6366f1&color=fff' }}
                      />
                      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', background: '#10b981', border: '2px solid white', borderRadius: '50%' }} />
                    </div>
                  </button>
                </div>
                {/* User Dropdown */}
                {showUserDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    width: '240px',
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                    border: '1px solid var(--border-light)',
                    overflow: 'hidden',
                    zIndex: 100,
                    animation: 'fadeInUp 0.2s ease forwards',
                    transformOrigin: 'top right'
                  }}>
                    <style>{`
                      @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(10px) scale(0.95); }
                        to { opacity: 1; transform: translateY(0) scale(1); }
                      }
                      .user-dropdown-item {
                        transition: all 0.2s ease;
                      }
                      .user-dropdown-item:hover {
                        background: var(--light-blue);
                        color: var(--primary-blue) !important;
                      }
                      .user-dropdown-logout {
                        transition: all 0.2s ease;
                      }
                      .user-dropdown-logout:hover {
                        background: #fee2e2;
                      }
                    `}</style>
                    <div style={{ padding: '16px', borderBottom: '1px solid var(--border-light)', background: '#f8fafc' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{user.displayName}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>@{user.username}</div>
                    </div>
                    <div style={{ padding: '8px 0' }}>
                      <Link href="/account" onClick={() => setShowUserDropdown(false)} className="user-dropdown-item" style={{ display: 'block', padding: '10px 16px', textDecoration: 'none', color: 'var(--text-dark)', fontSize: '0.95rem', fontWeight: 500 }}>
                        Hồ sơ của tôi
                      </Link>
                      <Link href="/account?tab=posts" onClick={() => setShowUserDropdown(false)} className="user-dropdown-item" style={{ display: 'block', padding: '10px 16px', textDecoration: 'none', color: 'var(--text-dark)', fontSize: '0.95rem', fontWeight: 500 }}>
                        Bài viết đã đăng
                      </Link>
                      <Link href="/account?tab=viewed" onClick={() => setShowUserDropdown(false)} className="user-dropdown-item" style={{ display: 'block', padding: '10px 16px', textDecoration: 'none', color: 'var(--text-dark)', fontSize: '0.95rem', fontWeight: 500 }}>
                        Ngành đã xem
                      </Link>
                      <Link href="/account?tab=saved" onClick={() => setShowUserDropdown(false)} className="user-dropdown-item" style={{ display: 'block', padding: '10px 16px', textDecoration: 'none', color: 'var(--text-dark)', fontSize: '0.95rem', fontWeight: 500 }}>
                        Ngành đã thêm
                      </Link>
                    </div>
                    <div style={{ borderTop: '1px solid var(--border-light)', padding: '8px 0' }}>
                      <button 
                        onClick={() => { setShowUserDropdown(false); logout(); router.push('/'); }} 
                        className="user-dropdown-logout"
                        style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '10px 16px', color: '#ef4444', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="btn-outline"
                style={{ padding: '6px 16px', fontSize: '0.9rem', borderRadius: '20px', fontWeight: 600 }}
              >
                Đăng nhập
              </button>
            )}
          </div>

        </div>
      </div>
      </nav>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div 
          onClick={() => setIsDrawerOpen(false)}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)',
            zIndex: 99, transition: 'all 0.3s ease'
          }} 
        />
      )}

      {/* Drawer Menu */}
      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, width: '300px',
        background: 'var(--bg-card)', zIndex: 100,
        transform: isDrawerOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
        boxShadow: isDrawerOpen ? '4px 0 24px rgba(0,0,0,0.1)' : 'none',
        display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
          <span className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: 'var(--font-display)', letterSpacing: '-0.5px' }}>UniNav</span>
          <button onClick={() => setIsDrawerOpen(false)} style={{ background: 'transparent', border: 'none', fontSize: '1.75rem', cursor: 'pointer', color: 'var(--text-gray)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&times;</button>
        </div>
        
        <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--primary-purple)', fontWeight: 800, fontFamily: 'var(--font-sans)', letterSpacing: '1px', marginBottom: '16px', marginLeft: '8px' }}>Khám phá</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navbarLinks.map(link => (
                <Link key={link.href} href={link.href} onClick={() => setIsDrawerOpen(false)} 
                  className={`drawer-link-hover ${pathname === link.href ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--primary-purple)', fontWeight: 800, fontFamily: 'var(--font-sans)', letterSpacing: '1px', marginBottom: '16px', marginLeft: '8px' }}>Công cụ</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {toolsLinks.map(link => (
                <Link key={link.href} href={link.href} onClick={() => setIsDrawerOpen(false)}
                  className={`drawer-link-hover ${pathname === link.href ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <LoginModal />
    </>
  );
}
