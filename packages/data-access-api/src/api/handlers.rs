pub async fn get_dataset(dataset_id: String) -> Result<DataFrame, Error> {
    let path = format!("data/datasets/{dataset_id}.parquet");
    let df = read_parquet_file(path)?;
    
    Ok(df)
}


