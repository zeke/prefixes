import PREFIXES from "./prefixes.json";

const OCTOCAT = `<a href="https://github.com/zeke/prefixes" class="octocat" aria-label="GitHub">
    <svg width="24" height="24" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="currentColor"/></svg>
  </a>`;

const OCTOCAT_CSS = `
    .octocat {
      padding-bottom: 1.5rem;
      opacity: 0.18;
      display: flex;
      justify-content: center;
      color: inherit;
    }
    .octocat:hover { opacity: 0.45; }
`;

const SHARED_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #fafaf8;
    --card-bg: #f0ede8;
    --text: #1a1a1a;
    --muted: #999;
    --border: #e0e0e0;
    --row-alt: #f4f4f1;
    --row-hover: #eceae6;
    --size: 17px;
  }

  html, body { height: 100%; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Libre Baskerville', Georgia, serif;
    font-size: var(--size);
    line-height: 1.6;
    min-height: 100vh;
  }

  a { color: inherit; }
`;

function flashcardsHtml(data: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prefixes</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    ${SHARED_CSS}

    body {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
    }

    header {
      width: 100%;
      padding: 1.75rem 2rem 0;
      display: flex;
      justify-content: center;
    }

    h1 a {
      font-size: 1.6rem;
      font-weight: normal;
      letter-spacing: 0.01em;
      text-decoration: none;
      color: inherit;
    }

    h1 a:hover { opacity: 0.6; }

    ${OCTOCAT_CSS}

    /* Centered stage */
    .stage {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 2rem;
      gap: 1.5rem;
    }

    /* Card row: arrows flank the card */
    .card-row {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 1.25rem;
    }

    .arrow-btn {
      flex-shrink: 0;
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 50%;
      border: 1px solid var(--border);
      background: transparent;
      color: var(--text);
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.15s, background 0.1s;
      font-family: inherit;
    }

    .arrow-btn:hover { background: var(--row-hover); }
    .arrow-btn:active { background: var(--row-alt); }
    .arrow-btn:disabled { opacity: 0; pointer-events: none; }

    /* Card */
    .scene {
      flex: 1;
      max-width: 680px;
      width: 100%;
      height: min(50vh, 420px);
      position: relative;
      overflow: hidden;
      border-radius: 12px;
      cursor: pointer;
      perspective: 1200px;
    }

    @media (max-width: 480px) {
      .scene { height: min(46vh, 320px); }
      .stage { padding: 1.25rem; }
    }

    /* .card-wrap: slides only */
    .card-wrap {
      position: absolute;
      inset: 0;
    }

    /* Slide animations on the wrap */
    @keyframes slide-in-right {
      from { transform: translateX(105%); }
      to   { transform: translateX(0); }
    }
    @keyframes slide-in-left {
      from { transform: translateX(-105%); }
      to   { transform: translateX(0); }
    }
    @keyframes slide-out-left {
      from { transform: translateX(0); }
      to   { transform: translateX(-105%); }
    }
    @keyframes slide-out-right {
      from { transform: translateX(0); }
      to   { transform: translateX(105%); }
    }

    .card-wrap.enter-next  { animation: slide-in-right  0.32s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
    .card-wrap.enter-prev  { animation: slide-in-left   0.32s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
    .card-wrap.leave-next  { animation: slide-out-left  0.32s cubic-bezier(0.4, 0, 0.2, 1) forwards; pointer-events: none; }
    .card-wrap.leave-prev  { animation: slide-out-right 0.32s cubic-bezier(0.4, 0, 0.2, 1) forwards; pointer-events: none; }

    @keyframes flip-to-back {
      0%   { transform: rotateY(0deg)   scale(1); }
      45%  { transform: rotateY(90deg)  scale(0.96); }
      55%  { transform: rotateY(90deg)  scale(0.96); }
      100% { transform: rotateY(180deg) scale(1); }
    }
    @keyframes flip-to-front {
      0%   { transform: rotateY(180deg) scale(1); }
      45%  { transform: rotateY(90deg)  scale(0.96); }
      55%  { transform: rotateY(90deg)  scale(0.96); }
      100% { transform: rotateY(0deg)   scale(1); }
    }

    /* .card: 3D flip container inside the wrap */
    .card {
      position: absolute;
      inset: 0;
      transform-style: preserve-3d;
    }

    .card.flip-back  { animation: flip-to-back  0.42s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
    .card.flip-front { animation: flip-to-front 0.42s cubic-bezier(0.4, 0, 0.2, 1) forwards; }

    .face {
      position: absolute;
      inset: 0;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2.5rem;
      gap: 1rem;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
    }

    .face.back {
      transform: rotateY(180deg);
    }

    .card.flip-back  .face.front { pointer-events: none; }
    .card.flip-front .face.back  { pointer-events: none; }
    .card[data-flipped="1"]:not(.flip-front) .face.front { pointer-events: none; }
    .card[data-flipped="0"]:not(.flip-back)  .face.back  { pointer-events: none; }

    .face-prefix {
      font-size: clamp(3.5rem, 10vw, 5rem);
      font-weight: bold;
      letter-spacing: 0.01em;
      line-height: 1;
    }

    .face-origin {
      font-size: 0.85rem;
      color: var(--muted);
      letter-spacing: 0.04em;
    }

    .face-meaning {
      font-size: clamp(3.5rem, 10vw, 5rem);
      text-align: center;
      line-height: 1.1;
    }

    .face-examples {
      font-size: 0.9rem;
      color: var(--muted);
      font-style: italic;
      text-align: center;
    }

    .progress {
      font-size: 0.78rem;
      color: var(--muted);
      letter-spacing: 0.03em;
      text-align: center;
    }
  </style>
</head>
<body>
  <header>
    <h1><a href="/cheatsheet">Prefixes</a></h1>
  </header>

  <div class="stage">
    <div class="card-row">
      <button class="arrow-btn" id="btn-prev" aria-label="Previous">←</button>
      <div class="scene" id="scene" role="button" aria-label="Flip card" tabindex="0"></div>
      <button class="arrow-btn" id="btn-next" aria-label="Next">→</button>
    </div>
    <div class="progress" id="progress"></div>
  </div>

  ${OCTOCAT}

  <script>
    const PREFIXES = ${data};

    const PROGRESS_KEY = "prefixes-progress-v1";

    // Restore or create a fresh shuffle
    let deck, idx, hasFlipped = false, animating = false;

    (() => {
      try {
        const saved = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "null");
        if (saved && Array.isArray(saved.order) && saved.order.length === PREFIXES.length) {
          // Reconstruct deck from saved order
          const byPrefix = Object.fromEntries(PREFIXES.map(p => [p.prefix, p]));
          const restored = saved.order.map(k => byPrefix[k]).filter(Boolean);
          if (restored.length === PREFIXES.length) {
            deck = restored;
            idx  = Math.min(Math.max(0, saved.idx || 0), deck.length - 1);
            hasFlipped = idx > 0;
            return;
          }
        }
      } catch {}
      deck = [...PREFIXES].sort(() => Math.random() - 0.5);
      idx  = 0;
    })();

    function saveProgress() {
      try {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify({
          order: deck.map(p => p.prefix),
          idx,
        }));
      } catch {}
      const prefix = deck[idx].prefix.replace(/-$/, "");
      history.replaceState(null, "", "?p=" + encodeURIComponent(prefix));
    }

    const scene    = document.getElementById("scene");
    const progress = document.getElementById("progress");
    const btnPrev  = document.getElementById("btn-prev");
    const btnNext  = document.getElementById("btn-next");

    function makeWrap(p) {
      const wrap = document.createElement("div");
      wrap.className = "card-wrap";
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML =
        \`<div class="face front">
          <div class="face-prefix">\${p.prefix}</div>
          <div class="face-origin">\${p.origin}</div>
        </div>
        <div class="face back">
          <div class="face-meaning">\${p.meaning}</div>
          <div class="face-examples">\${p.examples.join(", ")}</div>
        </div>\`;
      wrap.appendChild(card);
      return wrap;
    }

    function updateButtons() {
      btnPrev.disabled = !(hasFlipped && idx > 0);
      btnNext.disabled = !hasFlipped;
    }

    function currentWrap() {
      return scene.querySelector(".card-wrap:not(.leave-next):not(.leave-prev)");
    }

    function flip() {
      const wrap = currentWrap();
      if (!wrap || animating) return;
      const card = wrap.querySelector(".card");
      const isFlipped = card.dataset.flipped === "1";
      card.classList.remove("flip-back", "flip-front");
      // force reflow so animation restarts cleanly
      void card.offsetWidth;
      if (!isFlipped) {
        card.classList.add("flip-back");
        card.dataset.flipped = "1";
        hasFlipped = true;
        updateButtons();
      } else {
        card.classList.add("flip-front");
        card.dataset.flipped = "0";
      }
    }

    function go(delta) {
      if (animating) return;
      animating = true;

      const outWrap = currentWrap();
      idx = (idx + delta + deck.length) % deck.length;
      const inWrap = makeWrap(deck[idx]);

      const outClass = delta > 0 ? "leave-next" : "leave-prev";
      const inClass  = delta > 0 ? "enter-next"  : "enter-prev";

      if (outWrap) outWrap.classList.add(outClass);
      inWrap.classList.add(inClass);
      scene.appendChild(inWrap);

      progress.textContent = (idx + 1) + " / " + deck.length;
      saveProgress();
      updateButtons();

      inWrap.addEventListener("animationend", () => {
        inWrap.classList.remove(inClass);
        if (outWrap) outWrap.remove();
        animating = false;
      }, { once: true });
    }

    // If a ?p= param is present, jump to that card (overrides saved position)
    const qp = new URLSearchParams(location.search).get("p");
    if (qp) {
      const target = qp.toLowerCase().replace(/-$/, "");
      const found = deck.findIndex(p => p.prefix.replace(/-$/, "").toLowerCase() === target);
      if (found !== -1) {
        idx = found;
        hasFlipped = idx > 0;
      }
    }

    // Initial card (restored position or fresh start), no animation
    const first = makeWrap(deck[idx]);
    scene.appendChild(first);
    progress.textContent = (idx + 1) + " / " + deck.length;
    saveProgress();
    updateButtons();

    btnPrev.addEventListener("click", () => go(-1));
    btnNext.addEventListener("click", () => go(1));

    scene.addEventListener("click", e => { if (!animating) flip(); });
    scene.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); }
    });

    document.addEventListener("keydown", e => {
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") go(1);
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   go(-1);
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); }
    });
  </script>
</body>
</html>`;
}

function cheatsheetHtml(data: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cheatsheet — Prefixes</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    ${SHARED_CSS}

    body {
      display: flex;
      flex-direction: column;
    }

    header {
      padding: 2rem 3rem 1.5rem;
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 1.5rem;
      flex-wrap: wrap;
      border-bottom: 1px solid var(--border);
    }

    h1 {
      font-size: 1.6rem;
      font-weight: normal;
      letter-spacing: 0.01em;
      flex-shrink: 0;
    }

    .header-right {
      display: flex;
      align-items: baseline;
      gap: 2rem;
    }

    #filter {
      font-family: Georgia, serif;
      font-size: var(--size);
      background: transparent;
      border: none;
      border-bottom: 1px solid var(--border);
      color: var(--text);
      padding: 0.1rem 0;
      width: 14rem;
      outline: none;
    }

    #filter::placeholder { color: var(--muted); }
    #filter:focus { border-bottom-color: var(--text); }

    .back-link {
      font-size: 0.85rem;
      color: var(--muted);
      text-decoration: none;
      white-space: nowrap;
    }

    .back-link:hover { color: var(--text); }

    .table-wrap {
      flex: 1;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      padding: 0 3rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    thead {
      position: sticky;
      top: 0;
      background: var(--bg);
      z-index: 1;
    }

    thead th {
      text-align: left;
      font-family: Georgia, serif;
      font-weight: normal;
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--muted);
      padding: 0.8rem 0.75rem 0.6rem;
      border-bottom: 1px solid var(--border);
      white-space: nowrap;
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
    }

    thead th:hover { color: var(--text); }

    thead th .si {
      display: inline-block;
      margin-left: 0.3em;
      opacity: 0.25;
    }

    thead th.sorted { color: var(--text); }
    thead th.sorted .si { opacity: 1; }

    tbody tr:nth-child(even) { background: var(--row-alt); }
    tbody tr:hover { background: var(--row-hover); }

    td {
      padding: 0.55rem 0.75rem;
      vertical-align: top;
      border-bottom: 1px solid #e8e8e5;
      font-size: var(--size);
    }

    .col-prefix   { font-weight: bold; white-space: nowrap; }
    .col-examples { color: var(--muted); font-style: italic; }
    .col-origin   { white-space: nowrap; color: var(--muted); }
    .col-script   { font-style: italic; color: var(--muted); white-space: nowrap; }

    #empty {
      display: none;
      padding: 2rem 0.75rem;
      color: var(--muted);
    }

    @media (max-width: 600px) {
      header { padding: 1.25rem 1.25rem 1rem; }
      .table-wrap { padding: 0 1.25rem; }
      #filter { width: 9rem; }
      .col-script, .th-script,
      .col-origin, .th-origin { display: none; }
    }

    ${OCTOCAT_CSS}
  </style>
</head>
<body>
  <header>
    <h1>Cheatsheet</h1>
    <div class="header-right">
      <input id="filter" type="search" placeholder="Filter…" autocomplete="off" spellcheck="false">
      <a href="/" class="back-link">← Flashcards</a>
    </div>
  </header>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th data-col="prefix"   tabindex="0">Prefix <span class="si">↕</span></th>
          <th data-col="meaning"  tabindex="0">Meaning <span class="si">↕</span></th>
          <th data-col="examples" tabindex="0">Examples <span class="si">↕</span></th>
          <th data-col="origin"   tabindex="0" class="th-origin">Origin <span class="si">↕</span></th>
          <th data-col="script"   tabindex="0" class="th-script">Script <span class="si">↕</span></th>
        </tr>
      </thead>
      <tbody id="tbody"></tbody>
    </table>
    <p id="empty">No matches.</p>
  </div>

  <script>
    const PREFIXES = ${data};
    const STORAGE_KEY = "prefixes-sort-v3";

    let state = (() => {
      try {
        const s = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
        if (s && s.col && (s.dir === "asc" || s.dir === "desc")) return s;
      } catch {}
      return { col: "prefix", dir: "asc" };
    })();

    let filter = "";

    const tbody = document.getElementById("tbody");
    const empty = document.getElementById("empty");
    const ths   = document.querySelectorAll("thead th[data-col]");

    function render() {
      const q = filter.trim().toLowerCase();

      let rows = q
        ? PREFIXES.filter(p =>
            p.prefix.toLowerCase().includes(q) ||
            p.meaning.toLowerCase().includes(q) ||
            p.origin.toLowerCase().includes(q) ||
            p.script.toLowerCase().includes(q) ||
            p.examples.join(" ").toLowerCase().includes(q)
          )
        : [...PREFIXES];

      rows.sort((a, b) => {
        const col = state.col;
        const av = col === "examples" ? a.examples.join(", ").toLowerCase() : String(a[col]).toLowerCase();
        const bv = col === "examples" ? b.examples.join(", ").toLowerCase() : String(b[col]).toLowerCase();
        const cmp = av < bv ? -1 : av > bv ? 1 : 0;
        return state.dir === "asc" ? cmp : -cmp;
      });

      empty.style.display = rows.length === 0 ? "block" : "none";

      tbody.innerHTML = rows.map(p =>
        \`<tr>
          <td class="col-prefix">\${p.prefix}</td>
          <td class="col-meaning">\${p.meaning}</td>
          <td class="col-examples">\${p.examples.join(", ")}</td>
          <td class="col-origin">\${p.origin}</td>
          <td class="col-script">\${p.script}</td>
        </tr>\`
      ).join("");

      ths.forEach(th => {
        const col = th.dataset.col;
        const si  = th.querySelector(".si");
        if (col === state.col) {
          th.classList.add("sorted");
          si.textContent = state.dir === "asc" ? "↑" : "↓";
        } else {
          th.classList.remove("sorted");
          si.textContent = "↕";
        }
      });
    }

    function setSort(col) {
      if (state.col === col) {
        state.dir = state.dir === "asc" ? "desc" : "asc";
      } else {
        state.col = col;
        state.dir = "asc";
      }
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
      render();
    }

    ths.forEach(th => {
      th.addEventListener("click", () => setSort(th.dataset.col));
      th.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSort(th.dataset.col); }
      });
    });

    document.getElementById("filter").addEventListener("input", e => {
      filter = e.target.value;
      render();
    });

    render();
  </script>
  ${OCTOCAT}
</body>
</html>`;
}

export default {
  fetch(req: Request): Response {
    const url = new URL(req.url);
    const data = JSON.stringify(PREFIXES);

    if (url.pathname === "/cheatsheet") {
      return new Response(cheatsheetHtml(data), {
        headers: { "content-type": "text/html;charset=UTF-8" },
      });
    }

    return new Response(flashcardsHtml(data), {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  },
} satisfies ExportedHandler;
