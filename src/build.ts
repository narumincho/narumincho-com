import { siteData } from "./data/siteData.ts";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderHtml(): string {
  const accountChipsHtml = siteData.accounts
    .map((account) => {
      const isNotion = account.id === "notion";
      return `
      <a href="${account.url}" target="_blank" rel="noopener noreferrer" class="account-chip ${
        isNotion ? "chip-notion" : ""
      }" aria-label="${escapeHtml(account.name)}">
        ${account.iconSvg}
        <span>${escapeHtml(account.name)}</span>
      </a>`;
    })
    .join("");

  // ✨ ナルミンチョが作った Webアプリなど
  const webAppsHtml = siteData.webApps
    .map((app) => {
      const descHtml = app.description
        ? `<p class="card-desc">${escapeHtml(app.description)}</p>`
        : "";
      const notionLink = app.notionPageId
        ? `<a href="https://narumincho.notion.site/${app.notionPageId}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
            Notion ページ
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
          </a>`
        : "";

      return `
      <article class="card">
        <div class="card-header">
          <h3 class="card-title">${escapeHtml(app.title)}</h3>
        </div>
        ${descHtml}
        <div class="card-links">
          <a href="${app.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            アプリを開く
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V8H8"/></svg>
          </a>
          ${notionLink}
        </div>
      </article>`;
    })
    .join("");

  // 2018年サイトの創作記録 (DESIRED Route, NPIME, Gladsheim)
  const peticomProjectsHtml = siteData.peticomProjects
    .map((p) => {
      const publicKeyHtml = p.publicKey
        ? `<div class="public-key-box">
            <span class="public-key-label">N プチコン漢字入力 Beta の公開キー</span>
            <div class="public-key-val-wrap">
              <code class="public-key-val">${escapeHtml(p.publicKey)}</code>
              <button class="copy-btn" onclick="copyText('${
          escapeHtml(p.publicKey)
        }', this)" title="公開キーをコピー">コピー</button>
            </div>
          </div>`
        : "";

      const articlesHtml = p.articles && p.articles.length > 0
        ? `<div class="archive-articles">
            <div class="archive-articles-title">当時の紹介・技術記事</div>
            <div class="archive-article-tags">
              ${
          p.articles.map((art) =>
            `<a href="${art.url}" target="_blank" rel="noopener noreferrer" class="archive-article-link">${
              escapeHtml(art.title)
            }</a>`
          ).join("")
        }
            </div>
          </div>`
        : "";

      return `
      <article class="card wide">
        <div class="card-header">
          <h3 class="card-title">${escapeHtml(p.title)}</h3>
          <span class="card-category-badge badge-peticom">プチコン3号・2018記録</span>
        </div>
        <p class="card-desc">${escapeHtml(p.description)}</p>
        ${publicKeyHtml}
        ${articlesHtml}
      </article>`;
    })
    .join("");

  // 📝 ナルミンチョが書いた 記事 (Notion)
  const notionArticlesHtml = siteData.notionArticles
    .map((art) => {
      const tagHtml = art.tag
        ? `<span class="article-tag">${escapeHtml(art.tag)}</span>`
        : "";
      const dateHtml = art.date
        ? `<span class="article-date">${escapeHtml(art.date)}</span>`
        : "";

      return `
      <li class="notion-article-item">
        <div class="notion-article-main">
          <span class="notion-article-title">${escapeHtml(art.title)}</span>
          <div class="notion-article-meta">
            ${tagHtml}
            ${dateHtml}
          </div>
        </div>
      </li>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(siteData.title)}</title>
  <meta name="description" content="${escapeHtml(siteData.description)}">
  <link rel="icon" type="image/png" href="/icon.png">
  <link rel="apple-touch-icon" href="/icon.png">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${siteData.url}/">
  <meta property="og:title" content="${escapeHtml(siteData.title)}">
  <meta property="og:description" content="${escapeHtml(siteData.description)}">
  <meta property="og:image" content="${siteData.url}/icon.png">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="@naru_mincho">

  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <header class="hero">
    <div class="container">
      <div class="hero-avatar-wrapper">
        <img src="/icon.png" alt="ナルミンチョのアイコン" class="hero-avatar" width="108" height="108">
      </div>
      <h1 class="hero-title">${escapeHtml(siteData.title)}</h1>
      <div class="hero-author">${escapeHtml(siteData.author)}</div>
      <div class="hero-bio">
        ${siteData.bio.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}
      </div>
      <div class="accounts-grid" aria-label="アカウント・リンク">
        ${accountChipsHtml}
      </div>
    </div>
  </header>

  <main class="container">
    <!-- ✨ ナルミンチョが作った Webアプリなど -->
    <section class="section" id="web-apps">
      <div class="section-header">
        <div class="section-title-wrap">
          <div class="section-icon">✨</div>
          <h2 class="section-title">ナルミンチョが作った Webアプリなど</h2>
        </div>
        <p class="section-desc">Notion ページに掲載されている Web アプリケーション一覧です。</p>
      </div>
      <div class="cards-grid">
        ${webAppsHtml}
      </div>
    </section>

    <!-- 2018年 創作記録 -->
    <section class="section" id="archive-2018">
      <div class="section-header">
        <div class="section-title-wrap">
          <div class="section-icon">🎮</div>
          <h2 class="section-title">プチコン3号 RPG「DESIRED Route」・NPIME・Gladsheim</h2>
        </div>
        <p class="section-desc">2018年のホームページで公開されていた創作物・技術解説記録です。</p>
      </div>
      <div class="cards-grid">
        ${peticomProjectsHtml}
      </div>
      <!-- 2018 Archive History Banner -->
      <div class="history-banner">
        <div class="history-banner-text">
          <h3>2018年 当時サイトのアーカイブ</h3>
          <p>プチコン3号 RPG「DESIRED Route」のウィンドウ挙動や漢字フォント解説、NPIME、Gladsheim の当時のページはこちらから閲覧できます。</p>
        </div>
        <a href="https://pub-1463f3b1a6d64d348162c5230dfdd105.r2.dev/HomePage/index.html" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
          当時のサイトを開く
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
        </a>
      </div>
    </section>

    <!-- 📝 ナルミンチョが書いた 記事 -->
    <section class="section" id="notion-articles">
      <div class="section-header">
        <div class="section-title-wrap">
          <div class="section-icon">📝</div>
          <h2 class="section-title">ナルミンチョが書いた 記事</h2>
        </div>
        <p class="section-desc">Notion ページに記録されている記事（全 33 件）の一覧です。</p>
      </div>
      <div class="notion-articles-card">
        <ul class="notion-articles-list">
          ${notionArticlesHtml}
        </ul>
        <div style="margin-top: 20px; text-align: center;">
          <a href="https://narumincho.notion.site/22961d0ee2924074a22ce37f405b941a" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
            Notion で記事を読む
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
          </a>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="container">
      <div class="footer-links">
        <a href="https://twitter.com/naru_mincho" target="_blank" rel="noopener noreferrer">Twitter (@naru_mincho)</a>
        <a href="https://github.com/narumincho" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://zenn.dev/narumincho" target="_blank" rel="noopener noreferrer">Zenn</a>
        <a href="https://www.youtube.com/channel/UCDGsMJptdPNN_dbPkTl9qjA" target="_blank" rel="noopener noreferrer">YouTube</a>
        <a href="https://narumincho.notion.site/22961d0ee2924074a22ce37f405b941a" target="_blank" rel="noopener noreferrer">Notion</a>
      </div>
      <p>&copy; ナルミンチョ. All rights reserved.</p>
    </div>
  </footer>

  <div class="toast" id="toast"></div>

  <script>
    function copyText(text, btn) {
      navigator.clipboard.writeText(text).then(function() {
        showToast('公開キー「' + text + '」をコピーしました！');
        var original = btn.textContent;
        btn.textContent = '済!';
        setTimeout(function() { btn.textContent = original; }, 2000);
      }).catch(function(err) {
        showToast('コピーに失敗しました');
      });
    }

    function showToast(msg) {
      var toast = document.getElementById('toast');
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(function() { toast.classList.remove('show'); }, 2500);
    }
  </script>
</body>
</html>`;
}

async function build() {
  console.log("🚀 Building narumincho.com static site...");
  const distDir = "./dist";
  await Deno.mkdir(distDir, { recursive: true });

  // Generate HTML
  const html = renderHtml();
  await Deno.writeTextFile(`${distDir}/index.html`, html);
  console.log("✅ Generated dist/index.html");

  // Copy CSS
  const css = await Deno.readTextFile("./src/style.css");
  await Deno.writeTextFile(`${distDir}/style.css`, css);
  console.log("✅ Copied dist/style.css");

  // Copy icon
  try {
    const iconData = await Deno.readFile("./public/icon.png");
    await Deno.writeFile(`${distDir}/icon.png`, iconData);
    console.log("✅ Copied dist/icon.png");
  } catch (err) {
    console.warn("⚠️ Could not copy icon.png:", err);
  }

  console.log("🎉 Build complete!");
}

if (import.meta.main) {
  await build();
}
