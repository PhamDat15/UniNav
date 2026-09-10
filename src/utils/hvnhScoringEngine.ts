import { HVNH_MAJORS, HVNHMajor } from '../data/hvnhAdmissionsData';

export type PriorityArea = 'KV1' | 'KV2-NT' | 'KV2' | 'KV3';
export type PriorityGroup = 'none' | 'UT1' | 'UT2'; // Đối tượng ưu tiên 1, 2
export type SchoolType = 'specialized' | 'standard'; // Trường THPT chuyên hay thường

export interface HVNHCandidateProfile {
  fullName?: string;
  phone?: string;
  area: PriorityArea;
  group: PriorityGroup;
  schoolType: SchoolType;
  
  // Điểm thưởng giải học sinh giỏi
  nationalAward?: 'none' | 'first' | 'second' | 'third' | 'consolation';
  provincialAward?: 'none' | 'first' | 'second' | 'third' | 'consolation';

  // Chứng chỉ ngoại ngữ & quốc tế (IELTS, TOEFL iBT, SAT, ACT, JLPT)
  englishCertType?: 'none' | 'ielts' | 'toefl_ibt' | 'sat' | 'act' | 'jlpt';
  certScore?: number; // Ví dụ 6.5 (IELTS), 80 (TOEFL), 1300 (SAT), 28 (ACT), hoặc 5 (JLPT N5=5, N4=4, N3=3, N2=2, N1=1)

  // Điểm trung bình học bạ 3 năm THPT (thang 10)
  transcriptScores: {
    math?: number;
    literature?: number;
    english?: number;
    physics?: number;
    chemistry?: number;
    history?: number;
    geography?: number;
    informatics?: number;
  };

  // Điểm thi tốt nghiệp THPT (hoặc dự kiến thi, thang 10)
  examScores?: {
    math?: number;
    literature?: number;
    english?: number;
    physics?: number;
    chemistry?: number;
    history?: number;
    geography?: number;
  };

  // Điểm ĐGNL ĐHQGHN (HSA, thang 150)
  hsaScore?: number;

  // Điểm thi ĐGNL V-SAT (thang 450)
  vsatScore?: number;
}

export interface MethodResult {
  methodCode: 'PT1' | 'PT2_CCQT' | 'PT2_HSA' | 'PT2_VSAT' | 'PT3_HOCBA' | 'PT4_THPT';
  methodName: string;
  category: 'Xét tuyển thẳng' | 'Xét tuyển kết hợp' | 'Xét học bạ THPT' | 'Điểm thi THPT';
  score: number;
  maxScore: number;
  isEligible: boolean;
  notes: string;
  detailBreakdown: {
    rawBaseScore: number;
    bonusPoints: number;
    priorityPoints: number;
    convertedScore: number;
  };
}

export interface MajorEvaluation {
  major: HVNHMajor;
  bestMethod: MethodResult;
  allMethods: MethodResult[];
  admissionChance: 'Rất cao (An toàn)' | 'Khả thi (Mục tiêu)' | 'Thử thách (Ước mơ)' | 'Rủi ro cao';
  chanceBadgeColor: string;
  scoreDiff: number; // Điểm chênh lệch so với điểm chuẩn mục tiêu của phương thức tương ứng
  benchmarkTarget: number; // Điểm chuẩn xét tuyển tương ứng (sớm hoặc THPT)
}

// Bảng quy đổi chứng chỉ sang thang 10 theo quy định HVNH
export function convertCertToScore(type: HVNHCandidateProfile['englishCertType'], score: number): number {
  if (!score || type === 'none') return 0;

  if (type === 'ielts') {
    if (score >= 7.0) return 10.0;
    if (score >= 6.5) return 9.5;
    if (score >= 6.0) return 9.0;
    if (score >= 5.5) return 8.5;
    return 0;
  }

  if (type === 'toefl_ibt') {
    if (score >= 94) return 10.0;
    if (score >= 79) return 9.5;
    if (score >= 60) return 9.0;
    if (score >= 46) return 8.5;
    return 0;
  }

  if (type === 'sat') {
    // SAT thang 1600 (yêu cầu >= 1200)
    if (score >= 1400) return 10.0;
    if (score >= 1300) return 9.5;
    if (score >= 1250) return 9.0;
    if (score >= 1200) return 8.5;
    return 0;
  }

  if (type === 'act') {
    // ACT thang 36 (yêu cầu >= 26)
    if (score >= 32) return 10.0;
    if (score >= 29) return 9.5;
    if (score >= 27) return 9.0;
    if (score >= 26) return 8.5;
    return 0;
  }

  if (type === 'jlpt') {
    // JLPT: N1 (1), N2 (2), N3 (3), N4 (4), N5 (5)
    if (score === 1) return 10.0; // N1
    if (score === 2) return 9.5;  // N2
    if (score === 3) return 9.0;  // N3
    if (score === 4) return 8.5;  // N4
    if (score === 5) return 8.0;  // N5
    return 0;
  }

  return 0;
}

// Bảng quy đổi IELTS sang thang 10 (giữ nguyên tương thích cũ)
export function convertIeltsToScore(ielts: number): number {
  return convertCertToScore('ielts', ielts);
}

// Tính điểm ưu tiên khu vực & đối tượng (giảm điểm khi tổng >= 22.5 theo quy chế Bộ GD&ĐT)
export function calculatePriorityPoints(area: PriorityArea, group: PriorityGroup, baseTotal: number): number {
  let areaPoint = 0;
  if (area === 'KV1') areaPoint = 0.75;
  else if (area === 'KV2-NT') areaPoint = 0.50;
  else if (area === 'KV2') areaPoint = 0.25;
  else areaPoint = 0;

  let groupPoint = 0;
  if (group === 'UT1') groupPoint = 2.0;
  else if (group === 'UT2') groupPoint = 1.0;

  const totalRawPriority = areaPoint + groupPoint;
  if (totalRawPriority <= 0) return 0;

  if (baseTotal >= 22.5 && baseTotal <= 30) {
    const factor = (30 - baseTotal) / 7.5;
    return parseFloat((totalRawPriority * factor).toFixed(2));
  } else if (baseTotal > 30) {
    return 0;
  }

  return totalRawPriority;
}

// Tính điểm thưởng giải HSG & học sinh trường chuyên
export function calculateBonusPoints(profile: HVNHCandidateProfile, isCertUsedForBase: boolean): number {
  let bonus = 0;

  // 1. Giải HSG Quốc gia
  if (profile.nationalAward === 'first') bonus += 3.0;
  else if (profile.nationalAward === 'second') bonus += 2.5;
  else if (profile.nationalAward === 'third') bonus += 2.0;
  else if (profile.nationalAward === 'consolation') bonus += 1.5;

  // 2. Điểm xét thưởng (HS trường chuyên & HSG tỉnh, tối đa 1.5đ)
  let provBonus = 0;
  if (profile.schoolType === 'specialized') {
    provBonus += 0.5; // Điểm cộng học sinh trường chuyên
  }
  if (profile.provincialAward === 'first') provBonus += 1.5;
  else if (profile.provincialAward === 'second') provBonus += 1.0;
  else if (profile.provincialAward === 'third') provBonus += 0.5;
  else if (profile.provincialAward === 'consolation') provBonus += 0.25;

  bonus += Math.min(provBonus, 1.5);

  // 3. Điểm khuyến khích chứng chỉ quốc tế (nếu KHÔNG dùng làm base quy đổi điểm môn chính)
  if (!isCertUsedForBase && profile.englishCertType && profile.englishCertType !== 'none' && profile.certScore) {
    const certScoreVal = convertCertToScore(profile.englishCertType, profile.certScore);
    if (certScoreVal >= 10.0) bonus += 1.5;
    else if (certScoreVal >= 9.5) bonus += 1.0;
    else if (certScoreVal >= 8.5) bonus += 0.5;
  }

  return parseFloat(bonus.toFixed(2));
}

// Lấy tổ hợp điểm học bạ tốt nhất cho ngành
function getBestTranscriptBlockScore(transcript: HVNHCandidateProfile['transcriptScores'], blocks: string[]): { score: number, block: string } {
  let max = 0;
  let bestBlock = blocks[0] || 'A00';

  for (const b of blocks) {
    let s1 = 0, s2 = 0, s3 = 0;
    if (b === 'A00') {
      s1 = transcript.math || 0;
      s2 = transcript.physics || 0;
      s3 = transcript.chemistry || 0;
    } else if (b === 'A01') {
      s1 = transcript.math || 0;
      s2 = transcript.physics || 0;
      s3 = transcript.english || 0;
    } else if (b === 'D01') {
      s1 = transcript.math || 0;
      s2 = transcript.literature || 0;
      s3 = transcript.english || 0;
    } else if (b === 'D07') {
      s1 = transcript.math || 0;
      s2 = transcript.chemistry || 0;
      s3 = transcript.english || 0;
    } else if (b === 'C00') {
      s1 = transcript.literature || 0;
      s2 = transcript.history || 0;
      s3 = transcript.geography || 0;
    } else {
      s1 = transcript.math || 0;
      s2 = transcript.literature || 0;
      s3 = transcript.english || 0;
    }

    const total = s1 + s2 + s3;
    if (total > max) {
      max = total;
      bestBlock = b;
    }
  }

  return { score: max, block: bestBlock };
}

// Lấy tổ hợp điểm thi THPT tốt nhất cho ngành (có thể thay Tiếng Anh bằng điểm CCQT quy đổi)
function getBestExamBlockScore(
  exams: NonNullable<HVNHCandidateProfile['examScores']>,
  blocks: string[],
  certConvertedScore: number
): { score: number, block: string } {
  let max = 0;
  let bestBlock = blocks[0] || 'A00';

  for (const b of blocks) {
    let s1 = 0, s2 = 0, s3 = 0;
    if (b === 'A00') {
      s1 = exams.math || 0;
      s2 = exams.physics || 0;
      s3 = exams.chemistry || 0;
    } else if (b === 'A01') {
      s1 = exams.math || 0;
      s2 = exams.physics || 0;
      s3 = Math.max(exams.english || 0, certConvertedScore);
    } else if (b === 'D01') {
      s1 = exams.math || 0;
      s2 = exams.literature || 0;
      s3 = Math.max(exams.english || 0, certConvertedScore);
    } else if (b === 'D07') {
      s1 = exams.math || 0;
      s2 = exams.chemistry || 0;
      s3 = Math.max(exams.english || 0, certConvertedScore);
    } else if (b === 'C00') {
      s1 = exams.literature || 0;
      s2 = exams.history || 0;
      s3 = exams.geography || 0;
    } else {
      s1 = exams.math || 0;
      s2 = exams.literature || 0;
      s3 = Math.max(exams.english || 0, certConvertedScore);
    }

    const total = s1 + s2 + s3;
    if (total > max) {
      max = total;
      bestBlock = b;
    }
  }

  return { score: max, block: bestBlock };
}

// ==========================================
// CORE EVALUATOR: TÍNH ĐIỂM ĐẦY ĐỦ 4 PHƯƠNG THỨC CHÍNH (VÀ CÁC TIỂU MỤC KẾT HỢP)
// ==========================================
export function evaluateCandidateForHVNH(profile: HVNHCandidateProfile): MajorEvaluation[] {
  const certConverted = convertCertToScore(profile.englishCertType, profile.certScore || 0);

  return HVNH_MAJORS.map(major => {
    const allMethods: MethodResult[] = [];

    // ====================================================
    // PHƯƠNG THỨC 1: XÉT TUYỂN THẲNG THEO QUY CHẾ BỘ GD&ĐT
    // ====================================================
    const hasDirectAdmission = profile.nationalAward === 'first' || 
                               profile.nationalAward === 'second' || 
                               profile.nationalAward === 'third';
    if (hasDirectAdmission) {
      allMethods.push({
        methodCode: 'PT1',
        methodName: 'PT1: Tuyển thẳng & Ưu tiên xét tuyển',
        category: 'Xét tuyển thẳng',
        score: 30.0,
        maxScore: 30,
        isEligible: true,
        notes: `Đủ điều kiện xét tuyển thẳng diện Giải Quốc Gia (${profile.nationalAward === 'first' ? 'Giải Nhất' : profile.nationalAward === 'second' ? 'Giải Nhì' : 'Giải Ba'})`,
        detailBreakdown: {
          rawBaseScore: 30.0,
          bonusPoints: 0,
          priorityPoints: 0,
          convertedScore: 30.0
        }
      });
    }

    // ====================================================
    // PHƯƠNG THỨC 2: XÉT TUYỂN KẾT HỢP (GỒM 3 TIỂU NHÓM CHÍNH)
    // ====================================================
    const transcriptBlock = getBestTranscriptBlockScore(profile.transcriptScores, major.subjectBlocks);

    // 2.1. Kết hợp Học bạ + Chứng chỉ Quốc tế (IELTS / TOEFL / SAT / ACT / JLPT)
    if (certConverted >= 8.0 && transcriptBlock.score > 0) {
      // Riêng ngành tiếng Nhật xét thêm JLPT
      const isJapanMajor = major.code.includes('JP');
      const canApplyCert = !isJapanMajor || profile.englishCertType === 'jlpt' || profile.englishCertType === 'ielts';

      if (canApplyCert) {
        const bonusPT2_CCQT = calculateBonusPoints(profile, true); // Đã dùng cert làm base -> không cộng thưởng cert
        const basePT2_CCQT = (transcriptBlock.score / 2) + (certConverted * 1.5);
        const priorityPT2_CCQT = calculatePriorityPoints(profile.area, profile.group, basePT2_CCQT);
        const finalPT2_CCQT = Math.min(30, parseFloat((basePT2_CCQT + bonusPT2_CCQT + priorityPT2_CCQT).toFixed(2)));

        allMethods.push({
          methodCode: 'PT2_CCQT',
          methodName: 'PT2.1: Học bạ + Chứng chỉ Quốc tế',
          category: 'Xét tuyển kết hợp',
          score: finalPT2_CCQT,
          maxScore: 30,
          isEligible: true,
          notes: `${profile.englishCertType?.toUpperCase()} quy đổi ${certConverted.toFixed(2)}đ + Học bạ tổ hợp ${transcriptBlock.block} (${transcriptBlock.score.toFixed(2)}đ)`,
          detailBreakdown: {
            rawBaseScore: parseFloat(basePT2_CCQT.toFixed(2)),
            bonusPoints: parseFloat(bonusPT2_CCQT.toFixed(2)),
            priorityPoints: parseFloat(priorityPT2_CCQT.toFixed(2)),
            convertedScore: finalPT2_CCQT
          }
        });
      }
    }

    // 2.2. Kết hợp Học bạ + ĐGNL ĐHQGHN (HSA thang 150)
    if (profile.hsaScore && profile.hsaScore > 0 && transcriptBlock.score > 0) {
      const hsaScaled = (profile.hsaScore * 30) / 150; // Quy về thang 30
      const basePT2_HSA = (transcriptBlock.score * 0.5) + (hsaScaled * 0.5);
      const bonusPT2_HSA = calculateBonusPoints(profile, false);
      const priorityPT2_HSA = calculatePriorityPoints(profile.area, profile.group, basePT2_HSA);
      const finalPT2_HSA = Math.min(30, parseFloat((basePT2_HSA + bonusPT2_HSA + priorityPT2_HSA).toFixed(2)));

      allMethods.push({
        methodCode: 'PT2_HSA',
        methodName: 'PT2.2: Học bạ + ĐGNL (HSA)',
        category: 'Xét tuyển kết hợp',
        score: finalPT2_HSA,
        maxScore: 30,
        isEligible: profile.hsaScore >= 85,
        notes: `HSA: ${profile.hsaScore}/150 (${hsaScaled.toFixed(2)}đ) kết hợp Học bạ ${transcriptBlock.block} (${transcriptBlock.score.toFixed(2)}đ)`,
        detailBreakdown: {
          rawBaseScore: parseFloat(basePT2_HSA.toFixed(2)),
          bonusPoints: parseFloat(bonusPT2_HSA.toFixed(2)),
          priorityPoints: parseFloat(priorityPT2_HSA.toFixed(2)),
          convertedScore: finalPT2_HSA
        }
      });
    }

    // 2.3. Kết hợp Học bạ + Bài thi ĐGNL V-SAT (thang 450)
    if (profile.vsatScore && profile.vsatScore > 0 && transcriptBlock.score > 0) {
      const vsatScaled = (profile.vsatScore * 30) / 450; // Quy về thang 30
      const basePT2_VSAT = (transcriptBlock.score * 0.5) + (vsatScaled * 0.5);
      const bonusPT2_VSAT = calculateBonusPoints(profile, false);
      const priorityPT2_VSAT = calculatePriorityPoints(profile.area, profile.group, basePT2_VSAT);
      const finalPT2_VSAT = Math.min(30, parseFloat((basePT2_VSAT + bonusPT2_VSAT + priorityPT2_VSAT).toFixed(2)));

      allMethods.push({
        methodCode: 'PT2_VSAT',
        methodName: 'PT2.3: Học bạ + Kỳ thi V-SAT',
        category: 'Xét tuyển kết hợp',
        score: finalPT2_VSAT,
        maxScore: 30,
        isEligible: profile.vsatScore >= 225,
        notes: `V-SAT: ${profile.vsatScore}/450 (${vsatScaled.toFixed(2)}đ) kết hợp Học bạ ${transcriptBlock.block} (${transcriptBlock.score.toFixed(2)}đ)`,
        detailBreakdown: {
          rawBaseScore: parseFloat(basePT2_VSAT.toFixed(2)),
          bonusPoints: parseFloat(bonusPT2_VSAT.toFixed(2)),
          priorityPoints: parseFloat(priorityPT2_VSAT.toFixed(2)),
          convertedScore: finalPT2_VSAT
        }
      });
    }

    // ====================================================
    // PHƯƠNG THỨC 3: XÉT TUYỂN HỌC BẠ THPT ĐỘC LẬP
    // ====================================================
    if (transcriptBlock.score > 0) {
      const bonusPT3 = calculateBonusPoints(profile, false);
      const priorityPT3 = calculatePriorityPoints(profile.area, profile.group, transcriptBlock.score);
      const finalPT3 = Math.min(30, parseFloat((transcriptBlock.score + bonusPT3 + priorityPT3).toFixed(2)));

      allMethods.push({
        methodCode: 'PT3_HOCBA',
        methodName: 'PT3: Học bạ THPT độc lập',
        category: 'Xét học bạ THPT',
        score: finalPT3,
        maxScore: 30,
        isEligible: transcriptBlock.score >= 18.0,
        notes: `Tổ hợp tối ưu: ${transcriptBlock.block} (${transcriptBlock.score.toFixed(2)}đ) + Thưởng: ${bonusPT3.toFixed(2)}đ + Ưu tiên: ${priorityPT3.toFixed(2)}đ`,
        detailBreakdown: {
          rawBaseScore: parseFloat(transcriptBlock.score.toFixed(2)),
          bonusPoints: parseFloat(bonusPT3.toFixed(2)),
          priorityPoints: parseFloat(priorityPT3.toFixed(2)),
          convertedScore: finalPT3
        }
      });
    }

    // ====================================================
    // PHƯƠNG THỨC 4: XÉT KẾT QUẢ THI TỐT NGHIỆP THPT
    // ====================================================
    if (profile.examScores && Object.keys(profile.examScores).length > 0) {
      const examBlock = getBestExamBlockScore(profile.examScores, major.subjectBlocks, certConverted);
      if (examBlock.score > 0) {
        const bonusPT4 = calculateBonusPoints(profile, certConverted > 0);
        const priorityPT4 = calculatePriorityPoints(profile.area, profile.group, examBlock.score);
        const finalPT4 = Math.min(30, parseFloat((examBlock.score + bonusPT4 + priorityPT4).toFixed(2)));

        allMethods.push({
          methodCode: 'PT4_THPT',
          methodName: 'PT4: Điểm thi Tốt nghiệp THPT',
          category: 'Điểm thi THPT',
          score: finalPT4,
          maxScore: 30,
          isEligible: examBlock.score >= 15.0,
          notes: `Tổ hợp tối ưu: ${examBlock.block} (${examBlock.score.toFixed(2)}đ)${certConverted > 0 ? ' (quy đổi Ngoại ngữ)' : ''} + Ưu tiên: ${priorityPT4.toFixed(2)}đ`,
          detailBreakdown: {
            rawBaseScore: parseFloat(examBlock.score.toFixed(2)),
            bonusPoints: parseFloat(bonusPT4.toFixed(2)),
            priorityPoints: parseFloat(priorityPT4.toFixed(2)),
            convertedScore: finalPT4
          }
        });
      }
    }

    // TỐI ƯU HÓA: TÌM PHƯƠNG THỨC MANG LẠI ĐIỂM CAO NHẤT
    let bestMethod: MethodResult = allMethods.length > 0
      ? allMethods.reduce((prev, curr) => (curr.score > prev.score ? curr : prev), allMethods[0])
      : {
          methodCode: 'PT4_THPT',
          methodName: 'Chưa đủ dữ liệu',
          category: 'Điểm thi THPT',
          score: 0,
          maxScore: 30,
          isEligible: false,
          notes: 'Vui lòng nhập điểm học bạ hoặc điểm thi để hệ thống tính toán.',
          detailBreakdown: { rawBaseScore: 0, bonusPoints: 0, priorityPoints: 0, convertedScore: 0 }
        };

    // Điểm chuẩn mục tiêu tương ứng
    const isEarlyMethod = bestMethod.methodCode.startsWith('PT2') || bestMethod.methodCode === 'PT3_HOCBA';
    const benchmarkTarget = isEarlyMethod
      ? (major.benchmarkEarly2025 || major.benchmark2025 + 1.5)
      : major.benchmark2025;

    const diff = parseFloat((bestMethod.score - benchmarkTarget).toFixed(2));

    let chance: MajorEvaluation['admissionChance'] = 'Rủi ro cao';
    let badgeColor = 'bg-rose-50 text-rose-700 border-rose-200';

    if (bestMethod.score === 0) {
      chance = 'Rủi ro cao';
      badgeColor = 'bg-gray-100 text-gray-700 border-gray-200';
    } else if (bestMethod.methodCode === 'PT1') {
      chance = 'Rất cao (An toàn)';
      badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    } else if (diff >= 1.5) {
      chance = 'Rất cao (An toàn)';
      badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    } else if (diff >= 0) {
      chance = 'Khả thi (Mục tiêu)';
      badgeColor = 'bg-blue-50 text-blue-700 border-blue-200';
    } else if (diff >= -1.2) {
      chance = 'Thử thách (Ước mơ)';
      badgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
    } else {
      chance = 'Rủi ro cao';
      badgeColor = 'bg-rose-50 text-rose-700 border-rose-200';
    }

    return {
      major,
      bestMethod,
      allMethods,
      admissionChance: chance,
      chanceBadgeColor: badgeColor,
      scoreDiff: diff,
      benchmarkTarget: parseFloat(benchmarkTarget.toFixed(2))
    };
  }).sort((a, b) => b.bestMethod.score - a.bestMethod.score);
}
