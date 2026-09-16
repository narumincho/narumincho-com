# ナルミンチョの創作記録 (narumincho.com)

# 工事中

元情報サイト

- https://narumincho.notion.site/
- https://pub-1463f3b1a6d64d348162c5230dfdd105.r2.dev/HomePage/index.html

ナルミンチョの個人サイト

Notion ページの初期表示の重さを解消するため、Deno + Vite + Preact
を用いて高速な静的サイトを構築し、Cloudflare（Workers Static Assets /
Pages）で配信します。

---

## 開発環境 (Deno + Fresh)

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
