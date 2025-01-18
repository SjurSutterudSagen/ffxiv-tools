use serde::{Deserialize, Serialize};
use ts_rs::TS;

// Basic type definitions that can be expanded later
#[derive(Serialize, Deserialize, TS)]
#[ts(export)]
pub struct BasicData {
    pub id: String,
    pub name: String,
    pub timestamp: i64,
}

#[derive(Serialize, Deserialize, TS)]
#[ts(export)]
pub enum Status {
    Active,
    Inactive,
    Pending,
}
