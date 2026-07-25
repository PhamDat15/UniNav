import { mockNews } from '../../../data/mockNews';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export function generateStaticParams() {
  return mockNews.map((news) => ({
    id: news.id,
  }));
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const news = mockNews.find(n => n.id === resolvedParams.id);
  
  if (!news) {
    notFound();
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '60px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link href="/news" style={{ color: 'var(--primary-blue)', textDecoration: 'none', fontWeight: 600 }}>
          &larr; Quay lại trang Tin tức
        </Link>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <span style={{ 
          fontSize: '0.85rem', 
          fontWeight: 600, 
          color: 'var(--primary-blue)', 
          background: 'var(--light-blue)',
          padding: '6px 12px',
          borderRadius: '16px',
          textTransform: 'uppercase',
          marginRight: '16px'
        }}>
          {news.category}
        </span>
        <span style={{ color: 'var(--text-muted)' }}>{news.date}</span>
      </div>

      <h1 style={{ fontSize: '2.5rem', marginBottom: '24px', lineHeight: '1.3', color: 'var(--text-dark)' }}>
        {news.title}
      </h1>

      <div style={{ height: '400px', width: '100%', overflow: 'hidden', borderRadius: '16px', marginBottom: '40px', boxShadow: 'var(--shadow-sm)' }}>
        <img 
          src={news.imageUrl} 
          alt={news.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-dark)' }}>
        {news.content.map((paragraph, index) => (
          <p key={index} style={{ marginBottom: '20px' }}>
            {paragraph}
          </p>
        ))}
      </div>

      {news.sourceUrl && (
        <div style={{ marginTop: '40px', padding: '32px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-light)', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '16px', color: 'var(--text-dark)' }}>Bạn muốn xem thêm thông tin chi tiết?</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Bài viết này đề cập đến thông tin chính thức từ {news.university || 'trường đại học'}.</p>
          <a href={news.sourceUrl} target="_blank" rel="noopener noreferrer">
            <button className="btn-primary" style={{ padding: '12px 24px', fontSize: '1.1rem' }}>
              Xem thông báo tại website chính thức
            </button>
          </a>
        </div>
      )}
    </div>
  );
}
