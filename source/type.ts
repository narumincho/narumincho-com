import * as url from "url";

/**
 * ページ
 */
export type Page = {
    path: string;
    title: string | null;
    description: string;
    bodyElements: Array<Element>;
};

/**
 * HTML要素
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
 * 属性
 */
export type Attribute = string | [string, string];

export const elementToString = (element: Element): string => {
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
