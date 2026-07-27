"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserProfile, ExamScores } from '../../utils/matchEngine';

export default function ProfilePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [skipTest, setSkipTest] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  
  const [profile, setProfile] = useState<UserProfile>({
    scores: {},
    transcriptScores: {},
    maxFee: 30000000,
    location: 'Hà Nội',
    traits: []
  });

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

  const riasecOptions = [
    { code: 'R', name: 'Realistic (Thực tế)' },
    { code: 'I', name: 'Investigative (Nghiên cứu)' },
    { code: 'A', name: 'Artistic (Nghệ thuật)' },
    { code: 'S', name: 'Social (Xã hội)' },
    { code: 'E', name: 'Enterprising (Khởi nghiệp)' },
    { code: 'C', name: 'Conventional (Mẫu mực)' },
  ];
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);

  const toggleTrait = (code: string) => {
    if (selectedTraits.includes(code)) {
      setSelectedTraits(selectedTraits.filter(t => t !== code));
    } else {
      if (selectedTraits.length < 2) {
        setSelectedTraits([...selectedTraits, code]);
      } else {
        alert("Bạn chỉ được chọn tối đa 2 nhóm tính cách nổi trội nhất.");
      }
    }
  };

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);
  
  const handleComplete = () => {
    if (!skipTest) {
      if (selectedTraits.length === 0) {
        alert("Vui lòng chọn ít nhất 1 nhóm tính cách hoặc chọn Bỏ qua.");
        return;
      }
      localStorage.setItem('userProfile', JSON.stringify({ ...profile, traits: selectedTraits }));
    } else {
      if ((!profile.targetMajor || profile.targetMajor === '') && (!profile.targetBlock || profile.targetBlock === '')) {
        alert("Vui lòng chọn ít nhất Ngành học mong muốn hoặc Tổ hợp môn ưu tiên!");
        return;
      }
      localStorage.setItem('userProfile', JSON.stringify({ ...profile, traits: [] }));
    }
    setStep(4);
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
        <p style={{ color: 'var(--text-muted)' }}>Bước {step > 3 ? 3 : step} / 3</p>
        
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px' }}>
          {[1, 2, 3].map(i => (
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

        {step === 3 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-blue)' }}>3. Tham số cá nhân</h2>
            
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
          </div>
        )}

        {step === 2 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-blue)' }}>2. Trắc nghiệm tính cách (RIASEC)</h2>
            
            {!skipTest ? (
              <>
                <div style={{ marginBottom: '-10px' }}>
                  <p style={{ color: 'var(--text-muted)' }}>Đánh dấu vào những hoạt động bạn cảm thấy hứng thú nhất:</p>
                </div>
                
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a href="https://openpsychometrics.org/tests/RIASEC/" target="_blank" rel="noopener noreferrer">
                      <button className="btn-primary" style={{ padding: '12px 24px', fontSize: '1rem', background: 'var(--primary-purple)', boxShadow: 'var(--shadow-md)' }}>
                        Mở Bài Test RIASEC (Chuẩn Quốc Tế)
                      </button>
                    </a>
                    <a href="https://www.google.com/search?q=tr%E1%BA%AFc+nghi%E1%BB%87m+t%C3%ADnh+c%C3%A1ch+Holland+RIASEC+online" target="_blank" rel="noopener noreferrer">
                      <button className="btn-outline" style={{ padding: '12px 24px', fontSize: '1rem' }}>
                        Tìm bài Test Tiếng Việt &rarr;
                      </button>
                    </a>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '16px' }}>
                    Hãy làm bài test ở trang web bạn tin cậy, sau đó quay lại đây và nhập kết quả (chọn 1-2 mã nổi trội nhất).
                  </p>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                  {riasecOptions.map((opt) => {
                    const isSelected = selectedTraits.includes(opt.code);
                    return (
                      <div 
                        key={opt.code} 
                        onClick={() => toggleTrait(opt.code)}
                        style={{ 
                          padding: '20px 16px', background: isSelected ? 'var(--light-blue)' : 'var(--bg-page)', 
                          border: isSelected ? '2px solid var(--primary-blue)' : '1px solid var(--border-light)',
                          borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s ease',
                          textAlign: 'center', fontWeight: isSelected ? 700 : 500
                        }}
                      >
                        <div style={{ fontSize: '1.8rem', color: isSelected ? 'var(--primary-blue)' : 'var(--text-muted)', marginBottom: '8px', fontWeight: 800 }}>{opt.code}</div>
                        <div style={{ color: 'var(--text-dark)', fontSize: '0.95rem' }}>{opt.name}</div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div style={{ padding: '24px', background: 'var(--bg-page)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', color: 'var(--text-dark)' }}>Chọn thẳng Ngành học & Tổ hợp Môn</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  Hệ thống AI sẽ bỏ qua đánh giá tính cách và tinh lọc ra chính xác danh sách trường/chương trình đáp ứng Ngành học và Khối môn xét tuyển bạn mong muốn dưới đây:
                </p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '8px' }}>1. Ngành học mong muốn</label>
                    <select 
                      value={profile.targetMajor || ''}
                      onChange={(e) => setProfile({...profile, targetMajor: e.target.value})}
                      style={inputStyle}
                    >
                      <option value="">-- Chọn ngành học --</option>
                      <option value="All" style={{ fontWeight: 600, color: 'var(--primary-blue)' }}>★ Tất cả các ngành học</option>
                      <optgroup label="Công nghệ & Kỹ thuật">
                        <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                        <option value="Khoa học máy tính">Khoa học máy tính</option>
                        <option value="Kỹ thuật phần mềm">Kỹ thuật phần mềm</option>
                        <option value="An toàn thông tin">An toàn thông tin</option>
                        <option value="Kỹ thuật Ô tô">Kỹ thuật Ô tô</option>
                        <option value="Kỹ thuật Điều khiển và Tự động hóa">Kỹ thuật Điều khiển và Tự động hóa</option>
                        <option value="Cơ điện tử">Cơ điện tử</option>
                      </optgroup>
                      <optgroup label="Kinh tế & Kinh doanh">
                        <option value="Kinh tế">Kinh tế</option>
                        <option value="Quản trị kinh doanh">Quản trị kinh doanh</option>
                        <option value="Tài chính - Ngân hàng">Tài chính - Ngân hàng</option>
                        <option value="Kế toán">Kế toán</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Logistics và Quản lý chuỗi cung ứng">Logistics và Quản lý chuỗi cung ứng</option>
                      </optgroup>
                      <optgroup label="Khoa học Xã hội & Ngôn ngữ">
                        <option value="Ngôn ngữ Anh">Ngôn ngữ Anh</option>
                        <option value="Ngôn ngữ Trung Quốc">Ngôn ngữ Trung Quốc</option>
                        <option value="Báo chí">Báo chí</option>
                        <option value="Truyền thông đa phương tiện">Truyền thông đa phương tiện</option>
                        <option value="Quan hệ công chúng">Quan hệ công chúng</option>
                        <option value="Sư phạm Tiếng Anh">Sư phạm Tiếng Anh</option>
                        <option value="Luật">Luật</option>
                      </optgroup>
                      <optgroup label="Y Dược">
                        <option value="Y khoa">Y khoa</option>
                        <option value="Răng - Hàm - Mặt">Răng - Hàm - Mặt</option>
                        <option value="Dược học">Dược học</option>
                        <option value="Điều dưỡng">Điều dưỡng</option>
                      </optgroup>
                      <optgroup label="Nghệ thuật & Dịch vụ">
                        <option value="Thiết kế đồ họa">Thiết kế đồ họa</option>
                        <option value="Thiết kế thời trang">Thiết kế thời trang</option>
                        <option value="Quản trị khách sạn">Quản trị khách sạn</option>
                        <option value="Du lịch và lữ hành">Du lịch và lữ hành</option>
                        <option value="Diễn viên kịch, điện ảnh">Diễn viên kịch, điện ảnh</option>
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '8px' }}>2. Tổ hợp môn / Phương thức ưu tiên</label>
                    <select 
                      value={profile.targetBlock || ''}
                      onChange={(e) => setProfile({...profile, targetBlock: e.target.value})}
                      style={inputStyle}
                    >
                      <option value="">-- Chọn tổ hợp môn / phương thức --</option>
                      <option value="All" style={{ fontWeight: 600, color: 'var(--primary-purple)' }}>★ Tất cả các tổ hợp & phương thức</option>
                      <optgroup label="Khối Thi Môn Tốt Nghiệp">
                        <option value="A00">Khối A00 (Toán, Lý, Hóa)</option>
                        <option value="A01">Khối A01 (Toán, Lý, Anh)</option>
                        <option value="B00">Khối B00 (Toán, Hóa, Sinh)</option>
                        <option value="C00">Khối C00 (Văn, Sử, Địa)</option>
                        <option value="D01">Khối D01 (Toán, Văn, Anh)</option>
                        <option value="D07">Khối D07 (Toán, Hóa, Anh)</option>
                        <option value="V00">Khối V00 (Toán, Lý, Vẽ/Văn)</option>
                      </optgroup>
                      <optgroup label="Đánh giá Năng lực & Xét tuyển Riêng">
                        <option value="HSA">Đánh giá năng lực ĐHQGHN (HSA)</option>
                        <option value="TSA">Đánh giá tư duy Bách Khoa (TSA)</option>
                        <option value="Học bạ">Xét tuyển Học bạ THPT</option>
                      </optgroup>
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: '28px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
                  <button 
                    onClick={() => { setSkipTest(false); setProfile({...profile, targetMajor: undefined, targetBlock: undefined}); }}
                    style={{ background: 'transparent', border: 'none', color: 'var(--primary-blue)', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.9rem', fontWeight: 500 }}
                  >
                    &larr; Quay lại làm trắc nghiệm tính cách
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ fontSize: '5rem', marginBottom: '16px' }}>🎉</div>
            <h2 style={{ fontSize: '2.5rem' }} className="gradient-text">Hồ sơ đã hoàn tất!</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '400px', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Hệ thống đã thu thập đủ dữ liệu và sẽ quét toàn bộ các phương án điểm số để tìm lợi thế cao nhất cho bạn.
            </p>
            <button className="btn-primary" onClick={() => router.push('/search')} style={{ marginTop: '24px', padding: '16px 40px', fontSize: '1.2rem' }}>
              Bắt đầu Phân tích
            </button>
          </div>
        )}

        {step < 4 && (
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

            {step === 2 && !skipTest && (
              <button 
                onClick={() => setSkipTest(true)}
                style={{ 
                  padding: '8px 16px', fontSize: '0.95rem', fontWeight: 600, 
                  color: 'var(--primary-blue)', background: 'transparent', 
                  border: 'none', cursor: 'pointer', textDecoration: 'underline'
                }}
              >
                Chọn ngành/tổ hợp &rarr;
              </button>
            )}
            <button 
              onClick={step === 3 ? handleComplete : handleNext} 
              className="btn-primary"
            >
              {step === 3 ? 'Hoàn tất' : 'Tiếp tục'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
