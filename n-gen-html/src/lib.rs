pub mod data;
pub mod to_string;

/// 構造化されたHTML を よく使う HTML の文字列表現にする
pub fn structured_html_to_html_as_string(_structured_html: &data::StructuredHtml) -> String {
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
