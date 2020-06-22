## Description

NestJS JWT authentication service using NestJS, Docker and MySQL. It can be used as a JWT Auth Microservice or can be used as starter repository for an API project.


## Setup
- **Pre-Requisite**
  - For dockerized environment we need 
    - `docker`, 
    - `docker-compose` installed.
  - To run API server without Docker we need
    - `Node.js` (>= 10.13.0) installed,
    - Dependency manager `yarn` installed,
    - Nestjs CLI `nest` installed ([follow here](https://docs.nestjs.com/first-steps)) and
    - MySQL server running
- **Configuration**
    - In application root, create `.env` copying form example env file `env.example`.
    - An example env file contains 
      - MySQL credentials for the dockerized environment. For non-docker setup, **update MySQL credentials** here.
      - Password encription salt and JWT secret key values. Change them with some secret values.
- **Run API**
    - **For Docker**: Up docker-compose, this will create a docker container with the database with the given name in env. 
    ``` 
    $ docker-compose up --build
    ```

    - For non-docker run install dependencies and run nodejs API server
    ```
    $ yarn
    $ yarn run start
    ```
- **API** 
  With above steps done, API should be up and running
    - Browse `API` at [http://localhost:3000](http://localhost:3000)
    - Browse (for Docker only) DB `Adminer` at [http://localhost:8080](http://localhost:8080)
    - Browse `Swagger Open API` Doc at [http://localhost:3000/api](http://localhost:3000/api)

## Running The App

`yarn run start` or `npm run start`

## Migration Commands

Synchronise and initial migration is set to false, so you need to run commands for the migrations. Here are some list of commands:

- Generate migration file with populated up and down functions, from User entity:
  `yarn migration:generate -n createUsers`
- Create a template for User table with empty up and down functions:
  `yarn migration:create -n createUsers`
- Run migration command:
  `yarn migration:run`
- Run migration rollback:
  `yarn migration:revert`

## Running Test

`yarn test` or `npm run test`

## Contribution Guidelines

Feel free to submit issues or PRs. You can checkout the coding style guide before submitting the PRs. Link is [here](https://github.com/basarat/typescript-book/blob/master/docs/styleguide/styleguide.md).

## Stay in touch

- Author - S M Asad Rahman
- Twitter - [@asad_rahman](https://twitter.com/asad_rahman)
