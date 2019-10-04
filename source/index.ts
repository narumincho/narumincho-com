import * as fse from "fs-extra";
import * as type from "./type";
import * as index from "./page/index";
import * as notFound404 from "./page/404";
import * as desiredRouteAbout from "./page/desiredRoute/about";
import * as desiredRouteWindow from "./page/desiredRoute/window";

const doctype = "<!doctype html>";

const siteName = "ナルミンチョの創作記録";

const domain = "https://narumincho.com";

const twitterCardMeta = (data: {
    title: string | null;
    description: string;
    imageUrl: string;
    path: string | type.SpecialPath;
}): Array<type.Element> => {
    if (data.path === type.SpecialPath.FotFound404) {
        return [];
    }
    return [
        {
            name: "meta",
            attributes: [["name", "twitter:card"], ["content", "summary"]],
            children: null
        },
        {
            name: "meta",
            attributes: [
                ["property", "og:url"],
                ["content", domain + data.path]
            ],
            children: null
        },
        {
            name: "meta",
            attributes: [
                ["property", "og:title"],
                ["content", data.title === null ? siteName : data.title]
            ],
            children: null
        },
        {
            name: "meta",
            attributes: [["property", "og:site_name"], ["content", siteName]],
            children: null
        },
        {
            name: "meta",
            attributes: [
                ["property", "og:description"],
                ["content", data.description]
            ],
            children: null
        },
        {
            name: "meta",
            attributes: [
                ["property", "og:image"],
                ["content", domain + data.imageUrl]
            ],
            children: null
        }
    ];
};

const head = (data: {
    title: string | null;
    description: string;
    imageUrl: string;
    path: string | type.SpecialPath;
}): type.Element => ({
    name: "head",
    attributes: [],
    children: [
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
            attributes: [["rel", "icon"], ["href", "/assets/icon.png"]],
            children: null
        },
        {
            name: "link",
            attributes: [["rel", "stylesheet"], ["href", "/assets/style.css"]],
            children: null
        },
        ...twitterCardMeta(data),
        {
            name: "script",
            attributes: [
                "async",
                [
                    "src",
                    "https://www.googletagmanager.com/gtag/js?id=UA-104964219-1"
                ]
            ],
            children: []
        },
        {
            name: "script",
            attributes: [],
            children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","UA-104964219-1");`
        }
    ]
});

const copyright: type.Element = type.div(
    [type.class_("copyright")],
    "© 2019 narumincho"
);

const pageToHtml = (page: type.Page): string =>
    doctype +
    type.elementToString({
        name: "html",
        attributes: [["lang", "ja"]],
        children: [
            head(page),
            {
                name: "body",
                attributes: [],
                children: [
                    {
                        name: "header",
                        attributes: [],
                        children: [
                            type.a([type.class_("title-logo")], "/", [
                                type.image(
                                    [type.class_("logo")],
                                    "/assets/logo.svg",
                                    "ナルミンチョの創作記録のロゴ"
                                )
                            ])
                        ]
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
                            .concat(page.content)
                            .concat([
                                type.a([type.class_("return-to-home")], "/", [
                                    type.image(
                                        [type.class_("home-icon")],
                                        "/assets/home.svg",
                                        "home"
                                    ),
                                    type.div([], "ホームに戻る")
                                ])
                            ])
                    }
                ]
            }
        ]
    });

const indexHtml: string =
    doctype +
    type.elementToString({
        name: "html",
        attributes: [["lang", "ja"]],
        children: [
            head({
                title: null,
                description: index.page.description,
                imageUrl: "/assets/icon.png",
                path: "/"
            }),
            {
                name: "body",
                attributes: [],
                children: index.page.bodyElements.concat(copyright)
            }
        ]
    });

console.log("出力先のフォルダを削除中…");
fse.removeSync("../distribution");
console.log("出力先のフォルダを削除完了");

fse.outputFile("../distribution/index.html", indexHtml).then(() => {
    console.log("indexHTMLの書き込み成功!");
});

fse.outputFile("../distribution/404.html", pageToHtml(notFound404.page)).then(
    () => {
        console.log("404の書き込みに成功!");
    }
);

fse.outputFile(
    "../distribution/desiredroute/about.html",
    pageToHtml(desiredRouteAbout.page)
).then(() => {
    console.log("DRのaboutの書き込みに成功!");
});

fse.outputFile(
    "../distribution/desiredroute/window.html",
    pageToHtml(desiredRouteWindow.page)
).then(() => {
    console.log("DRのwindowの書き込みに成功!");
});

fse.copy("assets", "../distribution/assets").then(() => {
    console.log("アセットファイルのコピーに成功!");
});
