"use client";

import { useState, useEffect } from 'react';
import { mockUniversities } from '../../data/mockUniversities';
import { massiveUniversities } from '../../data/massiveUniversities';
import { calculateMatch, calculateBestMethod, UserProfile, MatchResult } from '../../utils/matchEngine';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

const Typewriter = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    setDisplayed('');
    const timer = setInterval(() => {
      setDisplayed(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [text]);
  return <span>{displayed}</span>;
};

export default function SearchPage() {
  const router = useRouter();
  const { user, isLoggedIn, updateUserProfile } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('match_desc');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [globalBestMethod, setGlobalBestMethod] = useState<{score: number, methodName: string} | null>(null);
  const [activeSubjects, setActiveSubjects] = useState<string[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<MatchResult | null>(null);
  const [displayCount, setDisplayCount] = useState(10);
  const [showVipModal, setShowVipModal] = useState(false);
  const [usedWishlistQuota, setUsedWishlistQuota] = useState<string[]>([]);
  const [usedAnalysisQuota, setUsedAnalysisQuota] = useState<string[]>([]);

  useEffect(() => {
    let p: UserProfile | null = null;
    if (isLoggedIn && user?.profile) {
      p = user.profile;
    } else {
      const saved = localStorage.getItem('userProfile');
      if (saved) p = JSON.parse(saved);
    }

    if (p) {
      setProfile(p);
      setActiveSubjects(Object.keys(p.scores));
      
      const best = calculateBestMethod(p);
      setGlobalBestMethod(best);

      const allUnis = [...mockUniversities, ...massiveUniversities];
      let matched = allUnis.map(u => calculateMatch(p, u));
      
      if (p.targetMajor && p.targetMajor !== 'All' && p.targetMajor.trim() !== '') {
        matched = matched.filter(m => m.reasoning.includes('Đúng chuyên ngành mục tiêu'));
      }

      // Sort by suitability or pass probability
      matched.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
      setResults(matched.slice(0, 30));
    }
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
    const savedQuota = localStorage.getItem('usedWishlistQuota');
    if (savedQuota) {
      setUsedWishlistQuota(JSON.parse(savedQuota));
    }
    const savedAnalysisQuota = localStorage.getItem('usedAnalysisQuota');
    if (savedAnalysisQuota) {
      setUsedAnalysisQuota(JSON.parse(savedAnalysisQuota));
    }
  }, [isLoggedIn, user]);

  const toggleWishlist = (id: string) => {
    let newList = [...wishlist];
    if (newList.includes(id)) {
      newList = newList.filter(i => i !== id);
    } else {
      let newQuota = [...usedWishlistQuota];
      if (!newQuota.includes(id)) {
        if (newQuota.length >= 2 && !user?.isVip) {
          setShowVipModal(true);
          return;
        }
        newQuota.push(id);
        setUsedWishlistQuota(newQuota);
        localStorage.setItem('usedWishlistQuota', JSON.stringify(newQuota));
      }

      if (newList.length >= 15) {
        alert("Bạn đã đạt giới hạn lưu 15 nguyện vọng!");
        return;
      }
      newList.push(id);
      const program = mockUniversities.find(u => u.id === id) || massiveUniversities.find(u => u.id === id);
      if (program) {
        const newNotif = { id: Date.now(), text: `Bạn đã thêm ngành ${program.name} vào danh sách nguyện vọng.`, time: Date.now() };
        const existing = JSON.parse(localStorage.getItem('system_notifications') || '[]');
        localStorage.setItem('system_notifications', JSON.stringify([newNotif, ...existing]));
        window.dispatchEvent(new Event('notificationsUpdated'));
      }
    }
    setWishlist(newList);
    localStorage.setItem('wishlist', JSON.stringify(newList));
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const handleAnalyzeClick = (e: React.MouseEvent, res: MatchResult) => {
    e.stopPropagation();
    let newQuota = [...usedAnalysisQuota];
    if (!newQuota.includes(res.program.id)) {
      if (newQuota.length >= 3 && !user?.isVip) {
        setShowVipModal(true);
        return;
      }
      newQuota.push(res.program.id);
      setUsedAnalysisQuota(newQuota);
      localStorage.setItem('usedAnalysisQuota', JSON.stringify(newQuota));
    }
    setSelectedAnalysis(res);
  };

  const handleReAnalyze = () => {
    if (!profile) return;
    
    if (isLoggedIn) {
      updateUserProfile(profile);
    } else {
      localStorage.setItem('userProfile', JSON.stringify(profile));
    }

    
    const best = calculateBestMethod(profile);
    setGlobalBestMethod(best);

    const allUnis = [...mockUniversities, ...massiveUniversities];
    let matched = allUnis.map(u => calculateMatch(profile, u));
    
    if (profile.targetMajor && profile.targetMajor !== 'All' && profile.targetMajor.trim() !== '') {
      matched = matched.filter(m => m.reasoning.includes('Đúng chuyên ngành mục tiêu'));
    }
    
    matched.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
    setResults(matched.slice(0, 30));
  };

  if (!profile) {
    return (
      <div className="card" style={{ textAlign: 'center', marginTop: '40px' }}>
        <p>Chưa có dữ liệu hồ sơ. Vui lòng quay lại bước nhập liệu.</p>
        <button className="btn-primary" onClick={() => router.push('/profile')} style={{ marginTop: '16px' }}>Tạo Hồ Sơ</button>
      </div>
    );
  }

  const isSkipTest = (!profile.traits || profile.traits.length === 0) && (!!profile.targetMajor || !!profile.targetBlock);
  
  let finalResults = [...results];
  if (isSkipTest) {
    if (profile.targetBlock && profile.targetBlock !== 'All' && profile.targetBlock.trim() !== '') {
      finalResults = finalResults.filter(r => {
        const bl = profile.targetBlock!;
        return (r.program.subjectBlocks || []).includes(bl) || 
               (r.program.specialExams && r.program.specialExams.some(e => e.toUpperCase().includes(bl.toUpperCase()))) ||
               (bl === 'Học bạ' && r.program.talentAdmission && r.program.talentAdmission.toLowerCase().includes('học bạ'));
      });
    }
    finalResults.sort((a, b) => (b.passProbability + b.suitabilityScore) - (a.passProbability + a.suitabilityScore));
  }

  let filtered = finalResults;

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(r => r.program.name.toLowerCase().includes(term) || r.program.major.toLowerCase().includes(term));
  }

  if (sortBy === 'pass_desc') {
    filtered.sort((a, b) => b.passProbability - a.passProbability);
  } else if (sortBy === 'fee_asc') {
    filtered.sort((a, b) => a.program.feePerYear - b.program.feePerYear);
  } else if (sortBy === 'match_desc') {
    filtered.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
  }

  return (
    <div className="two-column-layout">
      {/* Cột Trái (Main Content) */}
      <div className="main-content">
        <div style={{ padding: '16px', background: 'var(--light-blue)', border: '1px solid var(--primary-blue)', borderRadius: '8px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.2rem', color: 'var(--primary-blue)', marginBottom: '8px' }}>Nhận diện lợi thế xét tuyển</h2>
          <p style={{ color: 'var(--text-dark)', lineHeight: '1.5' }}>
            Hệ thống nhận thấy bạn có các điểm phụ trợ quan trọng: 
            {profile.scores.ielts ? <strong> IELTS {profile.scores.ielts} </strong> : ''}
            {profile.scores.hsa ? <strong> | HSA {profile.scores.hsa} </strong> : ''}
            {profile.scores.tsa ? <strong> | TSA {profile.scores.tsa} </strong> : ''}
            {profile.scores.gpa ? <strong> | Học bạ {profile.scores.gpa} </strong> : ''}
            . Hệ thống sẽ tự động phân tích <strong>độc lập từng trường</strong> để tìm ra phương thức mang lại khả năng đỗ cao nhất cho bạn.
          </p>
        </div>



        <h1 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-dark)', textTransform: 'uppercase', lineHeight: '1.4' }}>
          DANH SÁCH {isSkipTest ? `CÁC TRƯỜNG ĐÀO TẠO NGÀNH ${profile.targetMajor?.toUpperCase()}` : 'CÁC NGÀNH PHÙ HỢP'}
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
          {isSkipTest 
            ? `Dự đoán khả năng đỗ ngành ${profile.targetMajor} của bạn tại các trường đại học với mức điểm ${globalBestMethod?.score}đ.`
            : `Danh sách phân tích tỷ lệ đỗ các trường đại học dựa trên mức điểm ${globalBestMethod?.score}đ của bạn. Đây là các ngành học phù hợp với kiểu tính cách ${profile.traits?.join(', ')} của bạn.`
          }
        </p>

        {/* Thanh công cụ lọc */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'center', flexWrap: 'wrap', background: 'var(--bg-card)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-light)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ flex: '1 1 200px' }}>
            <input 
              type="text" 
              placeholder="Tìm kiếm trường/ngành..."
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setDisplayCount(10); }}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.95rem' }}
            />
          </div>
          


          <div style={{ flex: '0 0 auto' }}>
            <select 
              value={sortBy} 
              onChange={e => setSortBy(e.target.value)}
              style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.95rem', background: 'white', cursor: 'pointer' }}
            >
              <option value="match_desc">Sắp xếp: Độ phù hợp cao nhất</option>
              <option value="fee_asc">Sắp xếp: Học phí thấp nhất</option>
            </select>
          </div>

          <button 
            onClick={() => router.push('/wishlist')}
            className="btn-primary"
            style={{ flex: '0 0 auto', padding: '10px 20px', background: 'var(--primary-purple)' }}
          >
            Xem bảng nguyện vọng &rarr;
          </button>
        </div>

        {/* Bảng Dữ Liệu */}
        <div className="data-table-container">
          <table className="data-table">
            <thead style={{ position: 'sticky', top: '63px', zIndex: 20 }}>
              <tr>
                <th style={{ width: '50px', position: 'sticky', top: '63px', zIndex: 20, textAlign: 'center' }}>STT</th>
                <th style={{ position: 'sticky', top: '63px', zIndex: 20, textAlign: 'center' }}>Tên Trường & Ngành</th>
                {!isSkipTest && <th className="blue-th" style={{ position: 'sticky', top: '63px', zIndex: 20, textAlign: 'center' }}>Nhóm Tính Cách</th>}
                <th style={{ position: 'sticky', top: '63px', zIndex: 20, textAlign: 'center' }}>Ghi Chú</th>
                <th style={{ position: 'sticky', top: '63px', zIndex: 20, textAlign: 'center' }}>Xếp Nguyện Vọng</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, displayCount).map((res, index) => {
                const inWishlist = wishlist.includes(res.program.id);
                return (
                  <tr 
                    key={res.program.id} 
                    className="hoverable-row"
                    style={{ position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}
                    onClick={() => router.push(`/major/${res.program.id}`)}
                  >
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{index + 1}</td>
                    <td>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--primary-blue)', marginBottom: '4px' }}>{res.program.name}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-dark)', fontWeight: 500 }}>Ngành: {res.program.major}</div>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        Học phí: {(res.program.feePerYear / 1000000).toFixed(1)} Tr/năm ({res.program.creditsPerSemester} tín/kỳ)
                      </div>
                      {res.bestMethod && res.bestMethod.score > 0 && (
                        <div style={{ fontSize: '0.85rem', color: '#16a34a', marginTop: '4px', fontWeight: 600 }}>
                          ✓ Tối ưu nhất: {res.bestMethod.methodName} ({res.bestMethod.score} đ{res.program.scoreCalculation?.scale === 40 ? ' / 40' : ''})
                        </div>
                      )}
                    </td>

                    {!isSkipTest && (
                      <td style={{ textAlign: 'center', fontWeight: 600, color: 'var(--text-dark)' }}>
                        {res.program.targetTraits && res.program.targetTraits.length > 0 ? res.program.targetTraits.join(', ') : 'N/A'}
                      </td>
                    )}
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '200px' }}>
                      <button onClick={(e) => handleAnalyzeClick(e, res)} style={{ background: 'var(--light-blue)', border: '1px solid var(--primary-blue)', color: 'var(--primary-blue)', cursor: 'pointer', fontWeight: 600, padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem' }}>Phân tích</button>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleWishlist(res.program.id); }}
                        className={inWishlist ? "btn-outline" : "btn-primary"}
                        style={{ padding: '6px 12px', fontSize: '0.85rem', width: '100%', minWidth: '80px' }}
                      >
                        {inWishlist ? 'Đã thêm' : 'Thêm'}
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                    Không tìm thấy kết quả nào phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {displayCount < filtered.length && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button 
              className="btn-outline" 
              onClick={() => setDisplayCount(prev => prev + 5)}
              style={{ padding: '8px 24px', fontSize: '1rem', cursor: 'pointer' }}
            >
              Xem thêm
            </button>
          </div>
        )}
      </div>

      {/* Cột Phải (Sidebar) */}
      <div className="sidebar" style={{ position: 'sticky', top: '72px', height: 'fit-content', maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
        <div style={{ padding: '16px', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-dark)', marginBottom: '4px' }}>Điểm tinh chỉnh</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Thay đổi điểm bên dưới và ấn Phân tích lại để xem kết quả mới nhất.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '16px' }}>
            {[
              { id: 'toan', label: 'Toán', max: 10 }, { id: 'van', label: 'Văn', max: 10 }, { id: 'anh', label: 'Anh', max: 10 },
              { id: 'ly', label: 'Lý', max: 10 }, { id: 'hoa', label: 'Hóa', max: 10 }, { id: 'sinh', label: 'Sinh', max: 10 },
              { id: 'su', label: 'Sử', max: 10 }, { id: 'dia', label: 'Địa', max: 10 }, { id: 'gdcd', label: 'GDCD', max: 10 },
              { id: 'ielts', label: 'IELTS', max: 9 }, { id: 'hsa', label: 'HSA', max: 150 }, { id: 'tsa', label: 'TSA', max: 100 },
              { id: 'gpa', label: 'GPA', max: 10 }
            ].filter(subject => activeSubjects.includes(subject.id) || subject.id === 'ielts' || subject.id === 'gpa').map(subject => (
                <div key={subject.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-page)', padding: '4px 6px', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dark)' }}>{subject.label}</span>
                  <input 
                    type="number"
                    step="0.1"
                    min="0"
                    max={subject.max}
                    value={profile.scores[subject.id as keyof typeof profile.scores] ?? ''}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      const finalVal = isNaN(val) ? undefined : Math.max(0, val);
                      setProfile({
                        ...profile,
                        scores: {
                          ...profile.scores,
                          [subject.id]: finalVal
                        }
                      });
                    }}
                    style={{ width: '64px', padding: '4px', border: '1px solid var(--border-light)', borderRadius: '4px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary-blue)' }}
                  />
                </div>
            ))}
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '6px' }}>Mức học phí tối đa (Triệu/năm)</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-page)', padding: '4px 6px', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Học phí</span>
              <input 
                type="number"
                step="1"
                min="0"
                value={profile.maxFee ? (profile.maxFee / 1000000).toString() : ''}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setProfile({
                    ...profile,
                    maxFee: isNaN(val) ? 999999999 : val * 1000000
                  });
                }}
                style={{ width: '80px', padding: '4px', border: '1px solid var(--border-light)', borderRadius: '4px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary-blue)' }}
              />
            </div>
          </div>

          <button className="btn-primary" onClick={handleReAnalyze} style={{ padding: '10px 20px', fontSize: '1rem', width: '100%' }}>
            Phân tích lại
          </button>
        </div>
      </div>

      {selectedAnalysis && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '24px',
            width: '90%',
            maxWidth: '600px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--primary-blue), var(--primary-purple))',
              padding: '24px 32px',
              color: 'white'
            }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0, paddingRight: '20px' }}>Phân tích: {selectedAnalysis.program.name}</h3>
              <p style={{ margin: '4px 0 0', opacity: 0.9 }}>Ngành: {selectedAnalysis.program.major}</p>
            </div>
            
            <div style={{ padding: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px dashed var(--border-light)' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600, marginBottom: '8px' }}>
                    Khả năng đỗ (Tỷ lệ đỗ)
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: selectedAnalysis.passProbability >= 80 ? '#16a34a' : selectedAnalysis.passProbability >= 50 ? '#d97706' : '#dc2626' }}>
                    {selectedAnalysis.passProbability}%
                  </div>
                </div>
                
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px dashed var(--border-light)' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600, marginBottom: '8px' }}>
                    Tổ hợp / Phương thức Tối ưu
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-blue)' }}>
                    {selectedAnalysis.bestMethod?.methodName || 'Không xác định'}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Điểm quy đổi: <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{selectedAnalysis.bestMethod?.score.toFixed(1)} đ</span>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600, marginBottom: '8px' }}>
                  🧠 Giải nghĩa từ Trí tuệ Nhân tạo
                </div>
                <div style={{ color: 'var(--text-dark)', lineHeight: '1.7', fontSize: '1rem', minHeight: '80px', background: '#f0f4f8', padding: '16px', borderRadius: '12px', borderLeft: '4px solid var(--primary-purple)' }}>
                  <Typewriter text={selectedAnalysis.reasoning} />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600, marginBottom: '8px' }}>
                  💡 Gợi ý Chiến lược
                </div>
                <div style={{ color: 'var(--text-dark)', fontSize: '0.95rem' }}>
                  {selectedAnalysis.passProbability >= 80 ? 'Tỷ lệ đỗ rất cao! Đây là phương án AN TOÀN tuyệt vời để bạn chống trượt. Nên đặt ở các nguyện vọng cuối.' : 
                   selectedAnalysis.passProbability >= 50 ? 'Khả năng đỗ ở mức VỪA SỨC. Bạn hoàn toàn có cơ hội trúng tuyển nếu điểm thi giữ vững phong độ. Nên đặt ở nguyện vọng giữa.' :
                   'Tỷ lệ đỗ khá thấp (MẠO HIỂM). Bạn có thể thử thách bản thân bằng cách đặt ngành này ở Nguyện vọng 1 hoặc 2, nhưng bắt buộc phải có các phương án dự phòng an toàn hơn ở dưới.'}
                </div>
              </div>

              <button 
                onClick={() => setSelectedAnalysis(null)} 
                style={{ background: 'var(--primary-blue)', color: 'white', border: 'none', padding: '14px 24px', borderRadius: '12px', cursor: 'pointer', fontWeight: 700, width: '100%', fontSize: '1.05rem', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}
              >
                Đóng Báo Cáo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal VIP Paywall */}
      {showVipModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{
            background: 'var(--bg-card)',
            width: '90%',
            maxWidth: '460px',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
            textAlign: 'center',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--primary-blue), var(--primary-purple))',
              padding: '40px 20px',
              color: 'white'
            }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>
                Đã đạt giới hạn gói Cơ bản!
              </h2>
              <div style={{ width: '40px', height: '4px', background: '#fff', margin: '0 auto', borderRadius: '2px', opacity: 0.5 }}></div>
            </div>
            
            <div style={{ padding: '32px 24px' }}>
              <p style={{ color: 'var(--text-dark)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '24px', fontWeight: 500 }}>
                Bạn chỉ được lưu tối đa <strong>2 nguyện vọng</strong>. Hãy nâng cấp lên gói <span style={{ color: 'var(--primary-purple)', fontWeight: 800 }}>VIP</span> để mở khóa <strong>15 nguyện vọng</strong> cùng toàn quyền sử dụng thuật toán Phân tích Chiến lược!
              </p>
              
              <button 
                onClick={() => router.push('/upgrade')}
                style={{
                  background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-blue))',
                  color: 'white',
                  border: 'none',
                  padding: '16px',
                  width: '100%',
                  borderRadius: '12px',
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 10px 20px rgba(147, 51, 234, 0.3)',
                  transition: 'transform 0.2s',
                  marginBottom: '16px'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Nâng cấp VIP ngay (99k)
              </button>
              
              <button 
                onClick={() => setShowVipModal(false)}
                style={{
                  background: 'transparent',
                  color: 'var(--text-muted)',
                  border: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '8px'
                }}
              >
                Để sau
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
