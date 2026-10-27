#!/usr/bin/env node
// Builds the public help pages at samayapp.co/help from the PRODUCT's article
// file, which is the single source of truth for every sentence a user reads.
//
// Nothing here is authored. If a sentence is wrong, fix it in the app repo at
// app/src/content/help/articles.ts and run this again; never edit the generated
// HTML, which is overwritten. That rule is the whole point: the onboarding
// emails and the printed guide are already extracts of the same file, and a
// second hand-maintained copy would drift away from the product silently.
//
//   node scripts/build-help.mjs [path-to-samay-app-repo]
//
// Two pages, because the app gates admin content behind a login and a static
// page has nothing to check:
//   public/help/index.html         everyone
//   public/help/admin/index.html   administrators and approvers
//   public/help/assets/*.png       shared screenshots

import { readFile, writeFile, mkdir, copyFile, rm, readdir } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(HERE, '..');
const APP = path.resolve(process.argv[2] ?? path.join(process.env.HOME, 'work/samay-help'));
const CONTENT = path.join(APP, 'app/src/content/help');
const ASSETS = path.join(APP, 'app/src/assets/help');
const OUT = path.join(SITE, 'public/help');

const SUPPORT = 'support@samayapp.co';
const APP_URL = 'https://app.samayapp.co';

if (!existsSync(CONTENT)) {
  console.error(`No article source at ${CONTENT}\nPass the samay app repo as the first argument.`);
  process.exit(1);
}

// ─── Load the content ────────────────────────────────────────────────
// articles.ts imports PNGs, which Node cannot resolve. Rewrite each import to
// the bare filename and run the result through Node's own type stripping, so
// this needs no bundler and cannot fall out of step with a build config.

// Not under node_modules: Node refuses to strip types from anything in there.
const tmp = path.join(SITE, '.help-build');
await rm(tmp, { recursive: true, force: true });
await mkdir(tmp, { recursive: true });

const rawArticles = await readFile(path.join(CONTENT, 'articles.ts'), 'utf8');
const IMPORT_RE = /^import\s+(\w+)\s+from\s+'\.\.\/\.\.\/assets\/help\/([\w.-]+)';$/gm;
const expectedImports = (rawArticles.match(IMPORT_RE) ?? []).length;
if (expectedImports === 0) throw new Error('No asset imports found; the import shape changed.');

let shimmed = 0;
const shimmedSrc = rawArticles.replace(IMPORT_RE, (_m, name, file) => {
  shimmed += 1;
  return `const ${name} = ${JSON.stringify(file)};`;
});
if (shimmed !== expectedImports) {
  throw new Error(`Rewrote ${shimmed} asset imports, expected ${expectedImports}`);
}

// ESM under Node needs the extension spelled out; the app's bundler does not.
const SIBLING_RE = /from '\.\/types'/g;
const siblings = (shimmedSrc.match(SIBLING_RE) ?? []).length;
if (siblings === 0) throw new Error("No './types' import found; the import shape changed.");
const resolvedSrc = shimmedSrc.replace(SIBLING_RE, "from './types.ts'");

await copyFile(path.join(CONTENT, 'types.ts'), path.join(tmp, 'types.ts'));
await writeFile(path.join(tmp, 'articles.ts'), resolvedSrc);

const { ARTICLES, GROUPS } = await import(pathToFileURL(path.join(tmp, 'articles.ts')).href);

// ─── Split by audience ───────────────────────────────────────────────
// Approving is a capability, not a rank: an approver is often a team lead
// rather than an administrator. Both sets of pages describe running Samay for
// other people, so they share the second page and it is named for both.

const isAdminSide = (a) => a.audience === 'admin' || a.audience === 'approver';
const PAGES = [
  {
    file: 'index.html',
    dir: '',
    assetBase: 'assets',
    title: 'Help with Samay',
    intro: 'Everything in the product, written out. The same pages appear inside Samay once you are signed in; this copy needs no sign-in, so it works when you cannot get in.',
    articles: ARTICLES.filter((a) => !isAdminSide(a)),
    other: { href: 'admin/', label: 'Running Samay at your agency' },
  },
  {
    file: 'admin/index.html',
    dir: 'admin',
    assetBase: '../assets',
    title: 'Running Samay at your agency',
    intro: 'For the person who sets Samay up and the people who approve timesheets. Job codes, the resource plan, reminders, reporting, and what to do when a filed week has to be opened again.',
    articles: ARTICLES.filter(isAdminSide),
    other: { href: '../', label: 'Help with Samay' },
  },
];

const pageOf = new Map();
for (const p of PAGES) for (const a of p.articles) pageOf.set(a.slug, p);

// ─── Rendering ───────────────────────────────────────────────────────

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

/** **bold** runs, parsed here so nothing in the content file can inject markup. */
const emph = (text) => esc(text)
  .split('**')
  .map((run, i) => (i % 2 === 1 ? `<strong>${run}</strong>` : run))
  .join('');

const figure = (shot, page, inStep) => `
<figure class="fig${inStep ? ' instep' : ''}">
  <img src="${page.assetBase}/${esc(shot.src)}" alt="${esc(shot.alt)}" width="${pngSize(shot.src).w}" height="${pngSize(shot.src).h}" loading="lazy">
  ${shot.caption ? `<figcaption>${esc(shot.caption)}</figcaption>` : ''}
</figure>`;

/** Width and height straight out of the PNG header. Without these the page
 *  reflows as each screenshot loads, which silently breaks every anchor link:
 *  the jump happens, then the images above push the target down the page. */
const DIMS = new Map();
function pngSize(file) {
  if (DIMS.has(file)) return DIMS.get(file);
  const b = readFileSync(path.join(ASSETS, file));
  if (b.toString('ascii', 1, 4) !== 'PNG') throw new Error(`Not a PNG: ${file}`);
  const size = { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  if (!size.w || !size.h) throw new Error(`Unreadable PNG dimensions: ${file}`);
  DIMS.set(file, size);
  return size;
}

const unresolved = [];

function block(b, page) {
  switch (b.kind) {
    case 'lead': return `<p class="lead">${emph(b.text)}</p>`;
    case 'p': return `<p>${emph(b.text)}</p>`;
    case 'h': return b.level === 3
      ? `<h4>${esc(b.text)}</h4>`
      : `<h3>${esc(b.text)}</h3>`;
    case 'steps': return `<ol>${b.items.map((s) =>
      `<li><span>${emph(s.text)}</span>${s.image ? figure(s.image, page, true) : ''}</li>`).join('')}</ol>`;
    case 'defs': return `<dl>${b.items.map((d) =>
      `<div><dt>${esc(d.term)}</dt><dd>${emph(d.text)}</dd></div>`).join('')}</dl>`;
    case 'ul': return `<ul>${b.items.map((t) => `<li>${emph(t)}</li>`).join('')}</ul>`;
    case 'note': return `<div class="note"><p>${emph(b.text)}</p></div>`;
    case 'quote': return `<p class="quote">${esc(b.text)}</p>`;
    case 'image': return figure(b.shot, page, false);
    case 'slot':
      // Every slot was filled before this shipped. If one comes back, say so on
      // the page rather than leaving a hole a reader cannot interpret.
      return `<figure class="slot"><figcaption>Image to come</figcaption><p>${esc(b.spec)}</p></figure>`;
    case 'link': {
      const target = pageOf.get(b.to);
      if (!target) { unresolved.push(b.to); return ''; }
      const href = target === page ? `#${b.to}` : `${page.dir ? '../' : ''}${target.dir ? target.dir + '/' : ''}#${b.to}`;
      const away = target === page ? '' : ' <span class="away">on the other page</span>';
      return `<p class="onward"><a href="${href}">${esc(b.text)}</a>${away}</p>`;
    }
    default: return '';
  }
}

function article(a, page) {
  return `
<article id="${esc(a.slug)}">
  <h2>${esc(a.title)}${a.comingSoon ? ' <span class="soon">Not built yet</span>' : ''}</h2>
  ${a.body.map((b) => block(b, page)).join('\n  ')}
</article>`;
}

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
:root{--ink:#2e2e2b;--body:#4b4a48;--muted:#a09a92;--green:#1f513f;--line:#e8e5e0;--page:#f4f2ed}
html{scroll-behavior:smooth}
body{background:var(--page);color:var(--body);font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;-webkit-font-smoothing:antialiased;line-height:1.75}
.wrap{max-width:720px;margin:0 auto;padding:0 16px 120px}
header.top{padding:56px 0 8px}
.mark{font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:15px;letter-spacing:.15em;color:var(--ink);text-decoration:none;display:inline-block;margin-bottom:34px}
h1{font-family:'Playfair Display',Georgia,serif;font-size:40px;font-weight:700;line-height:1.12;color:var(--ink);margin-bottom:14px;letter-spacing:-.01em}
.intro{font-size:16.5px;line-height:1.6;margin-bottom:22px}
.switch{font-size:14px;color:var(--muted);padding-bottom:34px;border-bottom:1px solid var(--line)}
.switch a{color:var(--green);font-weight:500}
nav.toc{padding:34px 0 10px}
nav.toc h2{font-family:'Inter',sans-serif;font-size:11px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:var(--muted);margin-bottom:18px}
nav.toc section{margin-bottom:20px}
nav.toc .g{font-family:'Playfair Display',Georgia,serif;font-size:16px;font-weight:700;color:var(--ink);margin-bottom:6px}
nav.toc ul{list-style:none;padding:0}
nav.toc li{margin-bottom:3px}
nav.toc a{font-size:14.5px;color:var(--body);text-decoration:none;border-bottom:1px solid transparent}
nav.toc a:hover{border-bottom-color:var(--green);color:var(--green)}
.grp{margin-top:72px;padding-top:26px;border-top:1px solid var(--line)}
.grp h2.gh{font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:700;color:var(--ink);line-height:1.2;margin-bottom:6px}
.grp .blurb{font-size:15px;color:var(--muted);margin-bottom:8px}
article{padding-top:46px}
article h2{font-family:'Playfair Display',Georgia,serif;font-size:30px;font-weight:700;line-height:1.15;color:var(--ink);margin-bottom:20px;letter-spacing:-.005em;scroll-margin-top:20px}
.soon{display:inline-block;vertical-align:middle;font-family:'Inter',sans-serif;font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#8a5a12;background:#fdf3e1;border:1px solid #ecd9ad;border-radius:999px;padding:3px 9px;margin-left:8px;position:relative;top:-3px}
article h3{font-family:'Playfair Display',Georgia,serif;font-size:21px;font-weight:700;line-height:1.3;color:var(--ink);margin:44px 0 14px}
article h4{font-size:15px;font-weight:600;color:var(--ink);margin:30px 0 10px}
p{font-size:15px;line-height:1.75;margin-bottom:18px}
p.lead{font-size:16.5px;line-height:1.6;margin-bottom:26px}
strong{font-weight:600;color:var(--ink)}
ol{margin:0 0 22px;padding-left:24px}
ol li{margin-bottom:16px;padding-left:4px;font-size:15px;font-weight:600;color:var(--ink)}
ol li span{display:block;font-weight:400;line-height:1.7;color:var(--body)}
ul{margin:0 0 22px;padding-left:22px}
ul li{margin-bottom:7px;padding-left:3px;font-size:15px;line-height:1.75}
dl{margin:0 0 22px}
dl>div{margin-bottom:14px}
dt{font-size:15px;font-weight:600;color:var(--ink);margin-bottom:3px}
dd{font-size:15px;line-height:1.65;margin:0}
.note{border-left:2px solid var(--green);padding:3px 0 3px 16px;margin:0 0 22px}
.note p{line-height:1.65;margin:0}
.quote{font-size:14.5px;line-height:1.6;background:#fff;border:1px solid var(--line);border-radius:5px;padding:12px 15px;margin-bottom:14px}
.fig{margin:4px 0 24px}
.fig.instep{margin:12px 0 4px}
.fig img{display:block;max-width:100%;height:auto;border:1px solid var(--line);border-radius:5px;background:#fff}
figcaption{font-size:12.5px;line-height:1.5;color:var(--muted);margin-top:8px}
.slot{margin:4px 0 24px;border:1px solid var(--line);border-radius:5px;background:#faf9f6;padding:26px 20px}
.slot figcaption{font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;margin:0 0 6px}
.slot p{font-size:13px;line-height:1.55;color:#6b6560;margin:0}
.onward{margin-bottom:20px}
.onward a{font-size:15px;font-weight:500;color:var(--green);text-decoration:none;border-bottom:1px solid rgba(31,81,63,.25)}
.away{font-size:13px;color:var(--muted)}
footer{margin-top:84px;padding-top:30px;border-top:1px solid var(--line);font-size:14px;color:var(--muted)}
footer a{color:var(--green)}
footer p{font-size:14px;margin-bottom:10px}
@media (max-width:640px){h1{font-size:31px}article h2{font-size:25px}article h3{font-size:19px}.grp h2.gh{font-size:23px}header.top{padding-top:34px}}
@media print{body{background:#fff}.switch,nav.toc{display:none}article{page-break-inside:auto}article h2{page-break-after:avoid}}
`;

function render(page) {
  const groups = GROUPS.filter((g) => page.articles.some((a) => a.group === g.id));
  const toc = groups.map((g) => `
    <section>
      <div class="g">${esc(g.label)}</div>
      <ul>${page.articles.filter((a) => a.group === g.id)
        .map((a) => `<li><a href="#${esc(a.slug)}">${esc(a.title)}</a></li>`).join('')}</ul>
    </section>`).join('');

  const body = groups.map((g) => `
  <div class="grp">
    <h2 class="gh">${esc(g.label)}</h2>
    <p class="blurb">${esc(g.blurb)}</p>
  </div>
  ${page.articles.filter((a) => a.group === g.id).map((a) => article(a, page)).join('\n')}`).join('\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(page.title)} · Samay</title>
<meta name="description" content="${esc(page.intro.slice(0, 155))}">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>${CSS}</style>
</head>
<body>
<div class="wrap">
  <header class="top">
    <a class="mark" href="/">SAMAY</a>
    <h1>${esc(page.title)}</h1>
    <p class="intro">${esc(page.intro)}</p>
    <p class="switch">Looking for <a href="${page.other.href}">${esc(page.other.label)}</a>? It is on its own page.</p>
  </header>

  <nav class="toc">
    <h2>On this page</h2>
    ${toc}
  </nav>

  ${body}

  <footer>
    <p>These pages mirror the help center inside Samay. Sign in at <a href="${APP_URL}">app.samayapp.co</a> to read them there, where they are filtered to what your own account can do.</p>
    <p>Something here wrong, or missing? Write to <a href="mailto:${SUPPORT}">${SUPPORT}</a>.</p>
  </footer>
</div>
</body>
</html>
`;
}

// ─── Write ───────────────────────────────────────────────────────────

await rm(OUT, { recursive: true, force: true });
await mkdir(path.join(OUT, 'assets'), { recursive: true });
await mkdir(path.join(OUT, 'admin'), { recursive: true });

const pngs = (await readdir(ASSETS)).filter((f) => f.endsWith('.png'));
for (const f of pngs) await copyFile(path.join(ASSETS, f), path.join(OUT, 'assets', f));

const report = [];
for (const page of PAGES) {
  const html = render(page);
  await writeFile(path.join(OUT, page.file), html);
  report.push({ page: page.file, articles: page.articles.length, kb: Math.round(html.length / 1024) });
}

await rm(tmp, { recursive: true, force: true });

// ─── Verify by existence, not by absence of error ────────────────────

const problems = [];
if (unresolved.length) problems.push(`Onward links to unknown articles: ${[...new Set(unresolved)].join(', ')}`);

const covered = PAGES.reduce((n, p) => n + p.articles.length, 0);
if (covered !== ARTICLES.length) problems.push(`Rendered ${covered} of ${ARTICLES.length} articles`);

// Every image referenced must have been copied, and every copy referenced.
const referenced = new Set();
for (const a of ARTICLES) for (const b of a.body) {
  if (b.kind === 'image') referenced.add(b.shot.src);
  if (b.kind === 'steps') for (const s of b.items) if (s.image) referenced.add(s.image.src);
}
for (const r of referenced) if (!pngs.includes(r)) problems.push(`Referenced image not in assets: ${r}`);
for (const f of pngs) if (!referenced.has(f)) problems.push(`Copied an image nothing references: ${f}`);

const slots = ARTICLES.flatMap((a) => a.body).filter((b) => b.kind === 'slot').length;

console.log(`articles   ${ARTICLES.length} (${report.map((r) => `${r.page} ${r.articles}`).join(', ')})`);
console.log(`images     ${pngs.length} copied, ${referenced.size} referenced`);
console.log(`unfilled   ${slots} slot${slots === 1 ? '' : 's'}`);
console.log(`size       ${report.map((r) => `${r.page} ${r.kb}KB`).join(', ')}`);

if (problems.length) {
  console.error('\nPROBLEMS:');
  for (const p of problems) console.error('  ' + p);
  process.exit(1);
}
console.log('\nok');
