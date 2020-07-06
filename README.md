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
- **API Documentation**
    - To get API documentation run following command & browse at [http://127.0.0.1:8089/](http://127.0.0.1:8089/)
    ```
    $ yarn run start:api-doc
    ```
- **API** 
  With above steps done, API should be up and running
    - Browse `API` at [http://localhost:3000](http://localhost:3000)
    - Browse `Swagger Open API` Doc at [http://localhost:3000/api](http://localhost:3000/api)
    - Browse (for Docker only) DB `Adminer` at [http://localhost:8080](http://localhost:8080)

## Migration

- `TypeORM CLI` used to manage DB migration. ORM configurations are available in the `orm.config.ts` file.
- Migration auto-synchronization is set to `true` in `development` environment, and `false` in other environments.
- To create a new empty migration file, use `migration:create` command.
```
$ yarn migration:create -n createUsers
```
- TypeORM can generate a migration file from changed entity files comparing with the database. To generate a populated migration file from entity files, use `migration:generate` command
```
$ yarn migration:generate -n createUsers
```
- To run DB migration:
```
$ yarn migration:run
```
- To rollback migration:
```
$ yarn migration:revert
```

Read more about TypeORM migration [here][https://typeorm.io/#/migrations]

## Running Test

`yarn test` or `npm run test`

## Contribution Guidelines

Feel free to submit issues or PRs. You can checkout the coding style guide before submitting the PRs. Link is [here](https://github.com/basarat/typescript-book/blob/master/docs/styleguide/styleguide.md).

## Stay in touch

- Author - S M Asad Rahman
- Twitter - [@asad_rahman](https://twitter.com/asad_rahman)
