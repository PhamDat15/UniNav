"use client";

import { useState, useEffect } from 'react';
import { mockUniversities, UniversityProgram } from '../../data/mockUniversities';
import { massiveUniversities } from '../../data/massiveUniversities';
import { calculateMatch, UserProfile, MatchResult } from '../../utils/matchEngine';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

export default function WishlistPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [wishlistItems, setWishlistItems] = useState<MatchResult[]>([]);

  const removeWishlist = (id: string) => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const ids: string[] = JSON.parse(savedWishlist);
      const newIds = ids.filter((i: string) => i !== id);
      localStorage.setItem('wishlist', JSON.stringify(newIds));
      setWishlistItems(prev => prev.filter(item => item.program.id !== id));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('wishlistUpdated'));
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    const savedWishlist = localStorage.getItem('wishlist');
    
    if (saved && savedWishlist) {
      const p = JSON.parse(saved);
      p.score = parseFloat(p.score) || 0;
      setProfile(p);
      
      const ids: string[] = JSON.parse(savedWishlist);
      const cleanId = (str?: string) => str ? str.toString().normalize('NFC').trim() : '';
      const items = ids
        .map(id => {
          const target = cleanId(id);
          return mockUniversities.find(u => cleanId(u.id) === target || u.id === id) || 
                 massiveUniversities.find(u => cleanId(u.id) === target || u.id === id);
        })
        .filter((u): u is UniversityProgram => u !== undefined)
        .map(u => calculateMatch(p, u!));
        
      setWishlistItems(items);
    } else if (saved) {
      const p = JSON.parse(saved);
      setProfile(p);
    }
  }, []);

  if (!profile) {
    return (
      <div className="card" style={{ textAlign: 'center', marginTop: '100px' }}>
        <p>Vui lòng cập nhật hồ sơ trước khi xem nguyện vọng và chiến lược.</p>
        <button className="btn-primary" onClick={() => router.push('/profile')} style={{ marginTop: '16px' }}>Tạo Hồ Sơ</button>
      </div>
    );
  }

  // Phân nhóm nguyện vọng
  const safeGroup = wishlistItems.filter(i => i.passProbability >= 80);
  const mediumGroup = wishlistItems.filter(i => i.passProbability >= 50 && i.passProbability < 80);
  const riskGroup = wishlistItems.filter(i => i.passProbability < 50);

  const renderGroup = (title: string, group: MatchResult[], color: string, badgeBg: string) => (
    <div style={{ marginBottom: '24px', background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid var(--border-light)' }}>
      <h3 style={{ color: color, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: color }} />
        {title} ({group.length})
      </h3>
      {group.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Chưa có nguyện vọng nào thuộc nhóm này.</p>
      ) : (
        <div style={{ display: 'grid', gap: '12px' }}>
          {group.map(item => (
            <div key={item.program.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: badgeBg, borderRadius: '8px', borderLeft: `4px solid ${color}` }}>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '1.1rem' }}>{item.program.name}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>Ngành: {item.program.major} | Đỗ: <strong>{item.passProbability}%</strong> | Học phí: {(item.program.feePerYear/1000000).toFixed(1)}Tr/năm</div>
              </div>
              <button 
                onClick={() => removeWishlist(item.program.id)}
                style={{ background: '#fff', border: '1px solid var(--border-light)', color: '#ef4444', cursor: 'pointer', width: '36px', height: '36px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', transition: 'all 0.2s' }}
                title="Xóa nguyện vọng"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 className="gradient-text" style={{ fontSize: '2.4rem' }}>Sắp Xếp & Chiến Lược Nguyện Vọng</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '8px' }}>
          Phân loại nguyện vọng tối ưu để đảm bảo khả năng trúng tuyển cao nhất.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {renderGroup('Nhóm Mạo Hiểm - Đặt nguyện vọng 1, 2 (< 50%)', riskGroup, '#ef4444', '#fef2f2')}
        {renderGroup('Nhóm Vừa Sức - Đặt nguyện vọng giữa (50% - 79%)', mediumGroup, '#f59e0b', '#fffbeb')}
        {renderGroup('Nhóm An Toàn - Đặt lót đường cuối (>= 80%)', safeGroup, '#22c55e', '#f0fdf4')}
      </div>

      {!user?.isVip && (
        <div style={{ 
          marginTop: '40px', 
          background: 'linear-gradient(135deg, var(--light-blue), #e0e7ff)',
          border: '1px dashed var(--primary-blue)',
          borderRadius: '12px', 
          padding: '32px', 
          textAlign: 'center' 
        }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-blue)', marginBottom: '12px' }}>Bạn đang dùng gói Cơ bản (Lưu tối đa 2 nguyện vọng)</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '1.05rem' }}>
            Để mở khóa <strong>15 nguyện vọng</strong> và tối ưu hóa hoàn toàn danh sách xét tuyển, hãy nâng cấp tài khoản lên gói VIP chỉ với 99.000đ.
          </p>
          <button 
            onClick={() => router.push('/upgrade')}
            className="btn-primary" 
            style={{ padding: '14px 32px', fontSize: '1.1rem', fontWeight: 700 }}
          >
            Nâng cấp VIP ngay 🚀
          </button>
        </div>
      )}
    </div>
  );
}
