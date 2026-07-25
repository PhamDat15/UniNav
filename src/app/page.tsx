"use client";

import { mockNews } from '../data/mockNews';

export default function Home() {
  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'url(/hero_background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -2
      }} />
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(140, 153, 170, 0.75)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex: -1
      }} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '16px', marginTop: '40px' }}>
          Định hướng tương lai, <br />
          <span className="gradient-text">tra cứu thông minh</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '40px', lineHeight: '1.6' }}>
          Khám phá ngành học phù hợp nhất với tính cách của bạn, dự đoán khả năng đỗ và lập chiến lược nguyện vọng tối ưu bằng hệ thống Trí tuệ nhân tạo.
        </p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href="/profile">
            <button className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
              Bắt đầu bài Test & Nhập điểm
            </button>
          </a>
        </div>

        <div style={{ marginTop: '80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', width: '100%' }}>
          <div className="card" style={{ textAlign: 'left' }}>
            <h3 style={{ marginBottom: '12px', color: 'var(--primary-blue)', fontSize: '1.5rem' }}>Điểm Phù Hợp</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>Đánh giá độ phù hợp và xác suất đỗ dựa trên dữ liệu lịch sử điểm chuẩn và hồ sơ cá nhân.</p>
          </div>
          <div className="card" style={{ textAlign: 'left' }}>
            <h3 style={{ marginBottom: '12px', color: 'var(--primary-purple)', fontSize: '1.5rem' }}>Trắc nghiệm RIASEC</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>Khám phá thiên hướng nghề nghiệp qua bài test tính cách chuẩn quốc tế để chọn đúng ngành.</p>
          </div>
          <div className="card" style={{ textAlign: 'left' }}>
            <h3 style={{ marginBottom: '12px', color: 'var(--primary-blue)', fontSize: '1.5rem' }}>So sánh đa chiều</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>Đặt các trường/ngành lên bàn cân với Radar Chart sinh động về học phí, áp lực học tập.</p>
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
