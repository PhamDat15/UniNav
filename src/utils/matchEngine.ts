import { UniversityProgram } from '../data/mockUniversities';

export interface ExamScores {
  toan?: number;
  van?: number;
  anh?: number;
  ly?: number;
  hoa?: number;
  sinh?: number;
  su?: number;
  dia?: number;
  gdcd?: number;
  ielts?: number;
  hsa?: number; // ĐGNL ĐHQGHN (thang 150)
  tsa?: number; // ĐGTD Bách Khoa (thang 100)
  gpa?: number; // Học bạ (thang 10)
}

export interface UserProfile {
  scores: ExamScores;
  transcriptScores?: ExamScores;
  maxFee: number;
  location: string;
  traits: string[];
  targetMajor?: string;
  targetBlock?: string;
  awards?: {
    nationalPrize?: string;
    provincialPrize?: string;
  };
}

export interface BestMethod {
  score: number; // Điểm quy chuẩn thang 30
  methodName: string; // Tên phương thức (VD: "Tổ hợp A01", "HSA quy đổi", "IELTS + Học bạ")
}

export interface MatchResult {
  program: UniversityProgram;
  suitabilityScore: number;
  passProbability: number;
  reasoning: string;
  bestMethod: BestMethod;
}

export function evaluateUniversityMethods(profile: UserProfile, program: UniversityProgram): BestMethod {
  let bestPercentage = 0;
  let bestScore = 0;
  let bestName = 'Chưa đủ dữ liệu điểm';

  const programScale = program.scoreCalculation?.scale || 30;
  const scores = profile.scores;
  const transcriptScores = profile.transcriptScores;
  
  if (profile.awards?.nationalPrize) {
    const directScore = Math.min(programScale, (program.averageScore || programScale * 0.8) + 2);
    return {
      score: parseFloat(directScore.toFixed(2)),
      methodName: `Xét tuyển thẳng (Giải QG - ${profile.awards.nationalPrize})`
    };
  }

  let bonusPoint = 0;
  if (profile.awards?.provincialPrize) {
    if (profile.awards.provincialPrize === 'Nhất') bonusPoint = 1.0;
    else if (profile.awards.provincialPrize === 'Nhì') bonusPoint = 0.75;
    else if (profile.awards.provincialPrize === 'Ba') bonusPoint = 0.5;
    else if (profile.awards.provincialPrize === 'Khuyến khích') bonusPoint = 0.25;
  }

  const updateIfBetter = (rawScore: number, maxScore: number, name: string) => {
    let finalScore = rawScore;
    if (maxScore === 30 || maxScore === 40) {
      finalScore += bonusPoint;
    }
    finalScore = Math.min(finalScore, maxScore);

    const percentage = finalScore / maxScore;
    if (percentage > bestPercentage) {
      bestPercentage = percentage;
      bestScore = percentage * programScale;
      bestName = name;
    }
  };

  let engScore = scores.anh || 0;
  let ieltsBonusMethod = '';
  
  if (scores.ielts && scores.ielts >= 5.0) {
    let converted = engScore;
    const ieltsRule = program.priorityDetails?.find(p => p.type === 'ielts');
    
    if (ieltsRule && ieltsRule.table) {
      let bestConvert = converted;
      for (const [key, valStr] of Object.entries(ieltsRule.table)) {
        const valMatch = valStr.match(/(\d+(\.\d+)?)/);
        if (valMatch) {
          const val = parseFloat(valMatch[0]);
          let matches = false;
          
          if (key.includes('>=')) {
            const thres = parseFloat(key.replace('>=', '').trim());
            if (scores.ielts >= thres) matches = true;
          } else if (key.includes('>')) {
            const thres = parseFloat(key.replace('>', '').trim());
            if (scores.ielts > thres) matches = true;
          } else if (key.includes('-')) {
             const parts = key.split('-');
             if (parts.length === 2) {
               const min = parseFloat(parts[0].trim());
               const max = parseFloat(parts[1].trim());
               if (scores.ielts >= min && scores.ielts <= max) matches = true;
             }
          } else {
             const thres = parseFloat(key.trim());
             if (scores.ielts >= thres) matches = true; 
          }
          
          if (matches && val > bestConvert) {
            bestConvert = val;
          }
        }
      }
      converted = bestConvert;
    } else {
      if (scores.ielts >= 7.0) converted = 10;
      else if (scores.ielts >= 6.5) converted = 9.5;
      else if (scores.ielts >= 6.0) converted = 9;
      else if (scores.ielts >= 5.5) converted = 8.5;
      else if (scores.ielts >= 5.0) converted = 8.0;
    }

    if (converted > engScore) {
      engScore = converted;
      ieltsBonusMethod = ` (Quy đổi IELTS ${scores.ielts} = ${converted}đ)`;
    }
  }

  const accepts = (block: string) => program.subjectBlocks?.includes(block) || false;

  const calcBlock = (sub1: number, sub2: number, sub3: number, sub1Name: string, sub2Name: string, sub3Name: string) => {
    let maxScore = 30;
    let total = sub1 + sub2 + sub3;
    if (program.scoreCalculation && program.scoreCalculation.scale === 40 && program.scoreCalculation.multiplierSubject) {
      maxScore = 40;
      const mult = program.scoreCalculation.multiplierSubject;
      if (mult === sub1Name) total += sub1;
      else if (mult === sub2Name) total += sub2;
      else if (mult === sub3Name) total += sub3;
    }
    return { score: total, max: maxScore };
  };

  const evalBlock = (block: string, s1: number|undefined, s2: number|undefined, s3: number|undefined, n1: string, n2: string, n3: string, extName = '') => {
    if (accepts(block) && s1 !== undefined && s2 !== undefined && s3 !== undefined) {
      const res = calcBlock(s1, s2, s3, n1, n2, n3);
      updateIfBetter(res.score, res.max, `Tổ hợp ${block}${extName}`);
    }
  };

  evalBlock('A00', scores.toan, scores.ly, scores.hoa, 'toan', 'ly', 'hoa');
  evalBlock('A01', scores.toan, scores.ly, (scores.anh !== undefined || scores.ielts !== undefined) ? engScore : undefined, 'toan', 'ly', 'anh', ieltsBonusMethod);
  evalBlock('B00', scores.toan, scores.hoa, scores.sinh, 'toan', 'hoa', 'sinh');
  evalBlock('C00', scores.van, scores.su, scores.dia, 'van', 'su', 'dia');
  evalBlock('D01', scores.toan, scores.van, (scores.anh !== undefined || scores.ielts !== undefined) ? engScore : undefined, 'toan', 'van', 'anh', ieltsBonusMethod);
  evalBlock('D07', scores.toan, scores.hoa, (scores.anh !== undefined || scores.ielts !== undefined) ? engScore : undefined, 'toan', 'hoa', 'anh', ieltsBonusMethod);
  evalBlock('V00', scores.toan, scores.ly, scores.van, 'toan', 'ly', 'van');
  
  const applySpecialExam = (rawScore: number | undefined, defaultMax: number, shortName: string) => {
    if (rawScore === undefined || !program.specialExams?.some(e => e.includes(shortName))) return;
    
    let finalExamScore = rawScore;
    let maxScale = defaultMax;
    let methodString = `${shortName} (${rawScore}/${defaultMax})`;

    let formula = '';
    if (program.conversionFormulas) {
      const key = Object.keys(program.conversionFormulas).find(k => k.includes(shortName));
      if (key) formula = program.conversionFormulas[key];
    }

    if (formula) {
      const multiplierMatch = formula.match(/×\s*(\d+)\/(\d+)/);
      if (multiplierMatch) {
        const num = parseFloat(multiplierMatch[1]);
        const den = parseFloat(multiplierMatch[2]);
        finalExamScore = (rawScore * num) / den;
        maxScale = num; 
        methodString = `${shortName} (Quy đổi thang ${maxScale}: ${finalExamScore.toFixed(2)}đ)`;
      } else if (formula.toLowerCase().includes('thang 100')) {
        maxScale = 100;
        methodString = `${shortName} (Thang 100: ${finalExamScore.toFixed(2)}đ)`;
      } else if (formula.toLowerCase().includes('thang 30')) {
        maxScale = 30;
        finalExamScore = (rawScore * 30) / defaultMax;
        methodString = `${shortName} (Quy đổi thang 30: ${finalExamScore.toFixed(2)}đ)`;
      }
    }

    updateIfBetter(finalExamScore, maxScale, methodString);
  }

  applySpecialExam(scores.hsa, 150, 'HSA');
  applySpecialExam(scores.tsa, 100, 'TSA');

  const gpaScore = transcriptScores?.gpa || scores.gpa;
  if (gpaScore !== undefined && program.talentAdmission && program.talentAdmission.toLowerCase().includes('học bạ')) {
    updateIfBetter(gpaScore * 3, 30, `Học bạ (GPA ${gpaScore})`);
  }

  if (bestScore === 0) {
    return { score: 0, methodName: 'Chưa đủ dữ liệu điểm' };
  }

  if (bonusPoint > 0 && bestName !== 'Chưa đủ dữ liệu điểm') {
    bestName += ` (+${bonusPoint} giải Tỉnh)`;
  }

  return { score: parseFloat(bestScore.toFixed(2)), methodName: bestName };
}

export function calculateBestMethod(profile: UserProfile): BestMethod {
  return evaluateUniversityMethods(profile, { subjectBlocks: ['A00','A01','B00','C00','D01','D07'], specialExams: ['HSA','TSA'], talentAdmission: 'học bạ' } as UniversityProgram);
}

export function calculateMatch(profile: UserProfile, program: UniversityProgram): MatchResult {
  let suitabilityScore = 50;
  let reasoning = [];
  
  const bestMethod = evaluateUniversityMethods(profile, program);

  const diff = bestMethod.score - program.averageScore;
  let passProb = 0;
  
  const scaleRatio = (program.scoreCalculation?.scale || 30) / 30;
  
  if (bestMethod.score === 0) {
    passProb = 0;
    suitabilityScore -= 30;
    reasoning.push(`Không có phương thức xét tuyển nào (trong dữ liệu điểm của bạn) phù hợp với trường này.`);
  } else if (diff >= 2 * scaleRatio) { 
    passProb = 99; 
    suitabilityScore += 15; 
    reasoning.push(`Phương thức ${bestMethod.methodName} vượt mức an toàn (> ${Math.abs(diff).toFixed(2)}đ so với chuẩn).`); 
  }
  else if (diff >= 0) { 
    passProb = 85; 
    suitabilityScore += 10; 
    reasoning.push(`Mức điểm ${bestMethod.methodName} vừa đủ đỗ dựa trên dữ liệu lịch sử.`); 
  }
  else if (diff >= -1 * scaleRatio) { 
    passProb = 50; 
    suitabilityScore += 5; 
    reasoning.push(`Điểm số có rủi ro nhẹ (thấp hơn ${Math.abs(diff).toFixed(2)}đ so với chuẩn).`); 
  }
  else if (diff >= -2.5 * scaleRatio) { 
    passProb = 25; 
    suitabilityScore -= 10; 
    reasoning.push(`Khả năng đỗ thấp do điểm thấp hơn khá nhiều (${Math.abs(diff).toFixed(2)}đ).`); 
  }
  else { 
    passProb = 5; 
    suitabilityScore -= 20; 
    reasoning.push(`Điểm số hiện tại rất khó cạnh tranh vào ngành này.`); 
  }

  if (profile.maxFee >= program.feePerYear) {
    suitabilityScore += 15;
    reasoning.push("Học phí phù hợp.");
  } else {
    suitabilityScore -= 15;
    reasoning.push("Học phí vượt quá ngân sách.");
  }

  if (profile.location === program.location) {
    suitabilityScore += 10;
    reasoning.push("Vị trí địa lý thuận lợi.");
  } else if (profile.location !== "Khác") {
    reasoning.push("Học xa nhà.");
  }

  if (profile.traits && profile.traits.length > 0) {
    const matchingTraits = profile.traits.filter(t => (program.targetTraits || []).includes(t));
    if (matchingTraits.length > 0) {
      suitabilityScore += (matchingTraits.length * 10);
      reasoning.push(`Tính cách [${matchingTraits.join(', ')}] phù hợp ngành nghề.`);
    } else {
      suitabilityScore -= 5;
      reasoning.push("Tính cách chưa thực sự khớp.");
    }
  }

  if (profile.targetMajor && profile.targetMajor !== 'All' && profile.targetMajor.trim() !== '') {
    const pMajor = program.major.toLowerCase();
    const tMajor = profile.targetMajor.toLowerCase();
    let isMatch = false;
    
    if (pMajor.includes(tMajor) || tMajor.includes(pMajor) || program.name.toLowerCase().includes(tMajor)) {
       isMatch = true;
    }
    
    if (!isMatch) {
      if (tMajor.includes('công nghệ thông tin') && (pMajor.includes('máy tính') || pMajor.includes('phần mềm') || pMajor.includes('dữ liệu') || pMajor.includes('an toàn thông tin') || pMajor.includes('ai') || pMajor.includes('trí tuệ nhân tạo') || pMajor.includes('không gian mạng') || pMajor.includes('toán tin') || pMajor.includes('hệ thống thông tin') || pMajor.includes('mạng') || pMajor.includes('viễn thông') || pMajor.includes('truyền thông đa phương tiện') || pMajor.includes('robot') || pMajor.includes('số'))) isMatch = true;
      if (tMajor.includes('kinh tế') && (pMajor.includes('quản trị') || pMajor.includes('kế toán') || pMajor.includes('tài chính') || pMajor.includes('thương mại') || pMajor.includes('kinh doanh') || pMajor.includes('marketing') || pMajor.includes('logistics') || pMajor.includes('kiểm toán') || pMajor.includes('nhân lực') || pMajor.includes('ngân hàng') || pMajor.includes('ngoại thương') || pMajor.includes('công nghiệp') || pMajor.includes('kinh tế'))) isMatch = true;
      if (tMajor.includes('kỹ thuật') && (pMajor.includes('cơ điện tử') || pMajor.includes('tự động hóa') || pMajor.includes('điện') || pMajor.includes('cơ khí') || pMajor.includes('ô tô') || pMajor.includes('xây dựng') || pMajor.includes('vật liệu') || pMajor.includes('sinh học') || pMajor.includes('hóa học') || pMajor.includes('cấp thoát nước') || pMajor.includes('giao thông') || pMajor.includes('môi trường') || pMajor.includes('kiến trúc'))) isMatch = true;
      if (tMajor.includes('ngôn ngữ') && (pMajor.includes('ngôn ngữ') || pMajor.includes('anh') || pMajor.includes('nhật') || pMajor.includes('trung') || pMajor.includes('hàn') || pMajor.includes('sư phạm') || pMajor.includes('phiên dịch'))) isMatch = true;
      if (tMajor.includes('thiết kế đồ họa') && (pMajor.includes('thiết kế') || pMajor.includes('đồ họa') || pMajor.includes('mỹ thuật') || pMajor.includes('kiến trúc') || pMajor.includes('nội thất'))) isMatch = true;
      if (tMajor.includes('y dược') && (pMajor.includes('y khoa') || pMajor.includes('răng hàm mặt') || pMajor.includes('dược') || pMajor.includes('điều dưỡng') || pMajor.includes('y học') || pMajor.includes('xét nghiệm'))) isMatch = true;
    }

    if (isMatch) {
      suitabilityScore += 25;
      reasoning.push(`✓ Đúng chuyên ngành mục tiêu [${profile.targetMajor}].`);
    } else {
      suitabilityScore -= 20;
    }
  }

  if (profile.targetBlock && profile.targetBlock !== 'All' && profile.targetBlock.trim() !== '') {
    const isBlockMatch = (program.subjectBlocks || []).includes(profile.targetBlock) || 
                         (program.specialExams && program.specialExams.some(e => e.toUpperCase().includes(profile.targetBlock!.toUpperCase()))) ||
                         (profile.targetBlock === 'Học bạ' && program.talentAdmission && program.talentAdmission.toLowerCase().includes('học bạ'));
    if (isBlockMatch) {
      suitabilityScore += 20;
      reasoning.push(`✓ Trường có tuyển sinh theo tổ hợp/phương thức ưu tiên [${profile.targetBlock}].`);
    } else {
      suitabilityScore -= 30;
      reasoning.push(`⚠ Trường không mở xét tuyển theo phương thức/tổ hợp [${profile.targetBlock}].`);
    }
  }

  suitabilityScore = Math.max(0, Math.min(100, suitabilityScore));
  passProb = Math.max(0, Math.min(100, passProb));

  return {
    program,
    suitabilityScore,
    passProbability: passProb,
    reasoning: reasoning.join(" "),
    bestMethod
  };
}
