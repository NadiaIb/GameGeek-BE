# GameGeek reviews API

##   Overview
This repo contains the API for the a games review website, you can view the front end repo [here](https://github.com/NadiaIb/GameGeek-FE)

You can view the deployed API: [here](https://nc-games-1ybo.onrender.com/api)

## Features
- Select from a range of games.
- Sort games by number of votes, ascending or descending order, date or comment counts.
- Upvote or downvote games.
- Comments can be added or deleted.

## Running the project locally
To run this project locally, you will need to fork this repo or fork as follows:

```
git clone https://github.com/NadiaIb/GameGeek-BE.git
cd GameGeek-BE
```
Once in the project directory, run the following command to install the required dependencies for the project:

```
npm install
```

# Minimum requirements
- Node: v19.7.0
- Postgres: v14.7.0

# Setup .env files
We have two databases in this project. One for real looking dev data and another for simpler test data.

To run this project locally, you will need test and developement .env files. These .env files are .gitignored, so you will need to create them yourself: 
- .env.test
- .env.development    

Into each file, add `PGDATABASE=<database_name_here>`, with the correct database name for that environment (see /db/setup.sql for the database names). 

You will then need to create the databases as follows:
```bash
npm run setup-dbs
```

To seed the development database, run:
```bash
npm run seed
```

The test database will automatically re-seed before each individual test.

## Tech Stack
This project has been built with:
- Node.js: JavaScript runtime
- Express: Web framework for Node.js
- PostgreSQL: Relational database system 
- Node-Postgres: Node.js modules for interfacing with a PostgreSQL database
- pg-format: Node.js implementation of PostgreSQL format() to create dynamic SQL queries

### Testing
- Jest: JavaScript testing framework
- Supertest: HTTP assertion library

## Dependencies

* Husky
* Jest
* Jest-sorted
* Jest-extended
* Cors
* Dotenv
* Express
* Pg
* Pg-format
* Supertest
