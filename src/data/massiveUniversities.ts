import { UniversityProgram, hydrateProgram } from './mockUniversities';

const rawMassiveUniversities: UniversityProgram[] = [
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "A02",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100: Điểm TSA + Điểm ưu tiên"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL (từ 5.0 IELTS trở lên)",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level, AP, IB) kết hợp học bạ >= 8.0.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn (Dành cho HS trường chuyên, HSG tỉnh, IELTS >= 6.0, Đường lên đỉnh Olympia...)."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST 2026)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-1",
    "major": "IT1 - Khoa học Máy tính",
    "quota": 300,
    "historicalScores": {
      "2023": 28.5,
      "2024": 28.7,
      "2025": 28.9
    },
    "averageScore": 28.7
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "A02",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100: Điểm TSA + Điểm ưu tiên"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL (từ 5.0 IELTS trở lên)",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level, AP, IB) kết hợp học bạ >= 8.0.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn (Dành cho HS trường chuyên, HSG tỉnh, IELTS >= 6.0, Đường lên đỉnh Olympia...)."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST 2026)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-2",
    "major": "IT2 - Kỹ thuật Máy tính",
    "quota": 200,
    "historicalScores": {
      "2023": 28,
      "2024": 28.2,
      "2025": 28.4
    },
    "averageScore": 28.2
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "A02",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100: Điểm TSA + Điểm ưu tiên"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL (từ 5.0 IELTS trở lên)",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level, AP, IB) kết hợp học bạ >= 8.0.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn (Dành cho HS trường chuyên, HSG tỉnh, IELTS >= 6.0, Đường lên đỉnh Olympia...)."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST 2026)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-3",
    "major": "IT-E10 - Khoa học Dữ liệu và Trí tuệ Nhân tạo",
    "quota": 100,
    "historicalScores": {
      "2023": 27.8,
      "2024": 28.3,
      "2025": 28.6
    },
    "averageScore": 28.3
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "A02",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100: Điểm TSA + Điểm ưu tiên"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL (từ 5.0 IELTS trở lên)",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level, AP, IB) kết hợp học bạ >= 8.0.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn (Dành cho HS trường chuyên, HSG tỉnh, IELTS >= 6.0, Đường lên đỉnh Olympia...)."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST 2026)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-4",
    "major": "EE1 - Kỹ thuật Điện",
    "quota": 450,
    "historicalScores": {
      "2023": 25.5,
      "2024": 25.8,
      "2025": 26
    },
    "averageScore": 25.8
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "A02",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100: Điểm TSA + Điểm ưu tiên"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL (từ 5.0 IELTS trở lên)",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level, AP, IB) kết hợp học bạ >= 8.0.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn (Dành cho HS trường chuyên, HSG tỉnh, IELTS >= 6.0, Đường lên đỉnh Olympia...)."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST 2026)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-5",
    "major": "EE2 - Điều khiển & Tự động hóa",
    "quota": 450,
    "historicalScores": {
      "2023": 27,
      "2024": 27.5,
      "2025": 27.8
    },
    "averageScore": 27.5
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "A02",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100: Điểm TSA + Điểm ưu tiên"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL (từ 5.0 IELTS trở lên)",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level, AP, IB) kết hợp học bạ >= 8.0.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn (Dành cho HS trường chuyên, HSG tỉnh, IELTS >= 6.0, Đường lên đỉnh Olympia...)."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST 2026)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-6",
    "major": "TE1 - Kỹ thuật Viễn thông",
    "quota": 360,
    "historicalScores": {
      "2023": 26,
      "2024": 26.5,
      "2025": 26.8
    },
    "averageScore": 26.5
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "A02",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100: Điểm TSA + Điểm ưu tiên"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL (từ 5.0 IELTS trở lên)",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level, AP, IB) kết hợp học bạ >= 8.0.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn (Dành cho HS trường chuyên, HSG tỉnh, IELTS >= 6.0, Đường lên đỉnh Olympia...)."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST 2026)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-7",
    "major": "ME1 - Kỹ thuật Cơ điện tử",
    "quota": 360,
    "historicalScores": {
      "2023": 26.5,
      "2024": 26.9,
      "2025": 27.2
    },
    "averageScore": 26.9
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "A02",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100: Điểm TSA + Điểm ưu tiên"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL (từ 5.0 IELTS trở lên)",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level, AP, IB) kết hợp học bạ >= 8.0.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn (Dành cho HS trường chuyên, HSG tỉnh, IELTS >= 6.0, Đường lên đỉnh Olympia...)."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST 2026)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-8",
    "major": "CH1 - Kỹ thuật Hóa học",
    "quota": 400,
    "historicalScores": {
      "2023": 24,
      "2024": 24.5,
      "2025": 24.8
    },
    "averageScore": 24.5
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "A02",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100: Điểm TSA + Điểm ưu tiên"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL (từ 5.0 IELTS trở lên)",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level, AP, IB) kết hợp học bạ >= 8.0.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn (Dành cho HS trường chuyên, HSG tỉnh, IELTS >= 6.0, Đường lên đỉnh Olympia...)."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST 2026)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-9",
    "major": "BF1 - Kỹ thuật Sinh học",
    "quota": 150,
    "historicalScores": {
      "2023": 23.5,
      "2024": 23.8,
      "2025": 24
    },
    "averageScore": 23.8
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "A02",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100: Điểm TSA + Điểm ưu tiên"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL (từ 5.0 IELTS trở lên)",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level, AP, IB) kết hợp học bạ >= 8.0.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn (Dành cho HS trường chuyên, HSG tỉnh, IELTS >= 6.0, Đường lên đỉnh Olympia...)."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST 2026)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-10",
    "major": "FL1 - Tiếng Anh KHKT",
    "quota": 120,
    "historicalScores": {
      "2023": 25,
      "2024": 25.5,
      "2025": 25.8
    },
    "averageScore": 25.5
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "A02",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100: Điểm TSA + Điểm ưu tiên"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL (từ 5.0 IELTS trở lên)",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level, AP, IB) kết hợp học bạ >= 8.0.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn (Dành cho HS trường chuyên, HSG tỉnh, IELTS >= 6.0, Đường lên đỉnh Olympia...)."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST 2026)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-11",
    "major": "MS1 - Kỹ thuật Vật liệu",
    "quota": 250,
    "historicalScores": {
      "2023": 23,
      "2024": 23.5,
      "2025": 23.8
    },
    "averageScore": 23.5
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "A02",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100: Điểm TSA + Điểm ưu tiên"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL (từ 5.0 IELTS trở lên)",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level, AP, IB) kết hợp học bạ >= 8.0.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn (Dành cho HS trường chuyên, HSG tỉnh, IELTS >= 6.0, Đường lên đỉnh Olympia...)."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST 2026)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-12",
    "major": "EM1 - Quản lý Công nghiệp",
    "quota": 100,
    "historicalScores": {
      "2023": 25.5,
      "2024": 26,
      "2025": 26.4
    },
    "averageScore": 26
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "A02",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100: Điểm TSA + Điểm ưu tiên"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL (từ 5.0 IELTS trở lên)",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level, AP, IB) kết hợp học bạ >= 8.0.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn (Dành cho HS trường chuyên, HSG tỉnh, IELTS >= 6.0, Đường lên đỉnh Olympia...)."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST 2026)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-13",
    "major": "TX1 - Kỹ thuật Dệt may",
    "quota": 120,
    "historicalScores": {
      "2023": 22,
      "2024": 22.5,
      "2025": 22.8
    },
    "averageScore": 22.5
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "A02",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100: Điểm TSA + Điểm ưu tiên"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL (từ 5.0 IELTS trở lên)",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level, AP, IB) kết hợp học bạ >= 8.0.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn (Dành cho HS trường chuyên, HSG tỉnh, IELTS >= 6.0, Đường lên đỉnh Olympia...)."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST 2026)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-14",
    "major": "PH1 - Vật lý Kỹ thuật",
    "quota": 120,
    "historicalScores": {
      "2023": 24.5,
      "2024": 25,
      "2025": 25.3
    },
    "averageScore": 25
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "A02",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100: Điểm TSA + Điểm ưu tiên"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL (từ 5.0 IELTS trở lên)",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level, AP, IB) kết hợp học bạ >= 8.0.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn (Dành cho HS trường chuyên, HSG tỉnh, IELTS >= 6.0, Đường lên đỉnh Olympia...)."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST 2026)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-15",
    "major": "EV1 - Kỹ thuật Môi trường",
    "quota": 100,
    "historicalScores": {
      "2023": 23,
      "2024": 23.4,
      "2025": 23.7
    },
    "averageScore": 23.4
  },
  {
    "name": "Đại học Kinh tế Quốc dân",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 28000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Quy đổi IELTS từ 5.5",
      "Ưu tiên HSG cấp tỉnh/Thành phố"
    ],
    "talentAdmission": "Xét tuyển kết hợp đối với học sinh giỏi, chứng chỉ ngoại ngữ.",
    "talentDetails": [
      "Xét tuyển thẳng theo quy định của Bộ GD&ĐT.",
      "Xét tuyển kết hợp chứng chỉ ngoại ngữ quốc tế (IELTS/TOEFL) và điểm bạ/kết quả thi THPT.",
      "Xét tuyển học bạ đối với học sinh giỏi hệ chuyên các trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (NEU)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "NEU-1",
    "major": "Marketing",
    "quota": 280,
    "historicalScores": {
      "2023": 27.5,
      "2024": 28,
      "2025": 28.2
    },
    "averageScore": 28
  },
  {
    "name": "Đại học Kinh tế Quốc dân",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 28000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Quy đổi IELTS từ 5.5",
      "Ưu tiên HSG cấp tỉnh/Thành phố"
    ],
    "talentAdmission": "Xét tuyển kết hợp đối với học sinh giỏi, chứng chỉ ngoại ngữ.",
    "talentDetails": [
      "Xét tuyển thẳng theo quy định của Bộ GD&ĐT.",
      "Xét tuyển kết hợp chứng chỉ ngoại ngữ quốc tế (IELTS/TOEFL) và điểm bạ/kết quả thi THPT.",
      "Xét tuyển học bạ đối với học sinh giỏi hệ chuyên các trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (NEU)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "NEU-2",
    "major": "Kinh doanh Quốc tế",
    "quota": 240,
    "historicalScores": {
      "2023": 27.8,
      "2024": 28.1,
      "2025": 28.3
    },
    "averageScore": 28.1
  },
  {
    "name": "Đại học Kinh tế Quốc dân",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 28000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Quy đổi IELTS từ 5.5",
      "Ưu tiên HSG cấp tỉnh/Thành phố"
    ],
    "talentAdmission": "Xét tuyển kết hợp đối với học sinh giỏi, chứng chỉ ngoại ngữ.",
    "talentDetails": [
      "Xét tuyển thẳng theo quy định của Bộ GD&ĐT.",
      "Xét tuyển kết hợp chứng chỉ ngoại ngữ quốc tế (IELTS/TOEFL) và điểm bạ/kết quả thi THPT.",
      "Xét tuyển học bạ đối với học sinh giỏi hệ chuyên các trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (NEU)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "NEU-3",
    "major": "Kế toán",
    "quota": 300,
    "historicalScores": {
      "2023": 26.5,
      "2024": 26.8,
      "2025": 27
    },
    "averageScore": 26.8
  },
  {
    "name": "Đại học Kinh tế Quốc dân",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 28000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Quy đổi IELTS từ 5.5",
      "Ưu tiên HSG cấp tỉnh/Thành phố"
    ],
    "talentAdmission": "Xét tuyển kết hợp đối với học sinh giỏi, chứng chỉ ngoại ngữ.",
    "talentDetails": [
      "Xét tuyển thẳng theo quy định của Bộ GD&ĐT.",
      "Xét tuyển kết hợp chứng chỉ ngoại ngữ quốc tế (IELTS/TOEFL) và điểm bạ/kết quả thi THPT.",
      "Xét tuyển học bạ đối với học sinh giỏi hệ chuyên các trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (NEU)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "NEU-4",
    "major": "Tài chính Ngân hàng",
    "quota": 300,
    "historicalScores": {
      "2023": 26.8,
      "2024": 27.1,
      "2025": 27.3
    },
    "averageScore": 27.1
  },
  {
    "name": "Đại học Kinh tế Quốc dân",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 28000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Quy đổi IELTS từ 5.5",
      "Ưu tiên HSG cấp tỉnh/Thành phố"
    ],
    "talentAdmission": "Xét tuyển kết hợp đối với học sinh giỏi, chứng chỉ ngoại ngữ.",
    "talentDetails": [
      "Xét tuyển thẳng theo quy định của Bộ GD&ĐT.",
      "Xét tuyển kết hợp chứng chỉ ngoại ngữ quốc tế (IELTS/TOEFL) và điểm bạ/kết quả thi THPT.",
      "Xét tuyển học bạ đối với học sinh giỏi hệ chuyên các trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (NEU)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "NEU-5",
    "major": "Quản trị Kinh doanh",
    "quota": 280,
    "historicalScores": {
      "2023": 27,
      "2024": 27.4,
      "2025": 27.6
    },
    "averageScore": 27.4
  },
  {
    "name": "Đại học Kinh tế Quốc dân",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 28000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Quy đổi IELTS từ 5.5",
      "Ưu tiên HSG cấp tỉnh/Thành phố"
    ],
    "talentAdmission": "Xét tuyển kết hợp đối với học sinh giỏi, chứng chỉ ngoại ngữ.",
    "talentDetails": [
      "Xét tuyển thẳng theo quy định của Bộ GD&ĐT.",
      "Xét tuyển kết hợp chứng chỉ ngoại ngữ quốc tế (IELTS/TOEFL) và điểm bạ/kết quả thi THPT.",
      "Xét tuyển học bạ đối với học sinh giỏi hệ chuyên các trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (NEU)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "NEU-6",
    "major": "Khoa học Dữ liệu trong Kinh tế",
    "quota": 120,
    "historicalScores": {
      "2023": 26.5,
      "2024": 26.9,
      "2025": 27.2
    },
    "averageScore": 26.9
  },
  {
    "name": "Đại học Kinh tế Quốc dân",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 28000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Quy đổi IELTS từ 5.5",
      "Ưu tiên HSG cấp tỉnh/Thành phố"
    ],
    "talentAdmission": "Xét tuyển kết hợp đối với học sinh giỏi, chứng chỉ ngoại ngữ.",
    "talentDetails": [
      "Xét tuyển thẳng theo quy định của Bộ GD&ĐT.",
      "Xét tuyển kết hợp chứng chỉ ngoại ngữ quốc tế (IELTS/TOEFL) và điểm bạ/kết quả thi THPT.",
      "Xét tuyển học bạ đối với học sinh giỏi hệ chuyên các trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (NEU)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "NEU-7",
    "major": "Logistics và Quản lý chuỗi cung ứng",
    "quota": 280,
    "historicalScores": {
      "2023": 27.6,
      "2024": 27.9,
      "2025": 28.1
    },
    "averageScore": 27.9
  },
  {
    "name": "Đại học Kinh tế Quốc dân",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 28000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Quy đổi IELTS từ 5.5",
      "Ưu tiên HSG cấp tỉnh/Thành phố"
    ],
    "talentAdmission": "Xét tuyển kết hợp đối với học sinh giỏi, chứng chỉ ngoại ngữ.",
    "talentDetails": [
      "Xét tuyển thẳng theo quy định của Bộ GD&ĐT.",
      "Xét tuyển kết hợp chứng chỉ ngoại ngữ quốc tế (IELTS/TOEFL) và điểm bạ/kết quả thi THPT.",
      "Xét tuyển học bạ đối với học sinh giỏi hệ chuyên các trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (NEU)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "NEU-8",
    "major": "Kinh tế Đầu tư",
    "quota": 240,
    "historicalScores": {
      "2023": 26,
      "2024": 26.5,
      "2025": 26.7
    },
    "averageScore": 26.5
  },
  {
    "name": "Đại học Kinh tế Quốc dân",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 28000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Quy đổi IELTS từ 5.5",
      "Ưu tiên HSG cấp tỉnh/Thành phố"
    ],
    "talentAdmission": "Xét tuyển kết hợp đối với học sinh giỏi, chứng chỉ ngoại ngữ.",
    "talentDetails": [
      "Xét tuyển thẳng theo quy định của Bộ GD&ĐT.",
      "Xét tuyển kết hợp chứng chỉ ngoại ngữ quốc tế (IELTS/TOEFL) và điểm bạ/kết quả thi THPT.",
      "Xét tuyển học bạ đối với học sinh giỏi hệ chuyên các trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (NEU)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "NEU-9",
    "major": "Thương mại Điện tử",
    "quota": 240,
    "historicalScores": {
      "2023": 27.2,
      "2024": 27.6,
      "2025": 27.8
    },
    "averageScore": 27.6
  },
  {
    "name": "Đại học Kinh tế Quốc dân",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 28000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Quy đổi IELTS từ 5.5",
      "Ưu tiên HSG cấp tỉnh/Thành phố"
    ],
    "talentAdmission": "Xét tuyển kết hợp đối với học sinh giỏi, chứng chỉ ngoại ngữ.",
    "talentDetails": [
      "Xét tuyển thẳng theo quy định của Bộ GD&ĐT.",
      "Xét tuyển kết hợp chứng chỉ ngoại ngữ quốc tế (IELTS/TOEFL) và điểm bạ/kết quả thi THPT.",
      "Xét tuyển học bạ đối với học sinh giỏi hệ chuyên các trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (NEU)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "NEU-10",
    "major": "Hệ thống Thông tin Quản lý",
    "quota": 120,
    "historicalScores": {
      "2023": 26,
      "2024": 26.4,
      "2025": 26.6
    },
    "averageScore": 26.4
  },
  {
    "name": "Đại học Kinh tế Quốc dân",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 28000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Quy đổi IELTS từ 5.5",
      "Ưu tiên HSG cấp tỉnh/Thành phố"
    ],
    "talentAdmission": "Xét tuyển kết hợp đối với học sinh giỏi, chứng chỉ ngoại ngữ.",
    "talentDetails": [
      "Xét tuyển thẳng theo quy định của Bộ GD&ĐT.",
      "Xét tuyển kết hợp chứng chỉ ngoại ngữ quốc tế (IELTS/TOEFL) và điểm bạ/kết quả thi THPT.",
      "Xét tuyển học bạ đối với học sinh giỏi hệ chuyên các trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (NEU)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "NEU-11",
    "major": "Quản trị Nhân lực",
    "quota": 200,
    "historicalScores": {
      "2023": 26.2,
      "2024": 26.6,
      "2025": 26.8
    },
    "averageScore": 26.6
  },
  {
    "name": "Đại học Kinh tế Quốc dân",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 28000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Quy đổi IELTS từ 5.5",
      "Ưu tiên HSG cấp tỉnh/Thành phố"
    ],
    "talentAdmission": "Xét tuyển kết hợp đối với học sinh giỏi, chứng chỉ ngoại ngữ.",
    "talentDetails": [
      "Xét tuyển thẳng theo quy định của Bộ GD&ĐT.",
      "Xét tuyển kết hợp chứng chỉ ngoại ngữ quốc tế (IELTS/TOEFL) và điểm bạ/kết quả thi THPT.",
      "Xét tuyển học bạ đối với học sinh giỏi hệ chuyên các trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (NEU)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "NEU-12",
    "major": "Luật Kinh tế",
    "quota": 180,
    "historicalScores": {
      "2023": 26.5,
      "2024": 26.8,
      "2025": 27.1
    },
    "averageScore": 26.8
  },
  {
    "name": "Đại học Kinh tế Quốc dân",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 28000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Quy đổi IELTS từ 5.5",
      "Ưu tiên HSG cấp tỉnh/Thành phố"
    ],
    "talentAdmission": "Xét tuyển kết hợp đối với học sinh giỏi, chứng chỉ ngoại ngữ.",
    "talentDetails": [
      "Xét tuyển thẳng theo quy định của Bộ GD&ĐT.",
      "Xét tuyển kết hợp chứng chỉ ngoại ngữ quốc tế (IELTS/TOEFL) và điểm bạ/kết quả thi THPT.",
      "Xét tuyển học bạ đối với học sinh giỏi hệ chuyên các trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (NEU)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "NEU-13",
    "major": "Quan hệ Công chúng",
    "quota": 120,
    "historicalScores": {
      "2023": 27.3,
      "2024": 27.7,
      "2025": 28
    },
    "averageScore": 27.7
  },
  {
    "name": "Đại học Kinh tế Quốc dân",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 28000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Quy đổi IELTS từ 5.5",
      "Ưu tiên HSG cấp tỉnh/Thành phố"
    ],
    "talentAdmission": "Xét tuyển kết hợp đối với học sinh giỏi, chứng chỉ ngoại ngữ.",
    "talentDetails": [
      "Xét tuyển thẳng theo quy định của Bộ GD&ĐT.",
      "Xét tuyển kết hợp chứng chỉ ngoại ngữ quốc tế (IELTS/TOEFL) và điểm bạ/kết quả thi THPT.",
      "Xét tuyển học bạ đối với học sinh giỏi hệ chuyên các trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (NEU)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "NEU-14",
    "major": "Ngôn ngữ Anh",
    "quota": 150,
    "historicalScores": {
      "2023": 35.33,
      "2024": 35.87,
      "2025": 36.27
    },
    "averageScore": 35.87,
    "scoreCalculation": {
      "scale": 40,
      "multiplierSubject": "anh",
      "formulaDescription": "Môn Tiếng Anh nhân hệ số 2 (thang 40)"
    }
  },
  {
    "name": "Đại học Kinh tế Quốc dân",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 28000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Quy đổi IELTS từ 5.5",
      "Ưu tiên HSG cấp tỉnh/Thành phố"
    ],
    "talentAdmission": "Xét tuyển kết hợp đối với học sinh giỏi, chứng chỉ ngoại ngữ.",
    "talentDetails": [
      "Xét tuyển thẳng theo quy định của Bộ GD&ĐT.",
      "Xét tuyển kết hợp chứng chỉ ngoại ngữ quốc tế (IELTS/TOEFL) và điểm bạ/kết quả thi THPT.",
      "Xét tuyển học bạ đối với học sinh giỏi hệ chuyên các trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (NEU)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "NEU-15",
    "major": "Kinh doanh Thương mại",
    "quota": 200,
    "historicalScores": {
      "2023": 26.7,
      "2024": 27,
      "2025": 27.3
    },
    "averageScore": 27
  },
  {
    "name": "Học viện Công nghệ Bưu chính Viễn thông",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 24000000,
    "employmentRate": 95,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ ngoại ngữ",
      "Tuyển thẳng HSG Quốc gia"
    ],
    "talentAdmission": "Xét hồ sơ năng lực kết hợp",
    "talentDetails": [
      "Xét tuyển thẳng đối tượng HSG Quốc gia, Quốc tế theo quy định.",
      "Xét tuyển dựa vào hồ sơ năng lực (HSG Tỉnh/Thành phố, Học sinh chuyên).",
      "Xét tuyển kết hợp: Điểm bạ THPT + Chứng chỉ tiếng Anh (IELTS, TOEFL) hoặc SAT/ACT."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (PTIT)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "PTIT-1",
    "major": "Công nghệ Thông tin",
    "quota": 500,
    "historicalScores": {
      "2023": 26,
      "2024": 26.5,
      "2025": 26.8
    },
    "averageScore": 26.5
  },
  {
    "name": "Học viện Công nghệ Bưu chính Viễn thông",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 24000000,
    "employmentRate": 95,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ ngoại ngữ",
      "Tuyển thẳng HSG Quốc gia"
    ],
    "talentAdmission": "Xét hồ sơ năng lực kết hợp",
    "talentDetails": [
      "Xét tuyển thẳng đối tượng HSG Quốc gia, Quốc tế theo quy định.",
      "Xét tuyển dựa vào hồ sơ năng lực (HSG Tỉnh/Thành phố, Học sinh chuyên).",
      "Xét tuyển kết hợp: Điểm bạ THPT + Chứng chỉ tiếng Anh (IELTS, TOEFL) hoặc SAT/ACT."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (PTIT)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "PTIT-2",
    "major": "An toàn Thông tin",
    "quota": 250,
    "historicalScores": {
      "2023": 25.5,
      "2024": 26,
      "2025": 26.3
    },
    "averageScore": 26
  },
  {
    "name": "Học viện Công nghệ Bưu chính Viễn thông",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 24000000,
    "employmentRate": 95,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ ngoại ngữ",
      "Tuyển thẳng HSG Quốc gia"
    ],
    "talentAdmission": "Xét hồ sơ năng lực kết hợp",
    "talentDetails": [
      "Xét tuyển thẳng đối tượng HSG Quốc gia, Quốc tế theo quy định.",
      "Xét tuyển dựa vào hồ sơ năng lực (HSG Tỉnh/Thành phố, Học sinh chuyên).",
      "Xét tuyển kết hợp: Điểm bạ THPT + Chứng chỉ tiếng Anh (IELTS, TOEFL) hoặc SAT/ACT."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (PTIT)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "PTIT-3",
    "major": "Khoa học Máy tính",
    "quota": 200,
    "historicalScores": {
      "2023": 25.8,
      "2024": 26.3,
      "2025": 26.6
    },
    "averageScore": 26.3
  },
  {
    "name": "Học viện Công nghệ Bưu chính Viễn thông",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 24000000,
    "employmentRate": 95,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ ngoại ngữ",
      "Tuyển thẳng HSG Quốc gia"
    ],
    "talentAdmission": "Xét hồ sơ năng lực kết hợp",
    "talentDetails": [
      "Xét tuyển thẳng đối tượng HSG Quốc gia, Quốc tế theo quy định.",
      "Xét tuyển dựa vào hồ sơ năng lực (HSG Tỉnh/Thành phố, Học sinh chuyên).",
      "Xét tuyển kết hợp: Điểm bạ THPT + Chứng chỉ tiếng Anh (IELTS, TOEFL) hoặc SAT/ACT."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (PTIT)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "PTIT-4",
    "major": "Kỹ thuật Điện tử Viễn thông",
    "quota": 300,
    "historicalScores": {
      "2023": 24.5,
      "2024": 25,
      "2025": 25.3
    },
    "averageScore": 25
  },
  {
    "name": "Học viện Công nghệ Bưu chính Viễn thông",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 24000000,
    "employmentRate": 95,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ ngoại ngữ",
      "Tuyển thẳng HSG Quốc gia"
    ],
    "talentAdmission": "Xét hồ sơ năng lực kết hợp",
    "talentDetails": [
      "Xét tuyển thẳng đối tượng HSG Quốc gia, Quốc tế theo quy định.",
      "Xét tuyển dựa vào hồ sơ năng lực (HSG Tỉnh/Thành phố, Học sinh chuyên).",
      "Xét tuyển kết hợp: Điểm bạ THPT + Chứng chỉ tiếng Anh (IELTS, TOEFL) hoặc SAT/ACT."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (PTIT)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "PTIT-5",
    "major": "Công nghệ Đa phương tiện",
    "quota": 250,
    "historicalScores": {
      "2023": 25,
      "2024": 25.5,
      "2025": 25.8
    },
    "averageScore": 25.5
  },
  {
    "name": "Học viện Công nghệ Bưu chính Viễn thông",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 24000000,
    "employmentRate": 95,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ ngoại ngữ",
      "Tuyển thẳng HSG Quốc gia"
    ],
    "talentAdmission": "Xét hồ sơ năng lực kết hợp",
    "talentDetails": [
      "Xét tuyển thẳng đối tượng HSG Quốc gia, Quốc tế theo quy định.",
      "Xét tuyển dựa vào hồ sơ năng lực (HSG Tỉnh/Thành phố, Học sinh chuyên).",
      "Xét tuyển kết hợp: Điểm bạ THPT + Chứng chỉ tiếng Anh (IELTS, TOEFL) hoặc SAT/ACT."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (PTIT)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "PTIT-6",
    "major": "Truyền thông Đa phương tiện",
    "quota": 250,
    "historicalScores": {
      "2023": 25.8,
      "2024": 26.2,
      "2025": 26.5
    },
    "averageScore": 26.2
  },
  {
    "name": "Học viện Công nghệ Bưu chính Viễn thông",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 24000000,
    "employmentRate": 95,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ ngoại ngữ",
      "Tuyển thẳng HSG Quốc gia"
    ],
    "talentAdmission": "Xét hồ sơ năng lực kết hợp",
    "talentDetails": [
      "Xét tuyển thẳng đối tượng HSG Quốc gia, Quốc tế theo quy định.",
      "Xét tuyển dựa vào hồ sơ năng lực (HSG Tỉnh/Thành phố, Học sinh chuyên).",
      "Xét tuyển kết hợp: Điểm bạ THPT + Chứng chỉ tiếng Anh (IELTS, TOEFL) hoặc SAT/ACT."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (PTIT)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "PTIT-7",
    "major": "Thương mại Điện tử",
    "quota": 240,
    "historicalScores": {
      "2023": 25.5,
      "2024": 25.9,
      "2025": 26.2
    },
    "averageScore": 25.9
  },
  {
    "name": "Học viện Công nghệ Bưu chính Viễn thông",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 24000000,
    "employmentRate": 95,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ ngoại ngữ",
      "Tuyển thẳng HSG Quốc gia"
    ],
    "talentAdmission": "Xét hồ sơ năng lực kết hợp",
    "talentDetails": [
      "Xét tuyển thẳng đối tượng HSG Quốc gia, Quốc tế theo quy định.",
      "Xét tuyển dựa vào hồ sơ năng lực (HSG Tỉnh/Thành phố, Học sinh chuyên).",
      "Xét tuyển kết hợp: Điểm bạ THPT + Chứng chỉ tiếng Anh (IELTS, TOEFL) hoặc SAT/ACT."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (PTIT)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "PTIT-8",
    "major": "Marketing",
    "quota": 280,
    "historicalScores": {
      "2023": 25.3,
      "2024": 25.8,
      "2025": 26.1
    },
    "averageScore": 25.8
  },
  {
    "name": "Học viện Công nghệ Bưu chính Viễn thông",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 24000000,
    "employmentRate": 95,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ ngoại ngữ",
      "Tuyển thẳng HSG Quốc gia"
    ],
    "talentAdmission": "Xét hồ sơ năng lực kết hợp",
    "talentDetails": [
      "Xét tuyển thẳng đối tượng HSG Quốc gia, Quốc tế theo quy định.",
      "Xét tuyển dựa vào hồ sơ năng lực (HSG Tỉnh/Thành phố, Học sinh chuyên).",
      "Xét tuyển kết hợp: Điểm bạ THPT + Chứng chỉ tiếng Anh (IELTS, TOEFL) hoặc SAT/ACT."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (PTIT)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "PTIT-9",
    "major": "Công nghệ Tài chính (Fintech)",
    "historicalScores": {
      "2023": 24.8,
      "2024": 25.4,
      "2025": 25.7
    },
    "averageScore": 25.4
  },
  {
    "name": "Học viện Công nghệ Bưu chính Viễn thông",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 24000000,
    "employmentRate": 95,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ ngoại ngữ",
      "Tuyển thẳng HSG Quốc gia"
    ],
    "talentAdmission": "Xét hồ sơ năng lực kết hợp",
    "talentDetails": [
      "Xét tuyển thẳng đối tượng HSG Quốc gia, Quốc tế theo quy định.",
      "Xét tuyển dựa vào hồ sơ năng lực (HSG Tỉnh/Thành phố, Học sinh chuyên).",
      "Xét tuyển kết hợp: Điểm bạ THPT + Chứng chỉ tiếng Anh (IELTS, TOEFL) hoặc SAT/ACT."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (PTIT)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "PTIT-10",
    "major": "Thiết kế Đa phương tiện",
    "quota": 100,
    "historicalScores": {
      "2023": 24.5,
      "2024": 25,
      "2025": 25.3
    },
    "averageScore": 25
  },
  {
    "name": "Học viện Công nghệ Bưu chính Viễn thông",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 24000000,
    "employmentRate": 95,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ ngoại ngữ",
      "Tuyển thẳng HSG Quốc gia"
    ],
    "talentAdmission": "Xét hồ sơ năng lực kết hợp",
    "talentDetails": [
      "Xét tuyển thẳng đối tượng HSG Quốc gia, Quốc tế theo quy định.",
      "Xét tuyển dựa vào hồ sơ năng lực (HSG Tỉnh/Thành phố, Học sinh chuyên).",
      "Xét tuyển kết hợp: Điểm bạ THPT + Chứng chỉ tiếng Anh (IELTS, TOEFL) hoặc SAT/ACT."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (PTIT)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "PTIT-11",
    "major": "Quản trị Kinh doanh",
    "quota": 280,
    "historicalScores": {
      "2023": 24,
      "2024": 24.5,
      "2025": 24.8
    },
    "averageScore": 24.5
  },
  {
    "name": "Học viện Công nghệ Bưu chính Viễn thông",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 24000000,
    "employmentRate": 95,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ ngoại ngữ",
      "Tuyển thẳng HSG Quốc gia"
    ],
    "talentAdmission": "Xét hồ sơ năng lực kết hợp",
    "talentDetails": [
      "Xét tuyển thẳng đối tượng HSG Quốc gia, Quốc tế theo quy định.",
      "Xét tuyển dựa vào hồ sơ năng lực (HSG Tỉnh/Thành phố, Học sinh chuyên).",
      "Xét tuyển kết hợp: Điểm bạ THPT + Chứng chỉ tiếng Anh (IELTS, TOEFL) hoặc SAT/ACT."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (PTIT)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "PTIT-12",
    "major": "Mạng máy tính và TT dữ liệu",
    "quota": 150,
    "historicalScores": {
      "2023": 24.5,
      "2024": 25,
      "2025": 25.4
    },
    "averageScore": 25
  },
  {
    "name": "Học viện Công nghệ Bưu chính Viễn thông",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 24000000,
    "employmentRate": 95,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ ngoại ngữ",
      "Tuyển thẳng HSG Quốc gia"
    ],
    "talentAdmission": "Xét hồ sơ năng lực kết hợp",
    "talentDetails": [
      "Xét tuyển thẳng đối tượng HSG Quốc gia, Quốc tế theo quy định.",
      "Xét tuyển dựa vào hồ sơ năng lực (HSG Tỉnh/Thành phố, Học sinh chuyên).",
      "Xét tuyển kết hợp: Điểm bạ THPT + Chứng chỉ tiếng Anh (IELTS, TOEFL) hoặc SAT/ACT."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (PTIT)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "PTIT-13",
    "major": "Kỹ thuật Điều khiển và Tự động hóa",
    "quota": 150,
    "historicalScores": {
      "2023": 24,
      "2024": 24.6,
      "2025": 24.9
    },
    "averageScore": 24.6
  },
  {
    "name": "Học viện Công nghệ Bưu chính Viễn thông",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 24000000,
    "employmentRate": 95,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ ngoại ngữ",
      "Tuyển thẳng HSG Quốc gia"
    ],
    "talentAdmission": "Xét hồ sơ năng lực kết hợp",
    "talentDetails": [
      "Xét tuyển thẳng đối tượng HSG Quốc gia, Quốc tế theo quy định.",
      "Xét tuyển dựa vào hồ sơ năng lực (HSG Tỉnh/Thành phố, Học sinh chuyên).",
      "Xét tuyển kết hợp: Điểm bạ THPT + Chứng chỉ tiếng Anh (IELTS, TOEFL) hoặc SAT/ACT."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (PTIT)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "PTIT-14",
    "major": "Kế toán",
    "quota": 300,
    "historicalScores": {
      "2023": 23.5,
      "2024": 24,
      "2025": 24.3
    },
    "averageScore": 24
  },
  {
    "name": "Học viện Công nghệ Bưu chính Viễn thông",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 24000000,
    "employmentRate": 95,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)",
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150",
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ ngoại ngữ",
      "Tuyển thẳng HSG Quốc gia"
    ],
    "talentAdmission": "Xét hồ sơ năng lực kết hợp",
    "talentDetails": [
      "Xét tuyển thẳng đối tượng HSG Quốc gia, Quốc tế theo quy định.",
      "Xét tuyển dựa vào hồ sơ năng lực (HSG Tỉnh/Thành phố, Học sinh chuyên).",
      "Xét tuyển kết hợp: Điểm bạ THPT + Chứng chỉ tiếng Anh (IELTS, TOEFL) hoặc SAT/ACT."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (PTIT)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "PTIT-15",
    "major": "Báo chí",
    "quota": 100,
    "historicalScores": {
      "2023": 24.5,
      "2024": 25.1,
      "2025": 25.4
    },
    "averageScore": 25.1
  },
  {
    "name": "Học viện Ngân hàng",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 22000000,
    "employmentRate": 94,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Ưu tiên quy đổi IELTS >= 5.5",
      "Ưu tiên HSG cấp tỉnh"
    ],
    "talentAdmission": "Xét tuyển dựa trên năng lực ngoại ngữ và hồ sơ học bạ",
    "talentDetails": [
      "Tuyển thẳng theo quy chế của BGD&ĐT.",
      "Xét chứng chỉ IELTS từ 5.5 trở lên kết hợp kết quả học tập THPT.",
      "Xét HSG trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HVNH)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "HVNH-1",
    "major": "Tài chính Ngân hàng",
    "quota": 300,
    "historicalScores": {
      "2023": 25,
      "2024": 25.5,
      "2025": 25.8
    },
    "averageScore": 25.5
  },
  {
    "name": "Học viện Ngân hàng",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 22000000,
    "employmentRate": 94,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Ưu tiên quy đổi IELTS >= 5.5",
      "Ưu tiên HSG cấp tỉnh"
    ],
    "talentAdmission": "Xét tuyển dựa trên năng lực ngoại ngữ và hồ sơ học bạ",
    "talentDetails": [
      "Tuyển thẳng theo quy chế của BGD&ĐT.",
      "Xét chứng chỉ IELTS từ 5.5 trở lên kết hợp kết quả học tập THPT.",
      "Xét HSG trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HVNH)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "HVNH-2",
    "major": "Kế toán",
    "quota": 300,
    "historicalScores": {
      "2023": 24.5,
      "2024": 25,
      "2025": 25.3
    },
    "averageScore": 25
  },
  {
    "name": "Học viện Ngân hàng",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 22000000,
    "employmentRate": 94,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Ưu tiên quy đổi IELTS >= 5.5",
      "Ưu tiên HSG cấp tỉnh"
    ],
    "talentAdmission": "Xét tuyển dựa trên năng lực ngoại ngữ và hồ sơ học bạ",
    "talentDetails": [
      "Tuyển thẳng theo quy chế của BGD&ĐT.",
      "Xét chứng chỉ IELTS từ 5.5 trở lên kết hợp kết quả học tập THPT.",
      "Xét HSG trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HVNH)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "HVNH-3",
    "major": "Quản trị Kinh doanh",
    "quota": 280,
    "historicalScores": {
      "2023": 24.8,
      "2024": 25.2,
      "2025": 25.5
    },
    "averageScore": 25.2
  },
  {
    "name": "Học viện Ngân hàng",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 22000000,
    "employmentRate": 94,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Ưu tiên quy đổi IELTS >= 5.5",
      "Ưu tiên HSG cấp tỉnh"
    ],
    "talentAdmission": "Xét tuyển dựa trên năng lực ngoại ngữ và hồ sơ học bạ",
    "talentDetails": [
      "Tuyển thẳng theo quy chế của BGD&ĐT.",
      "Xét chứng chỉ IELTS từ 5.5 trở lên kết hợp kết quả học tập THPT.",
      "Xét HSG trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HVNH)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "HVNH-4",
    "major": "Hệ thống Thông tin Quản lý",
    "quota": 120,
    "historicalScores": {
      "2023": 24,
      "2024": 24.5,
      "2025": 24.8
    },
    "averageScore": 24.5
  },
  {
    "name": "Học viện Ngân hàng",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 22000000,
    "employmentRate": 94,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Ưu tiên quy đổi IELTS >= 5.5",
      "Ưu tiên HSG cấp tỉnh"
    ],
    "talentAdmission": "Xét tuyển dựa trên năng lực ngoại ngữ và hồ sơ học bạ",
    "talentDetails": [
      "Tuyển thẳng theo quy chế của BGD&ĐT.",
      "Xét chứng chỉ IELTS từ 5.5 trở lên kết hợp kết quả học tập THPT.",
      "Xét HSG trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HVNH)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "HVNH-5",
    "major": "Kinh doanh Quốc tế",
    "quota": 240,
    "historicalScores": {
      "2023": 25.2,
      "2024": 25.7,
      "2025": 26
    },
    "averageScore": 25.7
  },
  {
    "name": "Học viện Ngân hàng",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 22000000,
    "employmentRate": 94,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Ưu tiên quy đổi IELTS >= 5.5",
      "Ưu tiên HSG cấp tỉnh"
    ],
    "talentAdmission": "Xét tuyển dựa trên năng lực ngoại ngữ và hồ sơ học bạ",
    "talentDetails": [
      "Tuyển thẳng theo quy chế của BGD&ĐT.",
      "Xét chứng chỉ IELTS từ 5.5 trở lên kết hợp kết quả học tập THPT.",
      "Xét HSG trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HVNH)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "HVNH-6",
    "major": "Ngôn ngữ Anh",
    "quota": 150,
    "historicalScores": {
      "2023": 32.67,
      "2024": 33.33,
      "2025": 33.73
    },
    "averageScore": 33.33,
    "scoreCalculation": {
      "scale": 40,
      "multiplierSubject": "anh",
      "formulaDescription": "Môn Tiếng Anh nhân hệ số 2 (thang 40)"
    }
  },
  {
    "name": "Học viện Ngân hàng",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 22000000,
    "employmentRate": 94,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Ưu tiên quy đổi IELTS >= 5.5",
      "Ưu tiên HSG cấp tỉnh"
    ],
    "talentAdmission": "Xét tuyển dựa trên năng lực ngoại ngữ và hồ sơ học bạ",
    "talentDetails": [
      "Tuyển thẳng theo quy chế của BGD&ĐT.",
      "Xét chứng chỉ IELTS từ 5.5 trở lên kết hợp kết quả học tập THPT.",
      "Xét HSG trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HVNH)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "HVNH-7",
    "major": "Luật Kinh tế",
    "quota": 180,
    "historicalScores": {
      "2023": 24.8,
      "2024": 25.3,
      "2025": 25.6
    },
    "averageScore": 25.3
  },
  {
    "name": "Học viện Ngân hàng",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 22000000,
    "employmentRate": 94,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Ưu tiên quy đổi IELTS >= 5.5",
      "Ưu tiên HSG cấp tỉnh"
    ],
    "talentAdmission": "Xét tuyển dựa trên năng lực ngoại ngữ và hồ sơ học bạ",
    "talentDetails": [
      "Tuyển thẳng theo quy chế của BGD&ĐT.",
      "Xét chứng chỉ IELTS từ 5.5 trở lên kết hợp kết quả học tập THPT.",
      "Xét HSG trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HVNH)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "HVNH-8",
    "major": "Kinh tế Đầu tư",
    "quota": 240,
    "historicalScores": {
      "2023": 24,
      "2024": 24.6,
      "2025": 24.9
    },
    "averageScore": 24.6
  },
  {
    "name": "Học viện Ngân hàng",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 22000000,
    "employmentRate": 94,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Ưu tiên quy đổi IELTS >= 5.5",
      "Ưu tiên HSG cấp tỉnh"
    ],
    "talentAdmission": "Xét tuyển dựa trên năng lực ngoại ngữ và hồ sơ học bạ",
    "talentDetails": [
      "Tuyển thẳng theo quy chế của BGD&ĐT.",
      "Xét chứng chỉ IELTS từ 5.5 trở lên kết hợp kết quả học tập THPT.",
      "Xét HSG trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HVNH)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "HVNH-9",
    "major": "Công nghệ Thông tin",
    "quota": 500,
    "historicalScores": {
      "2023": 24.5,
      "2024": 25.1,
      "2025": 25.4
    },
    "averageScore": 25.1
  },
  {
    "name": "Học viện Ngân hàng",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 22000000,
    "employmentRate": 94,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Ưu tiên quy đổi IELTS >= 5.5",
      "Ưu tiên HSG cấp tỉnh"
    ],
    "talentAdmission": "Xét tuyển dựa trên năng lực ngoại ngữ và hồ sơ học bạ",
    "talentDetails": [
      "Tuyển thẳng theo quy chế của BGD&ĐT.",
      "Xét chứng chỉ IELTS từ 5.5 trở lên kết hợp kết quả học tập THPT.",
      "Xét HSG trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HVNH)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "HVNH-10",
    "major": "Kiểm toán",
    "quota": 120,
    "historicalScores": {
      "2023": 25,
      "2024": 25.5,
      "2025": 25.8
    },
    "averageScore": 25.5
  },
  {
    "name": "Học viện Ngân hàng",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 22000000,
    "employmentRate": 94,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Ưu tiên quy đổi IELTS >= 5.5",
      "Ưu tiên HSG cấp tỉnh"
    ],
    "talentAdmission": "Xét tuyển dựa trên năng lực ngoại ngữ và hồ sơ học bạ",
    "talentDetails": [
      "Tuyển thẳng theo quy chế của BGD&ĐT.",
      "Xét chứng chỉ IELTS từ 5.5 trở lên kết hợp kết quả học tập THPT.",
      "Xét HSG trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HVNH)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "HVNH-11",
    "major": "Marketing",
    "quota": 280,
    "historicalScores": {
      "2023": 24.8,
      "2024": 25.3,
      "2025": 25.6
    },
    "averageScore": 25.3
  },
  {
    "name": "Học viện Ngân hàng",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 22000000,
    "employmentRate": 94,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Ưu tiên quy đổi IELTS >= 5.5",
      "Ưu tiên HSG cấp tỉnh"
    ],
    "talentAdmission": "Xét tuyển dựa trên năng lực ngoại ngữ và hồ sơ học bạ",
    "talentDetails": [
      "Tuyển thẳng theo quy chế của BGD&ĐT.",
      "Xét chứng chỉ IELTS từ 5.5 trở lên kết hợp kết quả học tập THPT.",
      "Xét HSG trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HVNH)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "HVNH-12",
    "major": "Logistics",
    "quota": 150,
    "historicalScores": {
      "2023": 24.5,
      "2024": 25,
      "2025": 25.3
    },
    "averageScore": 25
  },
  {
    "name": "Học viện Ngân hàng",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 22000000,
    "employmentRate": 94,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Ưu tiên quy đổi IELTS >= 5.5",
      "Ưu tiên HSG cấp tỉnh"
    ],
    "talentAdmission": "Xét tuyển dựa trên năng lực ngoại ngữ và hồ sơ học bạ",
    "talentDetails": [
      "Tuyển thẳng theo quy chế của BGD&ĐT.",
      "Xét chứng chỉ IELTS từ 5.5 trở lên kết hợp kết quả học tập THPT.",
      "Xét HSG trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HVNH)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "HVNH-13",
    "major": "Kinh tế Quốc tế",
    "quota": 150,
    "historicalScores": {
      "2023": 25,
      "2024": 25.5,
      "2025": 25.8
    },
    "averageScore": 25.5
  },
  {
    "name": "Học viện Ngân hàng",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 22000000,
    "employmentRate": 94,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Ưu tiên quy đổi IELTS >= 5.5",
      "Ưu tiên HSG cấp tỉnh"
    ],
    "talentAdmission": "Xét tuyển dựa trên năng lực ngoại ngữ và hồ sơ học bạ",
    "talentDetails": [
      "Tuyển thẳng theo quy chế của BGD&ĐT.",
      "Xét chứng chỉ IELTS từ 5.5 trở lên kết hợp kết quả học tập THPT.",
      "Xét HSG trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HVNH)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "HVNH-14",
    "major": "Quản trị Nhân lực",
    "quota": 200,
    "historicalScores": {
      "2023": 23.8,
      "2024": 24.3,
      "2025": 24.6
    },
    "averageScore": 24.3
  },
  {
    "name": "Học viện Ngân hàng",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 22000000,
    "employmentRate": 94,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Ưu tiên quy đổi IELTS >= 5.5",
      "Ưu tiên HSG cấp tỉnh"
    ],
    "talentAdmission": "Xét tuyển dựa trên năng lực ngoại ngữ và hồ sơ học bạ",
    "talentDetails": [
      "Tuyển thẳng theo quy chế của BGD&ĐT.",
      "Xét chứng chỉ IELTS từ 5.5 trở lên kết hợp kết quả học tập THPT.",
      "Xét HSG trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HVNH)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "HVNH-15",
    "major": "Tài chính Kế toán",
    "quota": 120,
    "historicalScores": {
      "2023": 24.5,
      "2024": 25,
      "2025": 25.3
    },
    "averageScore": 25
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level) kết hợp học bạ.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-16",
    "major": "EM2 - Quản trị Kinh doanh",
    "quota": 120,
    "historicalScores": {
      "2023": 26,
      "2024": 26.5,
      "2025": 26.8
    },
    "averageScore": 26.5
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level) kết hợp học bạ.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-17",
    "major": "EM3 - Kế toán",
    "quota": 120,
    "historicalScores": {
      "2023": 25.5,
      "2024": 26,
      "2025": 26.2
    },
    "averageScore": 26
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level) kết hợp học bạ.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-18",
    "major": "EM4 - Tài chính Ngân hàng",
    "quota": 120,
    "historicalScores": {
      "2023": 25.8,
      "2024": 26.3,
      "2025": 26.5
    },
    "averageScore": 26.3
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level) kết hợp học bạ.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-19",
    "major": "EM5 - Phân tích Kinh doanh",
    "quota": 60,
    "historicalScores": {
      "2023": 26.5,
      "2024": 27,
      "2025": 27.2
    },
    "averageScore": 27
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level) kết hợp học bạ.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-20",
    "major": "EM6 - Logistics và Quản lý chuỗi cung ứng",
    "quota": 60,
    "historicalScores": {
      "2023": 26.8,
      "2024": 27.2,
      "2025": 27.4
    },
    "averageScore": 27.2
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level) kết hợp học bạ.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-21",
    "major": "EM7 - Kinh tế Công nghiệp",
    "quota": 60,
    "historicalScores": {
      "2023": 24.5,
      "2024": 25,
      "2025": 25.3
    },
    "averageScore": 25
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level) kết hợp học bạ.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-22",
    "major": "EM-E13 - Quản trị Doanh nghiệp (TA)",
    "historicalScores": {
      "2023": 25,
      "2024": 25.5,
      "2025": 25.8
    },
    "averageScore": 25.5
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level) kết hợp học bạ.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-23",
    "major": "EM-E14 - Kinh tế Quốc tế (TA)",
    "historicalScores": {
      "2023": 25.5,
      "2024": 26,
      "2025": 26.3
    },
    "averageScore": 26
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level) kết hợp học bạ.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-24",
    "major": "EM-VUG - Quản trị kinh doanh (Việt - Pháp)",
    "historicalScores": {
      "2023": 24,
      "2024": 24.5,
      "2025": 24.8
    },
    "averageScore": 24.5
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level) kết hợp học bạ.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-25",
    "major": "Hệ thống Thông tin Quản lý",
    "quota": 120,
    "historicalScores": {
      "2023": 26.2,
      "2024": 26.6,
      "2025": 26.9
    },
    "averageScore": 26.6
  },
  {
    "name": "Đại học Ngoại thương",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 30000000,
    "employmentRate": 99,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Quy đổi điểm IELTS từ 6.5"
    ],
    "talentAdmission": "Xét tuyển kết hợp chứng chỉ ngoại ngữ và học bạ",
    "talentDetails": [
      "Xét tuyển kết hợp chứng chỉ quốc tế (IELTS/TOEFL) và điểm học bạ."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (FTU)",
        "table": {
          "6.5": "8.5 điểm",
          "7.0": "9.0 điểm",
          ">= 8.0": "10.0 điểm"
        }
      }
    ],
    "id": "UNI1-1",
    "major": "Kinh tế đối ngoại",
    "historicalScores": {
      "2023": 28,
      "2024": 28.5,
      "2025": 28.8
    },
    "averageScore": 28.5
  },
  {
    "name": "Đại học Ngoại thương",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 30000000,
    "employmentRate": 99,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Quy đổi điểm IELTS từ 6.5"
    ],
    "talentAdmission": "Xét tuyển kết hợp chứng chỉ ngoại ngữ và học bạ",
    "talentDetails": [
      "Xét tuyển kết hợp chứng chỉ quốc tế (IELTS/TOEFL) và điểm học bạ."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (FTU)",
        "table": {
          "6.5": "8.5 điểm",
          "7.0": "9.0 điểm",
          ">= 8.0": "10.0 điểm"
        }
      }
    ],
    "id": "UNI1-2",
    "major": "Thương mại quốc tế",
    "historicalScores": {
      "2023": 27.5,
      "2024": 28,
      "2025": 28.2
    },
    "averageScore": 28
  },
  {
    "name": "Đại học Ngoại thương",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 30000000,
    "employmentRate": 99,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Quy đổi điểm IELTS từ 6.5"
    ],
    "talentAdmission": "Xét tuyển kết hợp chứng chỉ ngoại ngữ và học bạ",
    "talentDetails": [
      "Xét tuyển kết hợp chứng chỉ quốc tế (IELTS/TOEFL) và điểm học bạ."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (FTU)",
        "table": {
          "6.5": "8.5 điểm",
          "7.0": "9.0 điểm",
          ">= 8.0": "10.0 điểm"
        }
      }
    ],
    "id": "UNI1-3",
    "major": "Tài chính quốc tế",
    "historicalScores": {
      "2023": 27.8,
      "2024": 28.2,
      "2025": 28.5
    },
    "averageScore": 28.2
  },
  {
    "name": "Đại học Ngoại thương",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 30000000,
    "employmentRate": 99,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Quy đổi điểm IELTS từ 6.5"
    ],
    "talentAdmission": "Xét tuyển kết hợp chứng chỉ ngoại ngữ và học bạ",
    "talentDetails": [
      "Xét tuyển kết hợp chứng chỉ quốc tế (IELTS/TOEFL) và điểm học bạ."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (FTU)",
        "table": {
          "6.5": "8.5 điểm",
          "7.0": "9.0 điểm",
          ">= 8.0": "10.0 điểm"
        }
      }
    ],
    "id": "UNI1-4",
    "major": "Quản trị kinh doanh quốc tế",
    "historicalScores": {
      "2023": 27.6,
      "2024": 28,
      "2025": 28.3
    },
    "averageScore": 28
  },
  {
    "name": "Đại học Ngoại thương",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 30000000,
    "employmentRate": 99,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Quy đổi điểm IELTS từ 6.5"
    ],
    "talentAdmission": "Xét tuyển kết hợp chứng chỉ ngoại ngữ và học bạ",
    "talentDetails": [
      "Xét tuyển kết hợp chứng chỉ quốc tế (IELTS/TOEFL) và điểm học bạ."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (FTU)",
        "table": {
          "6.5": "8.5 điểm",
          "7.0": "9.0 điểm",
          ">= 8.0": "10.0 điểm"
        }
      }
    ],
    "id": "UNI1-5",
    "major": "Ngôn ngữ Anh thương mại",
    "historicalScores": {
      "2023": 36.27,
      "2024": 36.67,
      "2025": 37.07
    },
    "averageScore": 36.67,
    "scoreCalculation": {
      "scale": 40,
      "multiplierSubject": "anh",
      "formulaDescription": "Môn Tiếng Anh nhân hệ số 2 (thang 40)"
    }
  },
  {
    "name": "Đại học Thương mại",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 23000000,
    "employmentRate": 95,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Quy đổi điểm IELTS"
    ],
    "talentAdmission": "Xét tuyển kết hợp học bạ và chứng chỉ",
    "talentDetails": [
      "Xét tuyển kết hợp đối với học sinh giỏi."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (TMU)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "9.0 điểm",
          ">= 6.5": "10.0 điểm"
        }
      }
    ],
    "id": "UNI2-1",
    "major": "Marketing thương mại",
    "historicalScores": {
      "2023": 26,
      "2024": 26.5,
      "2025": 26.8
    },
    "averageScore": 26.5
  },
  {
    "name": "Đại học Thương mại",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 23000000,
    "employmentRate": 95,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Quy đổi điểm IELTS"
    ],
    "talentAdmission": "Xét tuyển kết hợp học bạ và chứng chỉ",
    "talentDetails": [
      "Xét tuyển kết hợp đối với học sinh giỏi."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (TMU)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "9.0 điểm",
          ">= 6.5": "10.0 điểm"
        }
      }
    ],
    "id": "UNI2-2",
    "major": "Quản trị thương hiệu",
    "historicalScores": {
      "2023": 25.5,
      "2024": 26,
      "2025": 26.3
    },
    "averageScore": 26
  },
  {
    "name": "Đại học Thương mại",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 23000000,
    "employmentRate": 95,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Quy đổi điểm IELTS"
    ],
    "talentAdmission": "Xét tuyển kết hợp học bạ và chứng chỉ",
    "talentDetails": [
      "Xét tuyển kết hợp đối với học sinh giỏi."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (TMU)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "9.0 điểm",
          ">= 6.5": "10.0 điểm"
        }
      }
    ],
    "id": "UNI2-3",
    "major": "Kế toán doanh nghiệp",
    "quota": 60,
    "historicalScores": {
      "2023": 25.8,
      "2024": 26.2,
      "2025": 26.5
    },
    "averageScore": 26.2
  },
  {
    "name": "Đại học Thương mại",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 23000000,
    "employmentRate": 95,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Quy đổi điểm IELTS"
    ],
    "talentAdmission": "Xét tuyển kết hợp học bạ và chứng chỉ",
    "talentDetails": [
      "Xét tuyển kết hợp đối với học sinh giỏi."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (TMU)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "9.0 điểm",
          ">= 6.5": "10.0 điểm"
        }
      }
    ],
    "id": "UNI2-4",
    "major": "Quản trị nhân lực",
    "historicalScores": {
      "2023": 25,
      "2024": 25.5,
      "2025": 25.8
    },
    "averageScore": 25.5
  },
  {
    "name": "Đại học Thương mại",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 23000000,
    "employmentRate": 95,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Quy đổi điểm IELTS"
    ],
    "talentAdmission": "Xét tuyển kết hợp học bạ và chứng chỉ",
    "talentDetails": [
      "Xét tuyển kết hợp đối với học sinh giỏi."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (TMU)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "9.0 điểm",
          ">= 6.5": "10.0 điểm"
        }
      }
    ],
    "id": "UNI2-5",
    "major": "Thương mại điện tử",
    "historicalScores": {
      "2023": 26.2,
      "2024": 26.7,
      "2025": 27
    },
    "averageScore": 26.7
  },
  {
    "name": "Đại học Y Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 45000000,
    "employmentRate": 99,
    "subjectBlocks": [
      "B00"
    ],
    "specialExams": [],
    "priorityPolicies": [
      "Tuyển thẳng HSG Sinh học Quốc gia"
    ],
    "talentAdmission": "Tuyển thẳng giải Quốc gia",
    "talentDetails": [
      "Tuyển thẳng đối tượng đạt giải Sinh học Quốc gia, Quốc tế."
    ],
    "id": "UNI3-1",
    "major": "Y khoa",
    "quota": 400,
    "historicalScores": {
      "2023": 28,
      "2024": 28.5,
      "2025": 28.8
    },
    "averageScore": 28.5
  },
  {
    "name": "Đại học Y Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 45000000,
    "employmentRate": 99,
    "subjectBlocks": [
      "B00"
    ],
    "specialExams": [],
    "priorityPolicies": [
      "Tuyển thẳng HSG Sinh học Quốc gia"
    ],
    "talentAdmission": "Tuyển thẳng giải Quốc gia",
    "talentDetails": [
      "Tuyển thẳng đối tượng đạt giải Sinh học Quốc gia, Quốc tế."
    ],
    "id": "UNI3-2",
    "major": "Răng Hàm Mặt",
    "historicalScores": {
      "2023": 27.5,
      "2024": 28,
      "2025": 28.3
    },
    "averageScore": 28
  },
  {
    "name": "Đại học Y Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 45000000,
    "employmentRate": 99,
    "subjectBlocks": [
      "B00"
    ],
    "specialExams": [],
    "priorityPolicies": [
      "Tuyển thẳng HSG Sinh học Quốc gia"
    ],
    "talentAdmission": "Tuyển thẳng giải Quốc gia",
    "talentDetails": [
      "Tuyển thẳng đối tượng đạt giải Sinh học Quốc gia, Quốc tế."
    ],
    "id": "UNI3-3",
    "major": "Y học dự phòng",
    "historicalScores": {
      "2023": 25,
      "2024": 25.5,
      "2025": 25.8
    },
    "averageScore": 25.5
  },
  {
    "name": "Đại học Y Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 45000000,
    "employmentRate": 99,
    "subjectBlocks": [
      "B00"
    ],
    "specialExams": [],
    "priorityPolicies": [
      "Tuyển thẳng HSG Sinh học Quốc gia"
    ],
    "talentAdmission": "Tuyển thẳng giải Quốc gia",
    "talentDetails": [
      "Tuyển thẳng đối tượng đạt giải Sinh học Quốc gia, Quốc tế."
    ],
    "id": "UNI3-4",
    "major": "Khúc xạ nhãn khoa",
    "historicalScores": {
      "2023": 26,
      "2024": 26.5,
      "2025": 26.8
    },
    "averageScore": 26.5
  },
  {
    "name": "Đại học Y Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 45000000,
    "employmentRate": 99,
    "subjectBlocks": [
      "B00"
    ],
    "specialExams": [],
    "priorityPolicies": [
      "Tuyển thẳng HSG Sinh học Quốc gia"
    ],
    "talentAdmission": "Tuyển thẳng giải Quốc gia",
    "talentDetails": [
      "Tuyển thẳng đối tượng đạt giải Sinh học Quốc gia, Quốc tế."
    ],
    "id": "UNI3-5",
    "major": "Điều dưỡng",
    "historicalScores": {
      "2023": 24,
      "2024": 24.5,
      "2025": 24.8
    },
    "averageScore": 24.5
  },
  {
    "name": "Học viện Tài chính",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 24000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Cộng điểm IELTS từ 5.5"
    ],
    "talentAdmission": "Xét kết hợp",
    "talentDetails": [
      "Xét kết hợp chứng chỉ IELTS/TOEFL và điểm thi THPT."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (AOF)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          ">= 6.5": "10.0 điểm"
        }
      }
    ],
    "id": "UNI4-1",
    "major": "Hải quan & Logistics",
    "historicalScores": {
      "2023": 26,
      "2024": 26.5,
      "2025": 26.8
    },
    "averageScore": 26.5
  },
  {
    "name": "Học viện Tài chính",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 24000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Cộng điểm IELTS từ 5.5"
    ],
    "talentAdmission": "Xét kết hợp",
    "talentDetails": [
      "Xét kết hợp chứng chỉ IELTS/TOEFL và điểm thi THPT."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (AOF)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          ">= 6.5": "10.0 điểm"
        }
      }
    ],
    "id": "UNI4-2",
    "major": "Kế toán công",
    "historicalScores": {
      "2023": 25.5,
      "2024": 26,
      "2025": 26.3
    },
    "averageScore": 26
  },
  {
    "name": "Học viện Tài chính",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 24000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Cộng điểm IELTS từ 5.5"
    ],
    "talentAdmission": "Xét kết hợp",
    "talentDetails": [
      "Xét kết hợp chứng chỉ IELTS/TOEFL và điểm thi THPT."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (AOF)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          ">= 6.5": "10.0 điểm"
        }
      }
    ],
    "id": "UNI4-3",
    "major": "Tài chính doanh nghiệp",
    "historicalScores": {
      "2023": 25.8,
      "2024": 26.3,
      "2025": 26.6
    },
    "averageScore": 26.3
  },
  {
    "name": "Học viện Tài chính",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 24000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Cộng điểm IELTS từ 5.5"
    ],
    "talentAdmission": "Xét kết hợp",
    "talentDetails": [
      "Xét kết hợp chứng chỉ IELTS/TOEFL và điểm thi THPT."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (AOF)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          ">= 6.5": "10.0 điểm"
        }
      }
    ],
    "id": "UNI4-4",
    "major": "Thuế",
    "quota": 150,
    "historicalScores": {
      "2023": 25.2,
      "2024": 25.7,
      "2025": 26
    },
    "averageScore": 25.7
  },
  {
    "name": "Học viện Tài chính",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 24000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Cộng điểm IELTS từ 5.5"
    ],
    "talentAdmission": "Xét kết hợp",
    "talentDetails": [
      "Xét kết hợp chứng chỉ IELTS/TOEFL và điểm thi THPT."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (AOF)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          ">= 6.5": "10.0 điểm"
        }
      }
    ],
    "id": "UNI4-5",
    "major": "Kiểm toán",
    "quota": 120,
    "historicalScores": {
      "2023": 26.2,
      "2024": 26.6,
      "2025": 26.9
    },
    "averageScore": 26.6
  },
  {
    "name": "ĐH Quốc gia Hà Nội - ĐH Công nghệ",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 30000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi IELTS"
    ],
    "talentAdmission": "Xét hồ sơ năng lực ĐHQG",
    "talentDetails": [
      "Tuyển thẳng theo quy định ĐHQGHN.",
      "Xét kết hợp IELTS >= 5.5."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (UET)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          ">= 6.5": "10.0 điểm"
        }
      }
    ],
    "id": "UNI5-1",
    "major": "Công nghệ thông tin",
    "historicalScores": {
      "2023": 27,
      "2024": 27.5,
      "2025": 27.8
    },
    "averageScore": 27.5
  },
  {
    "name": "ĐH Quốc gia Hà Nội - ĐH Công nghệ",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 30000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi IELTS"
    ],
    "talentAdmission": "Xét hồ sơ năng lực ĐHQG",
    "talentDetails": [
      "Tuyển thẳng theo quy định ĐHQGHN.",
      "Xét kết hợp IELTS >= 5.5."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (UET)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          ">= 6.5": "10.0 điểm"
        }
      }
    ],
    "id": "UNI5-2",
    "major": "Kỹ thuật Robot",
    "historicalScores": {
      "2023": 26.5,
      "2024": 27,
      "2025": 27.2
    },
    "averageScore": 27
  },
  {
    "name": "ĐH Quốc gia Hà Nội - ĐH Công nghệ",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 30000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi IELTS"
    ],
    "talentAdmission": "Xét hồ sơ năng lực ĐHQG",
    "talentDetails": [
      "Tuyển thẳng theo quy định ĐHQGHN.",
      "Xét kết hợp IELTS >= 5.5."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (UET)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          ">= 6.5": "10.0 điểm"
        }
      }
    ],
    "id": "UNI5-3",
    "major": "Trí tuệ nhân tạo",
    "historicalScores": {
      "2023": 27.2,
      "2024": 27.6,
      "2025": 27.9
    },
    "averageScore": 27.6
  },
  {
    "name": "ĐH Quốc gia Hà Nội - ĐH Công nghệ",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 30000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi IELTS"
    ],
    "talentAdmission": "Xét hồ sơ năng lực ĐHQG",
    "talentDetails": [
      "Tuyển thẳng theo quy định ĐHQGHN.",
      "Xét kết hợp IELTS >= 5.5."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (UET)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          ">= 6.5": "10.0 điểm"
        }
      }
    ],
    "id": "UNI5-4",
    "major": "Vật lý kỹ thuật",
    "historicalScores": {
      "2023": 25,
      "2024": 25.5,
      "2025": 25.8
    },
    "averageScore": 25.5
  },
  {
    "name": "ĐH Quốc gia Hà Nội - ĐH Công nghệ",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 30000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi IELTS"
    ],
    "talentAdmission": "Xét hồ sơ năng lực ĐHQG",
    "talentDetails": [
      "Tuyển thẳng theo quy định ĐHQGHN.",
      "Xét kết hợp IELTS >= 5.5."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (UET)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          ">= 6.5": "10.0 điểm"
        }
      }
    ],
    "id": "UNI5-5",
    "major": "Cơ kỹ thuật",
    "quota": 100,
    "historicalScores": {
      "2023": 25.5,
      "2024": 26,
      "2025": 26.3
    },
    "averageScore": 26
  },
  {
    "name": "ĐH Quốc gia Hà Nội - ĐH Kinh tế",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 97,
    "subjectBlocks": [
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Cộng điểm IELTS"
    ],
    "talentAdmission": "Xét kết hợp chứng chỉ",
    "talentDetails": [
      "Tuyển thẳng HSG Quốc gia.",
      "Xét kết hợp IELTS."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (UEB)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          ">= 6.5": "10.0 điểm"
        }
      }
    ],
    "id": "UNI6-1",
    "major": "Kinh tế quốc tế",
    "historicalScores": {
      "2023": 27,
      "2024": 27.4,
      "2025": 27.6
    },
    "averageScore": 27.4
  },
  {
    "name": "ĐH Quốc gia Hà Nội - ĐH Kinh tế",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 97,
    "subjectBlocks": [
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Cộng điểm IELTS"
    ],
    "talentAdmission": "Xét kết hợp chứng chỉ",
    "talentDetails": [
      "Tuyển thẳng HSG Quốc gia.",
      "Xét kết hợp IELTS."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (UEB)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          ">= 6.5": "10.0 điểm"
        }
      }
    ],
    "id": "UNI6-2",
    "major": "Quản trị kinh doanh",
    "historicalScores": {
      "2023": 26.5,
      "2024": 26.8,
      "2025": 27
    },
    "averageScore": 26.8
  },
  {
    "name": "ĐH Quốc gia Hà Nội - ĐH Kinh tế",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 97,
    "subjectBlocks": [
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Cộng điểm IELTS"
    ],
    "talentAdmission": "Xét kết hợp chứng chỉ",
    "talentDetails": [
      "Tuyển thẳng HSG Quốc gia.",
      "Xét kết hợp IELTS."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (UEB)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          ">= 6.5": "10.0 điểm"
        }
      }
    ],
    "id": "UNI6-3",
    "major": "Tài chính ngân hàng",
    "historicalScores": {
      "2023": 26.2,
      "2024": 26.6,
      "2025": 26.8
    },
    "averageScore": 26.6
  },
  {
    "name": "ĐH Quốc gia Hà Nội - ĐH Kinh tế",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 97,
    "subjectBlocks": [
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Cộng điểm IELTS"
    ],
    "talentAdmission": "Xét kết hợp chứng chỉ",
    "talentDetails": [
      "Tuyển thẳng HSG Quốc gia.",
      "Xét kết hợp IELTS."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (UEB)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          ">= 6.5": "10.0 điểm"
        }
      }
    ],
    "id": "UNI6-4",
    "major": "Kế toán kiểm toán",
    "historicalScores": {
      "2023": 25.8,
      "2024": 26.2,
      "2025": 26.5
    },
    "averageScore": 26.2
  },
  {
    "name": "ĐH Quốc gia Hà Nội - ĐH Kinh tế",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 35000000,
    "employmentRate": 97,
    "subjectBlocks": [
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Cộng điểm IELTS"
    ],
    "talentAdmission": "Xét kết hợp chứng chỉ",
    "talentDetails": [
      "Tuyển thẳng HSG Quốc gia.",
      "Xét kết hợp IELTS."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (UEB)",
        "table": {
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          ">= 6.5": "10.0 điểm"
        }
      }
    ],
    "id": "UNI6-5",
    "major": "Kinh tế phát triển",
    "historicalScores": {
      "2023": 25.5,
      "2024": 25.9,
      "2025": 26.2
    },
    "averageScore": 25.9
  },
  {
    "name": "Học viện Ngoại giao",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 38000000,
    "employmentRate": 95,
    "subjectBlocks": [
      "A01",
      "D01",
      "D03",
      "D04"
    ],
    "specialExams": [],
    "priorityPolicies": [
      "Quy đổi IELTS"
    ],
    "talentAdmission": "Tuyển thẳng HSG Quốc gia",
    "talentDetails": [
      "Xét tuyển kết hợp IELTS >= 6.5 và điểm học bạ."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (DAV)",
        "table": {
          "6.5": "8.5 điểm",
          "7.0": "9.0 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "UNI7-1",
    "major": "Quan hệ quốc tế",
    "historicalScores": {
      "2023": 27,
      "2024": 27.5,
      "2025": 27.8
    },
    "averageScore": 27.5
  },
  {
    "name": "Học viện Ngoại giao",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 38000000,
    "employmentRate": 95,
    "subjectBlocks": [
      "A01",
      "D01",
      "D03",
      "D04"
    ],
    "specialExams": [],
    "priorityPolicies": [
      "Quy đổi IELTS"
    ],
    "talentAdmission": "Tuyển thẳng HSG Quốc gia",
    "talentDetails": [
      "Xét tuyển kết hợp IELTS >= 6.5 và điểm học bạ."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (DAV)",
        "table": {
          "6.5": "8.5 điểm",
          "7.0": "9.0 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "UNI7-2",
    "major": "Truyền thông quốc tế",
    "historicalScores": {
      "2023": 27.5,
      "2024": 27.9,
      "2025": 28.1
    },
    "averageScore": 27.9
  },
  {
    "name": "Học viện Ngoại giao",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 38000000,
    "employmentRate": 95,
    "subjectBlocks": [
      "A01",
      "D01",
      "D03",
      "D04"
    ],
    "specialExams": [],
    "priorityPolicies": [
      "Quy đổi IELTS"
    ],
    "talentAdmission": "Tuyển thẳng HSG Quốc gia",
    "talentDetails": [
      "Xét tuyển kết hợp IELTS >= 6.5 và điểm học bạ."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (DAV)",
        "table": {
          "6.5": "8.5 điểm",
          "7.0": "9.0 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "UNI7-3",
    "major": "Kinh tế quốc tế",
    "historicalScores": {
      "2023": 26.8,
      "2024": 27.2,
      "2025": 27.4
    },
    "averageScore": 27.2
  },
  {
    "name": "Học viện Ngoại giao",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 38000000,
    "employmentRate": 95,
    "subjectBlocks": [
      "A01",
      "D01",
      "D03",
      "D04"
    ],
    "specialExams": [],
    "priorityPolicies": [
      "Quy đổi IELTS"
    ],
    "talentAdmission": "Tuyển thẳng HSG Quốc gia",
    "talentDetails": [
      "Xét tuyển kết hợp IELTS >= 6.5 và điểm học bạ."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (DAV)",
        "table": {
          "6.5": "8.5 điểm",
          "7.0": "9.0 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "UNI7-4",
    "major": "Luật quốc tế",
    "historicalScores": {
      "2023": 26.5,
      "2024": 26.9,
      "2025": 27.2
    },
    "averageScore": 26.9
  },
  {
    "name": "Học viện Ngoại giao",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 38000000,
    "employmentRate": 95,
    "subjectBlocks": [
      "A01",
      "D01",
      "D03",
      "D04"
    ],
    "specialExams": [],
    "priorityPolicies": [
      "Quy đổi IELTS"
    ],
    "talentAdmission": "Tuyển thẳng HSG Quốc gia",
    "talentDetails": [
      "Xét tuyển kết hợp IELTS >= 6.5 và điểm học bạ."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (DAV)",
        "table": {
          "6.5": "8.5 điểm",
          "7.0": "9.0 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "UNI7-5",
    "major": "Ngôn ngữ Anh",
    "quota": 150,
    "historicalScores": {
      "2023": 35.73,
      "2024": 36.13,
      "2025": 36.53
    },
    "averageScore": 36.13,
    "scoreCalculation": {
      "scale": 40,
      "multiplierSubject": "anh",
      "formulaDescription": "Môn Tiếng Anh nhân hệ số 2 (thang 40)"
    }
  },
  {
    "name": "Đại học Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 28000000,
    "employmentRate": 94,
    "subjectBlocks": [
      "D01",
      "D04",
      "D06"
    ],
    "specialExams": [],
    "priorityPolicies": [
      "Tuyển thẳng"
    ],
    "talentAdmission": "Xét kết hợp",
    "talentDetails": [
      "Xét kết hợp chứng chỉ ngoại ngữ."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (HANU)",
        "table": {
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "UNI8-1",
    "major": "Ngôn ngữ Anh",
    "quota": 150,
    "historicalScores": {
      "2023": 34.67,
      "2024": 35.33,
      "2025": 35.73
    },
    "averageScore": 35.33,
    "scoreCalculation": {
      "scale": 40,
      "multiplierSubject": "anh",
      "formulaDescription": "Môn Tiếng Anh nhân hệ số 2 (thang 40)"
    }
  },
  {
    "name": "Đại học Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 28000000,
    "employmentRate": 94,
    "subjectBlocks": [
      "D01",
      "D04",
      "D06"
    ],
    "specialExams": [],
    "priorityPolicies": [
      "Tuyển thẳng"
    ],
    "talentAdmission": "Xét kết hợp",
    "talentDetails": [
      "Xét kết hợp chứng chỉ ngoại ngữ."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (HANU)",
        "table": {
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "UNI8-2",
    "major": "Ngôn ngữ Hàn Quốc",
    "quota": 200,
    "historicalScores": {
      "2023": 35.33,
      "2024": 36,
      "2025": 36.4
    },
    "averageScore": 36,
    "scoreCalculation": {
      "scale": 40,
      "multiplierSubject": "anh",
      "formulaDescription": "Môn Tiếng Anh nhân hệ số 2 (thang 40)"
    }
  },
  {
    "name": "Đại học Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 28000000,
    "employmentRate": 94,
    "subjectBlocks": [
      "D01",
      "D04",
      "D06"
    ],
    "specialExams": [],
    "priorityPolicies": [
      "Tuyển thẳng"
    ],
    "talentAdmission": "Xét kết hợp",
    "talentDetails": [
      "Xét kết hợp chứng chỉ ngoại ngữ."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (HANU)",
        "table": {
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "UNI8-3",
    "major": "Ngôn ngữ Trung Quốc",
    "quota": 250,
    "historicalScores": {
      "2023": 34.93,
      "2024": 35.73,
      "2025": 36.13
    },
    "averageScore": 35.73,
    "scoreCalculation": {
      "scale": 40,
      "multiplierSubject": "anh",
      "formulaDescription": "Môn Tiếng Anh nhân hệ số 2 (thang 40)"
    }
  },
  {
    "name": "Đại học Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 28000000,
    "employmentRate": 94,
    "subjectBlocks": [
      "D01",
      "D04",
      "D06"
    ],
    "specialExams": [],
    "priorityPolicies": [
      "Tuyển thẳng"
    ],
    "talentAdmission": "Xét kết hợp",
    "talentDetails": [
      "Xét kết hợp chứng chỉ ngoại ngữ."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (HANU)",
        "table": {
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "UNI8-4",
    "major": "Ngôn ngữ Nhật",
    "quota": 200,
    "historicalScores": {
      "2023": 34.4,
      "2024": 35.07,
      "2025": 35.47
    },
    "averageScore": 35.07,
    "scoreCalculation": {
      "scale": 40,
      "multiplierSubject": "anh",
      "formulaDescription": "Môn Tiếng Anh nhân hệ số 2 (thang 40)"
    }
  },
  {
    "name": "Đại học Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 28000000,
    "employmentRate": 94,
    "subjectBlocks": [
      "D01",
      "D04",
      "D06"
    ],
    "specialExams": [],
    "priorityPolicies": [
      "Tuyển thẳng"
    ],
    "talentAdmission": "Xét kết hợp",
    "talentDetails": [
      "Xét kết hợp chứng chỉ ngoại ngữ."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Quy đổi IELTS (HANU)",
        "table": {
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "UNI8-5",
    "major": "Quản trị dịch vụ du lịch",
    "historicalScores": {
      "2023": 25.5,
      "2024": 26,
      "2025": 26.3
    },
    "averageScore": 26
  },
  {
    "name": "Đại học Xây dựng Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 24000000,
    "employmentRate": 92,
    "subjectBlocks": [
      "A00",
      "A01",
      "V00"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Cộng điểm IELTS"
    ],
    "talentAdmission": "Xét kết hợp học bạ",
    "talentDetails": [
      "Xét học bạ kết hợp chứng chỉ ngoại ngữ."
    ],
    "id": "UNI9-1",
    "major": "Kỹ thuật Xây dựng",
    "historicalScores": {
      "2023": 24,
      "2024": 24.5,
      "2025": 24.8
    },
    "averageScore": 24.5
  },
  {
    "name": "Đại học Xây dựng Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 24000000,
    "employmentRate": 92,
    "subjectBlocks": [
      "A00",
      "A01",
      "V00"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Cộng điểm IELTS"
    ],
    "talentAdmission": "Xét kết hợp học bạ",
    "talentDetails": [
      "Xét học bạ kết hợp chứng chỉ ngoại ngữ."
    ],
    "id": "UNI9-2",
    "major": "Kiến trúc",
    "quota": 350,
    "historicalScores": {
      "2023": 25,
      "2024": 25.5,
      "2025": 25.8
    },
    "averageScore": 25.5
  },
  {
    "name": "Đại học Xây dựng Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 24000000,
    "employmentRate": 92,
    "subjectBlocks": [
      "A00",
      "A01",
      "V00"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Cộng điểm IELTS"
    ],
    "talentAdmission": "Xét kết hợp học bạ",
    "talentDetails": [
      "Xét học bạ kết hợp chứng chỉ ngoại ngữ."
    ],
    "id": "UNI9-3",
    "major": "Quy hoạch vùng và đô thị",
    "historicalScores": {
      "2023": 23.5,
      "2024": 24,
      "2025": 24.3
    },
    "averageScore": 24
  },
  {
    "name": "Đại học Xây dựng Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 24000000,
    "employmentRate": 92,
    "subjectBlocks": [
      "A00",
      "A01",
      "V00"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Cộng điểm IELTS"
    ],
    "talentAdmission": "Xét kết hợp học bạ",
    "talentDetails": [
      "Xét học bạ kết hợp chứng chỉ ngoại ngữ."
    ],
    "id": "UNI9-4",
    "major": "Kỹ thuật cấp thoát nước",
    "historicalScores": {
      "2023": 22.5,
      "2024": 23,
      "2025": 23.3
    },
    "averageScore": 23
  },
  {
    "name": "Đại học Xây dựng Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 24000000,
    "employmentRate": 92,
    "subjectBlocks": [
      "A00",
      "A01",
      "V00"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Cộng điểm IELTS"
    ],
    "talentAdmission": "Xét kết hợp học bạ",
    "talentDetails": [
      "Xét học bạ kết hợp chứng chỉ ngoại ngữ."
    ],
    "id": "UNI9-5",
    "major": "Kỹ thuật vật liệu",
    "historicalScores": {
      "2023": 23,
      "2024": 23.5,
      "2025": 23.8
    },
    "averageScore": 23.5
  },
  {
    "name": "Đại học Giao thông Vận tải",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 22000000,
    "employmentRate": 93,
    "subjectBlocks": [
      "A00",
      "A01"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Cộng điểm IELTS"
    ],
    "talentAdmission": "Tuyển thẳng",
    "talentDetails": [
      "Tuyển thẳng HSG thi tỉnh/thành phố."
    ],
    "id": "UNI10-1",
    "major": "Kỹ thuật Ô tô",
    "quota": 250,
    "historicalScores": {
      "2023": 25,
      "2024": 25.5,
      "2025": 25.8
    },
    "averageScore": 25.5
  },
  {
    "name": "Đại học Giao thông Vận tải",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 22000000,
    "employmentRate": 93,
    "subjectBlocks": [
      "A00",
      "A01"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Cộng điểm IELTS"
    ],
    "talentAdmission": "Tuyển thẳng",
    "talentDetails": [
      "Tuyển thẳng HSG thi tỉnh/thành phố."
    ],
    "id": "UNI10-2",
    "major": "Kỹ thuật cơ điện tử",
    "historicalScores": {
      "2023": 24.5,
      "2024": 25,
      "2025": 25.3
    },
    "averageScore": 25
  },
  {
    "name": "Đại học Giao thông Vận tải",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 22000000,
    "employmentRate": 93,
    "subjectBlocks": [
      "A00",
      "A01"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Cộng điểm IELTS"
    ],
    "talentAdmission": "Tuyển thẳng",
    "talentDetails": [
      "Tuyển thẳng HSG thi tỉnh/thành phố."
    ],
    "id": "UNI10-3",
    "major": "Kỹ thuật xây dựng công trình giao thông",
    "historicalScores": {
      "2023": 23,
      "2024": 23.5,
      "2025": 23.8
    },
    "averageScore": 23.5
  },
  {
    "name": "Đại học Giao thông Vận tải",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 22000000,
    "employmentRate": 93,
    "subjectBlocks": [
      "A00",
      "A01"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Cộng điểm IELTS"
    ],
    "talentAdmission": "Tuyển thẳng",
    "talentDetails": [
      "Tuyển thẳng HSG thi tỉnh/thành phố."
    ],
    "id": "UNI10-4",
    "major": "Logistics",
    "quota": 150,
    "historicalScores": {
      "2023": 25.8,
      "2024": 26.3,
      "2025": 26.6
    },
    "averageScore": 26.3
  },
  {
    "name": "Đại học Giao thông Vận tải",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 22000000,
    "employmentRate": 93,
    "subjectBlocks": [
      "A00",
      "A01"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Điểm TSA × 30/100"
    },
    "priorityPolicies": [
      "Cộng điểm IELTS"
    ],
    "talentAdmission": "Tuyển thẳng",
    "talentDetails": [
      "Tuyển thẳng HSG thi tỉnh/thành phố."
    ],
    "id": "UNI10-5",
    "major": "Quản trị kinh doanh giao thông",
    "historicalScores": {
      "2023": 24,
      "2024": 24.5,
      "2025": 24.8
    },
    "averageScore": 24.5
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 45000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level) kết hợp học bạ.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-MORE-26",
    "major": "IT-E6 - Công nghệ Thông tin (Việt - Nhật)",
    "historicalScores": {
      "2023": 27,
      "2024": 27.5,
      "2025": 27.8
    },
    "averageScore": 27.5
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 45000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level) kết hợp học bạ.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-MORE-27",
    "major": "IT-E7 - Công nghệ Thông tin (Global ICT)",
    "historicalScores": {
      "2023": 27.5,
      "2024": 28,
      "2025": 28.3
    },
    "averageScore": 28
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 45000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level) kết hợp học bạ.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-MORE-28",
    "major": "IT-E15 - An toàn Không gian mạng (Tiên tiến)",
    "historicalScores": {
      "2023": 36.27,
      "2024": 36.8,
      "2025": 37.2
    },
    "averageScore": 36.8,
    "scoreCalculation": {
      "scale": 40,
      "multiplierSubject": "toan",
      "formulaDescription": "Môn Toán nhân hệ số 2 (thang 40)"
    }
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 45000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level) kết hợp học bạ.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-MORE-29",
    "major": "ME-E1 - Cơ điện tử (Chương trình Tiên tiến)",
    "historicalScores": {
      "2023": 34.67,
      "2024": 35.33,
      "2025": 35.73
    },
    "averageScore": 35.33,
    "scoreCalculation": {
      "scale": 40,
      "multiplierSubject": "toan",
      "formulaDescription": "Môn Toán nhân hệ số 2 (thang 40)"
    }
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 45000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level) kết hợp học bạ.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-MORE-30",
    "major": "EE-E8 - Tự động hóa (Chương trình Tiên tiến)",
    "historicalScores": {
      "2023": 35.33,
      "2024": 36,
      "2025": 36.4
    },
    "averageScore": 36,
    "scoreCalculation": {
      "scale": 40,
      "multiplierSubject": "toan",
      "formulaDescription": "Môn Toán nhân hệ số 2 (thang 40)"
    }
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 45000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level) kết hợp học bạ.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-MORE-31",
    "major": "MS-E3 - Kỹ thuật Vật liệu (Tiên tiến)",
    "historicalScores": {
      "2023": 32,
      "2024": 32.67,
      "2025": 33.07
    },
    "averageScore": 32.67,
    "scoreCalculation": {
      "scale": 40,
      "multiplierSubject": "toan",
      "formulaDescription": "Môn Toán nhân hệ số 2 (thang 40)"
    }
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 45000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level) kết hợp học bạ.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-MORE-32",
    "major": "CH-E11 - Kỹ thuật Hóa học (Tiên tiến)",
    "historicalScores": {
      "2023": 32.67,
      "2024": 33.33,
      "2025": 33.73
    },
    "averageScore": 33.33,
    "scoreCalculation": {
      "scale": 40,
      "multiplierSubject": "toan",
      "formulaDescription": "Môn Toán nhân hệ số 2 (thang 40)"
    }
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 45000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level) kết hợp học bạ.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-MORE-33",
    "major": "ET1 - Kỹ thuật Y sinh",
    "quota": 120,
    "historicalScores": {
      "2023": 26,
      "2024": 26.5,
      "2025": 26.8
    },
    "averageScore": 26.5
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 45000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level) kết hợp học bạ.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-MORE-34",
    "major": "ET-E4 - Kỹ thuật Y sinh (Tiên tiến)",
    "historicalScores": {
      "2023": 34,
      "2024": 34.67,
      "2025": 35.07
    },
    "averageScore": 34.67,
    "scoreCalculation": {
      "scale": 40,
      "multiplierSubject": "toan",
      "formulaDescription": "Môn Toán nhân hệ số 2 (thang 40)"
    }
  },
  {
    "name": "Đại học Bách Khoa Hà Nội",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 45000000,
    "employmentRate": 98,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá tư duy - TSA (ĐHBK)"
    ],
    "conversionFormulas": {
      "Đánh giá tư duy - TSA (ĐHBK)": "Xét trực tiếp thang 100"
    },
    "priorityPolicies": [
      "Cộng điểm quy đổi chứng chỉ IELTS/TOEFL",
      "Cộng điểm giải HSG các cấp"
    ],
    "talentAdmission": "Tuyển thẳng chứng chỉ quốc tế SAT/ACT/A-Level; Học sinh giỏi Quốc gia, Tỉnh/Thành phố",
    "talentDetails": [
      "Diện 1.1: Xét tuyển thẳng HSG Quốc gia, Quốc tế, KHKT Quốc gia.",
      "Diện 1.2: Xét tuyển chứng chỉ quốc tế (SAT, ACT, A-Level) kết hợp học bạ.",
      "Diện 1.3: Xét hồ sơ năng lực kết hợp phỏng vấn."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HUST)",
        "table": {
          "5.0": "8.0 điểm",
          "5.5": "8.5 điểm",
          "6.0": "9.0 điểm",
          "6.5": "9.5 điểm",
          ">= 7.0": "10.0 điểm"
        }
      }
    ],
    "id": "HUST-MORE-35",
    "major": "MI1 - Toán tin",
    "quota": 150,
    "historicalScores": {
      "2023": 28,
      "2024": 28.5,
      "2025": 28.8
    },
    "averageScore": 28.5
  },
  {
    "name": "Học viện Ngân hàng",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 32000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Ưu tiên quy đổi IELTS >= 5.5",
      "Ưu tiên HSG cấp tỉnh"
    ],
    "talentAdmission": "Xét tuyển dựa trên năng lực ngoại ngữ và hồ sơ học bạ",
    "talentDetails": [
      "Tuyển thẳng theo quy chế của BGD&ĐT.",
      "Xét chứng chỉ IELTS từ 5.5 trở lên kết hợp kết quả học tập THPT.",
      "Xét HSG trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HVNH)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "HVNH-MORE-16",
    "major": "Tài chính Ngân hàng (CLC)",
    "historicalScores": {
      "2023": 25.5,
      "2024": 26,
      "2025": 26.3
    },
    "averageScore": 26
  },
  {
    "name": "Học viện Ngân hàng",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 32000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Ưu tiên quy đổi IELTS >= 5.5",
      "Ưu tiên HSG cấp tỉnh"
    ],
    "talentAdmission": "Xét tuyển dựa trên năng lực ngoại ngữ và hồ sơ học bạ",
    "talentDetails": [
      "Tuyển thẳng theo quy chế của BGD&ĐT.",
      "Xét chứng chỉ IELTS từ 5.5 trở lên kết hợp kết quả học tập THPT.",
      "Xét HSG trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HVNH)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "HVNH-MORE-17",
    "major": "Kế toán (CLC)",
    "historicalScores": {
      "2023": 25,
      "2024": 25.5,
      "2025": 25.8
    },
    "averageScore": 25.5
  },
  {
    "name": "Học viện Ngân hàng",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 32000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Ưu tiên quy đổi IELTS >= 5.5",
      "Ưu tiên HSG cấp tỉnh"
    ],
    "talentAdmission": "Xét tuyển dựa trên năng lực ngoại ngữ và hồ sơ học bạ",
    "talentDetails": [
      "Tuyển thẳng theo quy chế của BGD&ĐT.",
      "Xét chứng chỉ IELTS từ 5.5 trở lên kết hợp kết quả học tập THPT.",
      "Xét HSG trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HVNH)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "HVNH-MORE-18",
    "major": "Quản trị Kinh doanh (CLC)",
    "historicalScores": {
      "2023": 25.2,
      "2024": 25.7,
      "2025": 26
    },
    "averageScore": 25.7
  },
  {
    "name": "Học viện Ngân hàng",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 32000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Ưu tiên quy đổi IELTS >= 5.5",
      "Ưu tiên HSG cấp tỉnh"
    ],
    "talentAdmission": "Xét tuyển dựa trên năng lực ngoại ngữ và hồ sơ học bạ",
    "talentDetails": [
      "Tuyển thẳng theo quy chế của BGD&ĐT.",
      "Xét chứng chỉ IELTS từ 5.5 trở lên kết hợp kết quả học tập THPT.",
      "Xét HSG trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HVNH)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "HVNH-MORE-19",
    "major": "Hệ thống Thông tin Quản lý (CLC)",
    "historicalScores": {
      "2023": 24.5,
      "2024": 25,
      "2025": 25.3
    },
    "averageScore": 25
  },
  {
    "name": "Học viện Ngân hàng",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 32000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Ưu tiên quy đổi IELTS >= 5.5",
      "Ưu tiên HSG cấp tỉnh"
    ],
    "talentAdmission": "Xét tuyển dựa trên năng lực ngoại ngữ và hồ sơ học bạ",
    "talentDetails": [
      "Tuyển thẳng theo quy chế của BGD&ĐT.",
      "Xét chứng chỉ IELTS từ 5.5 trở lên kết hợp kết quả học tập THPT.",
      "Xét HSG trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HVNH)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "HVNH-MORE-20",
    "major": "Ngân hàng Số (Digital Banking)",
    "historicalScores": {
      "2023": 25.8,
      "2024": 26.3,
      "2025": 26.6
    },
    "averageScore": 26.3
  },
  {
    "name": "Học viện Ngân hàng",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 32000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Ưu tiên quy đổi IELTS >= 5.5",
      "Ưu tiên HSG cấp tỉnh"
    ],
    "talentAdmission": "Xét tuyển dựa trên năng lực ngoại ngữ và hồ sơ học bạ",
    "talentDetails": [
      "Tuyển thẳng theo quy chế của BGD&ĐT.",
      "Xét chứng chỉ IELTS từ 5.5 trở lên kết hợp kết quả học tập THPT.",
      "Xét HSG trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HVNH)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "HVNH-MORE-21",
    "major": "Công nghệ Tài chính (Fintech)",
    "historicalScores": {
      "2023": 26,
      "2024": 26.5,
      "2025": 26.8
    },
    "averageScore": 26.5
  },
  {
    "name": "Học viện Ngân hàng",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 32000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Ưu tiên quy đổi IELTS >= 5.5",
      "Ưu tiên HSG cấp tỉnh"
    ],
    "talentAdmission": "Xét tuyển dựa trên năng lực ngoại ngữ và hồ sơ học bạ",
    "talentDetails": [
      "Tuyển thẳng theo quy chế của BGD&ĐT.",
      "Xét chứng chỉ IELTS từ 5.5 trở lên kết hợp kết quả học tập THPT.",
      "Xét HSG trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HVNH)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "HVNH-MORE-22",
    "major": "Kế toán (Định hướng Nhật Bản)",
    "historicalScores": {
      "2023": 24.8,
      "2024": 25.2,
      "2025": 25.5
    },
    "averageScore": 25.2
  },
  {
    "name": "Học viện Ngân hàng",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 32000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Ưu tiên quy đổi IELTS >= 5.5",
      "Ưu tiên HSG cấp tỉnh"
    ],
    "talentAdmission": "Xét tuyển dựa trên năng lực ngoại ngữ và hồ sơ học bạ",
    "talentDetails": [
      "Tuyển thẳng theo quy chế của BGD&ĐT.",
      "Xét chứng chỉ IELTS từ 5.5 trở lên kết hợp kết quả học tập THPT.",
      "Xét HSG trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HVNH)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "HVNH-MORE-23",
    "major": "Kế toán doanh nghiệp",
    "quota": 60,
    "historicalScores": {
      "2023": 24.5,
      "2024": 25,
      "2025": 25.3
    },
    "averageScore": 25
  },
  {
    "name": "Học viện Ngân hàng",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 32000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Ưu tiên quy đổi IELTS >= 5.5",
      "Ưu tiên HSG cấp tỉnh"
    ],
    "talentAdmission": "Xét tuyển dựa trên năng lực ngoại ngữ và hồ sơ học bạ",
    "talentDetails": [
      "Tuyển thẳng theo quy chế của BGD&ĐT.",
      "Xét chứng chỉ IELTS từ 5.5 trở lên kết hợp kết quả học tập THPT.",
      "Xét HSG trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HVNH)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "HVNH-MORE-24",
    "major": "Kinh doanh quốc tế (CLC)",
    "historicalScores": {
      "2023": 25.6,
      "2024": 26.1,
      "2025": 26.4
    },
    "averageScore": 26.1
  },
  {
    "name": "Học viện Ngân hàng",
    "type": "Công lập",
    "location": "Khu vực 1",
    "feePerYear": 32000000,
    "employmentRate": 96,
    "subjectBlocks": [
      "A00",
      "A01",
      "D01",
      "D07"
    ],
    "specialExams": [
      "Đánh giá năng lực - HSA (ĐHQGHN)"
    ],
    "conversionFormulas": {
      "Đánh giá năng lực - HSA (ĐHQGHN)": "Điểm HSA × 30/150"
    },
    "priorityPolicies": [
      "Ưu tiên quy đổi IELTS >= 5.5",
      "Ưu tiên HSG cấp tỉnh"
    ],
    "talentAdmission": "Xét tuyển dựa trên năng lực ngoại ngữ và hồ sơ học bạ",
    "talentDetails": [
      "Tuyển thẳng theo quy chế của BGD&ĐT.",
      "Xét chứng chỉ IELTS từ 5.5 trở lên kết hợp kết quả học tập THPT.",
      "Xét HSG trường THPT chuyên trên toàn quốc."
    ],
    "priorityDetails": [
      {
        "type": "ielts",
        "title": "Bảng quy đổi điểm IELTS sang thang 10 (HVNH)",
        "table": {
          "5.5": "8.0 điểm",
          "6.0": "8.5 điểm",
          "6.5": "9.0 điểm",
          "7.0": "9.5 điểm",
          ">= 7.5": "10.0 điểm"
        }
      }
    ],
    "id": "HVNH-MORE-25",
    "major": "Kinh tế quốc tế (CLC)",
    "historicalScores": {
      "2023": 25.5,
      "2024": 26,
      "2025": 26.3
    },
    "averageScore": 26
  }
];

export const massiveUniversities: UniversityProgram[] = rawMassiveUniversities.map(hydrateProgram);
