use tracing;
use axum::{
    routing::get,
    Router,
};

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::fmt::init();

    tracing::info!("Storage service starting up");

    // TODO: Implement storage service
    let app = Router::new()
        .route("/health", get(|| async { "FFXIV Tools Storage OK" }));

    // Run it
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3002")
        .await
        .unwrap();
    tracing::info!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
} 