pub mod data;
mod to_string;

/// 構造化されたHTML を よく使う HTML の文字列表現にする
pub fn structured_html_to_html_as_string(structured_html: &data::StructuredHtml) -> String {
    to_string::structured_html_to_string(structured_html)
}

#[cfg(test)]
mod tests {
    #[test]
    fn to_string_include_check() {
        // <!doctype html><html lang="ja"><head><meta charset="utf-8"><meta content="width=device-width,initial-scale=1.0" name="viewport"><title>ナルミンチョの創作記録</title><meta name="description" content=""><link href="https://narumincho.com/icon" rel="icon"><meta name="twitter:card" content="summary"><meta content="https://narumincho.com/" property="og:url"><meta property="og:title" content="ナルミンチョの創作記録"><meta property="og:site_name" content="ナルミンチョの創作記録"><meta property="og:description" content=""><meta content="https://narumincho.com/cover" property="og:image"></head><body><noscript>ナルミンチョの創作記録 では JavaScript を使用します. ブラウザの設定で有効にしてください.</noscript><div>init!</div></body></html>
        let html_as_text =
            crate::to_string::structured_html_to_string(&crate::data::StructuredHtml {
                app_name: String::from("ナルミンチョの創作記録"),
                body_class: None,
                children: vec![crate::data::HtmlElement::new(
                    "div",
                    vec![],
                    crate::data::HtmlChildren::Text(String::from("init!")),
                )],
                cover_image_url: url::Url::parse("https://narumincho.com/cover").unwrap(),
                description: "".to_string(),
                icon_url: url::Url::parse("https://narumincho.com/icon").unwrap(),
                language: Some(crate::data::Language::Japanese),
                page_name: "ナルミンチョの創作記録".to_string(),
                script: None,
                script_url_list: vec![],
                style: None,
                style_url_list: vec![],
                theme_color: None,
                twitter_card: crate::data::TwitterCard::SummaryCard,
                url: url::Url::parse("https://narumincho.com").unwrap(),
                web_app_manifest_url: None,
            });

        // 先頭が <!doctype html> かどうか
        assert_eq!(html_as_text.find("<!doctype html>"), Some(0));

        // <meta charset="utf-8"> が含まれているかどうか
        std::matches!(html_as_text.find(r##"<meta charset="utf-8">"##), Some(_));

        // ナルミンチョの創作記録 が含まれているかどうか
        std::matches!(html_as_text.find("ナルミンチョの創作記録"), Some(_));

        // <noscript> が含まれているかどうか
        std::matches!(html_as_text.find("<noscript>"), Some(_));

        // 結果の出力
        println!("{}", html_as_text);
    }
}
