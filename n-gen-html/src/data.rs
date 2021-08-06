use std::collections::HashMap;
use std::iter::{FromIterator, IntoIterator};

/// 構造化された HTML
#[derive(PartialEq, Debug, Clone)]
pub struct StructuredHtml {
    /// ページの名前
    ///
    /// Google 検索のページ名や, タブ, ブックマークのタイトル, OGPのタイトルなどに使用される
    pub page_name: String,

    /// アプリかサイトの名前
    pub app_name: String,

    /// ページの説明
    pub description: String,

    /// テーマカラー
    pub theme_color: Option<css_colors::RGB>,

    /// アイコン画像のURL
    pub icon_url: url::Url,

    /// 使用している言語. None は文字が含まれていないようなページに使う
    pub language: Option<Language>,

    /// OGPに使われるカバー画像のURL (CORSの制限を受けない)
    pub cover_image_url: url::Url,

    /// ページのURL
    pub url: url::Url,

    /// Twitter Card. Twitterでシェアしたときの表示をどうするか
    pub twitter_card: TwitterCard,

    /// Web App マニフェストのURL
    ///
    /// https://developer.mozilla.org/en-US/docs/Web/Manifest
    pub web_app_manifest_url: Option<url::Url>,

    /// 全体に適応されるスタイル. CSS
    pub style: Option<String>,

    /// スタイルのURL
    pub style_url_list: Vec<url::Url>,

    /// ES Modules 形式のJavaScript
    pub script: Option<String>,

    /// スクリプトのURL
    pub script_url_list: Vec<url::Url>,

    /// body の class
    pub body_class: Option<String>,

    /// body の 子要素
    pub children: Vec<HtmlElement>,
}

/// ナルミンチョが使う言語
#[derive(PartialEq, Eq, Debug, Clone)]
pub enum Language {
    Japanese,
    English,
    Esperanto,
}

/// Twitter Card。Twitterでシェアしたときの表示をどうするか
#[derive(PartialEq, Eq, Debug, Clone)]
pub enum TwitterCard {
    SummaryCard,
    SummaryCardWithLargeImage,
}

/// HtmlElement
#[derive(PartialEq, Eq, Debug, Clone)]
pub struct HtmlElement {
    /**
     * 要素名 `h1` や `div` など
     */
    pub name: String,
    pub attributes: std::collections::HashMap<String, Option<String>>,
    pub children: HtmlChildren,
}

/// HtmlElementの 子要素
#[derive(PartialEq, Eq, Debug, Clone)]
pub enum HtmlChildren {
    ElementList(Vec<HtmlElement>),
    Text(String),
    RawText(String),
    NoEndTag,
}

impl HtmlElement {
    /// HtmlElement を構築する
    pub fn new<Name: Into<String>>(
        name: Name,
        attributes: Vec<(String, Option<String>)>,
        children: HtmlChildren,
    ) -> Self {
        HtmlElement {
            name: name.into(),
            attributes: HashMap::<String, Option<String>>::from_iter(attributes.into_iter()),
            children,
        }
    }
}
