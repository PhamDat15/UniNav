const fs = require('fs');

function extractMajors(filename) {
  const content = fs.readFileSync(filename, 'utf8');
  const regex = /major:\s*['"]([^'"]+)['"]/g;
  let matches;
  const result = [];
  while ((matches = regex.exec(content)) !== null) {
    result.push(matches[1]);
  }
  return result;
}

const m1 = extractMajors('src/data/mockUniversities.ts');
const m2 = extractMajors('src/data/massiveUniversities.ts');
const allMajors = [...new Set([...m1, ...m2])];

console.log(JSON.stringify(allMajors));
