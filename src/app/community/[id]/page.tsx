"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../contexts/AuthContext';
import { mockCategories, Thread, Reply } from '../../../data/mockCommunity';

export default function ThreadDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [newReply, setNewReply] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { isLoggedIn, setShowLoginModal, user } = useAuth();
  
  // Tìm Thread từ mockCategories
  const [thread, setThread] = useState<Thread | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);

  useEffect(() => {
    let foundThread = null;
    for (const cat of mockCategories) {
      for (const forum of cat.forums) {
        if (forum.threads) {
          const t = forum.threads.find(x => x.id === id);
          if (t) {
            foundThread = t;
            break;
          }
        }
      }
      if (foundThread) break;
    }
    
    if (foundThread) {
      setThread(foundThread);
      setReplies(foundThread.replies || []);
    }
  }, [id]);

  const handlePostReply = () => {
    if (!newReply.trim()) return;
    const newId = `r_${Date.now()}`;
    const newR: Reply = {
      id: newId,
      author: isAnonymous ? 'Người dùng ẩn danh' : (user?.displayName || 'Sinh viên giấu tên'),
      avatar: isAnonymous ? 'https://i.pravatar.cc/150?u=anonymous' : (user?.avatar || '#3b82f6'),
      role: isAnonymous ? 'Ẩn danh' : 'Newbie',
      content: newReply,
      createdAt: 'Just now',
      likes: 0
    };
    setReplies([...replies, newR]);
    setNewReply('');
  };

  if (!thread) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Bài viết không tồn tại hoặc đã bị xóa</h2>
        <button onClick={() => router.push('/community')} className="btn-primary" style={{ marginTop: '16px' }}>Về trang Cộng đồng</button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'var(--font-sans)' }}>
      <div style={{ width: '100%' }}>
          
          {/* Breadcrumb */}
          <div style={{ display: 'flex', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px', alignItems: 'center' }}>
            <Link href="/" style={{ color: 'var(--primary-blue)', textDecoration: 'none' }}>Trang chủ</Link>
            <span>›</span>
            <Link href="/community" style={{ color: 'var(--primary-blue)', textDecoration: 'none' }}>Diễn đàn</Link>
            <span>›</span>
            <span>Chuyện trò linh tinh</span>
          </div>

          {/* Main Post & Comments */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid var(--border-light)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              {/* Main Post Author Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', background: 'var(--primary-blue)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {thread.avatar.startsWith('http') || thread.avatar.startsWith('/') ? (
                    <img src={thread.avatar} alt="avatar" style={{width: '100%', height: '100%', objectFit: 'cover'}} onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerText = thread.author.charAt(0).toUpperCase(); }} />
                  ) : (
                    thread.author.charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '1.05rem' }}>{thread.author}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{thread.createdAt}</div>
                </div>
              </div>
              
              {/* Main Post Content (Title) */}
              <div style={{ color: 'var(--text-dark)', fontSize: '1.3rem', fontWeight: 600, lineHeight: '1.5', marginBottom: '16px', whiteSpace: 'pre-wrap' }}>
                {thread.title}
              </div>
              
              {/* Main Post Content (Body) */}
              {thread.content && (
                <div style={{ color: 'var(--text-dark)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '16px', whiteSpace: 'pre-wrap' }}>
                  {thread.content}
                </div>
              )}
              
              {/* Main Post Stats */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ background: 'var(--primary-blue)', color: 'white', borderRadius: '50%', width: '18px', height: '18px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>👍</span>
                  <span style={{ background: '#ec4899', color: 'white', borderRadius: '50%', width: '18px', height: '18px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', marginLeft: '-8px' }}>❤️</span>
                  <span style={{ marginLeft: '4px' }}>42</span>
                </div>
                <div>{replies.length} bình luận</div>
              </div>
              
              {/* Main Post Actions */}
              <div style={{ display: 'flex', paddingTop: '12px' }}>
                <button style={{ flex: 1, background: 'none', border: 'none', fontWeight: 600, color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '8px', borderRadius: '8px' }} onMouseOver={e => e.currentTarget.style.background = '#f1f5f9'} onMouseOut={e => e.currentTarget.style.background = 'none'}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                  Thích
                </button>
                <button style={{ flex: 1, background: 'none', border: 'none', fontWeight: 600, color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '8px', borderRadius: '8px' }} onMouseOver={e => e.currentTarget.style.background = '#f1f5f9'} onMouseOut={e => e.currentTarget.style.background = 'none'}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  Bình luận
                </button>
                <button style={{ flex: 1, background: 'none', border: 'none', fontWeight: 600, color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '8px', borderRadius: '8px' }} onMouseOver={e => e.currentTarget.style.background = '#f1f5f9'} onMouseOut={e => e.currentTarget.style.background = 'none'}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                  Chia sẻ
                </button>
              </div>
            </div>

            {/* Comments List */}
            {replies.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', color: 'var(--text-dark)' }}>Bình luận</h3>
                {replies.map((reply) => (
                  <div key={reply.id} style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', background: 'var(--primary-blue)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>
                      {reply.avatar.startsWith('http') || reply.avatar.startsWith('/') ? (
                        <img src={reply.avatar} alt="avatar" style={{width: '100%', height: '100%', objectFit: 'cover'}} onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerText = reply.author.charAt(0).toUpperCase(); }} />
                      ) : (
                        reply.author.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ background: '#f1f5f9', padding: '12px 16px', borderRadius: '16px', display: 'inline-block', maxWidth: '100%' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text-dark)', marginBottom: '4px', fontSize: '0.95rem' }}>
                          {reply.author} <span style={{ fontWeight: 400, fontSize: '0.8rem', color: 'var(--text-muted)' }}>· {reply.role}</span>
                        </div>
                        <div style={{ color: 'var(--text-dark)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                          {reply.content}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '16px', marginTop: '4px', marginLeft: '12px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        <span style={{ cursor: 'pointer' }}>Thích</span>
                        <span style={{ cursor: 'pointer' }}>Phản hồi</span>
                        <span style={{ fontWeight: 400 }}>{reply.createdAt}</span>
                        {reply.likes > 0 && <span style={{ fontWeight: 400, color: 'var(--text-dark)' }}>👍 {reply.likes}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ marginTop: '24px', background: 'white', borderRadius: '8px', border: '1px solid var(--border-light)', padding: '24px', display: 'flex', gap: '20px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: isLoggedIn && user ? 'var(--primary-purple)' : '#e2e8f0', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', flexShrink: 0, overflow: 'hidden' }}>
              {isLoggedIn && user ? (
                isAnonymous ? (
                  <img src="https://i.pravatar.cc/150?u=anonymous" alt="Anonymous Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <img src={user.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerText = user.username.charAt(0).toUpperCase() }} />
                )
              ) : '?'}
            </div>
            <div style={{ flex: 1 }}>
              {isLoggedIn ? (
                <>
                  <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-dark)', fontWeight: 500 }}>Bình luận với tư cách:</span>
                    <select 
                      value={isAnonymous ? 'anonymous' : 'public'} 
                      onChange={(e) => setIsAnonymous(e.target.value === 'anonymous')}
                      style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-light)', outline: 'none', background: 'white', color: 'var(--text-dark)', fontSize: '0.9rem', cursor: 'pointer', fontWeight: 600 }}
                    >
                      <option value="public">{user?.displayName || user?.username}</option>
                      <option value="anonymous">Người dùng ẩn danh</option>
                    </select>
                  </div>
                  <textarea 
                    placeholder="Viết bình luận của bạn..."
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    style={{
                      width: '100%',
                      height: '100px',
                      padding: '16px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-light)',
                      fontFamily: 'inherit',
                      fontSize: '1rem',
                      resize: 'vertical',
                      marginBottom: '16px',
                      background: 'var(--bg-page)'
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button 
                      onClick={handlePostReply}
                      disabled={!newReply.trim()}
                      className="btn-primary" 
                      style={{ opacity: !newReply.trim() ? 0.5 : 1 }}
                    >
                      Gửi bình luận
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ width: '100%', height: '100px', padding: '16px', borderRadius: '8px', border: '1px dashed var(--border-light)', background: 'var(--bg-page)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Bạn cần đăng nhập để tham gia bình luận</span>
                  <button onClick={() => setShowLoginModal(true)} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                    Đăng nhập ngay
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
  );
}
