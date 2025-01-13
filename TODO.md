# TODOs for FFXIV Tools

## Set up basic project

### Orchestrator project

This is the project that will be used to orchestrate the other projects. It will be responsible for setting up the environment, and for running the other projects.

- [ ] Set up the project
  - [ ] Set up Git Submodules? Or just use a monorepo? or something else?
- [ ] Set up the environment
- [ ] Set up the configuration
- [ ] Set up containerization
- [ ] Set up CI/CD

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

### Storage Layer: For storing parquet files and/or a database

For storing the information that is needed. This could be a database for some things, or parquet files for other things.

- [ ] Set up the project
- [ ] Set up the error handling
- [ ] Set up the logging
- [ ] Set up the metrics
- [ ] Set up the health checks
