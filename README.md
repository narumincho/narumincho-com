# ナルミンチョの創作記録 (narumincho.com)

ナルミンチョ（鳴海 敏史）の個人サイト・ポートフォリオ。

Notion ページの初期表示の重さを解消するため、Deno を用いて純粋な静的
HTML/CSS（Zero Runtime Overhead）を事前生成し、Cloudflare（Workers Static Assets
/ Pages）で配信します。

---

## 開発環境 (Deno)

本リポジトリは Node.js や npm を一切使用せず、**Deno**
のみで開発・ビルドを行います。

### 1. ビルド

```sh
deno task build
```

`src/data/siteData.ts` と `src/style.css` から、`dist/`
ディレクトリ配下に完全静的なサイト（`index.html`, `style.css`,
`icon.png`）を出力します。

### 2. ローカル開発サーバー起動

```sh
deno task dev
```

`http://localhost:8000` でローカルプレビューサーバーが起動します。

### 3. 型チェック

```sh
deno task check
```

---

## デプロイ (Cloudflare)

### Cloudflare Workers (Static Assets)

`wrangler.json` が設定済みのため、Cloudflare Workers Static Assets
としてそのまま高速配信されます。

### Cloudflare Pages

GitHub 連携でビルドする場合は、以下のように設定します：

- **Build command**: `deno task build`
- **Build output directory**: `dist`
