use ffxiv_tools_data_analysis::create_app;
use ffxiv_tools_data_analysis::run_app;

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::fmt()
        .with_target(false)
        .with_thread_ids(true)
        .with_level(true)
        .with_file(true)
        .with_line_number(true)
        .init();

    tracing::info!("Storage service initializing");

    // Build our application with a route
    let app = create_app();

    // Run the application
    run_app(app).await;

    tracing::info!("Storage service shutting down");
}