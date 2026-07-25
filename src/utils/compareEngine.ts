import { MatchResult, UserProfile } from './matchEngine';
import { UniversityProgram } from '../data/mockUniversities';

export interface BestInClassItem {
  category: string;
  icon: string;
  schoolName: string;
  majorName: string;
  scoreDisplay: string;
  reasoning: string;
  color: string;
}

export interface TradeoffItem {
  title: string;
  schoolA: string;
  schoolB: string;
  analysis: string;
}

export interface RecommendationStep {
  rank: string;
  badgeColor: string;
  schoolName: string;
  majorName: string;
  passProb: number;
  role: string;
  reasoning: string;
}

export interface CompareReport {
  bestInClass: BestInClassItem[];
  tradeoffs: TradeoffItem[];
  strategy: RecommendationStep[];
  overallSummary: string;
}

export function generateCompareReport(items: MatchResult[], profile?: UserProfile | null): CompareReport {
  if (!items || items.length === 0) {
    return {
      bestInClass: [],
      tradeoffs: [],
      strategy: [],
      overallSummary: "Chưa có đủ dữ liệu để phân tích."
    };
  }

  // 1. BEST IN CLASS (Vinh danh Đỉnh cao)
  const bestInClass: BestInClassItem[] = [];

  // a. Khả năng đỗ cao nhất (An toàn nhất)
  const highestPass = [...items].sort((a, b) => b.passProbability - a.passProbability)[0];
  if (highestPass) {
    let reason = `Tỷ lệ đỗ dự kiến lên tới ${highestPass.passProbability}%. `;
    if (highestPass.bestMethod && highestPass.bestMethod.score > 0) {
      reason += `Lợi thế lớn nhờ phương thức ${highestPass.bestMethod.methodName} đạt mức ${highestPass.bestMethod.score} điểm, vượt xa mặt bằng chung.`;
    } else {
      reason += `Điểm chuẩn lịch sử và ngưỡng đảm bảo đầu vào rất thuận lợi so với lực học hiện tại của bạn.`;
    }
    bestInClass.push({
      category: "Bảo Đảm An Toàn Nhất (Tỷ lệ đỗ cao nhất)",
      icon: "🎯",
      schoolName: highestPass.program.name,
      majorName: highestPass.program.major,
      scoreDisplay: `Đỗ ${highestPass.passProbability}%`,
      reasoning: reason,
      color: "#16a34a"
    });
  }

  // b. Độ phù hợp sở thích & mục tiêu (Suitability)
  const mostSuitable = [...items].sort((a, b) => b.suitabilityScore - a.suitabilityScore)[0];
  if (mostSuitable) {
    let reason = `Đạt mức tương thích cực đỉnh ${mostSuitable.suitabilityScore}%. `;
    if (profile && (profile.targetMajor || profile.targetBlock)) {
      reason += `Ngành ${mostSuitable.program.major} hoàn toàn trùng khớp với định hướng chọn thẳng và khối môn xét tuyển ưu tiên của bạn.`;
    } else {
      reason += `Sự giao thoa hoàn hảo giữa tính cách RIASEC của bạn, mức học phí vừa ngân sách và thế mạnh tuyển sinh riêng của trường.`;
    }
    bestInClass.push({
      category: "Tương Thích Nguyện Vọng Nhất",
      icon: "💜",
      schoolName: mostSuitable.program.name,
      majorName: mostSuitable.program.major,
      scoreDisplay: `Phù hợp ${mostSuitable.suitabilityScore}%`,
      reasoning: reason,
      color: "#9333ea"
    });
  }

  // c. Học phí tiết kiệm nhất
  const lowestFee = [...items].sort((a, b) => a.program.feePerYear - b.program.feePerYear)[0];
  if (lowestFee) {
    const feeMil = (lowestFee.program.feePerYear / 1000000).toFixed(1);
    bestInClass.push({
      category: "Tối Ưu Tài Chính (Học phí tiết kiệm nhất)",
      icon: "💰",
      schoolName: lowestFee.program.name,
      majorName: lowestFee.program.major,
      scoreDisplay: `${feeMil} Triệu/năm`,
      reasoning: `Mức học phí siêu kinh tế (${feeMil} triệu/năm, khoảng ${lowestFee.program.creditsPerSemester} tín/kỳ). Giúp gia đình giảm thiểu tối đa gánh nặng chi phí trong 4 năm học trong khi chất lượng giảng dạy thuộc hàng top.`,
      color: "#0284c7"
    });
  }

  // d. Cơ sở vật chất & Trang thiết bị hiện đại nhất
  const bestFacilities = [...items].sort((a, b) => (b.program.facilities || 85) - (a.program.facilities || 85))[0];
  if (bestFacilities) {
    const score = bestFacilities.program.facilities || 88;
    bestInClass.push({
      category: "Cơ Sở Vật Chất & Trải Nghiệm Hiện Đại Nhất",
      icon: "🏛️",
      schoolName: bestFacilities.program.name,
      majorName: bestFacilities.program.major,
      scoreDisplay: `CSVC ${score}/100`,
      reasoning: `Sở hữu khuôn viên, hệ thống giảng đường và phòng thí nghiệm chất lượng cao đạt chuẩn quốc tế (điểm đánh giá CSVC ${score}/100), tạo điều kiện nghiên cứu và học tập thoải mái nhất.`,
      color: "#d97706"
    });
  }

  // e. Môi trường Câu lạc bộ & Ngoại khóa năng động nhất
  const bestClubs = [...items].sort((a, b) => b.program.clubActivities - a.program.clubActivities)[0];
  if (bestClubs && bestClubs.program.clubActivities >= 80) {
    bestInClass.push({
      category: "Môi Trường Ngoại Khóa & CLB Năng động Nhất",
      icon: "🔥",
      schoolName: bestClubs.program.name,
      majorName: bestClubs.program.major,
      scoreDisplay: `CLB ${bestClubs.program.clubActivities}/100`,
      reasoning: `Chỉ số phong trào sinh viên đạt ${bestClubs.program.clubActivities}/100. Nơi tuyệt vời để bứt phá rào cản bản thân, mở rộng mối quan hệ (networking), rèn luyện kỹ năng mềm qua hàng chục CLB chuyên môn và nghệ thuật sôi nổi.`,
      color: "#ea580c"
    });
  }


  // 2. TRADEOFFS (Phân tích Đối đầu & Sự đánh đổi)
  const tradeoffs: TradeoffItem[] = [];
  if (items.length >= 2) {
    // So sánh Trường có Khả năng đỗ cao nhất với Trường có Độ phù hợp/Điểm chuẩn cao nhất (hoặc 2 trường top)
    const sortedByPass = [...items].sort((a, b) => b.passProbability - a.passProbability);
    const itemA = sortedByPass[sortedByPass.length - 1]; // Rủi ro nhất / Khát vọng cao nhất
    const itemB = sortedByPass[0]; // An toàn nhất
    
    if (itemA.program.id !== itemB.program.id) {
      tradeoffs.push({
        title: `⚡ Bàn cân Khát Vọng vs. An Toàn: [${itemA.program.name}] đối đầu [${itemB.program.name}]`,
        schoolA: itemA.program.name,
        schoolB: itemB.program.name,
        analysis: `• Nếu quyết tâm chinh phục ${itemA.program.name} (${itemA.program.major}): Bạn sẽ được theo học tại một môi trường đầy tham vọng và tiếng tăm, nhưng phải ĐÁNH ĐỔI bằng tỷ lệ cạnh tranh gay gắt (khả năng đỗ hiện tại là ${itemA.passProbability}%). Bạn buộc phải giữ nỗ lực ôn luyện cực kỳ tầm cỡ trong giai đoạn nước rút.\n\n• Ngược lại, nếu lựa chọn ${itemB.program.name}: Bạn có một suất "chắc cú" với tỷ lệ đỗ ${itemB.passProbability}% (tạo cảm giác an tâm tuyệt đối cho gia đình), đồng thời mức áp lực cạnh tranh nhẹ nhõm hơn đáng kể. Đây là bài toán giữa "mạo hiểm bứt phá" hay "thực tế cầm chắc tấm vé đại học".`
      });
    }

    // So sánh về chi phí và phong trào
    const sortedByFee = [...items].sort((a, b) => a.program.feePerYear - b.program.feePerYear);
    const cheapItem = sortedByFee[0];
    const expensiveItem = sortedByFee[sortedByFee.length - 1];
    
    if (cheapItem.program.id !== expensiveItem.program.id) {
      const diffTr = ((expensiveItem.program.feePerYear - cheapItem.program.feePerYear) / 1000000).toFixed(1);
      tradeoffs.push({
        title: `⚖️ Bàn cân Chi phí & Môi trường: [${cheapItem.program.name}] và [${expensiveItem.program.name}]`,
        schoolA: cheapItem.program.name,
        schoolB: expensiveItem.program.name,
        analysis: `• ${cheapItem.program.name} mang lại lợi thế tiết kiệm tới ~${diffTr} Triệu đồng mỗi năm học so với ${expensiveItem.program.name}. Khoản chênh lệch này có thể dùng để đầu tư các khóa học ngoại ngữ, thi chứng chỉ quốc tế hoặc trang trải sinh hoạt phí.\n\n• Tuy nhiên, sự đầu tư tài chính nhỉnh hơn tại ${expensiveItem.program.name} (${(expensiveItem.program.feePerYear/1000000).toFixed(1)} Tr/năm) được đền đáp xứng đáng bằng hệ thống cơ sở vật chất đẳng cấp (điểm CSVC ${expensiveItem.program.facilities || 90}/100) cùng chỉ số năng động ngoại khóa ${expensiveItem.program.clubActivities}/100. Bạn cần xem xét ngân sách 4 năm của gia đình để chọn hướng đầu tư sáng suốt.`
      });
    }
  } else {
    tradeoffs.push({
      title: `🔍 Điểm mạnh & Điểm cần lưu tâm tại ${items[0].program.name}`,
      schoolA: items[0].program.name,
      schoolB: "",
      analysis: `Vì bạn mới chọn 1 trường trong danh sách so sánh, AI ghi nhận ưu điểm lớn nhất là ${items[0].program.name} đem lại độ phù hợp ${items[0].suitabilityScore}% với chuyên ngành ${items[0].program.major}. Tuy nhiên, để chiến lược tuyển sinh không rủi ro, bạn nên quay lại Trinh duyệt và thêm ít nhất 1-2 nguyện vọng phòng hờ (nhóm An Toàn) để AI có cơ sở đối chiếu chi tiết nhé!`
    });
  }


  // 3. STRATEGY (Khuyến nghị thứ tự xếp Nguyện vọng Vàng)
  const strategy: RecommendationStep[] = [];
  
  // Chúng ta sắp xếp các trường của người dùng thành 3 tầng: Khát Vọng (NV1), Trụ cột (NV2), Bảo vệ (NV3+)
  // Logic: NV1 là trường user yêu thích/điểm cao (có thể mạo hiểm hoặc vừa sức), NV cuối bắt buộc là trường đỗ cao nhất (>80%).
  const sortedByPassDesc = [...items].sort((a, b) => a.passProbability - b.passProbability); // từ khó đến an toàn
  
  // Take up to top 4 programs for strategy
  const toDisplay = [...items].sort((a, b) => {
    // Sort logic for ordering application: riskier / more prestigious first, safest last!
    return a.passProbability - b.passProbability;
  });

  toDisplay.forEach((it, idx) => {
    let rank = `Nguyện Vọng ${idx + 1}`;
    let role = "";
    let color = "";
    let reason = "";

    if (idx === 0) {
      role = "🚀 NV1: KHÁT VỌNG ĐỘT PHÁ";
      color = "#9333ea";
      reason = `Quy chế cho phép thi trượt NV1 vẫn được xét trúng tuyển các NV dưới với quyền lợi NGANG NGƯỜI ĐẶT NV1. Do đó, hãy dũng cảm đặt ${it.program.name} (Ngành ${it.program.major}) lên đầu tiên, kể cả khi khả năng đỗ là ${it.passProbability}%, để không bao giờ tiếc nuối!`;
    } else if (idx === toDisplay.length - 1 && it.passProbability >= 70) {
      role = "🛡️ NV CỐ ĐÍNH: LỚP BẢO VỆ TUYỆT ĐỐI (AN TOÀN)";
      color = "#16a34a";
      reason = `Với khả năng đỗ lên tới ${it.passProbability}%, đây là "chiếc phao cứu sinh" vô cùng an toàn. Ngay cả khi kỳ thi chính thức gặp chấn động phi tiêu chuẩn ở các trường trên, ${it.program.name} vẫn mở rộng cửa bảo chứng suất đại học danh giá cho bạn.`;
    } else {
      role = "⚖️ NV TRUNG GIAN: TRỤ CỘT THỰC TẾ";
      color = "#d97706";
      reason = `Sự trung hòa lý tưởng giữa khát vọng và sự an toàn. Ở mức khả năng đỗ ${it.passProbability}%, đây là ranh giới chiến thuật giúp bạn giữ cơ hội cực cao trước khi phải tụt xuống trường an toàn tuyệt đối.`;
    }

    strategy.push({
      rank,
      badgeColor: color,
      schoolName: it.program.name,
      majorName: it.program.major,
      passProb: it.passProbability,
      role,
      reasoning: reason
    });
  });

  // 4. OVERALL SUMMARY
  const totalCount = items.length;
  const safeCount = items.filter(i => i.passProbability >= 80).length;
  let summary = `Danh sách của bạn gồm ${totalCount} lựa chọn. `;
  if (safeCount >= 1) {
    summary += `🌟 Chiến lược cực kỳ vững vàng vì đã sở hữu ít nhất ${safeCount} phương án Bảo Cánh An Toàn (>80%). Bạn có thể yên tâm dồn 200% sức lực cho những nguyện vọng mơ ước ở vị trí NV1, NV2!`;
  } else {
    summary += `⚠️ CẢNH BÁO AI: Hiện bạn CHƯA CÓ trường nào thuộc nhóm an toàn tuyệt đối (Đỗ > 80%). Để ngăn ngừa rủi ro trượt đại học khi điểm chuẩn biến động bất ngờ, lời khuyên vàng từ AI là hãy quay sang trang Phân tích, bổ sung ngay ít nhất 01 ngành thuộc Nhóm An Toàn (Màu xanh lá)!`;
  }

  return {
    bestInClass,
    tradeoffs,
    strategy,
    overallSummary: summary
  };
}
