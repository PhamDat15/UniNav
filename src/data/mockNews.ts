export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
  university?: string;
  content: string[];
  sourceUrl?: string;
}

export const mockNews: NewsArticle[] = [
  {
    id: "news-1",
    title: "Đại học Bách Khoa Hà Nội công bố đề án tuyển sinh 2026",
    excerpt: "Năm 2026, ĐHBK Hà Nội dự kiến tăng chỉ tiêu cho các ngành Công nghệ thông tin và Trí tuệ nhân tạo, đồng thời duy trì kỳ thi Đánh giá tư duy (TSA).",
    date: "15/07/2026",
    category: "Đề án tuyển sinh",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    university: "Đại học Bách Khoa Hà Nội",
    content: [
      "Theo thông tin mới nhất từ Đại học Bách Khoa Hà Nội, nhà trường dự kiến sẽ duy trì kỳ thi Đánh giá tư duy (TSA) với cấu trúc đề thi được tối ưu hóa, nhằm đánh giá sát nhất năng lực tư duy toán học, tư duy đọc hiểu và tư duy khoa học của học sinh.",
      "Đáng chú ý, năm 2026 sẽ có sự tăng cường chỉ tiêu cho các khối ngành hot như Trí tuệ nhân tạo, Khoa học dữ liệu và An toàn thông tin, đáp ứng nhu cầu nhân lực chất lượng cao của thị trường.",
      "Thí sinh nên bắt đầu ôn tập theo định dạng đề thi TSA ngay từ bây giờ để có kết quả tốt nhất."
    ],
    sourceUrl: "https://hust.edu.vn/"
  },
  {
    id: "news-2",
    title: "Hướng dẫn quy đổi điểm IELTS sang điểm thi THPT Quốc gia",
    excerpt: "Nhiều trường Đại học top đầu đã chính thức công bố bảng quy đổi điểm chứng chỉ IELTS. Đạt IELTS 6.5 trở lên có thể được quy đổi thành 10 điểm môn Tiếng Anh.",
    date: "12/07/2026",
    category: "Cẩm nang xét tuyển",
    imageUrl: "/news_ielts.png",
    content: [
      "Chứng chỉ ngoại ngữ quốc tế, đặc biệt là IELTS, đang ngày càng trở thành một \"tấm vé vàng\" trong xét tuyển đại học.",
      "Cụ thể, nhiều trường đại học khối kinh tế và công nghệ đã công bố bảng quy đổi. Theo đó, mức IELTS 6.5 thường được quy đổi thành 9.5 hoặc 10 điểm môn Tiếng Anh trong tổ hợp xét tuyển.",
      "Tuy nhiên, học sinh cần lưu ý hạn sử dụng của chứng chỉ IELTS (thường là 2 năm) để sắp xếp thời gian thi hợp lý."
    ]
  },
  {
    id: "news-3",
    title: "ĐHQGHN mở đợt đăng ký thi Đánh giá năng lực (HSA) đợt 2",
    excerpt: "Cổng thông tin đăng ký kỳ thi HSA đợt 2 của Đại học Quốc gia Hà Nội sẽ chính thức mở vào cuối tuần này. Học sinh lưu ý chuẩn bị hồ sơ.",
    date: "10/07/2026",
    category: "Kỳ thi ĐGNL",
    imageUrl: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    university: "Đại học Quốc gia Hà Nội",
    content: [
      "Đại học Quốc gia Hà Nội chính thức thông báo lịch đăng ký dự thi Đánh giá năng lực (HSA) đợt 2 cho năm 2026.",
      "Dự kiến sẽ có hàng ngàn thí sinh tham gia đợt thi này để cải thiện điểm số. Các thí sinh được khuyên nên chuẩn bị sẵn sàng CCCD và các thông tin cá nhân cần thiết trên cổng đăng ký.",
      "Kỳ thi HSA hiện nay được hơn 60 trường đại học trên cả nước sử dụng kết quả để xét tuyển độc lập."
    ],
    sourceUrl: "https://vnu.edu.vn/"
  },
  {
    id: "news-4",
    title: "Dự báo điểm chuẩn khối ngành Kinh tế giảm nhẹ",
    excerpt: "Theo các chuyên gia, do đề thi Toán năm nay có độ phân hóa cao, điểm chuẩn các ngành thuộc khối Kinh tế (NEU, FTU) có thể giảm từ 0.5 đến 1 điểm.",
    date: "05/07/2026",
    category: "Phân tích điểm chuẩn",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: [
      "Với tình hình đề thi tốt nghiệp THPT vừa qua, nhiều giáo viên nhận định phổ điểm các khối ngành Kinh tế sẽ có sự dịch chuyển nhẹ.",
      "Tại các trường như Đại học Kinh tế Quốc dân (NEU) hay Ngoại thương (FTU), điểm chuẩn các ngành truyền thống có thể giảm từ 0.5 đến 1 điểm so với năm ngoái.",
      "Tuy nhiên, sự cạnh tranh ở các chương trình tiên tiến và chất lượng cao vẫn sẽ rất khốc liệt do tỷ lệ chọi cao."
    ]
  },
  {
    id: "news-5",
    title: "Trường Đại học FPT công bố chính sách học bổng 100%",
    excerpt: "Hàng trăm suất học bổng toàn phần đang chờ đón những thí sinh có thành tích học tập xuất sắc và điểm thi Đánh giá năng lực cao.",
    date: "01/07/2026",
    category: "Học bổng",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    university: "Đại học FPT",
    content: [
      "Trường Đại học FPT công bố hàng trăm suất học bổng toàn phần dành cho các tài năng trẻ.",
      "Thí sinh có thể đạt học bổng thông qua nhiều con đường: Đạt giải cao trong kỳ thi học sinh giỏi quốc gia, hoặc tham gia kỳ thi học bổng riêng của trường tổ chức vào tháng 5 hàng năm.",
      "Học bổng bao gồm toàn bộ học phí 4 năm học và có thể cấp thêm sinh hoạt phí đối với các trường hợp đặc biệt."
    ],
    sourceUrl: "https://hanoi.fpt.edu.vn/"
  },
  {
    id: "news-6",
    title: "Những lưu ý quan trọng khi điều chỉnh nguyện vọng trực tuyến",
    excerpt: "Thí sinh chỉ được điều chỉnh nguyện vọng xét tuyển một lần duy nhất. Hãy sử dụng hệ thống thông minh để sắp xếp thứ tự một cách tối ưu nhất.",
    date: "28/06/2026",
    category: "Cẩm nang xét tuyển",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: [
      "Bộ Giáo dục và Đào tạo nhắc nhở thí sinh về quy định xét tuyển mới: mỗi thí sinh chỉ được điều chỉnh nguyện vọng trực tuyến duy nhất một lần trong khoảng thời gian quy định.",
      "Điều này đòi hỏi các thí sinh phải tính toán thật kỹ lưỡng thứ tự ưu tiên. Thí sinh nên đặt nguyện vọng yêu thích nhất lên đầu, tiếp đến là các nguyện vọng an toàn để đảm bảo cơ hội trúng tuyển.",
      "Hãy sử dụng các công cụ hỗ trợ như UniNav để có chiến thuật sắp xếp nguyện vọng thông minh nhất."
    ]
  }
];
