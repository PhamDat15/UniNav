"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { mockCategories } from '../../../../data/mockCommunity';
import Link from 'next/link';

export default function SchoolCommunityPage() {
  const { schoolId } = useParams();
  const router = useRouter();

  // Tìm school
  let school = null;
  for (const cat of mockCategories) {
    const found = cat.forums.find(f => f.id === schoolId);
    if (found) {
      school = found;
      break;
    }
  }

  if (!school) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Khu vực không tồn tại</h2>
        <button onClick={() => router.push('/community')} className="btn-primary" style={{ marginTop: '16px' }}>Về trang Cộng đồng</button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'var(--font-sans)', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Breadcrumb & Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          <Link href="/community" style={{ color: 'var(--primary-blue)', textDecoration: 'none' }}>Cộng đồng</Link> / 
          <span style={{ color: 'var(--text-dark)' }}> {school.name}</span>
        </div>

        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          padding: '24px', 
          display: 'flex', 
          gap: '24px', 
          alignItems: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: 'var(--bg-page)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', border: '1px solid var(--border-light)' }}>
            {school.avatar ? (
              <img src={school.avatar} alt={school.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            ) : (
              <span style={{ fontSize: '24px' }}>🏫</span>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: '0 0 8px 0', fontSize: '1.8rem', color: 'var(--text-dark)' }}>{school.name}</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1rem' }}>{school.description}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: 'var(--text-dark)', fontWeight: 'bold', fontSize: '1.2rem' }}>{school.threadsCount}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Chủ đề</div>
          </div>
        </div>
      </div>

      {/* Threads List */}
      <div style={{ 
        background: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
        border: '1px solid var(--border-light)',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', padding: '16px 24px', borderBottom: '2px solid var(--bg-page)', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, background: '#f8fafc' }}>
          <div style={{ flex: '4' }}>Chủ đề</div>
          <div style={{ flex: '1', textAlign: 'center' }}>Trả lời / Lượt xem</div>
          <div style={{ flex: '1', textAlign: 'right' }}>Bài viết cuối</div>
        </div>

        {school.threads?.map((thread, index) => (
          <div key={thread.id} style={{ 
            display: 'flex', 
            padding: '16px 24px', 
            borderBottom: index < (school.threads?.length || 0) - 1 ? '1px solid var(--border-light)' : 'none',
            alignItems: 'center',
            transition: 'background 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          onClick={() => router.push(`/community/${thread.id}`)}
          >
            {/* Thread Info */}
            <div style={{ flex: '4', display: 'flex', gap: '16px', alignItems: 'center', paddingRight: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0, overflow: 'hidden' }}>
                <img src={thread.avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerText = thread.author.charAt(0).toUpperCase(); e.currentTarget.parentElement!.style.background = 'var(--primary-blue)'; e.currentTarget.parentElement!.style.color = 'white'; e.currentTarget.parentElement!.style.display = 'flex'; e.currentTarget.parentElement!.style.alignItems = 'center'; e.currentTarget.parentElement!.style.justifyContent = 'center'; }} />
              </div>
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: thread.isSticky ? 700 : 500, color: 'var(--text-dark)', marginBottom: '4px' }}>
                  {thread.isSticky && <span style={{ color: '#ef4444', marginRight: '6px' }}>📌</span>}
                  {thread.tag && <span style={{ background: 'var(--light-purple)', color: 'var(--primary-purple)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', marginRight: '8px' }}>{thread.tag}</span>}
                  {thread.title}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Bởi <span style={{ color: 'var(--primary-blue)', fontWeight: 500 }}>{thread.author}</span> · {thread.createdAt}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={{ flex: '1', textAlign: 'center', fontSize: '0.9rem' }}>
              <div style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{thread.repliesCount}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{thread.viewsCount}</div>
            </div>

            {/* Latest Reply */}
            <div style={{ flex: '1', textAlign: 'right', fontSize: '0.9rem' }}>
              <div style={{ color: 'var(--text-muted)' }}>{thread.replies && thread.replies.length > 0 ? thread.replies[0].createdAt : thread.createdAt}</div>
              <div style={{ color: 'var(--primary-blue)' }}>{thread.replies && thread.replies.length > 0 ? thread.replies[0].author : thread.author}</div>
            </div>
          </div>
        ))}
        {(!school.threads || school.threads.length === 0) && (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            Khu vực này hiện chưa có bài viết nào.
          </div>
        )}
      </div>
    </div>
  );
}
