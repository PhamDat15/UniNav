"use client";

import React, { useState } from 'react';
import { mockCategories, mockTrendingThreads, addMockThread } from '../../data/mockCommunity';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

const ExpandableDescription = ({ text }: { text?: string }) => {
  const [expanded, setExpanded] = useState(false);
  if (!text) return null;
  
  const maxLength = 110;
  const shouldTruncate = text.length > maxLength;
  
  return (
    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
      {expanded || !shouldTruncate ? text : `${text.slice(0, maxLength)}...`}
      {shouldTruncate && (
        <span 
          onClick={(e) => { e.preventDefault(); setExpanded(!expanded); }} 
          style={{ color: 'var(--primary-blue)', cursor: 'pointer', marginLeft: '6px', fontWeight: 500 }}
        >
          {expanded ? 'Thu gọn' : 'Xem thêm'}
        </span>
      )}
    </div>
  );
};

export default function CommunityPage() {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const { isLoggedIn, setShowLoginModal, user } = useAuth();
  const router = useRouter();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPostForum, setNewPostForum] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTag, setNewPostTag] = useState('Hỏi đáp');
  const [newPostAnonymous, setNewPostAnonymous] = useState(false);
  
  const handleCreatePost = () => {
    if (!newPostForum || !newPostTitle.trim() || !newPostContent.trim()) {
      alert("Vui lòng nhập đầy đủ thông tin (Trường, Tiêu đề, Nội dung)!");
      return;
    }
    
    const threadId = `th_${Date.now()}`;
    const authorName = newPostAnonymous ? "Ẩn danh" : (user?.displayName || "PigMoney");
    const authorAvatar = newPostAnonymous ? "/avatars/anon.png" : (user?.avatar || "/avatars/avatar3.png");
    
    const newThread = {
      id: threadId,
      title: newPostTitle,
      content: newPostContent,
      author: authorName,
      avatar: authorAvatar,
      tag: newPostTag,
      repliesCount: 0,
      viewsCount: "1",
      createdAt: "Vừa xong",
      replies: []
    };
    
    addMockThread(newPostForum, newThread);
    setShowCreateModal(false);
    setNewPostForum('');
    setNewPostTitle('');
    setNewPostContent('');
    
    router.push(`/community/${threadId}`);
  };

  return (
    <div style={{ fontFamily: 'var(--font-sans)' }}>
      <div style={{ width: '100%' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '2rem', color: 'var(--text-dark)', margin: 0, fontWeight: 700 }}>Diễn đàn UniNav</h1>
            {isLoggedIn ? (
              <button onClick={() => setShowCreateModal(true)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Đăng bài mới
              </button>
            ) : (
              <button onClick={() => setShowLoginModal(true)} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px dashed var(--primary-blue)', color: 'var(--primary-blue)' }}>
                Vui lòng đăng nhập để đăng bài
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            
            {/* Cột Trái: Danh sách Chuyên mục (Tỉ lệ 7.5/10) */}
            <div style={{ flex: '1 1 70%', minWidth: '0' }}>
              {mockCategories.map((cat) => (
                <div key={cat.id} style={{ 
                  background: 'white', 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  marginBottom: '24px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  border: '1px solid var(--border-light)'
                }}>
                  {/* Header Chuyên mục (Gradient) */}
                  <div style={{ 
                    padding: '16px 24px', 
                    background: 'linear-gradient(135deg, var(--primary-blue), var(--primary-purple))',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <h2 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 600 }}>{cat.name}</h2>
                  </div>

                  {/* Danh sách Khu vực (Forums) */}
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* Header Columns */}
                    <div style={{ display: 'flex', padding: '12px 24px', borderBottom: '2px solid var(--bg-page)', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      <div style={{ flex: '3' }}>Khu vực</div>
                      <div style={{ flex: '1', textAlign: 'center' }}>Thống kê</div>
                      <div style={{ flex: '2', paddingLeft: '16px' }}>Bài mới nhất</div>
                    </div>

                    {cat.forums.map((forum, index) => (
                      <div 
                        key={forum.id} 
                        style={{ 
                          display: 'flex', 
                          padding: '16px 24px', 
                          borderBottom: index < cat.forums.length - 1 ? '1px solid var(--border-light)' : 'none',
                          background: hoveredRow === forum.id ? '#f8fafc' : 'transparent',
                          transition: 'background 0.2s ease',
                          alignItems: 'center'
                        }}
                        onMouseEnter={() => setHoveredRow(forum.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        {/* 1. Tên Khu vực & Icon */}
                        <div style={{ flex: '3', display: 'flex', alignItems: 'flex-start', gap: '16px', paddingRight: '16px', minWidth: 0 }}>
                          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', border: '1px solid var(--border-light)' }}>
                            {forum.avatar ? (
                              <img src={forum.avatar} alt={forum.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => e.currentTarget.style.display = 'none'} />
                            ) : (
                              <div style={{ width: '100%', height: '100%', background: 'var(--light-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-blue)' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                              </div>
                            )}
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <Link href={`/community/school/${forum.id}`} style={{ textDecoration: 'none' }}>
                              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--primary-blue)', marginBottom: '4px', cursor: 'pointer' }}>
                                {forum.name}
                              </div>
                            </Link>
                            <ExpandableDescription text={forum.description} />
                          </div>
                        </div>

                        {/* 2. Thống kê */}
                        <div style={{ flex: '1', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', minWidth: 0 }}>
                          <div style={{ marginBottom: '2px' }}><strong style={{ color: 'var(--text-dark)' }}>{forum.threadsCount}</strong> Threads</div>
                          <div><strong style={{ color: 'var(--text-dark)' }}>{forum.messagesCount}</strong> Messages</div>
                        </div>

                        {/* 3. Bài mới nhất */}
                        <div style={{ flex: '2', paddingLeft: '24px', borderLeft: '1px solid var(--border-light)', display: 'flex', alignItems: 'flex-start', gap: '12px', minWidth: 0 }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0, overflow: 'hidden' }}>
                            <img src={forum.latestThread.avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerText = forum.latestThread.author.charAt(0).toUpperCase(); e.currentTarget.parentElement!.style.background = 'var(--primary-blue)'; e.currentTarget.parentElement!.style.color = 'white'; e.currentTarget.parentElement!.style.display = 'flex'; e.currentTarget.parentElement!.style.alignItems = 'center'; e.currentTarget.parentElement!.style.justifyContent = 'center'; }} />
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <Link href={`/community/${forum.latestThread.id}`} style={{ textDecoration: 'none' }}>
                              <div style={{ 
                                fontSize: '0.9rem', 
                                fontWeight: 500, 
                                color: 'var(--text-dark)', 
                                whiteSpace: 'nowrap', 
                                overflow: 'hidden', 
                                textOverflow: 'ellipsis',
                                marginBottom: '4px'
                              }}>
                                {forum.latestThread.isSticky && <span style={{ color: '#ef4444', marginRight: '4px' }}>📌</span>}
                                {forum.latestThread.tag && <span style={{ background: 'var(--light-purple)', color: 'var(--primary-purple)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem', marginRight: '6px' }}>{forum.latestThread.tag}</span>}
                                {forum.latestThread.title}
                              </div>
                            </Link>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                              {forum.latestThread.createdAt} · <span style={{ color: 'var(--primary-blue)' }}>{forum.latestThread.author}</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Cột Phải: Trending Content (Tỉ lệ 2.5/10) */}
            <div style={{ flex: '1 1 25%', minWidth: '300px' }}>
              <div style={{ 
                background: 'white', 
                borderRadius: '12px', 
                padding: '24px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                border: '1px solid var(--border-light)',
                position: 'sticky',
                top: '100px'
              }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-dark)', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                  Trending Content
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {mockTrendingThreads.map(thread => (
                    <div key={thread.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0, overflow: 'hidden' }}>
                        <img src={thread.avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerText = thread.author.charAt(0).toUpperCase(); e.currentTarget.parentElement!.style.background = 'var(--primary-blue)'; e.currentTarget.parentElement!.style.color = 'white'; e.currentTarget.parentElement!.style.display = 'flex'; e.currentTarget.parentElement!.style.alignItems = 'center'; e.currentTarget.parentElement!.style.justifyContent = 'center'; }} />
                      </div>
                      <div>
                        <Link href={`/community/${thread.id}`} style={{ textDecoration: 'none' }}>
                          <div style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-dark)', lineHeight: '1.4', marginBottom: '4px', cursor: 'pointer' }}>
                            {thread.title}
                          </div>
                        </Link>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {thread.author} · {thread.createdAt}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          Replies: <strong style={{ color: 'var(--text-dark)' }}>{thread.repliesCount.toLocaleString()}</strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Đăng Bài */}
        {showCreateModal && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <div style={{
              background: 'white', padding: '32px', borderRadius: '16px',
              width: '90%', maxWidth: '600px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ margin: '0 0 24px 0', fontSize: '1.5rem', color: 'var(--text-dark)' }}>Đăng bài thảo luận mới</h2>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Đăng vào cộng đồng trường ĐH <span style={{color: 'red'}}>*</span></label>
                <select 
                  value={newPostForum}
                  onChange={(e) => setNewPostForum(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', outline: 'none' }}
                >
                  <option value="">-- Chọn Trường Đại học --</option>
                  {mockCategories.map(cat => (
                    <optgroup key={cat.id} label={cat.name}>
                      {cat.forums.map(forum => (
                        <option key={forum.id} value={forum.id}>{forum.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Tiêu đề bài viết <span style={{color: 'red'}}>*</span></label>
                <input 
                  type="text" 
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="Nhập tiêu đề (VD: Cho em hỏi về kinh nghiệm học môn Giải Tích...)" 
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Chủ đề (Tag)</label>
                  <select 
                    value={newPostTag}
                    onChange={(e) => setNewPostTag(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', outline: 'none' }}
                  >
                    <option value="Hỏi đáp">Hỏi đáp</option>
                    <option value="Kinh nghiệm">Kinh nghiệm</option>
                    <option value="Review">Review</option>
                    <option value="Đời sống">Đời sống</option>
                    <option value="Học phí">Học phí</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Danh tính</label>
                  <div style={{ display: 'flex', alignItems: 'center', height: '40px', gap: '8px' }}>
                    <input 
                      type="checkbox" 
                      id="anonCheck"
                      checked={newPostAnonymous}
                      onChange={(e) => setNewPostAnonymous(e.target.checked)}
                      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <label htmlFor="anonCheck" style={{ cursor: 'pointer', userSelect: 'none' }}>Đăng ẩn danh</label>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-dark)' }}>Nội dung chi tiết <span style={{color: 'red'}}>*</span></label>
                <textarea 
                  rows={5}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Viết nội dung bài thảo luận của bạn tại đây..." 
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-light)', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                ></textarea>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button onClick={() => setShowCreateModal(false)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'white', color: 'var(--text-dark)', fontWeight: 600, cursor: 'pointer' }}>
                  Hủy
                </button>
                <button onClick={handleCreatePost} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'var(--primary-blue)', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
                  Đăng bài ngay
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
  );
}
