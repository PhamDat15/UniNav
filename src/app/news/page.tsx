"use client";

import { mockNews } from '../../data/mockNews';

export default function NewsPage() {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Tin Tức Tuyển Sinh</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Cập nhật nhanh nhất các thông tin, đề án tuyển sinh, điểm chuẩn và cẩm nang từ các trường đại học hàng đầu.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '24px' 
      }}>
        {mockNews.map(news => (
          <a key={news.id} href={`/news/${news.id}`} style={{ textDecoration: 'none' }}>
            <div className="card news-card">
              <div className="news-card-img-container">
                <img 
                  src={news.imageUrl} 
                  alt={news.title}
                  className="news-card-img"
                />
              </div>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 600, 
                    color: 'var(--primary-blue)', 
                    background: 'var(--light-blue)',
                    padding: '4px 10px',
                    borderRadius: '16px',
                    textTransform: 'uppercase'
                  }}>
                    {news.category}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{news.date}</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-dark)', marginBottom: '12px', lineHeight: '1.4' }}>
                  {news.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5', flex: 1 }}>
                  {news.excerpt}
                </p>
                {news.university && (
                  <div style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--primary-purple)', fontWeight: 500 }}>
                    🏢 {news.university}
                  </div>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
