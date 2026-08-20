import fs from "fs";
import path from "path";

const DIRS_TO_PROCESS = ["src", "public", "scripts", "docs", "tests"];
const FILES_TO_PROCESS = ["server.ts", "brand-guidelines.md", "index.html"];

function replaceInFile(filePath: string) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, "utf-8");
  const original = content;

  content = content.replace(/https:\/\/dswreturnrefund\.com/g, "https://dswreturnrefund.com");
  content = content.replace(/http:\/\/dswreturnrefund\.com/g, "https://dswreturnrefund.com");
  content = content.replace(/dswreturnrefund\.com/g, "dswreturnrefund.com");
  content = content.replace(/DSWReturnRefund Editorial Team/g, "DSWReturnRefund Editorial Team");
  content = content.replace(/DSWReturnRefund Editorial Board/g, "DSWReturnRefund Editorial Board");
  content = content.replace(/DSWReturnRefund Editorial/g, "DSWReturnRefund Editorial");
  content = content.replace(/DSWReturnRefund/g, "DSWReturnRefund");
  content = content.replace(/dswreturnrefund/g, "dswreturnrefund");

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`Replaced in: ${filePath}`);
  }
}

function processDirectory(dir: string) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile()) {
      replaceInFile(fullPath);
    }
  }
}

for (const dir of DIRS_TO_PROCESS) {
  processDirectory(dir);
}

for (const file of FILES_TO_PROCESS) {
  replaceInFile(file);
}

console.log("Brand replacement complete!");
