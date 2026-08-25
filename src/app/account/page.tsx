"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { mockUniversities, UniversityProgram } from '../../data/mockUniversities';
import { massiveUniversities } from '../../data/massiveUniversities';

function AccountDashboard() {
  const { user, isLoggedIn, setShowLoginModal, logout, updateUserProfile } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'profile';

  const [editingScores, setEditingScores] = useState<any>({});
  const [editingTranscriptScores, setEditingTranscriptScores] = useState<any>({});
  const [editingAwards, setEditingAwards] = useState<any>({});
  const [showTranscript, setShowTranscript] = useState(false);
  const [wishlistPrograms, setWishlistPrograms] = useState<UniversityProgram[]>([]);
  const [viewedPrograms, setViewedPrograms] = useState<UniversityProgram[]>([]);
  
  useEffect(() => {
    if (user?.profile?.scores) {
      setEditingScores(user.profile.scores);
    }
    if (user?.profile?.transcriptScores) {
      setEditingTranscriptScores(user.profile.transcriptScores);
    }
    if (user?.profile?.awards) {
      setEditingAwards(user.profile.awards);
    }
  }, [user]);

  useEffect(() => {
    const loadItems = () => {
      const wData = localStorage.getItem('wishlist');
      if (wData) {
        const ids = JSON.parse(wData) as string[];
        const wProgs = ids.map(id => mockUniversities.find(u => u.id === id) || massiveUniversities.find(u => u.id === id)).filter(Boolean) as UniversityProgram[];
        setWishlistPrograms(wProgs);
      } else {
        setWishlistPrograms([]);
      }
      const vData = localStorage.getItem('viewed_majors');
      if (vData) {
        const ids = JSON.parse(vData) as string[];
        const vProgs = ids.map(id => mockUniversities.find(u => u.id === id) || massiveUniversities.find(u => u.id === id)).filter(Boolean) as UniversityProgram[];
        setViewedPrograms(vProgs);
      } else {
        setViewedPrograms([]);
      }
    };
    loadItems();
    window.addEventListener('wishlistUpdated', loadItems);
    window.addEventListener('storage', loadItems);
    return () => {
      window.removeEventListener('wishlistUpdated', loadItems);
      window.removeEventListener('storage', loadItems);
    };
  }, []);

  const handleScoreChange = (subject: string, value: string) => {
    setEditingScores((prev: any) => ({ ...prev, [subject]: value ? parseFloat(value) : undefined }));
  };

  const handleTranscriptScoreChange = (subject: string, value: string) => {
    setEditingTranscriptScores((prev: any) => ({ ...prev, [subject]: value ? parseFloat(value) : undefined }));
  };

  const handleAwardChange = (type: string, value: string) => {
    setEditingAwards((prev: any) => ({ ...prev, [type]: value || undefined }));
  };

  const saveScores = () => {
    if (user) {
      updateUserProfile({
        ...(user.profile || { maxFee: 30000000, location: 'all', traits: [] }),
        scores: editingScores,
        transcriptScores: editingTranscriptScores,
        awards: editingAwards
      });
      
      const newNotif = { id: Date.now(), text: 'Cập nhật điểm thành công!', time: Date.now() };
      const existing = JSON.parse(localStorage.getItem('system_notifications') || '[]');
      localStorage.setItem('system_notifications', JSON.stringify([newNotif, ...existing]));
      window.dispatchEvent(new Event('notificationsUpdated'));
    }
  };


  useEffect(() => {
    if (!isLoggedIn) {
      // setShowLoginModal(true);
      // Optional: Redirect to home or show error
    }
  }, [isLoggedIn, setShowLoginModal]);

  if (!isLoggedIn) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', fontFamily: 'var(--font-sans)' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--text-dark)' }}>Vui lòng đăng nhập</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Bạn cần đăng nhập để xem thông tin hồ sơ.</p>
        <button onClick={() => setShowLoginModal(true)} className="btn-primary" style={{ padding: '12px 24px', fontSize: '1rem' }}>
          Đăng nhập ngay
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Hồ sơ của tôi', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg> },
    { id: 'scores', label: 'Điểm của tôi', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg> },
    { id: 'posts', label: 'Bài viết đã đăng', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg> },
    { id: 'viewed', label: 'Ngành đã xem', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg> },
    { id: 'saved', label: 'Ngành đã thêm', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> },
  ];

  return (
    <div style={{ fontFamily: 'var(--font-sans)', display: 'flex', gap: '32px', minHeight: '60vh', flexDirection: 'row' }}>
      
      {/* Sidebar */}
      <div style={{ width: '280px', flexShrink: 0 }}>
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          border: '1px solid var(--border-light)', 
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
          position: 'sticky',
          top: '100px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
            <img 
              src={user?.avatar} 
              alt="Avatar" 
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary-purple)', marginBottom: '12px' }} 
              onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=C+C&background=6366f1&color=fff' }}
            />
            <h2 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--text-dark)' }}>{user?.displayName}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '4px 0 0 0' }}>@{user?.username}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {tabs.map(tab => (
              <Link 
                key={tab.id} 
                href={`/account?tab=${tab.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: currentTab === tab.id ? 'var(--primary-blue)' : 'var(--text-dark)',
                  background: currentTab === tab.id ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
                  fontWeight: currentTab === tab.id ? 700 : 500,
                  transition: 'all 0.2s ease',
                  border: currentTab === tab.id ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid transparent'
                }}
              >
                <div style={{ display: 'flex', color: currentTab === tab.id ? 'var(--primary-blue)' : '#64748b' }}>
                  {tab.icon}
                </div>
                {tab.label}
              </Link>
            ))}
          </div>

          <div style={{ marginTop: '24px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
            <button 
              onClick={() => { logout(); router.push('/'); }} 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                background: 'transparent',
                color: '#ef4444',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#fee2e2'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              Đăng xuất
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1 }}>
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          border: '1px solid var(--border-light)', 
          padding: '32px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
          minHeight: '100%'
        }}>
          {currentTab === 'profile' && (
            <div>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--text-dark)', marginBottom: '24px', borderBottom: '2px solid var(--bg-page)', paddingBottom: '16px' }}>Hồ sơ Cá nhân</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>Tên hiển thị</label>
                  <input type="text" value={user?.displayName || ''} readOnly style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-page)', color: 'var(--text-dark)', fontFamily: 'inherit' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>Tên đăng nhập (Username)</label>
                  <input type="text" value={user?.username || ''} readOnly style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-page)', color: 'var(--text-muted)', fontFamily: 'inherit' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>Cấp độ thành viên</label>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'linear-gradient(135deg, var(--primary-blue), var(--primary-purple))', color: 'white', borderRadius: '20px', fontWeight: 600, fontSize: '0.9rem' }}>
                    🌟 VIP Member
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>Ngày tham gia</label>
                  <p style={{ color: 'var(--text-dark)', margin: 0, fontWeight: 500 }}>27/07/2026</p>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'scores' && (
            <div>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--text-dark)', marginBottom: '24px', borderBottom: '2px solid var(--bg-page)', paddingBottom: '16px' }}>Điểm của tôi</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Cập nhật điểm thi của bạn tại đây. Điểm này sẽ được đồng bộ tự động vào chức năng Phân tích & Tra cứu điểm chuẩn.</p>
              
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-blue)', marginBottom: '16px' }}>Điểm Thi Thực Tế / Chứng Chỉ</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                {[
                  { key: 'toan', label: 'Toán' },
                  { key: 'van', label: 'Ngữ văn' },
                  { key: 'anh', label: 'Tiếng Anh' },
                  { key: 'ly', label: 'Vật lý' },
                  { key: 'hoa', label: 'Hóa học' },
                  { key: 'sinh', label: 'Sinh học' },
                  { key: 'su', label: 'Lịch sử' },
                  { key: 'dia', label: 'Địa lý' },
                  { key: 'gdcd', label: 'GDCD' },
                  { key: 'ielts', label: 'IELTS' },
                  { key: 'hsa', label: 'HSA (ĐHQGHN)' },
                  { key: 'tsa', label: 'TSA (Bách Khoa)' },
                ].map(subject => (
                  <div key={subject.key}>
                    <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>{subject.label}</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={editingScores[subject.key] || ''} 
                      onChange={(e) => handleScoreChange(subject.key, e.target.value)}
                      placeholder="Chưa nhập"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-page)', color: 'var(--text-dark)', fontFamily: 'inherit' }} 
                    />
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-blue)', marginBottom: '16px', marginTop: '32px' }}>Giải thưởng & Thành tích</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>Giải Tỉnh/Thành phố (Môn văn hoá)</label>
                  <select 
                    value={editingAwards.provincialPrize || ''} 
                    onChange={e => handleAwardChange('provincialPrize', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-page)', color: 'var(--text-dark)', fontFamily: 'inherit' }}
                  >
                    <option value="">Không có</option>
                    <option value="Nhất">Giải Nhất</option>
                    <option value="Nhì">Giải Nhì</option>
                    <option value="Ba">Giải Ba</option>
                    <option value="Khuyến khích">Giải Khuyến khích</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>Giải Quốc gia/Quốc tế</label>
                  <select 
                    value={editingAwards.nationalPrize || ''} 
                    onChange={e => handleAwardChange('nationalPrize', e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-page)', color: 'var(--text-dark)', fontFamily: 'inherit' }}
                  >
                    <option value="">Không có</option>
                    <option value="KHKT">KHKT Quốc gia</option>
                    <option value="Olympic">Olympic Quốc tế</option>
                    <option value="HSG QG">HSG Quốc gia</option>
                  </select>
                </div>
              </div>

              {!showTranscript ? (
                <div style={{ marginBottom: '32px' }}>
                  <button onClick={() => setShowTranscript(true)} style={{ padding: '10px 20px', fontSize: '0.95rem', fontWeight: 600, background: 'var(--bg-page)', color: 'var(--primary-blue)', border: '1px dashed var(--primary-blue)', borderRadius: '8px', cursor: 'pointer', width: '100%', textAlign: 'center' }}>
                    + Thêm thông tin Điểm Học Bạ
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-blue)', margin: 0 }}>Điểm Học Bạ (Lớp 12 / Trung bình 3 năm)</h3>
                    <button onClick={() => setShowTranscript(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline' }}>Thu gọn</button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                    {[
                      { key: 'toan', label: 'Toán' },
                      { key: 'van', label: 'Ngữ văn' },
                      { key: 'anh', label: 'Tiếng Anh' },
                      { key: 'ly', label: 'Vật lý' },
                      { key: 'hoa', label: 'Hóa học' },
                      { key: 'sinh', label: 'Sinh học' },
                      { key: 'su', label: 'Lịch sử' },
                      { key: 'dia', label: 'Địa lý' },
                      { key: 'gdcd', label: 'GDCD' },
                      { key: 'gpa', label: 'Điểm TB chung (GPA)' },
                    ].map(subject => (
                      <div key={subject.key}>
                        <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>{subject.label}</label>
                        <input 
                          type="number" 
                          step="0.1"
                          value={editingTranscriptScores[subject.key] || ''} 
                          onChange={(e) => handleTranscriptScoreChange(subject.key, e.target.value)}
                          placeholder="Chưa nhập"
                          style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-page)', color: 'var(--text-dark)', fontFamily: 'inherit' }} 
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={saveScores} className="btn-primary" style={{ padding: '12px 24px', fontSize: '1rem', fontWeight: 600 }}>
                  Lưu điểm
                </button>
                <button onClick={() => { saveScores(); router.push('/profile?step=2'); }} style={{ padding: '12px 24px', fontSize: '1rem', fontWeight: 600, background: 'var(--light-blue)', color: 'var(--primary-blue)', border: '1px solid var(--primary-blue)', borderRadius: '8px', cursor: 'pointer' }}>
                  Lưu & Đi đến Chọn Ngành
                </button>
              </div>
            </div>
          )}

          {currentTab === 'posts' && (
            <div>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--text-dark)', marginBottom: '24px', borderBottom: '2px solid var(--bg-page)', paddingBottom: '16px' }}>Bài viết đã đăng</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ padding: '20px', border: '1px solid var(--border-light)', borderRadius: '12px', background: 'var(--bg-page)' }}>
                  <Link href="/community/t1" style={{ textDecoration: 'none' }}>
                    <h3 style={{ fontSize: '1.1rem', margin: '0 0 8px 0', color: 'var(--primary-blue)' }}>Review chân thực cơ sở vật chất Bách Khoa sau 1 học kỳ</h3>
                  </Link>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>Đăng trong <strong>Góc Sinh viên</strong> · 2 ngày trước</p>
                </div>
                <div style={{ padding: '20px', border: '1px solid var(--border-light)', borderRadius: '12px', background: 'var(--bg-page)' }}>
                  <Link href="/community/t2" style={{ textDecoration: 'none' }}>
                    <h3 style={{ fontSize: '1.1rem', margin: '0 0 8px 0', color: 'var(--primary-blue)' }}>Hỏi đáp: Khối A00 nên thi Đánh giá năng lực hay chờ xét điểm THPT?</h3>
                  </Link>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>Đăng trong <strong>Tuyển sinh & Hướng nghiệp</strong> · 1 tuần trước</p>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'viewed' && (
            <div>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--text-dark)', marginBottom: '24px', borderBottom: '2px solid var(--bg-page)', paddingBottom: '16px' }}>Ngành đã xem</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {viewedPrograms.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)' }}>Bạn chưa xem ngành nào.</p>
                ) : (
                  viewedPrograms.map(prog => (
                    <Link key={prog.id} href={`/major/${prog.id}`} style={{ textDecoration: 'none' }}>
                      <div style={{ border: '1px solid var(--border-light)', borderRadius: '12px', padding: '16px', background: 'white', display: 'flex', gap: '16px', alignItems: 'center', transition: 'box-shadow 0.2s' }} onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'} onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}>
                        <img src={`/logos/${prog.id.split('-')[0].toLowerCase()}.png`} alt={prog.id.split('-')[0]} style={{ width: '48px', height: '48px', objectFit: 'contain' }} onError={e => e.currentTarget.style.display = 'none'} />
                        <div>
                          <h4 style={{ margin: '0 0 4px 0', color: 'var(--text-dark)' }}>{prog.major}</h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>{prog.name}</p>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          )}

          {currentTab === 'saved' && (
            <div>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--text-dark)', marginBottom: '24px', borderBottom: '2px solid var(--bg-page)', paddingBottom: '16px' }}>Ngành đã thêm</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                {wishlistPrograms.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)' }}>Bạn chưa lưu ngành nào.</p>
                ) : (
                  wishlistPrograms.map(prog => (
                    <Link key={prog.id} href={`/major/${prog.id}`} style={{ textDecoration: 'none' }}>
                      <div style={{ border: '1px solid var(--border-light)', borderRadius: '12px', padding: '20px', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'box-shadow 0.2s' }} onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'} onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                          <div style={{ width: '56px', height: '56px', background: 'var(--light-blue)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-blue)' }}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
                          </div>
                          <div>
                            <h4 style={{ margin: '0 0 6px 0', color: 'var(--text-dark)', fontSize: '1.1rem' }}>{prog.major}</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>{prog.name}</p>
                          </div>
                        </div>
                        <button 
                          onClick={(e) => { e.preventDefault(); router.push('/wishlist'); }} 
                          className="btn-outline" 
                          style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                        >
                          Danh sách nguyện vọng
                        </button>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Đang tải...</div>}>
      <AccountDashboard />
    </Suspense>
  );
}
