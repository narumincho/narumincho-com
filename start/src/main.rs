const PROGRAM_PATH: &'static str = "/program";
const WASM_PATH: &'static str = "/wasm";

#[tokio::main]
async fn main() {
    let addr = std::net::SocketAddr::V6(std::net::SocketAddrV6::new(
        std::net::Ipv6Addr::LOCALHOST,
        3000,
        0,
        0,
    ));

    let make_svc = hyper::service::make_service_fn(|_conn| async {
        Ok::<_, std::convert::Infallible>(hyper::service::service_fn(handle_request))
    });

    let server = hyper::Server::bind(&addr).serve(make_svc);

    println!("development server start! http://{}", addr.to_string());

    // Run this server for... forever!
    if let Err(e) = server.await {
        eprintln!("server error: {}", e);
    }
}

async fn handle_request(
    request: hyper::Request<hyper::Body>,
) -> Result<hyper::Response<hyper::Body>, std::convert::Infallible> {
    let path = request.uri().path();
    println!("request path: {}", path);
    if path == PROGRAM_PATH {
        match program_response().await {
            Some(js_code) => {
                let mut r = hyper::Response::new(hyper::Body::from(js_code));
                r.headers_mut().insert(
                    http::header::CONTENT_TYPE,
                    http::HeaderValue::from_static("text/javascript"),
                );
                return Ok(r);
            }
            None => {}
        };
    }
    if path == WASM_PATH {
        match std::fs::read("./pkg/narumincho_creative_record_bg.wasm") {
            Ok(wasm) => {
                let mut r = hyper::Response::new(hyper::Body::from(wasm));
                r.headers_mut().insert(
                    http::header::CONTENT_TYPE,
                    http::HeaderValue::from_static("application/wasm"),
                );
                return Ok(r);
            }
            Err(_) => {}
        }
    }
    let mut r = hyper::Response::new(hyper::Body::from(
        n_gen_html::structured_html_to_html_as_string(&n_gen_html::data::StructuredHtml {
            app_name: String::from("ナルミンチョの創作記録"),
            body_class: None,
            children: vec![n_gen_html::data::HtmlElement::new(
                "div",
                vec![],
                n_gen_html::data::HtmlChildren::Text(String::from("init!")),
            )],
            cover_image_url: url::Url::parse("https://narumincho.com/cover").unwrap(),
            description: String::from("革新的なプログラミング言語のDefiny, Web技術, 作っているゲームなどについて解説しています"),
            icon_url: url::Url::parse("https://narumincho.com/icon").unwrap(),
            language: Some(n_gen_html::data::Language::Japanese),
            page_name: String::from("ナルミンチョの創作記録"),
            script: None,
            script_url_list: vec![url::Url::parse(&(String::from("http://[::1]:3000") + &PROGRAM_PATH)).unwrap()],
            style: None,
            style_url_list: vec![],
            theme_color: None,
            twitter_card: n_gen_html::data::TwitterCard::SummaryCard,
            url: url::Url::parse("https://narumincho.com").unwrap(),
            web_app_manifest_url: None,
        }),
    ));
    r.headers_mut().insert(
        http::header::CONTENT_TYPE,
        http::HeaderValue::from_static("text/html"),
    );
    Ok(r)
}

async fn program_response() -> Option<String> {
    let output = std::process::Command::new("wasm-pack")
        .arg("build")
        .arg("--target")
        .arg("no-modules")
        .output();
    match output {
        Ok(ok) => {
            println!("status: {:?}", ok.status);
            println!("stdout: {:?}", std::str::from_utf8(&ok.stdout));
            println!("stderr: {:?}", std::str::from_utf8(&ok.stderr));

            match std::fs::read_to_string("./pkg/narumincho_creative_record.js") {
                Ok(js_code) => {
                    let added_js_code = js_code
                        + &format!(
                            r##"
wasm_bindgen("{}")
"##,
                            WASM_PATH
                        );
                    Some(added_js_code)
                }
                Err(error) => {
                    eprintln!("js のファイルを読み取れなかった: {}", error);
                    None
                }
            }
        }
        Err(err) => {
            eprintln!("command error: {}", err);
            None
        }
    }
}