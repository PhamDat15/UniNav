import { UniversityProgram } from './mockUniversities';

// HUST (Bách Khoa)
const hustSubjectBlocks = ["A00", "A01", "A02", "B00", "D01", "D07"];
const hustSpecialExams = ["Đánh giá tư duy - TSA (ĐHBK)"];
const hustTalentAdmission = "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố";
const hustTalentDetails = [
  'Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.',
  'Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level, AP, IB) kết hợp học bạ >= 8.0.',
  'Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn (Dành cho HS trường chuyên, HSG tỉnh, IELTS >= 6.0, Đường lên đỉnh Olympia...).'
];
const hustPriorityPolicies = ["Cộng điểm quy đổi chứng chỉ IELTS/TOEFL (từ 5.5 IELTS trở lên)", "Cộng điểm giải HSG các cấp"];
const hustConversionFormulas = { "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100: Điểm TSA + Điểm ưu tiên" };
const hustPriorityDetails = [
  {
    type: 'ielts',
    title: 'Bảng quy đổi điểm IELTS sang thang 10 (HUST 2026)',
    table: {
      '5.0': '8.0 điểm',
      '5.5': '8.5 điểm',
      '6.0': '9.0 điểm',
      '6.5': '9.5 điểm',
      '>= 7.0': '10.0 điểm'
    }
  }
];


// HVNH (Học viện Ngân hàng)
const hvnhSubjectBlocks = ["A00", "A01", "D01", "D07"];
const hvnhSpecialExams = ["Đánh giá năng lực - HSA (ĐHQGHN)"];
const hvnhTalentAdmission = "Xét tuyển thẳng học sinh giỏi trường Chuyên cấp Tỉnh/Thành phố";
const hvnhPriorityPolicies = ["Cộng từ 0.5 - 1.5 điểm quy đổi cho IELTS >= 5.5", "Cộng điểm khu vực"];
const hvnhConversionFormulas = { "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150" };

export const hustHvnhData: UniversityProgram[] = [
  // HUST
  {
    id: "HUST-IT1", name: "Đại học Bách Khoa Hà Nội", major: "IT1 - Khoa học Máy tính", quota: 300, type: "Công lập",
    feePerYear: 30000000, averageScore: 28.5, employmentRate: 98, academicPressure: 95, clubActivities: 80,
    targetTraits: ["I", "R"], location: "Hà Nội",
    historicalScores: { "2023": 28.4, "2024": 28.53, "2025": 28.5 },
    subjectBlocks: hustSubjectBlocks, specialExams: hustSpecialExams, talentAdmission: hustTalentAdmission, talentDetails: hustTalentDetails, priorityPolicies: hustPriorityPolicies, conversionFormulas: hustConversionFormulas, priorityDetails: hustPriorityDetails
  },
  {
    id: "HUST-IT2", name: "Đại học Bách Khoa Hà Nội", major: "IT2 - Kỹ thuật Máy tính", quota: 200, type: "Công lập",
    feePerYear: 30000000, averageScore: 28.2, employmentRate: 97, academicPressure: 92, clubActivities: 80,
    targetTraits: ["I", "R", "C"], location: "Hà Nội",
    historicalScores: { "2023": 28.1, "2024": 28.22, "2025": 28.2 },
    subjectBlocks: hustSubjectBlocks, specialExams: hustSpecialExams, talentAdmission: hustTalentAdmission, talentDetails: hustTalentDetails, priorityPolicies: hustPriorityPolicies, conversionFormulas: hustConversionFormulas, priorityDetails: hustPriorityDetails
  },
  {
    id: "HUST-IT-E6", name: "Đại học Bách Khoa Hà Nội", major: "IT-E6 - CNTT Việt Nhật (VJC)", type: "Công lập",
    feePerYear: 45000000, averageScore: 27.5, employmentRate: 99, academicPressure: 90, clubActivities: 85,
    targetTraits: ["I", "A", "E"], location: "Hà Nội",
    historicalScores: { "2023": 27.2, "2024": 27.6, "2025": 27.5 },
    subjectBlocks: hustSubjectBlocks, specialExams: hustSpecialExams, talentAdmission: hustTalentAdmission, talentDetails: hustTalentDetails, priorityPolicies: hustPriorityPolicies, conversionFormulas: hustConversionFormulas, priorityDetails: hustPriorityDetails
  },
  {
    id: "HUST-EE1", name: "Đại học Bách Khoa Hà Nội", major: "EE1 - Kỹ thuật Điều khiển và Tự động hóa", type: "Công lập",
    feePerYear: 28000000, averageScore: 27.6, employmentRate: 96, academicPressure: 92, clubActivities: 78,
    targetTraits: ["R", "I"], location: "Hà Nội",
    historicalScores: { "2023": 27.4, "2024": 27.7, "2025": 27.6 },
    subjectBlocks: hustSubjectBlocks, specialExams: hustSpecialExams, talentAdmission: hustTalentAdmission, talentDetails: hustTalentDetails, priorityPolicies: hustPriorityPolicies, conversionFormulas: hustConversionFormulas, priorityDetails: hustPriorityDetails
  },
  {
    id: "HUST-EM2", name: "Đại học Bách Khoa Hà Nội", major: "EM2 - Quản trị Kinh doanh", quota: 120, type: "Công lập",
    feePerYear: 28000000, averageScore: 26.5, employmentRate: 90, academicPressure: 78, clubActivities: 90,
    targetTraits: ["E", "S", "C"], location: "Hà Nội",
    historicalScores: { "2023": 26.1, "2024": 26.7, "2025": 26.5 },
    subjectBlocks: hustSubjectBlocks, specialExams: hustSpecialExams, talentAdmission: hustTalentAdmission, talentDetails: hustTalentDetails, priorityPolicies: hustPriorityPolicies, conversionFormulas: hustConversionFormulas, priorityDetails: hustPriorityDetails
  },

  // HVNH
  {
    id: "HVNH-TCNH", name: "Học viện Ngân hàng", major: "Ngân hàng", quota: 380, type: "Công lập",
    feePerYear: 24000000, averageScore: 26.2, employmentRate: 93, academicPressure: 78, clubActivities: 92,
    targetTraits: ["E", "C"], location: "Hà Nội", quota: 350,
    historicalScores: { "2023": 25.70, "2024": 26.20, "2025": 24.93 },
    subjectBlocks: hvnhSubjectBlocks, specialExams: hvnhSpecialExams, talentAdmission: hvnhTalentAdmission, priorityPolicies: hvnhPriorityPolicies, conversionFormulas: hvnhConversionFormulas
  },
  {
    id: "HVNH-KT", name: "Học viện Ngân hàng", major: "Kế toán", quota: 300, type: "Công lập",
    feePerYear: 24000000, averageScore: 26.0, employmentRate: 94, academicPressure: 82, clubActivities: 85,
    targetTraits: ["C", "E"], location: "Hà Nội", quota: 250,
    historicalScores: { "2023": 25.80, "2024": 26.25, "2025": 24.69 },
    subjectBlocks: hvnhSubjectBlocks, specialExams: hvnhSpecialExams, talentAdmission: hvnhTalentAdmission, priorityPolicies: hvnhPriorityPolicies, conversionFormulas: hvnhConversionFormulas
  },
  {
    id: "HVNH-HTTT", name: "Học viện Ngân hàng", major: "Hệ thống thông tin quản lý", type: "Công lập",
    feePerYear: 24000000, averageScore: 25.9, employmentRate: 95, academicPressure: 80, clubActivities: 82,
    targetTraits: ["I", "C", "E"], location: "Hà Nội", quota: 120,
    historicalScores: { "2023": 25.55, "2024": 26.00, "2025": 24.75 },
    subjectBlocks: hvnhSubjectBlocks, specialExams: hvnhSpecialExams, talentAdmission: hvnhTalentAdmission, priorityPolicies: hvnhPriorityPolicies, conversionFormulas: hvnhConversionFormulas
  },
  {
    id: "HVNH-KQT", name: "Học viện Ngân hàng", major: "Kinh doanh quốc tế", type: "Công lập",
    feePerYear: 24000000, averageScore: 26.5, employmentRate: 91, academicPressure: 80, clubActivities: 95,
    targetTraits: ["E", "A"], location: "Hà Nội", quota: 150,
    historicalScores: { "2023": 26.40, "2024": 27.00, "2025": 25.25 },
    subjectBlocks: hvnhSubjectBlocks, specialExams: hvnhSpecialExams, talentAdmission: hvnhTalentAdmission, priorityPolicies: hvnhPriorityPolicies, conversionFormulas: hvnhConversionFormulas
  },
  {
    id: "HVNH-NNA", name: "Học viện Ngân hàng", major: "Ngôn ngữ Anh", quota: 150, type: "Công lập",
    feePerYear: 22000000, averageScore: 25.8, employmentRate: 89, academicPressure: 75, clubActivities: 90,
    targetTraits: ["S", "A"], location: "Hà Nội", quota: 100,
    historicalScores: { "2023": 24.90, "2024": 25.80, "2025": 23.41 },
    subjectBlocks: hvnhSubjectBlocks, specialExams: hvnhSpecialExams, talentAdmission: hvnhTalentAdmission, priorityPolicies: hvnhPriorityPolicies, conversionFormulas: hvnhConversionFormulas
  }
];
