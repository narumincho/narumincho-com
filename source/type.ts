import * as html from "@narumincho/html";
import { URL } from "url";

export const origin = "https://narumincho.com";

/**
 * 記事
 */
export type Article = {
  path: ReadonlyArray<string>;
  title: string;
  createdAt: Date;
  updateAt: Date;
  imageAssetsFileName: string;
  description: string;
  extendScriptFileName: null | string;
  contents: Array<ArticleContent>;
};

/**
 * 記事の構成要素
 */
export type ArticleContent =
  | {
      c: "p";
      contents: string | Array<InlineContent>;
    }
  | { c: "img"; fileName: string; alternativeText: string }
  | { c: "list"; items: Array<string> }
  | { c: "section"; title: string; contents: Array<ArticleContent> }
  | { c: "window"; contents: Array<InlineContent> }
  | { c: "divForScript"; id: string }
  | { c: "quote"; contents: Array<ArticleContent> }
  | { c: "code"; code: string }
  | { c: "imageList"; images: Array<{ title: string; fileName: string }> }
  | { c: "definitionList"; items: Array<{ key: string; value: string }> }
  | { c: "twitterEmbedded"; code: string }
  | { c: "youTubeEmbedded"; id: string };

export const p = (contents: Array<InlineContent> | string): ArticleContent => ({
  c: "p",
  contents,
});

export const normalImage = (
  fileName: string,
  alternativeText: string
): ArticleContent => ({
  c: "img",
  fileName,
  alternativeText,
});

export const list = (items: Array<string>): ArticleContent => ({
  c: "list",
  items,
});

export const section = (
  title: string,
  contents: Array<ArticleContent>
): ArticleContent => ({
  c: "section",
  title,
  contents,
});

export const window = (contents: Array<InlineContent>): ArticleContent => ({
  c: "window",
  contents,
});

export const divForScript = (id: string): ArticleContent => ({
  c: "divForScript",
  id,
});

export const quote = (contents: Array<ArticleContent>): ArticleContent => ({
  c: "quote",
  contents,
});

export const blockCodeNoHightLight = (code: string): ArticleContent => ({
  c: "code",
  code,
});

export const imageList = (
  images: Array<{ title: string; fileName: string }>
): ArticleContent => ({
  c: "imageList",
  images,
});

export const definitionList = (
  items: Array<{ key: string; value: string }>
): ArticleContent => ({
  c: "definitionList",
  items,
});

export const twitterEmbedded = (code: string): ArticleContent => ({
  c: "twitterEmbedded",
  code,
});

/** YouTubeの動画を埋め込む */
export const youTubeEmbedded = (id: string): ArticleContent => ({
  c: "youTubeEmbedded",
  id,
});

/**
 *  段落の中にある要素
 */
export type InlineContent =
  | { c: "link"; url: string; text: string }
  | { c: "span"; class: string | null; text: string };

export const span = (class_: string | null, text: string): InlineContent => ({
  c: "span",
  class: class_,
  text,
});

export const link = (url: string, text: string): InlineContent => ({
  c: "link",
  url,
  text,
});

const inlineContentToElement = (inlineContent: InlineContent): html.Element => {
  switch (inlineContent.c) {
    case "span":
      return {
        name: "span",
        attributes: new Map(
          inlineContent.class === null ? [] : [["class", inlineContent.class]]
        ),
        children: {
          _: "Text",
          text: inlineContent.text,
        },
      };
    case "link":
      return {
        name: "a",
        attributes: new Map([["href", inlineContent.url]]),
        children: {
          _: "Text",
          text: inlineContent.text,
        },
      };
  }
};

const inlineContentsToElement = (
  inlineContents: string | ReadonlyArray<InlineContent>
): string | Array<html.Element> => {
  if (typeof inlineContents === "string") {
    return inlineContents;
  }
  return inlineContents.map(inlineContentToElement);
};

const ul = (children: ReadonlyArray<string>): html.Element => ({
  name: "ul",
  attributes: new Map(),
  children: {
    _: "HtmlElementList",
    value: children.map<html.Element>((text) => ({
      name: "li",
      attributes: new Map(),
      children: { _: "Text", text },
    })),
  },
});

const articleContentToElementsLoop = (
  content: ArticleContent,
  hLevel: number
): Array<html.Element> => {
  switch (content.c) {
    case "p": {
      return [
        html.element("p", new Map(), inlineContentsToElement(content.contents)),
      ];
    }
    case "img":
      return [
        html.image({
          class: "normal-image",
          url: new URL(origin + "/assets/" + content.fileName),
          alternativeText: content.alternativeText,
        }),
      ];
    case "list":
      return [ul(content.items)];
    case "section":
      if (hLevel > 6) {
        throw new Error(
          "セクションの入れ子が深すぎる。(h2～h6までしか使えないため)"
        );
      }
      return [
        html.element("h" + hLevel.toString(), new Map(), content.title),
      ].concat(
        content.contents
          .map((c) => articleContentToElementsLoop(c, hLevel + 1))
          .flat()
      );

    case "window":
      return [
        html.div(
          { class: "window" },
          content.contents.map(inlineContentToElement)
        ),
      ];
    case "divForScript":
      return [html.div({ id: content.id }, [])];

    case "quote":
      return [
        html.quote(
          {},
          content.contents
            .map((c) => articleContentToElementsLoop(c, hLevel))
            .flat()
        ),
      ];
    case "code":
      return [html.code({ class: "blockCode" }, content.code)];

    case "imageList":
      return [
        html.div(
          { class: "imageList" },
          content.images.map<html.Element>((i) =>
            html.element("figure", new Map([["class", "imageList-item"]]), [
              html.element(
                "figcaption",
                new Map([["class", "imageList-title"]]),
                i.title
              ),
              html.image({
                class: "imageList-image",
                url: new URL(origin + "/assets/" + i.fileName),
                alternativeText: i.title,
              }),
            ])
          )
        ),
      ];
    case "definitionList":
      return [
        html.element(
          "dl",
          new Map(),
          content.items
            .map<ReadonlyArray<html.Element>>((item) => [
              html.element("dt", new Map(), item.key),
              html.element("dd", new Map(), item.value),
            ])
            .flat()
        ),
      ];
    case "twitterEmbedded":
      return [
        html.elementRawText(
          "blockquote",
          new Map([["class", "twitter-tweet"]]),
          content.code
        ),
        html.element(
          "script",
          new Map([
            ["async", null],
            ["src", "https://platform.twitter.com/widgets.js"],
          ]),
          []
        ),
      ];
    case "youTubeEmbedded": {
      const randomId = Math.floor(Math.random() * 1000000).toString();
      return [
        html.element(
          "iframe",
          new Map([
            ["id", randomId],
            ["style", "width:100%"],
            ["src", `https://www.youtube.com/embed/${content.id}`],
            ["frameborder", "0"],
            [
              "allow",
              "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
            ],
            ["allowfullscreen", null],
          ]),
          []
        ),
        html.elementRawText(
          "script",
          new Map(),
          `{
const iFrame = document.getElementById("${randomId}");

const resize = () => {
  console.log(iFrame.clientWidth);
  iFrame.style.height = (iFrame.clientWidth / 16) * 9 + "px";
  requestAnimationFrame(resize)
};

resize();
}`
        ),
      ];
    }
  }
};

export const articleContentsToElements = (
  contents: Array<ArticleContent>
): Array<html.Element> =>
  contents.map((c) => articleContentToElementsLoop(c, 2)).flat();
