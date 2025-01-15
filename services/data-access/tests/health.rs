use axum::{
    body::Body,
    http::{Request, StatusCode},
};
use tower::ServiceExt;
use ffxiv_tools_data_access::create_app;
use axum::body::to_bytes;

/// Tests for the health check endpoint
#[cfg(test)]
mod health_tests {
    use super::*;

    const EXPECTED_RESPONSE: &str = "OK";

    #[tokio::test]
    async fn health_endpoint_returns_ok_status_and_message() {
        // Arrange
        let app = create_app();
        let request = Request::builder()
            .uri("/health")
            .body(Body::empty())
            .unwrap();

        // Act
        let response = app.oneshot(request).await.unwrap();
        let status = response.status();
        let bytes = to_bytes(response.into_body(), usize::MAX).await.unwrap();
        let body = String::from_utf8(bytes.to_vec()).unwrap();

        // Assert
        assert_eq!(status, StatusCode::OK);
        assert_eq!(body, EXPECTED_RESPONSE);
    }
} 