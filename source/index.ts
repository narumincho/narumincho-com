import * as fse from "fs-extra";
import * as type from "./type";
import * as index from "./page/index";
import * as notFound404 from "./page/404";
import * as petitcom from "./page/petitcom";
import * as will from "./page/will";
import * as ts from "typescript";
import * as html from "@narumincho/html";
import { URL } from "url";

const siteName = "ナルミンチョの創作記録";

/** 出力先のフォルダの指定 最後に/が付いていないので注意 */
const distributionFolder = "./distribution";

const javaScriptCodeFromTypeScriptFileName = (fileName: string): string => {
  const compileOptionResult = ts.convertCompilerOptionsFromJson(
    {},
    ".",
    "source/script/tsconfig.json"
  );
  console.log("compileOptionResult", compileOptionResult);
  const result = ts.transpileModule(
    fse.readFileSync("source/script/" + fileName).toString(),
    {
      compilerOptions: compileOptionResult.options
    }
  );
  console.log(result.diagnostics);
  return result.outputText;
};

const copyright: html.Element = html.div(
  { class: "copyright" },
  "© 2020 narumincho"
);

/**
 * TODO @narumincho/htmlの機能を使えばいい
 * @param data
 */
const headElementChildren = (data: {
  title: string | null;
  description: string;
  imageUrl: string | null;
  extendScriptPath: string | null;
  path: string | null;
}): ReadonlyArray<html.Element> => [
  {
    name: "meta",
    attributes: [["charset", "utf-8"]],
    children: null
  },
  {
    name: "meta",
    attributes: [
      ["name", "viewport"],
      ["content", "width=device-width,initial-scale=1"]
    ],
    children: null
  },
  {
    name: "title",
    attributes: [],
    children: (data.title === null ? "" : data.title + " | ") + siteName
  },
  {
    name: "meta",
    attributes: [
      ["name", "description"],
      ["content", data.description]
    ],
    children: null
  },
  {
    name: "link",
    attributes: [
      ["rel", "icon"],
      ["href", "/assets/icon.png"]
    ],
    children: null
  },
  {
    name: "link",
    attributes: [
      ["rel", "stylesheet"],
      ["href", "/assets/style.css"]
    ],
    children: null
  },
  {
    name: "script",
    attributes: [
      "async",
      ["src", "https://www.googletagmanager.com/gtag/js?id=UA-104964219-1"]
    ],
    children: []
  },
  {
    name: "script",
    attributes: [],
    children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","UA-104964219-1");`
  },
  ...(data.extendScriptPath === null
    ? []
    : ([
        {
          name: "script",
          attributes: new Map([["type", "module"]]),
          children: {
            _: html.HtmlElementChildren_.RawText,
            text: javaScriptCodeFromTypeScriptFileName(data.extendScriptPath)
          }
        }
      ] as Array<html.Element>))
];

const dateToString = (date: Date): string => {
  if (Number.isNaN(date.getTime())) {
    return "?";
  }
  return (
    date.getUTCFullYear().toString() +
    "/" +
    (date.getUTCMonth() + 1).toString() +
    "/" +
    date.getUTCDate().toString()
  );
};

const date = (updateAt: Date, createdAt: Date): html.Element =>
  html.div({}, [
    html.div({ class: "time" }, [
      html.div({}, "更新日時"),
      {
        name: "time",
        attributes: new Map(),
        children: {
          _: html.HtmlElementChildren_.Text,
          text: dateToString(updateAt)
        }
      }
    ]),
    html.div({ class: "time" }, [
      html.div({}, "作成日"),
      {
        name: "time",
        attributes: new Map(),
        children: {
          _: html.HtmlElementChildren_.Text,
          text: dateToString(createdAt)
        }
      }
    ])
  ]);

const pageToHtml = (page: {
  path: string | null;
  title: string;
  createdAt: Date | null;
  updateAt: Date | null;
  imageUrl: string | null;
  description: string;
  extendScriptPath: string | null;
  contents: Array<type.ArticleContent>;
}): string =>
  html.toString({
    appName: "ナルミンチョの創作記録",
    coverImageUrl: new URL(type.origin + "/assets/icon.png"),
    description: page.description,
    pageName: page.title + " | ナルミンチョの創作記録",
    iconPath: ["assets", "icon.png"],
    javaScriptMustBeAvailable: false,
    origin: type.origin,
    path: page.path,
    scriptUrlList: [],
    twitterCard: html.TwitterCard.SummaryCard,
    language: html.Language.Japanese,
    body: [
      {
        name: "header",
        attributes: new Map(),
        children: {
          _: html.HtmlElementChildren_.HtmlElementList,
          value: [
            html.anchorLink(
              { class: "title-logo", url: new URL(type.origin + "/") },
              [
                html.image({
                  class: "logo",
                  url: new URL(type.origin + "/assets/logo.svg"),
                  alternativeText: "ナルミンチョの創作記録のロゴ"
                })
              ]
            )
          ]
        }
      },
      {
        name: "main",
        attributes: [],
        children: [
          {
            name: "h1",
            attributes: [],
            children: page.title
          } as type.Element
        ]
          .concat(
            page.updateAt !== null && page.createdAt !== null
              ? date(page.updateAt, page.createdAt)
              : []
          )
          .concat(
            page.imageUrl !== null
              ? type.image(
                  [type.class_("normal-image")],
                  page.imageUrl,
                  page.title + "のイメージ画像"
                )
              : []
          )
          .concat(type.articleContentsToElements(page.contents))
          .concat([
            type.a(
              "/",
              [type.class_("return-to-home")],
              [
                type.image(
                  [type.class_("home-icon")],
                  "/assets/home.svg",
                  "home"
                ),
                type.div([], "ホームに戻る")
              ]
            )
          ])
      },
      copyright
    ]
  });

const outputHtml = (path: string, title: string, html: string): void => {
  fse.outputFile(distributionFolder + "/" + path + ".html", html).then(() => {
    console.log("「" + title + "」の書き込みに成功!");
  });
};

console.log("出力先のフォルダを削除中…");
fse.removeSync(distributionFolder);
console.log("出力先のフォルダを削除完了");

outputHtml(
  "index",
  "indexHtml",
  type.htmlElement(
    headElementChildren({
      title: null,
      description: index.page.description,
      imageUrl: "/assets/icon.png",
      extendScriptPath: null,
      path: "/"
    }),
    index.page.bodyElements.concat(copyright)
  )
);

outputHtml(
  "404",
  "404",
  pageToHtml({
    title: notFound404.page.title,
    imageUrl: null,
    description: notFound404.page.description,
    createdAt: null,
    updateAt: null,
    path: null,
    extendScriptPath: null,
    contents: notFound404.page.contents
  })
);

const pathSet: Set<string> = new Set();
for (const page of petitcom.pages.concat(will.pages)) {
  if (pathSet.has(page.path)) {
    throw new Error("パスがかぶっている! path=" + page.path);
  }
  pathSet.add(page.path);
  outputHtml(page.path, page.title, pageToHtml(page));
}

fse.copy("source/assets", distributionFolder + "/assets").then(() => {
  console.log("アセットファイルのコピーに成功!");
});
