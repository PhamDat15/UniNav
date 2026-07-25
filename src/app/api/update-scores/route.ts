import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { updates } = await req.json();
    // updates is an array of objects: { id, averageScore, score2023, score2024, score2025 }

    if (!Array.isArray(updates)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    const dataPaths = [
      path.join(process.cwd(), 'src/data/mockUniversities.ts'),
      path.join(process.cwd(), 'src/data/massiveUniversities.ts')
    ];

    let totalUpdated = 0;

    for (const filePath of dataPaths) {
      if (!fs.existsSync(filePath)) continue;

      const content = fs.readFileSync(filePath, 'utf8');
      
      // Determine regex based on file
      const regexStr = filePath.includes('mockUniversities') 
        ? 'const baseUniversities: UniversityProgram\\[\\] = (\\[[\\s\\S]*?\\]);\\n\\nexport const mockUniversities'
        : 'const rawMassiveUniversities: UniversityProgram\\[\\] = (\\[[\\s\\S]*?\\]);\\n\\nexport const massiveUniversities';

      const match = content.match(new RegExp(regexStr));
      if (!match) continue;

      const jsonStr = match[1];
      let arr;
      try {
        arr = eval('(' + jsonStr + ')');
      } catch (e) {
        console.error(`Error parsing JSON in ${filePath}`, e);
        continue;
      }

      let updatedCount = 0;
      arr = arr.map((u: any) => {
        const update = updates.find((up: any) => up.id === u.id);
        if (update) {
          if (update.averageScore) u.averageScore = parseFloat(update.averageScore);
          
          if (!u.historicalScores) u.historicalScores = {};
          if (update.score2023) u.historicalScores["2023"] = parseFloat(update.score2023);
          if (update.score2024) u.historicalScores["2024"] = parseFloat(update.score2024);
          if (update.score2025) u.historicalScores["2025"] = parseFloat(update.score2025);
          
          updatedCount++;
        }
        return u;
      });

      if (updatedCount > 0) {
        const newStr = content.replace(jsonStr, JSON.stringify(arr, null, 2));
        fs.writeFileSync(filePath, newStr);
        totalUpdated += updatedCount;
      }
    }

    return NextResponse.json({ success: true, updated: totalUpdated });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
