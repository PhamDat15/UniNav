"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      background: '#0f172a',
      borderTop: '1px solid #1e293b',
      padding: '64px 24px 32px',
      color: '#94a3b8'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '40px',
        marginBottom: '40px'
      }}>

        {/* Column 1: Brand */}
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', marginBottom: '16px', letterSpacing: '-0.5px' }}>
            UniNav
          </h2>
          <p style={{ lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '20px' }}>
            Cổng thông tin tư vấn tuyển sinh đại học thông minh. Khám phá tương lai của bạn ngay hôm nay.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            {/* 1. Nút Facebook: Thay thế URL https://facebook.com bằng đường dẫn fanpage của bạn */}
            <a
              href="https://www.facebook.com/profile.php?id=61593461504997#"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
              style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f8fafc', fontWeight: 'bold', textDecoration: 'none', transition: 'all 0.2s ease', border: '1px solid #334155' }}
              onMouseOver={(e) => { e.currentTarget.style.background = '#1877f2'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              f
            </a>

            {/* 2. Nút Instagram / LinkedIn: Thay thế URL bên dưới */}
            <a
              href="https://www.instagram.com/neymarjr/"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f8fafc', fontWeight: 'bold', textDecoration: 'none', transition: 'all 0.2s ease', border: '1px solid #334155' }}
              onMouseOver={(e) => { e.currentTarget.style.background = '#e4405f'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              ins
            </a>

            {/* 3. Nút Youtube: Thay thế URL bên dưới */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              title="YouTube"
              style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f8fafc', fontWeight: 'bold', textDecoration: 'none', transition: 'all 0.2s ease', border: '1px solid #334155' }}
              onMouseOver={(e) => { e.currentTarget.style.background = '#ff0000'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              yt
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 style={{ fontSize: '1.1rem', color: '#f8fafc', marginBottom: '16px' }}>Liên kết nhanh</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><Link href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Trang chủ</Link></li>
            <li><Link href="/news" style={{ color: '#94a3b8', textDecoration: 'none' }}>Tin tức</Link></li>
            <li><Link href="/profile" style={{ color: '#94a3b8', textDecoration: 'none' }}>Hồ sơ & Trắc nghiệm</Link></li>
            <li><Link href="/lookup" style={{ color: '#94a3b8', textDecoration: 'none' }}>Tra cứu điểm chuẩn</Link></li>
          </ul>
        </div>

        {/* Column 3: Features */}
        <div>
          <h3 style={{ fontSize: '1.1rem', color: '#f8fafc', marginBottom: '16px' }}>Tính năng</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><Link href="/profile" style={{ color: '#94a3b8', textDecoration: 'none' }}>Trắc nghiệm RIASEC</Link></li>
            <li><Link href="/search" style={{ color: '#94a3b8', textDecoration: 'none' }}>Phân tích khả năng đỗ</Link></li>
            <li><Link href="/wishlist" style={{ color: '#94a3b8', textDecoration: 'none' }}>Danh sách nguyện vọng</Link></li>
            <li><Link href="/wishlist" style={{ color: '#94a3b8', textDecoration: 'none' }}>Quản lý nguyện vọng</Link></li>
          </ul>
        </div>

        {/* Column 4: Legal & Contact */}
        <div>
          <h3 style={{ fontSize: '1.1rem', color: '#f8fafc', marginBottom: '16px' }}>Pháp lý & Liên hệ</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><span style={{ color: '#94a3b8' }}>Email: support@uninav.vn</span></li>
            <li><span style={{ color: '#94a3b8' }}>Địa chỉ: Hà Nội, Việt Nam</span></li>
            <li style={{ marginTop: '8px' }}><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Điều khoản sử dụng</a></li>
            <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Chính sách bảo mật</a></li>
          </ul>
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        borderTop: '1px solid #1e293b',
        paddingTop: '24px',
        textAlign: 'center',
        fontSize: '0.9rem'
      }}>
        © 2026 UniNav. All rights reserved.
      </div>
    </footer>
  );
}
