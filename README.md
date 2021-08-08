# TODO List App (Server)

This repository represents all the server logic needed for the app to communicate and retrieve data to the client side.
In short, the server should be able to be the bridge between the database and the client.

## Environment vars

This project uses the following environment variables:

| Name        | Description                            | Default Value                               |
| ----------- | -------------------------------------- | ------------------------------------------- |
| MONGO_URL   | Mongo database URL                     | "mongodb://localhost:27017/<YOUR_DATABASE>" |
| MONGO_USER  | Credentials to access your database    | "\*"                                        |
| MONGO_PWD   | Credentials to access your database    | "\*"                                        |
| SALT_ROUNDS | Number of salt rounds to create a hash | "\*"                                        |
| JWT_SECRET  | Jsonwebtoken secret                    | "\*"                                        |

## Frameworks/Libraries/Tools during development

| Name    | Description                                                        |
| ------- | ------------------------------------------------------------------ |
| Docker  | Used Docker to run a containerized MongoDB database for simplicity |
| MongoDB | Database                                                           |
| Robo3T  | Software that allows to connect to the database and access data    |
| VSCode  | Code Editor                                                        |

## Packages

| Name         | Description                                                                 |
| ------------ | --------------------------------------------------------------------------- |
| bcrypt       | Library that allows to encrypt password in a hashable form.                 |
| cors         | Package that enables CORS.                                                  |
| dotenv       | Module that loads environment variables from a .env file into process.env . |
| express      | Middleware Framework                                                        |
| jsonwebtoken | Package that allows token authentication.                                   |
| mongoose     | MongoDB object modeling tool.                                               |
| nodemon      | Development library that monitorizes code changes.                          |
| jest         | Javascript Testing                                                          |
| supertest    | Library that allows HTTP testing                                            |

## Project Structure

The folder structure of this app is explained below:

| Name             | Description                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| **node_modules** | Contains all npm dependencies build.                                                              |
| **middleware**   | Contains the middlware that is responsible of allowing the request to complete only if authorized |
| **models**       | Contains all the schemas for each database document.                                              |
| **routers**      | Contain all express routes, separated by module/area of application                               |
| **tests**        | Contains all the unit tests.                                                                      |
| **index.js**     | File that is responsible to configure and run the server.                                         |

## Pre-requisites

- Have a mongodb database with credentials (Atlas or locally) that runs at port 27017

## Setup

- Clone the repository
- Install dependencies

```
npm install
```

- Create your `.env` file with your credentials and secrets
- Run the server at port 5000 and Nodemon

```
npm start
```

## Test

- Test the project

```
npm test
```

Test Files are created under the `test` folder

## Server responsibilities

- Login
    - Registering and Signing a user
    - Encrypting the user's password before being saved into the database
    - Creating a tokenized authentication.

- Projects and Tasks
    - Managing all the CRUD logic.

## What could be done so it would be production-ready?
Having the opportunity to develop more this project, there are a few things that it could be improved on:
- Logging all the processes that occur, using packages like Winston for example, and save the logs into a file for support.
- A better error handling so it could be easier to detect issues.
- Document queries should be centralized, perhaps into the model file, having functions that could be imported so it could reduce duplicated code.
- Testing should be done in a test database, and it should have more unit tests. An example of a unit test was developed so it could serve as a demonstration of my understanding about unit testing.
