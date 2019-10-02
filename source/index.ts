import * as fs from "fs";
import * as type from "./type";
import * as index from "./page/index";
import * as notFound404 from "./page/404";

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

const notFound404Html: string = pageToHtml(notFound404.page);

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

fs.writeFile("../distribution/index.html", indexHtml, error => {
    if (error !== null) {
        console.log("エラーが発生しました", error);
        return;
    }
    console.log("indexHTMLの書き込み成功!");
});

fs.writeFile("../distribution/404.html", notFound404Html, error => {
    if (error !== null) {
        console.log("404のファイルの書き込みに失敗しました");
        return;
    }
    console.log("404の書き込みに成功!");
});

const copyAssetsFiles = (): void => {
    fs.readdir("assets", (error, files) => {
        if (error !== null) {
            console.log("アセットファイルが見つかりませんでした");
            return;
        }
        for (let i = 0; i < files.length; i++) {
            fs.copyFile(
                "assets/" + files[i],
                "../distribution/assets/" + files[i],
                error => {
                    if (error !== null) {
                        console.log(
                            "アセットファイルの" +
                                files[i] +
                                "のコピーに失敗しました",
                            error
                        );
                        return;
                    }
                    console.log(
                        "アセットファイルの" + files[i] + "のコピーに成功!"
                    );
                }
            );
        }
    });
};

const distributionAssetsPath = "../distribution/assets";

fs.exists(distributionAssetsPath, exists => {
    if (exists) {
        copyAssetsFiles();
        return;
    }
    fs.mkdir(distributionAssetsPath, error => {
        if (error !== null) {
            console.log("アセットファイルの出力先フォルダの作成に失敗しました");
            return;
        }
        console.log("アセットファイルの出力先フォルダの作成に成功!");
        copyAssetsFiles();
    });
});
