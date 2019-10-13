import * as type from "../type";

export const page: {
    title: string;
    description: string;
    contents: Array<type.ArticleContent>;
} = {
    title: "ページが見つかりませんでした",
    description: "ページが見つかりませんでした",
    contents: [
        {
            c: "p",
            contents: "削除されたページか、存在しないページにアクセスしました"
        },
        { c: "p", contents: "ホームに戻ってお求めのページを探してください" }
    ]
};
