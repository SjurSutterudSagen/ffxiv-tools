use rust_shared::types::ExampleStatus; // Import the type from the lib rust_shared

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn test_example_status_active() {
        let status = ExampleStatus::Active;
        let json = json!(status);
        assert_eq!(json, json!("Active"));
    }

    #[test]
    fn test_example_status_inactive() {
        let status = ExampleStatus::Inactive;
        let json = json!(status);
        assert_eq!(json, json!("Inactive"));
    }

    #[test]
    fn test_example_status_pending() {
        let status = ExampleStatus::Pending;
        let json = json!(status);
        assert_eq!(json, json!("Pending"));
    }
}
