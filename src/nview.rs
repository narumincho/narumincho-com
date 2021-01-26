use std::collections::HashMap;

/// ナルミンチョが使う言語
pub enum Language {
    Japanese,
    English,
    Esperanto,
}

/// 見た目全体を表現する
pub struct View {
    /// 使用されている言語
    pub language: Option<Language>,

    /// ページのタイトル
    ///
    /// タブや, ブックマークのタイトル, OGPのタイトルなどに使用される
    pub page_name: String,

    /// body の children
    pub body: Children,
}

pub fn view_to_html_string(view: &View) -> String {
    String::from("<!doctype html>")
        + &raw_element_to_html_string(
            &(RawElement {
                tag_name: String::from("html"),
                attributes: {
                    let mut map: RawAttributes = HashMap::new();
                    if let Some(language) = &view.language {
                        map.insert(
                            String::from("lang"),
                            Some(language_to_ietf_language_tag(language)),
                        );
                    }
                    map
                },
                children: RawChildren::ElementList(vec![
                    head_element(view),
                    RawElement {
                        tag_name: "body".into(),
                        attributes: HashMap::new(),
                        children: children_to_raw_children(&view.body),
                    },
                ]),
            }),
        )
}

pub fn head_element(view: &View) -> RawElement {
    RawElement {
        tag_name: String::from("head"),
        attributes: HashMap::new(),
        children: RawChildren::ElementList(vec![
            charset_element(),
            viewport_element(),
            title_element(&view.page_name),
        ]),
    }
}

fn charset_element() -> RawElement {
    RawElement {
        tag_name: String::from("meta"),
        attributes: hashmap! {String::from("charset") => Some(String::from("utf-8"))},
        children: RawChildren::NoEndTag,
    }
}

fn viewport_element() -> RawElement {
    RawElement {
        tag_name: String::from("meta"),
        attributes: hashmap! {
            String::from("name") => Some(String::from("viewport")),
            String::from("content") => Some(String::from("width=device-width,initial-scale=1.0"))
        },
        children: RawChildren::NoEndTag,
    }
}

fn title_element(page_name: &String) -> RawElement {
    RawElement {
        tag_name: String::from("title"),
        attributes: HashMap::new(),
        children: RawChildren::Text(page_name.clone()),
    }
}

pub fn raw_element_to_html_string(raw_element: &RawElement) -> String {
    format!(
        "<{}{}>{}",
        raw_element.tag_name,
        attribute_dict_to_string(&raw_element.attributes),
        match &raw_element.children {
            RawChildren::ElementList(list) => {
                format!(
                    "{}</{}>",
                    list.iter()
                        .map(raw_element_to_html_string)
                        .collect::<String>(),
                    raw_element.tag_name
                )
            }
            RawChildren::Text(text) => format!("{}</{}>", text, raw_element.tag_name),
            RawChildren::RawText(text) => text.clone(),
            RawChildren::NoEndTag => String::from(""),
        }
    )
}

fn attribute_dict_to_string(attributes: &RawAttributes) -> String {
    if attributes.is_empty() {
        String::from("")
    } else {
        format!(
            " {}",
            attributes
                .iter()
                .map(|(key, value_maybe)| -> String {
                    format!(
                        "{}{}",
                        key,
                        match value_maybe {
                            Some(value) => format!("=\"{}\"", escape_in_html(value)),
                            None => String::from(""),
                        }
                    )
                })
                .collect::<String>()
        )
    }
}

/// HTMLで使えるようにescapeする.
///
/// 属性値でも, 本文でも使えるようにしている
pub fn escape_in_html(text: &str) -> String {
    text.replace("&", "&amp;")
        .replace(">", "&gt;")
        .replace("<", "&lt;")
        .replace("\"", "&quot;")
        .replace("\'", "&#x27;")
        .replace("`", "&#x60;")
}

pub fn language_to_ietf_language_tag(language: &Language) -> String {
    String::from(match language {
        Language::Japanese => "ja",
        Language::English => "en",
        Language::Esperanto => "eo",
    })
}

pub struct Id(String);

/// 型を保った状態の HTMLElement か SvgElement
pub enum Element {
    Div(Div),
    H1(H1),
    AnchorLink(AnchorLink),
    Image(Image),
}

pub enum Children {
    ElementList(Vec<(String, Element)>),
    Text(String),
}

pub struct Div {
    pub id: Option<Id>,
    pub children: Children,
}

pub struct H1 {
    pub children: Children,
}

pub struct AnchorLink {
    pub id: Option<Id>,
    pub url: url::Url,
    pub children: Children,
}

pub struct Image {
    pub id: Option<Id>,
    pub path: Vec<String>,
    pub alternative_text: String,
}

/// SSR ( サーバーサイドレンダリング ) するときの型のゆるい, HTMLElementか, SVGElement
pub struct RawElement {
    pub tag_name: String,
    pub attributes: RawAttributes,
    pub children: RawChildren,
}

type RawAttributes = HashMap<String, Option<String>>;

pub enum RawChildren {
    ElementList(Vec<RawElement>),
    Text(String),
    RawText(String),
    NoEndTag,
}

pub fn element_to_raw_element(element: &Element) -> RawElement {
    match element {
        Element::Div(div) => RawElement {
            tag_name: String::from("div"),
            attributes: insert_attribute_id(HashMap::new(), &div.id),
            children: children_to_raw_children(&div.children),
        },
        Element::H1(h1) => RawElement {
            tag_name: "h1".into(),
            attributes: HashMap::new(),
            children: children_to_raw_children(&h1.children),
        },
        Element::AnchorLink(anchor_link) => RawElement {
            tag_name: "a".into(),
            attributes: insert_attribute_id(
                hashmap! {
                    String::from("href") => Some(anchor_link.url.clone().into_string())
                },
                &anchor_link.id,
            ),
            children: children_to_raw_children(&anchor_link.children),
        },
        Element::Image(image) => RawElement {
            tag_name: "img".into(),
            attributes: insert_attribute_id(
                hashmap! {
                    String::from("alt") => Some(image.alternative_text.clone())
                },
                &image.id,
            ),
            children: RawChildren::NoEndTag,
        },
    }
}

pub fn insert_attribute_id(mut hashmap: RawAttributes, id: &Option<Id>) -> RawAttributes {
    match id {
        Some(Id(id_as_string)) => {
            hashmap.insert(String::from("id"), Some(id_as_string.clone()));
        }
        None => {}
    };
    hashmap
}

pub fn children_to_raw_children(children: &Children) -> RawChildren {
    match children {
        Children::ElementList(key_and_element_list) => RawChildren::ElementList(
            key_and_element_list
                .iter()
                .map(|(_key, element)| element_to_raw_element(element))
                .collect(),
        ),
        Children::Text(text) => RawChildren::Text(text.into()),
    }
}
