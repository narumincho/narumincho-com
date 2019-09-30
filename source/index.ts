import * as fs from "fs";
import * as type from "./type";
import * as index from "./page/index";

const doctype = "<!doctype html>";

const head = (title: string | null, description: string): type.Element => ({
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
            children:
                (title === null ? "" : title + " | ") + "ナルミンチョの創作記録"
        },
        {
            name: "meta",
            attributes: [["name", "description"], ["content", description]],
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
            children: `window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "UA-104964219-1");`
        }
    ]
});

const pageToHtml = (page: type.Page): string =>
    doctype +
    type.elementToString({
        name: "html",
        attributes: [["lang", "ja"]],
        children: [
            head(page.title, page.description),
            { name: "body", attributes: [], children: page.bodyElements }
        ]
    });

const indexHtml: string = pageToHtml(index.page);

fs.writeFile("../distribution/index.html", indexHtml, error => {
    if (error !== null) {
        console.log("エラーが発生しました", error);
        return;
    }
    console.log("HTMLの書き込み成功!");
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
