"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { UserProfile, ExamScores } from '../../utils/matchEngine';
import { useAuth } from '../../contexts/AuthContext';

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoggedIn, updateUserProfile } = useAuth();
  
  const [step, setStep] = useState(1);
  const [showRiasec, setShowRiasec] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  
  const [profile, setProfile] = useState<UserProfile>({
    scores: {},
    transcriptScores: {},
    maxFee: 30000000,
    location: 'Hà Nội',
    traits: []
  });

  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (stepParam) {
      setStep(parseInt(stepParam, 10));
    }

    if (isLoggedIn && user?.profile) {
      setProfile(prev => ({
        ...prev,
        ...user.profile,
        scores: user.profile?.scores || {},
        transcriptScores: user.profile?.transcriptScores || {},
        awards: user.profile?.awards || {}
      }));
      if (user.profile.traits && user.profile.traits.length > 0) {
        setSelectedTraits(user.profile.traits);
        setShowRiasec(true);
      }
    } else {
      const saved = localStorage.getItem('userProfile');
      if (saved) {
        const parsed = JSON.parse(saved);
        setProfile(parsed);
        if (parsed.traits) setSelectedTraits(parsed.traits);
      }
    }
  }, [searchParams, isLoggedIn, user]);

  const updateScore = (field: keyof ExamScores, value: string) => {
    const num = parseFloat(value);
    setProfile({
      ...profile,
      scores: {
        ...profile.scores,
        [field]: isNaN(num) ? undefined : Math.max(0, num)
      }
    });
  };

  const updateTranscriptScore = (field: keyof ExamScores, value: string) => {
    const num = parseFloat(value);
    setProfile({
      ...profile,
      transcriptScores: {
        ...(profile.transcriptScores || {}),
        [field]: isNaN(num) ? undefined : Math.max(0, num)
      }
    });
  };

  const updateAward = (field: 'nationalPrize' | 'provincialPrize', value: string) => {
    setProfile({
      ...profile,
      awards: {
        ...(profile.awards || {}),
        [field]: value === '' ? undefined : value
      }
    });
  };

  const riasecOptions = [
    { code: 'R', name: 'Realistic (Thực tế)' },
    { code: 'I', name: 'Investigative (Nghiên cứu)' },
    { code: 'A', name: 'Artistic (Nghệ thuật)' },
    { code: 'S', name: 'Social (Xã hội)' },
    { code: 'E', name: 'Enterprising (Khởi nghiệp)' },
    { code: 'C', name: 'Conventional (Mẫu mực)' },
  ];

  const toggleTrait = (code: string) => {
    let newTraits = [...selectedTraits];
    if (newTraits.includes(code)) {
      newTraits = newTraits.filter(t => t !== code);
    } else {
      if (newTraits.length < 2) {
        newTraits.push(code);
      } else {
        alert("Bạn chỉ được chọn tối đa 2 nhóm tính cách nổi trội nhất.");
        return;
      }
    }
    setSelectedTraits(newTraits);
    
    // Đề xuất ngành tự động
    if (newTraits.length > 0) {
      const primary = newTraits[0];
      let suggestedMajor = '';
      if (primary === 'R') suggestedMajor = 'Kỹ thuật';
      else if (primary === 'I') suggestedMajor = 'Công nghệ thông tin';
      else if (primary === 'A') suggestedMajor = 'Thiết kế đồ họa';
      else if (primary === 'S') suggestedMajor = 'Ngôn ngữ';
      else if (primary === 'E') suggestedMajor = 'Kinh tế';
      else if (primary === 'C') suggestedMajor = 'Kinh tế';
      
      setProfile(prev => ({...prev, targetMajor: suggestedMajor}));
    }
  };

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);
  
  const handleComplete = () => {
    const finalProfile = { ...profile, traits: selectedTraits };
    localStorage.setItem('userProfile', JSON.stringify(finalProfile));
    
    if (isLoggedIn && user) {
      updateUserProfile({
        ...(user.profile || {}),
        ...finalProfile
      });
    }
    
    router.push('/search');
  };

  const inputStyle = { 
    padding: '10px 12px', borderRadius: '6px', 
    background: '#fff', border: '1px solid var(--border-light)',
    color: 'var(--text-dark)', fontFamily: 'var(--font-sans)', width: '100%',
    fontSize: '0.95rem'
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px 0' }}>
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Xây Dựng Hồ Sơ</h1>
        <p style={{ color: 'var(--text-muted)' }}>Bước {step > 2 ? 2 : step} / 2</p>
        
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px' }}>
          {[1, 2].map(i => (
            <div key={i} style={{ 
              height: '4px', 
              width: '40px', 
              backgroundColor: step >= i ? 'var(--primary-blue)' : 'var(--border-light)',
              borderRadius: '2px',
              transition: 'background-color 0.3s ease'
            }} />
          ))}
        </div>
      </div>

      <div className="card" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
        {step === 1 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-blue)', marginBottom: '8px' }}>1. Nhập điểm thi (Đa phương thức)</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Nhập các điểm thi bạn có, hệ thống Hệ thống sẽ tự động tính toán tổ hợp môn hoặc phương thức xét tuyển có điểm số quy đổi cao nhất (lợi thế nhất) cho bạn.</p>
            </div>
            
            <div style={{ background: 'var(--bg-page)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--text-dark)' }}>Điểm thi THPT Quốc gia (Thang 10)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px' }}>
                <div><label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Toán</label><input type="number" step="0.1" max="10" value={profile.scores.toan || ''} onChange={e => updateScore('toan', e.target.value)} style={inputStyle} /></div>
                <div><label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Ngữ Văn</label><input type="number" step="0.1" max="10" value={profile.scores.van || ''} onChange={e => updateScore('van', e.target.value)} style={inputStyle} /></div>
                <div><label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Ngoại Ngữ</label><input type="number" step="0.1" max="10" value={profile.scores.anh || ''} onChange={e => updateScore('anh', e.target.value)} style={inputStyle} /></div>
                <div><label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Vật Lý</label><input type="number" step="0.1" max="10" value={profile.scores.ly || ''} onChange={e => updateScore('ly', e.target.value)} style={inputStyle} /></div>
                <div><label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Hóa Học</label><input type="number" step="0.1" max="10" value={profile.scores.hoa || ''} onChange={e => updateScore('hoa', e.target.value)} style={inputStyle} /></div>
                <div><label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Sinh Học</label><input type="number" step="0.1" max="10" value={profile.scores.sinh || ''} onChange={e => updateScore('sinh', e.target.value)} style={inputStyle} /></div>
                <div><label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Lịch Sử</label><input type="number" step="0.1" max="10" value={profile.scores.su || ''} onChange={e => updateScore('su', e.target.value)} style={inputStyle} /></div>
                <div><label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Địa Lý</label><input type="number" step="0.1" max="10" value={profile.scores.dia || ''} onChange={e => updateScore('dia', e.target.value)} style={inputStyle} /></div>
                <div><label style={{ fontSize: '0.85rem', fontWeight: 600 }}>GDCD</label><input type="number" step="0.1" max="10" value={profile.scores.gdcd || ''} onChange={e => updateScore('gdcd', e.target.value)} style={inputStyle} /></div>
              </div>
            </div>

            <div style={{ background: 'var(--light-blue)', padding: '16px', borderRadius: '8px', border: '1px solid var(--light-blue-hover)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--primary-blue)' }}>Chứng chỉ & Đánh giá năng lực (Tùy chọn)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
                <div><label style={{ fontSize: '0.85rem', fontWeight: 600 }}>IELTS (0 - 9.0)</label><input type="number" step="0.5" max="9" value={profile.scores.ielts || ''} onChange={e => updateScore('ielts', e.target.value)} style={inputStyle} placeholder="Ví dụ: 6.5" /></div>
                <div><label style={{ fontSize: '0.85rem', fontWeight: 600 }}>ĐGNL ĐHQGHN (HSA)</label><input type="number" max="150" placeholder="Thang 150" value={profile.scores.hsa || ''} onChange={e => updateScore('hsa', e.target.value)} style={inputStyle} /></div>
                <div><label style={{ fontSize: '0.85rem', fontWeight: 600 }}>ĐGTD Bách Khoa (TSA)</label><input type="number" max="100" placeholder="Thang 100" value={profile.scores.tsa || ''} onChange={e => updateScore('tsa', e.target.value)} style={inputStyle} /></div>
              </div>
            </div>

            <div style={{ background: '#fef3c7', padding: '16px', borderRadius: '8px', border: '1px solid #fde68a' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: '#b45309' }}>Thành tích Giải thưởng (Tùy chọn)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Giải HSG Quốc gia</label>
                  <select value={profile.awards?.nationalPrize || ''} onChange={e => updateAward('nationalPrize', e.target.value)} style={inputStyle}>
                    <option value="">-- Không có --</option>
                    <option value="Nhất">Giải Nhất</option>
                    <option value="Nhì">Giải Nhì</option>
                    <option value="Ba">Giải Ba</option>
                    <option value="Khuyến khích">Giải Khuyến khích</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Giải HSG Cấp Tỉnh/TP</label>
                  <select value={profile.awards?.provincialPrize || ''} onChange={e => updateAward('provincialPrize', e.target.value)} style={inputStyle}>
                    <option value="">-- Không có --</option>
                    <option value="Nhất">Giải Nhất</option>
                    <option value="Nhì">Giải Nhì</option>
                    <option value="Ba">Giải Ba</option>
                    <option value="Khuyến khích">Giải Khuyến khích</option>
                  </select>
                </div>
              </div>
            </div>

            {showTranscript ? (
              <div style={{ background: 'var(--bg-page)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-dark)', margin: 0 }}>Điểm Học Bạ (Lớp 12 / TB 3 năm)</h3>
                  <button className="btn-outline" onClick={() => setShowTranscript(false)} style={{ padding: '4px 12px', fontSize: '0.85rem' }}>Đóng lại</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px' }}>
                  <div><label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Toán</label><input type="number" step="0.1" max="10" value={profile.transcriptScores?.toan || ''} onChange={e => updateTranscriptScore('toan', e.target.value)} style={inputStyle} /></div>
                  <div><label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Ngữ Văn</label><input type="number" step="0.1" max="10" value={profile.transcriptScores?.van || ''} onChange={e => updateTranscriptScore('van', e.target.value)} style={inputStyle} /></div>
                  <div><label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Ngoại Ngữ</label><input type="number" step="0.1" max="10" value={profile.transcriptScores?.anh || ''} onChange={e => updateTranscriptScore('anh', e.target.value)} style={inputStyle} /></div>
                  <div><label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Vật Lý</label><input type="number" step="0.1" max="10" value={profile.transcriptScores?.ly || ''} onChange={e => updateTranscriptScore('ly', e.target.value)} style={inputStyle} /></div>
                  <div><label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Hóa Học</label><input type="number" step="0.1" max="10" value={profile.transcriptScores?.hoa || ''} onChange={e => updateTranscriptScore('hoa', e.target.value)} style={inputStyle} /></div>
                  <div><label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Sinh Học</label><input type="number" step="0.1" max="10" value={profile.transcriptScores?.sinh || ''} onChange={e => updateTranscriptScore('sinh', e.target.value)} style={inputStyle} /></div>
                  <div><label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Lịch Sử</label><input type="number" step="0.1" max="10" value={profile.transcriptScores?.su || ''} onChange={e => updateTranscriptScore('su', e.target.value)} style={inputStyle} /></div>
                  <div><label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Địa Lý</label><input type="number" step="0.1" max="10" value={profile.transcriptScores?.dia || ''} onChange={e => updateTranscriptScore('dia', e.target.value)} style={inputStyle} /></div>
                  <div><label style={{ fontSize: '0.85rem', fontWeight: 600 }}>GDCD</label><input type="number" step="0.1" max="10" value={profile.transcriptScores?.gdcd || ''} onChange={e => updateTranscriptScore('gdcd', e.target.value)} style={inputStyle} /></div>
                  <div><label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Điểm TB chung</label><input type="number" step="0.1" max="10" value={profile.transcriptScores?.gpa || ''} onChange={e => updateTranscriptScore('gpa', e.target.value)} style={inputStyle} /></div>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setShowTranscript(true)}
                style={{ 
                  background: 'none', border: '1px dashed var(--primary-blue)', 
                  color: 'var(--primary-blue)', padding: '16px', borderRadius: '8px',
                  fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                  width: '100%', textAlign: 'center'
                }}
                onMouseOver={e => { e.currentTarget.style.background = 'var(--light-blue)'; e.currentTarget.style.borderStyle = 'solid'; }}
                onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderStyle = 'dashed'; }}
              >
                + Thêm điểm Xét Học Bạ (Tùy chọn)
              </button>
            )}
          </div>
        )}

        {step === 2 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-blue)' }}>2. Tham số cá nhân</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <label style={{ color: 'var(--text-dark)', fontWeight: 600 }}>
                Ngân sách học phí tối đa / năm:
              </label>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                {[
                  { value: 25000000, label: "Công lập hệ chuẩn", desc: "Dưới 25 triệu" },
                  { value: 45000000, label: "Hệ Chất lượng cao", desc: "Khoảng 45 triệu" },
                  { value: 80000000, label: "Tư thục / Quốc tế", desc: "Khoảng 80 triệu" }
                ].map((preset) => (
                  <div 
                    key={preset.value}
                    onClick={() => setProfile({...profile, maxFee: preset.value})}
                    style={{
                      padding: '16px',
                      borderRadius: '8px',
                      border: profile.maxFee === preset.value ? '2px solid var(--primary-blue)' : '1px solid var(--border-light)',
                      background: profile.maxFee === preset.value ? 'var(--light-blue)' : 'var(--bg-page)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontWeight: 600, color: profile.maxFee === preset.value ? 'var(--primary-blue)' : 'var(--text-dark)' }}>{preset.label}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>{preset.desc}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Hoặc nhập số cụ thể:</span>
                <div style={{ position: 'relative', maxWidth: '200px' }}>
                  <input 
                    type="number" 
                    value={profile.maxFee ? profile.maxFee / 1000000 : ''}
                    onChange={e => {
                      const val = parseFloat(e.target.value);
                      setProfile({...profile, maxFee: isNaN(val) ? 0 : val * 1000000});
                    }}
                    style={{ ...inputStyle, paddingRight: '70px', fontWeight: 600, color: 'var(--primary-blue)' }}
                  />
                  <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>
                    Triệu VNĐ
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--text-dark)', fontWeight: 600 }}>Ngành học quan tâm</label>
              <select 
                value={profile.targetMajor || ''}
                onChange={e => setProfile({...profile, targetMajor: e.target.value})}
                style={inputStyle}
              >
                <option value="">-- Chưa xác định --</option>
                <option value="Công nghệ thông tin">Công nghệ thông tin (IT, KHMT...)</option>
                <option value="Kinh tế">Khối Kinh tế (QTKD, Kế toán...)</option>
                <option value="Kỹ thuật">Khối Kỹ thuật (Cơ điện tử, Tự động hóa...)</option>
                <option value="Ngôn ngữ">Ngôn ngữ học (Anh, Trung, Nhật...)</option>
                <option value="Thiết kế đồ họa">Nghệ thuật / Thiết kế đồ họa</option>
                <option value="Y Dược">Y Dược</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--text-dark)', fontWeight: 600 }}>Khu vực ưu tiên</label>
              <select 
                value={profile.location}
                onChange={e => setProfile({...profile, location: e.target.value})}
                style={inputStyle}
              >
                <option value="Hà Nội">Hà Nội</option>
                <option value="TP. HCM">TP. Hồ Chí Minh</option>
                <option value="Khác">Khu vực khác</option>
              </select>
            </div>

            {/* Trắc nghiệm tính cách (Tùy chọn) */}
            {!showRiasec ? (
              <button 
                onClick={() => setShowRiasec(true)}
                style={{ 
                  background: 'none', border: '1px dashed var(--primary-purple)', 
                  color: 'var(--primary-purple)', padding: '16px', borderRadius: '8px',
                  fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                  width: '100%', textAlign: 'center', marginTop: '16px'
                }}
                onMouseOver={e => { e.currentTarget.style.background = '#f3e8ff'; e.currentTarget.style.borderStyle = 'solid'; }}
                onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderStyle = 'dashed'; }}
              >
                Chưa biết chọn ngành nào? Hãy làm Trắc nghiệm tính cách (RIASEC) để nhận đề xuất
              </button>
            ) : (
              <div style={{ background: 'var(--bg-page)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-light)', marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-purple)', margin: 0 }}>Trắc nghiệm tính cách (RIASEC)</h3>
                  <button className="btn-outline" onClick={() => setShowRiasec(false)} style={{ padding: '4px 12px', fontSize: '0.85rem' }}>Đóng lại</button>
                </div>
                
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a href="https://openpsychometrics.org/tests/RIASEC/" target="_blank" rel="noopener noreferrer">
                      <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.95rem', background: 'var(--primary-purple)', boxShadow: 'var(--shadow-md)' }}>
                        Làm Bài Test Quốc Tế
                      </button>
                    </a>
                    <a href="https://www.google.com/search?q=tr%E1%BA%AFc+nghi%E1%BB%87m+t%C3%ADnh+c%C3%A1ch+Holland+RIASEC+online" target="_blank" rel="noopener noreferrer">
                      <button className="btn-outline" style={{ padding: '10px 20px', fontSize: '0.95rem' }}>
                        Tìm bài Test Tiếng Việt &rarr;
                      </button>
                    </a>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '16px' }}>
                    Nhập kết quả bài test vào bên dưới (chọn tối đa 2 mã nổi trội nhất).
                  </p>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
                  {riasecOptions.map((opt) => {
                    const isSelected = selectedTraits.includes(opt.code);
                    return (
                      <div 
                        key={opt.code} 
                        onClick={() => toggleTrait(opt.code)}
                        style={{ 
                          padding: '16px 12px', background: isSelected ? 'var(--light-blue)' : '#fff', 
                          border: isSelected ? '2px solid var(--primary-blue)' : '1px solid var(--border-light)',
                          borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s ease',
                          textAlign: 'center'
                        }}
                      >
                        <div style={{ fontSize: '1.5rem', color: isSelected ? 'var(--primary-blue)' : 'var(--text-muted)', marginBottom: '4px', fontWeight: 800 }}>{opt.code}</div>
                        <div style={{ color: 'var(--text-dark)', fontSize: '0.85rem', fontWeight: isSelected ? 700 : 500 }}>{opt.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 3 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', fontSize: '32px' }}>
              ✓
            </div>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--text-dark)' }}>Hồ sơ đã hoàn tất!</h2>
            <p style={{ color: 'var(--text-muted)' }}>Hệ thống đã ghi nhận điểm số và tiêu chí của bạn.</p>
            <button className="btn-primary" onClick={() => router.push('/search')} style={{ marginTop: '24px', padding: '16px 40px', fontSize: '1.2rem' }}>
              Bắt đầu Phân tích
            </button>
          </div>
        ) : null}

        {step < 3 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '32px' }}>
            <button 
              onClick={handlePrev} 
              disabled={step === 1}
              className={step === 1 ? "" : "btn-outline"}
              style={{ 
                padding: '12px 24px', background: 'transparent', 
                border: step === 1 ? '1px solid var(--border-light)' : undefined, 
                color: step === 1 ? 'var(--text-muted)' : undefined,
                borderRadius: '8px', cursor: step === 1 ? 'not-allowed' : 'pointer',
                fontWeight: 600
              }}
            >
              Quay lại
            </button>

            <button 
              onClick={step === 2 ? handleComplete : handleNext} 
              className="btn-primary"
            >
              {step === 2 ? 'Hoàn tất & Phân tích' : 'Tiếp tục'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
