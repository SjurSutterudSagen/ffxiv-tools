use ffxiv_tools_storage::create_app;

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::fmt::init();

    tracing::info!("Storage service starting up");

    // Build our application with a route
    let app = create_app();

    // Run it
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3002")
        .await
        .unwrap();
    tracing::info!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}