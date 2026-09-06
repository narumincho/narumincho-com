# ナルミンチョの創作記録 (narumincho.com)

ナルミンチョの個人サイト

Notion ページの初期表示の重さを解消するため、Deno + Vite + Preact
を用いて高速な静的サイトを構築し、Cloudflare（Workers Static Assets /
Pages）で配信します。

---

## 開発環境 (Deno + Vite)

本リポジトリは Node.js を直接使わず、**Deno** をランタイムとして Vite
を実行します。

### 1. 開発用サーバー起動

```sh
deno task dev
```

`http://localhost:5173` で Vite の開発用ローカルサーバーが起動します（HMR
対応）。

### 2. ビルド

```sh
deno task build
```

`dist/` ディレクトリ配下にプロダクション用のアセットが出力されます。

### 3. プレビュー

```sh
deno task preview
```

ビルド後の静的アセットをローカルでプレビューします。

---

## デプロイ (Cloudflare)

### Cloudflare Workers (Static Assets)

`wrangler.json` が設定済みのため、Cloudflare Workers Static Assets
としてそのまま配信されます。

### Cloudflare Pages

GitHub 連携でビルドする場合は、以下のように設定します：

- **Build command**: `deno task build`
- **Build output directory**: `dist`
