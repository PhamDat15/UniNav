'use client';

import React, { useState } from 'react';

// Types
export type CommentData = {
  id: string;
  author: string;
  avatarUrl: string;
  isAuthor?: boolean;
  timeAgo: string;
  content: string;
  imageUrl?: string;
  likesCount: number;
  hasLiked?: boolean;
  replies?: CommentData[];
};

// Mock Data
const initialComments: CommentData[] = [
  {
    id: 'c1',
    author: 'Nguyễn Văn Đạt',
    avatarUrl: 'https://i.pravatar.cc/150?u=dat',
    isAuthor: true,
    timeAgo: '6 giờ',
    content: 'Cơ sở vật chất của trường năm nay nâng cấp xịn xò quá! Ai sắp vào trường điểm danh nào =)))))',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    likesCount: 142,
    hasLiked: false,
    replies: [
      {
        id: 'r1',
        author: 'Trần Thị B',
        avatarUrl: 'https://i.pravatar.cc/150?u=b',
        timeAgo: '5 giờ',
        content: 'Năm ngoái em thi trượt, năm nay quyết tâm đỗ vào trường mình ạ 😭',
        likesCount: 12,
        hasLiked: true,
      },
      {
        id: 'r2',
        author: 'Lê Hoàng C',
        avatarUrl: 'https://i.pravatar.cc/150?u=c',
        timeAgo: '4 giờ',
        content: 'Trường có phòng gym mới chưa anh ơi?',
        likesCount: 2,
        hasLiked: false,
        replies: [
          {
            id: 'r2_1',
            author: 'Nguyễn Văn Đạt',
            avatarUrl: 'https://i.pravatar.cc/150?u=dat',
            isAuthor: true,
            timeAgo: '3 giờ',
            content: 'Có rồi em nhé, to chà bá luôn 💪',
            likesCount: 5,
            hasLiked: false,
          }
        ]
      }
    ]
  },
  {
    id: 'c2',
    author: 'Phạm Minh D',
    avatarUrl: 'https://i.pravatar.cc/150?u=d',
    timeAgo: '2 ngày',
    content: 'Giảng viên khoa mình dạy cực kỳ tâm huyết, nhất là thầy Hùng dạy đại cương.',
    likesCount: 89,
    hasLiked: false,
  },
  {
    id: 'c3',
    author: 'Trần Gia Bảo',
    avatarUrl: 'https://i.pravatar.cc/150?u=baot',
    timeAgo: '3 ngày',
    content: 'Trường mình có hỗ trợ ký túc xá cho tân sinh viên không mọi người? Em ở xa lên hơi lo lắng ạ 🥺',
    likesCount: 34,
    hasLiked: false,
    replies: [
      {
        id: 'r3_1',
        author: 'Nguyễn Văn Đạt',
        avatarUrl: 'https://i.pravatar.cc/150?u=dat',
        isAuthor: true,
        timeAgo: '2 ngày',
        content: 'Ký túc xá đăng ký ngay lúc nhập học em nhé, ưu tiên sinh viên tỉnh xa và gia đình chính sách! Cố lên 🤩',
        likesCount: 15,
        hasLiked: false,
      }
    ]
  },
  {
    id: 'c4',
    author: 'Hà Phương',
    avatarUrl: 'https://i.pravatar.cc/150?u=phuong',
    timeAgo: '4 ngày',
    content: 'Góc bóc phốt: Thư viện xịn quá làm mình vô ngồi toàn buồn ngủ =))) Điều hòa mát lạnh wifi căng đét! 💯🔥',
    likesCount: 205,
    hasLiked: true,
  },
  {
    id: 'c5',
    author: 'Hoàng Long',
    avatarUrl: 'https://i.pravatar.cc/150?u=long',
    timeAgo: '1 tuần',
    content: 'Canteen có cô bán cơm rang dưa bò đỉnh chóp, 35k no tới chiều luôn anh em. Nhớ rủ thêm bạn bè đi ăn ké nha 🤤🍽️',
    likesCount: 67,
    hasLiked: false,
  },
  {
    id: 'c6',
    author: 'Mai Anh',
    avatarUrl: 'https://i.pravatar.cc/150?u=maianh',
    timeAgo: '1 tuần',
    content: 'Năm ngoái điểm chuẩn ngành này lấy bao nhiêu vậy ạ? Em mới làm bài test báo khả năng đỗ là 85% có nên tự tin nộp hồ sơ không mn? 🤔✨',
    likesCount: 42,
    hasLiked: false,
    replies: [
      {
        id: 'r6_1',
        author: 'Lê Hoàng C',
        avatarUrl: 'https://i.pravatar.cc/150?u=c',
        timeAgo: '5 ngày',
        content: '85% là mức an toàn rồi đó bạn, mạnh dạn nộp nguyện vọng 1 luôn! 🎉',
        likesCount: 8,
        hasLiked: false,
      }
    ]
  }
];

// Single Comment Component (Recursive)
const CommentItem = ({ 
  comment, 
  onReply, 
  onLike,
  isReply = false
}: { 
  comment: CommentData; 
  onReply: (id: string, authorName: string) => void;
  onLike: (id: string) => void;
  isReply?: boolean;
}) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', marginTop: isReply ? '8px' : '16px' }}>
      {/* Avatar */}
      <img 
        src={comment.avatarUrl} 
        alt={comment.author} 
        style={{ 
          width: isReply ? '32px' : '40px', 
          height: isReply ? '32px' : '40px', 
          borderRadius: '50%', 
          objectFit: 'cover',
          flexShrink: 0
        }} 
      />
      
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Comment Bubble */}
        <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
          <div style={{ 
            backgroundColor: '#f0f2f5', 
            padding: '8px 12px', 
            borderRadius: '18px',
            display: 'inline-block'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#050505' }}>{comment.author}</span>
              {comment.isAuthor && (
                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '4px', 
                  backgroundColor: '#e4e6eb', 
                  color: '#65676b', 
                  fontSize: '0.75rem', 
                  fontWeight: 600, 
                  padding: '2px 6px', 
                  borderRadius: '4px' 
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                  Tác giả
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.95rem', color: '#050505', lineHeight: '1.4', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {comment.content}
            </div>
          </div>
          
          {/* Reaction Icon & Count (Positioned slightly outside the bubble) */}
          {comment.likesCount > 0 && (
            <div style={{
              position: 'absolute',
              bottom: '-8px',
              right: '-16px',
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '2px 4px 2px 2px',
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              gap: '4px',
              zIndex: 1
            }}>
              <div style={{ 
                width: '18px', 
                height: '18px', 
                borderRadius: '50%', 
                backgroundColor: '#1877f2', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'white'
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#65676b' }}>{comment.likesCount}</span>
            </div>
          )}
        </div>

        {/* Attached Image */}
        {comment.imageUrl && (
          <div style={{ marginTop: '4px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e4e6eb', display: 'inline-block', maxWidth: '100%' }}>
            <img src={comment.imageUrl} alt="attachment" style={{ display: 'block', maxWidth: '300px', maxHeight: '300px', objectFit: 'cover' }} />
          </div>
        )}

        {/* Action Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px', marginLeft: '12px', fontSize: '0.8rem', color: '#65676b', fontWeight: 600 }}>
          <span style={{ cursor: 'pointer', color: comment.hasLiked ? '#1877f2' : '#65676b' }} onClick={() => onLike(comment.id)} className="fb-hover-link">
            Thích
          </span>
          <span style={{ cursor: 'pointer' }} onClick={() => onReply(comment.id, comment.author)} className="fb-hover-link">
            Phản hồi
          </span>
          <span style={{ fontWeight: 400 }}>{comment.timeAgo}</span>
        </div>

        {/* Replies Section */}
        {comment.replies && comment.replies.length > 0 && (
          <div style={{ marginTop: '8px' }}>
            {!showReplies ? (
              <div 
                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#65676b', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', marginLeft: '12px' }}
                onClick={() => setShowReplies(true)}
                className="fb-hover-link"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(180deg) scaleX(-1)' }}><path d="m9 18 6-6-6-6"/></svg>
                Xem {comment.replies.length} phản hồi
              </div>
            ) : (
              <div>
                {comment.replies.map(reply => (
                  <CommentItem 
                    key={reply.id} 
                    comment={reply} 
                    onReply={onReply} 
                    onLike={onLike}
                    isReply={true} 
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .fb-hover-link:hover { text-decoration: underline; }
      `}} />
    </div>
  );
};

export default function FacebookCommentSection() {
  const [comments, setComments] = useState<CommentData[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<{ id: string, name: string } | null>(null);

  const handleLike = (targetId: string) => {
    // Recursive function to toggle like
    const toggleLike = (list: CommentData[]): CommentData[] => {
      return list.map(c => {
        if (c.id === targetId) {
          const isLiking = !c.hasLiked;
          return { ...c, hasLiked: isLiking, likesCount: c.likesCount + (isLiking ? 1 : -1) };
        }
        if (c.replies) {
          return { ...c, replies: toggleLike(c.replies) };
        }
        return c;
      });
    };
    setComments(toggleLike(comments));
  };

  const handleReplyClick = (id: string, name: string) => {
    setReplyingTo({ id, name });
    // Scroll to input would be nice, but skipping for simplicity
  };

  const handlePost = () => {
    if (!newComment.trim()) return;

    const newCmt: CommentData = {
      id: Math.random().toString(),
      author: 'Bạn (Người dùng hiện tại)',
      avatarUrl: 'https://i.pravatar.cc/150?u=you',
      timeAgo: 'Vừa xong',
      content: newComment,
      likesCount: 0,
    };

    if (replyingTo) {
      // Add as reply
      const addReply = (list: CommentData[]): CommentData[] => {
        return list.map(c => {
          // If this is the direct parent, or if we reply to a reply, we add it to the top level comment's replies for simplicity (FB flattens replies to 1 level mostly)
          if (c.id === replyingTo.id || (c.replies && c.replies.some(r => r.id === replyingTo.id))) {
            return { ...c, replies: [...(c.replies || []), newCmt] };
          }
          if (c.replies) {
            return { ...c, replies: addReply(c.replies) };
          }
          return c;
        });
      };
      setComments(addReply(comments));
      setReplyingTo(null);
    } else {
      // Add as root comment
      setComments([newCmt, ...comments]);
    }
    setNewComment('');
  };

  return (
    <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 24px rgba(0,0,0,0.05)', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <h3 style={{ fontSize: '1.4rem', color: 'var(--text-dark)', marginBottom: '24px' }}>Cộng Đồng Đánh Giá & Thảo Luận</h3>
      
      {/* Input Area */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <img src="https://i.pravatar.cc/150?u=you" alt="You" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
        <div style={{ flex: 1 }}>
          {replyingTo && (
            <div style={{ fontSize: '0.85rem', color: '#65676b', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Đang trả lời <strong>{replyingTo.name}</strong>
              <span style={{ cursor: 'pointer', color: '#1877f2' }} onClick={() => setReplyingTo(null)}>Hủy</span>
            </div>
          )}
          <div style={{ position: 'relative' }}>
            <textarea
              placeholder="Viết bình luận công khai..."
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              style={{ 
                width: '100%', 
                backgroundColor: '#f0f2f5', 
                border: 'none', 
                borderRadius: '20px', 
                padding: '10px 48px 10px 16px', 
                fontSize: '0.95rem',
                color: '#050505',
                outline: 'none',
                resize: 'none',
                minHeight: '40px',
                lineHeight: '1.4'
              }}
              rows={newComment.split('\n').length > 1 ? newComment.split('\n').length : 1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handlePost();
                }
              }}
            />
            <div 
              style={{ position: 'absolute', right: '12px', top: '10px', cursor: 'pointer', color: '#1877f2' }}
              onClick={handlePost}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#65676b', marginTop: '4px', marginLeft: '12px' }}>Nhấn Enter để đăng.</div>
        </div>
      </div>

      {/* Comments List */}
      <div>
        {comments.map(comment => (
          <CommentItem 
            key={comment.id} 
            comment={comment} 
            onReply={handleReplyClick}
            onLike={handleLike}
          />
        ))}
      </div>
    </div>
  );
}
