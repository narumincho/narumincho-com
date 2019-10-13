import * as fse from "fs-extra";
import * as type from "./type";
import * as index from "./page/index";
import * as notFound404 from "./page/404";
import * as desiredRoute from "./page/desiredRoute";
import * as ts from "typescript";

const siteName = "ナルミンチョの創作記録";

const domain = "https://narumincho.com";

/** 出力先のフォルダの指定 最後に/が付いていないので注意 */
const distributionFolder = "../distribution";

const twitterCardMeta = (data: {
    title: string | null;
    description: string;
    imageUrl: string | null;
    path: string | null;
}): Array<type.Element> => {
    if (data.path === null || data.imageUrl === null) {
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

const headElementChildren = (data: {
    title: string | null;
    description: string;
    imageUrl: string | null;
    extendScriptPath: string | null;
    path: string | null;
}): Array<type.Element> => [
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
        attributes: [["name", "description"], ["content", data.description]],
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
    },
    ...(data.extendScriptPath === null
        ? []
        : ([
              {
                  name: "script",
                  attributes: [["type", "module"]],
                  children: javaScriptCodeFromTypeScriptFileName(
                      data.extendScriptPath
                  )
              }
          ] as Array<type.Element>))
];

const javaScriptCodeFromTypeScriptFileName = (fileName: string): string => {
    const compileOptionResult = ts.convertCompilerOptionsFromJson(
        {},
        ".",
        "script/tsconfig.json"
    );
    console.log("compileOptionResult", compileOptionResult);
    const result = ts.transpileModule(
        fse.readFileSync("script/" + fileName).toString(),
        {
            compilerOptions: compileOptionResult.options
        }
    );
    console.log(result.diagnostics);
    return result.outputText;
};
const copyright: type.Element = type.div(
    [type.class_("copyright")],
    "© 2019 narumincho"
);

const pageToHtml = (page: {
    path: string | null;
    title: string;
    createdAt: Date | null;
    updateAt: Date | null;
    imageUrl: string | null;
    description: string;
    extendScriptPath: string | null;
    contents: Array<type.ArticleContent>;
}): type.Html =>
    type.html(headElementChildren(page), [
        {
            name: "header",
            attributes: [],
            children: [
                type.a(
                    "/",
                    [type.class_("title-logo")],
                    [
                        type.image(
                            [type.class_("logo")],
                            "/assets/logo.svg",
                            "ナルミンチョの創作記録のロゴ"
                        )
                    ]
                )
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
    ]);

const dateToString = (date: Date) => {
    if (Number.isNaN(date.getTime())) {
        return "?";
    }
    return (
        date.getUTCFullYear() +
        "/" +
        (date.getUTCMonth() + 1) +
        "/" +
        date.getUTCDate()
    );
};

const date = (updateAt: Date, createdAt: Date): type.Element => ({
    name: "div",
    attributes: [],
    children: [
        {
            name: "div",
            attributes: [],
            children: [
                {
                    name: "div",
                    attributes: [],
                    children: "更新日時"
                },
                {
                    name: "time",
                    attributes: [],
                    children: dateToString(updateAt)
                }
            ]
        },
        {
            name: "div",
            attributes: [],
            children: [
                {
                    name: "div",
                    attributes: [],
                    children: "作成日"
                },
                {
                    name: "time",
                    attributes: [],
                    children: dateToString(createdAt)
                }
            ]
        }
    ]
});

const outputHtml = (path: string, title: string, html: type.Html): void => {
    fse.outputFile(
        distributionFolder + "/" + path + ".html",
        type.htmlToString(html)
    ).then(() => {
        console.log("「" + title + "」の書き込みに成功!");
    });
};

console.log("出力先のフォルダを削除中…");
fse.removeSync(distributionFolder);
console.log("出力先のフォルダを削除完了");

outputHtml(
    "index",
    "indexHtml",
    type.html(
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

for (const page of desiredRoute.pages) {
    outputHtml(page.path, page.title, pageToHtml(page));
}

fse.copy("assets", distributionFolder + "/assets").then(() => {
    console.log("アセットファイルのコピーに成功!");
});
