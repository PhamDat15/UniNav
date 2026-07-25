const fs = require('fs');

function processFile(filePath, regexString) {
  if (!fs.existsSync(filePath)) return;
  
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(new RegExp(regexString));
  
  if (match) {
    const jsonStr = match[1];
    let arr;
    try {
      arr = eval('(' + jsonStr + ')');
    } catch(e) {
      console.error(`Error parsing JSON in ${filePath}:`, e);
      return;
    }
    
    let updated = 0;
    arr = arr.map(u => {
      let isChanged = false;
      let multiplier = null;

      const major = u.major.toLowerCase();
      const uniName = u.name.toLowerCase();

      // Priority: Học viện Ngân hàng
      if (uniName.includes('học viện ngân hàng') && major.includes('chất lượng cao')) {
        multiplier = 'toan'; // Giả định CLC Học viện ngân hàng nhân đôi môn chính
      } 
      // Language majors
      else if (major.includes('ngôn ngữ') || major.includes('sư phạm tiếng anh')) {
        multiplier = 'anh';
      }
      // Khối kinh tế CLC / Tiên tiến
      else if ((major.includes('chất lượng cao') || major.includes('tiên tiến') || major.includes('clc')) && (uniName.includes('ngoại thương') || uniName.includes('kinh tế quốc dân') || uniName.includes('tài chính'))) {
        multiplier = 'anh';
      }
      // Khối kỹ thuật CLC
      else if ((major.includes('chất lượng cao') || major.includes('tiên tiến') || major.includes('clc')) && (uniName.includes('bách khoa') || uniName.includes('công nghệ'))) {
        multiplier = 'toan';
      }
      
      if (multiplier) {
        if (!u.scoreCalculation) {
          u.scoreCalculation = {
            scale: 40,
            multiplierSubject: multiplier,
            formulaDescription: `Môn ${multiplier === 'anh' ? 'Tiếng Anh' : (multiplier === 'toan' ? 'Toán' : multiplier)} nhân hệ số 2 (thang 40)`
          };
          
          // Convert averageScore
          if (u.averageScore && u.averageScore <= 30) {
            u.averageScore = parseFloat(((u.averageScore / 30) * 40).toFixed(2));
          }

          // Convert historicalScores
          if (u.historicalScores) {
            for (let year in u.historicalScores) {
              if (u.historicalScores[year] <= 30) {
                u.historicalScores[year] = parseFloat(((u.historicalScores[year] / 30) * 40).toFixed(2));
              }
            }
          }
          isChanged = true;
          updated++;
        }
      }
      return u;
    });
    
    if (updated > 0) {
      const newStr = content.replace(jsonStr, JSON.stringify(arr, null, 2));
      fs.writeFileSync(filePath, newStr);
      console.log(`Success! Updated ${updated} records in ${filePath}`);
    } else {
      console.log(`No records needed update in ${filePath}`);
    }
  } else {
    console.log(`Could not find the array regex match in ${filePath}.`);
  }
}

processFile('src/data/mockUniversities.ts', 'const baseUniversities: UniversityProgram\\[\\] = (\\[[\\s\\S]*?\\]);\\n\\nexport const mockUniversities');
processFile('src/data/massiveUniversities.ts', 'const rawMassiveUniversities: UniversityProgram\\[\\] = (\\[[\\s\\S]*?\\]);\\n\\nexport const massiveUniversities');
