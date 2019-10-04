import * as type from "../type";

const abut: type.Page = {
    path: "about-desired-route",
    title: "DESIRED Routeについて",
    createdAt: new Date("2019-10-04T22:42:00"),
    updateAt: new Date("2019-10-04T22:42:00"),
    description: "DESIRED Routeについて話します",
    imageUrl: "",
    content: [
        type.p([], "DESIRED Routeはプチコン3号で作られていたRPGです"),
        type.div(
            [],
            [
                type.div([], "当時プチコンファンミーティングのLT会に登壇した"),
                type.a(
                    [],
                    "https://www.itmedia.co.jp/pcuser/articles/1510/20/news137_3.html",
                    "IT mediaの記事"
                )
            ]
        )
    ]
};

const window: type.Page = {
    path: "message-window",
    createdAt: new Date("2015-09-20T00:00:00"),
    updateAt: new Date("2019-10-04T22:14:00"),
    title: "メッセージウィンドウの話",
    description: "メッセージウィンドウについて話します",
    imageUrl: "/assets/window.jpg",
    content: [
        {
            name: "h2",
            attributes: [],
            children: "メッセージウィンドウとは"
        },
        type.p(
            [],
            "メッセージウィンドウは、キャラクターが喋ったことか、ナレーションの言葉を表示し、プレイヤーに伝えるものです。"
        ),
        {
            name: "h2",
            attributes: [],
            children: "市販のゲームの例"
        },
        {
            name: "h3",
            attributes: [],
            children: [
                type.a(
                    [],
                    "https://www.atlus.co.jp/title-archive/ssq/",
                    "新世界樹の迷宮"
                )
            ]
        },
        type.image(
            [type.class_("normal-image")],
            "/assets/window-sqq.jpg",
            "新世界樹の迷宮のメッセージウィンドウ"
        ),
        type.ul(
            [],
            [],
            [
                "青の半透明の背景に、水色の文字、20文字3行",
                "文字はすべて同じ幅でなく、句読点「、」などで位置が調整される(プロポーショナルフォント?)",
                "LかRボタンを押している間、ウィンドウの表示をOFF",
                "ボタンで進める(長押しで、すべて文字を表示したら進める)",
                "Yボタン長押しで、メッセージスキップ",
                "話している人の名前の表示がない"
            ]
        ),
        type.p(
            [],
            "またウィンドウ非表示中でもAボタンを押したら話を進めてしまうというバグもあった。(新世界樹の迷宮2で修正)"
        )
    ]
};

const font: type.Page = {
    path: "desired-route-font",
    title: "フォントについて",
    description: "DESIRED Routeで使われたフォントの話をします",
    createdAt: new Date("2015-09-22"),
    updateAt: new Date("2019-10-05"),
    imageUrl: "/assets/font.jpg",
    content: []
};

export const pages: Array<type.Page> = [abut, window, font];
