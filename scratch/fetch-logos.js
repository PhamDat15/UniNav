const https = require("https");
const fs = require("fs");
const path = require("path");

const universities = [
  { name: "hust", url: "https://hust.edu.vn" },
  { name: "ftu", url: "https://ftu.edu.vn" },
  { name: "neu", url: "https://neu.edu.vn" },
  { name: "ptit", url: "https://ptit.edu.vn" },
  { name: "haui", url: "https://haui.edu.vn/vn" },
  { name: "utc", url: "https://utc.edu.vn" }
];

async function fetchHtml(urlStr) {
  return new Promise((resolve, reject) => {
    https.get(urlStr, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });
}

async function findLogos() {
  for (let u of universities) {
    try {
      console.log("Fetching " + u.url);
      let html = await fetchHtml(u.url);
      let match = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi);
      if (match) {
        let logoMatches = match.filter(img => img.toLowerCase().includes("logo"));
        if (logoMatches.length > 0) {
          let srcMatch = logoMatches[0].match(/src=["']([^"']+)["']/i);
          if (srcMatch) {
            let logoUrl = srcMatch[1];
            if (!logoUrl.startsWith("http")) {
              logoUrl = new URL(logoUrl, u.url).href;
            }
            console.log(u.name + " -> " + logoUrl);
          }
        } else {
            console.log(u.name + " -> No logo found");
        }
      }
    } catch(e) {
      console.log(u.name + " Error: " + e.message);
    }
  }
}

findLogos();
