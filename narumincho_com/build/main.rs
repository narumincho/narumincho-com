use std::fs;

use sha2::Digest;

/// narumincho_com を ルートとしたリソースのパス
const RESOURCE_PATH: &'static str = "resource";

const RESOURCE_TYPE_DEFINITION: &'static str = r###"pub struct Resource<'a> {
    pub hash: &'a str,
    pub binary: &'a [u8],
}
"###;

fn main() {
    let dir = fs::read_dir(RESOURCE_PATH);

    let code = format!(
        "{}\n{}",
        RESOURCE_TYPE_DEFINITION,
        match dir {
            Ok(result) => result
                .map(|file_result| match file_result {
                    Ok(file) => match (
                        file.path().file_stem().and_then(|e| e.to_str()),
                        file.path().file_name().and_then(|e| e.to_str()),
                        read_file_hash(&file.path())
                    ) {
                        (Some(file_stem), Some(file_name), Some(file_hash)) => {
                            format!(
                                r###"pub const {}: Resource<'static> = Resource {{
   hash: "{}",
   binary: include_bytes!("../{}/{}")
}};"###,
                                file_stem.to_uppercase(),
                                file_hash,
                                RESOURCE_PATH,
                                file_name
                            )
                        }
                        _ => String::from("謎のファイル名"),
                    },
                    Err(error) => format!("エラーだよぅ {}", error),
                })
                .collect::<Vec<String>>()
                .join("\n"),
            Err(error) => format!("全体的なエラー {}", error),
        }
    );
    fs::write("./src/resource.rs", code).unwrap();

    println!("cargo:rerun-if-changed=build.rs");
    println!("cargo:rerun-if-changed={}", RESOURCE_PATH);
}

fn read_file_hash(path: &std::path::PathBuf) -> Option<String> {
    match fs::read(path) {
        Ok(binary) => {
            let mut hasher = sha2::Sha256::new();
            hasher.update(binary);
            let result = hasher.finalize();
            Some(hex::encode(result))
        }
        Err(_) => None,
    }
}
