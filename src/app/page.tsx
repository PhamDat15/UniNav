"use client";

import { mockNews } from '../data/mockNews';
import CountUp from '../components/CountUp';

export default function Home() {
  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'url(/hero_background_bright.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -2,
        opacity: 0.8
      }} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', textAlign: 'center' }}>
        <h1 className="animate-fade-in-up delay-1" style={{ fontSize: '4.5rem', marginBottom: '16px', marginTop: '60px' }}>
          Tra cứu nhanh gọn, <br />
          <span className="gradient-text">lựa chọn khôn ngoan</span>
        </h1>
        <p className="animate-fade-in-up delay-2" style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '40px', lineHeight: '1.6' }}>
          Khám phá ngành học phù hợp nhất với tính cách của bạn, dự đoán khả năng đỗ và lập chiến lược nguyện vọng tối ưu bằng hệ thống Trí tuệ nhân tạo.
        </p>
        <div className="animate-fade-in-up delay-3" style={{ display: 'flex', gap: '16px' }}>
          <a href="/profile">
            <button className="btn-primary animate-pulse-glow" style={{ padding: '16px 40px', fontSize: '1.2rem', borderRadius: '30px' }}>
              Bắt đầu bài Nhập điểm & Tra cứu
            </button>
          </a>
        </div>

        <div className="animate-fade-in-up delay-4" style={{ marginTop: '80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', width: '100%' }}>
          <div className="card" style={{ textAlign: 'left', padding: '32px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div className="animate-float" style={{ color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </div>
              <h3 style={{ margin: 0, color: 'var(--primary-blue)', fontSize: '1.4rem', fontWeight: 700, lineHeight: '1.3' }}>Trắc nghiệm RIASEC</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>Khám phá thiên hướng nghề nghiệp qua bài test tính cách chuẩn quốc tế và hệ thống hóa dữ liệu dựa trên điểm số thực tế của bạn.</p>
          </div>

          <div className="card" style={{ textAlign: 'left', padding: '32px 24px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '24px', right: '24px', background: 'linear-gradient(135deg, #a855f7, #7e22ce)', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 4px 8px rgba(126, 34, 206, 0.25)' }}>
              ✨ AI
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div className="animate-float" style={{ color: 'var(--primary-purple)', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                </svg>
              </div>
              <h3 style={{ margin: 0, color: 'var(--primary-purple)', fontSize: '1.4rem', fontWeight: 700, lineHeight: '1.3', paddingRight: '40px' }}>Phân tích AI</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>Hé lộ tỷ lệ đỗ %, phương thức xét tuyển tối ưu và nhận báo cáo giải mã chi tiết từ Trí tuệ Nhân tạo cho từng ngành học.</p>
          </div>

          <div className="card" style={{ textAlign: 'left', padding: '32px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div className="animate-float" style={{ color: 'var(--text-dark)', display: 'flex', alignItems: 'center', flexShrink: 0, animationDelay: '0.5s' }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
              <h3 style={{ margin: 0, color: 'var(--text-dark)', fontSize: '1.4rem', fontWeight: 700, lineHeight: '1.3' }}>Chiến lược Nguyện vọng</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>Tự động phân nhóm rủi ro (An toàn, Vừa sức, Mạo hiểm) giúp tối ưu hóa danh sách nguyện vọng, đảm bảo cơ hội trúng tuyển đại học cao nhất.</p>
          </div>
        </div>

        {/* Section Social Proof (Thống kê) */}
        <div className="animate-fade-in-up delay-4" style={{ marginTop: '40px', width: '100%', background: 'linear-gradient(135deg, var(--light-blue), var(--light-purple))', borderRadius: '16px', padding: '40px 24px', display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'space-around', alignItems: 'center', boxShadow: '0 10px 30px -10px rgba(109, 40, 217, 0.15)' }}>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div className="animate-float" style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#e0e7ff', color: 'var(--primary-blue)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-dark)', margin: '0 0 8px' }}>
              <CountUp end={500} suffix="k+" />
            </h2>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>Học sinh tin dùng</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div className="animate-float" style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dbeafe', color: 'var(--primary-blue)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px', animationDelay: '0.2s' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 10h3v7H4zM10.5 10h3v7h-3zM2 19h20v3H2zM17 10h3v7h-3zM12 1L2 6v2h20V6z" />
              </svg>
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-dark)', margin: '0 0 8px' }}>
              <CountUp end={240} suffix="+" />
            </h2>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>Trường đại học</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div className="animate-float" style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fef3c7', color: '#d97706', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px', animationDelay: '0.4s' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
              </svg>
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-dark)', margin: '0 0 8px' }}>
              <CountUp end={98} suffix="%" />
            </h2>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>Đỗ nguyện vọng 1</p>
          </div>

        </div>

        {/* Tin tức Section */}
        <div style={{ marginTop: '80px', width: '100%', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '2rem', color: 'var(--text-dark)' }}>Tin Tức Tuyển Sinh</h2>
              <p style={{ color: 'var(--text-muted)' }}>Cập nhật mới nhất từ các trường đại học</p>
            </div>
            <a href="/news" style={{ color: 'var(--primary-blue)', fontWeight: 600, textDecoration: 'none' }}>Xem tất cả &rarr;</a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {mockNews.slice(0, 3).map(news => (
              <a key={news.id} href={`/news/${news.id}`} style={{ textDecoration: 'none' }}>
                <div className="card news-card">
                  <div className="news-card-img-container" style={{ height: '180px' }}>
                    <img src={news.imageUrl} alt={news.title} className="news-card-img" />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-blue)', background: 'var(--light-blue)', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '8px' }}>
                      {news.category}
                    </div>
                    <h3 style={{ fontSize: '1.1rem', color: 'var(--text-dark)', marginBottom: '8px', lineHeight: '1.4' }}>{news.title}</h3>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{news.date}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
