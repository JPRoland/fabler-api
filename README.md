# Fabler

Fabler is social storytelling platform built with Node.js, Sequelize, and Postgres.

# Getting Started

To run the server locally:

- Clone the repo
- `npm install` or `yarn install` to install all dependencies
- Install Postgres or other SQL database supported by Sequelize
- Create a `.env` file with the follwing variables:

  ```
  PORT=SETME
  APP_ENV=*SETME*

  DB_DIALECT=*SETME*
  DB_HOST=*SETME*
  DB_PORT=*SETME*
  DB_NAME=*SETME*
  DB_USER=*SETME*
  DB_PASS=*SETME*

  JWT_SECRET=*SETME*
  ```

- `npm run dev` or `yarn dev` to start the server
