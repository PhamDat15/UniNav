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
  maxFee: number;
  location: string;
  traits: string[];
  targetMajor?: string;
  targetBlock?: string;
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

export function evaluateUniversityMethods(scores: ExamScores, program: UniversityProgram): BestMethod {
  let best: BestMethod = { score: 0, methodName: 'Chưa đủ dữ liệu điểm' };

  const updateIfBetter = (score: number, name: string) => {
    if (score > best.score) {
      best = { score: parseFloat(score.toFixed(2)), methodName: name };
    }
  };

  let engScore = scores.anh || 0;
  let ieltsBonusMethod = '';
  if (scores.ielts && scores.ielts >= 5.5) {
    let converted = 8;
    if (scores.ielts === 6.0) converted = 9;
    if (scores.ielts >= 6.5) converted = 10;
    
    if (converted > engScore) {
      engScore = converted;
      ieltsBonusMethod = ` (Quy đổi IELTS ${scores.ielts})`;
    }
  }

  const accepts = (block: string) => program.subjectBlocks.includes(block);

  const calcBlock = (sub1: number, sub2: number, sub3: number, sub1Name: string, sub2Name: string, sub3Name: string) => {
    if (program.scoreCalculation && program.scoreCalculation.scale === 40 && program.scoreCalculation.multiplierSubject) {
      let total = sub1 + sub2 + sub3;
      const mult = program.scoreCalculation.multiplierSubject;
      if (mult === sub1Name) total += sub1;
      else if (mult === sub2Name) total += sub2;
      else if (mult === sub3Name) total += sub3;
      return total;
    }
    return sub1 + sub2 + sub3;
  };

  if (accepts('A00') && scores.toan && scores.ly && scores.hoa) {
    updateIfBetter(calcBlock(scores.toan, scores.ly, scores.hoa, 'toan', 'ly', 'hoa'), 'Tổ hợp A00');
  }
  if (accepts('A01') && scores.toan && scores.ly && (scores.anh || scores.ielts)) {
    updateIfBetter(calcBlock(scores.toan, scores.ly, engScore, 'toan', 'ly', 'anh'), 'Tổ hợp A01' + ieltsBonusMethod);
  }
  if (accepts('B00') && scores.toan && scores.hoa && scores.sinh) {
    updateIfBetter(calcBlock(scores.toan, scores.hoa, scores.sinh, 'toan', 'hoa', 'sinh'), 'Tổ hợp B00');
  }
  if (accepts('C00') && scores.van && scores.su && scores.dia) {
    updateIfBetter(calcBlock(scores.van, scores.su, scores.dia, 'van', 'su', 'dia'), 'Tổ hợp C00');
  }
  if (accepts('D01') && scores.toan && scores.van && (scores.anh || scores.ielts)) {
    updateIfBetter(calcBlock(scores.toan, scores.van, engScore, 'toan', 'van', 'anh'), 'Tổ hợp D01' + ieltsBonusMethod);
  }
  if (accepts('D07') && scores.toan && scores.hoa && (scores.anh || scores.ielts)) {
    updateIfBetter(calcBlock(scores.toan, scores.hoa, engScore, 'toan', 'hoa', 'anh'), 'Tổ hợp D07' + ieltsBonusMethod);
  }
  if (accepts('V00') && scores.toan && scores.ly && scores.van) {
    updateIfBetter(calcBlock(scores.toan, scores.ly, scores.van, 'toan', 'ly', 'van'), 'Tổ hợp V00 (Toán, Lý, Văn)');
  }
  
  if (scores.hsa && program.specialExams && program.specialExams.some(e => e.includes('HSA'))) {
    const hsaConverted = (scores.hsa / 150) * 30;
    updateIfBetter(hsaConverted, `HSA (${scores.hsa}/150)`);
  }

  if (scores.tsa && program.specialExams && program.specialExams.some(e => e.includes('TSA'))) {
    const tsaConverted = (scores.tsa / 100) * 30;
    updateIfBetter(tsaConverted, `TSA (${scores.tsa}/100)`);
  }

  if (scores.gpa && program.talentAdmission && program.talentAdmission.toLowerCase().includes('học bạ')) {
    const gpaConverted = scores.gpa * 3;
    updateIfBetter(gpaConverted, `Học bạ (GPA ${scores.gpa})`);
  }

  return best;
}

export function calculateBestMethod(scores: ExamScores): BestMethod {
  // Hàm này giờ chỉ trả về một điểm giả lập nếu cần fallback (có thể giữ lại để UI không bị crash, 
  // nhưng logic chính giờ ở evaluateUniversityMethods)
  return evaluateUniversityMethods(scores, { subjectBlocks: ['A00','A01','B00','C00','D01','D07'], specialExams: ['HSA','TSA'], talentAdmission: 'học bạ' } as UniversityProgram);
}

export function calculateMatch(profile: UserProfile, program: UniversityProgram): MatchResult {
  let suitabilityScore = 50;
  let reasoning = [];
  
  const bestMethod = evaluateUniversityMethods(profile.scores, program);

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
    const matchingTraits = profile.traits.filter(t => program.targetTraits.includes(t));
    if (matchingTraits.length > 0) {
      suitabilityScore += (matchingTraits.length * 10);
      reasoning.push(`Tính cách [${matchingTraits.join(', ')}] phù hợp ngành nghề.`);
    } else {
      suitabilityScore -= 5;
      reasoning.push("Tính cách chưa thực sự khớp.");
    }
  }

  if (profile.targetMajor && profile.targetMajor !== 'All' && profile.targetMajor.trim() !== '') {
    if (program.major.toLowerCase().includes(profile.targetMajor.toLowerCase()) || profile.targetMajor.toLowerCase().includes(program.major.toLowerCase()) || program.name.toLowerCase().includes(profile.targetMajor.toLowerCase())) {
      suitabilityScore += 25;
      reasoning.push(`✓ Đúng chuyên ngành mục tiêu [${profile.targetMajor}].`);
    }
  }

  if (profile.targetBlock && profile.targetBlock !== 'All' && profile.targetBlock.trim() !== '') {
    const isBlockMatch = program.subjectBlocks.includes(profile.targetBlock) || 
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
