import * as t from "../type";

export const pages: Array<t.Article> = [
  {
    path: "will",
    title: "アドベントカレンダー 20歳の-遺書- ナルミンチョ版",
    createdAt: new Date("2019-12-22T00:00:00"),
    updateAt: new Date("2019-12-22T00:00:00"),
    description: "Definyを作ることになった流れを話します",
    imageUrl: "/assets/definy20190212.jpg",
    extendScriptPath: null,
    contents: [
      t.p([
        t.link("https://note.com/kishworlds/n/n88908817f7c3", "元ネタ"),
        t.span(null, "ナルミンチョが登場する")
      ]),
      t.p([
        t.span(null, "この記事は"),
        t.link(
          "https://adventar.org/calendars/3974",
          "CPS Lab Advent Calendar 2019"
        ),
        t.span(null, "22日目の記事でもある")
      ])
    ]
  }
];
