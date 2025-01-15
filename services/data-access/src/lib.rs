use axum::{
    routing::get,
    Router,
};
use std::net::SocketAddr;

async fn health() -> &'static str {
    "OK"
}

pub fn create_app() -> Router {
    Router::new()
        .route("/health", get(health))
}

pub async fn run_app(app: Router) {
    let addr = SocketAddr::from(([0, 0, 0, 0], 3001));
    println!("Listening on {}", addr);
    axum::serve(tokio::net::TcpListener::bind(addr).await.unwrap(), app)
        .await
        .unwrap();
} 