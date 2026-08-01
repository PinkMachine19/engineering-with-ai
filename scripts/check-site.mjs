import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const docs=path.join(root,'docs');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'course-manifest.json'),'utf8'));
const errors=[];
for(const s of manifest.sessions){
  const file=path.join(docs,'sessions',`session-${s.id}`,'index.html');
  if(!fs.existsSync(file)) errors.push(`Missing ${file}`);
  else { const html=fs.readFileSync(file,'utf8'); if(!html.includes('draft-watermark')||!html.includes('badge-draft')) errors.push(`Missing draft signals: session ${s.id}`); }
}
for(const required of ['index.html','syllabus/index.html','sessions/index.html','status/index.html','architecture/index.html','styles.css','progress.js']) if(!fs.existsSync(path.join(docs,required))) errors.push(`Missing docs/${required}`);
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
for(const file of walk(docs).filter(f=>f.endsWith('.html'))){
  const html=fs.readFileSync(file,'utf8');
  for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
    const ref=match[1];
    if(ref.startsWith('http')||ref.startsWith('#')||ref.startsWith('data:')) continue;
    const target=path.resolve(path.dirname(file),ref.split('#')[0]);
    if(!fs.existsSync(target)) errors.push(`Broken local reference in ${path.relative(docs,file)}: ${ref}`);
  }
}
if(errors.length){ console.error(errors.join('\n')); process.exit(1); }
console.log(`Site check passed: ${manifest.sessions.length} sessions and required shared assets.`);
