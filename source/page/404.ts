import * as type from "../type";

export const page: {
  title: string;
  description: string;
  contents: Array<type.ArticleContent>;
} = {
  title: "ページが見つかりませんでした",
  description: "ページが見つかりませんでした",
  contents: [
    type.p("削除されたページか、存在しないページにアクセスしました"),
    type.p("ホームに戻ってお求めのページを探してください"),
  ],
};
