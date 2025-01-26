pub fn read_parquet_file(path: &str) -> Result<DataFrame, Error> {
    let file = File::open(path)?;
    let reader = ParquetReader::new(file);
    let df = reader.collect::<DataFrame>()?;

    Ok(df)
}

pub fn write_parquet_file(path: &str, df: &DataFrame) -> Result<(), Error> {
    let file = File::create(path)?;
    let writer = ParquetWriter::new(file);
    writer.write(df)?;

    Ok(())
}
