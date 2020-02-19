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

const articleToHtml = (article: type.Article): string =>
  html.toString({
    appName: "ナルミンチョの創作記録",
    coverImageUrl: new URL(type.origin + "/assets/icon.png"),
    description: article.description,
    pageName: article.title + " | ナルミンチョの創作記録",
    iconPath: ["assets", "icon.png"],
    javaScriptMustBeAvailable: false,
    origin: type.origin,
    path: article.path,
    scriptUrlList:
      article.extendScriptFileName === null
        ? []
        : [new URL(type.origin + "/assets/" + article.extendScriptFileName)],
    styleUrlList: [new URL(type.origin + "/assets/style.css")],
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
        attributes: new Map(),
        children: {
          _: html.HtmlElementChildren_.HtmlElementList,
          value: [html.h1({}, article.title)]
            .concat(
              article.updateAt !== null && article.createdAt !== null
                ? date(article.updateAt, article.createdAt)
                : []
            )
            .concat(
              html.image({
                class: "normal-image",
                url: new URL(
                  type.origin + "/assets/" + article.imageAssetsFileName
                ),
                alternativeText: article.title + "のイメージ画像"
              })
            )
            .concat(type.articleContentsToElements(article.contents))
            .concat([
              html.anchorLink(
                { class: "return-to-home", url: new URL(type.origin) },
                [
                  (html.image({
                    class: "home-icon",
                    url: new URL(type.origin + "/assets/home.svg"),
                    alternativeText: "home"
                  }),
                  html.div({}, "ホームに戻る"))
                ]
              )
            ])
        }
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
  html.toString({
    appName: "ナルミンチョの創作記録",
    iconPath: ["assets", "icon.png"],
    description: index.page.description,
    coverImageUrl: new URL(type.origin + "/assets/icon.png"),
    javaScriptMustBeAvailable: false,
    origin: type.origin,
    pageName: "ナルミンチョの創作記録",
    path: [],
    scriptUrlList: [],
    styleUrlList: [new URL(type.origin + "/assets/style.css")],
    twitterCard: html.TwitterCard.SummaryCard,
    language: html.Language.Japanese,
    body: index.page.bodyElements.concat(copyright)
  })
);

outputHtml(
  "404",
  "404",
  articleToHtml({
    title: notFound404.page.title,
    imageAssetsFileName: "kamausagi.png",
    description: notFound404.page.description,
    createdAt: new Date(),
    updateAt: new Date(),
    path: [],
    extendScriptFileName: null,
    contents: notFound404.page.contents
  })
);

const pathSet: Set<string> = new Set();
for (const page of petitcom.pages.concat(will.pages)) {
  const path = page.path.join("/");
  if (pathSet.has(path)) {
    throw new Error("パスがかぶっている! path=" + path);
  }
  pathSet.add(path);
  outputHtml(path, page.title, articleToHtml(page));
}

fse.copy("source/assets", distributionFolder + "/assets").then(() => {
  console.log("アセットファイルのコピーに成功!");
});
