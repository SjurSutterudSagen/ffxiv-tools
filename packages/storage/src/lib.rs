use axum::{
    routing::get,
    Router,
};
use std::net::SocketAddr;

/// Health check endpoint
async fn health() -> &'static str {
    tracing::debug!("Health check requested");
    "OK"
}

pub fn create_app() -> Router {
    tracing::debug!("Creating application router");
    Router::new()
        .route("/health", get(health))
}

pub async fn run_app(app: Router) {
    let addr = SocketAddr::from(([0, 0, 0, 0], 3002));
    
    tracing::info!("Storage service listening on {}", addr);

    match tokio::net::TcpListener::bind(addr).await {
        Ok(listener) => {
            if let Err(e) = axum::serve(listener, app).await {
                tracing::error!("Server error: {}", e);
            }
        }
        Err(e) => {
            tracing::error!("Failed to bind to {}: {}", addr, e);
        }
    }
} 