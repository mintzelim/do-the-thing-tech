import fs from 'fs';
import path from 'path';

const root = '/home/ubuntu/do-the-thing';

function replaceAll(text, replacements) {
  let output = text;
  for (const [from, to] of replacements) {
    output = output.split(from).join(to);
  }
  return output;
}

const cssPath = path.join(root, 'client/src/pixel-art-refined.css');
let css = fs.readFileSync(cssPath, 'utf8');
css = replaceAll(css, [
  ["font-size: clamp(32px, 5vw, 40px);", "font-size: calc(clamp(32px, 5vw, 40px) + 4px);"],
  ["font-size: clamp(24px, 4vw, 28px);", "font-size: calc(clamp(24px, 4vw, 28px) + 4px);"],
  ["font-size: 20px;", "font-size: 24px;"],
  ["font-size: 18px;", "font-size: 22px;"],
  ["font-size: 16px;", "font-size: 20px;"],
  ["font-size: 15px;", "font-size: 19px;"],
  ["font-size: 14px;", "font-size: 18px;"],
  ["font-size: 13px;", "font-size: 17px;"],
  ["font-size: 12px;", "font-size: 16px;"],
  ["font-size: 10px;", "font-size: 14px;"],
  ["font-size: 42px;", "font-size: 46px;"],
  ["font-size: 32px;", "font-size: 36px;"],
  ["font-size: 26px;", "font-size: 30px;"],
  ["font-size: 24px;", "font-size: 28px;"],
  ["font-size: 22px;", "font-size: 26px;"],
]);
fs.writeFileSync(cssPath, css);

const homePath = path.join(root, 'client/src/pages/Home.tsx');
let home = fs.readFileSync(homePath, 'utf8');
home = replaceAll(home, [
  ['fontSize: "20px"', 'fontSize: "24px"'],
  ['fontSize: "14px"', 'fontSize: "18px"'],
  ['fontSize: "12px"', 'fontSize: "16px"'],
  ['fontSize: "10px"', 'fontSize: "14px"'],
]);
fs.writeFileSync(homePath, home);

const blogDir = path.join(root, 'blog');
for (const file of fs.readdirSync(blogDir)) {
  if (!file.endsWith('.md')) continue;
  const blogPath = path.join(blogDir, file);
  const content = fs.readFileSync(blogPath, 'utf8');
  const updated = content.replace(/https:\/\/do-the-thing-tech-[^)\s]+\.vercel\.app\/blog/g, 'https://dothething.tech/blog')
    .replace(/https:\/\/do-the-thing-tech-[^)\s]+\.vercel\.app/g, 'https://dothething.tech');
  if (updated !== content) {
    fs.writeFileSync(blogPath, updated);
  }
}

console.log('Updated VT font sizes and blog backlinks.');
