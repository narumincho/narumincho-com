import { useState } from "preact/hooks";
import { siteData } from "./data/siteData.ts";

export function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedKey(true);
        showToast(`公開キー「${text}」をコピーしました！`);
        setTimeout(() => setCopiedKey(false), 2000);
      },
      () => {
        showToast("コピーに失敗しました");
      },
    );
  };

  return (
    <>
      <header className="hero">
        <div className="container">
          <div className="hero-avatar-wrapper">
            <img
              src="/icon.png"
              alt="ナルミンチョのアイコン"
              className="hero-avatar"
              width={108}
              height={108}
            />
          </div>
          <h1 className="hero-title">{siteData.title}</h1>
          <div className="hero-author">{siteData.author}</div>
          <div className="hero-bio">
            {siteData.bio.map((line) => <p key={line}>{line}</p>)}
          </div>
          <div className="accounts-grid" aria-label="アカウント・リンク">
            {siteData.accounts.map((account) => {
              const isNotion = account.id === "notion";
              return (
                <a
                  key={account.id}
                  href={account.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`account-chip ${isNotion ? "chip-notion" : ""}`}
                  aria-label={account.name}
                  dangerouslySetInnerHTML={{
                    __html: `${account.iconSvg}<span>${account.name}</span>`,
                  }}
                />
              );
            })}
          </div>
        </div>
      </header>

      <main className="container">
        {/* ✨ ナルミンチョが作った Webアプリなど */}
        <section className="section" id="web-apps">
          <div className="section-header">
            <div className="section-title-wrap">
              <div className="section-icon">✨</div>
              <h2 className="section-title">
                ナルミンチョが作った Webアプリなど
              </h2>
            </div>
            <p className="section-desc">
              Notion ページに掲載されている Web アプリケーション一覧です。
            </p>
          </div>
          <div className="cards-grid">
            {siteData.webApps.map((app) => (
              <article key={app.id} className="card">
                <div className="card-header">
                  <h3 className="card-title">{app.title}</h3>
                </div>
                {app.description && (
                  <p className="card-desc">{app.description}</p>
                )}
                <div className="card-links">
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    アプリを開く
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17l9.2-9.2M17 17V8H8" />
                    </svg>
                  </a>
                  {app.notionPageId && (
                    <a
                      href={`https://narumincho.notion.site/${app.notionPageId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      Notion ページ
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* プチコン3号 創作記録 */}
        <section className="section" id="archive-2018">
          <div className="section-header">
            <div className="section-title-wrap">
              <div className="section-icon">🎮</div>
              <h2 className="section-title">
                プチコン3号 RPG「DESIRED Route」・NPIME・Gladsheim
              </h2>
            </div>
            <p className="section-desc">
              2018年のホームページで公開されていた創作物・技術解説記録です。
            </p>
          </div>
          <div className="cards-grid">
            {siteData.peticomProjects.map((p) => (
              <article key={p.id} className="card wide">
                <div className="card-header">
                  <h3 className="card-title">{p.title}</h3>
                  <span className="card-category-badge badge-peticom">
                    プチコン3号・2018記録
                  </span>
                </div>
                <p className="card-desc">{p.description}</p>
                {p.publicKey && (
                  <div className="public-key-box">
                    <span className="public-key-label">
                      N プチコン漢字入力 Beta の公開キー
                    </span>
                    <div className="public-key-val-wrap">
                      <code className="public-key-val">{p.publicKey}</code>
                      <button
                        type="button"
                        className="copy-btn"
                        onClick={() => handleCopy(p.publicKey!)}
                        title="公開キーをコピー"
                      >
                        {copiedKey ? "済!" : "コピー"}
                      </button>
                    </div>
                  </div>
                )}
                {p.articles.length > 0 && (
                  <div className="archive-articles">
                    <div className="archive-articles-title">
                      当時の紹介・技術記事
                    </div>
                    <div className="archive-article-tags">
                      {p.articles.map((art) => (
                        <a
                          key={art.url}
                          href={art.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="archive-article-link"
                        >
                          {art.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
          {/* 2018 Archive History Banner */}
          <div className="history-banner">
            <div className="history-banner-text">
              <h3>2018年 当時サイトのアーカイブ</h3>
              <p>
                プチコン3号 RPG「DESIRED
                Route」のウィンドウ挙動や漢字フォント解説、NPIME、Gladsheim
                の当時のページはこちらから閲覧できます。
              </p>
            </div>
            <a
              href="https://pub-1463f3b1a6d64d348162c5230dfdd105.r2.dev/HomePage/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              当時のサイトを開く
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          </div>
        </section>

        {/* 📝 ナルミンチョが書いた 記事 */}
        <section className="section" id="notion-articles">
          <div className="section-header">
            <div className="section-title-wrap">
              <div className="section-icon">📝</div>
              <h2 className="section-title">ナルミンチョが書いた 記事</h2>
            </div>
            <p className="section-desc">
              Notion ページに記録されている記事（全 33 件）の一覧です。
            </p>
          </div>
          <div className="notion-articles-card">
            <ul className="notion-articles-list">
              {siteData.notionArticles.map((art) => (
                <li key={art.title} className="notion-article-item">
                  <div className="notion-article-main">
                    <span className="notion-article-title">{art.title}</span>
                    <div className="notion-article-meta">
                      {art.tag && <span className="article-tag">{art.tag}
                      </span>}
                      {art.date && (
                        <span className="article-date">{art.date}</span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <a
                href="https://narumincho.notion.site/22961d0ee2924074a22ce37f405b941a"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Notion で記事を読む
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-links">
            <a
              href="https://twitter.com/naru_mincho"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter (@naru_mincho)
            </a>
            <a
              href="https://github.com/narumincho"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://zenn.dev/narumincho"
              target="_blank"
              rel="noopener noreferrer"
            >
              Zenn
            </a>
            <a
              href="https://www.youtube.com/channel/UCDGsMJptdPNN_dbPkTl9qjA"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
            <a
              href="https://narumincho.notion.site/22961d0ee2924074a22ce37f405b941a"
              target="_blank"
              rel="noopener noreferrer"
            >
              Notion
            </a>
          </div>
          <p>&copy; ナルミンチョ. All rights reserved.</p>
        </div>
      </footer>

      <div className={`toast ${toastMessage ? "show" : ""}`}>
        {toastMessage}
      </div>
    </>
  );
}
