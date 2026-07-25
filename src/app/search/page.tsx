"use client";

import { useState, useEffect } from 'react';
import { mockUniversities } from '../../data/mockUniversities';
import { calculateMatch, calculateBestMethod, UserProfile, MatchResult } from '../../utils/matchEngine';
import { useRouter } from 'next/navigation';

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
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [globalBestMethod, setGlobalBestMethod] = useState<{score: number, methodName: string} | null>(null);
  const [activeSubjects, setActiveSubjects] = useState<string[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<{title: string, reasoning: string} | null>(null);
  const [displayCount, setDisplayCount] = useState(10);

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      const p: UserProfile = JSON.parse(saved);
      setProfile(p);
      setActiveSubjects(Object.keys(p.scores));
      
      const best = calculateBestMethod(p.scores);
      setGlobalBestMethod(best);

      const matched = mockUniversities.map(u => calculateMatch(p, u));
      // Sort by suitability or pass probability
      matched.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
      setResults(matched);
    }
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  const toggleWishlist = (id: string) => {
    let newList = [...wishlist];
    if (newList.includes(id)) {
      newList = newList.filter(i => i !== id);
    } else {
      newList.push(id);
    }
    setWishlist(newList);
    localStorage.setItem('wishlist', JSON.stringify(newList));
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const handleReAnalyze = () => {
    if (!profile) return;
    localStorage.setItem('userProfile', JSON.stringify(profile));
    
    const best = calculateBestMethod(profile.scores);
    setGlobalBestMethod(best);

    const matched = mockUniversities.map(u => calculateMatch(profile, u));
    matched.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
    setResults(matched);
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
    if (profile.targetMajor && profile.targetMajor !== 'All' && profile.targetMajor.trim() !== '') {
      finalResults = finalResults.filter(r => r.program.major.toLowerCase().includes(profile.targetMajor!.toLowerCase()) || profile.targetMajor!.toLowerCase().includes(r.program.major.toLowerCase()));
    }
    if (profile.targetBlock && profile.targetBlock !== 'All' && profile.targetBlock.trim() !== '') {
      finalResults = finalResults.filter(r => {
        const bl = profile.targetBlock!;
        return r.program.subjectBlocks.includes(bl) || 
               (r.program.specialExams && r.program.specialExams.some(e => e.toUpperCase().includes(bl.toUpperCase()))) ||
               (bl === 'Học bạ' && r.program.talentAdmission && r.program.talentAdmission.toLowerCase().includes('học bạ'));
      });
    }
    finalResults.sort((a, b) => (b.passProbability + b.suitabilityScore) - (a.passProbability + a.suitabilityScore));
  }

  const filtered = finalResults.filter(r => 
    r.program.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.program.major.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          DANH SÁCH {isSkipTest ? `CÁC TRƯỜNG ĐÀO TẠO NGÀNH ${profile.targetMajor?.toUpperCase()}` : 'CÁC NGÀNH PHÙ HỢP PHÙ HỢP'}
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
          {isSkipTest 
            ? `Dự đoán khả năng đỗ ngành ${profile.targetMajor} của bạn tại các trường đại học với mức điểm ${globalBestMethod?.score}đ.`
            : `Danh sách các trường đại học và ngành học phù hợp với mức điểm ${globalBestMethod?.score}đ và nhóm tính cách (${profile.traits.join(', ')}) của bạn.`
          }
        </p>

        {/* Khối xanh tìm kiếm */}
        <div className="blue-box">
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '12px', color: 'var(--text-dark)' }}>
            Em hãy chọn trường hoặc ngành quan tâm
          </label>
          <input 
            type="text" 
            placeholder="Tìm kiếm trường hoặc ngành học..."
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setDisplayCount(10); }}
            style={{ 
              width: '100%', padding: '12px 16px', borderRadius: '6px', 
              border: '1px solid var(--border-light)',
              fontFamily: 'var(--font-sans)', fontSize: '1rem',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
            }}
          />
        </div>

        {/* Bảng Dữ Liệu */}
        <div className="data-table-container">
          <table className="data-table">
            <thead style={{ position: 'sticky', top: '79px', zIndex: 20 }}>
              <tr>
                <th style={{ width: '50px', position: 'sticky', top: '79px', zIndex: 20, textAlign: 'center' }}>STT</th>
                <th style={{ position: 'sticky', top: '79px', zIndex: 20, textAlign: 'center' }}>Tên Trường & Ngành</th>
                <th style={{ position: 'sticky', top: '79px', zIndex: 20, textAlign: 'center' }}>Khả Năng Đỗ</th>
                <th className="blue-th" style={{ position: 'sticky', top: '79px', zIndex: 20, textAlign: 'center' }}>Độ Phù Hợp</th>
                <th style={{ position: 'sticky', top: '79px', zIndex: 20, textAlign: 'center' }}>Ghi Chú</th>
                <th style={{ position: 'sticky', top: '79px', zIndex: 20, textAlign: 'center' }}>So Sánh</th>
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
                    <td style={{ textAlign: 'center' }}>
                      <span style={{ 
                        fontWeight: 700, 
                        color: res.passProbability > 80 ? '#16a34a' : res.passProbability > 50 ? '#d97706' : '#dc2626' 
                      }}>
                        {res.passProbability}%
                      </span>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 700, color: 'var(--primary-purple)' }}>
                      {res.suitabilityScore}%
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '200px' }}>
                      <button onClick={(e) => { e.stopPropagation(); setSelectedAnalysis({ title: `${res.program.name} - ${res.program.major}`, reasoning: res.reasoning }); }} style={{ background: 'var(--light-blue)', border: '1px solid var(--primary-blue)', color: 'var(--primary-blue)', cursor: 'pointer', fontWeight: 600, padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem' }}>Phân tích</button>
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
      <div className="sidebar" style={{ position: 'sticky', top: '88px', height: 'fit-content', maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
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
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            background: 'var(--bg-card)',
            padding: '32px',
            borderRadius: '16px',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            position: 'relative'
          }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--primary-blue)' }}>Phân tích: {selectedAnalysis.title}</h3>
            <p style={{ color: 'var(--text-dark)', lineHeight: '1.7', fontSize: '1.05rem', minHeight: '100px' }}>
              <Typewriter text={selectedAnalysis.reasoning} />
            </p>
            <button 
              onClick={() => setSelectedAnalysis(null)} 
              style={{ marginTop: '24px', background: 'var(--primary-blue)', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, width: '100%' }}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
