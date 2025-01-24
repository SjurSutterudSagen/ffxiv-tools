fn main() {
    println!("cargo:rustc-env=TS_RS_EXPORT_DIR=../typescript-types/src");
    println!("cargo:rerun-if-changed=src/types.rs");
}
