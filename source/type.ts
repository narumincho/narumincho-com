/**
 * ページ
 */
export type Page = {
    path: string;
    title: string;
    createdAt: Date;
    updateAt: Date;
    imageUrl: string;
    description: string;
    extendScript: null | string;
    content: ConcatArray<Element>;
};

/**
 * HTMLの各要素
 */
export type Element = {
    name: string;
    attributes: Array<Attribute>;
    /**
     * nullは<hr>のように閉じカッコなしにする
     */
    children: Array<Element> | null | string;
};

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

export const htmlToString = (html: Html): string =>
    "<!doctype html>" + elementToString(html);

const elementToString = (element: Element): string => {
    if (element.children === null) {
        return (
            "<" + element.name + attributesToString(element.attributes) + ">"
        );
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

export const div = (
    attributes: Array<Attribute>,
    children: Array<Element> | string
): Element => ({
    name: "div",
    attributes: attributes,
    children: children
});

export const span = (text: string): Element => ({
    name: "span",
    attributes: [],
    children: text
});

export const normalImage = (fileName: string, alternativeText: string) =>
    image([class_("normal-image")], "/assets/" + fileName, alternativeText);

export const h2 = (children: Array<Element> | string): Element => ({
    name: "h2",
    attributes: [],
    children: children
});

export const h3 = (children: Array<Element> | string): Element => ({
    name: "h3",
    attributes: [],
    children: children
});

export const blockCodeNoHightLight = (code: string): Element => ({
    name: "code",
    attributes: [class_("blockCode")],
    children: code
});

export const a = (
    attributes: Array<Attribute>,
    url: string,
    children: Array<Element> | string
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
    attributes: attributes.concat([["src", url], ["alt", alternativeText]]),
    children: null
});

export const class_ = (className: string): Attribute => ["class", className];

export const p = (
    attributes: Array<Attribute>,
    children: Array<Element> | string
): Element => ({
    name: "p",
    attributes: attributes,
    children: children
});

export const ul = (
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
