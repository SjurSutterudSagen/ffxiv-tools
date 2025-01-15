use ffxiv_tools_data_access::create_app;
use ffxiv_tools_data_access::run_app;

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::fmt::init();

    // Build our application with a route
    let app = create_app();

    // Run the application
    run_app(app).await;
} 