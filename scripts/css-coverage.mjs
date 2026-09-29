// Проверка разноса стилей: у каждого класса на странице правила должны
// быть подключены. Сравнивает селекторы из исходных CSS с тем, что Next
// реально подключил странице (браузер нормализует и те и другие одинаково).
// Сообщает классы, чьи правила лежат только в неподключённых файлах.
//
//   npm run build && PORT=3100 npm start
//   node scripts/css-coverage.mjs / /dizajn-vizitki ...
import { spawn } from 'node:child_process';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
const ROOT = new URL('..', import.meta.url).pathname;
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : p.endsWith('.css') && !p.endsWith('site.css') ? [p] : []; });
const css = Object.fromEntries(walk(join(ROOT, 'src')).map((f) => [relative(join(ROOT, 'src'), f), readFileSync(f, 'utf8')]));
const BASE = process.env.BASE || 'http://localhost:3100';
const PORT = +(process.env.CDP_PORT || 9495);
const c = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=/tmp/cdp-cov-${PORT}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms)); let t;
for (let i = 0; i < 40; i++) { try { t = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json(); break; } catch { await sleep(250); } }
const ws = new WebSocket(t.find((x) => x.type === 'page').webSocketDebuggerUrl); let id = 0; const w = new Map();
const send = (m, p = {}) => new Promise((r) => { w.set(++id, r); ws.send(JSON.stringify({ id, method: m, params: p })); });
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && w.has(m.id)) w.get(m.id)(m.result); };
await new Promise((r) => (ws.onopen = r));
const ev = async (x) => { const r = await send('Runtime.evaluate', { expression: x, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) console.log('EXC', JSON.stringify(r.exceptionDetails).slice(0, 300)); return r.result?.value; };
await send('Page.enable');
let bad = 0;
for (const p of process.argv.slice(2)) {
  await send('Page.navigate', { url: BASE + p }); await sleep(1500);
  await send('Runtime.evaluate', { expression: `window.__css=${JSON.stringify(css)}` });
  const res = await ev(`(() => {
    const sels = (list, out) => { for (const r of list) { if (r.cssRules && !(r instanceof CSSStyleRule)) sels(r.cssRules, out); else if (r instanceof CSSStyleRule) out.add(r.selectorText); } return out; };
    const loaded = new Set(); for (const s of document.styleSheets) { try { sels(s.cssRules, loaded); } catch {} }
    const used = new Set(); document.querySelectorAll('[class]').forEach(e => e.classList.forEach(c => c.startsWith('ls-') && used.add(c)));
    const miss = new Map();
    for (const [file, text] of Object.entries(window.__css)) {
      const sh = new CSSStyleSheet(); sh.replaceSync(text); const all = sels(sh.cssRules, new Set());
      for (const sel of all) {
        if (loaded.has(sel)) continue;
        // селектор относится к элементу на странице?
        let hit = false; try { hit = !!document.querySelector(sel.replace(/::?(before|after|placeholder|-webkit-[a-z-]+|marker|selection)/g, '').replace(/:(hover|focus|focus-visible|active|checked|open)/g,'') || '*'); } catch {}
        if (!hit) continue;
        const k = file; (miss.get(k) || miss.set(k, []).get(k)).push(sel);
      }
    }
    return [...miss.entries()].map(([f, s]) => f + ' — ' + s.length + ' правил, напр.: ' + s.slice(0, 3).join(' | '));
  })()`);
  if (res?.length) { bad += res.length; console.log(p); res.forEach((l) => console.log('   ', l.slice(0, 260))); }
}
console.log(bad ? `ИТОГО неподключённых файлов с нужными правилами: ${bad}` : 'Все нужные правила подключены');
c.kill(); process.exit(0);
