"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { mockUniversities, UniversityProgram } from '../../data/mockUniversities';
import { massiveUniversities } from '../../data/massiveUniversities';

export default function HotMajorsPage() {
  const [hotMajors, setHotMajors] = useState<UniversityProgram[]>([]);

  useEffect(() => {
    const allPrograms = [...mockUniversities, ...massiveUniversities];
    const keywords = ['máy tính', 'công nghệ', 'marketing', 'truyền thông', 'kinh doanh', 'logistics', 'trí tuệ nhân tạo', 'dữ liệu'];
    
    // Tìm các ngành thỏa mãn từ khóa hoặc tỷ lệ việc làm cao
    let filtered = allPrograms.filter(program => {
      const isHighEmployment = program.employmentRate >= 92;
      const hasHotKeyword = keywords.some(k => program.major.toLowerCase().includes(k) || program.name.toLowerCase().includes(k));
      return isHighEmployment || hasHotKeyword;
    });

    // Lọc trùng lặp theo tên ngành và trường
    const uniquePrograms = new Map();
    filtered.forEach(p => {
      uniquePrograms.set(`${p.name}-${p.major}`, p);
    });
    
    const finalMajors = Array.from(uniquePrograms.values());
    
    // Sắp xếp ưu tiên tỷ lệ việc làm và điểm chuẩn
    finalMajors.sort((a, b) => {
      if (b.employmentRate !== a.employmentRate) {
        return b.employmentRate - a.employmentRate;
      }
      return b.averageScore - a.averageScore;
    });

    // Lấy top 12 ngành
    setHotMajors(finalMajors.slice(0, 12));
  }, []);

  return (
    <div style={{ padding: '0 0 40px 0' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/hero_background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '60px 20px',
        borderRadius: '16px',
        color: 'white',
        textAlign: 'center',
        marginBottom: '40px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px', color: 'white' }}>Top Ngành Học Xu Hướng 🔥</h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', opacity: 0.9, lineHeight: '1.6' }}>
          Khám phá những ngành học có tiềm năng phát triển mạnh mẽ nhất, sở hữu mức điểm chuẩn cạnh tranh và cơ hội việc làm rộng mở ngay sau khi tốt nghiệp.
        </p>
      </div>

      {/* List Layout */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {hotMajors.map((major, index) => (
          <div key={`${major.id}-${index}`} style={{
            background: 'var(--bg-card)',
            borderRadius: '12px',
            border: '1px solid var(--border-light)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            display: 'flex',
            alignItems: 'center',
            padding: '20px 24px',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
            position: 'relative'
          }}
          className="hoverable-card"
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.background = '#f8fafc';
            e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = 'var(--bg-card)';
            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
          }}
          >
            {/* Rank Badge */}
            <div style={{
              background: 'linear-gradient(45deg, #ef4444, #f59e0b)',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 800,
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              marginRight: '20px',
              flexShrink: 0
            }}>
              {index + 1}
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--primary-blue)', marginBottom: '4px', lineHeight: '1.4' }}>
                {major.major}
              </h2>
              <div style={{ color: 'var(--text-dark)', fontWeight: 600, fontSize: '0.95rem' }}>
                {major.name}
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '32px', margin: '0 32px', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Chỉ tiêu</div>
                <div style={{ fontWeight: 700, color: '#10b981', fontSize: '1.1rem' }}>{major.quota || Math.floor(Math.random() * 200 + 50)}</div>
              </div>
              <div style={{ width: '1px', height: '40px', background: 'var(--border-light)' }}></div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Điểm chuẩn</div>
                <div style={{ fontWeight: 700, color: '#ef4444', fontSize: '1.1rem' }}>{major.averageScore}đ</div>
              </div>
            </div>

            {/* Action */}
            <div style={{ flexShrink: 0 }}>
              <Link href={`/major/${major.id}`} style={{ textDecoration: 'none' }}>
                <button style={{
                  background: 'var(--primary-blue)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#1e40af'}
                onMouseOut={(e) => e.currentTarget.style.background = 'var(--primary-blue)'}
                >
                  Chi tiết &rarr;
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
