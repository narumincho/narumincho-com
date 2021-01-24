async fn hello_world(
    _req: http::Request<hyper::Body>,
) -> http::Result<hyper::Response<hyper::Body>> {
    http::Response::builder()
        .header(
            http::header::CONTENT_TYPE,
            http::header::HeaderValue::from_static("text/html"),
        )
        .body(<hyper::Body as core::convert::From<String>>::from(format!(
            "<!doctype html>
<html lang=\"ja\">

<head>
<meta charset=\"utf-8\">
<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">
<style>
body {{
    font-size: 48px;
    color: white;
    background-color: black;
}}
</style>
</head>

<body>
  <div>Rust のサーバーを起動できた!</div>
  <div>現在の時刻 {}</div>
  <div>ランダム {}</div>
</body>

</html>
",
            chrono::Utc::now(),
            uuid::Uuid::new_v4()
        )))
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
