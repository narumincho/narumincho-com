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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "ナルミンチョ",
    alternateName: "narumincho",
    url: siteData.url,
    image: `${siteData.url}/icon.png`,
    sameAs: siteData.accounts.map((a) => a.url),
    jobTitle: "Creator / Software Engineer",
    description: siteData.description,
  };

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

  const projectsHtml = siteData.projects
    .map((p) => {
      const isWide = p.category === "featured" ||
        p.category === "peticom_archive";
      let badgeClass = "badge-tool";
      let badgeLabel = "ツール・ライブラリ";

      if (p.category === "featured") {
        badgeClass = "badge-featured";
        badgeLabel = "注目プロジェクト";
      } else if (p.category === "peticom_archive") {
        badgeClass = "badge-peticom";
        badgeLabel = "プチコン3号・アーカイブ";
      } else if (p.category === "experimental") {
        badgeClass = "badge-experimental";
        badgeLabel = "実験的プロジェクト";
      }

      const highlightsHtml = p.highlights && p.highlights.length > 0
        ? `<ul class="card-highlights">
            ${p.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}
          </ul>`
        : "";

      const publicKeyHtml = p.publicKey
        ? `<div class="public-key-box">
            <span class="public-key-label">N プチコン漢字入力 公開キー</span>
            <div class="public-key-val-wrap">
              <code class="public-key-val" id="key-${p.id}">${
          escapeHtml(p.publicKey)
        }</code>
              <button class="copy-btn" onclick="copyText('${
          escapeHtml(p.publicKey)
        }', this)" title="公開キーをコピー">コピー</button>
            </div>
          </div>`
        : "";

      const articlesHtml = p.articles && p.articles.length > 0
        ? `<div class="archive-articles">
            <div class="archive-articles-title">当時の技術解説記事</div>
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

      const tagsHtml = p.tags
        .map((tag) => `<span class="card-tag">#${escapeHtml(tag)}</span>`)
        .join("");

      const linksHtml = p.links
        .map((link) => {
          const btnClass = link.primary
            ? "btn btn-primary"
            : "btn btn-secondary";
          return `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="${btnClass}">
            ${escapeHtml(link.label)}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V8H8"/></svg>
          </a>`;
        })
        .join("");

      return `
      <article class="card ${p.category === "featured" ? "featured" : ""} ${
        isWide ? "wide" : ""
      }" data-category="${p.category}">
        <div class="card-header">
          <div class="card-title-group">
            ${
        p.period
          ? `<span class="card-period">${escapeHtml(p.period)}</span>`
          : ""
      }
            <h3 class="card-title">${escapeHtml(p.title)}</h3>
          </div>
          <span class="card-category-badge ${badgeClass}">${badgeLabel}</span>
        </div>
        <p class="card-desc">${escapeHtml(p.description)}</p>
        ${highlightsHtml}
        ${publicKeyHtml}
        ${articlesHtml}
        <div class="card-tags">${tagsHtml}</div>
        <div class="card-links">${linksHtml}</div>
      </article>`;
    })
    .join("");

  const writingHtml = siteData.articles
    .map((item) => {
      return `
      <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="writing-card">
        <div class="writing-platform">${escapeHtml(item.platform)}</div>
        <div class="writing-topic">${escapeHtml(item.topic)}</div>
        <div class="btn btn-secondary" style="margin-top:auto; font-size: 0.85rem; padding: 6px 12px;">
          記事一覧を見る
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V8H8"/></svg>
        </div>
      </a>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(siteData.title)}</title>
  <meta name="description" content="${escapeHtml(siteData.description)}">
  <meta name="author" content="${escapeHtml(siteData.author)}">
  <link rel="icon" type="image/png" href="/icon.png">
  <link rel="apple-touch-icon" href="/icon.png">

  <!-- Open Graph / Social Meta -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${siteData.url}/">
  <meta property="og:title" content="${escapeHtml(siteData.title)}">
  <meta property="og:description" content="${escapeHtml(siteData.description)}">
  <meta property="og:image" content="${siteData.url}/icon.png">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="@naru_mincho">
  <meta name="twitter:creator" content="@naru_mincho">

  <link rel="stylesheet" href="/style.css">
  <script type="application/ld+json">
    ${JSON.stringify(jsonLd)}
  </script>
</head>
<body>
  <header class="hero">
    <div class="container">
      <div class="hero-avatar-wrapper">
        <img src="/icon.png" alt="ナルミンチョのアイコン" class="hero-avatar" width="108" height="108">
      </div>
      <div class="hero-badge">narumincho.com • Instant Static</div>
      <h1 class="hero-title">${escapeHtml(siteData.title)}</h1>
      <div class="hero-author">${escapeHtml(siteData.author)}</div>
      <div class="hero-bio">
        ${siteData.bio.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}
      </div>
      <div class="accounts-grid" aria-label="ソーシャル・関連リンク">
        ${accountChipsHtml}
      </div>
    </div>
  </header>

  <main class="container">
    <!-- Projects Section -->
    <section class="section" id="creations">
      <div class="section-header">
        <div class="section-title-wrap">
          <div class="section-icon">✦</div>
          <h2 class="section-title">創作物・プロジェクト</h2>
        </div>
        <p class="section-desc">Webブラウザ上で動作するプログラミング言語から、3DS プチコン3号でのRPG制作、各種ツール・ライブラリまで。</p>
      </div>

      <!-- Filter Tabs -->
      <div class="filter-tabs" role="tablist">
        <button class="filter-btn active" onclick="filterCategory('all', this)" role="tab" aria-selected="true">すべて</button>
        <button class="filter-btn" onclick="filterCategory('featured', this)" role="tab" aria-selected="false">代表作 (Definy等)</button>
        <button class="filter-btn" onclick="filterCategory('peticom_archive', this)" role="tab" aria-selected="false">プチコン3号・過去作</button>
        <button class="filter-btn" onclick="filterCategory('tool', this)" role="tab" aria-selected="false">ツール・ライブラリ</button>
      </div>

      <!-- Cards Grid -->
      <div class="cards-grid" id="projects-grid">
        ${projectsHtml}
      </div>
    </section>

    <!-- 2018 Archive History Banner -->
    <div class="history-banner">
      <div class="history-banner-text">
        <h3>2018年 当時サイトのアーカイブ</h3>
        <p>プチコン3号 RPG「DESIRED Route」のウィンドウ挙動や漢字フォント解説、NPIME、Gladsheim の開発記録は、当時のまま保存・閲覧可能です。</p>
      </div>
      <a href="https://pub-1463f3b1a6d64d348162c5230dfdd105.r2.dev/HomePage/index.html" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
        当時のサイトを開く
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
      </a>
    </div>

    <!-- Writing & Tech Articles Section -->
    <section class="section" id="articles">
      <div class="section-header">
        <div class="section-title-wrap">
          <div class="section-icon">✎</div>
          <h2 class="section-title">記事・執筆活動</h2>
        </div>
        <p class="section-desc">技術的知見や設計思想、言語処理系の自作プロセスなどを定期的に発信しています。</p>
      </div>
      <div class="writing-grid">
        ${writingHtml}
      </div>
    </section>
  </main>

  <footer>
    <div class="container">
      <div class="footer-links">
        <a href="https://github.com/narumincho" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://x.com/naru_mincho" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
        <a href="https://narumincho.notion.site/22961d0ee2924074a22ce37f405b941a" target="_blank" rel="noopener noreferrer">Notion (アーカイブ)</a>
      </div>
      <p>&copy; ${
    new Date().getFullYear()
  } narumincho (鳴海 敏史). All rights reserved.</p>
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

    function filterCategory(cat, btn) {
      var buttons = document.querySelectorAll('.filter-btn');
      buttons.forEach(function(b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      var cards = document.querySelectorAll('#projects-grid .card');
      cards.forEach(function(card) {
        var cardCat = card.getAttribute('data-category');
        if (cat === 'all' || cardCat === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
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
