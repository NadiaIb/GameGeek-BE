# GameGeek reviews API

##   Overview
This repo contains the API for the a games review website, you can view the front end repo [here](https://github.com/NadiaIb/GameGeek-FE)

You can view the deployed API: [here](https://nc-games-1ybo.onrender.com/api)

## Features
• Select from a range of games.
• Sort games by number of votes, ascending or descending order, date or comment counts.
• Upvote or downvote games
• Comments can be added or deleted

## Running the project locally
To run this project locally, you will need to fork this repo or fork as follows:

```
git clone https://github.com/NadiaIb/GameGeek-BE.git
cd GameGeek-BE
```
 
# Setup .env files

You will need to create two .env files to run this project locally: .env.test and .env.development. Into each, add :

```
PGDATABASE=<database_name_here>
```

with the correct database name for that environment (see /db/setup.sql for the database names).

Double check that these .env files are .gitignored.

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
