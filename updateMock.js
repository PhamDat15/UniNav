const fs = require('fs');
const content = fs.readFileSync('src/data/mockUniversities.ts', 'utf8');

const match = content.match(/const baseUniversities: UniversityProgram\[\] = (\[[\s\S]*?\]);\n\nexport const mockUniversities/);
if (match) {
  const jsonStr = match[1];
  let arr;
  try {
    arr = eval('(' + jsonStr + ')');
  } catch(e) {
    console.error("Error parsing JSON:", e);
    process.exit(1);
  }
  
  arr = arr.map(u => {
    let subjectBlocks = ["A00", "A01", "D01"];
    let specialExams = [];
    let talentAdmission = "Xét tuyển thẳng học sinh đạt giải Học sinh giỏi Quốc gia, Tỉnh/TP";
    let priorityPolicies = ["Cộng điểm ưu tiên khu vực", "Cộng điểm đối tượng theo quy định BGD&ĐT"];
    
    if (u.name.includes('ĐHQGHN')) {
      specialExams = ["Đánh giá năng lực - HSA (ĐHQGHN)"];
      talentAdmission = "Ưu tiên xét tuyển học sinh trường chuyên, HSG các cấp";
      priorityPolicies.push("Cộng điểm cho chứng chỉ tiếng Anh quốc tế (IELTS/TOEFL)");
    } else if (u.name.includes('Kinh tế') || u.name.includes('Tài chính') || u.name.includes('Thương mại') || u.name.includes('Ngoại thương')) {
      subjectBlocks = ["A00", "A01", "D01", "D07"];
      priorityPolicies.push("Cộng từ 0.5 - 1.5 điểm quy đổi cho IELTS >= 5.5");
      talentAdmission = "Xét tuyển kết hợp học bạ và chứng chỉ quốc tế (IELTS/SAT/ACT)";
    } else if (u.name.includes('Sư phạm') || u.name.includes('Y') || u.name.includes('Dược')) {
      subjectBlocks = ["B00", "A00", "D01"];
      talentAdmission = "Xét tuyển thẳng học sinh đạt giải Nhất, Nhì, Ba HSG Quốc gia";
    } else {
      if (Math.random() > 0.6) {
         specialExams.push("Đánh giá tư duy - TSA (ĐHBK)");
      }
      if (Math.random() > 0.7) {
         specialExams.push("Đánh giá năng lực - APT (ĐHQG TPHCM)");
      }
    }
    
    return {
      ...u,
      subjectBlocks,
      specialExams,
      talentAdmission,
      priorityPolicies
    };
  });
  
  const newStr = content.replace(jsonStr, JSON.stringify(arr, null, 2));
  fs.writeFileSync('src/data/mockUniversities.ts', newStr);
  console.log("Success! Updated mockUniversities.ts");
} else {
  console.log("Could not find the baseUniversities array regex match.");
}
