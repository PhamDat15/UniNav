"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { mockUniversities, UniversityProgram } from '../data/mockUniversities';
import { massiveUniversities } from '../data/massiveUniversities';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [addedPrograms, setAddedPrograms] = useState<UniversityProgram[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isRinging, setIsRinging] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    return () => {
      window.removeEventListener('storage', handleWishlistChange);
      window.removeEventListener('wishlistUpdated', handleWishlistChange);
    };
  }, []);

  // Đóng dropdown khi click ra bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
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

  const links = [
    { href: '/', label: 'Trang chủ' },
    { href: '/news', label: 'Tin tức' },
    { href: '/profile', label: 'Hồ sơ & Trắc nghiệm' },
    { href: '/search', label: 'Phân tích' },
    { href: '/lookup', label: 'Tra cứu điểm' },
    { href: '/wishlist', label: 'So sánh' },
  ];

  return (
    <nav style={{ 
      background: 'var(--bg-card)', 
      borderBottom: '1px solid var(--border-light)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      height: '80px'
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
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: '14px' }}>
            <img src="/logos/logo.png" alt="Logo" style={{ height: '52px', width: 'auto' }} />
            <span className="gradient-text" style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-display)', letterSpacing: '-0.5px' }}>UniNav</span>
          </Link>
        </div>
        
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', height: '100%' }}>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                style={{ 
                  color: isActive ? 'var(--primary-blue)' : 'var(--text-dark)', 
                  textDecoration: 'none', 
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: isActive ? '3px solid var(--primary-blue)' : '3px solid transparent',
                  height: '100%',
                  paddingTop: '3px',
                  transition: 'all 0.2s ease'
                }}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Biểu tượng Thông Báo riêng biệt (Notification Bell / List Icon) */}
          <div ref={dropdownRef} style={{ position: 'relative', marginLeft: '8px' }}>
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
              {addedPrograms.length > 0 && (
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
                  {addedPrograms.length}
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
                    🔔 Các Ngành Đã Thêm ({addedPrograms.length})
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
                  {addedPrograms.length === 0 ? (
                    <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      Bạn chưa thêm chuyên ngành nào vào danh sách.
                    </div>
                  ) : (
                    addedPrograms.map((prog) => (
                      <div 
                        key={prog.id}
                        onClick={() => { setShowDropdown(false); router.push(`/major/${prog.id}`); }}
                        style={{
                          padding: '12px 16px',
                          borderBottom: '1px solid #f1f5f9',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'}
                        onMouseOut={(e) => e.currentTarget.style.background = '#ffffff'}
                      >
                        <div style={{ paddingRight: '12px' }}>
                          <div style={{ fontWeight: 700, color: 'var(--primary-blue)', fontSize: '0.95rem', marginBottom: '2px' }}>
                            {prog.name}
                          </div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-dark)', fontWeight: 500 }}>
                            Ngành: {prog.major}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            Học phí: {(prog.feePerYear / 1000000).toFixed(1)} Tr/năm | Chuẩn {2025}: {prog.historicalScores?.['2025'] || prog.averageScore.toFixed(1)}đ
                          </div>
                        </div>

                        <button
                          onClick={(e) => removeItem(prog.id, e)}
                          title="Xóa khỏi danh sách"
                          style={{
                            background: '#fee2e2',
                            border: '1px solid #fecaca',
                            color: '#dc2626',
                            borderRadius: '6px',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            flexShrink: 0,
                            transition: 'all 0.2s'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.background = '#fca5a5'}
                          onMouseOut={(e) => e.currentTarget.style.background = '#fee2e2'}
                        >
                          {/* Trash icon */}
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {addedPrograms.length > 0 && (
                  <div style={{ padding: '12px 16px', background: 'var(--bg-page)', borderTop: '1px solid var(--border-light)', textAlign: 'center' }}>
                    <button 
                      onClick={() => { setShowDropdown(false); router.push('/wishlist'); }}
                      className="btn-primary"
                      style={{ width: '100%', padding: '10px', fontSize: '0.95rem', background: 'var(--primary-purple)' }}
                    >
                      So sánh chi tiết &rarr;
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
