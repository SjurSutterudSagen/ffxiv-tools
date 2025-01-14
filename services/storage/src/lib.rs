use axum::{
    routing::get,
    Router,
};

async fn health() -> &'static str {
    "FFXIV Tools Storage OK"
}

pub fn create_app() -> Router {
    Router::new()
        .route("/health", get(health))
} 