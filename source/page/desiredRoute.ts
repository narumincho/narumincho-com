import * as type from "../type";

export const pages: Array<type.Page> = [
    {
        path: "about-desired-route",
        title: "DESIRED Routeについて",
        createdAt: new Date("2019-10-04T22:42:00"),
        updateAt: new Date("2019-10-04T22:42:00"),
        description: "DESIRED Routeについて話します",
        imageUrl: "/assets/desiredroute-title.jpg",
        content: [
            type.p(
                [type.class_("inline")],
                [
                    type.div([type.class_("inline")], "DESIRED Routeは"),
                    type.a(
                        [type.class_("inline")],
                        "http://smilebasic.com/",
                        "プチコン3号"
                    ),
                    type.div([type.class_("inline")], "で作られていたRPGです")
                ]
            ),
            type.p(
                [],
                "2015年前後にメニュー画面とバトル画面とBGMが多少作られたが、マップなどグラフィック、セリフが不足して断念。"
            ),
            type.p(
                [type.class_("inline")],
                [
                    type.div(
                        [type.class_("inline")],
                        "当時プチコンファンミーティングのLT会に登壇した("
                    ),
                    type.a(
                        [type.class_("inline")],
                        "https://www.itmedia.co.jp/pcuser/articles/1510/20/news137_3.html",
                        "IT mediaの記事"
                    ),
                    type.div(
                        [type.class_("inline")],
                        ")。そのことが少しだけ記事に書かれている。"
                    ),
                    type.a(
                        [],
                        "http://penkogoma.blog6.fc2.com/?mode=m&no=223&photo=true",
                        "「ペンコ改の知らね」(プチコンファンミーティングin東京レポートその3)"
                    ),
                    type.div([], "でも紹介されている")
                ]
            )
        ]
    },

    {
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
                "メッセージウィンドウは、登場人物やが言ったことや、ナレーションの言葉を表示し、プレイヤーに伝えるUIです。DESIRED Routeを作る上で、登場人物たちのセリフをプレイヤーに伝えるために必要でした。市販のゲームを見てどんなメッセージウィンドウを作れば良いか考えてみよう!"
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
            ),
            {
                name: "h3",
                attributes: [],
                children: [
                    type.a(
                        [],
                        "http://www.jp.square-enix.com/bdfts/",
                        "BRAVELY DEFAULT"
                    )
                ]
            },
            type.image(
                [type.class_("normal-image")],
                "/assets/bdff.jpg",
                "BRAVELY DEFAULTのイベント画面"
            ),
            type.ul(
                [],
                [],
                [
                    "黒の背景に、白の文字、25文字2行",
                    "すべて文字は同じ幅で、句読点「、」などで位置が調整されない(等幅フォント?)",
                    "Aボタンで進める(長押しでは、進めない)",
                    "Yボタンでボイス合わせて進めるオート",
                    "Xボタンでスキップ",
                    "常に名前表示あり"
                ]
            ),
            type.p(
                [],
                "2行とすることで1つのページにセリフがたくさん表示されないようにしている。実際2行で十分なことが多い。"
            ),
            type.p(
                [],
                "また、推理ゲームなどに多かったが、セリフのログが残されていて後で確認できるようになっているものも最近はある。"
            ),
            {
                name: "h3",
                attributes: [],
                children: "DESIRED Routeでは"
            },
            type.p(
                [],
                "DESIRED ROUTEでは、現代的な快適さとシンプルさを合わせ持つように、"
            ),
            type.image(
                [type.class_("normal-image")],
                "/assets/window.jpg",
                "DESIRED Routeでのメッセージウィンドウ表示"
            ),
            type.ul(
                [],
                [],
                [
                    "青の半透明の背景に、白の文字、20文字3行",
                    "文字はすべて同じ幅で、句読点「、」などで位置が調整されない",
                    "Aボタンで進める",
                    "Aボタン長押しで、メッセージスキップ",
                    "名前表示ありと、名前表示なしを変更できる"
                ]
            ),
            type.p(
                [],
                "にしました。このRPGは下画面にメニューを常に表示しているので、上画面のウィンドウに使えるボタンはAボタンだけですが、Aボタン長押しでメッセージスキップもできるようにしています。"
            ),
            {
                name: "h2",
                attributes: [],
                children: "ページ内スキップ"
            },
            type.p(
                [],
                "他に、スキップ以外に快適さに必要なのは、ページ内スキップです。ページ内スキップとは、文字がぽつぽつ表示されている途中に、Aボタンを押すと、セリフの文字が一気に表示される機能です。忘れがちの処理ですが、有ると無いとでは、かなりと操作感が違います。紹介してきたRPG全てと、このDESIRED ROUTEはページ内スキップ機能はあります。PRGは文字で内容を伝えるゲームだと思うので、ウィンドウはこだわるべきです。"
            ),
            {
                name: "h2",
                attributes: [],
                children: "文字の配色"
            },
            type.p(
                [],
                "開発初期のメッセージウィンドウの文字色は、10種類の中から選ぶことができましたが、色を多用していると何が重要かわからなくなってしまうのです。"
            ),
            type.image(
                [type.class_("normal-image")],
                "/assets/bad-color-message-window.jpg",
                "10種類の文字色を使用したメッセージウィンドウの表示"
            ),
            type.p(
                [],
                "というわけで、文字色は、白とオレンジと水色の3種類に絞りました。"
            ),
            type.image(
                [type.class_("normal-image")],
                "/assets/simple-color-message-window.jpg",
                "3色を使ったメッセージウィンドウの表示"
            ),
            type.p([], "オレンジは重要な単語につけることとします。"),
            type.div(
                [type.class_("window-bg")],
                [
                    type.div([type.class_("window-strong")], "テアー"),
                    type.div(
                        [type.class_("window-nomal")],
                        "を持ってきてくれ。"
                    )
                ]
            ),
            type.p([], "水色はシステムなどの説明に使うことにします。"),
            type.div(
                [type.class_("window-bg")],
                [
                    type.div(
                        [type.class_("window-info")],
                        "このRPGでは、下画面の決定をYボタンとします。"
                    )
                ]
            )
        ]
    },
    {
        path: "desired-route-font",
        title: "フォントについて",
        description: "DESIRED Routeで使われたフォントの話をします",
        createdAt: new Date("2015-09-22"),
        updateAt: new Date("2019-10-05"),
        imageUrl: "/assets/font.jpg",
        content: []
    },
    {
        path: "list-select-behavior",
        title: "リストの選択の挙動",
        description: "リストの選択の挙動について話します",
        createdAt: new Date(""),
        updateAt: new Date(""),
        imageUrl: "/assets/list-ui.jpg",
        content: []
    },
    {
        path: "ui-color",
        title: "UIの配色",
        description: "",
        createdAt: new Date(""),
        updateAt: new Date(""),
        imageUrl: "/assets/color.png",
        content: []
    },
    {
        path: "desired-route-encounter",
        title: "モンスターとのエンカウントについて",
        description: "モンスターとのエンカウントについて",
        createdAt: new Date(""),
        updateAt: new Date(""),
        imageUrl: "/assets/battle.jpg",
        content: []
    },
    {
        path: "desired-route-input-behavior",
        title: "プチコン3号で入力の処理をまとめてメンテナンス性能を高める",
        description:
            "プチコン3号で入力の処理をまとめてメンテナンス性能を高める",
        createdAt: new Date(""),
        updateAt: new Date(""),
        imageUrl: "/assets/3ds.png",
        content: []
    },
    {
        path: "star",
        title: "星の図形について",
        description: "星の図形について",
        createdAt: new Date(""),
        updateAt: new Date(""),
        imageUrl: "/assets/star.jpg",
        content: []
    },
    {
        path: "desired-route-monster",
        title: "DESIRED Routeに登場する予定だった敵モンスター",
        description:
            "DESIRED Routeに登場する予定だった敵モンスターについて話します",
        createdAt: new Date(""),
        updateAt: new Date(""),
        imageUrl: "/assets/kamausagi.png",
        content: []
    }
];
