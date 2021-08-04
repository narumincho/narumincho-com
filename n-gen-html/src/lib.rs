pub fn structured_html_to_html_as_string(_structured_html: &StructuredHtml) -> String {
    "<!DOCTYPE html>
    <html lang=\"ja\">
    
    <head>
        <meta charset=\"UTF-8\">
        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
        <title>ナルミンチョの創作記録</title>
        <script type=\"module\" src=\"/program\">
        </script>
    </head>
    
    <body>
      init
    </body>
    
    </html>"
        .to_string()
}

pub struct StructuredHtml {
    /**
     * ページ名
     *
     * Google 検索のページ名や, タブ, ブックマークのタイトル, OGPのタイトルなどに使用される
     */
    pub page_name: String,

    /**
     * アプリ名 / サイト名 (HTML出力のみ反映)
     */
    pub app_name: String,

    /**
     * ページの説明
     */
    pub description: String,

    /**
     * テーマカラー
     */
    pub theme_color: Option<palette::Srgb>,

    /**
     * アイコン画像のURL
     */
    pub icon_url: url::Url,

    /**
     * 使用している言語. None は文字が含まれていないようなページに使う
     */
    pub language: Option<Language>,

    /**
     * OGPに使われるカバー画像のURL (CORSの制限を受けない)
     */
    pub cover_image_url: url::Url,

    /** ページのURL */
    pub url: url::Url,

    /** Twitter Card。Twitterでシェアしたときの表示をどうするか */
    pub twitter_card: TwitterCard,

    /**
     * Web App マニフェストのURL
     *
     * https://developer.mozilla.org/en-US/docs/Web/Manifest
     */
    pub web_app_manifest_url: Option<url::Url>,

    /** 全体に適応されるスタイル. CSS */
    pub style: Option<String>,

    /** スタイルのURL */
    pub style_url_list: Vec<url::Url>,

    /** ES Modules形式のJavaScript */
    pub script: Option<String>,

    /** スクリプトのURL */
    pub script_url_list: Vec<url::Url>,

    /** body の class */
    pub body_class: Option<String>,

    /** body の 子要素 */
    pub children: Vec<HtmlElement>,
}

/**
 * ナルミンチョが使う言語
 */
pub enum Language {
    Japanese,
    English,
    Esperanto,
}

/** Twitter Card。Twitterでシェアしたときの表示をどうするか */
pub enum TwitterCard {
    SummaryCard,
    SummaryCardWithLargeImage,
}

/**
 * HtmlElement
 */
pub struct HtmlElement {
    /**
     * 要素名 `h1` や `div` など
     */
    pub name: String,
    pub attributes: std::collections::HashMap<String, Option<String>>,
    pub children: HtmlChildren,
}

/**
 * HtmlElementの 子要素
 */
pub enum HtmlChildren {
    ElementList(Vec<HtmlElement>),
    Text(String),
    RawText(String),
    NoEndTag,
}
