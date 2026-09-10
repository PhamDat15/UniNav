export interface HVNHMajor {
  id: string;
  code: string;
  name: string;
  campus: 'Trụ sở Hà Nội' | 'Phân viện Bắc Ninh' | 'Phân viện Phú Yên' | 'Viện Quốc Tế';
  programType: 'Chuẩn' | 'Chất lượng cao' | 'Liên kết Quốc tế';
  quota: number;
  subjectBlocks: string[]; // ["A00", "A01", "D01", "D07"]
  benchmark2024: number;
  benchmark2025: number;
  benchmarkEarly2025?: number; // Điểm chuẩn học bạ/kết hợp năm ngoái
  methodsApplied: ('PT2' | 'PT3' | 'PT4' | 'PT5')[];
  description: string;
  careerProspects: string[];
}

export const HVNH_MAJORS: HVNHMajor[] = [
  // ==========================================
  // I. TRỤ SỞ CHÍNH HÀ NỘI (CHƯƠNG TRÌNH CHUẨN)
  // ==========================================
  {
    id: "BANK02",
    code: "BANK02",
    name: "Ngân hàng (Chương trình chuẩn)",
    campus: "Trụ sở Hà Nội",
    programType: "Chuẩn",
    quota: 450,
    subjectBlocks: ["A00", "A01", "D01", "D07"],
    benchmark2024: 26.20,
    benchmark2025: 25.62,
    benchmarkEarly2025: 27.60,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Ngành mũi nhọn truyền thống của HVNH, đào tạo chuyên sâu về nghiệp vụ ngân hàng thương mại, tín dụng, thanh toán quốc tế và quản trị ngân hàng hiện đại.",
    careerProspects: ["Chuyên viên QHKH doanh nghiệp/cá nhân", "Thẩm định tín dụng", "Thanh toán quốc tế & Ngoại hối"]
  },
  {
    id: "FSC01",
    code: "FSC01",
    name: "Tài chính (Chương trình chuẩn)",
    campus: "Trụ sở Hà Nội",
    programType: "Chuẩn",
    quota: 380,
    subjectBlocks: ["A00", "A01", "D01", "D07"],
    benchmark2024: 26.35,
    benchmark2025: 25.70,
    benchmarkEarly2025: 27.80,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Đào tạo chuyên sâu về tài chính doanh nghiệp, thị trường chứng khoán, định giá tài sản, quản lý quỹ và ngân sách công.",
    careerProspects: ["Chuyên viên phân tích tài chính doanh nghiệp", "Môi giới & Quản lý quỹ đầu tư chứng khoán", "Chuyên viên thẩm định giá"]
  },
  {
    id: "FIN02",
    code: "FIN02",
    name: "Công nghệ tài chính (Fintech)",
    campus: "Trụ sở Hà Nội",
    programType: "Chuẩn",
    quota: 160,
    subjectBlocks: ["A00", "A01", "D01", "D07"],
    benchmark2024: 26.80,
    benchmark2025: 26.15,
    benchmarkEarly2025: 28.10,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Sự kết hợp giữa công nghệ cao (AI, Blockchain, Big Data) và tài chính ngân hàng số, đón đầu xu hướng số hóa định chế tài chính.",
    careerProspects: ["Product Owner sản phẩm số ngân hàng", "Kỹ sư dữ liệu tài chính", "Chuyên viên bảo mật & ví điện tử"]
  },
  {
    id: "ACT02",
    code: "ACT02",
    name: "Kế toán (Chương trình chuẩn)",
    campus: "Trụ sở Hà Nội",
    programType: "Chuẩn",
    quota: 360,
    subjectBlocks: ["A00", "A01", "D01", "D07"],
    benchmark2024: 26.05,
    benchmark2025: 25.83,
    benchmarkEarly2025: 27.50,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Cung cấp nền tảng vững chắc về kế toán tài chính, kế toán quản trị, chuẩn mực kế toán Việt Nam (VAS) và quốc tế (IFRS).",
    careerProspects: ["Kế toán tổng hợp doanh nghiệp", "Kiểm soát tài chính", "Kế toán viên ngân hàng"]
  },
  {
    id: "ACT04",
    code: "ACT04",
    name: "Kiểm toán (Chương trình chuẩn)",
    campus: "Trụ sở Hà Nội",
    programType: "Chuẩn",
    quota: 140,
    subjectBlocks: ["A00", "A01", "D01", "D07"],
    benchmark2024: 26.40,
    benchmark2025: 26.06,
    benchmarkEarly2025: 27.90,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Trang bị phương pháp kiểm toán báo cáo tài chính, kiểm toán nội bộ, quản trị rủi ro và tuân thủ cho các tập đoàn và ngân hàng.",
    careerProspects: ["Kiểm toán viên độc lập (Big4)", "Chuyên viên kiểm toán nội bộ", "Tư vấn thuế & rủi ro"]
  },
  {
    id: "IB01",
    code: "IB01",
    name: "Kinh doanh quốc tế",
    campus: "Trụ sở Hà Nội",
    programType: "Chuẩn",
    quota: 220,
    subjectBlocks: ["A00", "A01", "D01", "D07"],
    benchmark2024: 26.75,
    benchmark2025: 26.61,
    benchmarkEarly2025: 28.30,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Ngành có điểm chuẩn cao nhất nhóm kinh tế, đào tạo giao thương quốc tế, thanh toán mậu dịch, chuỗi cung ứng và thương mại điện tử xuyên biên giới.",
    careerProspects: ["Chuyên viên xuất nhập khẩu (XNK)", "Quản lý logistics quốc tế", "Đại diện thương mại đa quốc gia"]
  },
  {
    id: "BUS02",
    code: "BUS02",
    name: "Quản trị kinh doanh (Chương trình chuẩn)",
    campus: "Trụ sở Hà Nội",
    programType: "Chuẩn",
    quota: 260,
    subjectBlocks: ["A00", "A01", "D01", "D07"],
    benchmark2024: 26.15,
    benchmark2025: 25.40,
    benchmarkEarly2025: 27.30,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Đào tạo tư duy chiến lược, quản trị vận hành, nhân sự và khởi nghiệp đổi mới sáng tạo trong thời đại số.",
    careerProspects: ["Chuyên viên phát triển kinh doanh", "Quản trị dự án", "Khởi nghiệp / Start-up founder"]
  },
  {
    id: "BUS07",
    code: "BUS07",
    name: "Marketing",
    campus: "Trụ sở Hà Nội",
    programType: "Chuẩn",
    quota: 180,
    subjectBlocks: ["A00", "A01", "D01", "D07"],
    benchmark2024: 26.60,
    benchmark2025: 25.56,
    benchmarkEarly2025: 28.00,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Đào tạo Digital Marketing, xây dựng thương hiệu, nghiên cứu hành vi khách hàng và tối ưu chiến dịch tiếp thị đa kênh.",
    careerProspects: ["Brand Executive / Manager", "Digital Marketing Specialist", "Content & Truyền thông quảng cáo"]
  },
  {
    id: "LOG01",
    code: "LOG01",
    name: "Logistics & Quản lý chuỗi cung ứng",
    campus: "Trụ sở Hà Nội",
    programType: "Chuẩn",
    quota: 160,
    subjectBlocks: ["A00", "A01", "D01", "D07"],
    benchmark2024: 26.70,
    benchmark2025: 26.25,
    benchmarkEarly2025: 28.15,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Quy trình vận hành kho bãi, vận tải đa phương thức quốc tế, ứng dụng công nghệ IoT và AI vào điều phối chuỗi cung ứng.",
    careerProspects: ["Chuyên viên quản trị chuỗi cung ứng", "Điều hành kho vận - cảng biển", "Forwarder & Khai báo hải quan"]
  },
  {
    id: "LAW01",
    code: "LAW01",
    name: "Luật kinh tế",
    campus: "Trụ sở Hà Nội",
    programType: "Chuẩn",
    quota: 180,
    subjectBlocks: ["A00", "A01", "C00", "D01"],
    benchmark2024: 28.13,
    benchmark2025: 26.50,
    benchmarkEarly2025: 28.80,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Luôn nằm trong top đầu điểm chuẩn, chuyên sâu về pháp luật chứng khoán, ngân hàng, sở hữu trí tuệ và giải quyết tranh chấp thương mại.",
    careerProspects: ["Luật sư thương mại / tài chính", "Pháp chế ngân hàng & tập đoàn", "Thẩm định pháp lý hợp đồng"]
  },
  {
    id: "MIS01",
    code: "MIS01",
    name: "Hệ thống thông tin quản lý",
    campus: "Trụ sở Hà Nội",
    programType: "Chuẩn",
    quota: 160,
    subjectBlocks: ["A00", "A01", "D01", "D07"],
    benchmark2024: 26.10,
    benchmark2025: 25.30,
    benchmarkEarly2025: 27.40,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Giao thoa công nghệ và kinh doanh: Phân tích nghiệp vụ (BA), quản trị dữ liệu lớn và triển khai hệ thống ERP, Core Banking.",
    careerProspects: ["Business Analyst (BA)", "Quản trị cơ sở dữ liệu", "Chuyên viên triển khai phần mềm ngân hàng"]
  },
  {
    id: "IT01",
    code: "IT01",
    name: "Công nghệ thông tin",
    campus: "Trụ sở Hà Nội",
    programType: "Chuẩn",
    quota: 180,
    subjectBlocks: ["A00", "A01", "D01", "D07"],
    benchmark2024: 26.40,
    benchmark2025: 25.70,
    benchmarkEarly2025: 27.80,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Kỹ thuật phần mềm, an toàn thông tin mạng ngân hàng số, điện toán đám mây và phát triển ứng dụng di động tài chính.",
    careerProspects: ["Software Engineer", "Fullstack Developer", "Kỹ sư an ninh mạng tài chính"]
  },
  {
    id: "DS01",
    code: "DS01",
    name: "Khoa học dữ liệu trong kinh tế và kinh doanh",
    campus: "Trụ sở Hà Nội",
    programType: "Chuẩn",
    quota: 120,
    subjectBlocks: ["A00", "A01", "D01", "D07"],
    benchmark2024: 26.30,
    benchmark2025: 25.00,
    benchmarkEarly2025: 27.50,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Ứng dụng Machine Learning, xử lý dữ liệu lớn (Big Data) và thuật toán dự báo kinh tế lượng phục vụ ra quyết định kinh doanh.",
    careerProspects: ["Data Scientist", "Data Analyst", "Chuyên gia trí tuệ nhân tạo (AI) ứng dụng"]
  },
  {
    id: "ENG01",
    code: "ENG01",
    name: "Ngôn ngữ Anh",
    campus: "Trụ sở Hà Nội",
    programType: "Chuẩn",
    quota: 200,
    subjectBlocks: ["D01", "D07", "D09", "D10"],
    benchmark2024: 26.25,
    benchmark2025: 25.35,
    benchmarkEarly2025: 27.40,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Tiếng Anh chuyên ngành tài chính ngân hàng, thương mại quốc tế, biên phiên dịch kinh tế và đàm phán hợp đồng song phương.",
    careerProspects: ["Biên/Phiên dịch viên kinh tế", "Đối ngoại & Hợp tác quốc tế", "Chuyên viên truyền thông quốc tế"]
  },
  {
    id: "ECON01",
    code: "ECON01",
    name: "Kinh tế đầu tư",
    campus: "Trụ sở Hà Nội",
    programType: "Chuẩn",
    quota: 130,
    subjectBlocks: ["A00", "A01", "D01", "D07"],
    benchmark2024: 26.00,
    benchmark2025: 25.35,
    benchmarkEarly2025: 27.10,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Thẩm định dự án đầu tư công và tư, quản trị vốn đầu tư mạo hiểm (VC), tài chính phát triển và phân tích kinh tế vĩ mô.",
    careerProspects: ["Chuyên viên thẩm định dự án đầu tư", "Quản lý danh mục đầu tư", "Chuyên viên hoạch định chính sách kinh tế"]
  },

  // ==========================================
  // II. CHƯƠNG TRÌNH CHẤT LƯỢNG CAO (CLC)
  // ==========================================
  {
    id: "BANK01",
    code: "BANK01",
    name: "Ngân hàng (Chất lượng cao)",
    campus: "Trụ sở Hà Nội",
    programType: "Chất lượng cao",
    quota: 180,
    subjectBlocks: ["A00", "A01", "D01", "D07"],
    benchmark2024: 26.45,
    benchmark2025: 25.75,
    benchmarkEarly2025: 27.90,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Đào tạo bằng tiếng Anh với chuẩn đầu ra quốc tế, kết hợp thực hành hệ thống Core Banking giả lập và kỹ năng lãnh đạo.",
    careerProspects: ["Quản trị viên tập sự (Management Trainee) ngân hàng", "Chuyên viên thanh toán quốc tế", "CFO tương lai"]
  },
  {
    id: "FIN01",
    code: "FIN01",
    name: "Tài chính (Chất lượng cao)",
    campus: "Trụ sở Hà Nội",
    programType: "Chất lượng cao",
    quota: 160,
    subjectBlocks: ["A00", "A01", "D01", "D07"],
    benchmark2024: 26.60,
    benchmark2025: 25.90,
    benchmarkEarly2025: 28.00,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Tích hợp chứng chỉ phân tích tài chính CFA, đào tạo chuyên sâu về tài chính doanh nghiệp toàn cầu và quản trị rủi ro cấp cao.",
    careerProspects: ["Chuyên viên định chế tài chính quốc tế", "Chuyên viên phân tích đầu tư CFA", "Giám đốc tài chính"]
  },
  {
    id: "ACT01",
    code: "ACT01",
    name: "Kế toán (Chất lượng cao)",
    campus: "Trụ sở Hà Nội",
    programType: "Chất lượng cao",
    quota: 140,
    subjectBlocks: ["A00", "A01", "D01", "D07"],
    benchmark2024: 26.35,
    benchmark2025: 25.65,
    benchmarkEarly2025: 27.70,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Tích hợp trực tiếp chứng chỉ quốc tế ACCA (Anh Quốc) được miễn giảm nhiều môn thi, chuẩn đầu ra tiếng Anh vượt trội.",
    careerProspects: ["Kiểm toán viên Big4 (PwC, EY, KPMG, Deloitte)", "Kế toán trưởng công ty đa quốc gia", "Tư vấn thuế quốc tế"]
  },
  {
    id: "BUS01",
    code: "BUS01",
    name: "Quản trị kinh doanh (Chất lượng cao)",
    campus: "Trụ sở Hà Nội",
    programType: "Chất lượng cao",
    quota: 120,
    subjectBlocks: ["A00", "A01", "D01", "D07"],
    benchmark2024: 26.40,
    benchmark2025: 25.70,
    benchmarkEarly2025: 27.80,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Rèn luyện tư duy lãnh đạo toàn cầu, kỹ năng giải quyết tình huống kinh doanh thực chiến (Case Study chuẩn Harvard).",
    careerProspects: ["Management Trainee tập đoàn FDI", "Chuyên viên tư vấn chiến lược", "Quản lý dự án quốc tế"]
  },
  {
    id: "ACT03_JP",
    code: "ACT03_JP",
    name: "Kế toán (Định hướng Nhật Bản)",
    campus: "Trụ sở Hà Nội",
    programType: "Chất lượng cao",
    quota: 80,
    subjectBlocks: ["A00", "A01", "D01", "D07"],
    benchmark2024: 25.80,
    benchmark2025: 24.90,
    benchmarkEarly2025: 26.80,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Hợp tác đào tạo tiếng Nhật từ N5 - N2 kết hợp chuẩn kế toán Nhật Bản, cam kết thực tập và cơ hội việc làm trực tiếp tại Nhật Bản.",
    careerProspects: ["Kế toán doanh nghiệp Nhật Bản tại VN/Nhật", "Chuyên viên cầu nối kinh tế Việt - Nhật", "Biên dịch viên kế toán"]
  },

  // ==========================================
  // III. CỬ NHÂN QUỐC TẾ LIÊN KẾT (VIỆN ISBA)
  // ==========================================
  {
    id: "ISBA_UWE_FIN",
    code: "ISBA_UWE_FIN",
    name: "Tài chính - Ngân hàng (Liên kết ĐH UWE Bristol, Anh)",
    campus: "Viện Quốc Tế",
    programType: "Liên kết Quốc tế",
    quota: 90,
    subjectBlocks: ["A00", "A01", "D01", "D07"],
    benchmark2024: 22.50,
    benchmark2025: 21.80,
    benchmarkEarly2025: 23.50,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Chương trình song bằng cấp bởi Đại học West of England (Anh Quốc), 100% tiếng Anh, cơ hội chuyển tiếp năm cuối sang Anh.",
    careerProspects: ["Chuyên viên ngân hàng quốc tế", "Làm việc tại các tập đoàn tài chính đa quốc gia", "Học bổng thạc sĩ nước ngoài"]
  },
  {
    id: "ISBA_UWE_BUS",
    code: "ISBA_UWE_BUS",
    name: "Quản trị kinh doanh (Liên kết ĐH UWE Bristol, Anh)",
    campus: "Viện Quốc Tế",
    programType: "Liên kết Quốc tế",
    quota: 90,
    subjectBlocks: ["A00", "A01", "D01", "D07"],
    benchmark2024: 22.00,
    benchmark2025: 21.50,
    benchmarkEarly2025: 23.00,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Bằng Cử nhân Cấp bởi ĐH UWE Bristol danh giá của Anh Quốc, đào tạo tư duy khởi nghiệp và quản trị toàn cầu.",
    careerProspects: ["Quản lý phát triển thị trường quốc tế", "Khởi nghiệp kinh doanh toàn cầu", "Chuyên viên marketing quốc tế"]
  },
  {
    id: "ISBA_CITYU",
    code: "ISBA_CITYU",
    name: "Quản trị tài chính (Liên kết ĐH CityU, Hoa Kỳ)",
    campus: "Viện Quốc Tế",
    programType: "Liên kết Quốc tế",
    quota: 70,
    subjectBlocks: ["A00", "A01", "D01", "D07"],
    benchmark2024: 22.00,
    benchmark2025: 21.50,
    benchmarkEarly2025: 23.00,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Hợp tác với City University of Seattle (Hoa Kỳ), đào tạo chuẩn kiểm định chất lượng giáo dục đại học vùng Tây Bắc Hoa Kỳ.",
    careerProspects: ["Phân tích tài chính công ty Mỹ", "Cơ hội làm việc tại thị trường Bắc Mỹ", "Chuyên viên đầu tư"]
  },

  // ==========================================
  // IV. PHÂN VIỆN BẮC NINH (MÃ XÉT TUYỂN: NHB)
  // ==========================================
  {
    id: "BN_BANK",
    code: "7340201_BN",
    name: "Tài chính - Ngân hàng (Phân viện Bắc Ninh)",
    campus: "Phân viện Bắc Ninh",
    programType: "Chuẩn",
    quota: 150,
    subjectBlocks: ["A00", "A01", "D01", "D07"],
    benchmark2024: 22.00,
    benchmark2025: 21.00,
    benchmarkEarly2025: 22.50,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Đào tạo nguồn nhân lực chất lượng cho các ngân hàng và tập đoàn kinh tế trọng điểm vùng thủ đô và tỉnh Bắc Ninh.",
    careerProspects: ["Chuyên viên tín dụng ngân hàng", "Giao dịch viên", "Kế toán tài chính doanh nghiệp"]
  },
  {
    id: "BN_ACT",
    code: "7340301_BN",
    name: "Kế toán (Phân viện Bắc Ninh)",
    campus: "Phân viện Bắc Ninh",
    programType: "Chuẩn",
    quota: 120,
    subjectBlocks: ["A00", "A01", "D01", "D07"],
    benchmark2024: 21.50,
    benchmark2025: 20.80,
    benchmarkEarly2025: 22.00,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Chuyên sâu về nghiệp vụ kế toán doanh nghiệp trong các khu công nghiệp FDI tại Bắc Ninh và các tỉnh phía Bắc.",
    careerProspects: ["Kế toán viên doanh nghiệp FDI", "Kế toán thuế", "Chuyên viên kiểm toán nội bộ"]
  },
  {
    id: "BN_BUS",
    code: "7340101_BN",
    name: "Quản trị kinh doanh (Phân viện Bắc Ninh)",
    campus: "Phân viện Bắc Ninh",
    programType: "Chuẩn",
    quota: 100,
    subjectBlocks: ["A00", "A01", "D01", "D07"],
    benchmark2024: 21.50,
    benchmark2025: 20.50,
    benchmarkEarly2025: 21.80,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Quản trị vận hành chuỗi phân phối, quản lý doanh nghiệp vừa và nhỏ, logistics tại thủ phủ công nghiệp Bắc Ninh.",
    careerProspects: ["Quản lý sản xuất - chuỗi cung ứng", "Chuyên viên kinh doanh", "Quản lý kho vận"]
  },

  // ==========================================
  // V. PHÂN VIỆN PHÚ YÊN (MÃ XÉT TUYỂN: NHP)
  // ==========================================
  {
    id: "PY_BANK",
    code: "7340201_PY",
    name: "Tài chính - Ngân hàng (Phân viện Phú Yên)",
    campus: "Phân viện Phú Yên",
    programType: "Chuẩn",
    quota: 120,
    subjectBlocks: ["A00", "A01", "D01", "D07"],
    benchmark2024: 21.00,
    benchmark2025: 20.20,
    benchmarkEarly2025: 21.50,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Đào tạo tài chính ngân hàng cho khu vực Nam Trung Bộ và Tây Nguyên với mức học phí ưu đãi và nhiều chính sách học bổng.",
    careerProspects: ["Chuyên viên ngân hàng thương mại", "Cán bộ tài chính tín dụng", "Kế toán kho bạc"]
  },
  {
    id: "PY_ACT",
    code: "7340301_PY",
    name: "Kế toán (Phân viện Phú Yên)",
    campus: "Phân viện Phú Yên",
    programType: "Chuẩn",
    quota: 100,
    subjectBlocks: ["A00", "A01", "D01", "D07"],
    benchmark2024: 20.50,
    benchmark2025: 20.20,
    benchmarkEarly2025: 21.00,
    methodsApplied: ["PT2", "PT3", "PT4", "PT5"],
    description: "Cung cấp nhân lực kế toán cho các cơ quan, đơn vị hành chính sự nghiệp và doanh nghiệp tại miền Trung.",
    careerProspects: ["Kế toán viên", "Kiểm soát viên", "Thủ quỹ ngân hàng"]
  }
];
