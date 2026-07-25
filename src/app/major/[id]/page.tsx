"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { mockUniversities, UniversityProgram, Review } from '../../../data/mockUniversities';
import { massiveUniversities } from '../../../data/massiveUniversities';
import FacebookCommentSection from '../../../components/FacebookCommentSection';

export default function MajorDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [program, setProgram] = useState<UniversityProgram | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;
    const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
    const decodedId = decodeURIComponent(rawId);
    const cleanId = (str?: string) => str ? str.toString().normalize('NFC').trim() : '';
    const target = cleanId(decodedId);
    let found = mockUniversities.find(u => cleanId(u.id) === target || u.id === decodedId) || massiveUniversities.find(u => cleanId(u.id) === target || u.id === decodedId);
    
    if (found) {

      setProgram(found);
    }
    setIsLoading(false);
  }, [params?.id]);

  if (isLoading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Đang tải thông tin ngành học...</div>;
  }

  if (!program) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '16px', color: 'var(--text-dark)' }}>Không tìm thấy thông tin ngành học</h2>
        <button onClick={() => router.back()} className="btn-primary">Quay lại</button>
      </div>
    );
  }

  const feePerCredit = program.feePerCredit || 0;
  const creditsPerSemester = program.creditsPerSemester || 0;

  const handlePostReview = () => {
    if (!newReview.trim()) return;
    const review: Review = {
      id: Date.now().toString(),
      author: newAuthor.trim() || 'Người dùng ẩn danh',
      date: new Date().toLocaleDateString('vi-VN'),
      content: newReview,
      rating: 5,
      aspects: { teaching: 5, facilities: 5, environment: 5 }
    };
    setReviewsList([review, ...reviewsList]);
    setNewReview('');
    setNewAuthor('');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px' }}>
      <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'var(--primary-blue)', cursor: 'pointer', fontWeight: 600, marginBottom: '24px' }}>
        &larr; Quay lại
      </button>

      {/* Block 1: Header & Tổng quan */}
      <div style={{ background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 24px rgba(0,0,0,0.05)', marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '24px' }}>
          {program.logoUrl && (
            <div style={{ width: '90px', height: '90px', flexShrink: 0, borderRadius: '12px', border: '1px solid var(--border-light)', overflow: 'hidden', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={program.logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          )}
          <div>
            <h1 style={{ color: 'var(--primary-blue)', fontSize: '2rem', marginBottom: '8px', lineHeight: '1.4', paddingBottom: '4px' }}>{program.name}</h1>
            <h2 style={{ color: 'var(--text-dark)', fontSize: '1.4rem', fontWeight: 500, marginBottom: '8px' }}>Ngành: {program.major}</h2>
            {program.address && <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '8px', whiteSpace: 'pre-line' }}>{program.address}</div>}
            {program.campusHistory && <div style={{ color: 'var(--primary-purple)', fontSize: '0.9rem', fontWeight: 500, whiteSpace: 'pre-line' }}>{program.campusHistory}</div>}
          </div>
        </div>
        
        {program.description && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-dark)', marginBottom: '8px', fontWeight: 600 }}>Mô tả ngành học</h3>
            <p style={{ color: 'var(--text-dark)', lineHeight: '1.6', fontSize: '1.05rem' }}>
              {program.description}
            </p>
          </div>
        )}
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', background: 'var(--bg-page)', padding: '24px', borderRadius: '8px' }}>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '4px' }}>Hệ đào tạo</div>
            <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--primary-purple)' }}>{program.degreeType}</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '4px' }}>Thời gian học</div>
            <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--primary-purple)' }}>{program.duration} năm</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '4px' }}>Tổng số tín chỉ</div>
            <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--primary-purple)' }}>{program.credits} tín chỉ</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '4px' }}>Học phí / Tín chỉ</div>
            <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--primary-purple)' }}>{feePerCredit.toLocaleString()} đ/tín</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '4px' }}>Lộ trình mẫu</div>
            <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--primary-purple)' }}>~ {creditsPerSemester} tín/kỳ</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '4px' }}>Ước tính học phí 1 năm</div>
            <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--primary-purple)' }}>{(program.feePerYear / 1000000).toFixed(1)} Tr/năm</div>
          </div>
        </div>

        <div style={{ marginTop: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--text-dark)' }}>Các chuyên ngành hẹp:</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {program.subMajors?.map((sm, i) => (
              <span key={i} style={{ background: 'var(--light-blue)', color: 'var(--primary-blue)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 500 }}>
                {sm}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Block 2: Thông tin tuyển sinh */}
      <div style={{ background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 24px rgba(0,0,0,0.05)', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1.4rem', color: 'var(--text-dark)', marginBottom: '24px', borderBottom: '2px solid var(--border-light)', paddingBottom: '12px' }}>Hồ Sơ Tuyển Sinh & Điểm Chuẩn</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* 1. Điểm chuẩn & Chỉ tiêu */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h4 style={{ color: 'var(--text-dark)', fontSize: '1.1rem', marginBottom: '12px', fontWeight: 600 }}>📈 Điểm chuẩn lịch sử</h4>
              {program.historicalScores ? (
                <div style={{ background: 'var(--bg-page)', padding: '16px', borderRadius: '8px', height: '100%' }}>
                  {Object.entries(program.historicalScores).reverse().map(([year, score]) => (
                    <div key={year} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px dashed var(--border-light)' }}>
                      <span style={{ fontWeight: 600 }}>Năm {year}</span>
                      <span style={{ color: 'var(--primary-purple)', fontWeight: 700 }}>
                        {score} điểm {program.scoreCalculation?.scale === 40 ? '(Thang 40)' : ''}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ background: 'var(--bg-page)', padding: '16px', borderRadius: '8px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p style={{ color: 'var(--text-muted)' }}>Chưa có dữ liệu lịch sử.</p>
                </div>
              )}
            </div>

            <div style={{ flex: 1, minWidth: '300px' }}>
              <h4 style={{ color: 'var(--text-dark)', fontSize: '1.1rem', marginBottom: '12px', fontWeight: 600 }}>🎯 Chỉ tiêu xét tuyển</h4>
              <div style={{ background: 'var(--bg-page)', padding: '16px', borderRadius: '8px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '150px' }}>
                {program.quota ? (
                  <>
                    <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--primary-blue)', lineHeight: 1 }}>{program.quota}</div>
                    <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginTop: '8px', fontWeight: 500 }}>Chỉ tiêu / Năm</div>
                  </>
                ) : (
                  <p style={{ color: 'var(--text-muted)' }}>Đang cập nhật chỉ tiêu.</p>
                )}
              </div>
            </div>
          </div>

          {/* 2. Tổ hợp & Phương thức xét tuyển */}
          <div>
            <h4 style={{ color: 'var(--text-dark)', fontSize: '1.1rem', marginBottom: '12px', fontWeight: 600 }}>📚 Tổ hợp & Phương thức xét tuyển</h4>
            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-dark)' }}>
              {program.subjectBlocks && program.subjectBlocks.length > 0 && (
                <li style={{ marginBottom: '8px' }}>
                  ✓ Tổ hợp môn: <strong style={{color: 'var(--primary-blue)'}}>{program.subjectBlocks.join(', ')}</strong>
                </li>
              )}
              {program.specialExams && program.specialExams.length > 0 && (
                <li style={{ marginBottom: '8px' }}>
                  ✓ Kỳ thi riêng: <strong style={{color: 'var(--primary-blue)'}}>{program.specialExams.join(', ')}</strong>
                </li>
              )}
              {program.talentAdmission && (
                <li style={{ marginBottom: '8px' }}>
                  ✓ Xét tuyển tài năng: <strong style={{color: 'var(--primary-blue)'}}>{program.talentAdmission}</strong>
                </li>
              )}
            </ul>
          </div>

          {/* Cơ chế tính điểm đặc thù */}
          {program.scoreCalculation && (
            <div>
              <h4 style={{ color: 'var(--text-dark)', fontSize: '1.1rem', marginBottom: '12px', fontWeight: 600 }}>⚖️ Cơ chế tính điểm đặc thù</h4>
              <div style={{ background: '#fffbeb', borderLeft: '4px solid #f59e0b', padding: '12px 16px', borderRadius: '0 8px 8px 0' }}>
                <p style={{ color: '#b45309', margin: 0, fontWeight: 500 }}>
                  {program.scoreCalculation.formulaDescription}
                </p>
              </div>
            </div>
          )}

          {/* 3. Công thức tính điểm */}
          {program.conversionFormulas && Object.keys(program.conversionFormulas).length > 0 && (
            <div>
              <h4 style={{ color: 'var(--text-dark)', fontSize: '1.1rem', marginBottom: '12px', fontWeight: 600 }}>🧮 Công thức tính điểm</h4>
              <div style={{ background: '#f8fafc', borderLeft: '4px solid #94a3b8', padding: '12px 16px', borderRadius: '0 8px 8px 0' }}>
                {Object.entries(program.conversionFormulas).map(([method, formula]) => (
                  <div key={method} style={{ marginBottom: '8px' }}>
                    <strong>{method}:</strong> <span style={{ color: 'var(--primary-purple)' }}>{formula}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Tuyển tài năng chi tiết */}
          {program.talentDetails && program.talentDetails.length > 0 && (
            <div>
              <h4 style={{ color: 'var(--text-dark)', fontSize: '1.1rem', marginBottom: '12px', fontWeight: 600 }}>🏆 Chi tiết Tuyển Tài Năng</h4>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-dark)', lineHeight: '1.6' }}>
                {program.talentDetails.map((detail, idx) => (
                  <li key={idx} style={{ marginBottom: '6px' }}>{detail}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 5. Điểm cộng / Ưu tiên */}
          {program.priorityDetails && program.priorityDetails.length > 0 && (
            <div>
              <h4 style={{ color: 'var(--text-dark)', fontSize: '1.1rem', marginBottom: '12px', fontWeight: 600 }}>🌟 Điểm Cộng & Ưu Tiên</h4>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {program.priorityDetails.map((priority, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-page)', padding: '16px', borderRadius: '8px', minWidth: '280px', flex: 1 }}>
                    <div style={{ fontWeight: 600, marginBottom: '12px', color: 'var(--primary-blue)' }}>{priority.title}</div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <tbody>
                        {Object.entries(priority.table).map(([key, val]) => (
                          <tr key={key} style={{ borderBottom: '1px solid var(--border-light)' }}>
                            <td style={{ padding: '8px 0', color: 'var(--text-dark)' }}>{key}</td>
                            <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 600, color: 'var(--primary-purple)' }}>{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </div>
      </div>

      {/* Block 3: Mạng xã hội & Đánh giá */}
      <FacebookCommentSection />
    </div>
  );
}
