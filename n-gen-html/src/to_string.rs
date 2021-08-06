use crate::data;
use std::collections::HashMap;

fn escape_in_html(text: &String) -> String {
    text.replace("&", "&amp;")
        .replace(">", "&gt;")
        .replace("<", "&lt;")
        .replace("\"", "&quot;")
        .replace("'", "&#x27;")
        .replace("`", "&#x60;")
}

fn language_to_ietf_language_tag(language: &data::Language) -> String {
    String::from(match language {
        data::Language::Japanese => "ja",
        data::Language::English => "en",
        data::Language::Esperanto => "eo",
    })
}

fn twitter_card_to_string(twitter_card: &data::TwitterCard) -> String {
    String::from(match twitter_card {
        data::TwitterCard::SummaryCard => "summary",
        data::TwitterCard::SummaryCardWithLargeImage => "summary_large_image",
    })
}

/**
 * 文字列の HTML を生成する
 */
pub fn structured_html_to_string(option: &data::StructuredHtml) -> String {
    let mut children: Vec<data::HtmlElement> = vec![data::HtmlElement::new(
        "noscript",
        vec![],
        data::HtmlChildren::Text(
            String::from(&option.app_name)
                + " では JavaScript を使用します. ブラウザの設定で有効にしてください.",
        ),
    )];

    for child in option.children.clone() {
        children.push(child);
    }

    "<!doctype html>".to_string()
        + &html_element_to_string(&data::HtmlElement::new(
            "html",
            match &option.language {
                Some(language) => vec![(
                    "lang".to_string(),
                    Some(language_to_ietf_language_tag(&language)),
                )],
                None => vec![],
            },
            data::HtmlChildren::ElementList(vec![
                head_element(&option),
                data::HtmlElement::new(
                    "body",
                    match &option.body_class {
                        Some(class_name) => {
                            vec![("class".to_string(), Some(String::from(class_name)))]
                        }
                        None => vec![],
                    },
                    data::HtmlChildren::ElementList(children),
                ),
            ]),
        ))
}

fn head_element(view: &data::StructuredHtml) -> data::HtmlElement {
    let mut children: Vec<data::HtmlElement> = vec![
        charset_element(),
        viewport_element(),
        page_name_element(&view.page_name),
        description_element(&view.description),
    ];

    if let Some(theme_color) = view.theme_color {
        children.push(theme_color_element(theme_color));
    }
    children.push(icon_element(&view.icon_url));
    if let Some(web_app_manifest_url) = &view.web_app_manifest_url {
        children.push(web_app_manifest_element(&web_app_manifest_url));
    }
    if let Some(style) = &view.style {
        children.push(css_style_element(style));
    }
    children.push(twitter_card_element(&view.twitter_card));
    children.push(og_url_element(&view.url));
    children.push(og_title_element(&view.page_name));
    children.push(og_site_name(&view.app_name));
    children.push(og_description(&view.description));
    children.push(og_image(&view.cover_image_url));
    if let Some(script) = &view.script {
        children.push(java_script_element(&script));
    }
    for script_url in &view.script_url_list {
        children.push(java_script_element_by_url(script_url));
    }
    for style_url in &view.style_url_list {
        children.push(style_element_by_url(style_url));
    }

    return data::HtmlElement::new("head", vec![], data::HtmlChildren::ElementList(children));
}

fn charset_element() -> data::HtmlElement {
    data::HtmlElement::new(
        "meta",
        vec![(String::from("charset"), Some(String::from("utf-8")))],
        data::HtmlChildren::NoEndTag,
    )
}

fn viewport_element() -> data::HtmlElement {
    data::HtmlElement::new(
        "meta",
        vec![
            (String::from("name"), Some(String::from("viewport"))),
            (
                String::from("content"),
                Some(String::from("width=device-width,initial-scale=1.0")),
            ),
        ],
        data::HtmlChildren::NoEndTag,
    )
}

fn page_name_element(page_name: &str) -> data::HtmlElement {
    data::HtmlElement::new(
        "title",
        vec![],
        data::HtmlChildren::Text(String::from(page_name)),
    )
}

fn description_element(description: &str) -> data::HtmlElement {
    data::HtmlElement::new(
        "meta",
        vec![
            (String::from("name"), Some(String::from("description"))),
            (String::from("content"), Some(String::from(description))),
        ],
        data::HtmlChildren::NoEndTag,
    )
}

fn theme_color_element(theme_color: css_colors::RGB) -> data::HtmlElement {
    data::HtmlElement::new(
        "meta",
        vec![
            (String::from("name"), Some(String::from("theme-color"))),
            (String::from("content"), Some(format!("{}", theme_color))),
        ],
        data::HtmlChildren::NoEndTag,
    )
}

fn icon_element(icon_url: &url::Url) -> data::HtmlElement {
    data::HtmlElement::new(
        "link",
        vec![
            (String::from("rel"), Some(String::from("icon"))),
            (String::from("href"), Some(icon_url.to_string())),
        ],
        data::HtmlChildren::NoEndTag,
    )
}

fn web_app_manifest_element(url: &url::Url) -> data::HtmlElement {
    data::HtmlElement::new(
        "link",
        vec![
            (String::from("rel"), Some(String::from("manifest"))),
            (String::from("href"), Some(url.to_string())),
        ],
        data::HtmlChildren::NoEndTag,
    )
}

fn css_style_element(css_code: &str) -> data::HtmlElement {
    data::HtmlElement::new(
        "style",
        vec![],
        data::HtmlChildren::RawText(String::from(css_code)),
    )
}

fn twitter_card_element(twitter_card: &data::TwitterCard) -> data::HtmlElement {
    data::HtmlElement::new(
        "meta",
        vec![
            (String::from("name"), Some(String::from("twitter:card"))),
            (
                String::from("content"),
                Some(twitter_card_to_string(twitter_card)),
            ),
        ],
        data::HtmlChildren::NoEndTag,
    )
}

fn og_url_element(url: &url::Url) -> data::HtmlElement {
    data::HtmlElement::new(
        "meta",
        vec![
            (String::from("property"), Some(String::from("og:url"))),
            (String::from("content"), Some(url.to_string())),
        ],
        data::HtmlChildren::NoEndTag,
    )
}

fn og_title_element(title: &str) -> data::HtmlElement {
    data::HtmlElement::new(
        "meta",
        vec![
            (String::from("property"), Some(String::from("og:title"))),
            (String::from("content"), Some(String::from(title))),
        ],
        data::HtmlChildren::NoEndTag,
    )
}

fn og_site_name(site_name: &str) -> data::HtmlElement {
    data::HtmlElement::new(
        "meta",
        vec![
            (String::from("property"), Some(String::from("og:site_name"))),
            (String::from("content"), Some(String::from(site_name))),
        ],
        data::HtmlChildren::NoEndTag,
    )
}

fn og_description(description: &str) -> data::HtmlElement {
    data::HtmlElement::new(
        "meta",
        vec![
            (
                String::from("property"),
                Some(String::from("og:description")),
            ),
            (String::from("content"), Some(String::from(description))),
        ],
        data::HtmlChildren::NoEndTag,
    )
}

fn og_image(url: &url::Url) -> data::HtmlElement {
    data::HtmlElement::new(
        "meta",
        vec![
            (String::from("property"), Some(String::from("og:image"))),
            (String::from("content"), Some(url.to_string())),
        ],
        data::HtmlChildren::NoEndTag,
    )
}

fn java_script_element(java_script_code: &str) -> data::HtmlElement {
    data::HtmlElement::new(
        "script",
        vec![(String::from("type"), Some(String::from("module")))],
        data::HtmlChildren::RawText(String::from(java_script_code)),
    )
}

fn java_script_element_by_url(url: &url::Url) -> data::HtmlElement {
    data::HtmlElement::new(
        "script",
        vec![
            (String::from("defer"), None),
            (String::from("src"), Some(url.to_string())),
        ],
        data::HtmlChildren::ElementList(vec![]),
    )
}

fn style_element_by_url(url: &url::Url) -> data::HtmlElement {
    data::HtmlElement::new(
        "link",
        vec![
            ("rel".to_string(), Some("stylesheet".to_string())),
            ("href".to_string(), Some(url.to_string())),
        ],
        data::HtmlChildren::NoEndTag,
    )
}

fn html_element_to_string(element: &data::HtmlElement) -> String {
    let start_tag =
        "<".to_string() + &element.name + &attributes_to_string(&element.attributes) + ">";
    let end_tag = "</".to_string() + &element.name + ">";

    match &element.children {
        data::HtmlChildren::ElementList(element_list) => {
            start_tag
                + &element_list
                    .iter()
                    .map(html_element_to_string)
                    .collect::<Vec<String>>()
                    .join("")
                + &end_tag
        }
        data::HtmlChildren::Text(text) => start_tag + &escape_in_html(&text) + &end_tag,
        data::HtmlChildren::RawText(raw_text) => start_tag + &raw_text + &end_tag,
        data::HtmlChildren::NoEndTag => start_tag,
    }
}

fn attributes_to_string(attribute_map: &HashMap<String, Option<String>>) -> String {
    if attribute_map.len() == 0 {
        String::from("")
    } else {
        String::from(" ")
            + &attribute_map
                .iter()
                .map(|(key, value)| -> String {
                    match value {
                        Some(value) => String::from(key) + "=\"" + &escape_in_html(value) + "\"",
                        None => String::from(key),
                    }
                })
                .collect::<Vec<String>>()
                .join(" ")
    }
}
