use tokio::fs;

#[macro_use]
extern crate maplit;

pub mod nview;

const ICON_PATH: &'static str = "/icon";

async fn hello_world(
    request: http::Request<hyper::Body>,
) -> http::Result<hyper::Response<hyper::Body>> {
    if request.uri().path() == ICON_PATH {
        let icon_binary_result = fs::read("./icon.svg").await;
        match icon_binary_result {
            Ok(binary) => http::Response::builder()
                .header(http::header::CONTENT_TYPE, "image/svg+xml")
                .body(hyper::Body::from(binary)),
            Err(reason) => {
                println!("アイコンの画像を読み取れなかった {}", reason);
                http::Response::builder()
                    .status(http::StatusCode::INTERNAL_SERVER_ERROR)
                    .body(hyper::Body::default())
            }
        }
    } else {
        http::Response::builder()
            .header(
                http::header::CONTENT_TYPE,
                http::header::HeaderValue::from_static("text/html"),
            )
            .body(<hyper::Body as core::convert::From<String>>::from(
                nview::view_to_html_string(&nview::View {
                    page_name: String::from("ナルミンチョの創作記録"),
                    language: Some(nview::Language::Japanese),
                    icon_path: String::from(ICON_PATH),
                    body: nview::Children::ElementList(vec![
                        (
                            String::from("title"),
                            nview::Element::Div(nview::Div {
                                id: None,
                                children: nview::Children::Text(String::from(
                                    "ナルミンチョの創作記録!",
                                )),
                            }),
                        ),
                        (
                            String::from("date"),
                            nview::Element::Div(nview::Div {
                                id: None,
                                children: nview::Children::Text(format!("{}", chrono::Utc::now())),
                            }),
                        ),
                    ]),
                }),
            ))
    }
}

#[tokio::main]
async fn main() {
    let address = std::net::SocketAddr::from(([0, 0, 0, 0], get_port_number_from_env_variable()));

    let make_svc = hyper::service::make_service_fn(|_conn| async {
        Ok::<_, std::convert::Infallible>(hyper::service::service_fn(hello_world))
    });

    let server = hyper::Server::bind(&address).serve(make_svc);
    if let Err(e) = server.await {
        eprintln!("server error: {}", e);
    }
}

/// ポート番号を PORT という名前の環境変数から読んで返す. 環境変数がなければ デフォルトで 3000 を返す
/// これ処理は Cloud Run で動かすときに必要になる
fn get_port_number_from_env_variable() -> u16 {
    let port_env = std::env::var("PORT");
    const DEFAULT_PORT_NUMBER: u16 = 3000;
    match port_env {
        Ok(port_env_as_string) => match std::str::FromStr::from_str(&port_env_as_string) {
            Ok(port_env_as_int) => port_env_as_int,
            Err(_) => {
                println!(
                    "PORT の 環境変数を見つけることができたが数値として読み取れなかったので, デバッグ用ポート番号で起動しています. http://localhost:{}",
                    DEFAULT_PORT_NUMBER
                );
                DEFAULT_PORT_NUMBER
            }
        },
        Err(_) => {
            println!(
                "PORT の 環境変数がなかったので, デバッグ用ポート番号で起動しています. http://localhost:{}",
                DEFAULT_PORT_NUMBER
            );
            DEFAULT_PORT_NUMBER
        }
    }
}
