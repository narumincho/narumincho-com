import * as type from "../type";

export const page = {
    title: "ページが見つかりませんでした",
    description: "ページが見つかりませんでした",
    imageUrl: "",
    content: [
        type.p([], "削除されたページか、存在しないページにアクセスしました"),
        type.p([], "ホームに戻ってお求めのページを探してください")
    ]
};
