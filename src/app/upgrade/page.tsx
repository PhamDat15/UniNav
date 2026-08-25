"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

export default function UpgradePage() {
  const router = useRouter();
  const { user, upgradeToVip, setShowLoginModal } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setIsProcessing(true);
    
    // Giả lập delay xử lý giao dịch
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      upgradeToVip();
      
      // Chuyển về trang wishlist sau 3 giây
      setTimeout(() => {
        router.push('/wishlist');
      }, 3000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div style={{ maxWidth: '600px', margin: '100px auto', textAlign: 'center', padding: '40px', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
        <h1 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '16px' }}>Nâng cấp VIP thành công!</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '24px' }}>
          Cảm ơn bạn đã tin tưởng UniNav. Tài khoản của bạn đã được kích hoạt gói VIP vĩnh viễn.
        </p>
        <p style={{ color: 'var(--text-dark)', fontWeight: 600 }}>
          Hệ thống đang tự động chuyển về trang Chiến lược nguyện vọng...
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Mở khóa Toàn bộ Quyền năng</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Tối ưu hóa chiến lược xét tuyển, không bỏ lỡ bất kỳ cơ hội đỗ đại học nào.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Phần đặc quyền */}
        <div className="card" style={{ flex: '1 1 400px', borderTop: '4px solid var(--primary-purple)' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-dark)', marginBottom: '24px' }}>Đặc quyền Gói VIP</h2>
          
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--primary-blue)', fontSize: '1.2rem' }}>✓</span>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-dark)' }}>Lưu tối đa 15 nguyện vọng</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>(Tài khoản thường: 2 nguyện vọng)</span>
              </div>
            </li>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--primary-blue)', fontSize: '1.2rem' }}>✓</span>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-dark)' }}>Thuật toán Sắp xếp Nhóm ưu tiên</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Chỉ ra mức độ rủi ro (An toàn, Vừa sức, Mạo hiểm).</span>
              </div>
            </li>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--primary-blue)', fontSize: '1.2rem' }}>✓</span>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-dark)' }}>Cập nhật điểm chuẩn tự động</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Theo dõi sát sao thay đổi của các trường đại học.</span>
              </div>
            </li>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--primary-blue)', fontSize: '1.2rem' }}>✓</span>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-dark)' }}>Hỗ trợ 24/7</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Ưu tiên giải đáp thắc mắc.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Phần thanh toán */}
        <div className="card" style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: '8px' }}>
            Giá nâng cấp
          </div>
          <div style={{ fontSize: '2.5rem', color: 'var(--primary-blue)', fontWeight: 800, marginBottom: '24px' }}>
            99.000đ<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>/vĩnh viễn</span>
          </div>

          {!user ? (
            <>
              <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', width: '100%', textAlign: 'center', marginBottom: '24px', border: '1px dashed var(--border-light)' }}>
                <div style={{ fontSize: '4rem', marginBottom: '12px' }}>📱</div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-dark)', marginBottom: '8px' }}>Yêu cầu Đăng nhập</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Vui lòng đăng nhập để tiến hành thanh toán và lưu dữ liệu của bạn.</p>
              </div>

              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="btn-primary"
                style={{ width: '100%', padding: '16px', fontSize: '1.1rem', fontWeight: 700, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
              >
                Đăng nhập để Nâng cấp
              </button>
            </>
          ) : (
            <>
              <div 
                style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', width: '100%', textAlign: 'center', marginBottom: '24px', border: '1px solid var(--border-light)', cursor: isProcessing ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }} 
                onClick={isProcessing ? undefined : handlePayment}
                className="hoverable-row"
              >
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-dark)', marginBottom: '8px' }}>Quét mã để Thanh toán</h3>
                <img 
                  src="https://img.vietqr.io/image/970415-113366668888-compact2.png?amount=99000&addInfo=Thanh%20toan%20VIP%20UniNav&accountName=UniNav" 
                  alt="Mã QR Thanh toán" 
                  style={{ width: '100%', maxWidth: '250px', height: 'auto', borderRadius: '8px', opacity: isProcessing ? 0.5 : 1, transition: 'opacity 0.2s' }} 
                />
                <p style={{ fontSize: '0.9rem', color: 'var(--primary-blue)', marginTop: '16px', fontWeight: 600 }}>
                  {isProcessing ? 'Đang xử lý thanh toán...' : '👉 CLICK trực tiếp vào mã QR để thanh toán 👈'}
                </p>
              </div>
            </>
          )}
          
          <button 
            onClick={() => router.back()}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--text-muted)', 
              marginTop: '16px', 
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.95rem'
            }}
          >
            Để sau
          </button>
        </div>
      </div>
    </div>
  );
}
