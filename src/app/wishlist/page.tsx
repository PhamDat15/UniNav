"use client";

import { useState, useEffect } from 'react';
import { mockUniversities } from '../../data/mockUniversities';
import { massiveUniversities } from '../../data/massiveUniversities';
import { calculateMatch, UserProfile, MatchResult } from '../../utils/matchEngine';
import { generateCompareReport, CompareReport } from '../../utils/compareEngine';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useRouter } from 'next/navigation';

export default function WishlistPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [wishlistItems, setWishlistItems] = useState<MatchResult[]>([]);
  const [report, setReport] = useState<CompareReport | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'best' | 'tradeoff' | 'strategy'>('best');

  const removeWishlist = (id: string) => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const ids: string[] = JSON.parse(savedWishlist);
      const newIds = ids.filter((i: string) => i !== id);
      localStorage.setItem('wishlist', JSON.stringify(newIds));
      setWishlistItems(prev => {
        const next = prev.filter(item => item.program.id !== id);
        if (profile) {
          setReport(generateCompareReport(next, profile));
        }
        return next;
      });
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
      setReport(generateCompareReport(items, p));
    } else if (saved) {
      const p = JSON.parse(saved);
      setProfile(p);
    }
  }, []);

  if (!profile) {
    return (
      <div className="card" style={{ textAlign: 'center', marginTop: '100px' }}>
        <p>Vui lòng cập nhật hồ sơ trước khi xem nguyện vọng và so sánh.</p>
        <button className="btn-primary" onClick={() => router.push('/profile')} style={{ marginTop: '16px' }}>Tạo Hồ Sơ</button>
      </div>
    );
  }

  // 1. Phân nhóm nguyện vọng
  const safeGroup = wishlistItems.filter(i => i.passProbability >= 80);
  const mediumGroup = wishlistItems.filter(i => i.passProbability >= 50 && i.passProbability < 80);
  const riskGroup = wishlistItems.filter(i => i.passProbability < 50);

  // 2. Data cho Radar Chart
  const top3 = wishlistItems.slice(0, 4);
  
  const radarData = [
    { subject: 'Áp lực học tập', fullMark: 100 },
    { subject: 'Phong trào CLB', fullMark: 100 },
    { subject: 'Cơ sở vật chất', fullMark: 100 },
    { subject: 'Độ phù hợp', fullMark: 100 },
    { subject: 'Khả năng đỗ', fullMark: 100 },
  ];

  const chartData = radarData.map(d => {
    const dataPoint: any = { subject: d.subject };
    top3.forEach((item, index) => {
      if (d.subject === 'Áp lực học tập') dataPoint[`school${index}`] = item.program.academicPressure;
      if (d.subject === 'Phong trào CLB') dataPoint[`school${index}`] = item.program.clubActivities;
      if (d.subject === 'Cơ sở vật chất') dataPoint[`school${index}`] = item.program.facilities || item.program.employmentRate;
      if (d.subject === 'Độ phù hợp') dataPoint[`school${index}`] = item.suitabilityScore;
      if (d.subject === 'Khả năng đỗ') dataPoint[`school${index}`] = item.passProbability;
    });
    return dataPoint;
  });

  const colors = ['#1d4ed8', '#16a34a', '#d97706', '#9333ea'];

  const renderGroup = (title: string, group: MatchResult[], color: string) => (
    <div style={{ marginBottom: '24px' }}>
      <h3 style={{ color: color, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: color }} />
        {title} ({group.length})
      </h3>
      {group.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', paddingLeft: '20px' }}>Chưa có nguyện vọng nào thuộc nhóm này.</p>
      ) : (
        <div style={{ display: 'grid', gap: '12px', paddingLeft: '20px' }}>
          {group.map(item => (
            <div key={item.program.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-page)', borderRadius: '8px', borderLeft: `4px solid ${color}` }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{item.program.name}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>Ngành: {item.program.major} | Đỗ: {item.passProbability}% | Học phí: {(item.program.feePerYear/1000000).toFixed(1)}Tr/năm</div>
              </div>
              <button 
                onClick={() => removeWishlist(item.program.id)}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', color: '#ef4444', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', transition: 'all 0.2s' }}
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
    <div>
      <div style={{ marginBottom: '40px' }}>
        <h1 className="gradient-text" style={{ fontSize: '2.2rem' }}>So Sánh Chi Tiết & Nguyện Vọng</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '8px' }}>
          Đối chiếu đa chiều các ngành nghề đã chọn và chiến lược xếp nguyện vọng thông minh bằng lời giải chi tiết từ AI.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
        {/* Left Column: Smart Wishlist */}
        <div className="card" style={{ flex: '1 1 420px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--primary-blue)' }}>📌 Danh sách Nguyện vọng Smart</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.95rem', lineHeight: '1.5' }}>
            Hệ thống tự động phân loại theo 3 mảng nhịp độ để đảm bảo nguyên tắc vàng: Ưu tiên ngành khát vọng lớn nhưng luôn dựng chốt bảo dưỡng an toàn để không trượt đại học.
          </p>
          
          {renderGroup('Nhóm An Toàn (Đỗ > 80%)', safeGroup, '#16a34a')}
          {renderGroup('Nhóm Vừa Sức (50% - 80%)', mediumGroup, '#d97706')}
          {renderGroup('Nhóm Mạo Hiểm (< 50%)', riskGroup, '#dc2626')}
        </div>

        {/* Right Column: Radar Chart & AI comparison */}
        <div className="card" style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-blue)' }}>📊 So Sánh Đa Chiều</h2>
            </div>
            
            {top3.length === 0 ? (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', color: 'var(--text-muted)', textAlign: 'center' }}>
                Hãy qua trang Phân tích nhấn nút "Thêm" vào ít nhất 1 ngành để trải nghiệm Bàn cân So Sánh Đa Chiều và Báo cáo AI chuyên sâu!
              </div>
            ) : (
              <>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '0.95rem' }}>
                  Biểu đồ đa vùng đối chiếu các thông số quan trọng (Học lực, Phong trào, CSVC, Khả năng đỗ):
                </p>
                
                <div style={{ width: '100%', height: '380px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-dark)', fontSize: 12, fontWeight: 600 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'transparent' }} />
                      <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '8px' }} />
                      <Legend layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ paddingTop: '15px' }} />
                      {top3.map((item, index) => (
                        <Radar
                          key={item.program.id}
                          name={item.program.name}
                          dataKey={`school${index}`}
                          stroke={colors[index]}
                          fill={colors[index]}
                          fillOpacity={0.35}
                        />
                      ))}
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}
          </div>

          {/* Nút Phân Tích & Đối Chiếu Chi Tiết */}
          {wishlistItems.length > 0 && (
            <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--border-light)' }}>
              <button 
                onClick={() => setShowAIModal(true)}
                className="btn-primary"
                style={{
                  background: 'linear-gradient(135deg, var(--primary-blue), var(--primary-purple))',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  padding: '16px 28px',
                  width: '100%',
                  boxShadow: '0 6px 20px rgba(147, 51, 234, 0.25)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  borderRadius: '10px',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Phân Tích &amp; Đối Chiếu Chi Tiết &rarr;
              </button>
              <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                ✨ Phân tích bằng lời tường tận: Ưu/nhược điểm đối đầu &amp; Chiến lược đặt nguyện vọng 1-2-3
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL BÁO CÁO PHÂN TÍCH AI CHUYÊN Sâu */}
      {showAIModal && report && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            maxWidth: '860px',
            width: '100%',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '24px 28px',
              background: 'linear-gradient(135deg, var(--bg-card), var(--light-blue))',
              borderBottom: '1px solid var(--border-light)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{ background: 'var(--primary-purple)', color: '#fff', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  AI Consultant Evaluation
                </span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-dark)', marginTop: '6px' }}>
                  Báo Cáo Phân Tích &amp; Đối Chiếu Nguyện Vọng
                </h2>
              </div>
              <button 
                onClick={() => setShowAIModal(false)}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  color: 'var(--text-dark)',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#e2e8f0'}
                onMouseOut={(e) => e.currentTarget.style.background = '#f1f5f9'}
              >
                &times;
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-light)', background: 'var(--bg-card)', padding: '0 28px' }}>
              <button
                onClick={() => setActiveTab('best')}
                style={{
                  padding: '14px 20px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'best' ? '3px solid var(--primary-blue)' : '3px solid transparent',
                  color: activeTab === 'best' ? 'var(--primary-blue)' : 'var(--text-muted)',
                  fontWeight: activeTab === 'best' ? 700 : 500,
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s'
                }}
              >
                🏆 Đỉnh Cao Tiêu Chí ({report.bestInClass.length})
              </button>
              <button
                onClick={() => setActiveTab('tradeoff')}
                style={{
                  padding: '14px 20px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'tradeoff' ? '3px solid var(--primary-blue)' : '3px solid transparent',
                  color: activeTab === 'tradeoff' ? 'var(--primary-blue)' : 'var(--text-muted)',
                  fontWeight: activeTab === 'tradeoff' ? 700 : 500,
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s'
                }}
              >
                ⚖️ Bàn Cân Đối Đầu ({report.tradeoffs.length})
              </button>
              <button
                onClick={() => setActiveTab('strategy')}
                style={{
                  padding: '14px 20px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'strategy' ? '3px solid var(--primary-blue)' : '3px solid transparent',
                  color: activeTab === 'strategy' ? 'var(--primary-blue)' : 'var(--text-muted)',
                  fontWeight: activeTab === 'strategy' ? 700 : 500,
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s'
                }}
              >
                💡 Chiến Lược Nguyện Vọng ({report.strategy.length})
              </button>
            </div>

            {/* Modal Content Body */}
            <div style={{ padding: '28px', overflowY: 'auto', flex: 1, background: 'var(--bg-page)' }}>
              
              {/* Overall Summary Alert */}
              <div style={{
                padding: '16px',
                borderRadius: '10px',
                background: report.overallSummary.includes('⚠️') ? '#fff7ed' : '#f0fdf4',
                border: `1px solid ${report.overallSummary.includes('⚠️') ? '#fdba74' : '#86efac'}`,
                color: report.overallSummary.includes('⚠️') ? '#9a3412' : '#15803d',
                marginBottom: '24px',
                lineHeight: '1.6',
                fontSize: '0.95rem',
                fontWeight: 500
              }}>
                {report.overallSummary}
              </div>

              {/* TAB 1: BEST IN CLASS */}
              {activeTab === 'best' && (
                <div style={{ display: 'grid', gap: '16px' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '4px' }}>
                    Dưới đây là vinh danh những trường nắm giữ vị trí vô địch (Top 1) trong từng hạng mục cụ thể trên bàn cân của bạn:
                  </p>
                  {report.bestInClass.map((item, idx) => (
                    <div key={idx} style={{
                      background: '#ffffff',
                      borderRadius: '12px',
                      padding: '20px',
                      border: '1px solid var(--border-light)',
                      borderLeft: `5px solid ${item.color}`,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: item.color, letterSpacing: '0.5px' }}>
                            {item.icon} {item.category}
                          </div>
                          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-dark)', marginTop: '4px' }}>
                            {item.schoolName}
                          </div>
                          <div style={{ fontSize: '0.95rem', color: 'var(--text-dark)', fontWeight: 600, marginTop: '2px' }}>
                            Ngành: {item.majorName}
                          </div>
                        </div>
                        <span style={{
                          background: `${item.color}15`,
                          color: item.color,
                          padding: '6px 14px',
                          borderRadius: '8px',
                          fontWeight: 800,
                          fontSize: '0.95rem',
                          border: `1px solid ${item.color}30`
                        }}>
                          {item.scoreDisplay}
                        </span>
                      </div>
                      <p style={{ marginTop: '12px', color: 'var(--text-dark)', lineHeight: '1.6', fontSize: '0.95rem', paddingTop: '12px', borderTop: '1px dashed var(--border-light)' }}>
                        👉 <strong>Lý do nổi trội:</strong> {item.reasoning}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: TRADEOFFS & HEAD-TO-HEAD */}
              {activeTab === 'tradeoff' && (
                <div style={{ display: 'grid', gap: '20px' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '4px' }}>
                    Phân tích sắc bén về sự đánh đổi Được - Mất giữa các sự lựa chọn hàng đầu của bạn:
                  </p>
                  {report.tradeoffs.map((item, idx) => (
                    <div key={idx} style={{
                      background: '#ffffff',
                      borderRadius: '12px',
                      padding: '22px',
                      border: '1px solid var(--border-light)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                    }}>
                      <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-blue)', fontWeight: 800, marginBottom: '14px' }}>
                        {item.title}
                      </h3>
                      <div style={{ 
                        whiteSpace: 'pre-line', 
                        color: 'var(--text-dark)', 
                        lineHeight: '1.7', 
                        fontSize: '0.95rem',
                        background: '#f8fafc',
                        padding: '16px',
                        borderRadius: '8px',
                        borderLeft: '4px solid var(--primary-blue)'
                      }}>
                        {item.analysis}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: STRATEGY RECOMMENDATIONS */}
              {activeTab === 'strategy' && (
                <div style={{ display: 'grid', gap: '16px' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '4px' }}>
                    Lời khuyên chiến lược sắp xếp theo đúng quy chế tuyển sinh, bảo đảm tối ưu khát vọng và khóa chặt suất đỗ đại học:
                  </p>
                  {report.strategy.map((step, idx) => (
                    <div key={idx} style={{
                      background: '#ffffff',
                      borderRadius: '12px',
                      padding: '20px',
                      border: '1px solid var(--border-light)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                      position: 'relative'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                        <span style={{ 
                          background: step.badgeColor, 
                          color: '#fff', 
                          fontWeight: 800, 
                          padding: '6px 12px', 
                          borderRadius: '8px', 
                          fontSize: '0.9rem' 
                        }}>
                          {step.rank}
                        </span>
                        <span style={{ color: step.badgeColor, fontWeight: 800, fontSize: '0.95rem', textTransform: 'uppercase' }}>
                          {step.role}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '1.2rem', color: 'var(--text-dark)', fontWeight: 800 }}>
                        {step.schoolName} ({step.majorName})
                      </h4>
                      <p style={{ marginTop: '10px', color: 'var(--text-dark)', lineHeight: '1.6', fontSize: '0.95rem', background: '#f8fafc', padding: '12px 14px', borderRadius: '8px' }}>
                        🎯 <strong>Chiến lược của AI:</strong> {step.reasoning}
                      </p>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '16px 28px',
              background: 'var(--bg-card)',
              borderTop: '1px solid var(--border-light)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                * Báo cáo được tự động khởi tạo theo các tham số thực tế từ hồ sơ của bạn.
              </span>
              <button 
                onClick={() => setShowAIModal(false)}
                className="btn-primary"
                style={{ padding: '10px 24px', fontSize: '0.95rem' }}
              >
                Đã Rõ &amp; Đóng Báo Cáo
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
