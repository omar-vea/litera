// Проверка каскада: находит места, где победителя решает только порядок
// подключения CSS — у элемента свойство задают правила из РАЗНЫХ файлов
// с одинаковой специфичностью и важностью, а значения разные.
// Next подключает стили компонентов в порядке импорта, и он меняется при
// переходах между страницами, поэтому таких мест быть не должно.
//
//   npm run build && npm start      (сервер на 3100: PORT=3100 npm start)
//   node scripts/css-conflicts.mjs / /dizajn-vizitki ...
//
// Нужен Google Chrome. Вывод «ВСЕГО конфликтов: 0» — каскад в порядке.
import { spawn } from 'node:child_process';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
const ROOT = new URL('..', import.meta.url).pathname;
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : p.endsWith('.css') && !p.endsWith('site.css') ? [p] : []; });
const files = walk(join(ROOT, 'src'));
const order = files.map((f) => relative(join(ROOT, 'src'), f));
const css = Object.fromEntries(files.map((f) => [relative(join(ROOT, 'src'), f), readFileSync(f, 'utf8')]));
const BASE = process.env.BASE || 'http://localhost:3100';
const PORT = +(process.env.CDP_PORT || 9481); const pages = process.argv.slice(2);
const c = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=/tmp/cdp-conf-${PORT}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms)); let t;
for (let i = 0; i < 40; i++) { try { t = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json(); break; } catch { await sleep(250); } }
const ws = new WebSocket(t.find((x) => x.type === 'page').webSocketDebuggerUrl); let id = 0; const w = new Map();
const send = (m, p = {}) => new Promise((r) => { w.set(++id, r); ws.send(JSON.stringify({ id, method: m, params: p })); });
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && w.has(m.id)) w.get(m.id)(m.result); };
await new Promise((r) => (ws.onopen = r));
const ev = async (x) => { const r = await send('Runtime.evaluate', { expression: x, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) console.log('EXC', JSON.stringify(r.exceptionDetails).slice(0, 400)); return r.result?.value; };
await send('Page.enable');
const analyzer = `(() => {
  document.querySelectorAll('link[rel=stylesheet],style').forEach(s=>s.remove());
  for (const f of ${JSON.stringify(order)}) { const s=document.createElement('style'); s.dataset.file=f; s.textContent=window.__css[f]; document.head.appendChild(s); }
  document.querySelectorAll('details').forEach(d=>d.open=true);
  // специфичность
  const split = (s) => { const out=[]; let d=0, cur=''; for (const ch of s) { if (ch==='('||ch==='[') d++; if (ch===')'||ch===']') d--; if (ch===',' && !d) { out.push(cur); cur=''; } else cur+=ch; } out.push(cur); return out.map(x=>x.trim()); };
  const spec = (sel) => { let a=0,b=0,c=0; let s=sel;
    s = s.replace(/:(not|is|has)\\(((?:[^()]|\\([^()]*\\))*)\\)/g, (m,fn,args) => { const best = split(args).map(spec).sort((x,y)=>x[0]-y[0]||x[1]-y[1]||x[2]-y[2]).pop(); a+=best[0]; b+=best[1]; c+=best[2]; return ''; });
    s = s.replace(/:where\\((?:[^()]|\\([^()]*\\))*\\)/g, '');
    s = s.replace(/\\[[^\\]]*\\]/g, () => { b++; return ''; });
    s = s.replace(/::[a-z-]+(\\([^)]*\\))?/g, () => { c++; return ''; });
    s = s.replace(/#[\\w-]+/g, () => { a++; return ''; });
    s = s.replace(/\\.[\\w-]+/g, () => { b++; return ''; });
    s = s.replace(/:[a-z-]+(\\([^)]*\\))?/g, () => { b++; return ''; });
    s.split(/[\\s>+~]+/).forEach(x => { if (/^[a-z][\\w-]*$/i.test(x)) c++; });
    return [a,b,c]; };
  // все правила с учётом @media/@supports
  const rules = [];
  const walk = (list, file) => { for (const r of list) {
    if (r instanceof CSSMediaRule) { if (matchMedia(r.conditionText).matches) walk(r.cssRules, file); }
    else if (r instanceof CSSSupportsRule) { if (CSS.supports(r.conditionText)) walk(r.cssRules, file); }
    else if (r instanceof CSSStyleRule) rules.push([r, file]);
  } };
  for (const s of document.styleSheets) walk(s.cssRules, s.ownerNode.dataset.file);
  const conflicts = new Map();
  const els = [...document.querySelectorAll('*')];
  for (const [rule, file] of rules) {
    for (const part of split(rule.selectorText)) {
      const pm = part.match(/::?(before|after)$/); const pseudo = pm ? '::'+pm[1] : '';
      const base = pm ? part.slice(0, pm.index) : part;
      let matched; try { matched = els.filter(e => e.matches(base || '*')); } catch { continue; }
      if (!matched.length) continue;
      const sp = spec(part);
      for (let i=0;i<rule.style.length;i++) { const prop = rule.style[i]; const val = rule.style.getPropertyValue(prop); const imp = rule.style.getPropertyPriority(prop);
        for (const e of matched) { const key = e; let m = conflicts.get(key); if (!m) conflicts.set(key, m = new Map());
          const k = pseudo+'|'+prop; (m.get(k) || m.set(k, []).get(k)).push({file, sel: part, sp, val, imp}); } }
    }
  }
  const report = new Map();
  for (const [e, m] of conflicts) for (const [k, list] of m) {
    const top = (x,y)=> (x.imp?1:0)-(y.imp?1:0) || x.sp[0]-y.sp[0] || x.sp[1]-y.sp[1] || x.sp[2]-y.sp[2];
    const best = list.reduce((a,b)=> top(a,b)>=0? a:b);
    const ties = list.filter(x => top(x,best)===0);
    const files = new Set(ties.map(x=>x.file)); const vals = new Set(ties.map(x=>x.val));
    if (files.size>1 && vals.size>1) {
      const sig = k+' :: '+ties.map(x=>x.file+' «'+x.sel+'» = '+x.val).join('  VS  ');
      report.set(sig, (report.get(sig)||0)+1);
    }
  }
  return [...report.entries()].map(([s,n])=>s+'  (элементов: '+n+')');
})()`;
const all = new Map();
for (const width of [390, 700, 1280]) {
  await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 700 });
  for (const p of pages) {
    await send('Page.navigate', { url: BASE + p }); await sleep(1500);
    await send('Runtime.evaluate', { expression: `window.__css=${JSON.stringify(css)}` });
    const r = (await ev(analyzer)) || [];
    for (const line of r) { const s = all.get(line) || new Set(); s.add(width + p); all.set(line, s); }
  }
}
for (const [line, where] of all) console.log(line.slice(0, 400), '\n      на:', [...where].slice(0, 6).join(' '));
console.log('ВСЕГО конфликтов:', all.size);
c.kill(); process.exit(0);
