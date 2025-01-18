# rust-shared

Shared Rust types and utilities library.

## Installation

Add this to your `Cargo.toml`:

```toml
[dependencies]
rust-shared = { path = "../rust-shared" }
```

## Usage

```rust
use rust-shared::ExampleType;

let example = ExampleType {
    id: "test".to_string(),
};
```

## License

[MIT](LICENSE)
