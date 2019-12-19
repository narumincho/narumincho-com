/**
 * 記事
 */
export type Article = {
  path: string;
  title: string;
  createdAt: Date;
  updateAt: Date;
  imageUrl: string;
  description: string;
  extendScriptPath: null | string;
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
  | { c: "twitterEmbedded"; code: string };

export const p = (contents: Array<InlineContent> | string): ArticleContent => ({
  c: "p",
  contents: contents
});

export const normalImage = (
  fileName: string,
  alternativeText: string
): ArticleContent => ({
  c: "img",
  fileName: fileName,
  alternativeText: alternativeText
});

export const list = (items: Array<string>): ArticleContent => ({
  c: "list",
  items: items
});

export const section = (
  title: string,
  contents: Array<ArticleContent>
): ArticleContent => ({
  c: "section",
  title: title,
  contents: contents
});

export const window = (contents: Array<InlineContent>): ArticleContent => ({
  c: "window",
  contents: contents
});

export const divForScript = (id: string): ArticleContent => ({
  c: "divForScript",
  id: id
});

export const quote = (contents: Array<ArticleContent>): ArticleContent => ({
  c: "quote",
  contents: contents
});

export const blockCodeNoHightLight = (code: string): ArticleContent => ({
  c: "code",
  code: code
});

export const imageList = (
  images: Array<{ title: string; fileName: string }>
): ArticleContent => ({
  c: "imageList",
  images: images
});

export const definitionList = (
  items: Array<{ key: string; value: string }>
): ArticleContent => ({
  c: "definitionList",
  items: items
});

export const twitterEmbedded = (code: string): ArticleContent => ({
  c: "twitterEmbedded",
  code: code
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
  text: text
});

export const link = (url: string, text: string): InlineContent => ({
  c: "link",
  url: url,
  text: text
});

export const class_ = (className: string): Attribute => ["class", className];

const inlineContentToElement = (inlineContent: InlineContent): Element => {
  switch (inlineContent.c) {
    case "span":
      return {
        name: "span",
        attributes:
          inlineContent.class === null ? [] : [class_(inlineContent.class)],
        children: inlineContent.text
      };
    case "link":
      return {
        name: "a",
        attributes: [["href", inlineContent.url]],
        children: inlineContent.text
      };
  }
};

const inlineContentsToElement = (
  inlineContents: string | ReadonlyArray<InlineContent>
): string | Array<Element> => {
  if (typeof inlineContents === "string") {
    return inlineContents;
  }
  return inlineContents.map(inlineContentToElement);
};

/**
 * HTMLの各要素
 */
export type Element =
  | {
      name: string;
      attributes: Array<Attribute>;
      /**
       * nullは<hr>のように閉じカッコなしにする
       */
      children: Array<Element> | null | string;
      raw?: null;
    }
  | { raw: true; htmlCode: string };

/**
 *  HTML
 */
export type Html = {
  name: "html";
  attributes: Array<Attribute>;
  children: Array<Element>;
};

export const html = (
  headChildren: Array<Element>,
  bodyChildren: Array<Element>
): Html => ({
  name: "html",
  attributes: [["lang", "ja"]],
  children: [
    {
      name: "head",
      attributes: [],
      children: headChildren
    },
    {
      name: "body",
      attributes: [],
      children: bodyChildren
    }
  ]
});

/**
 * 属性
 */
export type Attribute = string | [string, string];

const attributesToString = (attributes: Array<Attribute>): string => {
  if (attributes.length === 0) {
    return "";
  }
  return (
    " " +
    attributes
      .map(e => {
        if (typeof e === "string") {
          return e;
        }
        return e[0] + '="' + e[1].replace(/"/g, '\\"') + '"';
      })
      .join(" ")
  );
};

const escapeHtml = (text: string): string =>
  text.replace(/[&'`"<>]/g, (s: string): string =>
    s === "&"
      ? "&amp;"
      : s === "'"
      ? "&#x27;"
      : s === "`"
      ? "&#x60;"
      : s === '"'
      ? "&quot;"
      : s === "<"
      ? "&lt;"
      : s === ">"
      ? "&gt;"
      : ""
  );

const elementToString = (element: Element): string => {
  if (element.raw) {
    return element.htmlCode;
  }
  if (element.children === null) {
    return "<" + element.name + attributesToString(element.attributes) + ">";
  }
  if (typeof element.children === "string") {
    return (
      "<" +
      element.name +
      attributesToString(element.attributes) +
      ">" +
      (element.name === "script"
        ? element.children
        : escapeHtml(element.children)) +
      "</" +
      element.name +
      ">"
    );
  }

  return (
    "<" +
    element.name +
    attributesToString(element.attributes) +
    ">" +
    element.children.map(elementToString).join("") +
    "</" +
    element.name +
    ">"
  );
};

export const div = (
  attributes: Array<Attribute>,
  children: Array<Element> | string
): Element => ({
  name: "div",
  attributes: attributes,
  children: children
});

export const a = (
  url: string,
  attributes: Array<Attribute>,
  children: Array<Element>
): Element => ({
  name: "a",
  attributes: attributes.concat([["href", url]]),
  children: children
});

export const image = (
  attributes: Array<Attribute>,
  url: string,
  alternativeText: string
): Element => ({
  name: "img",
  attributes: attributes.concat([
    ["src", url],
    ["alt", alternativeText]
  ]),
  children: null
});

const ul = (
  ulAttributes: Array<Attribute>,
  liAttributes: Array<Attribute>,
  children: Array<Array<Element> | string>
): Element => ({
  name: "ul",
  attributes: ulAttributes,
  children: children.map<Element>(c => ({
    name: "li",
    attributes: liAttributes,
    children: c
  }))
});

export const htmlToString = (html: Html): string =>
  "<!doctype html>" + elementToString(html);

const articleContentToElementsLoop = (
  content: ArticleContent,
  hLevel: number
): Array<Element> => {
  switch (content.c) {
    case "p":
      return [
        {
          name: "p",
          attributes: [],
          children: inlineContentsToElement(content.contents)
        }
      ];
    case "img":
      return [
        image(
          [class_("normal-image")],
          "/assets/" + content.fileName,
          content.alternativeText
        )
      ];
    case "list":
      return [ul([], [], content.items)];
    case "section":
      if (6 < hLevel) {
        throw new Error(
          "セクションの入れ子が深すぎる。(h2～h6までしか使えないため)"
        );
      }
      return [
        {
          name: "h" + hLevel.toString(),
          attributes: [],
          children: content.title
        } as Element
      ].concat(
        content.contents
          .map(c => articleContentToElementsLoop(c, hLevel + 1))
          .flat()
      );

    case "window":
      return [
        div([class_("window")], content.contents.map(inlineContentToElement))
      ];
    case "divForScript":
      return [div([["id", content.id]], [])];
    case "quote":
      return [
        {
          name: "blockquote",
          attributes: [],
          children: content.contents
            .map(c => articleContentToElementsLoop(c, hLevel))
            .flat()
        }
      ];
    case "code":
      return [
        {
          name: "code",
          attributes: [class_("blockCode")],
          children: content.code
        }
      ];
    case "imageList":
      return [
        {
          name: "div",
          attributes: [class_("imageList")],
          children: content.images.map(
            (i): Element => ({
              name: "figure",
              attributes: [class_("imageList-item")],
              children: [
                {
                  name: "figcaption",
                  attributes: [class_("imageList-title")],
                  children: i.title
                },
                image(
                  [class_("imageList-image")],
                  "/assets/" + i.fileName,
                  i.title
                )
              ]
            })
          )
        }
      ];
    case "definitionList":
      return [
        {
          name: "dl",
          attributes: [],
          children: content.items
            .map(item => [
              {
                name: "dt",
                attributes: [],
                children: item.key
              },
              {
                name: "dd",
                attributes: [],
                children: item.value
              }
            ])
            .flat()
        }
      ];
    case "twitterEmbedded":
      return [
        {
          raw: true,
          htmlCode: content.code
        }
      ];
  }
};

export const articleContentsToElements = (
  contents: Array<ArticleContent>
): Array<Element> =>
  contents.map(c => articleContentToElementsLoop(c, 2)).flat();
