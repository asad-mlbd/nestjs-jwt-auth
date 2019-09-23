## Description

NestJS JWT authentication service using NestJS, Docker and MySQL. It can be used as a JWT Auth Microservice or can be used as starter repository for an API project.

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
