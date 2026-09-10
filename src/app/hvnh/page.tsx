"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  HVNHCandidateProfile, 
  evaluateCandidateForHVNH, 
  MajorEvaluation, 
  convertIeltsToScore 
} from '../../utils/hvnhScoringEngine';

export default function HVNHAdmissionPage() {
  const [profile, setProfile] = useState<HVNHCandidateProfile>({
    fullName: '',
    phone: '',
    area: 'KV2-NT',
    group: 'none',
    schoolType: 'standard',
    nationalAward: 'none',
    provincialAward: 'none',
    englishCertType: 'ielts',
    certScore: 6.5,
    transcriptScores: {
      math: 8.8,
      literature: 7.5,
      english: 8.5,
      physics: 8.2,
      chemistry: 7.8,
      informatics: 8.5
    },
    examScores: {
      math: 8.6,
      literature: 7.5,
      english: 8.2,
      physics: 8.0,
      chemistry: 7.5
    },
    hsaScore: 95
  });

  const [activeTab, setActiveTab] = useState<'profile' | 'results' | 'formula'>('profile');
  const [evaluations, setEvaluations] = useState<MajorEvaluation[]>([]);
  const [filterChance, setFilterChance] = useState<string>('all');
  const [filterCampus, setFilterCampus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedMajorDetail, setSelectedMajorDetail] = useState<MajorEvaluation | null>(null);

  // 1. Đồng bộ dữ liệu: Đọc từ Hồ Sơ Chung (localStorage userProfile) khi người dùng mở trang
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('userProfile');
      if (savedUser) {
        const u = JSON.parse(savedUser);
        setProfile(prev => {
          // Map điểm thi THPT
          const scores = u.scores || {};
          const transcript = u.transcriptScores || {};
          
          // Map chứng chỉ
          let certType: HVNHCandidateProfile['englishCertType'] = u.englishCertType || 'none';
          let cScore = u.certScore || 0;
          if (scores.ielts && certType === 'none') {
            certType = 'ielts';
            cScore = scores.ielts;
          } else if (scores.toefl && certType === 'none') {
            certType = 'toefl_ibt';
            cScore = scores.toefl;
          } else if (scores.sat && certType === 'none') {
            certType = 'sat';
            cScore = scores.sat;
          } else if (scores.act && certType === 'none') {
            certType = 'act';
            cScore = scores.act;
          }

          // Map giải thưởng
          let natAward: HVNHCandidateProfile['nationalAward'] = 'none';
          if (u.awards?.nationalPrize === 'Nhất') natAward = 'first';
          else if (u.awards?.nationalPrize === 'Nhì') natAward = 'second';
          else if (u.awards?.nationalPrize === 'Ba') natAward = 'third';
          else if (u.awards?.nationalPrize === 'Khuyến khích') natAward = 'consolation';

          let provAward: HVNHCandidateProfile['provincialAward'] = 'none';
          if (u.awards?.provincialPrize === 'Nhất') provAward = 'first';
          else if (u.awards?.provincialPrize === 'Nhì') provAward = 'second';
          else if (u.awards?.provincialPrize === 'Ba') provAward = 'third';
          else if (u.awards?.provincialPrize === 'Khuyến khích') provAward = 'consolation';

          return {
            ...prev,
            fullName: u.fullName || prev.fullName,
            phone: u.phone || prev.phone,
            area: u.area || prev.area,
            group: u.priorityGroup || prev.group,
            schoolType: u.schoolType || prev.schoolType,
            nationalAward: natAward,
            provincialAward: provAward,
            englishCertType: certType,
            certScore: cScore || prev.certScore,
            transcriptScores: {
              math: transcript.toan !== undefined ? transcript.toan : prev.transcriptScores.math,
              literature: transcript.van !== undefined ? transcript.van : prev.transcriptScores.literature,
              english: transcript.anh !== undefined ? transcript.anh : prev.transcriptScores.english,
              physics: transcript.ly !== undefined ? transcript.ly : prev.transcriptScores.physics,
              chemistry: transcript.hoa !== undefined ? transcript.hoa : prev.transcriptScores.chemistry,
              history: transcript.su !== undefined ? transcript.su : prev.transcriptScores.history,
              geography: transcript.dia !== undefined ? transcript.dia : prev.transcriptScores.geography,
              informatics: prev.transcriptScores.informatics,
            },
            examScores: {
              math: scores.toan !== undefined ? scores.toan : prev.examScores?.math,
              literature: scores.van !== undefined ? scores.van : prev.examScores?.literature,
              english: scores.anh !== undefined ? scores.anh : prev.examScores?.english,
              physics: scores.ly !== undefined ? scores.ly : prev.examScores?.physics,
              chemistry: scores.hoa !== undefined ? scores.hoa : prev.examScores?.chemistry,
              history: scores.su !== undefined ? scores.su : prev.examScores?.history,
              geography: scores.dia !== undefined ? scores.dia : prev.examScores?.geography,
            },
            hsaScore: scores.hsa !== undefined ? scores.hsa : prev.hsaScore,
            vsatScore: scores.vsat !== undefined ? scores.vsat : prev.vsatScore,
          };
        });
      }
    } catch (e) {
      console.error("Lỗi đồng bộ hồ sơ chung sang HVNH:", e);
    }
  }, []);

  useEffect(() => {
    const results = evaluateCandidateForHVNH(profile);
    setEvaluations(results);
    if (results.length > 0) {
      setSelectedMajorDetail(prev => {
        if (!prev) return results[0];
        const found = results.find(r => r.major.id === prev.major.id);
        return found || results[0];
      });
    }
  }, [profile]);

  const updateTranscript = (field: keyof HVNHCandidateProfile['transcriptScores'], val: string) => {
    const num = parseFloat(val);
    setProfile(prev => ({
      ...prev,
      transcriptScores: {
        ...prev.transcriptScores,
        [field]: isNaN(num) ? undefined : Math.min(10, Math.max(0, num))
      }
    }));
  };

  const updateExam = (field: keyof NonNullable<HVNHCandidateProfile['examScores']>, val: string) => {
    const num = parseFloat(val);
    setProfile(prev => ({
      ...prev,
      examScores: {
        ...(prev.examScores || {}),
        [field]: isNaN(num) ? undefined : Math.min(10, Math.max(0, num))
      }
    }));
  };

  const filteredEvaluations = evaluations.filter(ev => {
    // Lọc theo cơ sở / phân viện
    if (filterCampus !== 'all') {
      if (filterCampus === 'hanoi' && ev.major.campus !== 'Trụ sở Hà Nội') return false;
      if (filterCampus === 'clc' && ev.major.programType !== 'Chất lượng cao') return false;
      if (filterCampus === 'isba' && ev.major.campus !== 'Viện Quốc Tế') return false;
      if (filterCampus === 'bacninh' && ev.major.campus !== 'Phân viện Bắc Ninh') return false;
      if (filterCampus === 'phuyen' && ev.major.campus !== 'Phân viện Phú Yên') return false;
    }

    // Lọc theo cơ hội trúng tuyển
    if (filterChance === 'safe' && !ev.admissionChance.includes('Rất cao')) return false;
    if (filterChance === 'target' && !ev.admissionChance.includes('Khả thi')) return false;
    if (filterChance === 'dream' && !ev.admissionChance.includes('Thử thách')) return false;

    // Lọc theo từ khóa tìm kiếm (tên hoặc mã ngành)
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      const matchName = ev.major.name.toLowerCase().includes(term);
      const matchCode = ev.major.code.toLowerCase().includes(term);
      if (!matchName && !matchCode) return false;
    }

    return true;
  });

  const bestGlobalScore = evaluations.length > 0 ? evaluations[0].bestMethod.score : 0;
  const bestGlobalMethodName = evaluations.length > 0 ? evaluations[0].bestMethod.methodName : '';
  const safeCount = evaluations.filter(e => e.admissionChance.includes('Rất cao')).length;
  const targetCount = evaluations.filter(e => e.admissionChance.includes('Khả thi')).length;
  const dreamCount = evaluations.filter(e => e.admissionChance.includes('Thử thách')).length;

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '32px 20px 80px' }}>
      {/* HEADER SECTION */}
      <div style={{
        background: 'linear-gradient(135deg, #881337 0%, #be123c 60%, #e11d48 100%)',
        borderRadius: '16px',
        padding: '36px 32px',
        color: 'white',
        boxShadow: '0 12px 30px rgba(190, 18, 60, 0.25)',
        marginBottom: '28px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.2)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '14px', backdropFilter: 'blur(4px)' }}>
          <span>🏛️ CHUYÊN TRANG BẢN QUYỀN ĐỀ ÁN</span>
          <span>•</span>
          <span>HVNH PILOT 2026</span>
        </div>

        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 10px', color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
          Hệ Thống Tối Ưu Xét Tuyển Học Viện Ngân Hàng
        </h1>

        <p style={{ fontSize: '1.05rem', color: '#ffe4e6', maxWidth: '820px', margin: '0 0 24px', lineHeight: 1.6 }}>
          Phân tích hồ sơ đa phương thức theo chuẩn Đề án tuyển sinh HVNH (PT2 Học bạ, PT3 Kết hợp IELTS, PT4 ĐGNL HSA, PT5 Điểm thi THPT). Hệ thống tự động so sánh tổ hợp và đề xuất phương thức mang lại điểm xét cao nhất cho từng ngành.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          <a
            href="https://xettuyen.hvnh.edu.vn"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#ffffff',
              color: '#be123c',
              padding: '10px 22px',
              borderRadius: '30px',
              fontSize: '0.9rem',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Cổng Tuyển Sinh HVNH</span>
            <span>↗</span>
          </a>
          <Link
            href="/"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '10px 20px',
              borderRadius: '30px',
              fontSize: '0.9rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>← Quay về UniNav</span>
          </Link>
        </div>
      </div>

      {/* TABS CONTROLLER */}
      <div style={{
        display: 'flex',
        gap: '8px',
        background: '#ffffff',
        padding: '6px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        marginBottom: '28px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        {[
          { key: 'profile', label: '1. 📝 Nhập Hồ Sơ Xét Tuyển (Học bạ, IELTS, Điểm thi)' },
          { key: 'results', label: '2. 🎯 Đánh Giá & Xếp Nguyện Vọng' },
          { key: 'formula', label: '3. 📐 Bảng Quy Đổi & Công Thức Đề Án' },
        ].map(tab => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              style={{
                flex: 1,
                padding: '12px 18px',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: isActive ? '#be123c' : 'transparent',
                color: isActive ? '#ffffff' : '#64748b'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: KẾT QUẢ & PHÂN TÍCH */}
      {activeTab === 'results' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* BANNER TỔNG QUAN TỐI ƯU */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #fecdd3',
            padding: '24px 28px',
            boxShadow: '0 4px 16px rgba(225, 29, 72, 0.06)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{ flex: '1 1 500px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e11d48', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
                <span>⚡ KẾT QUẢ TỐI ƯU HÓA HỒ SƠ</span>
              </div>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
                Phương thức có điểm xét cao nhất: <span style={{ color: '#be123c' }}>{bestGlobalMethodName}</span>
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                Với điểm cao nhất đạt <strong style={{ color: '#059669', fontSize: '1.2rem' }}>{bestGlobalScore.toFixed(2)}</strong> / 30.0đ (đã bao gồm điểm ưu tiên và điểm thưởng), bạn nên tận dụng phương thức này khi đăng ký các nguyện vọng sớm của Học viện Ngân hàng.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '12px 20px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857', textTransform: 'uppercase' }}>Nguyện vọng an toàn</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#059669' }}>{safeCount}</div>
              </div>
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '12px 20px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase' }}>Nguyện vọng mục tiêu</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#2563eb' }}>{targetCount}</div>
              </div>
              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '12px 20px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#b45309', textTransform: 'uppercase' }}>Nguyện vọng ước mơ</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#d97706' }}>{dreamCount}</div>
              </div>
            </div>
          </div>

          {/* THANH TÌM KIẾM & BỘ LỌC TOÀN DIỆN */}
          <div style={{
            background: '#ffffff',
            borderRadius: '14px',
            border: '1px solid #e2e8f0',
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            {/* Hàng 1: Tìm kiếm & Nút sửa hồ sơ */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
              <div style={{ position: 'relative', flex: '1 1 320px', maxWidth: '480px' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '0.9rem' }}>🔍</span>
                <input
                  type="text"
                  placeholder="Tìm nhanh theo tên ngành hoặc mã (VD: Fintech, BANK01, Luật, Bắc Ninh...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 34px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                    color: '#0f172a',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  Hiển thị <strong>{filteredEvaluations.length}</strong> / {evaluations.length} ngành
                </span>
                <button
                  onClick={() => setActiveTab('profile')}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e11d48',
                    color: '#e11d48',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>✏️ Chỉnh sửa điểm số hồ sơ</span>
                </button>
              </div>
            </div>

            {/* Hàng 2: Bộ lọc Cơ sở / Phân viện & Cơ hội trúng tuyển */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
              {/* Lọc cơ sở */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>Cơ sở:</span>
                {[
                  { id: 'all', label: 'Tất cả cơ sở' },
                  { id: 'hanoi', label: 'Hà Nội (Chuẩn)' },
                  { id: 'clc', label: 'Chất lượng cao' },
                  { id: 'isba', label: 'Viện Quốc tế' },
                  { id: 'bacninh', label: 'Phân viện Bắc Ninh' },
                  { id: 'phuyen', label: 'Phân viện Phú Yên' },
                ].map(c => (
                  <button
                    key={c.id}
                    onClick={() => setFilterCampus(c.id)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: '1px solid',
                      background: filterCampus === c.id ? '#0f172a' : '#f8fafc',
                      color: filterCampus === c.id ? '#ffffff' : '#475569',
                      borderColor: filterCampus === c.id ? '#0f172a' : '#e2e8f0',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Lọc cơ hội */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>Cơ hội:</span>
                {[
                  { id: 'all', label: 'Tất cả' },
                  { id: 'safe', label: `An toàn (${safeCount})` },
                  { id: 'target', label: `Mục tiêu (${targetCount})` },
                  { id: 'dream', label: `Ước mơ (${dreamCount})` },
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setFilterChance(f.id)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: '1px solid',
                      background: filterChance === f.id ? '#be123c' : '#ffffff',
                      color: filterChance === f.id ? '#ffffff' : '#475569',
                      borderColor: filterChance === f.id ? '#be123c' : '#cbd5e1',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* DANH SÁCH CÁC NGÀNH VÀ CHI TIẾT ĐIỂM (LAYOUT 2 CỘT) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', alignItems: 'start' }}>
            {/* CỘT TRÁI: DANH SÁCH NGÀNH */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {filteredEvaluations.length === 0 ? (
                <div style={{ background: '#ffffff', padding: '36px', borderRadius: '12px', textAlign: 'center', color: '#64748b', border: '1px dashed #cbd5e1' }}>
                  Không tìm thấy ngành nào phù hợp với bộ lọc. Thử đổi từ khóa tìm kiếm hoặc chọn "Tất cả cơ sở".
                </div>
              ) : (
                filteredEvaluations.map(item => {
                  const isSelected = selectedMajorDetail?.major.id === item.major.id;
                  let chanceBg = '#ecfdf5';
                  let chanceColor = '#047857';
                  let chanceBorder = '#a7f3d0';

                  if (item.admissionChance.includes('Khả thi')) {
                    chanceBg = '#eff6ff';
                    chanceColor = '#1d4ed8';
                    chanceBorder = '#bfdbfe';
                  } else if (item.admissionChance.includes('Thử thách')) {
                    chanceBg = '#fffbeb';
                    chanceColor = '#b45309';
                    chanceBorder = '#fde68a';
                  } else if (item.admissionChance.includes('Rủi ro')) {
                    chanceBg = '#fef2f2';
                    chanceColor = '#b91c1c';
                    chanceBorder = '#fecaca';
                  }

                  return (
                    <div
                      key={item.major.id}
                      onClick={() => setSelectedMajorDetail(item)}
                      style={{
                        background: '#ffffff',
                        border: isSelected ? '2px solid #be123c' : '1px solid #e2e8f0',
                        borderRadius: '14px',
                        padding: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: isSelected ? '0 8px 24px rgba(190, 18, 60, 0.12)' : '0 2px 4px rgba(0,0,0,0.03)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', background: '#f1f5f9', padding: '2px 8px', borderRadius: '6px', letterSpacing: '0.02em' }}>
                              {item.major.code}
                            </span>
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#475569', background: '#e2e8f0', padding: '2px 7px', borderRadius: '6px' }}>
                              {item.major.campus}
                            </span>
                            {item.major.programType !== 'Chuẩn' && (
                              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#7c3aed', background: '#ede9fe', padding: '2px 7px', borderRadius: '6px' }}>
                                {item.major.programType}
                              </span>
                            )}
                            <span style={{
                              fontSize: '0.75rem',
                              fontWeight: 800,
                              padding: '2px 10px',
                              borderRadius: '20px',
                              background: chanceBg,
                              color: chanceColor,
                              border: `1px solid ${chanceBorder}`
                            }}>
                              {item.admissionChance}
                            </span>
                          </div>
                          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: isSelected ? '#be123c' : '#0f172a', margin: 0, lineHeight: 1.3 }}>
                            {item.major.name}
                          </h3>
                        </div>

                        <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '12px' }}>
                          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Điểm tối ưu</div>
                          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#be123c', lineHeight: 1.1 }}>
                            {item.bestMethod.score.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        paddingTop: '12px',
                        borderTop: '1px solid #f1f5f9',
                        fontSize: '0.85rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                            Phương thức
                          </span>
                          <span style={{ fontWeight: 700, color: '#1e293b' }}>
                            {item.bestMethod.methodName}
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            whiteSpace: 'nowrap',
                            background: item.scoreDiff >= 0 ? '#ecfdf5' : '#fff1f2',
                            color: item.scoreDiff >= 0 ? '#047857' : '#be123c',
                            border: `1px solid ${item.scoreDiff >= 0 ? '#a7f3d0' : '#fecdd3'}`
                          }}>
                            {item.scoreDiff >= 0 ? `▲ Vượt +${item.scoreDiff.toFixed(2)}đ` : `▼ Thấp hơn ${Math.abs(item.scoreDiff).toFixed(2)}đ`}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: '#64748b', whiteSpace: 'nowrap' }}>
                            (Điểm chuẩn PT này: <strong style={{ color: '#334155' }}>{item.benchmarkTarget.toFixed(2)}đ</strong>)
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* CỘT PHẢI: BẢNG SO SÁNH PHƯƠNG THỨC & LỜI KHUYÊN */}
            {selectedMajorDetail && (
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '26px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                position: 'sticky',
                top: '90px'
              }}>
                <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.8rem', color: '#be123c', fontWeight: 800, textTransform: 'uppercase' }}>
                      Chi Tiết Ngành Tuyển Sinh
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', background: '#f1f5f9', padding: '2px 8px', borderRadius: '6px' }}>
                      📍 {selectedMajorDetail.major.campus}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7c3aed', background: '#ede9fe', padding: '2px 8px', borderRadius: '6px' }}>
                      🎓 Hệ: {selectedMajorDetail.major.programType}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
                    {selectedMajorDetail.major.name}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <span>Chỉ tiêu: <strong style={{ color: '#0f172a' }}>{selectedMajorDetail.major.quota}</strong></span>
                    <span>Tổ hợp: <strong style={{ color: '#0f172a' }}>{selectedMajorDetail.major.subjectBlocks.join(', ')}</strong></span>
                    <span>ĐC Thi THPT (PT4): <strong style={{ color: '#0f172a' }}>{selectedMajorDetail.major.benchmark2025.toFixed(2)}đ</strong></span>
                    <span>ĐC Xét tuyển sớm (PT2, PT3): <strong style={{ color: '#be123c' }}>{(selectedMajorDetail.major.benchmarkEarly2025 || selectedMajorDetail.major.benchmark2025 + 1.5).toFixed(2)}đ</strong></span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#475569', marginTop: '10px', lineHeight: 1.5, fontStyle: 'italic' }}>
                    {selectedMajorDetail.major.description}
                  </p>
                </div>

                {/* SO SÁNH TẤT CẢ PHƯƠNG THỨC CHO NGÀNH NÀY */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
                    So sánh điểm số theo từng Phương thức:
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {selectedMajorDetail.allMethods.map(m => {
                      const isBest = m.methodCode === selectedMajorDetail.bestMethod.methodCode;
                      return (
                        <div
                          key={m.methodCode}
                          style={{
                            background: isBest ? '#fff1f2' : '#f8fafc',
                            border: isBest ? '1.5px solid #f43f5e' : '1px solid #e2e8f0',
                            borderRadius: '12px',
                            padding: '14px 16px',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {/* Dòng badge nếu là tối ưu nhất */}
                          {isBest && (
                            <div style={{ marginBottom: '6px' }}>
                              <span style={{
                                fontSize: '0.7rem',
                                fontWeight: 800,
                                background: '#e11d48',
                                color: '#ffffff',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}>
                                ★ PHƯƠNG THỨC TỐI ƯU NHẤT
                              </span>
                            </div>
                          )}

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '6px' }}>
                            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: isBest ? '#9f1239' : '#1e293b', lineHeight: 1.4 }}>
                              {m.methodName}
                            </div>
                            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: isBest ? '#be123c' : '#0f172a', whiteSpace: 'nowrap', flexShrink: 0 }}>
                              {m.score.toFixed(2)}đ
                            </div>
                          </div>

                          <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '10px', lineHeight: 1.4 }}>
                            {m.notes}
                          </div>

                          <div style={{
                            display: 'flex',
                            gap: '12px',
                            fontSize: '0.75rem',
                            color: '#475569',
                            background: isBest ? 'rgba(255,255,255,0.85)' : '#ffffff',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            border: '1px solid #f1f5f9',
                            flexWrap: 'wrap'
                          }}>
                            <span>Điểm gốc: <strong>{m.detailBreakdown.rawBaseScore.toFixed(2)}đ</strong></span>
                            <span>•</span>
                            <span>Thưởng: <strong>+{m.detailBreakdown.bonusPoints.toFixed(2)}đ</strong></span>
                            <span>•</span>
                            <span>Ưu tiên: <strong>+{m.detailBreakdown.priorityPoints.toFixed(2)}đ</strong></span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CHIẾN LƯỢC ĐĂNG KÝ NGUYỆN VỌNG */}
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 800, color: '#be123c', marginBottom: '6px' }}>
                    <span>💡 CHIẾN THUẬT XẾP NGUYỆN VỌNG</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.6, margin: 0 }}>
                    {selectedMajorDetail.scoreDiff >= 1.5 ? (
                      `Điểm xét tối ưu của bạn (${selectedMajorDetail.bestMethod.score.toFixed(2)}đ) vượt điểm chuẩn năm ngoái ${selectedMajorDetail.scoreDiff.toFixed(2)}đ. Bạn hoàn toàn có thể tự tin xếp ngành này ở Nguyện vọng 1 (NV1) hoặc NV2 để chắc chắn trúng tuyển.`
                    ) : selectedMajorDetail.scoreDiff >= 0 ? (
                      `Điểm xét tối ưu của bạn (${selectedMajorDetail.bestMethod.score.toFixed(2)}đ) bằng hoặc cao hơn điểm chuẩn ${selectedMajorDetail.scoreDiff.toFixed(2)}đ. Khuyên bạn nên đặt ở NV2 và bổ sung thêm 1 ngành an toàn hơn ở NV3.`
                    ) : (
                      `Điểm xét của bạn hiện thấp hơn điểm chuẩn năm ngoái ${Math.abs(selectedMajorDetail.scoreDiff).toFixed(2)}đ. Bạn vẫn có thể đăng ký ngành này làm Nguyện vọng ước mơ (NV1), nhưng hãy đặt NV2 và NV3 vào các ngành có tỷ lệ đỗ an toàn hơn.`
                    )}
                  </p>
                </div>

                <a
                  href="https://xettuyen.hvnh.edu.vn/tuyen-sinh/dang-ky-thi-sinh"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #be123c 0%, #e11d48 100%)',
                    color: '#ffffff',
                    padding: '14px 20px',
                    borderRadius: '10px',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: '0 6px 16px rgba(190, 18, 60, 0.25)'
                  }}
                >
                  Nộp Hồ Sơ Đến Cổng Tuyển Sinh HVNH ↗
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: FORM NHẬP HỒ SƠ CHUẨN XETTUYEN.HVNH.EDU.VN */}
      {activeTab === 'profile' && (
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '32px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
          maxWidth: '860px',
          margin: '0 auto'
        }}>
          <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
              📋 Form Khai Báo Hồ Sơ Xét Tuyển HVNH
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>
              Các trường dữ liệu được thiết kế tương đương với Cổng đăng ký tuyển sinh chính thức của Học viện Ngân hàng.
            </p>
          </div>

          {/* PHẦN 1: THÔNG TIN ƯU TIÊN & TRƯỜNG THPT */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#be123c', textTransform: 'uppercase', marginBottom: '14px' }}>
              1. Khu vực & Đối tượng Ưu tiên
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Khu vực ưu tiên</label>
                <select
                  value={profile.area}
                  onChange={(e) => setProfile({ ...profile, area: e.target.value as any })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', color: '#0f172a' }}
                >
                  <option value="KV1">Khu vực 1 (+0.75đ)</option>
                  <option value="KV2-NT">Khu vực 2 - Nông thôn (+0.50đ)</option>
                  <option value="KV2">Khu vực 2 (+0.25đ)</option>
                  <option value="KV3">Khu vực 3 (Không cộng điểm)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Đối tượng ưu tiên chính sách</label>
                <select
                  value={profile.group}
                  onChange={(e) => setProfile({ ...profile, group: e.target.value as any })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', color: '#0f172a' }}
                >
                  <option value="none">Không thuộc diện ưu tiên chính sách</option>
                  <option value="UT1">Đối tượng 01 - 04 (+2.0đ)</option>
                  <option value="UT2">Đối tượng 05 - 07 (+1.0đ)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Loại trường THPT</label>
                <select
                  value={profile.schoolType}
                  onChange={(e) => setProfile({ ...profile, schoolType: e.target.value as any })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', color: '#0f172a' }}
                >
                  <option value="standard">Trường THPT Thường</option>
                  <option value="specialized">Trường THPT Chuyên (+0.5đ xét thưởng)</option>
                </select>
              </div>
            </div>
          </div>

          {/* PHẦN 2: GIẢI HỌC SINH GIỎI */}
          <div style={{ marginBottom: '28px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#be123c', textTransform: 'uppercase', marginBottom: '14px' }}>
              2. Điểm thưởng Giải thưởng (HSG Quốc gia & Tỉnh)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Giải HSG Quốc Gia môn văn hóa</label>
                <select
                  value={profile.nationalAward}
                  onChange={(e) => setProfile({ ...profile, nationalAward: e.target.value as any })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', color: '#0f172a' }}
                >
                  <option value="none">Không có giải Quốc gia</option>
                  <option value="first">Giải Nhất Quốc gia (+3.0đ)</option>
                  <option value="second">Giải Nhì Quốc gia (+2.5đ)</option>
                  <option value="third">Giải Ba Quốc gia (+2.0đ)</option>
                  <option value="consolation">Giải Khuyến khích Quốc gia (+1.5đ)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Giải HSG Cấp Tỉnh / Thành phố</label>
                <select
                  value={profile.provincialAward}
                  onChange={(e) => setProfile({ ...profile, provincialAward: e.target.value as any })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', color: '#0f172a' }}
                >
                  <option value="none">Không có giải Tỉnh</option>
                  <option value="first">Giải Nhất Cấp Tỉnh (+1.5đ)</option>
                  <option value="second">Giải Nhì Cấp Tỉnh (+1.0đ)</option>
                  <option value="third">Giải Ba Cấp Tỉnh (+0.5đ)</option>
                  <option value="consolation">Giải Khuyến khích Cấp Tỉnh (+0.25đ)</option>
                </select>
              </div>
            </div>
          </div>

          {/* PHẦN 3: CHỨNG CHỈ QUỐC TẾ & BÀI THI ĐÁNH GIÁ NĂNG LỰC */}
          <div style={{ marginBottom: '28px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#be123c', textTransform: 'uppercase', marginBottom: '14px' }}>
              3. Chứng chỉ Quốc tế & Điểm ĐGNL (HSA / V-SAT)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Loại chứng chỉ quốc tế</label>
                <select
                  value={profile.englishCertType}
                  onChange={(e) => setProfile({ ...profile, englishCertType: e.target.value as any, certScore: undefined })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', color: '#0f172a' }}
                >
                  <option value="none">Không có chứng chỉ</option>
                  <option value="ielts">IELTS Academic (từ 5.5 trở lên)</option>
                  <option value="toefl_ibt">TOEFL iBT (từ 46 trở lên)</option>
                  <option value="sat">SAT (từ 1200 trở lên)</option>
                  <option value="act">ACT (từ 26 trở lên)</option>
                  <option value="jlpt">Tiếng Nhật JLPT (N5 - N1)</option>
                </select>
              </div>

              {profile.englishCertType === 'ielts' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Band điểm IELTS (Quy đổi: {convertIeltsToScore(profile.certScore || 0)}đ)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="9"
                    value={profile.certScore || ''}
                    onChange={(e) => setProfile({ ...profile, certScore: parseFloat(e.target.value) || 0 })}
                    placeholder="VD: 6.5"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', color: '#0f172a' }}
                  />
                </div>
              )}

              {profile.englishCertType === 'toefl_ibt' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Điểm TOEFL iBT (thang 120)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="120"
                    value={profile.certScore || ''}
                    onChange={(e) => setProfile({ ...profile, certScore: parseFloat(e.target.value) || 0 })}
                    placeholder="VD: 85"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', color: '#0f172a' }}
                  />
                </div>
              )}

              {profile.englishCertType === 'sat' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Điểm SAT (thang 1600)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="1600"
                    value={profile.certScore || ''}
                    onChange={(e) => setProfile({ ...profile, certScore: parseFloat(e.target.value) || 0 })}
                    placeholder="VD: 1350"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', color: '#0f172a' }}
                  />
                </div>
              )}

              {profile.englishCertType === 'act' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Điểm ACT (thang 36)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="36"
                    value={profile.certScore || ''}
                    onChange={(e) => setProfile({ ...profile, certScore: parseFloat(e.target.value) || 0 })}
                    placeholder="VD: 29"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', color: '#0f172a' }}
                  />
                </div>
              )}

              {profile.englishCertType === 'jlpt' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Cấp độ Tiếng Nhật JLPT
                  </label>
                  <select
                    value={profile.certScore || 5}
                    onChange={(e) => setProfile({ ...profile, certScore: parseInt(e.target.value, 10) })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', color: '#0f172a' }}
                  >
                    <option value={5}>JLPT N5 (8.0đ)</option>
                    <option value={4}>JLPT N4 (8.5đ)</option>
                    <option value={3}>JLPT N3 (9.0đ)</option>
                    <option value={2}>JLPT N2 (9.5đ)</option>
                    <option value={1}>JLPT N1 (10.0đ)</option>
                  </select>
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Điểm thi ĐGNL HSA (ĐHQGHN - thang 150)
                </label>
                <input
                  type="number"
                  min="0"
                  max="150"
                  value={profile.hsaScore || ''}
                  onChange={(e) => setProfile({ ...profile, hsaScore: parseFloat(e.target.value) || undefined })}
                  placeholder="VD: 95"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', color: '#0f172a' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Điểm thi ĐGNL V-SAT (thang 450)
                </label>
                <input
                  type="number"
                  min="0"
                  max="450"
                  value={profile.vsatScore || ''}
                  onChange={(e) => setProfile({ ...profile, vsatScore: parseFloat(e.target.value) || undefined })}
                  placeholder="VD: 320"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', color: '#0f172a' }}
                />
              </div>
            </div>
          </div>

          {/* PHẦN 4: ĐIỂM HỌC BẠ 3 NĂM THPT */}
          <div style={{ marginBottom: '28px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#be123c', textTransform: 'uppercase', marginBottom: '14px' }}>
              4. Điểm Trung Bình Học Bạ THPT (Thang 10 - Dùng cho PT2 & PT3)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '12px' }}>
              {[
                { key: 'math', label: 'Toán' },
                { key: 'literature', label: 'Ngữ văn' },
                { key: 'english', label: 'Tiếng Anh' },
                { key: 'physics', label: 'Vật lý' },
                { key: 'chemistry', label: 'Hóa học' },
                { key: 'informatics', label: 'Tin học' },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>{label}</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={profile.transcriptScores[key as keyof HVNHCandidateProfile['transcriptScores']] || ''}
                    onChange={(e) => updateTranscript(key as any, e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', textAlign: 'center' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* PHẦN 5: ĐIỂM THI TỐT NGHIỆP THPT */}
          <div style={{ marginBottom: '32px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#be123c', textTransform: 'uppercase', marginBottom: '14px' }}>
              5. Điểm Thi Tốt Nghiệp THPT (Thang 10 - Dùng cho PT5)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '12px' }}>
              {[
                { key: 'math', label: 'Toán thi' },
                { key: 'literature', label: 'Văn thi' },
                { key: 'english', label: 'Anh thi' },
                { key: 'physics', label: 'Lý thi' },
                { key: 'chemistry', label: 'Hóa thi' },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>{label}</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={profile.examScores?.[key as keyof NonNullable<HVNHCandidateProfile['examScores']>] || ''}
                    onChange={(e) => updateExam(key as any, e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', textAlign: 'center' }}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              // 2. Lưu ngược lại vào Hồ Sơ Chung (localStorage userProfile)
              try {
                const savedUser = localStorage.getItem('userProfile');
                const prevUser = savedUser ? JSON.parse(savedUser) : { traits: [], maxFee: 30000000, location: 'Hà Nội' };
                
                // Map giải thưởng sang format chung
                let natPrize = '';
                if (profile.nationalAward === 'first') natPrize = 'Nhất';
                else if (profile.nationalAward === 'second') natPrize = 'Nhì';
                else if (profile.nationalAward === 'third') natPrize = 'Ba';
                else if (profile.nationalAward === 'consolation') natPrize = 'Khuyến khích';

                let provPrize = '';
                if (profile.provincialAward === 'first') provPrize = 'Nhất';
                else if (profile.provincialAward === 'second') provPrize = 'Nhì';
                else if (profile.provincialAward === 'third') provPrize = 'Ba';
                else if (profile.provincialAward === 'consolation') provPrize = 'Khuyến khích';

                const updatedProfile = {
                  ...prevUser,
                  fullName: profile.fullName,
                  phone: profile.phone,
                  area: profile.area,
                  priorityGroup: profile.group,
                  schoolType: profile.schoolType,
                  englishCertType: profile.englishCertType,
                  certScore: profile.certScore,
                  scores: {
                    ...(prevUser.scores || {}),
                    toan: profile.examScores?.math,
                    van: profile.examScores?.literature,
                    anh: profile.examScores?.english,
                    ly: profile.examScores?.physics,
                    hoa: profile.examScores?.chemistry,
                    su: profile.examScores?.history,
                    dia: profile.examScores?.geography,
                    ielts: profile.englishCertType === 'ielts' ? profile.certScore : prevUser.scores?.ielts,
                    toefl: profile.englishCertType === 'toefl_ibt' ? profile.certScore : prevUser.scores?.toefl,
                    sat: profile.englishCertType === 'sat' ? profile.certScore : prevUser.scores?.sat,
                    act: profile.englishCertType === 'act' ? profile.certScore : prevUser.scores?.act,
                    hsa: profile.hsaScore,
                    vsat: profile.vsatScore,
                  },
                  transcriptScores: {
                    ...(prevUser.transcriptScores || {}),
                    toan: profile.transcriptScores.math,
                    van: profile.transcriptScores.literature,
                    anh: profile.transcriptScores.english,
                    ly: profile.transcriptScores.physics,
                    hoa: profile.transcriptScores.chemistry,
                    su: profile.transcriptScores.history,
                    dia: profile.transcriptScores.geography,
                  },
                  awards: {
                    ...(prevUser.awards || {}),
                    nationalPrize: natPrize || undefined,
                    provincialPrize: provPrize || undefined
                  }
                };

                localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
                window.dispatchEvent(new Event('storage'));
              } catch (e) {
                console.error("Lỗi đồng bộ hồ sơ ngược lại:", e);
              }

              setActiveTab('results');
            }}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #be123c 0%, #e11d48 100%)',
              color: 'white',
              border: 'none',
              padding: '16px',
              borderRadius: '10px',
              fontSize: '1.05rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(190, 18, 60, 0.25)'
            }}
          >
            Lưu Hồ Sơ & Đồng Bộ Hệ Thống (Xem Báo Cáo Tối Ưu) →
          </button>
        </div>
      )}

      {/* TAB 3: QUY CHẾ VÀ CÔNG THỨC */}
      {activeTab === 'formula' && (
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '32px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
          maxWidth: '860px',
          margin: '0 auto',
          lineHeight: 1.6,
          color: '#334155'
        }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
            Quy Chế & Công Thức Tính Điểm Xét Tuyển HVNH
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '24px' }}>
            Trích xuất từ Đề án tuyển sinh chính thức của Học viện Ngân hàng.
          </p>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#be123c', marginBottom: '8px' }}>
              1. Phương thức 1: Xét tuyển thẳng & Ưu tiên xét tuyển
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#475569' }}>
              Áp dụng cho thí sinh đạt giải Nhất, Nhì, Ba trong kỳ thi chọn Học sinh giỏi Quốc gia các môn văn hóa hoặc Cuộc thi KHKT Quốc gia theo đúng quy chế của Bộ GD&ĐT.
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#be123c', marginBottom: '8px' }}>
              2. Phương thức 2: Xét tuyển kết hợp (Học bạ + Chứng chỉ QT / HSA / V-SAT)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a' }}>• PT2.1: Kết hợp Học bạ + Chứng chỉ Quốc tế (IELTS, TOEFL, SAT, ACT, JLPT)</strong>
                <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#be123c', marginTop: '4px' }}>
                  Điểm xét = (Điểm tổ hợp Học bạ / 2) + (Điểm CCQT quy đổi × 1.5) + Điểm thưởng + Điểm ưu tiên
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a' }}>• PT2.2: Kết hợp Học bạ + Đánh giá năng lực HSA (ĐHQGHN)</strong>
                <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#be123c', marginTop: '4px' }}>
                  Điểm xét = (Điểm tổ hợp Học bạ × 50%) + [(Điểm HSA × 30 / 150) × 50%] + Điểm thưởng + Điểm ưu tiên
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a' }}>• PT2.3: Kết hợp Học bạ + Kỳ thi ĐGNL V-SAT</strong>
                <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#be123c', marginTop: '4px' }}>
                  Điểm xét = (Điểm tổ hợp Học bạ × 50%) + [(Điểm V-SAT × 30 / 450) × 50%] + Điểm thưởng + Điểm ưu tiên
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#be123c', marginBottom: '8px' }}>
              3. Phương thức 3: Xét tuyển dựa trên kết quả học tập THPT (Học bạ độc lập)
            </h3>
            <div style={{ background: '#f1f5f9', padding: '12px 16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.85rem', color: '#0f172a', marginBottom: '6px' }}>
              Điểm xét = Điểm trung bình 3 môn tổ hợp 3 năm THPT + Điểm xét thưởng + Điểm ưu tiên
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Học sinh các trường THPT Chuyên được cộng thêm 0.5 điểm xét thưởng.
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#be123c', marginBottom: '8px' }}>
              4. Phương thức 4: Xét tuyển dựa trên kết quả kỳ thi tốt nghiệp THPT
            </h3>
            <div style={{ background: '#f1f5f9', padding: '12px 16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.85rem', color: '#0f172a', marginBottom: '6px' }}>
              Điểm xét = Tổng 3 môn thi THPT + Điểm ưu tiên + Điểm khuyến khích (nếu có)
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Thí sinh có chứng chỉ IELTS $\ge 5.5$ có thể sử dụng điểm quy đổi (8.5 - 10.0đ) để thay thế môn Tiếng Anh trong tổ hợp thi nếu có lợi hơn.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#be123c', marginBottom: '8px' }}>
              5. Bảng quy đổi Chứng chỉ Ngoại ngữ & Quốc tế (Thang 10)
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                  <th style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>IELTS</th>
                  <th style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>TOEFL iBT</th>
                  <th style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>SAT</th>
                  <th style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>ACT</th>
                  <th style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>JLPT</th>
                  <th style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>Quy đổi</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>5.5</td><td style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>46 - 59</td><td style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>1200 - 1240</td><td style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>26</td><td style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>N4</td><td style={{ padding: '8px 12px', border: '1px solid #e2e8f0', fontWeight: 800, color: '#be123c' }}>8.5đ</td></tr>
                <tr><td style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>6.0</td><td style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>60 - 78</td><td style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>1250 - 1290</td><td style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>27 - 28</td><td style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>N3</td><td style={{ padding: '8px 12px', border: '1px solid #e2e8f0', fontWeight: 800, color: '#be123c' }}>9.0đ</td></tr>
                <tr><td style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>6.5</td><td style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>79 - 93</td><td style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>1300 - 1390</td><td style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>29 - 31</td><td style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>N2</td><td style={{ padding: '8px 12px', border: '1px solid #e2e8f0', fontWeight: 800, color: '#be123c' }}>9.5đ</td></tr>
                <tr><td style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>≥ 7.0</td><td style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>≥ 94</td><td style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>≥ 1400</td><td style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>≥ 32</td><td style={{ padding: '8px 12px', border: '1px solid #e2e8f0' }}>N1</td><td style={{ padding: '8px 12px', border: '1px solid #e2e8f0', fontWeight: 800, color: '#be123c' }}>10.0đ</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
