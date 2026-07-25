import { hustHvnhData } from './hustHvnhData';

export interface Review {
  id: string;
  author: string;
  date: string;
  content: string;
  rating: number; // 1-5 sao
  aspects: {
    teaching: number;
    facilities: number;
    environment: number;
  };
  imageUrl?: string;
  sticker?: string;
}

export interface ScoreCalculation {
  scale: 30 | 40;
  multiplierSubject?: 'toan' | 'van' | 'anh' | 'ly' | 'hoa' | 'sinh' | 'su' | 'dia';
  formulaDescription?: string;
}

export interface UniversityProgram {
  id: string;
  name: string;
  major: string;
  type: string;
  feePerYear: number;
  averageScore: number;
  employmentRate: number;
  academicPressure?: number;
  clubActivities?: number;
  targetTraits?: string[];
  facilities?: number;
  location: string;
  quota?: number;
  historicalScores?: Record<string, number>;
  scoreCalculation?: ScoreCalculation;
  admissionMethods?: string[];
  subjectBlocks?: string[];
  specialExams?: string[];
  talentAdmission?: string;
  talentDetails?: string[];
  priorityPolicies?: string[];
  conversionFormulas?: Record<string, string>;
  priorityDetails?: {
    type: 'ielts' | 'other';
    title: string;
    table: Record<string, string>;
  }[];
  feePerCredit?: number;
  creditsPerSemester?: number;
  credits?: number;
  duration?: number;
  degreeType?: string;
  logoUrl?: string;
  address?: string;
  campusHistory?: string;
  description?: string;
  subMajors?: string[];
  reviews?: Review[];
}

export function hydrateProgram(u: UniversityProgram): UniversityProgram {
  if (u.credits) return u;

  const isAdvanced = u.major.toLowerCase().includes('tiên tiến') || u.major.toLowerCase().includes('chất lượng cao') || u.major.toLowerCase().includes('clc');
  const credits = u.major.includes('Công nghệ') || u.major.includes('Kỹ thuật') || u.name.includes('Bách Khoa') ? 160 : 130;
  const creditsPerSemester = credits === 160 ? 16 : 15;
  
  let feePerCredit = 0;
  if (u.feePerYear) {
    feePerCredit = Math.round((u.feePerYear / 2) / creditsPerSemester);
    // Làm tròn đến hàng chục nghìn (VD: 450,000)
    feePerCredit = Math.round(feePerCredit / 10000) * 10000;
  } else {
    feePerCredit = isAdvanced ? 800000 : 400000;
  }

  // Tiên tiến / CLC có thể đắt gấp đôi
  if (isAdvanced && feePerCredit < 600000) {
    feePerCredit = feePerCredit * 1.5;
    feePerCredit = Math.round(feePerCredit / 10000) * 10000;
  }

  const feePerYear = feePerCredit * creditsPerSemester * 2;
  
  const mappings: Record<string, { logoUrl: string, address: string, campusHistory: string, trainingStyle?: string }> = {
    'Bách Khoa': {
      logoUrl: '/logos/' + encodeURIComponent('Logo ĐH Bách Khoa Hà Nội-HUST.png'),
      address: 'Trụ sở chính: Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội.',
      campusHistory: 'ĐHBK Hà Nội chỉ có 1 cơ sở duy nhất với khuôn viên rộng lớn 26ha nằm ngay trung tâm Thủ đô. Sinh viên học 100% tại đây trong suốt 4-5 năm học.'
    , trainingStyle: 'Môi trường học thuật khắt khe, đề cao thực hành lab chuyên sâu và tư duy logic kỹ thuật, rèn luyện bản lĩnh sinh viên qua cường độ học tập cao.'
    },
    'Ngoại Thương': {
      logoUrl: '/logos/' + encodeURIComponent('Logo ĐH Ngoại Thương - FTU.png'),
      address: 'Trụ sở chính: Số 91 Chùa Láng, Đống Đa, Hà Nội.\nCơ sở 2: Phường 25, Bình Thạnh, TP.HCM.\nCơ sở Quảng Ninh: Uông Bí, Quảng Ninh.',
      campusHistory: 'Sinh viên trúng tuyển cơ sở nào sẽ học 100% tại cơ sở đó. Trụ sở chính tại Chùa Láng (Hà Nội) nổi tiếng với vị trí đắc địa, mệnh danh là "Phố Wall của sinh viên".'
    , trainingStyle: 'Nổi tiếng với môi trường năng động bậc nhất, phong trào ngoại khóa mạnh mẽ giúp sinh viên tự tin, linh hoạt và hội nhập toàn cầu.'
    },
    'Ngoại thương': {
      logoUrl: '/logos/' + encodeURIComponent('Logo ĐH Ngoại Thương - FTU.png'),
      address: 'Trụ sở chính: Số 91 Chùa Láng, Đống Đa, Hà Nội.\nCơ sở 2: Phường 25, Bình Thạnh, TP.HCM.\nCơ sở Quảng Ninh: Uông Bí, Quảng Ninh.',
      campusHistory: 'Sinh viên trúng tuyển cơ sở nào sẽ học 100% tại cơ sở đó. Trụ sở chính tại Chùa Láng (Hà Nội) nổi tiếng với vị trí đắc địa, mệnh danh là "Phố Wall của sinh viên".'
    , trainingStyle: 'Nổi tiếng với môi trường năng động bậc nhất, phong trào ngoại khóa mạnh mẽ giúp sinh viên tự tin, linh hoạt và hội nhập toàn cầu.'
    },
    'Bưu chính Viễn thông': {
      logoUrl: '/logos/' + encodeURIComponent('Logo Học Viện Công Nghệ Bưu Chính Viễn Thông - PTIT.png'),
      address: 'Cơ sở Phía Bắc: Km10, Đường Nguyễn Trãi, Q.Hà Đông, Hà Nội.\nCơ sở Phía Nam: Q1 & TP Thủ Đức, TP.HCM.',
      campusHistory: 'PTIT có 2 cơ sở (Bắc và Nam). Thí sinh thi vào cơ sở nào sẽ học cố định ở cơ sở đó. Cơ sở Hà Nội nằm giáp ranh Thanh Xuân và Hà Đông.'
    , trainingStyle: 'Môi trường học tập chú trọng ứng dụng thực tiễn, kết nối chặt chẽ với các doanh nghiệp công nghệ số và viễn thông hàng đầu.'
    },
    'Kinh tế Quốc dân': {
      logoUrl: '/logos/' + encodeURIComponent('Logo ĐH Kinh Tế Quốc Dân-NEU.png'),
      address: 'Trụ sở chính: Số 207 Giải Phóng, Đồng Tâm, Hai Bà Trưng, Hà Nội.',
      campusHistory: 'NEU chỉ có 1 cơ sở đào tạo duy nhất. Nổi bật với Tòa nhà Thế kỷ (A2) hiện đại bậc nhất Đông Nam Á, sinh viên không cần phải di chuyển giữa các cơ sở.'
    , trainingStyle: 'Chú trọng đào tạo tư duy quản lý vĩ mô, khả năng lãnh đạo, và sở hữu mạng lưới cựu sinh viên doanh nhân sâu rộng.'
    },
    'Công nghiệp': {
      logoUrl: '/logos/' + encodeURIComponent('Logo ĐH Công nghiệp Hà Nội.png'),
      address: 'Cơ sở 1: Số 298 Cầu Diễn, Bắc Từ Liêm, Hà Nội.\nCơ sở 2: Phường Tây Tựu, Bắc Từ Liêm, Hà Nội.\nCơ sở 3: TP. Phủ Lý, Tỉnh Hà Nam.',
      campusHistory: 'Sinh viên Đại học Công nghiệp (HaUI) thường học 1-2 năm đầu ở cơ sở Hà Nam để học các môn đại cương và GDQP, sau đó chuyển về cơ sở chính tại Hà Nội để học chuyên ngành.'
    , trainingStyle: 'Đào tạo kỹ sư thực hành với hệ thống xưởng hiện đại, kết nối chặt chẽ với doanh nghiệp sản xuất FDI.'
    },
    'Giao thông': {
      logoUrl: '/logos/' + encodeURIComponent('Logo Đại Học Giao Thông Vận Tải - UTC.png'),
      address: 'Trụ sở chính: Số 3 phố Cầu Giấy, Láng Thượng, Đống Đa, Hà Nội.\nPhân hiệu: Lê Văn Việt, TP Thủ Đức, TP.HCM.',
      campusHistory: 'UTC có 2 cơ sở (Hà Nội và TP.HCM). Tại Hà Nội, sinh viên học 100% thời gian tại cơ sở chính ở Cầu Giấy (ngay sát Đại học Luật và ĐH Ngoại thương).'
    , trainingStyle: 'Truyền thống lâu đời, chú trọng đào tạo nguồn nhân lực kỹ thuật hạ tầng và quản lý vận tải vững vàng chuyên môn.'
    },
    'FPT': {
      logoUrl: '/logos/' + encodeURIComponent('Logo Đại học FPT.png'),
      address: 'Hà Nội: Khu CNC Hòa Lạc, Thạch Thất.\nTP.HCM: Lô E2a-7, Khu Công nghệ cao, TP Thủ Đức.\nNgoài ra có cơ sở tại Đà Nẵng, Cần Thơ, Quy Nhơn.',
      campusHistory: 'Mô hình học tập nội trú tại cơ sở Hòa Lạc (Hà Nội) rộng tới 30ha. Học kỳ thực tập thực tế (OJT) có thể diễn ra tại bất kỳ chi nhánh FPT Software nào trên toàn quốc.'
    , trainingStyle: 'Môi trường quốc tế, chương trình học hoàn toàn bằng tiếng Anh và có 1 kỳ thực tập thực tế (OJT) tại doanh nghiệp bắt buộc.'
    },
    'Ngân hàng': {
      logoUrl: '/logos/' + encodeURIComponent('Logo Học Viện Ngân Hàng - HVNH.png'),
      address: 'Trụ sở chính: Số 12 Chùa Bộc, Đống Đa, Hà Nội.\nPhân viện: Tuy Hòa (Phú Yên) & Suối Hoa (Bắc Ninh).\nCơ sở Sơn Tây: TX. Sơn Tây, Hà Nội.',
      campusHistory: 'Đối với sinh viên học tại Hà Nội, hầu như 100% thời gian sẽ học tại cơ sở chính Chùa Bộc (vị trí đắc địa trung tâm thủ đô). Các phân viện khác tuyển sinh bằng mã riêng.'
    , trainingStyle: 'Môi trường học thuật chuyên nghiệp, kỷ luật, liên kết chặt chẽ với hệ thống ngân hàng thương mại và tài chính quốc gia.'
    },
    'Tài chính': {
      logoUrl: '/logos/' + encodeURIComponent('Logo Học Viện Tài Chính - AOF.png'),
      address: 'Trụ sở chính: Số 58 Lê Văn Hiến, Đức Thắng, Bắc Từ Liêm, HN.\nCơ sở 2: Số 162 Nguyễn Văn Cừ, Long Biên, HN.',
      campusHistory: 'Phần lớn sinh viên học tại khu vực Đông Ngạc (Bắc Từ Liêm), nơi tập trung đông đảo sinh viên Học viện Tài chính và ĐH Mỏ Địa chất tạo nên cộng đồng lớn.'
    , trainingStyle: 'Đào tạo bám sát thực tiễn tài chính - kế toán, rèn luyện sinh viên tính cẩn thận, chính xác và có chuyên môn nghiệp vụ sắc bén.'
    },
    'Công nghệ - ĐHQGHN': {
      logoUrl: '/logos/' + encodeURIComponent('Logo ĐH Công Nghệ-UET.png'),
      address: 'Cơ sở chính: Tòa nhà E3, 144 Xuân Thủy, Cầu Giấy, Hà Nội.\nCơ sở Hòa Lạc: Khu đô thị ĐHQGHN tại Thạch Thất.',
      campusHistory: 'Từ năm 2022, ĐHQGHN bắt đầu đưa sinh viên lên Hòa Lạc. Nhiều ngành của UET sẽ có thời gian học đại cương hoặc học kỳ đầu tại Hòa Lạc, sau đó về Xuân Thủy.'
    , trainingStyle: 'Môi trường nghiên cứu chuyên sâu, giảng viên là các chuyên gia đầu ngành, chú trọng vào các công nghệ lõi và đón đầu xu hướng toàn cầu.'
    },
    'Khoa học Tự nhiên': {
      logoUrl: '/logos/' + encodeURIComponent('Logo ĐH Khoa Học Tự Nhiên Hà Nội-VNU-HUS.png'),
      address: 'CS1: 334 Nguyễn Trãi, Thanh Xuân.\nCS2: 19 Lê Thánh Tông, Hoàn Kiếm.\nCS3 (KTX): 182 Lương Thế Vinh.',
      campusHistory: 'Tùy thuộc vào khoa đào tạo mà sinh viên sẽ học tại cơ sở Nguyễn Trãi (khoa Toán, Hóa, Sinh) hoặc cơ sở Lê Thánh Tông mang kiến trúc Đông Dương (khoa Vật Lý).'
    , trainingStyle: 'Cái nôi của khoa học cơ bản, nơi sinh viên được rèn luyện tư duy phân tích sâu sắc qua các công trình nghiên cứu và phòng thí nghiệm chuyên nghiệp.'
    },
    'Y Hà Nội': {
      logoUrl: '/logos/' + encodeURIComponent('Logo Trường Đại Học Y Hà Nội.png'),
      address: 'Cơ sở chính: Số 1 Tôn Thất Tùng, Đống Đa, Hà Nội.\nPhân hiệu Thanh Hóa: Phường Đông Vệ, TP. Thanh Hóa.',
      campusHistory: 'Học lý thuyết tại cơ sở Tôn Thất Tùng và thực hành lâm sàng liên tục tại hệ thống các bệnh viện tuyến đầu (Bạch Mai, Việt Đức, Phụ sản...).'
    , trainingStyle: 'Rèn luyện sinh viên qua những ca trực đêm vất vả, thực hành lâm sàng liên tục tại các bệnh viện tuyến trung ương với áp lực cao.'
    },
    'Thủy Lợi': {
      logoUrl: '/logos/' + encodeURIComponent('Logo ĐH Thủy Lợi.png'),
      address: 'Cơ sở chính: 175 Tây Sơn, Đống Đa, HN.\nCơ sở Phố Hiến: Tiên Lữ, Hưng Yên.\nCơ sở miền Nam: TP.HCM & Bình Dương.',
      campusHistory: 'Tại Hà Nội, sinh viên học 100% tại cơ sở Tây Sơn rộng lớn, nổi tiếng với hệ thống sân bóng đá tuyệt đẹp và bể bơi tiêu chuẩn trong nhà.'
    , trainingStyle: 'Đào tạo kỹ sư đa ngành vững chuyên môn, sinh viên năng động, giỏi thể thao và gắn bó mật thiết với các dự án kỹ thuật hạ tầng, môi trường.'
    },
    'Xây dựng': {
      logoUrl: '/logos/' + encodeURIComponent('Logo ĐH Xây Dựng Hà Nội - NUCE.png'),
      address: 'Trụ sở duy nhất: 55 Giải Phóng, Đồng Tâm, Hai Bà Trưng, Hà Nội.',
      campusHistory: 'HUCE chỉ có 1 cơ sở duy nhất, nằm cùng trục đường với Đại học Bách Khoa và Kinh tế Quốc dân, tạo nên liên minh Bách - Kinh - Xây sầm uất.'
    , trainingStyle: 'Môi trường học tập nam tính, tự do sáng tạo trong thiết kế và nghiêm ngặt trong kỹ thuật thi công, đào tạo ra những kỹ sư bền bỉ.'
    },
    'Mỏ': {
      logoUrl: '/logos/' + encodeURIComponent('Logo ĐH Mỏ - Địa Chất - HUMG.png'),
      address: 'Trụ sở chính: Số 18 Phố Viên, Đức Thắng, Bắc Từ Liêm, HN.\nCơ sở Quảng Ninh: Uông Bí, Quảng Ninh.\nCơ sở Vũng Tàu: Phường 11, TP Vũng Tàu.',
      campusHistory: 'Sinh viên tại Hà Nội học tập trung ở cơ sở Cổ Nhuế (Bắc Từ Liêm). Khuôn viên rộng lớn, được bao phủ bởi nhiều cây xanh và khí hậu thoáng đãng.'
    , trainingStyle: 'Môi trường thân thiện, rèn luyện sự bền bỉ qua các chuyến đi thực địa thực tế, trang bị kiến thức chuyên sâu về công nghệ và khoa học trái đất.'
    },
    'Thương mại': {
      logoUrl: '/logos/' + encodeURIComponent('Logo ĐH Thương Mại - TMU.png'),
      address: 'Cơ sở chính: 79 Hồ Tùng Mậu, Cầu Giấy, Hà Nội.\nCơ sở 2: Khu đại học Nam Cao, Phủ Lý, Hà Nam.',
      campusHistory: 'Gần như toàn bộ sinh viên TMU học 100% tại cơ sở Hồ Tùng Mậu với hệ thống giảng đường cực kỳ hiện đại, liên tục được cải tạo và nâng cấp đạt chuẩn.'
    , trainingStyle: 'Đào tạo kỹ năng thực chiến kinh doanh, marketing; sinh viên TMU nổi tiếng năng động và linh hoạt với mọi thay đổi của thị trường.'
    },
    'Đại học Hà Nội': {
      logoUrl: '/logos/' + encodeURIComponent('Logo ĐH Hà Nội-HANU.png'),
      address: 'Cơ sở duy nhất: Km 9, đường Nguyễn Trãi, Nam Từ Liêm, Hà Nội.',
      campusHistory: 'Trường chỉ có 1 cơ sở duy nhất. Khuôn viên rợp bóng cây, mang nhiều nét kiến trúc cổ điển, là nơi giao lưu của rất nhiều sinh viên quốc tế đến từ khắp nơi.'
    , trainingStyle: 'Môi trường học tập 100% ngoại ngữ, đa văn hóa, là bệ phóng cho các công dân toàn cầu với mạng lưới đối tác quốc tế cực mạnh.'
    },
    'Báo chí': {
      logoUrl: '/logos/' + encodeURIComponent('Logo Học Viện Báo Chí Và Tuyên Truyền New.png'),
      address: 'Trụ sở duy nhất: 36 Xuân Thủy, Cầu Giấy, Hà Nội.',
      campusHistory: 'Chỉ có 1 cơ sở đào tạo duy nhất. Nổi tiếng là môi trường cực kỳ năng động với hàng loạt câu lạc bộ lớn mạnh, sự kiện truyền thông diễn ra suốt 4 năm học.'
    , trainingStyle: 'Cái nôi của giới truyền thông, môi trường bùng nổ sự kiện, tự do sáng tạo và rèn luyện bản lĩnh chính trị, đạo đức nghề báo vững vàng.'
    },
    'Sư phạm Hà Nội': {
      logoUrl: '/logos/' + encodeURIComponent('Logo Đại học Sư phạm Hà Nội - HNUE.png'),
      address: 'Trụ sở chính: 136 Xuân Thủy, Cầu Giấy, Hà Nội.',
      campusHistory: 'Chỉ có 1 cơ sở đào tạo (Trường THPT Chuyên Sư phạm nằm chung khuôn viên). Khuôn viên xanh mát, mộng mơ với con đường tình yêu nổi tiếng.'
    , trainingStyle: 'Đào tạo những nhà giáo chuẩn mực, môi trường sư phạm thanh lịch, rèn luyện kỹ năng truyền đạt và nuôi dưỡng lòng yêu nghề sâu sắc.'
    },
    'Sân khấu': {
      logoUrl: 'https://www.google.com/s2/favicons?domain=skda.edu.vn&sz=128',
      address: 'Trụ sở chính: Khu văn hóa nghệ thuật, Mai Dịch, Cầu Giấy, Hà Nội.',
      campusHistory: 'Cái nôi đào tạo nghệ thuật hàng đầu với cơ sở vật chất chuyên biệt cho điện ảnh và sân khấu. Các môn thực hành diễn xuất học trực tiếp tại phim trường.'
    , trainingStyle: 'Môi trường nghệ thuật chuyên biệt, tự do phá cách, sinh viên được rèn luyện kỹ năng diễn xuất và tư duy làm nghệ thuật thực chiến.'
    },
    'Ngoại Giao': {
      logoUrl: '/logos/' + encodeURIComponent('Logo Học Viện Ngoại Giao-DAV.png'),
      address: 'Cơ sở chính: 69 Chùa Láng, Đống Đa, Hà Nội',
      campusHistory: 'Học tại Chùa Láng, môi trường năng động của sinh viên quốc tế.'
    , trainingStyle: 'Môi trường đào tạo tinh hoa, rèn luyện phong thái ngoại giao chuẩn mực, kỹ năng đàm phán và tư duy chính trị sắc sảo.'
    },
    'Kinh Tế - ĐHQGHN': {
      logoUrl: '/logos/' + encodeURIComponent('Logo Đại Học Kinh Tế, Đại Học Quốc Gia Hà Nội - UEB.png'),
      address: '144 Xuân Thủy, Cầu Giấy, Hà Nội',
      campusHistory: 'Trực thuộc ĐHQGHN, môi trường hiện đại.'
    , trainingStyle: 'Mô hình giáo dục chuẩn quốc tế, tư duy kinh tế hiện đại, chú trọng nghiên cứu và ứng dụng trong các tập đoàn đa quốc gia.'
    },
    'Mật Mã': {
      logoUrl: '/logos/' + encodeURIComponent('Logo Học Viện Kỹ Thuật Mật Mã - ACTVN.png'),
      address: 'Cơ sở chính: Tân Triều, Thanh Trì, Hà Nội',
      campusHistory: 'Học viện quân đội đặc biệt.'
    , trainingStyle: 'Môi trường quân đội nghiêm kỷ luật, bảo mật cao, đào tạo những chuyên gia an toàn thông tin và an ninh mạng hàng đầu quốc gia.'
    }
  };

  let logoUrl = 'https://www.google.com/s2/favicons?domain=moet.gov.vn&sz=128';
  let address = 'Đang cập nhật địa chỉ...';
  let campusHistory = 'Đang cập nhật thông tin cơ sở...';

  const matchedKey = Object.keys(mappings).find(key => u.name.includes(key));
  if (matchedKey) {
    logoUrl = mappings[matchedKey].logoUrl;
    address = mappings[matchedKey].address;
    campusHistory = mappings[matchedKey].campusHistory;
  }

  // 1. Identify Training Style
  let trainingStyle = '';
  if (matchedKey && mappings[matchedKey].trainingStyle) {
    trainingStyle = '\n\nĐặc biệt tại đây, ' + mappings[matchedKey].trainingStyle.toLowerCase();
  } else {
    // Fallback based on type
    trainingStyle = u.type === 'Công lập' 
      ? '\n\nTrường có bề dày truyền thống, môi trường học thuật ổn định và mức học phí phù hợp với số đông sinh viên.' 
      : '\n\nTrường nổi bật với cơ sở vật chất hiện đại, chương trình cập nhật liên tục và liên kết chặt chẽ với doanh nghiệp.';
  }

  // 2. Classify Major & Describe
  let baseDescription = 'Ngành học mũi nhọn trang bị cho sinh viên kiến thức chuyên sâu và kỹ năng thực hành xuất sắc, đáp ứng nhu cầu khắt khe của thị trường lao động hiện đại.';
  let subMajors = [`${u.major} chuyên sâu 1`, `${u.major} chuyên sâu 2`];
  const m = u.major.toLowerCase();

  if (m.includes('công nghệ thông tin') || m.includes('phần mềm') || m.includes('dữ liệu') || m.includes('máy tính') || m.includes('it')) {
    baseDescription = 'Sinh viên được trang bị nền tảng vững chắc về Khoa học Máy tính, Cấu trúc dữ liệu và Giải thuật. Các môn học chuyên sâu bao gồm Lập trình Web/App, Trí tuệ Nhân tạo, Học máy (Machine Learning) và An toàn thông tin. Bạn sẽ làm quen với thực tế ngay từ năm 2 qua các đồ án lab thực chiến.';
    subMajors = ['Kỹ thuật Phần mềm', 'Trí tuệ Nhân tạo & Khoa học dữ liệu', 'An toàn Thông tin', 'Mạng máy tính'];
  } else if (m.includes('y khoa') || m.includes('răng hàm mặt') || m.includes('dược') || m.includes('điều dưỡng') || m.includes('y học')) {
    baseDescription = 'Chương trình đào tạo khắt khe với tiêu chuẩn y khoa quốc tế. Sinh viên được học Giải phẫu, Sinh lý học, Dược lý học và thực hành lâm sàng thực tế trên người bệnh. Ngành học đòi hỏi sự chính xác tuyệt đối và y đức cao cả.';
    subMajors = ['Ngoại khoa', 'Nội khoa', 'Dược lâm sàng', 'Quản lý Bệnh viện'];
  } else if (m.includes('luật') || m.includes('pháp lý')) {
    baseDescription = 'Ngành học rèn luyện tư duy phản biện sắc bén và sự nhạy bén với văn bản pháp quy. Sinh viên được học về Luật Dân sự, Hình sự, Thương mại Quốc tế và thực hành diễn án tại các phiên tòa giả định (Mock Trial).';
    subMajors = ['Luật Thương mại Quốc tế', 'Luật Sở hữu trí tuệ', 'Luật Hình sự'];
  } else if (m.includes('sư phạm') || m.includes('giáo dục')) {
    baseDescription = 'Trang bị kiến thức chuyên ngành sâu sắc và phương pháp sư phạm hiện đại. Học viên được rèn luyện kỹ năng đứng lớp, tâm lý học giáo dục và công nghệ dạy học số, chuẩn bị hành trang trở thành những nhà giáo truyền cảm hứng.';
    subMajors = ['Sư phạm tài năng', 'Tâm lý học học đường', 'Quản lý giáo dục'];
  } else if (m.includes('báo chí') || m.includes('truyền thông') || m.includes('quan hệ công chúng') || m.includes('đa phương tiện')) {
    baseDescription = 'Môi trường bùng nổ ý tưởng và sáng tạo không ngừng. Sinh viên học cách sản xuất nội dung số, viết báo cáo, quay dựng video và tổ chức sự kiện quy mô lớn. Sinh viên sẽ trở thành các tay viết, phóng viên, hoặc chuyên gia PR nhạy bén.';
    subMajors = ['Truyền thông Đa phương tiện', 'Tổ chức sự kiện', 'Báo chí điện tử'];
  } else if (m.includes('logistics') || m.includes('chuỗi cung ứng') || m.includes('xuất nhập khẩu')) {
    baseDescription = 'Ngành học bao quát toàn bộ quy trình vận hành luân chuyển hàng hóa toàn cầu. Sinh viên học về Vận tải biển, Quản trị kho bãi, Khai báo Hải quan và Tối ưu hóa hệ thống chuỗi cung ứng bằng dữ liệu lớn (Big Data).';
    subMajors = ['Quản trị Cảng và Vận tải biển', 'Logistics quốc tế', 'Quản trị chuỗi cung ứng xanh'];
  } else if (m.includes('du lịch') || m.includes('khách sạn') || m.includes('lữ hành')) {
    baseDescription = 'Chương trình đào tạo chuẩn quốc tế với các môn nghiệp vụ Nhà hàng, Buồng phòng, Quản trị Sự kiện và Chăm sóc khách hàng 5 sao. Ngành học mở ra cơ hội làm việc tại các chuỗi resort, khách sạn đa quốc gia.';
    subMajors = ['Quản lý Khách sạn Quốc tế', 'Quản trị Lữ hành', 'Tổ chức Sự kiện và MICE'];
  } else if (m.includes('thiết kế') || m.includes('mỹ thuật') || m.includes('kiến trúc') || m.includes('đồ họa')) {
    baseDescription = 'Sự kết hợp hoàn hảo giữa tư duy thẩm mỹ và công nghệ. Sinh viên học các nguyên lý thiết kế, lịch sử mỹ thuật, sử dụng các phần mềm 3D chuyên nghiệp và trực tiếp thực hiện các đồ án thiết kế dân dụng, thương mại.';
    subMajors = ['Thiết kế UI/UX', 'Kiến trúc xanh', 'Thiết kế thời trang', 'Đồ họa 3D'];
  } else if (m.includes('kinh tế') || m.includes('quản trị') || m.includes('tài chính') || m.includes('kế toán') || m.includes('thương mại') || m.includes('marketing')) {
    baseDescription = 'Ngành học cung cấp tư duy kinh doanh nhạy bén. Sinh viên học các nguyên lý Vĩ mô - Vi mô, Quản trị nhân sự, Tài chính doanh nghiệp và Phân tích thị trường. Các case-study thực tế được đưa vào giảng dạy để giải quyết bài toán kinh doanh.';
    subMajors = ['Quản trị Doanh nghiệp', 'Tài chính - Ngân hàng đầu tư', 'Marketing Kỹ thuật số', 'Kiểm toán quốc tế'];
  } else if (m.includes('ngôn ngữ') || m.includes('tiếng')) {
    baseDescription = 'Chương trình đào tạo chuyên sâu về Ngôn ngữ học, Văn hóa và Kỹ năng biên - phiên dịch cấp cao. Ngoài ra sinh viên còn được học thêm về thương mại, kỹ năng đàm phán quốc tế và nghiệp vụ sư phạm để đa dạng hóa cơ hội nghề nghiệp.';
    subMajors = ['Biên Phiên Dịch', 'Ngôn ngữ Thương mại', 'Phương pháp giảng dạy (TESOL)'];
  } else if (m.includes('kỹ thuật') || m.includes('điện') || m.includes('cơ điện tử') || m.includes('ô tô') || m.includes('điều khiển') || m.includes('công nghệ kỹ thuật')) {
    baseDescription = 'Ngành học nặng về Toán, Lý và Thực hành xưởng. Sinh viên được học Thiết kế vi mạch, Lập trình hệ thống nhúng, Tự động hóa và Chế tạo máy CNC. Đây là nơi đào tạo các kỹ sư có khả năng điều hành những dây chuyền sản xuất phức tạp.';
    subMajors = ['Tự động hóa công nghiệp', 'Thiết kế Vi mạch (IC Design)', 'Hệ thống năng lượng'];
  }

  const description = baseDescription + trainingStyle;

  // 3. Complete missing attributes (Quota, scores, traits, statistics) deterministically
  let hash = 0;
  const seedStr = (u.id + (u.major || '')).toLowerCase();
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash * 31 + seedStr.charCodeAt(i)) & 0xffffffff;
  }
  const absHash = Math.abs(hash);

  let quota = u.quota;
  if (!quota || quota === 0) {
    if (m.includes('công nghệ thông tin') || m.includes('máy tính') || m.includes('phần mềm') || m.includes('it') || m.includes('dữ liệu') || m.includes('vi mạch')) {
      const itQuotas = [240, 260, 280, 300, 320, 350, 380, 400, 450, 500];
      quota = itQuotas[absHash % itQuotas.length];
    } else if (m.includes('quản trị') || m.includes('kinh tế') || m.includes('marketing') || m.includes('tài chính') || m.includes('kế toán') || m.includes('logistics') || m.includes('thương mại')) {
      const bizQuotas = [180, 200, 220, 240, 250, 280, 300, 320, 350, 380];
      quota = bizQuotas[absHash % bizQuotas.length];
    } else if (m.includes('kỹ thuật') || m.includes('cơ khí') || m.includes('ô tô') || m.includes('điện') || m.includes('điều khiển') || m.includes('tự động') || m.includes('kiến trúc') || m.includes('xây dựng') || m.includes('dầu khí') || m.includes('địa chất') || m.includes('bản đồ')) {
      const engQuotas = [120, 140, 150, 160, 180, 200, 220, 240, 260, 280, 300];
      quota = engQuotas[absHash % engQuotas.length];
    } else if (m.includes('y ') || m.includes('y khoa') || m.includes('dược') || m.includes('răng') || m.includes('điều dưỡng') || m.includes('y học')) {
      const medQuotas = [80, 100, 120, 150, 160, 180, 200];
      quota = medQuotas[absHash % medQuotas.length];
    } else if (m.includes('ngôn ngữ') || m.includes('sư phạm') || m.includes('tiếng') || m.includes('luật') || m.includes('báo chí') || m.includes('truyền thông') || m.includes('quan hệ công chúng') || m.includes('thiết kế') || m.includes('đồ họa') || m.includes('du lịch') || m.includes('khách sạn') || m.includes('sân khấu') || m.includes('đạo diễn') || m.includes('diễn viên')) {
      const socQuotas = [90, 100, 120, 130, 150, 160, 180, 200, 220];
      quota = socQuotas[absHash % socQuotas.length];
    } else {
      const genQuotas = [100, 120, 150, 180, 200, 220, 250, 280, 300];
      quota = genQuotas[absHash % genQuotas.length];
    }
  }

  let averageScore = u.averageScore || 25.5;
  let historicalScores = u.historicalScores && Object.keys(u.historicalScores).length > 0 ? u.historicalScores : {
    "2023": Math.round((averageScore - 0.25) * 100) / 100,
    "2024": Math.round((averageScore + 0.15) * 100) / 100,
    "2025": Math.round(averageScore * 100) / 100,
  };
  if (!u.averageScore && historicalScores["2025"]) {
    averageScore = historicalScores["2025"];
  }

  let subjectBlocks = u.subjectBlocks && u.subjectBlocks.length > 0 ? u.subjectBlocks : ['A00', 'A01', 'D01'];
  let employmentRate = u.employmentRate || (88 + (absHash % 11));
  let academicPressure = u.academicPressure || (75 + ((absHash * 7) % 21));
  let clubActivities = u.clubActivities || (70 + ((absHash * 13) % 26));
  let targetTraits = u.targetTraits && u.targetTraits.length > 0 ? u.targetTraits : ['I', 'R'];
  let location = u.location || 'Hà Nội';

  return {
    ...u,
    quota,
    historicalScores,
    averageScore,
    subjectBlocks,
    employmentRate,
    academicPressure,
    clubActivities,
    targetTraits,
    location,
    feePerYear,
    feePerCredit,
    creditsPerSemester,
    credits,
    duration: credits > 140 ? 5 : 4,
    degreeType: credits > 140 ? 'Kỹ sư' : 'Cử nhân',
    logoUrl,
    address,
    campusHistory,
    description,
    subMajors,
    conversionFormulas: {
      'Tổ hợp xét tuyển THPT': 'Điểm xét tuyển = (Môn 1 + Môn 2 + Môn 3) + Điểm ưu tiên (nếu có)',
      'Kỳ thi Đánh giá tư duy (TSA)': 'Điểm xét tuyển = Điểm bài thi TSA + Điểm ưu tiên'
    },
    talentDetails: [
      'Xét tuyển chứng chỉ quốc tế: IELTS (từ 6.0 trở lên) hoặc TOEFL iBT (từ 79 trở lên).',
      'Thí sinh đạt giải Nhất, Nhì, Ba trong kỳ thi HSG Quốc gia, Quốc tế.',
      'Học sinh hệ chuyên có điểm trung bình 3 năm THPT đạt từ 8.0 trở lên.'
    ],
    priorityDetails: [
      {
        type: 'ielts',
        title: 'Bảng quy đổi điểm IELTS sang điểm thi THPT môn Tiếng Anh',
        table: {
          '5.5': '8.5 điểm',
          '6.0': '9.0 điểm',
          '6.5': '9.5 điểm',
          '7.0+': '10 điểm'
        }
      },
      {
        type: 'other',
        title: 'Điểm cộng giải Học sinh giỏi',
        table: {
          'Giải Nhất Tỉnh/TP': '+1.0 điểm',
          'Giải Nhì Tỉnh/TP': '+0.5 điểm',
          'Giải Ba Tỉnh/TP': '+0.25 điểm'
        }
      }
    ],
    reviews: [
      {
        id: 'r1',
        author: 'Sinh viên năm 3 - Khóa K66',
        date: '12/05/2025',
        content: 'Chương trình học nặng nhưng cực kỳ chất lượng. Các thầy cô dạy lab rất nhiệt tình chỉ bảo từng dòng code. Đặc biệt thư viện trường xịn xò, điều hòa mát lạnh, view sống ảo bao đẹp!! 💯🔥',
        rating: 4.5,
        aspects: { teaching: 5, facilities: 4.5, environment: 4.5 },
        imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800',
        sticker: '❤️'
      },
      {
        id: 'r2',
        author: 'Cựu sinh viên - Khóa K62',
        date: '02/01/2026',
        content: 'Đồ án cuối kỳ đúng là ác mộng nếu làm cùng team không hợp cạ. Khuyên chân thành các em năm nhất nên cày tiếng Anh từ sớm vì tài liệu chuyên ngành toàn tiếng Anh hết. Ra trường lương khá ổn. 🥲',
        rating: 4.0,
        aspects: { teaching: 4, facilities: 4.5, environment: 4 },
        sticker: '😭'
      },
      {
        id: 'r3',
        author: 'Thủ khoa đầu ra K63',
        date: '15/08/2025',
        content: 'Môi trường quá năng động! Nhiều CLB để tham gia. Học phí tuy có tăng so với trước nhưng hoàn toàn xứng đáng với cơ sở vật chất mới xây. Có khu tự học 24/7 rất tiện lợi mùa thi.',
        rating: 5.0,
        aspects: { teaching: 5, facilities: 5, environment: 5 },
        imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800',
        sticker: '🚀'
      },
      {
        id: 'r4',
        author: 'Thủ quỹ Lớp tín chỉ',
        date: '10/06/2025',
        content: 'Chạy deadline mệt nghỉ nhưng bù lại lúc có điểm thì vui nổ trời. Trường có nhiều học bổng khuyến khích học tập khá ngon nếu GPA trên 3.2. Căng tin hơi đắt tí nhưng đồ ăn sạch sẽ.',
        rating: 4.5,
        aspects: { teaching: 4.5, facilities: 4, environment: 5 },
        sticker: '🤩'
      },
      {
        id: 'r5',
        author: 'Gương mặt vàng trong làng rớt môn',
        date: '20/11/2025',
        content: 'Khuyên thật các bạn khóa sau đừng có coi thường môn Triết với Toán cao cấp. Rớt môn tốn tiền học lại xót lắm!! Giảng viên thì có thầy cô gắt có thầy cô hiền, hên xui do lúc đăng ký tín chỉ nhé =))',
        rating: 3.5,
        aspects: { teaching: 4, facilities: 4.5, environment: 4 },
        sticker: '💸'
      },
      {
        id: 'r6',
        author: 'Hội trưởng CLB Sinh viên',
        date: '05/09/2026',
        content: 'Hoạt động ngoại khóa siêu đỉnh, sinh viên năng động thực sự. Mình học được cực nhiều kỹ năng mềm từ việc chạy sự kiện. Khuyên các tân sinh viên nên tham gia ít nhất 1 CLB nhé!',
        rating: 5.0,
        aspects: { teaching: 4, facilities: 4, environment: 5 },
        imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
        sticker: '🎉'
      },
      {
        id: 'r7',
        author: 'Sinh viên năm cuối',
        date: '18/02/2026',
        content: 'Phòng học xịn xò, có máy chiếu đời mới, 100% điều hòa mát lạnh. Thư viện siêu rộng và nhiều sách chuyên ngành hay. Nói chung là 4 năm thanh xuân ở đây không phí hoài!',
        rating: 4.5,
        aspects: { teaching: 5, facilities: 5, environment: 4.5 },
        sticker: '✨'
      }
    ]
  };
}

const baseUniversities: UniversityProgram[] = [
  {
    "id": "UET-CNTT",
    "name": "Đại học Công nghệ - ĐHQGHN",
    "major": "Công nghệ thông tin",
    "type": "Công lập",
    "feePerYear": 31004546,
    "averageScore": 26.26,
    "employmentRate": 88,
    "academicPressure": 67,
    "clubActivities": 85,
    "targetTraits": [
      "C",
      "A"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "talentAdmission": "Ưu tiên xét tuyển học sinh trường chuyên, HSG các cấp",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT",
      "Cộng điểm cho chứng chỉ tiếng Anh quốc tế (IELTS/TOEFL)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "(Điểm HSA × 30) / 150"
    },
    "historicalScores": {
      "2023": 26.07,
      "2024": 27.18,
      "2025": 26.26
    }
  },
  {
    "id": "UET-KHMT",
    "name": "Đại học Công nghệ - ĐHQGHN",
    "major": "Khoa học máy tính",
    "type": "Công lập",
    "feePerYear": 33947984,
    "averageScore": 22.95,
    "employmentRate": 94,
    "academicPressure": 76,
    "clubActivities": 66,
    "targetTraits": [
      "I",
      "I"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "talentAdmission": "Ưu tiên xét tuyển học sinh trường chuyên, HSG các cấp",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT",
      "Cộng điểm cho chứng chỉ tiếng Anh quốc tế (IELTS/TOEFL)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "(Điểm HSA × 30) / 150"
    },
    "historicalScores": {
      "2023": 23.19,
      "2024": 22.47,
      "2025": 22.95
    }
  },
  {
    "id": "UET-KTMT",
    "name": "Đại học Công nghệ - ĐHQGHN",
    "major": "Kỹ thuật Robot",
    "type": "Công lập",
    "feePerYear": 31810302,
    "averageScore": 25.68,
    "employmentRate": 95,
    "academicPressure": 67,
    "clubActivities": 73,
    "targetTraits": [
      "C",
      "C"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "talentAdmission": "Ưu tiên xét tuyển học sinh trường chuyên, HSG các cấp",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT",
      "Cộng điểm cho chứng chỉ tiếng Anh quốc tế (IELTS/TOEFL)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "(Điểm HSA × 30) / 150"
    },
    "historicalScores": {
      "2023": 25.76,
      "2024": 25.58,
      "2025": 25.68
    }
  },
  {
    "id": "HUS-TOAN",
    "name": "Đại học Khoa học Tự nhiên - ĐHQGHN",
    "major": "Toán học",
    "type": "Công lập",
    "feePerYear": 26274987,
    "averageScore": 21.74,
    "employmentRate": 91,
    "academicPressure": 78,
    "clubActivities": 79,
    "targetTraits": [
      "A",
      "C"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "talentAdmission": "Ưu tiên xét tuyển học sinh trường chuyên, HSG các cấp",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT",
      "Cộng điểm cho chứng chỉ tiếng Anh quốc tế (IELTS/TOEFL)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "(Điểm HSA × 30) / 150"
    },
    "historicalScores": {
      "2023": 21.72,
      "2024": 21.29,
      "2025": 21.74
    }
  },
  {
    "id": "HUS-HOA",
    "name": "Đại học Khoa học Tự nhiên - ĐHQGHN",
    "major": "Hóa học",
    "type": "Công lập",
    "feePerYear": 28712591,
    "averageScore": 25.3,
    "employmentRate": 89,
    "academicPressure": 87,
    "clubActivities": 60,
    "targetTraits": [
      "C",
      "E"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "talentAdmission": "Ưu tiên xét tuyển học sinh trường chuyên, HSG các cấp",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT",
      "Cộng điểm cho chứng chỉ tiếng Anh quốc tế (IELTS/TOEFL)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "(Điểm HSA × 30) / 150"
    },
    "historicalScores": {
      "2023": 25.95,
      "2024": 25.42,
      "2025": 25.3
    }
  },
  {
    "id": "HUS-SINH",
    "name": "Đại học Khoa học Tự nhiên - ĐHQGHN",
    "major": "Sinh học",
    "type": "Công lập",
    "feePerYear": 29573855,
    "averageScore": 27.14,
    "employmentRate": 83,
    "academicPressure": 62,
    "clubActivities": 66,
    "targetTraits": [
      "C",
      "C"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "talentAdmission": "Ưu tiên xét tuyển học sinh trường chuyên, HSG các cấp",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT",
      "Cộng điểm cho chứng chỉ tiếng Anh quốc tế (IELTS/TOEFL)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "(Điểm HSA × 30) / 150"
    },
    "historicalScores": {
      "2023": 27.11,
      "2024": 27.85,
      "2025": 27.14
    }
  },
  {
    "id": "BKA-101",
    "name": "Đại học Bách Khoa Hà Nội",
    "major": "Kỹ thuật máy tính",
    "type": "Công lập",
    "feePerYear": 35206760,
    "averageScore": 27.22,
    "employmentRate": 83,
    "academicPressure": 84,
    "clubActivities": 55,
    "targetTraits": [
      "A",
      "E"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)",
      "Đánh giá năng lực - APT (ĐHQG TPHCM)"
    ],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA + Điểm ưu tiên (Không quy đổi)"
    },
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST 2026)",
        "table": {
          "5": "8.0 điểm",
          "6": "9.0 điểm",
          "5.5": "8.5 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level, AP, IB) kết hợp học bạ >= 8.0.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn (Dành cho HS trường chuyên, HSG tỉnh, IELTS >= 6.0, Đường lên đỉnh Olympia...)."
    ],
    "historicalScores": {
      "2023": 27.74,
      "2024": 27.32,
      "2025": 27.22
    }
  },
  {
    "id": "BKA-102",
    "name": "Đại học Bách Khoa Hà Nội",
    "major": "Khoa học dữ liệu",
    "type": "Công lập",
    "feePerYear": 37532099,
    "averageScore": 23.84,
    "employmentRate": 88,
    "academicPressure": 65,
    "clubActivities": 62,
    "targetTraits": [
      "S",
      "I"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST 2026)",
        "table": {
          "5": "8.0 điểm",
          "6": "9.0 điểm",
          "5.5": "8.5 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level, AP, IB) kết hợp học bạ >= 8.0.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn (Dành cho HS trường chuyên, HSG tỉnh, IELTS >= 6.0, Đường lên đỉnh Olympia...)."
    ],
    "historicalScores": {
      "2023": 23.45,
      "2024": 23.75,
      "2025": 23.84
    }
  },
  {
    "id": "BKA-103",
    "name": "Đại học Bách Khoa Hà Nội",
    "major": "Cơ điện tử",
    "type": "Công lập",
    "feePerYear": 38705396,
    "averageScore": 21.46,
    "employmentRate": 90,
    "academicPressure": 68,
    "clubActivities": 80,
    "targetTraits": [
      "R",
      "C"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)",
      "Đánh giá năng lực - APT (ĐHQG TPHCM)"
    ],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA + Điểm ưu tiên (Không quy đổi)"
    },
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST 2026)",
        "table": {
          "5": "8.0 điểm",
          "6": "9.0 điểm",
          "5.5": "8.5 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level, AP, IB) kết hợp học bạ >= 8.0.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn (Dành cho HS trường chuyên, HSG tỉnh, IELTS >= 6.0, Đường lên đỉnh Olympia...)."
    ],
    "historicalScores": {
      "2023": 22.11,
      "2024": 21.84,
      "2025": 21.46
    }
  },
  {
    "id": "NEU-101",
    "name": "Đại học Kinh tế Quốc dân",
    "major": "Quản trị kinh doanh",
    "type": "Công lập",
    "feePerYear": 25300403,
    "averageScore": 23.95,
    "employmentRate": 90,
    "academicPressure": 62,
    "clubActivities": 95,
    "targetTraits": [
      "S",
      "I"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển kết hợp học bạ và chứng chỉ quốc tế (IELTS/SAT/ACT)",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT",
      "Cộng từ 0.5 - 1.5 điểm quy đổi cho IELTS >= 5.5"
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (NEU)",
        "table": {
          "6": "8.5 điểm",
          "7": "9.5 điểm",
          "5.5": "8.0 điểm",
          "6.5": "9.0 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "talentDetails": [
      "Xét tuyển thẳng theo quy định của Bộ GD&ĐT.",
      "Xét tuyển kết hợp chứng chỉ ngoại ngữ quốc tế (IELTS/TOEFL) và điểm bạ/kết quả thi THPT.",
      "Xét tuyển học bạ đối với học sinh giỏi hệ chuyên các trường THPT chuyên trên toàn quốc."
    ],
    "historicalScores": {
      "2023": 23.34,
      "2024": 23.57,
      "2025": 23.95
    }
  },
  {
    "id": "NEU-102",
    "name": "Đại học Kinh tế Quốc dân",
    "major": "Kế toán",
    "quota": 300,
    "type": "Công lập",
    "feePerYear": 26284967,
    "averageScore": 25.19,
    "employmentRate": 93,
    "academicPressure": 63,
    "clubActivities": 76,
    "targetTraits": [
      "I",
      "R"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển kết hợp học bạ và chứng chỉ quốc tế (IELTS/SAT/ACT)",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT",
      "Cộng từ 0.5 - 1.5 điểm quy đổi cho IELTS >= 5.5"
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (NEU)",
        "table": {
          "6": "8.5 điểm",
          "7": "9.5 điểm",
          "5.5": "8.0 điểm",
          "6.5": "9.0 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "talentDetails": [
      "Xét tuyển thẳng theo quy định của Bộ GD&ĐT.",
      "Xét tuyển kết hợp chứng chỉ ngoại ngữ quốc tế (IELTS/TOEFL) và điểm bạ/kết quả thi THPT.",
      "Xét tuyển học bạ đối với học sinh giỏi hệ chuyên các trường THPT chuyên trên toàn quốc."
    ],
    "historicalScores": {
      "2023": 25.92,
      "2024": 25.18,
      "2025": 25.19
    }
  },
  {
    "id": "NEU-103",
    "name": "Đại học Kinh tế Quốc dân",
    "major": "Marketing",
    "quota": 280,
    "type": "Công lập",
    "feePerYear": 29225004,
    "averageScore": 23.5,
    "employmentRate": 85,
    "academicPressure": 80,
    "clubActivities": 59,
    "targetTraits": [
      "I",
      "R"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển kết hợp học bạ và chứng chỉ quốc tế (IELTS/SAT/ACT)",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT",
      "Cộng từ 0.5 - 1.5 điểm quy đổi cho IELTS >= 5.5"
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (NEU)",
        "table": {
          "6": "8.5 điểm",
          "7": "9.5 điểm",
          "5.5": "8.0 điểm",
          "6.5": "9.0 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "talentDetails": [
      "Xét tuyển thẳng theo quy định của Bộ GD&ĐT.",
      "Xét tuyển kết hợp chứng chỉ ngoại ngữ quốc tế (IELTS/TOEFL) và điểm bạ/kết quả thi THPT.",
      "Xét tuyển học bạ đối với học sinh giỏi hệ chuyên các trường THPT chuyên trên toàn quốc."
    ],
    "historicalScores": {
      "2023": 24.24,
      "2024": 23.53,
      "2025": 23.5
    }
  },
  {
    "id": "FTU-101",
    "name": "Đại học Ngoại thương",
    "major": "Kinh tế đối ngoại",
    "type": "Công lập",
    "feePerYear": 27741731,
    "averageScore": 22.51,
    "employmentRate": 92,
    "academicPressure": 66,
    "clubActivities": 51,
    "targetTraits": [
      "S",
      "E"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển kết hợp học bạ và chứng chỉ quốc tế (IELTS/SAT/ACT)",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT",
      "Cộng từ 0.5 - 1.5 điểm quy đổi cho IELTS >= 5.5"
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (FTU)",
        "table": {
          "7": "9.0 điểm",
          "6.5": "8.5 điểm",
          "7.5": "9.5 điểm",
          ">= 8.0": "10.0 điểm"
        }
      }
    ],
    "talentDetails": [
      "Xét tuyển thẳng theo quy định của Bộ GD&ĐT.",
      "Xét tuyển kết hợp chứng chỉ ngoại ngữ quốc tế (IELTS/TOEFL) và điểm bạ/kết quả thi THPT.",
      "Xét tuyển học bạ đối với học sinh giỏi hệ chuyên các trường THPT chuyên trên toàn quốc."
    ],
    "historicalScores": {
      "2023": 22.62,
      "2024": 23.22,
      "2025": 22.51
    }
  },
  {
    "id": "FTU-102",
    "name": "Đại học Ngoại thương",
    "major": "Ngôn ngữ Anh",
    "quota": 150,
    "type": "Công lập",
    "feePerYear": 26494508,
    "averageScore": 33.8,
    "employmentRate": 89,
    "academicPressure": 80,
    "clubActivities": 73,
    "targetTraits": [
      "C",
      "C"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển kết hợp học bạ và chứng chỉ quốc tế (IELTS/SAT/ACT)",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT",
      "Cộng từ 0.5 - 1.5 điểm quy đổi cho IELTS >= 5.5"
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (FTU)",
        "table": {
          "7": "9.0 điểm",
          "6.5": "8.5 điểm",
          "7.5": "9.5 điểm",
          ">= 8.0": "10.0 điểm"
        }
      }
    ],
    "talentDetails": [
      "Xét tuyển thẳng theo quy định của Bộ GD&ĐT.",
      "Xét tuyển kết hợp chứng chỉ ngoại ngữ quốc tế (IELTS/TOEFL) và điểm bạ/kết quả thi THPT.",
      "Xét tuyển học bạ đối với học sinh giỏi hệ chuyên các trường THPT chuyên trên toàn quốc."
    ],
    "historicalScores": {
      "2023": 34.92,
      "2024": 33.89,
      "2025": 33.8
    },
    "scoreCalculation": {
      "scale": 40,
      "multiplierSubject": "anh",
      "formulaDescription": "Môn Tiếng Anh nhân hệ số 2 (thang 40)"
    }
  },
  {
    "id": "FTU-103",
    "name": "Đại học Ngoại thương",
    "major": "Tài chính quốc tế",
    "type": "Công lập",
    "feePerYear": 29498541,
    "averageScore": 25.2,
    "employmentRate": 97,
    "academicPressure": 76,
    "clubActivities": 61,
    "targetTraits": [
      "A",
      "E"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển kết hợp học bạ và chứng chỉ quốc tế (IELTS/SAT/ACT)",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT",
      "Cộng từ 0.5 - 1.5 điểm quy đổi cho IELTS >= 5.5"
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (FTU)",
        "table": {
          "7": "9.0 điểm",
          "6.5": "8.5 điểm",
          "7.5": "9.5 điểm",
          ">= 8.0": "10.0 điểm"
        }
      }
    ],
    "talentDetails": [
      "Xét tuyển thẳng theo quy định của Bộ GD&ĐT.",
      "Xét tuyển kết hợp chứng chỉ ngoại ngữ quốc tế (IELTS/TOEFL) và điểm bạ/kết quả thi THPT.",
      "Xét tuyển học bạ đối với học sinh giỏi hệ chuyên các trường THPT chuyên trên toàn quốc."
    ],
    "historicalScores": {
      "2023": 25.69,
      "2024": 26.03,
      "2025": 25.2
    }
  },
  {
    "id": "HMU-101",
    "name": "Đại học Y Hà Nội",
    "major": "Y đa khoa",
    "type": "Công lập",
    "feePerYear": 43292199,
    "averageScore": 21.25,
    "employmentRate": 91,
    "academicPressure": 94,
    "clubActivities": 50,
    "targetTraits": [
      "C",
      "C"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "B00",
      "A00",
      "D01"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Nhất, Nhì, Ba HSG Quốc gia",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "historicalScores": {
      "2023": 21.32,
      "2024": 21.15,
      "2025": 21.25
    }
  },
  {
    "id": "HMU-102",
    "name": "Đại học Y Hà Nội",
    "major": "Răng hàm mặt",
    "type": "Công lập",
    "feePerYear": 40627318,
    "averageScore": 26.12,
    "employmentRate": 97,
    "academicPressure": 89,
    "clubActivities": 82,
    "targetTraits": [
      "S",
      "S"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "B00",
      "A00",
      "D01"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Nhất, Nhì, Ba HSG Quốc gia",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "historicalScores": {
      "2023": 27.02,
      "2024": 26.44,
      "2025": 26.12
    }
  },
  {
    "id": "HMU-103",
    "name": "Đại học Y Hà Nội",
    "major": "Dược học",
    "type": "Công lập",
    "feePerYear": 41484791,
    "averageScore": 27.3,
    "employmentRate": 81,
    "academicPressure": 63,
    "clubActivities": 79,
    "targetTraits": [
      "S",
      "E"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "B00",
      "A00",
      "D01"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Nhất, Nhì, Ba HSG Quốc gia",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "historicalScores": {
      "2023": 28.25,
      "2024": 27.72,
      "2025": 27.3
    }
  },
  {
    "id": "HVNH-101",
    "name": "Học viện Ngân hàng",
    "major": "Tài chính ngân hàng",
    "type": "Công lập",
    "feePerYear": 23273499,
    "averageScore": 22.14,
    "employmentRate": 82,
    "academicPressure": 89,
    "clubActivities": 84,
    "targetTraits": [
      "C",
      "A"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "historicalScores": {
      "2023": 21.29,
      "2024": 22.07,
      "2025": 22.14
    }
  },
  {
    "id": "HVNH-102",
    "name": "Học viện Ngân hàng",
    "major": "Kế toán",
    "quota": 300,
    "type": "Công lập",
    "feePerYear": 21624538,
    "averageScore": 27.45,
    "employmentRate": 91,
    "academicPressure": 89,
    "clubActivities": 68,
    "targetTraits": [
      "E",
      "E"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "historicalScores": {
      "2023": 26.83,
      "2024": 28.32,
      "2025": 27.45
    }
  },
  {
    "id": "HVNH-103",
    "name": "Học viện Ngân hàng",
    "major": "Hệ thống thông tin quản lý",
    "type": "Công lập",
    "feePerYear": 24725639,
    "averageScore": 24.93,
    "employmentRate": 82,
    "academicPressure": 61,
    "clubActivities": 70,
    "targetTraits": [
      "A",
      "A"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "historicalScores": {
      "2023": 24.07,
      "2024": 25.5,
      "2025": 24.93
    }
  },
  {
    "id": "AOF-101",
    "name": "Học viện Tài chính",
    "major": "Tài chính doanh nghiệp",
    "type": "Công lập",
    "feePerYear": 24133718,
    "averageScore": 24.87,
    "employmentRate": 87,
    "academicPressure": 88,
    "clubActivities": 79,
    "targetTraits": [
      "R",
      "C"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển kết hợp học bạ và chứng chỉ quốc tế (IELTS/SAT/ACT)",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT",
      "Cộng từ 0.5 - 1.5 điểm quy đổi cho IELTS >= 5.5"
    ],
    "historicalScores": {
      "2023": 25.42,
      "2024": 24.91,
      "2025": 24.87
    }
  },
  {
    "id": "AOF-102",
    "name": "Học viện Tài chính",
    "major": "Kế toán doanh nghiệp",
    "quota": 60,
    "type": "Công lập",
    "feePerYear": 22341913,
    "averageScore": 27.43,
    "employmentRate": 84,
    "academicPressure": 60,
    "clubActivities": 55,
    "targetTraits": [
      "R",
      "R"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển kết hợp học bạ và chứng chỉ quốc tế (IELTS/SAT/ACT)",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT",
      "Cộng từ 0.5 - 1.5 điểm quy đổi cho IELTS >= 5.5"
    ],
    "historicalScores": {
      "2023": 27.68,
      "2024": 27.76,
      "2025": 27.43
    }
  },
  {
    "id": "PTIT-101",
    "name": "Học viện Công nghệ Bưu chính Viễn thông",
    "major": "An toàn thông tin",
    "type": "Công lập",
    "feePerYear": 28435827,
    "averageScore": 21.33,
    "employmentRate": 80,
    "academicPressure": 85,
    "clubActivities": 72,
    "targetTraits": [
      "A",
      "R"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "(Điểm TSA × 30) / 100"
    },
    "historicalScores": {
      "2023": 20.85,
      "2024": 21.28,
      "2025": 21.33
    }
  },
  {
    "id": "PTIT-102",
    "name": "Học viện Công nghệ Bưu chính Viễn thông",
    "major": "Công nghệ đa phương tiện",
    "type": "Công lập",
    "feePerYear": 27373277,
    "averageScore": 22.19,
    "employmentRate": 88,
    "academicPressure": 77,
    "clubActivities": 64,
    "targetTraits": [
      "R",
      "I"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - APT (ĐHQG TPHCM)"
    ],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - APT (ĐHQG TPHCM)": "(Điểm APT × 30) / 1200"
    },
    "historicalScores": {
      "2023": 21.66,
      "2024": 21.71,
      "2025": 22.19
    }
  },
  {
    "id": "FPT-101",
    "name": "Đại học FPT Hà Nội",
    "major": "Kỹ thuật phần mềm",
    "type": "Tư thục",
    "feePerYear": 91268935,
    "averageScore": 25.47,
    "employmentRate": 83,
    "academicPressure": 81,
    "clubActivities": 76,
    "targetTraits": [
      "I",
      "I"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "(Điểm TSA × 30) / 100"
    },
    "historicalScores": {
      "2023": 24.82,
      "2024": 25.95,
      "2025": 25.47
    }
  },
  {
    "id": "FPT-102",
    "name": "Đại học FPT Hà Nội",
    "major": "Thiết kế đồ họa",
    "type": "Tư thục",
    "feePerYear": 93629863,
    "averageScore": 21.99,
    "employmentRate": 98,
    "academicPressure": 61,
    "clubActivities": 62,
    "targetTraits": [
      "A",
      "C"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - APT (ĐHQG TPHCM)"
    ],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - APT (ĐHQG TPHCM)": "(Điểm APT × 30) / 1200"
    },
    "historicalScores": {
      "2023": 21.94,
      "2024": 22.27,
      "2025": 21.99
    }
  },
  {
    "id": "FPT-103",
    "name": "Đại học FPT Hà Nội",
    "major": "Quản trị khách sạn",
    "type": "Tư thục",
    "feePerYear": 94657592,
    "averageScore": 24.2,
    "employmentRate": 83,
    "academicPressure": 85,
    "clubActivities": 79,
    "targetTraits": [
      "R",
      "R"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "(Điểm TSA × 30) / 100"
    },
    "historicalScores": {
      "2023": 24.23,
      "2024": 24.63,
      "2025": 24.2
    }
  },
  {
    "id": "TLU-101",
    "name": "Đại học Thủy Lợi",
    "major": "Công nghệ thông tin",
    "type": "Công lập",
    "feePerYear": 20985203,
    "averageScore": 26.98,
    "employmentRate": 85,
    "academicPressure": 91,
    "clubActivities": 86,
    "targetTraits": [
      "A",
      "A"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "historicalScores": {
      "2023": 26.24,
      "2024": 26.51,
      "2025": 26.98
    }
  },
  {
    "id": "TLU-102",
    "name": "Đại học Thủy Lợi",
    "major": "Kỹ thuật công trình xây dựng",
    "type": "Công lập",
    "feePerYear": 19752608,
    "averageScore": 27.76,
    "employmentRate": 92,
    "academicPressure": 84,
    "clubActivities": 56,
    "targetTraits": [
      "E",
      "C"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "historicalScores": {
      "2023": 27.08,
      "2024": 27.66,
      "2025": 27.76
    }
  },
  {
    "id": "HAUI-101",
    "name": "Đại học Công nghiệp Hà Nội",
    "major": "Công nghệ kỹ thuật ô tô",
    "type": "Công lập",
    "feePerYear": 21986103,
    "averageScore": 25.76,
    "employmentRate": 85,
    "academicPressure": 78,
    "clubActivities": 92,
    "targetTraits": [
      "C",
      "A"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "historicalScores": {
      "2023": 25.66,
      "2024": 26.43,
      "2025": 25.76
    }
  },
  {
    "id": "HAUI-102",
    "name": "Đại học Công nghiệp Hà Nội",
    "major": "Cơ khí",
    "type": "Công lập",
    "feePerYear": 25860220,
    "averageScore": 22.72,
    "employmentRate": 91,
    "academicPressure": 83,
    "clubActivities": 59,
    "targetTraits": [
      "A",
      "S"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "historicalScores": {
      "2023": 22.23,
      "2024": 22.67,
      "2025": 22.72
    }
  },
  {
    "id": "HAUI-103",
    "name": "Đại học Công nghiệp Hà Nội",
    "major": "Du lịch",
    "type": "Công lập",
    "feePerYear": 25932847,
    "averageScore": 27.86,
    "employmentRate": 85,
    "academicPressure": 81,
    "clubActivities": 90,
    "targetTraits": [
      "A",
      "S"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - APT (ĐHQG TPHCM)"
    ],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - APT (ĐHQG TPHCM)": "(Điểm APT × 30) / 1200"
    },
    "historicalScores": {
      "2023": 28.23,
      "2024": 27.5,
      "2025": 27.86
    }
  },
  {
    "id": "UTC-101",
    "name": "Đại học Giao thông Vận tải",
    "major": "Kỹ thuật xây dựng",
    "type": "Công lập",
    "feePerYear": 23157038,
    "averageScore": 25.5,
    "employmentRate": 88,
    "academicPressure": 63,
    "clubActivities": 95,
    "targetTraits": [
      "E",
      "I"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "historicalScores": {
      "2023": 24.87,
      "2024": 26.07,
      "2025": 25.5
    }
  },
  {
    "id": "UTC-102",
    "name": "Đại học Giao thông Vận tải",
    "major": "Logistics",
    "quota": 150,
    "type": "Công lập",
    "feePerYear": 21648653,
    "averageScore": 26.49,
    "employmentRate": 93,
    "academicPressure": 62,
    "clubActivities": 69,
    "targetTraits": [
      "E",
      "C"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "historicalScores": {
      "2023": 26.63,
      "2024": 26.71,
      "2025": 26.49
    }
  },
  {
    "id": "HUCE-101",
    "name": "Đại học Xây dựng Hà Nội",
    "major": "Kiến trúc",
    "quota": 350,
    "type": "Công lập",
    "feePerYear": 20956824,
    "averageScore": 24.58,
    "employmentRate": 82,
    "academicPressure": 76,
    "clubActivities": 88,
    "targetTraits": [
      "C",
      "A"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - APT (ĐHQG TPHCM)"
    ],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - APT (ĐHQG TPHCM)": "(Điểm APT × 30) / 1200"
    },
    "historicalScores": {
      "2023": 24.35,
      "2024": 24.6,
      "2025": 24.58
    }
  },
  {
    "id": "HUCE-102",
    "name": "Đại học Xây dựng Hà Nội",
    "major": "Kỹ thuật cấp thoát nước",
    "type": "Công lập",
    "feePerYear": 20645927,
    "averageScore": 27.8,
    "employmentRate": 95,
    "academicPressure": 66,
    "clubActivities": 86,
    "targetTraits": [
      "C",
      "E"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)",
      "Đánh giá năng lực - APT (ĐHQG TPHCM)"
    ],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "(Điểm TSA × 30) / 100",
      "Đánh giá năng lực - APT (ĐHQG TPHCM)": "(Điểm APT × 30) / 1200"
    },
    "historicalScores": {
      "2023": 28.31,
      "2024": 28.3,
      "2025": 27.8
    }
  },
  {
    "id": "HUMG-101",
    "name": "Đại học Mỏ - Địa chất",
    "major": "Kỹ thuật dầu khí",
    "type": "Công lập",
    "feePerYear": 19446348,
    "averageScore": 24.65,
    "employmentRate": 91,
    "academicPressure": 89,
    "clubActivities": 97,
    "targetTraits": [
      "R",
      "R"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "historicalScores": {
      "2023": 25.09,
      "2024": 24.8,
      "2025": 24.65
    }
  },
  {
    "id": "HUMG-102",
    "name": "Đại học Mỏ - Địa chất",
    "major": "Bản đồ",
    "type": "Công lập",
    "feePerYear": 20043261,
    "averageScore": 27.77,
    "employmentRate": 91,
    "academicPressure": 93,
    "clubActivities": 64,
    "targetTraits": [
      "S",
      "I"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - APT (ĐHQG TPHCM)"
    ],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - APT (ĐHQG TPHCM)": "(Điểm APT × 30) / 1200"
    },
    "historicalScores": {
      "2023": 28.02,
      "2024": 28.33,
      "2025": 27.77
    }
  },
  {
    "id": "TMU-101",
    "name": "Đại học Thương mại",
    "major": "Thương mại điện tử",
    "type": "Công lập",
    "feePerYear": 24339037,
    "averageScore": 21.03,
    "employmentRate": 87,
    "academicPressure": 89,
    "clubActivities": 50,
    "targetTraits": [
      "A",
      "I"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển kết hợp học bạ và chứng chỉ quốc tế (IELTS/SAT/ACT)",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT",
      "Cộng từ 0.5 - 1.5 điểm quy đổi cho IELTS >= 5.5"
    ],
    "historicalScores": {
      "2023": 20.36,
      "2024": 21.27,
      "2025": 21.03
    }
  },
  {
    "id": "TMU-102",
    "name": "Đại học Thương mại",
    "major": "Quản trị nhân lực",
    "type": "Công lập",
    "feePerYear": 26049949,
    "averageScore": 23.53,
    "employmentRate": 82,
    "academicPressure": 63,
    "clubActivities": 64,
    "targetTraits": [
      "A",
      "R"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển kết hợp học bạ và chứng chỉ quốc tế (IELTS/SAT/ACT)",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT",
      "Cộng từ 0.5 - 1.5 điểm quy đổi cho IELTS >= 5.5"
    ],
    "historicalScores": {
      "2023": 24.35,
      "2024": 24.47,
      "2025": 23.53
    }
  },
  {
    "id": "HAN-101",
    "name": "Đại học Hà Nội",
    "major": "Ngôn ngữ Trung Quốc",
    "quota": 250,
    "type": "Công lập",
    "feePerYear": 31497701,
    "averageScore": 30.43,
    "employmentRate": 84,
    "academicPressure": 84,
    "clubActivities": 75,
    "targetTraits": [
      "C",
      "S"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "historicalScores": {
      "2023": 29.64,
      "2024": 30.61,
      "2025": 30.43
    },
    "scoreCalculation": {
      "scale": 40,
      "multiplierSubject": "anh",
      "formulaDescription": "Môn Tiếng Anh nhân hệ số 2 (thang 40)"
    }
  },
  {
    "id": "HAN-102",
    "name": "Đại học Hà Nội",
    "major": "Ngôn ngữ Hàn Quốc",
    "quota": 200,
    "type": "Công lập",
    "feePerYear": 31707383,
    "averageScore": 35.23,
    "employmentRate": 93,
    "academicPressure": 92,
    "clubActivities": 69,
    "targetTraits": [
      "A",
      "E"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "historicalScores": {
      "2023": 35.6,
      "2024": 36.49,
      "2025": 35.23
    },
    "scoreCalculation": {
      "scale": 40,
      "multiplierSubject": "anh",
      "formulaDescription": "Môn Tiếng Anh nhân hệ số 2 (thang 40)"
    }
  },
  {
    "id": "HAN-103",
    "name": "Đại học Hà Nội",
    "major": "Quản trị dịch vụ du lịch",
    "type": "Công lập",
    "feePerYear": 30746410,
    "averageScore": 23.92,
    "employmentRate": 87,
    "academicPressure": 82,
    "clubActivities": 71,
    "targetTraits": [
      "C",
      "A"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "(Điểm TSA × 30) / 100"
    },
    "historicalScores": {
      "2023": 23.99,
      "2024": 24.17,
      "2025": 23.92
    }
  },
  {
    "id": "AJC-101",
    "name": "Học viện Báo chí và Tuyên truyền",
    "major": "Báo in",
    "type": "Công lập",
    "feePerYear": 25251241,
    "averageScore": 23.54,
    "employmentRate": 91,
    "academicPressure": 88,
    "clubActivities": 58,
    "targetTraits": [
      "A",
      "A"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)",
      "Đánh giá năng lực - APT (ĐHQG TPHCM)"
    ],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "(Điểm TSA × 30) / 100",
      "Đánh giá năng lực - APT (ĐHQG TPHCM)": "(Điểm APT × 30) / 1200"
    },
    "historicalScores": {
      "2023": 22.89,
      "2024": 24.3,
      "2025": 23.54
    }
  },
  {
    "id": "AJC-102",
    "name": "Học viện Báo chí và Tuyên truyền",
    "major": "Truyền thông đại chúng",
    "type": "Công lập",
    "feePerYear": 22340092,
    "averageScore": 25.05,
    "employmentRate": 80,
    "academicPressure": 65,
    "clubActivities": 59,
    "targetTraits": [
      "I",
      "S"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - APT (ĐHQG TPHCM)"
    ],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - APT (ĐHQG TPHCM)": "(Điểm APT × 30) / 1200"
    },
    "historicalScores": {
      "2023": 24.22,
      "2024": 26,
      "2025": 25.05
    }
  },
  {
    "id": "AJC-103",
    "name": "Học viện Báo chí và Tuyên truyền",
    "major": "Quan hệ công chúng",
    "type": "Công lập",
    "feePerYear": 24672519,
    "averageScore": 21.93,
    "employmentRate": 85,
    "academicPressure": 82,
    "clubActivities": 52,
    "targetTraits": [
      "A",
      "S"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "(Điểm TSA × 30) / 100"
    },
    "historicalScores": {
      "2023": 21.64,
      "2024": 22.05,
      "2025": 21.93
    }
  },
  {
    "id": "HNUE-101",
    "name": "Đại học Sư phạm Hà Nội",
    "major": "Sư phạm Toán",
    "type": "Công lập",
    "feePerYear": 10685675,
    "averageScore": 23.97,
    "employmentRate": 95,
    "academicPressure": 91,
    "clubActivities": 55,
    "targetTraits": [
      "S",
      "S"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "B00",
      "A00",
      "D01"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Nhất, Nhì, Ba HSG Quốc gia",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "historicalScores": {
      "2023": 24.46,
      "2024": 24.67,
      "2025": 23.97
    }
  },
  {
    "id": "HNUE-102",
    "name": "Đại học Sư phạm Hà Nội",
    "major": "Sư phạm Tiếng Anh",
    "type": "Công lập",
    "feePerYear": 14455931,
    "averageScore": 31.25,
    "employmentRate": 85,
    "academicPressure": 81,
    "clubActivities": 87,
    "targetTraits": [
      "S",
      "A"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "B00",
      "A00",
      "D01"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Nhất, Nhì, Ba HSG Quốc gia",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "historicalScores": {
      "2023": 31.79,
      "2024": 31.96,
      "2025": 31.25
    },
    "scoreCalculation": {
      "scale": 40,
      "multiplierSubject": "anh",
      "formulaDescription": "Môn Tiếng Anh nhân hệ số 2 (thang 40)"
    }
  },
  {
    "id": "SKDA-101",
    "name": "Đại học Sân khấu Điện ảnh",
    "major": "Đạo diễn",
    "type": "Công lập",
    "feePerYear": 18657467,
    "averageScore": 26.83,
    "employmentRate": 83,
    "academicPressure": 90,
    "clubActivities": 82,
    "targetTraits": [
      "S",
      "S"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "historicalScores": {
      "2023": 27.73,
      "2024": 27.48,
      "2025": 26.83
    }
  },
  {
    "id": "SKDA-102",
    "name": "Đại học Sân khấu Điện ảnh",
    "major": "Diễn viên",
    "type": "Công lập",
    "feePerYear": 18269838,
    "averageScore": 24.32,
    "employmentRate": 89,
    "academicPressure": 76,
    "clubActivities": 68,
    "targetTraits": [
      "S",
      "I"
    ],
    "location": "Hà Nội",
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [],
    "talentAdmission": "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP",
    "priorityPolicies": [
      "Cộng điểm ưu tiên khu vực",
      "Cộng điểm đối tượng theo quy định BGD&ĐT"
    ],
    "historicalScores": {
      "2023": 24.53,
      "2024": 24.76,
      "2025": 24.32
    }
  }
];

export const mockUniversities: UniversityProgram[] = [...baseUniversities, ...hustHvnhData].map(hydrateProgram);