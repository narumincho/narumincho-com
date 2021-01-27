use std::fs;

fn main() {
    fs::write(
        "./src/data.rs",
        format!(
            "pub struct User {{
    pub name: String,
    pub age: Option<i32>,
}}

pub const build_script_run_time: &'static str = \"{}\";
",
            chrono::Utc::now()
        ),
    )
    .unwrap();
    println!("cargo:rerun-if-changed=build.rs");
    println!("cargo:rerun-if-changed=../src/main.rs");
}
