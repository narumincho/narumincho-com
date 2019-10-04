import * as type from "../type";

export const page: type.Page = {
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
