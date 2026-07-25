"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockUniversities, UniversityProgram } from '@/data/mockUniversities';
import { massiveUniversities } from '@/data/massiveUniversities';

const allPrograms: UniversityProgram[] = (() => {
  const map = new Map<string, UniversityProgram>();
  massiveUniversities.forEach(p => map.set(p.id, p));
  mockUniversities.forEach(p => map.set(p.id, p));
  return Array.from(map.values());
})();

export default function LookupPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUni, setSelectedUni] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showPriorityDetails, setShowPriorityDetails] = useState(false);
  const [showTalentDetails, setShowTalentDetails] = useState(false);
  const [displayCount, setDisplayCount] = useState(10);

  const renderFormula = (text: string) => {
    if (text.includes(' × 3/50')) {
      const base = text.split(' × ')[0];
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span>{base} &times;</span>
          <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.85em', lineHeight: '1.2' }}>
            <span style={{ borderBottom: '1px solid currentColor', width: '100%', textAlign: 'center' }}>3</span>
            <span>50</span>
          </span>
        </span>
      );
    }
    if (text.includes(' × 3/350')) {
      const base = text.split(' × ')[0];
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span>{base} &times;</span>
          <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.85em', lineHeight: '1.2' }}>
            <span style={{ borderBottom: '1px solid currentColor', width: '100%', textAlign: 'center' }}>3</span>
            <span>350</span>
          </span>
        </span>
      );
    }
    if (text.includes(') / ')) {
      const parts = text.split(') / ');
      const top = parts[0].replace('(', '');
      const bottom = parts[1];
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.95em', lineHeight: '1.2' }}>
            <span style={{ borderBottom: '1px solid currentColor', width: '100%', textAlign: 'center', paddingBottom: '2px' }}>{top}</span>
            <span style={{ paddingTop: '2px' }}>{bottom}</span>
          </span>
        </span>
      );
    }
    return text;
  };

  const uniqueUnis = React.useMemo(() => {
    return Array.from(new Set(allPrograms.map(u => u.name))).sort();
  }, []);

  const uniqueMajors = React.useMemo(() => {
    const filteredUnis = selectedUni ? allPrograms.filter(u => u.name === selectedUni) : allPrograms;
    return Array.from(new Set(filteredUnis.map(u => u.major))).sort();
  }, [selectedUni]);

  // Lọc dữ liệu theo tên trường hoặc ngành học
  const filtered = allPrograms.filter(u => {
    const matchSearch = searchTerm === '' || u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.major.toLowerCase().includes(searchTerm.toLowerCase());
    const matchUni = selectedUni === '' || u.name === selectedUni;
    const matchMajor = selectedMajor === '' || u.major === selectedMajor;
    return matchSearch && matchUni && matchMajor;
  });

  const selectedProgram = expandedId ? allPrograms.find(u => u.id === expandedId) : null;

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '60px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Tra Cứu Thông Tin Tuyển Sinh</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
          Tìm kiếm thông tin điểm chuẩn các năm và phương thức xét tuyển của hàng trăm trường đại học trên cả nước.
        </p>
      </div>

      <div className="card" style={{ marginBottom: '24px', padding: '24px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '16px', color: 'var(--text-dark)' }}>
          Bộ lọc tìm kiếm
        </h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '8px', color: 'var(--text-muted)' }}>Từ khóa (Tên trường, Ngành)</label>
            <input 
              type="text" 
              placeholder="Ví dụ: Bách Khoa, Khoa học máy tính..."
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setDisplayCount(10); }}
              style={{ 
                width: '100%', padding: '12px 16px', borderRadius: '8px', 
                border: '2px solid var(--border-light)',
                fontFamily: 'var(--font-sans)', fontSize: '1rem',
                outline: 'none', transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary-blue)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
            />
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '8px', color: 'var(--text-muted)' }}>Trường Đại học</label>
            <select 
              value={selectedUni}
              onChange={e => {
                setSelectedUni(e.target.value);
                setSelectedMajor('');
                setDisplayCount(10);
              }}
              style={{ 
                width: '100%', padding: '12px 16px', borderRadius: '8px', 
                border: '2px solid var(--border-light)', background: '#fff',
                fontFamily: 'var(--font-sans)', fontSize: '1rem',
                outline: 'none', cursor: 'pointer'
              }}
            >
              <option value="">-- Tất cả trường --</option>
              {uniqueUnis.map((uni, i) => <option key={i} value={uni}>{uni}</option>)}
            </select>
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '8px', color: 'var(--text-muted)' }}>Ngành học</label>
            <select 
              value={selectedMajor}
              onChange={e => { setSelectedMajor(e.target.value); setDisplayCount(10); }}
              style={{ 
                width: '100%', padding: '12px 16px', borderRadius: '8px', 
                border: '2px solid var(--border-light)', background: '#fff',
                fontFamily: 'var(--font-sans)', fontSize: '1rem',
                outline: 'none', cursor: 'pointer'
              }}
            >
              <option value="">-- Tất cả ngành --</option>
              {uniqueMajors.map((major, i) => <option key={i} value={major}>{major}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead style={{ position: 'sticky', top: '79px', zIndex: 20 }}>
            <tr>
              <th style={{ width: '50px', position: 'sticky', top: '79px', zIndex: 20 }}>STT</th>
              <th style={{ position: 'sticky', top: '79px', zIndex: 20 }}>Tên Trường & Ngành</th>
              <th style={{ width: '120px', position: 'sticky', top: '79px', zIndex: 20 }}>Tổ Hợp</th>
              <th style={{ textAlign: 'center', position: 'sticky', top: '79px', zIndex: 20 }}>2023</th>
              <th style={{ textAlign: 'center', position: 'sticky', top: '79px', zIndex: 20 }}>2024</th>
              <th style={{ textAlign: 'center', position: 'sticky', top: '79px', zIndex: 20 }}>2025</th>
              <th style={{ width: '150px', textAlign: 'center', position: 'sticky', top: '79px', zIndex: 20 }}>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, displayCount).map((prog, index) => (
              <React.Fragment key={`${prog.id}-${index}`}>
                <tr
                  className="hoverable-row"
                  style={{ background: expandedId === prog.id ? 'var(--light-blue)' : 'transparent', cursor: 'pointer', transition: 'background 0.2s' }}
                  onClick={() => router.push(`/major/${prog.id}`)}
              >
                <td style={{ textAlign: 'center', fontWeight: 600 }}>{index + 1}</td>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--primary-blue)', marginBottom: '4px' }}>{prog.name}</div>
                  <div style={{ fontSize: '0.95rem', color: 'var(--text-dark)', fontWeight: 500 }}>Ngành: {prog.major}</div>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {prog.subjectBlocks ? prog.subjectBlocks.map((b, i) => (
                      <span key={i} style={{ background: 'var(--bg-page)', border: '1px solid var(--border-light)', fontSize: '0.75rem', padding: '2px 6px', borderRadius: '4px', color: 'var(--text-muted)' }}>{b}</span>
                    )) : <span style={{ color: 'var(--text-muted)' }}>-</span>}
                  </div>
                </td>
                {prog.historicalScores ? (
                  <>
                    <td style={{ textAlign: 'center', fontWeight: 600, color: 'var(--text-dark)' }}>{prog.historicalScores['2023']}</td>
                    <td style={{ textAlign: 'center', fontWeight: 600, color: 'var(--text-dark)' }}>{prog.historicalScores['2024']}</td>
                    <td style={{ textAlign: 'center', fontWeight: 600, color: 'var(--primary-purple)' }}>{prog.historicalScores['2025']}</td>
                  </>
                ) : (
                  <>
                    <td style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{(prog.averageScore - 0.45).toFixed(2)}</td>
                    <td style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{(prog.averageScore - 0.15).toFixed(2)}</td>
                    <td style={{ textAlign: 'center', fontWeight: 600, color: 'var(--text-dark)' }}>{prog.averageScore.toFixed(2)}</td>
                  </>
                )}
                <td style={{ textAlign: 'center' }}>
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      if (expandedId === prog.id) {
                        setExpandedId(null);
                        setShowPriorityDetails(false);
                        setShowTalentDetails(false);
                      } else {
                        setExpandedId(prog.id);
                        setShowPriorityDetails(false);
                        setShowTalentDetails(false);
                      }
                    }}
                    className={expandedId === prog.id ? "btn-primary" : "btn-outline"}
                    style={{ padding: '6px 12px', fontSize: '0.85rem', width: '100%' }}
                  >
                    {expandedId === prog.id ? 'Đóng' : 'Xem nhanh'}
                  </button>
                </td>
              </tr>
              </React.Fragment>
            ))}
            
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  Không tìm thấy trường hoặc ngành học nào phù hợp với từ khóa của bạn.
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

      {/* Modal / Cửa sổ nổi */}
      {selectedProgram && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setExpandedId(null)}>
          <div style={{ background: '#fff', borderRadius: '12px', width: '100%', maxWidth: '600px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-blue)', marginBottom: '8px' }}>{selectedProgram.name}</h3>
                <div style={{ fontSize: '1.1rem', color: 'var(--text-dark)', fontWeight: 500 }}>Ngành: {selectedProgram.major}</div>
              </div>
              <button
                onClick={() => {
                  setExpandedId(null);
                  setShowPriorityDetails(false);
                  setShowTalentDetails(false);
                }}
                style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}
              >
                &times;
              </button>
            </div>

            {showPriorityDetails ? (
              <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
                <button onClick={() => setShowPriorityDetails(false)} style={{ background: 'transparent', border: 'none', color: 'var(--primary-blue)', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
                  &larr; Quay lại thông tin ngành
                </button>

                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-dark)', marginBottom: '16px' }}>⭐ Bảng quy đổi Điểm Cộng & Ưu Tiên</h3>
                
                {/* General MOET Priority */}
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '1rem', color: '#334155', marginBottom: '12px' }}>Quy định chung của Bộ GD&ĐT</h4>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                    <thead>
                      <tr style={{ background: '#e2e8f0', color: '#475569' }}>
                        <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #cbd5e1' }}>Khu vực / Đối tượng</th>
                        <th style={{ padding: '8px', textAlign: 'center', border: '1px solid #cbd5e1' }}>Điểm cộng (Thang 30)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td style={{ padding: '8px', border: '1px solid #e2e8f0' }}>Khu vực 1 (KV1)</td><td style={{ padding: '8px', textAlign: 'center', border: '1px solid #e2e8f0', fontWeight: 600 }}>+ 0.75</td></tr>
                      <tr><td style={{ padding: '8px', border: '1px solid #e2e8f0' }}>Khu vực 2 - Nông thôn (KV2-NT)</td><td style={{ padding: '8px', textAlign: 'center', border: '1px solid #e2e8f0', fontWeight: 600 }}>+ 0.50</td></tr>
                      <tr><td style={{ padding: '8px', border: '1px solid #e2e8f0' }}>Khu vực 2 (KV2)</td><td style={{ padding: '8px', textAlign: 'center', border: '1px solid #e2e8f0', fontWeight: 600 }}>+ 0.25</td></tr>
                      <tr><td style={{ padding: '8px', border: '1px solid #e2e8f0' }}>Khu vực 3 (KV3)</td><td style={{ padding: '8px', textAlign: 'center', border: '1px solid #e2e8f0', fontWeight: 600, color: '#94a3b8' }}>Không cộng</td></tr>
                      <tr><td style={{ padding: '8px', border: '1px solid #e2e8f0' }}>Đối tượng ưu tiên (ĐT 1-7)</td><td style={{ padding: '8px', textAlign: 'center', border: '1px solid #e2e8f0', fontWeight: 600 }}>+ 1.0 đến + 2.0</td></tr>
                    </tbody>
                  </table>
                </div>

                {/* Specific University Priority */}
                {selectedProgram.priorityDetails && selectedProgram.priorityDetails.map((detail: any, idx: number) => (
                  <div key={idx} style={{ background: '#f3e8ff', padding: '16px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #e9d5ff' }}>
                    <h4 style={{ fontSize: '1rem', color: '#6b21a8', marginBottom: '12px' }}>{detail.title}</h4>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem', background: '#fff' }}>
                      <thead>
                        <tr style={{ background: '#e9d5ff', color: '#581c87' }}>
                          <th style={{ padding: '8px', textAlign: 'center', border: '1px solid #d8b4fe' }}>Chứng chỉ / Điều kiện</th>
                          <th style={{ padding: '8px', textAlign: 'center', border: '1px solid #d8b4fe' }}>Điểm quy đổi / Điểm cộng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(detail.table).map(([key, val], i) => (
                          <tr key={i}>
                            <td style={{ padding: '8px', textAlign: 'center', border: '1px solid #f3e8ff', color: '#4c1d95', fontWeight: 600 }}>{key}</td>
                            <td style={{ padding: '8px', textAlign: 'center', border: '1px solid #f3e8ff', color: '#7e22ce' }}>{String(val)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '24px', overflowY: 'auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                  <div style={{ background: 'var(--light-blue)', padding: '16px', borderRadius: '12px' }}>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--primary-blue)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>📚 Khối Xét Tuyển</h4>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {selectedProgram.subjectBlocks?.map((block, i) => (
                        <span key={i} style={{ background: '#fff', border: '1px solid var(--primary-blue)', color: 'var(--primary-blue)', padding: '4px 10px', borderRadius: '16px', fontSize: '0.9rem', fontWeight: 600 }}>{block}</span>
                      )) || <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Đang cập nhật...</span>}
                    </div>
                  </div>
                  
                  <div style={{ background: '#fef3c7', padding: '16px', borderRadius: '12px' }}>
                    <h4 style={{ fontSize: '1.05rem', color: '#d97706', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>🧠 ĐGNL & ĐGTD</h4>
                    {selectedProgram.specialExams && selectedProgram.specialExams.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {selectedProgram.specialExams.map((exam, i) => (
                          <div key={i}>
                            <div style={{ color: '#92400e', fontSize: '0.95rem', fontWeight: 600 }}>• {exam}</div>
                            {selectedProgram.conversionFormulas && selectedProgram.conversionFormulas[exam] && (
                              <div style={{ marginTop: '6px', padding: '10px 12px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', color: '#92400e', borderLeft: '4px solid #d97706', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                <strong style={{ fontSize: '0.75rem', textTransform: 'uppercase', display: 'block', marginBottom: '6px', letterSpacing: '0.5px' }}>Công thức quy đổi thang 30:</strong>
                                <div style={{ fontSize: '1rem', fontWeight: 600, fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', minHeight: '32px' }}>
                                  {renderFormula(selectedProgram.conversionFormulas[exam])}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span style={{ color: '#b45309', fontSize: '0.9rem' }}>Không sử dụng kết quả kỳ thi riêng</span>
                    )}
                  </div>
                  
                  <div style={{ background: '#ecfdf5', padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ fontSize: '1.05rem', color: '#059669', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>🏆 Tuyển Tài Năng</h4>
                    <p style={{ margin: 0, color: '#065f46', fontSize: '0.95rem', lineHeight: '1.5' }}>
                      {selectedProgram.talentAdmission || 'Đang cập nhật...'}
                    </p>
                    {selectedProgram.talentDetails && selectedProgram.talentDetails.length > 0 && (
                      <div style={{ marginTop: '12px', borderTop: '1px dashed #a7f3d0', paddingTop: '12px' }}>
                        {!showTalentDetails ? (
                          <button onClick={() => setShowTalentDetails(true)} style={{ background: 'none', border: 'none', color: '#059669', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, padding: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            Xem điều kiện chi tiết <span style={{ fontSize: '0.8rem' }}>▼</span>
                          </button>
                        ) : (
                          <div>
                            <button onClick={() => setShowTalentDetails(false)} style={{ background: 'none', border: 'none', color: '#059669', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, padding: 0, display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                              Thu gọn <span style={{ fontSize: '0.8rem' }}>▲</span>
                            </button>
                            <ul style={{ margin: 0, paddingLeft: '20px', color: '#047857', fontSize: '0.9rem', lineHeight: '1.5' }}>
                              {selectedProgram.talentDetails.map((detail, idx) => (
                                <li key={idx} style={{ marginBottom: '6px' }}>{detail}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div style={{ background: '#f3e8ff', padding: '16px', borderRadius: '12px' }}>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--primary-purple)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>⭐ Điểm Cộng / Ưu Tiên</h4>
                    {selectedProgram.priorityPolicies && selectedProgram.priorityPolicies.length > 0 ? (
                      <ul style={{ margin: 0, paddingLeft: '20px', color: '#6b21a8', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        {selectedProgram.priorityPolicies.map((pol, i) => <li key={i}>{pol}</li>)}
                      </ul>
                    ) : (
                      <span style={{ color: '#9333ea', fontSize: '0.9rem' }}>Theo quy định chung của BGD&ĐT</span>
                    )}
                    {selectedProgram.priorityDetails && (
                      <button onClick={() => setShowPriorityDetails(true)} style={{ marginTop: '12px', background: 'none', border: '1px solid var(--primary-purple)', color: 'var(--primary-purple)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
                        Xem bảng chi tiết &rarr;
                      </button>
                    )}
                  </div>
                </div>
                
                <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
                  <div style={{ background: 'var(--bg-page)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                    <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Học phí ước tính</span>
                    <strong style={{ fontSize: '1.1rem', color: 'var(--text-dark)' }}>{(selectedProgram.feePerYear / 1000000).toFixed(1)} Tr/năm</strong>
                  </div>
                  <div style={{ background: 'var(--bg-page)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                    <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Chỉ tiêu xét tuyển</span>
                    <strong style={{ fontSize: '1.1rem', color: '#16a34a' }}>{selectedProgram.quota ? selectedProgram.quota : 'Đang cập nhật'}</strong>
                  </div>
                  <div style={{ background: 'var(--bg-page)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                    <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Tỉnh/Thành phố</span>
                    <strong style={{ fontSize: '1.1rem', color: 'var(--text-dark)' }}>{selectedProgram.name.includes('TP.HCM') || selectedProgram.name.includes('Hồ Chí Minh') ? 'TP.HCM' : selectedProgram.name.includes('Đà Nẵng') ? 'Đà Nẵng' : 'Hà Nội'}</strong>
                  </div>
                </div>
                
                <div style={{ marginTop: '32px', textAlign: 'center' }}>
                  <button
                    onClick={() => {
                      setExpandedId(null);
                      setShowPriorityDetails(false);
                      setShowTalentDetails(false);
                    }}
                    style={{ background: 'var(--primary-blue)', color: 'white', border: 'none', padding: '10px 32px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', margin: '0 auto', display: 'block' }}
                  >
                    Đóng
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
