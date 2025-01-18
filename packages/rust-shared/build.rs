fn main() {
    println!("cargo:rustc-env=TS_RS_EXPORT_DIR=../shared-types/typescript");
    println!("cargo:rerun-if-changed=src/types.rs");
}
