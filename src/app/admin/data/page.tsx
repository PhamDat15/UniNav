'use client';

import { useState } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function AdminDataPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleDownloadTemplate = () => {
    // Generate a simple CSV template
    const headers = "id,name,major,averageScore,score2023,score2024,score2025\n";
    const sample = "QGH-CÔN,Đại học Công nghệ - ĐHQGHN,Công nghệ thông tin,26.5,25.5,26.0,26.5\n";
    const blob = new Blob([headers + sample], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "template_diem_chuan.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setStatus('Đang xử lý file CSV...');

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\\n');
      if (lines.length < 2) {
        setStatus('File CSV không hợp lệ hoặc trống.');
        setLoading(false);
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim());
      const updates = [];

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const values = lines[i].split(',').map(v => v.trim());
        const row: any = {};
        headers.forEach((h, index) => {
          row[h] = values[index];
        });
        
        if (row.id) {
          updates.push(row);
        }
      }

      try {
        const res = await fetch('/api/update-scores', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ updates })
        });
        const data = await res.json();
        if (data.success) {
          setStatus(`Cập nhật thành công ${data.updated} bản ghi! Vui lòng khởi động lại server hoặc tải lại trang để xem thay đổi.`);
        } else {
          setStatus(`Lỗi: ${data.error}`);
        }
      } catch (err: any) {
        setStatus(`Lỗi kết nối: ${err.message}`);
      }
      setLoading(false);
    };
    reader.readAsText(file);
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-page)' }}>
      <Navbar />
      <div style={{ flex: 1, padding: '40px 20px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-blue)', marginBottom: '24px' }}>
          Quản Lý Dữ Liệu Tuyển Sinh
        </h1>
        
        <div style={{ background: 'var(--bg-card)', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid var(--border-light)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-dark)' }}>
            Cập nhật Điểm chuẩn từ file CSV
          </h2>
          
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
            Sử dụng tính năng này để tải lên hàng loạt điểm chuẩn thực tế của các trường đại học. Bạn có thể tải file mẫu về để xem định dạng, sau đó điền dữ liệu và upload lên hệ thống.
          </p>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <button 
              onClick={handleDownloadTemplate}
              style={{ background: 'var(--light-blue)', color: 'var(--primary-blue)', border: '1px solid var(--primary-blue)', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
            >
              📥 Tải File Mẫu (CSV)
            </button>
          </div>

          <div style={{ border: '2px dashed var(--border-light)', padding: '32px', borderRadius: '8px', textAlign: 'center', marginBottom: '24px', background: 'var(--bg-page)' }}>
            <input 
              type="file" 
              accept=".csv" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              style={{ marginBottom: '16px' }}
            />
            {file && <p style={{ color: 'var(--primary-purple)', fontWeight: 600 }}>Đã chọn: {file.name}</p>}
          </div>

          <button 
            onClick={handleUpload}
            disabled={!file || loading}
            style={{ 
              background: (!file || loading) ? 'var(--border-light)' : 'var(--primary-blue)', 
              color: (!file || loading) ? 'var(--text-muted)' : 'white', 
              border: 'none', 
              padding: '12px 24px', 
              borderRadius: '8px', 
              fontWeight: 600, 
              cursor: (!file || loading) ? 'not-allowed' : 'pointer',
              width: '100%'
            }}
          >
            {loading ? 'Đang cập nhật...' : '🚀 Bắt Đầu Cập Nhật'}
          </button>

          {status && (
            <div style={{ marginTop: '24px', padding: '16px', borderRadius: '8px', background: status.includes('Lỗi') ? '#fee2e2' : '#dcfce7', color: status.includes('Lỗi') ? '#991b1b' : '#166534', fontWeight: 500 }}>
              {status}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
