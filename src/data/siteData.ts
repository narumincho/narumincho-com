export interface AccountLink {
  id: string;
  name: string;
  url: string;
  handle: string;
  iconSvg: string;
}

export interface ArchiveArticle {
  title: string;
  url: string;
}

export interface WebAppItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  notionPageId?: string;
}

export interface PeticomProject {
  id: string;
  title: string;
  description: string;
  publicKey?: string;
  articles: ArchiveArticle[];
}

export interface NotionArticleItem {
  title: string;
  tag?: string;
  date?: string;
  notionPath?: string;
}

export const siteData = {
  title: "ナルミンチョの創作記録",
  author: "ナルミンチョ",
  url: "https://narumincho.com",
  description:
    "ナルミンチョの創作記録。Webアプリ、definy、プチコン3号（DESIRED Route / NPIME）などの創作物を紹介しています。",
  bio: [
    "世界樹の迷宮に感動し、プチコン3号で RPGを創作(頓挫)。RPG のシナリオを入力するためにIMEつきエディタを作成。",
    "つくマート、重力星など様々なWebアプリを得意の型安全を意識して開発。",
    "マイクラのサバイバルサーバーで作った 巨大な迷宮が自信作。",
    "Elmを元にした最強のビジュアルプログラミング言語などを日々開発中。",
  ],
  accounts: [
    {
      id: "twitter",
      name: "Twitter (@naru_mincho)",
      url: "https://twitter.com/naru_mincho",
      handle: "@naru_mincho",
      iconSvg:
        `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    },
    {
      id: "github",
      name: "GitHub",
      url: "https://github.com/narumincho",
      handle: "narumincho",
      iconSvg:
        `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
    },
    {
      id: "zenn",
      name: "Zenn",
      url: "https://zenn.dev/narumincho",
      handle: "narumincho",
      iconSvg:
        `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M.264 23.771h4.984c.264 0 .498-.147.645-.352L19.98 4.776H15.02L.264 23.771zm18.06-18.995h5.412c.147 0 .264-.117.264-.264V.264A.264.264 0 0 0 23.736 0H18.06c-.147 0-.264.117-.264.264v4.248c0 .147.117.264.264.264z"/></svg>`,
    },
    {
      id: "youtube",
      name: "YouTube",
      url: "https://www.youtube.com/channel/UCDGsMJptdPNN_dbPkTl9qjA",
      handle: "ナルミンチョ",
      iconSvg:
        `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    },
    {
      id: "notion",
      name: "Notion (ナルミンチョの創作記録)",
      url: "https://narumincho.notion.site/22961d0ee2924074a22ce37f405b941a",
      handle: "Notion",
      iconSvg:
        `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.093-.373L18.172 2.11c-.56-.42-1.307-.7-2.146-.653L3.992 2.25c-.466.047-.56.28-.373.467l.84 1.491zm-.093 3.312v12.593c0 .84.467 1.166 1.493 1.12l14.194-.84c1.026-.046 1.166-.653 1.166-1.4v-12.64c0-.746-.373-1.026-1.12-1.026l-14.614.887c-.793.047-1.119.42-1.119 1.306zm13.447.886c.093.373 0 .747-.373.793l-.84.14v8.956c0 .793-.42 1.12-1.166 1.12-.56 0-.84-.28-1.26-.84l-4.757-7.464v7.091l1.492.327c.373.093.466.42.466.746 0 .373-.28.467-.653.467l-3.5-.047c-.373 0-.56-.14-.56-.467 0-.373.187-.653.56-.746l1.213-.327V9.48l-1.4-.14c-.374-.047-.467-.373-.467-.653 0-.327.28-.467.653-.467l3.687.047c.56 0 .84.28 1.213.84l4.804 7.51V9.574l-1.306-.187c-.373-.093-.467-.42-.467-.746 0-.374.28-.467.653-.467l3.22.046c.373 0 .56.14.56.467 0 .374-.187.654-.56.747z"/></svg>`,
    },
  ] as AccountLink[],

  // ✨ ナルミンチョが作った Webアプリなど (Notion 掲載の 8 件)
  webApps: [
    {
      id: "deno-vscode",
      title: "Deno で VSCode 拡張機能を作れるライブラリ",
      description:
        "Rust の SWC で公式の d.ts ファイルのコードを解析し構築している",
      url: "https://jsr.io/@narumincho/vscode",
      notionPageId: "Deno-VSCode-c926691c13224b8980f8d5cf30062794",
    },
    {
      id: "definy",
      title: "代数的データ型をサポートしたビジュアルプログラミング言語 definy",
      url: "https://definy.app/?hl=ja",
      notionPageId: "definy-06a613db71624fd09a8682c898e2011b",
    },
    {
      id: "cop4k",
      title: "重力星",
      url: "https://cop4k.csb.app/",
      notionPageId: "9b2d50b0d7d34f9883ced2c99f618ee0",
    },
    {
      id: "tsukumart",
      title: "つくマート",
      url: "https://tsukumart.com/",
      notionPageId: "2a3806b3761c4ce7a81d74be0731eaac",
    },
    {
      id: "ue45oh",
      title: "2桁掛け算暗算トレーニング",
      url: "https://ue45oh.csb.app/",
      notionPageId: "2-e7241c01cca44fde800b4c1b404e5efd",
    },
    {
      id: "vscode-definy",
      title: "VSCode 拡張機能版 definy",
      description:
        "definy は シンプルさを重視した新しいプログラミング言語です. まだまだ開発中であり, できることは限られます. 上のコードを書いた状態で, add にマウスをホバーすると評価結果を見ることができます.",
      url:
        "https://marketplace.visualstudio.com/items?itemName=narumincho.definy",
      notionPageId: "VSCode-definy-1e0f2d2c58a44c6dbfb53473d16ae352",
    },
    {
      id: "nonogram",
      title: "narumincho nonogram | お絵かきロジックを解いてくれるアプリ",
      url: "https://nonogram.narumincho.com/",
      notionPageId: "narumincho-nonogram-0aedef5cb5d942799bda754ebb96b3a5",
    },
    {
      id: "image-color-canvas-world",
      title: "アップロードした画像の色に合わせて自動で配置するサイト",
      url: "https://image-color-canvas-world.deno.dev/",
      notionPageId: "88789a08cd7e49d5b84ae04e72a24b94",
    },
  ] as WebAppItem[],

  // 2018年サイト (https://pub-1463f3b1a6d64d348162c5230dfdd105.r2.dev/HomePage/index.html) の創作記録
  peticomProjects: [
    {
      id: "desired-route",
      title: "DESIRED Route",
      description:
        "現在、プチコン3号で作っているRPG「DESIRED Route」。ウィンドウの挙動、漢字の表示、GUIの配色などの技術解説を公開しています。",
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
          title: "エンカウント",
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
      title: "N Petitcom IME",
      description: "プチコン3号で動く漢字入力IMEです。",
      publicKey: "BEREV2HV",
      articles: [
        {
          title: "対応している文字",
          url:
            "https://pub-1463f3b1a6d64d348162c5230dfdd105.r2.dev/HomePage/npime/char.html",
        },
        {
          title: "変換プログラム",
          url:
            "https://pub-1463f3b1a6d64d348162c5230dfdd105.r2.dev/HomePage/npime/convert_prg.html",
        },
      ],
    },
    {
      id: "gladsheim",
      title: "Gladsheim",
      description: "Gladsheim の制作記録。",
      articles: [
        {
          title: "Gladsheim2018-07",
          url:
            "https://pub-1463f3b1a6d64d348162c5230dfdd105.r2.dev/HomePage/Gladsheim/201807/index.html",
        },
        {
          title: "Gladsheim2018-08",
          url:
            "https://pub-1463f3b1a6d64d348162c5230dfdd105.r2.dev/HomePage/Gladsheim/201808/index.html",
        },
        {
          title: "Gladsheim2018-09",
          url:
            "https://pub-1463f3b1a6d64d348162c5230dfdd105.r2.dev/HomePage/Gladsheim/201809/index.html",
        },
      ],
    },
  ] as PeticomProject[],

  // 📝 ナルミンチョが書いた 記事 (Notion 掲載の 33 件)
  notionArticles: [
    {
      title: "もりぱ 2026年福袋の旅",
      tag: "⛏️ Minecraft",
      date: "August 16, 2026",
    },
    {
      title: "隠れ鬼 開催歴",
      tag: "⛏️ Minecraft",
      date: "December 13, 2025",
    },
    {
      title: "もりのパーティー! 地上絵",
      tag: "⛏️ Minecraft",
      date: "November 5, 2024",
    },
    {
      title: "Blender で 十二・十二面体 を作る",
      tag: "Blender",
      date: "March 19, 2025",
    },
    {
      title: "バズクリワールド 2.0",
      tag: "⛏️ Minecraft",
      date: "May 3, 2023",
    },
    {
      title: "Minecraft のクラウド exaroton 試してみた",
      tag: "⛏️ Minecraft",
      date: "September 10, 2024",
    },
    {
      title: "PowerShell で指定したポートを使っているプロセスを特定する",
      tag: "PowerShell",
      date: "February 3, 2023",
    },
    {
      title: "DESIRED Route のコード",
      tag: "DESIRED Route",
      date: "December 7, 2022",
    },
    {
      title:
        "Unity で VRoid Studio の キャラクターを FBXに変換せずに Mixamo のアニメーションで動かす",
      tag: "Unity",
      date: "November 5, 2022",
    },
    {
      title: "definy について 考えていること",
      tag: "definy",
      date: "December 7, 2022",
    },
    {
      title: "JS, TS, Deno ハンズオン資料",
      tag: "TypeScript",
      date: "December 12, 2022",
    },
    {
      title: "音階の面白い表現を紹介",
      date: "September 22, 2022",
    },
    {
      title: "Slack 未読パターン",
      date: "July 13, 2022",
    },
    {
      title: "HIDELIKE GB のフォントを作った",
      tag: "font, プチコン",
      date: "July 26, 2024",
    },
    {
      title: "definy が改善すること",
      tag: "definy",
      date: "May 5, 2022",
    },
    {
      title: "クッキーラン キャロット味クッキー が かわいい",
      tag: "クッキーラン",
      date: "May 5, 2022",
    },
    {
      title: "DESIRED Routeについて",
      tag: "DESIRED Route",
      date: "September 9, 2025",
    },
    {
      title: "メッセージウィンドウの話",
      tag: "DESIRED Route, UI",
      date: "February 6, 2026",
    },
    {
      title: "DESIRED RouteとNPIMEのフォントの描画処理",
      tag: "font, DESIRED Route",
      date: "February 6, 2026",
    },
    {
      title: "星の図形について",
      tag: "DESIRED Route",
      date: "May 5, 2022",
    },
    {
      title: "DESIRED Routeに登場する予定だった敵モンスター",
      tag: "DESIRED Route",
      date: "May 5, 2022",
    },
    {
      title: "アドベントカレンダー 20歳の-遺書- ナルミンチョ版",
      tag: "Advent Calendar, definy, DESIRED Route",
      date: "May 5, 2022",
    },
    {
      title: "型システムと協力して世界を構築する",
      tag: "Advent Calendar",
      date: "May 5, 2022",
    },
    {
      title: "Nプチコン漢字入力(N Petitcom IME)",
      tag: "プチコン, font",
      date: "March 5, 2023",
    },
    {
      title: "モンスターとのエンカウントについて",
      tag: "DESIRED Route",
      date: "May 5, 2022",
    },
    {
      title: "UIの配色",
      tag: "UI, DESIRED Route",
      date: "May 5, 2022",
    },
    {
      title: "リストUIのボタン操作の挙動",
      tag: "UI, DESIRED Route",
      date: "May 5, 2022",
    },
    {
      title: "単体SVGと埋め込みSVG",
      tag: "SVG",
      date: "May 5, 2022",
    },
    {
      title: "SVGの基本",
      tag: "SVG",
      date: "May 5, 2022",
    },
    {
      title:
        "PowerShell で フォルダ内のファイルに対して 再帰的にコマンドを実行する",
      tag: "PowerShell",
      date: "May 5, 2022",
    },
    {
      title: "Notion のデータベスでランダムに1つだけ表示する方法",
      tag: "Notion",
      date: "May 5, 2022",
    },
    {
      title: "definy 識別子の仕様",
      tag: "definy",
      date: "May 5, 2022",
    },
    {
      title: "M5Stack Narumincho Watch",
      date: "June 14, 2023",
    },
  ] as NotionArticleItem[],
};
