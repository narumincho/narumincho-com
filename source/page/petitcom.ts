import * as type from "../type";

export const pages: Array<type.Article> = [
  {
    path: "about-desired-route",
    title: "DESIRED Routeについて",
    createdAt: new Date("2019-10-04T22:42:00"),
    updateAt: new Date("2019-10-04T22:42:00"),
    description: "DESIRED Routeについて話します",
    imageUrl: "/assets/desiredroute-title.jpg",
    extendScriptPath: null,
    contents: [
      type.p([
        type.span(null, "DESIRED Routeは"),
        type.link("http://smilebasic.com/", "プチコン3号"),
        type.span(null, "で作られていたRPGです")
      ]),
      type.p(
        "2015年前後にメニュー画面とバトル画面とBGMが多少作られたが、マップなどグラフィック、セリフが不足して断念。"
      ),
      type.p([
        type.span(null, "当時プチコンファンミーティングのLT会に登壇した("),
        type.link(
          "https://www.itmedia.co.jp/pcuser/articles/1510/20/news137_3.html",
          "IT mediaの記事"
        ),
        type.span(null, ")。そのことが少しだけ記事に書かれている。"),
        type.link(
          "http://penkogoma.blog6.fc2.com/?mode=m&no=223&photo=true",
          "「ペンコ改の知らね」(プチコンファンミーティングin東京レポートその3)"
        ),
        type.span(null, "でも紹介されている")
      ])
    ]
  },
  {
    path: "message-window",
    createdAt: new Date("2015-09-20T00:00:00"),
    updateAt: new Date("2019-10-04T22:14:00"),
    title: "メッセージウィンドウの話",
    description: "メッセージウィンドウについて話します",
    imageUrl: "/assets/window.jpg",
    extendScriptPath: null,
    contents: [
      type.section("メッセージウィンドウとは", [
        type.p(
          "メッセージウィンドウは、登場人物やが言ったことや、ナレーションの言葉を表示し、プレイヤーに伝えるUIです。DESIRED Routeを作る上で、登場人物たちのセリフをプレイヤーに伝えるために必要でした。市販のゲームを見てどんなメッセージウィンドウを作れば良いか考えてみよう!"
        )
      ]),
      type.section("市販のゲームの例", [
        type.section("新世界樹の迷宮", [
          type.p([
            type.span(null, "("),
            type.link(
              "https://www.atlus.co.jp/title-archive/ssq/",
              "新世界樹の迷宮"
            ),
            type.span(null, "はNintendo 3DSのRPG)")
          ]),
          type.normalImage(
            "window-sqq.jpg",
            "新世界樹の迷宮のメッセージウィンドウ"
          ),
          type.list([
            "青の半透明の背景に、水色の文字、20文字3行",
            "文字はすべて同じ幅でなく、句読点「、」などで位置が調整される(プロポーショナルフォント?)",
            "LかRボタンを押している間、ウィンドウの表示をOFF",
            "ボタンで進める(長押しで、すべて文字を表示したら進める)",
            "Yボタン長押しで、メッセージスキップ",
            "話している人の名前の表示がない"
          ]),
          type.p(
            "またウィンドウ非表示中でもAボタンを押したら話を進めてしまうというバグもあった。(新世界樹の迷宮2で修正)"
          )
        ]),
        type.section("BRAVELY DEFAULT", [
          type.p([
            type.span(null, "("),
            type.link(
              "http://www.jp.square-enix.com/bdfts/",
              "BRAVELY DEFAULT"
            ),
            type.span(null, "はNintendo 3DSのRPG)")
          ]),
          type.normalImage("bdff.jpg", "BRAVELY DEFAULTのイベント画面"),
          type.list([
            "黒の背景に、白の文字、25文字2行",
            "すべて文字は同じ幅で、句読点「、」などで位置が調整されない(等幅フォント?)",
            "Aボタンで進める(長押しでは、進めない)",
            "Yボタンでボイス合わせて進めるオート",
            "Xボタンでスキップ",
            "常に名前表示あり"
          ]),
          type.p(
            "2行とすることで1つのページにセリフがたくさん表示されないようにしている。実際2行で十分なことが多い。"
          )
        ]),
        type.p(
          "また、推理ゲームなどに多かったが、セリフのログが残されていて後で確認できるようになっているものも最近はある。"
        )
      ]),
      type.section("DESIRED Routeでは", [
        type.p(
          "DESIRED ROUTEでは、現代的な快適さとシンプルさを合わせ持つように、"
        ),
        type.normalImage(
          "window.jpg",
          "DESIRED Routeでのメッセージウィンドウ表示"
        ),
        type.list([
          "青の半透明の背景に、白の文字、20文字3行",
          "文字はすべて同じ幅で、句読点「、」などで位置が調整されない",
          "Aボタンで進める",
          "Aボタン長押しで、メッセージスキップ",
          "名前表示ありと、名前表示なしを変更できる"
        ]),
        type.p(
          "にしました。このRPGは下画面にメニューを常に表示しているので、上画面のウィンドウに使えるボタンはAボタンだけですが、Aボタン長押しでメッセージスキップもできるようにしています。"
        )
      ]),
      type.section("ページ内スキップ", [
        type.p(
          "他に、スキップ以外に快適さに必要なのは、ページ内スキップです。ページ内スキップとは、文字がぽつぽつ表示されている途中に、Aボタンを押すと、セリフの文字が一気に表示される機能です。忘れがちの処理ですが、有ると無いとでは、かなりと操作感が違います。紹介してきたRPG全てと、このDESIRED ROUTEはページ内スキップ機能はあります。PRGは文字で内容を伝えるゲームだと思うので、ウィンドウはこだわるべきです。"
        )
      ]),
      type.section("文字の配色", [
        type.p(
          "開発初期のメッセージウィンドウの文字色は、10種類の中から選ぶことができましたが、色を多用していると何が重要かわからなくなってしまうのです。"
        ),
        type.normalImage(
          "bad-color-message-window.jpg",
          "10種類の文字色を使用したメッセージウィンドウの表示"
        ),
        type.p(
          "というわけで、文字色は、白とオレンジと水色の3種類に絞りました。"
        ),
        type.normalImage(
          "simple-color-message-window.jpg",
          "3色を使ったメッセージウィンドウの表示"
        ),
        type.p("オレンジは重要な単語につけることとします。"),
        type.window([
          type.span("window-strong", "テアー"),
          type.span("window-normal", "を持ってきてくれ。")
        ]),
        type.p("水色はシステムなどの説明に使うことにします。"),
        type.window([
          type.span(
            "window-info",
            "このRPGでは、下画面の決定をYボタンとします。"
          )
        ])
      ])
    ]
  },
  {
    path: "desired-route-font",
    title: "DESIRED RouteとNPIMEのフォントの描画処理",
    description: "DESIRED RouteとNPIMEのフォントの描画処理について話します",
    createdAt: new Date("2015-09-22"),
    updateAt: new Date("2019-10-08"),
    imageUrl: "/assets/font.jpg",
    extendScriptPath: null,
    contents: [
      type.section("漢字表示処理を自作する理由", [
        type.p(
          "プチコン3号のPRINTで出力されるコンソールの表示の文字は小さいです。こんな小さな文字を見ていると目が疲れてきます。初期バージョンは漢字が表示できなかったが、今はプチコン3号の更新により美咲フォントによってJIS第1水準相当までの漢字が表示されます。"
        ),
        type.normalImage("font-petitcom3.jpg", "プチコン3号のコンソール表示")
      ]),
      type.section("経緯", [
        type.p(
          "そこで、16x16の1マスに手書きで文字を書いて、BGで表示することにしました。グラフィック面に書いてもいいのですが、グラフィック面への描画速度が遅いので使いませんでした"
        ),
        type.normalImage("freehand-font.jpg", "手書きの文字表示"),
        type.p(
          "手書きフォントでは読みづらいので、MicrosoftWordのMSゴシックで50音を入力して、コピーし、Microsoft Paintに貼り付けて、パソコンの画面を見ながら、フォントを作成しました"
        ),
        type.normalImage(
          "ms-paint-font.png",
          "Microsoft Paintでのフォントの表示"
        ),
        type.normalImage(
          "message-window-font.jpg",
          "MSゴシックをプチコンで表示"
        ),
        type.p(
          "しかし、BGでやると1文字1文字の色を変えられないので、スプライトを使うことにしました。BGCOLOR命令で、できそうだが1チップごとの指定ではない。レイヤーを何枚か使えばできなくもないが、 あんまりウィンドウにBGを何枚も使いたくなかった"
        ),
        type.normalImage(
          "window.jpg",
          "スプライトを使ったメッセージウィンドウ"
        ),
        type.p(
          "また、文字の種類がGRP4の512x512のサイズに左右されてしまい、他のキャラクターの画像も同じ1枚に収めなければならなかったので、160種類の漢字しか使えませんでした。"
        ),
        type.normalImage(
          "font-data-sprite-grp.jpg",
          "スプライトで使うグラフィック面"
        ),
        type.p([
          type.span(null, "そこで、ほしけんさんの"),
          type.link(
            "http://wiki.hosiken.jp/petc3gou/?Toukou%2F%A5%D7%A5%C1%A5%B3%A5%F3%B4%C1%BB%FA%A5%E9%A5%A4%A5%D6%A5%E9%A5%EA",
            "プチコン漢字ライブラリ"
          ),
          type.span(
            null,
            "を使うことにしました。このライブラリは素晴らしく、フォントデータはテキスト形式なので、GRPを使わず、JIS第2水準までの漢字が扱えます。ですが、グラフィック面に直接書くタイプなので、改造をし、ひらがなカタカナはGRP4に最初から書いておき、漢字が、必要になったらGRP4に書いて、スプライトで使うようにしました。うまく漢字を分担させる機能もあり、普通に使うよりも速度が上がっていると思います"
          )
        ]),
        type.p(
          "漢字表示ライブラリには、 沢山のフォントとエフェクトをサポートしていますが、 東雲ゴシック16を右にずらした 影つきの書体のみを使用することにしました。 また、東雲フォントはパブリックドメインなので、 著作権に心配することもなくなりました。"
        )
      ]),
      type.section("その後の発展", [
        type.p(
          "今回のRPGでは、フォントの処理方法は、これに決定しましたが、 また作ることがあれば、複数のサイズのフォントを扱えるようにしたいです。SPSCALE命令でもできなくはないが、縮小すると輪郭がギザギザして見える"
        )
      ])
    ]
  },
  {
    path: "list-select-behavior",
    title: "リストUIのボタン操作の挙動",
    description: "リストUIのボタン操作の挙動について話します",
    createdAt: new Date("2015-10-18"),
    updateAt: new Date("2019-10-09"),
    imageUrl: "/assets/list-ui.jpg",
    extendScriptPath: null,
    contents: [
      type.section("挙動を考えた理由", [
        type.p(
          "バトルのプログラムを書いている途中に、リストアップされた項目の選択の処理を メニュー画面を処理を統一出来たらいいなと思い、選択の処理を改善しました。"
        ),
        type.p(
          "そのコード改良で整理した、ページがあるリストの選択処理について話したいと思います。こんなこと考えるのは、つまらないかもしれないけど私の中では大切な処理です。ちゃんとしたゲームまたは、ツールを作る人はこういうこともしっかり考えて欲しいです。"
        )
      ]),
      type.section("ボタンリピート", [
        type.p(
          "何かの選択画面で十字ボタンを長押ししたら普通、 「トッ、…トトトトトトト」と鳴ると思います。 押した瞬間に反応する「トッ」 少し時間を空いてから連続してカーソルが動く「トトトトトトト」 何気ないこの選択時の音の間隔からわかるカーソルの動くタイミングですが、 これがあると無いとでは、選択する項目が多い場合の操作性が大きく異なります。 選択する項目が5つ以上ある場合は必須と言えるでしょう。"
        ),
        type.p(
          "これから「トッ」を初押し、 「トトトトトトト」を連続押しと略して言います。"
        ),
        type.p(
          "プチコン3号ではBREPAT命令で手軽に作れますが、タッチ時の処理と統一できたり、初押しと連続押しが判断できるように自作した方がいいです。 こだわるなら。"
        )
      ]),
      type.section("ページ送り", [
        type.p(
          "画面上で1番下を選択しているときに、 下を押すと、すべての項目が1項目分上に動き、 下の項目が出るようにします。 これと、上にスクロールする処理を書けばページができます。"
        ),
        type.p(
          "もっと言うと、ページがあるのならば、右ボタンでページ送り、左ボタンでページを戻せるようにすべきです。 早く下の方にある項目にアクセスできるようになります。 ここでページ送りの時に、画面上の相対位置を維持するということを頭に入れて欲しいです。 なぜなら、ページと絶対位置を同じ分だけ動かすと、ページが1番下にぶつかった時、画面上の相対位置がずれることがあるからです。"
        ),
        type.blockCodeNoHightLight("相対位置=絶対位置-ページの位置"),
        type.p(
          "でいったん相対位置を出して、 ページの飛び出し防止処理をした後に"
        ),
        type.blockCodeNoHightLight("絶対位置=ページ位置+相対位置"),
        type.p("と絶対位置を求めたほうが確実です。"),
        type.p(
          "発売されているソフトでも相対位置がずれることがよくあります。 まあそれくらい気にしなくても良いことかもしれませんが。"
        )
      ]),
      type.section("ループ", [
        type.p(
          "ループは、 1番上の項目を選択しているときに、上ボタンを押すと1番下、1番下の項目を選択しているときに、下ボタンを押すと、 1番上を選択するものです。"
        ),
        type.p(
          "連続押しでループさせるかしないかは、 微妙なところでありますが、上下ボタンで連続押しのループは気持ちいいので、私はおすすめします。ページ送りボタンでのループをさせる場合は、初押しのみにすべきです。 ちなみに世界樹の迷宮ではページ送りでのループがありません。 「ブブー」と音が鳴ります。 ウォークマンではループします。"
        )
      ]),
      type.section("まとめ", [
        type.section("下ボタンを押す", [
          type.p(
            "1番下の項目を選択をしているのならば、 1番上の項目を選択する。 画面上の1番下の項目を選択していたのならば、 下に1つスクロールして1つ下を選択する。 それ以外は普通に選択の位置を1つ上にする。"
          )
        ]),
        type.section("上ボタンを押す", [
          type.p(
            "1番上の項目を選択をしているのならば、 1番下の項目を選択する。 画面上の1番上の項目を選択していたのならば、 上に1つスクロールして1つ上を選択する。 それ以外は普通に選択の位置を1つ上にする。"
          )
        ]),
        type.section("ページ送りボタンを押す", [
          type.p(
            "1番下の項目を選択をしている。かつ連続押しでなく初押し。ならば、 1番上の項目を選択する。 ページが1番下ならば1番下を選択する。 それ以外は画面に表示している項目の数の分だけ下を、 選択、スクロールすればいいが、 相対位置を出して、飛び出しを防ぐ処理してから、絶対位置を求めます。"
          )
        ]),
        type.section("ページ戻りボタンを押す", [
          type.p(
            "1番上の項目を選択をしている。かつ連続押しでなく初押し。ならば、 1番下の項目を選択する。 ページが1番上ならば1番上を選択する。 それ以外は画面に表示している項目の数の分だけ上を、 選択、スクロールすればいいが、 相対位置を出して、飛び出しを防ぐ処理してから、絶対位置を求めます。"
          )
        ])
      ])
    ]
  },
  {
    path: "ui-color",
    title: "UIの配色",
    description: "",
    createdAt: new Date("2015-11-02"),
    updateAt: new Date("2019-10-09"),
    imageUrl: "/assets/color.png",
    extendScriptPath: null,
    contents: [
      type.section("配色ミス", [
        type.p(
          "DESIRED Routeで私が一番最初に作ったUIです。その頃の私は未熟でした。 配色について一切考えていませんでした。 見づらく、目が痛くなるような配色。 最悪です。"
        ),
        type.normalImage("initial-item-menu.jpg", "初期のITEMメニュー"),
        type.quote([
          type.p("配色には"),
          type.list([
            "ベースカラー70%",
            "メインカラー25%",
            "アクセントカラー5%"
          ]),
          type.p(
            "のバランスで3色をベースに構成するっていう基本テクがあるよ。 配色を工夫することで同じUIでもよりプロっぽく見せられるよ。"
          )
        ]),
        type.p(
          "という親切なコメントをMiiverseでしてくれました。コメントしてくれた人、ありがとうございます。ベースカラーは緑、メインカラーは青、アクセントカラーは赤です。"
        ),
        type.normalImage("list-ui.jpg", "改良したITEMメニュー"),
        type.p(
          "ITEMメニューはこのような感じになりました。 まだ、それっぽく魅せる比率に完全に則していないので、 改良が必要ですけれどね。今作の所は良いとしましょう。"
        )
      ]),
      type.section("全体的な統一感", [
        type.p("良い例として、新世界樹のバトル画面"),
        type.normalImage("ssq_battle.jpg", "新世界樹の迷宮のバトル画面"),
        type.p(
          "ベースカラー青、メインカラーは薄い緑、アクセントカラーは黄色。メニュー画面は、"
        ),
        type.normalImage("ssq_menu.jpg", "新世界樹の迷宮のメニュー画面"),
        type.p(
          "全体的に統一感がありますよね。構造的にも似ていますが、ベースカラーは青と決まっていて綺麗です。 ちなみに世界樹の迷宮シリーズは作品ごとにベースカラーが青、緑、青、緑と交互になっています。"
        )
      ]),
      type.section("悪い例", [
        type.normalImage("seven_battle.jpg", "セブンスドラゴンのバトル画面"),
        type.p(
          "悪い例としてセブンスドラゴンⅢ code:VFD 。 ベースカラーは黒、メインカラーとアクセントカラーは同じ黄色になってしまっている。 2色であると何か、変な感じがする。この画面だけじゃわかりにくいですが、 選択している項目によってアクセントカラー(今、黄色の所)が変わるので、チカチカして見えます。 慣れたら大したことが無いかもしれないが、コロコロ色を変えるべきじゃないです。なぜかアイテムボックスの右枠がオレンジ、左枠は黄色と色が違っている。左右で色を変える意味がわからない。"
        ),
        type.p(
          "SKILL(SHILLに見える)では、アクセントカラーがオレンジになるのだが、その場合は、左右の枠は共にアクセントカラーのオレンジである。"
        ),
        type.p(
          "また、選択している項目(ここでは、メディスⅠ)の色の抜け方があまりにも急で ベースカラーと近い色になるタイミングが多い。 もう少し変化を抑えたほうが良い。"
        ),
        type.normalImage("seven_menu.jpg", "セブンスドラゴンのメニュー画面"),
        type.p(
          "次はメニュー画面の話になるのだが、この画面は何をしているところだろうか。"
        ),
        type.p(
          "アイテムを選んでいるのではなく、メディスⅠの使用する対象者を選んでいるところなのだ。 わかりにくいので、メディスⅠの色をいつもと違う色に反転させるか、 アイテム欄の所を暗転させるか、消すかするべきだ。"
        ),
        type.p("DESIRED Routeでは、アイテム欄を暗転させて中央に表示している。"),
        type.normalImage(
          "item-select-target.jpg",
          "DESIRED Routeのアイテム使用対象者選択画面"
        ),
        type.p(
          "見た目の話ではないが、セブンスドラゴンはボタンを押しで反応を見た感じでは、なんかプログラムに無駄な処理が通ってる感じがします。そんなもんだから、「プログラムはまるで迷宮だ」 (ゲーム中に登場するセブンスエンカウントの開発者の話) とか言ってしまうのだろう。ちゃんと設計を考えて作れば迷わない。"
        )
      ]),
      type.section("ちょっとした挑戦", [
        type.p(
          "DESIRED Routeでは、 主人公の今いる場所によって UIのベースカラーとメインカラーが変わったら面白いんじゃないかと思い、 そういう仕組を作っています。"
        ),
        type.p(
          "新しいダンジョンに入った時、変わったなという雰囲気を モンスターやマップチップだけでなく、 GUIの色を変えることによっても演出する。すでに世界樹の迷宮のメニュー画面の背景画像は場所によって違いますけどね。"
        )
      ])
    ]
  },
  {
    path: "desired-route-encounter",
    title: "モンスターとのエンカウントについて",
    description: "モンスターとのエンカウントについて",
    createdAt: new Date("2015-11-08"),
    updateAt: new Date("2019-10-09"),
    imageUrl: "/assets/battle.jpg",
    extendScriptPath: null,
    contents: [
      type.section("エンカウントとは", [
        type.p(
          "エンカウントとは、捜索パートで歩いている時にモンスターと出会い、戦闘パートに移行することです。"
        ),
        type.p(
          "シンボルエンカウントという、目に見える敵と接触して戦闘に移行する物もありますが、少し面倒なのでDESIRED Routeでは、マップ上見えない敵にのみエンカウントします。"
        )
      ]),
      type.section("エンカウントするタイミング", [
        type.p(
          "エンカウントは場所によって度合いが違います。 森では普通にエンカウントしていいですが、 街でエンカウントしたらおかしいです。 また、遺跡ではギミックに集中させるために敵が少なかったりするので、 場所ごとで度合いを設定するべきでしょう。"
        ),
        type.p(
          "1歩 歩くごとに指定した確率にしたがってエンカウントするかと調べる方法がありますが、 運が悪い場合、戦闘が終わったあと、1歩 歩いたら、またエンカウントする可能性があります。 戦闘が終了したらある程度エンカウントしない歩数が保証されるべきです。"
        ),
        type.p(
          "というわけで、思いついた方法は、エンカウントする歩数の下限上限を指定することです。 戦闘が終了したあとにエンカウントするまでの歩数を指定した範囲内で決めます。 そして1歩 歩くごとにその数を減らして、0になったらエンカウントします。"
        ),
        type.p("DESIRED Routeでのエンカウントのデータでは次のように指定します"),
        type.blockCodeNoHightLight(
          "[エンカウントする歩数の下限]～[エンカウントする歩数の上限]"
        ),
        type.p("エンカウントしない場合は ∞ を指定します。"),
        type.p(
          "この方法は世界樹の迷宮シリーズなどでも使われているみたいです。後で確認したところ、世界樹は減らす数が1固定ではなく1マスごとに0～3くらいに個々に設定されているそうです。"
        ),
        type.normalImage("sq-encounter.jpg", "世界樹の迷宮の捜索パートの画面"),
        type.p(
          "世界樹の迷宮の面白い所はどれくらいでエンカウントするか、 色によって可視化していることです。 この表示は「エネミーアピアランス」というそうです。「あ、表示が赤い! 後もう少しでエンカウントするから 今のうちにFOE(フィールド上に見える強い敵)から逃げておこう」 みたいな感じで駆け引きがしやすくなっています。"
        )
      ]),
      type.section("エンカウントするパーティデータ", [
        type.normalImage(
          "desired-route-encounter-data.jpg",
          "DESIRED Routeのエンカウントのデータ"
        ),
        type.p(
          '前は"50[1,2]30[1]20[2]"で、50%の確率で1と2の敵、30%の確率で1の敵、20%の確率で2の敵、と短い文字列でやろうとしたのですけれど、 データをパースして処理することが少し面倒であることと、次の方法の方が見やすいと思い、この方法にしました。'
        ),
        type.blockCodeNoHightLight(`DATA [指定する敵パーティになる確率(%指定)],"[敵パーティの文字列(カンマ区切り)]"
    DATA [指定する敵パーティになる確率(%指定)],"[敵パーティの文字列(カンマ区切り)]"
    DATA [指定する敵パーティになる確率(%指定)],"[敵パーティの文字列(カンマ区切り)]"
    ………`),
        type.p(
          "確率の合計が100になったら読み込みを終了します。それぞれのモンスターの表示位置を指定する方法はまだ未定ですが、今作のモンスターは大きさが近いので、数によって左から順に置いていけば良いでしょう。"
        )
      ])
    ]
  },
  {
    path: "star",
    title: "星の図形について",
    description: "星の図形について",
    createdAt: new Date("2016-01-01"),
    updateAt: new Date("2019-10-10"),
    imageUrl: "/assets/star.jpg",
    extendScriptPath: "star.ts",
    contents: [
      type.divForScript("star"),
      type.p(
        "タイトル画面の下画面にαバージョンでは、星の模様が 描かれていく、アニメーションを見ることができます。"
      ),
      type.normalImage("press-any-button.jpg", "タイトルの下画面の星の模様"),
      type.p(
        "私は星の図形に思い入れがあります。 今回は星の図形について話したいと思います。"
      ),
      type.section("七芒星の可能性", [
        type.normalImage("star-5.jpg", "五芒星"),
        type.p(
          "これは皆さんご存知な「五芒星」です。 中学1年生の時、ふと思ったのです。7つの頂点がある星がないのかと… 五芒星は中心に正五角形があるので、大きな紙に正七角形を書き、辺を伸ばしてみたのです。そしたら、このような図形ができました。"
        ),
        type.normalImage("star-7-pre.jpg", "七芒星?"),
        type.p(
          "思った以上に、綺麗じゃない… そして、諦めずに更に辺を伸ばすと…! 綺麗な星ができました。「七芒星」です。"
        ),
        type.normalImage("star-7.jpg", "七芒星"),
        type.p(
          "定規(目盛りを使わない)っとコンパスによる作図では正七角形が作図できないので「正七芒星」というものは描くことはできません。転じて「不可能を可能にする」という意味もあるそうです。"
        )
      ]),
      type.section("その後の発展", [
        type.p(
          "そのあと、辺を伸ばして描く方法よりも、いい方法を思いつきました。"
        ),
        type.p(
          "円周上にn間隔に点を描き、1番上の点から(n-1)/2飛ばしに一筆書きのように点を繋いでいく。"
        ),
        type.p(
          "とやると描けます。 そのことを友達に教えたら一緒に、 「九十九芒星」くらいまで描きました。 懐かしい思い出です。"
        ),
        type.p(
          "次は、違う方向から考えていきます。 (n-1)/2ずつ飛ばすと決めていましたが、 1つ飛ばしから(n-1)/2飛ばしまでの図形を重ねてみます。"
        ),
        type.normalImage("star-7-2.jpg", "七芒星の内側にも線を含めたもの"),
        type.normalImage("star-15.jpg", "十五芒星の内側にも線を含めたもの"),
        type.normalImage("star-29.jpg", "二十九芒星の内側にも線を含めたもの"),
        type.normalImage("star-77.jpg", "七十七芒星の内側にも線を含めたもの"),
        type.p(
          "最後の七十七芒星のやつは拡大しましたが。 綺麗な模様になったと思います。"
        ),
        type.p(
          "製作者のKish.から「テーマは星だ。」と言われてから、 こういう図形のことを懐かしく思い、話を整理しました。 テーマが星の作品は多々ありますが、こういう面で星を見ることは少ないと思います。"
        )
      ])
    ]
  },
  {
    path: "desired-route-monster",
    title: "DESIRED Routeに登場する予定だった敵モンスター",
    description:
      "DESIRED Routeに登場する予定だった敵モンスターについて話します",
    createdAt: new Date(""),
    updateAt: new Date("2019-10-13"),
    extendScriptPath: null,
    imageUrl: "/assets/kamausagi.png",
    contents: [
      type.imageList([
        {
          title: "悪魔の手",
          fileName: "akumanote.jpg"
        },
        {
          title: "アルコールランプ",
          fileName: "alcohol_lamp.jpg"
        },
        {
          title: "バンモン",
          fileName: "banmon.jpg"
        },
        {
          title: "バラの戦士",
          fileName: "baranosensi.jpg"
        },
        {
          title: "電球ホタル",
          fileName: "denkyu-hotaru.jpg"
        },
        {
          title: "泥団子",
          fileName: "dorodango.jpg"
        },
        {
          title: "ゴブリン",
          fileName: "goburin.jpg"
        },
        {
          title: "骨のオーガ",
          fileName: "honeno-oga.jpg"
        },
        {
          title: "ほねつむり",
          fileName: "honetumuri.jpg"
        },
        {
          title: "フードゴブリン",
          fileName: "hood_goburin.jpg"
        },
        {
          title: "一角デメキン",
          fileName: "ikkakudemekin.jpg"
        },
        {
          title: "かまうさぎ",
          fileName: "kamausagi.png"
        },
        {
          title: "カメレオン",
          fileName: "kamereon.jpg"
        },
        {
          title: "枯れ葉宿り",
          fileName: "karahayadori.jpg"
        },
        {
          title: "勾魂",
          fileName: "katamari.jpg"
        },
        {
          title: "木の葉虫",
          fileName: "kinohamusi.jpg"
        },
        {
          title: "紅葉の精",
          fileName: "kouyounosei.jpg"
        },
        {
          title: "メバナ",
          fileName: "mabana.jpg"
        },
        {
          title: "マッシュ",
          fileName: "massyu.jpg"
        },
        {
          title: "ミノカマキリ",
          fileName: "minokamakiri.jpg"
        },
        {
          title: "もぐねずみ",
          fileName: "mogunezumi.jpg"
        },
        {
          title: "モグライダー",
          fileName: "moguraida.jpg"
        },
        {
          title: "なまけデビル",
          fileName: "namakedebiru.jpg"
        },
        {
          title: "ナマコ",
          fileName: "namako.jpg"
        },
        {
          title: "ノナン",
          fileName: "nonan.png"
        },
        {
          title: "龍の指輪",
          fileName: "ryuno-udewa.jpg"
        },
        {
          title: "神秘的なやつ",
          fileName: "shinpitekinayatsu.jpg"
        },
        {
          title: "ソール",
          fileName: "so-ru.jpg"
        },
        {
          title: "トカゲナイト",
          fileName: "tokagenaito.jpg"
        },
        {
          title: "強そうなザコ",
          fileName: "tsuyosouna.jpg"
        },
        {
          title: "ツタマネ",
          fileName: "tutamane.jpg"
        },
        {
          title: "ウパナリア",
          fileName: "upanaria.jpg"
        },
        {
          title: "うるおいわかば",
          fileName: "uruoi_wakaba.jpg"
        },
        {
          title: "邪教の使者",
          fileName: "zyasinnoshisya.jpg"
        }
      ])
    ]
  },
  {
    path: "n-petitcom-ime",
    title: "Nプチコン漢字入力(N Petitcom IME)",
    description: "Nプチコン漢字入力(N Petitcom IME)について話します",
    createdAt: new Date(""),
    updateAt: new Date("2019-10-15"),
    extendScriptPath: null,
    imageUrl: "/assets/henkan.jpg",
    contents: [
      type.p(
        "Nプチコン漢字入力(N Petitcom IME)はプチコン3で日本語の文章を簡単に編集できるようになるアプリです。公開キー🔑 BEREV2HV"
      ),
      type.p([
        type.link(
          "http://wiki.hosiken.jp/petc3gou/?Toukou%2FNPetitcomIME",
          "プチコン3号&BIGまとめWikiでも投稿しています"
        )
      ]),
      type.section("概要", [
        type.p(
          "プチコン3号で漢字入力ができます。 特徴としては、フリック入力ができ、入力している最中に変換が出てきます。 今までの漢字入力ソフトと違う点として、スロットの内容をそのまま編集できます。作者のやる気が無くなったので永遠のversion Betaですが、ほぼ完成しています。 やる気のある人は自由に改造して、使いやすくしてください。癖の強いコードで大変だと思いますが。プチコン漢字ライブラリのフォントデータ(東雲フォント)を使っていますが、コードに埋め込んでいるので、1ファイル単体で動きます。Undo/Redoは、できません! QWERTYキーボードでは、上にフリック入力すると、キーに書かれた記号を入力し、下にフリックすると大文字小文字がキーに表示されているものと逆の文字を入力します。"
        )
      ]),
      type.section("操作方法", [
        type.definitionList([
          { key: "十字ボタン", value: "キャレット移動" },
          { key: "Aボタン", value: "改行" },
          { key: "Bボタン", value: "半角スペース" },
          { key: "Yボタン", value: "BackSpace" },
          { key: "Xボタン", value: "貼り付け" },
          { key: "スライドパッド", value: "ページ送り" },
          { key: "ZL/ZRボタン", value: "スロット切り替え" },
          { key: "L/Rボタン + Aボタン", value: "1行コピー" },
          { key: "L/Rボタン + Yボタン", value: "1行切り取り" },
          {
            key: "L+Rボタン + スライドパッド",
            value: "先頭/末尾へ移動"
          }
        ])
      ]),
      type.section("スクリーンショット", [
        type.imageList([
          { title: "上画面", fileName: "npime-code.jpg" },
          { title: "日本語入力", fileName: "npime-jpn-keyboard.jpg" },
          { title: "入力途中", fileName: "henkan.jpg" },
          { title: "変換一覧", fileName: "npime-henkan-full.jpg" },
          {
            title: "QWERTYキーボード",
            fileName: "qwerty.jpg"
          },
          { title: "テンキー", fileName: "npime-numeric.jpg" },
          { title: "記号キーボード", fileName: "npime-sign.jpg" }
        ])
      ]),
      type.section("使用者の声", [
        type.twitterEmbedded(
          `<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ナルミンチョさんの、Nプチコン漢字入力 ヤバすぎ。スマイルツールに標準搭載されるべき。<br>スマイルツールから起動すれば、フリック入力や漢字変換でソースコード編集しまくり。<br>捗るってレベルじゃないよコレ</p>&mdash; ぷちぷち (@puchipuchi3g) <a href="https://twitter.com/puchipuchi3g/status/981534159687438336?ref_src=twsrc%5Etfw">April 4, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`
        ),
        type.twitterEmbedded(
          `<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">INKEY$の仕様上操作に制約あるけど、やりたいことできてきた！ <a href="https://twitter.com/hashtag/petitcom?src=hash&amp;ref_src=twsrc%5Etfw">#petitcom</a> <a href="https://t.co/H1Sp81BGDk">pic.twitter.com/H1Sp81BGDk</a></p>&mdash; sou51@セガサミーフェニックスオフィシャルサポーター (@_sou51_) <a href="https://twitter.com/_sou51_/status/974946826351607808?ref_src=twsrc%5Etfw">March 17, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`
        )
      ]),
      type.section("対応文字", [
        type.p(
          "対応文字は以下の通りです。ちなみに対応していない文字は豆腐で表示します。"
        ),
        type.normalImage("tofu.png", "豆腐(対応していない文字を表現する文字)"),
        type.section("高速描画可", [
          type.p("スプライトのGRPに最初に描画して、以降は高速に表示できる文字"),
          type.section("ASCII", [
            type.p(
              " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~"
            ),
            type.p(
              "\\バックスラッシュはプチコンの8x8フォントに従い、円マーク。 ただし、DIALOG命令で表示した時はバックスラッシュになるので注意"
            )
          ]),
          type.section("ひらがな", [
            type.p(
              "ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろわをん"
            ),
            type.p("「ゎゐゑ」は随時描画で表示する。")
          ]),
          type.section("カタカナ", [
            type.p(
              "ァアィイゥウェエォオ カガキギクグケゲコゲ サザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロワヲンヴ"
            ),
            type.p("「ヮヰヱヵヶ」は随時描画で表示する。")
          ]),
          type.section("よく使う記号", [
            type.p("、。・「」ー〜…"),
            type.p("改行LF(LF表記はなし)"),
            type.p("改行CR(CR表記はあり)"),
            type.p(
              "PCでは入力できない場合があるが。〜は波ダッシュ(U+301C) プチコンで入力できるのは、〜波ダッシュ(U+301C) ～全角チルダ(U+FF5E)は、「~」のフォントで緑色に表示される。"
            )
          ])
        ]),
        type.section("随時描画", [
          type.p(
            "内蔵してあるフォントデータから必要になったときに描画され、GRPに一時的に使い回せるようになっている文字"
          ),
          type.section("記号", [
            type.p(
              "゛゜´¨￣ヽヾゝゞ〃仝々〆〇―∥‘“〔〕〈〉《》『』【】±×÷≠≦≧∞∴♂♀°′″℃￥￠￡§☆★○●◎◇◆□■△▲▽▼※〒→←↑↓〓∈∋⊆⊇⊂⊃∪∩∧∨￢⇒⇔∀∃∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬Å‰♯♭♪†‡¶ゎゐゑヮヰヱヵヶΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρςστυφχψωАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя©ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ"
            ),
            type.p(
              "∥は斜めではなく垂直方向の線になる。￥と＼は別物なので注意。"
            )
          ]),
          type.section("プチコン独自文字", [
            type.p(
              "プチコンの標準キーボードで入力できる文字(すべて網羅しているわけではない)"
            ),
            type.p("一覧は画像の通り"),
            type.normalImage("npime-orignal.jpg", "プチコン独自文字一覧")
          ]),
          type.section("JIS第1水準漢字(2,965字)", [
            type.p(
              "亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"
            )
          ]),
          type.section("JIS第2水準漢字(3,390字)", [
            type.p(
              "弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠堯槇遙瑤凜熙"
            )
          ]),
          type.section("全角英数字", [
            type.p(
              "！＂＃＄％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝～"
            ),
            type.p(
              "使うことを推奨しないが、表示できないと不便なので一応。半角と同じフォントで緑色で表示。全角空白はない。"
            )
          ]),
          type.section("半角カタカナ", [
            type.p(
              "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ"
            ),
            type.p(
              "使うことを推奨しないが、表示できないと不便なので一応。黄色で表示。半角の、。「」・はない。"
            )
          ])
        ])
      ])
    ]
  }
];
