# MVP Project

This is an answer to Click Here Digital's request to demonstrate knowledge and skills using technologies used at Click Here Digital. The assumption was to create a proof of concept so unit tests were written to demonstrate rather than to fully test the application. The tasks.controller follows REST protocol but, by intention, the signup and signin in accounts does not. The tests can be optimized so that certain data are not duplicated but since it is a test I left it out. Rather focused on getting the task done with the time I have available.

## Requirements

For this project I created a postman collection. I have added it to the root of the project for my evaulators to test my application.

|Constraint|Details|
|---|---|
|Documentation|It is assumed that the documentation that the evaluators are referring to consists of a Markdown file and minimal code comments in the codebase. Thus it does not include openApi specification documentation.|


### Project Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Sequelize ORM
* JSON Web Token (JWT)
* Jest

* @faker-js/faker
* nodemon
* sequelize-cli
* supertest
* argon2
* dotenv
* pg
* pg-hstore
    
## Project Summary

This is an internal task management application for ABC, Inc. Users can create, update, read and delete tasks. All users have the same role and permissions. If need be a migration can be written to add roles and permissions. 

* Communication with the backend is done through REST for tasks but signup and signin both are normal post requests by intention. 
* All Data is persisted in a postgres database. It is assumed that the evaluators will setup their own and add their settings to the .env file. An example is provided in the Repo. 
* Basic unit tests have been added and can be run using `npm run test` note after node_modules have been installed `npm i`.
* Scripts have been included to create test data using seeds. See the `package.json` for details regarding the scripts for migrations and seeds. Note `npm run db:seed:all` will run all the seeds/fixtures.
* Users are limited to the tasks that they have created by use of middleware. Requests to tasks include a check that the decoded userId is present in where clauses. 

### User Stories

|Title|As A...|I want to...|So that I can...|
|---|---|---|---|
|Create Account|New user|Register an Account|Use the application|
|Login|Registered User|Log into my account|Create my tasks|
|Create Tasks|Registered user|Create a new task|Create new tasks associated with it|
|Edit Tasks|Registered User|Edit an existing task|Make changes to the details within it (i.e., description)|
|Delete Tasks|Registered User|Delete an existing task|Remove tasks that are no longer needed|
|View Task|Registered User|View a single task|Review the details within it|
|View All Tasks| Registered User | View all tasks| Views all tasks

### Get Up and Running

* The following project was setup in a linux environment. It is not assumed that the scripts will run in a windows environment. Cross env was not included by intention.
* Please import the provided postman collection `dev-test.postman_collection.json`. 
* Please run a `npm i` in the root of the project. 
* Please run the following command in terminal `cp ./.env.example ./.env` to create a copy of the provided `.env.example` file. 
* Add your database connection settings. 
* Remember to create your database. According to online sources Sequelize does not allow for the creation of database. For now it is manual.
* Note to spin up a database quickly using docker please run `docker run --name basic-postgres --rm -e POSTGRES_USER=<user> -e POSTGRES_PASSWORD=<password> -e PGDATA=/var/lib/postgresql/data/pgdata -v /tmp:/var/lib/postgresql/data -p 5432:5432 -it postgres:14.1-alpine`. replace the bracked words <> with your own chosen variables. 
* Once your database is up and running and your env settings have been added run the following commands and add the environment to the end that you want to run whether test or development:
  * `npm run db:migrate <environment>`
  * `npm run db:seed:all <environment>`
* If you receive no errors it means your postgres database has been populated with the necessary data. Refer to the user seed for the password to login a user or create a new user. 
* To run tests run `npm run test`
* To start the dev server run `npm run dev`
