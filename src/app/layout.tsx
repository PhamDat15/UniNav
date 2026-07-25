import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export const metadata: Metadata = {
  title: "UniNav - Tư vấn Tuyển sinh Đại học",
  description: "Cổng thông tin tư vấn tuyển sinh đại học thông minh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <Navbar />
        <main style={{ padding: '32px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
