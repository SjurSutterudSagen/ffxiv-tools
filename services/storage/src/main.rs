use tracing;

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::fmt::init();

    tracing::info!("Storage service starting up");
    // TODO: Implement storage service
} 