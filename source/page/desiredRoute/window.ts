import * as type from "../../type";

export const page: type.Page = {
    path: type.SpecialPath.FotFound404,
    title: "メッセージウィンドウの話",
    description: "メッセージウィンドウについて話します",
    imageUrl: "",
    content: [
        {
            name: "h2",
            attributes: [],
            children: "ウィンドウとは"
        },
        type.p(
            [],
            "メッセージウィンドウは、キャラクターが喋ったことか、ナレーションの言葉を表示し、 プレイヤーに伝えるものです。"
        )
    ]
};
