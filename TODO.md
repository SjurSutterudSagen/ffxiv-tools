# TODOs for FFXIV Tools

## Set up basic project

- [ ] Set up the basics of the projects
  - [ ] Set up the web project
    - [x] Create the project
    - [x] Set up the basic layout
    - [x] Set up the basic navigation
    - [ ] Set up the basic fonts
    - [ ] Set up the basic colors
    - [ ] Set up the basic typography
    - [ ] Set up the basic icons
    - [ ] Set up the basic translations
    - [x] Set up the basic testing tooling
    - [ ] Set up the basic logging
    - [ ] Set up the basic metrics
    - [ ] Set up the basic health checks
    - [ ] Set up the basic error handling
    - [ ] Set up containerization
      - [x] Set up Dockerfile
  - [ ] Set up the data-access project
    - [x] Create the project
    - [x] Set up the basic testing tooling
    - [ ] Set up the basic logging
    - [ ] Set up the basic metrics
    - [x] Set up the basic health checks
    - [ ] Set up the basic error handling
    - [ ] Set up containerization
      - [x] Set up Dockerfile
  - [ ] Set up the storage project
    - [x] Create the project
    - [x] Set up the basic testing tooling
    - [ ] Set up the basic logging
    - [ ] Set up the basic metrics
    - [ ] Set up the basic health checks
    - [ ] Set up the basic error handling
    - [ ] Set up containerization
      - [ ] Set up Dockerfile

### Docs

- [ ] Set up the docs
  - [ ] Set up the docs for the API
  - [ ] Set up the docs for the web app
  - [ ] Set up the docs for the data access
  - [ ] Set up the docs for the storage layer

### Nextjs web app

For displaying the tools to users. This is intended to include crafting information, and prices for selling/profits.

- [x] Set up the project
- [x] Set up the layout
- [x] Set up the navigation
- [ ] Set up fonts
- [ ] Set up colors
- [ ] Set up typography
- [ ] Set up translations
- [ ] Set up icons/svgs
  - [ ] Set up the icons for the app
  - [ ] Set up the icons for the tools
  - [ ] Set up the icons for the tradeskills
  - [ ] Set up the icons for the settings
- [ ] Set up the data fetching to the API
  - [ ] Fetching data from the API for crafting
  - [ ] Fetching data from the API for market
  - [ ] Fetching data from the API for gathering
- [ ] Set up the error handling
- [ ] Set up the logging
- [ ] Set up the metrics
- [ ] Set up the health checks

#### Features

The app should have these features:

##### Crafting

##### Market

##### Gathering

##### Settings

#### Testing

Use vitest for unit-tests, and playwright for UI tests.

- [ ] Create a basic test for the app
- [ ] Create a test for the crafting tool
- [ ] Create a test for the market tool
- [ ] Create a test for the gathering tool

### DataAccess: API for reading and analyzing Parquet file storage

For getting the data stored in parquet files, and analyzing it.

- [ ] Set up the project
- [ ] Set up the error handling
- [ ] Set up the logging
- [ ] Set up the metrics
- [ ] Set up the health checks

#### Features

- [ ] Set up the data fetching from the storage layer
- [ ] Set up the data analysis

#### Testing

Use vitest for unit-tests.

- [ ] Create a basic test for the data access
- [ ] Create a test for the data fetching from the storage layer
- [ ] Create a test for the data analysis

### Storage Layer: For storing parquet files and/or a database

For storing the information that is needed. This could be a database for some things, or parquet files for other things.

- [ ] Set up the project
- [ ] Set up the error handling
- [ ] Set up the logging
- [ ] Set up the metrics
- [ ] Set up the health checks

#### Features

- [ ] Set up the data storage
- [ ] Set up the data fetching from the external API (like the market data. this might not be the correct place for this)

#### Testing

Use vitest for unit-tests.

- [ ] Create a basic test for the storage layer
