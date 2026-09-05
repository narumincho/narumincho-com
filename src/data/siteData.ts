export interface AccountLink {
  id: string;
  name: string;
  url: string;
  handle: string;
  iconSvg: string;
  color?: string;
}

export interface ArchiveArticle {
  title: string;
  url: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: "featured" | "tool" | "peticom_archive" | "experimental";
  description: string;
  highlights?: string[];
  links: { label: string; url: string; primary?: boolean }[];
  tags: string[];
  period?: string;
  publicKey?: string;
  articles?: ArchiveArticle[];
}

export const siteData = {
  title: "ナルミンチョの創作記録",
  author: "ナルミンチョ (narumincho / 鳴海 敏史)",
  url: "https://narumincho.com",
  description:
    "ナルミンチョの個人サイト・創作記録。Web標準・Deno・TypeScript・言語処理系・UIデザイン・プチコン3号（DESIRED Route / NPIME）などの創作物を高速かつ美しくまとめています。",
  bio: [
    "プログラミング、UIデザイン、言語処理系、Web標準が好きな創作者。",
    "直感的で型安全なビジュアルプログラミング環境「Definy」の開発をはじめ、Webツール、ニンテンドー3DS プチコン3号でのRPG制作など、幅広いものづくりを行っています。",
    "従来の Notion ページ初期ロードの重さを解消するため、静的HTML/CSSによる超高速配信へリニューアルしました。",
  ],
  accounts: [
    {
      id: "x",
      name: "X (Twitter)",
      url: "https://x.com/naru_mincho",
      handle: "@naru_mincho",
      iconSvg:
        `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    },
    {
      id: "github",
      name: "GitHub",
      url: "https://github.com/narumincho",
      handle: "@narumincho",
      iconSvg:
        `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
    },
    {
      id: "zenn",
      name: "Zenn",
      url: "https://zenn.dev/narumincho",
      handle: "@narumincho",
      iconSvg:
        `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M.264 23.771h4.984c.264 0 .498-.147.645-.352L19.98 4.776H15.02L.264 23.771zm18.06-18.995h5.412c.147 0 .264-.117.264-.264V.264A.264.264 0 0 0 23.736 0H18.06c-.147 0-.264.117-.264.264v4.248c0 .147.117.264.264.264z"/></svg>`,
    },
    {
      id: "qiita",
      name: "Qiita",
      url: "https://qiita.com/narumincho",
      handle: "@narumincho",
      iconSvg:
        `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 7v5l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    },
    {
      id: "note",
      name: "note",
      url: "https://note.com/narumincho",
      handle: "@narumincho",
      iconSvg:
        `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M4 4h16v16H4V4zm3 4v8h10V8H7z"/></svg>`,
    },
    {
      id: "bluesky",
      name: "Bluesky",
      url: "https://bsky.app/profile/narumincho.com",
      handle: "@narumincho.com",
      iconSvg:
        `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566 1.01 1.5 1.7 1.5 3.7c0 1.25.438 6.55 1.25 8.1 1.25 2.4 3.75 3.2 5.75 2.2-2.5 1.5-5.5 3.5-3.5 7 2.5 4.4 7-2 7-2s4.5 6.4 7 2c2-3.5-1-5.5-3.5-7 2 1 4.5.2 5.75-2.2.812-1.55 1.25-6.85 1.25-8.1 0-2-1.066-2.69-3.702-.895C16.046 4.747 13.087 8.686 12 10.8z"/></svg>`,
    },
    {
      id: "youtube",
      name: "YouTube",
      url: "https://www.youtube.com/@narumincho",
      handle: "@narumincho",
      iconSvg:
        `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    },
    {
      id: "notion",
      name: "Notion (詳細アーカイブ)",
      url: "https://narumincho.notion.site/22961d0ee2924074a22ce37f405b941a",
      handle: "narumincho.notion.site",
      iconSvg:
        `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.093-.373L18.172 2.11c-.56-.42-1.307-.7-2.146-.653L3.992 2.25c-.466.047-.56.28-.373.467l.84 1.491zm-.093 3.312v12.593c0 .84.467 1.166 1.493 1.12l14.194-.84c1.026-.046 1.166-.653 1.166-1.4v-12.64c0-.746-.373-1.026-1.12-1.026l-14.614.887c-.793.047-1.119.42-1.119 1.306zm13.447.886c.093.373 0 .747-.373.793l-.84.14v8.956c0 .793-.42 1.12-1.166 1.12-.56 0-.84-.28-1.26-.84l-4.757-7.464v7.091l1.492.327c.373.093.466.42.466.746 0 .373-.28.467-.653.467l-3.5-.047c-.373 0-.56-.14-.56-.467 0-.373.187-.653.56-.746l1.213-.327V9.48l-1.4-.14c-.374-.047-.467-.373-.467-.653 0-.327.28-.467.653-.467l3.687.047c.56 0 .84.28 1.213.84l4.804 7.51V9.574l-1.306-.187c-.373-.093-.467-.42-.467-.746 0-.374.28-.467.653-.467l3.22.046c.373 0 .56.14.56.467 0 .374-.187.654-.56.747z"/></svg>`,
    },
  ] as AccountLink[],
  projects: [
    {
      id: "definy",
      title: "Definy",
      category: "featured",
      period: "2020 - 現在",
      description:
        "Webブラウザ上で動作する純粋関数型ビジュアルプログラミング言語・共同編集プラットフォーム。型安全性を極め、構文エラーのない直感的なプログラミング体験を追求しています。",
      highlights: [
        "Webブラウザだけで完結する共同編集プログラミング環境",
        "構文エラーが発生しない構造化エディタ",
        "TypeScript / WebAssembly / Web標準技術による堅牢な実装",
      ],
      tags: ["TypeScript", "WebAssembly", "Programming Language", "Compiler"],
      links: [
        { label: "Definy を開く", url: "https://definy.me", primary: true },
        {
          label: "GitHub リポジトリ",
          url: "https://github.com/narumincho/definy",
        },
      ],
    },
    {
      id: "cryptofinder",
      title: "CryptoFinder (Web File Encryptor)",
      category: "featured",
      period: "2024 - 2026",
      description:
        "ローカル環境やサーバー上のファイルを安全に暗号化・復号・プレビューできるモダンなエクスプローラー型Webアプリケーション。強固な暗号化（AES-GCM / Argon2id）と直感的なファイル管理UIを融合。",
      highlights: [
        "Web Crypto API と Deno を活用した高速暗号処理",
        "安全なプレビュー機能付きファイルマネージャーUI",
      ],
      tags: ["Deno", "TypeScript", "Web Crypto", "Security"],
      links: [
        {
          label: "GitHub リポジトリ",
          url: "https://github.com/narumincho/web-file-encryptor",
          primary: true,
        },
      ],
    },
    {
      id: "desired-route",
      title: "DESIRED Route (プチコン3号 RPG)",
      category: "peticom_archive",
      period: "2015 - 2018",
      description:
        "ニンテンドー3DSの「プチコン3号」上で制作された本格長編RPG。自作の漢字フォントレンダラー、操作性を追求したウィンドウ挙動、独自のエンカウント方式、Excelによるデータ連携など、技術的挑戦が詰まった代表作です。",
      highlights: [
        "プチコン3号上で美麗な漢字表示を実現する独自フォントシステム",
        "RPGとしてのテンポ・GUIの配色・レスポンスの徹底した最適化",
        "現在も読める詳細な技術解説・設計ドキュメントが多数残存",
      ],
      tags: ["Petitcom 3号", "3DS", "RPG", "Game Dev", "2018 Archive"],
      links: [
        {
          label: "2018年 当時サイトを見る",
          url:
            "https://pub-1463f3b1a6d64d348162c5230dfdd105.r2.dev/HomePage/index.html",
          primary: true,
        },
      ],
      articles: [
        {
          title: "ウィンドウの挙動",
          url:
            "https://pub-1463f3b1a6d64d348162c5230dfdd105.r2.dev/HomePage/desired_route/window.html",
        },
        {
          title: "漢字の表示",
          url:
            "https://pub-1463f3b1a6d64d348162c5230dfdd105.r2.dev/HomePage/desired_route/font.html",
        },
        {
          title: "リストの選択の挙動",
          url:
            "https://pub-1463f3b1a6d64d348162c5230dfdd105.r2.dev/HomePage/desired_route/list.html",
        },
        {
          title: "GUIの配色",
          url:
            "https://pub-1463f3b1a6d64d348162c5230dfdd105.r2.dev/HomePage/desired_route/guicolor.html",
        },
        {
          title: "エンカウント方式",
          url:
            "https://pub-1463f3b1a6d64d348162c5230dfdd105.r2.dev/HomePage/desired_route/encount.html",
        },
        {
          title: "入力の挙動",
          url:
            "https://pub-1463f3b1a6d64d348162c5230dfdd105.r2.dev/HomePage/desired_route/input.html",
        },
        {
          title: "Excelでのデータ作成",
          url:
            "https://pub-1463f3b1a6d64d348162c5230dfdd105.r2.dev/HomePage/desired_route/excel.html",
        },
        {
          title: "星の図形",
          url:
            "https://pub-1463f3b1a6d64d348162c5230dfdd105.r2.dev/HomePage/desired_route/star.html",
        },
      ],
    },
    {
      id: "npime",
      title: "N Petitcom IME (NPIME)",
      category: "peticom_archive",
      period: "2017 - 2018",
      description:
        "プチコン3号環境で動作する画期的な漢字入力IME。ひらがなから漢字への変換ロジックを実装し、ゲーム内外での日本語表現を大幅に拡張しました。",
      publicKey: "BEREV2HV",
      tags: ["Petitcom 3号", "3DS", "IME", "Algorithm", "2018 Archive"],
      links: [
        {
          label: "対応している文字",
          url:
            "https://pub-1463f3b1a6d64d348162c5230dfdd105.r2.dev/HomePage/npime/char.html",
        },
        {
          label: "変換プログラム解説",
          url:
            "https://pub-1463f3b1a6d64d348162c5230dfdd105.r2.dev/HomePage/npime/convert_prg.html",
        },
      ],
    },
    {
      id: "gladsheim",
      title: "Gladsheim (グラズヘイム)",
      category: "peticom_archive",
      period: "2018",
      description:
        "壮大な世界観とキャラクター設定を盛り込んだオリジナルRPGの制作記録・開発ログ。",
      tags: ["RPG", "Game Design", "Log", "2018 Archive"],
      links: [
        {
          label: "Gladsheim 2018-07 ログ",
          url:
            "https://pub-1463f3b1a6d64d348162c5230dfdd105.r2.dev/HomePage/Gladsheim/201807/index.html",
        },
        {
          label: "Gladsheim 2018-08 ログ",
          url:
            "https://pub-1463f3b1a6d64d348162c5230dfdd105.r2.dev/HomePage/Gladsheim/201808/index.html",
        },
        {
          label: "Gladsheim 2018-09 ログ",
          url:
            "https://pub-1463f3b1a6d64d348162c5230dfdd105.r2.dev/HomePage/Gladsheim/201809/index.html",
        },
      ],
    },
    {
      id: "line-stamp-maker",
      title: "line-stamp-maker",
      category: "tool",
      period: "2021",
      description:
        "LINEスタンプの厳密な規格（余白、偶数ピクセルサイズ、APNG形式）に沿った画像の一括自動変換・書き出しをブラウザ上で行える支援ツール。",
      tags: ["Web Tool", "Canvas API", "Productivity"],
      links: [
        {
          label: "GitHub リポジトリ",
          url: "https://github.com/narumincho/line-stamp-maker",
        },
      ],
    },
    {
      id: "simple-markdown",
      title: "Simple Markdown",
      category: "tool",
      period: "2022",
      description:
        "Web標準とTypeScriptで実装された軽量かつ安全なMarkdownパーサー＆HTMLジェネレーター。カスタマイズ性の高い構文木変換を提供。",
      tags: ["TypeScript", "Parser", "Markdown", "OSS"],
      links: [
        {
          label: "GitHub リポジトリ",
          url: "https://github.com/narumincho/simple-markdown",
        },
      ],
    },
    {
      id: "speech-balloon",
      title: "Speech Balloon (Web 吹き出し)",
      category: "tool",
      period: "2021",
      description:
        "チャットやノベルゲーム風UIを簡単にWebページに組み込める、軽量でカスタマイズ性の高い吹き出しコンポーネントライブラリ。",
      tags: ["Web Component", "CSS", "UI Component"],
      links: [
        {
          label: "GitHub リポジトリ",
          url: "https://github.com/narumincho/speech-balloon",
        },
      ],
    },
    {
      id: "chidori",
      title: "Chidori (千鳥)",
      category: "experimental",
      period: "2023",
      description:
        "日本語タイポグラフィ、字形、フォントレンダリングの最適化を探求する実験的プロジェクト。",
      tags: ["Typography", "Font", "Graphics"],
      links: [
        {
          label: "GitHub リポジトリ",
          url: "https://github.com/narumincho/chidori",
        },
      ],
    },
  ] as ProjectItem[],
  articles: [
    {
      platform: "Zenn",
      topic: "WebAssembly / TypeScript / Deno / プログラミング言語自作",
      url: "https://zenn.dev/narumincho",
    },
    {
      platform: "Qiita",
      topic: "フロントエンド・設計・Web標準API活用法",
      url: "https://qiita.com/narumincho",
    },
    {
      platform: "Note",
      topic: "創作に関する思考、UI/UXデザインについての考察",
      url: "https://note.com/narumincho",
    },
  ],
};
