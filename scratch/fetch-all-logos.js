const https = require("https");
const http = require("http");

const universities = [
  { name: "Công ngh?", url: "https://uet.vnu.edu.vn" },
  { name: "Khoa h?c T? nhiên", url: "https://hus.vnu.edu.vn" },
  { name: "Y Hà N?i", url: "https://hmu.edu.vn" },
  { name: "Ngân hàng", url: "https://hvnh.edu.vn" },
  { name: "Tài chính", url: "https://hvtc.edu.vn" },
  { name: "Th?y L?i", url: "https://tlu.edu.vn" },
  { name: "Xây d?ng", url: "https://huce.edu.vn" },
  { name: "M? - Ð?a ch?t", url: "https://humg.edu.vn" },
  { name: "Thuong m?i", url: "https://tmu.edu.vn" },
  { name: "Ð?i h?c Hà N?i", url: "https://hanu.vn" },
  { name: "Báo chí", url: "https://ajc.hcma.vn" },
  { name: "Su ph?m", url: "https://hnue.edu.vn" },
  { name: "Sân kh?u", url: "http://skda.edu.vn" }
];

async function fetchHtml(urlStr) {
  return new Promise((resolve, reject) => {
    const client = urlStr.startsWith("https") ? https : http;
    client.get(urlStr, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchHtml(new URL(res.headers.location, urlStr).href).then(resolve).catch(reject);
      }
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });
}

async function findLogos() {
  for (let u of universities) {
    try {
      let html = await fetchHtml(u.url);
      let match = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi);
      if (match) {
        let logoMatches = match.filter(img => img.toLowerCase().includes("logo"));
        if (logoMatches.length > 0) {
          let srcMatch = logoMatches[0].match(/src=["']([^"']+)["']/i);
          if (srcMatch) {
            let logoUrl = srcMatch[1];
            if (!logoUrl.startsWith("http")) logoUrl = new URL(logoUrl, u.url).href;
            console.log(u.name + " -> " + logoUrl);
            continue;
          }
        }
      }
      console.log(u.name + " -> NOT FOUND");
    } catch(e) {
      console.log(u.name + " Error: " + e.message);
    }
  }
}
findLogos();
