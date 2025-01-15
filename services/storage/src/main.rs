use ffxiv_tools_storage::create_app;
use ffxiv_tools_storage::run_app;

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::fmt::init();

    // Build our application with a route
    let app = create_app();

    // Run the application
    run_app(app).await;
}