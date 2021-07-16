# RS SCHOOL REST SERVICE

- [About](#about)
- [Performance](#performance)
- [Prerequisites](#prerequisites)
- [Download this project](#download-this-project)
- [Run locally](#run-locally)
- [Run in Docker](#run-in-docker)
- [Testing](#testing)
- [Development](#development)

## #About

This project was created for The Rolling Scopes School Node.js 2021Q2 course. Powered by:

<img src="https://cdn.svgporn.com/logos/nodejs-icon.svg" height="32" float="left" alt="Node.js Logo" />
<img src="https://cdn.svgporn.com/logos/nestjs.svg" height="32" float="left" alt="Nest Logo" />
<img src="https://cdn.svgporn.com/logos/postgresql.svg" height="32" float="left" alt="PostgreSQL Logo" />
<img src="https://cdn.svgporn.com/logos/docker-icon.svg" height="32" float="left" alt="Docker Logo" />

## #Performance

NestJS allows to run the project either as an Express or as a Fastify app. See the difference in performance below:

|                       |                                    | Express                                   | Fastify                                 |
| --------------------- | ---------------------------------- | ----------------------------------------- | --------------------------------------- |
| Scenarios             | [created, completed, success rate] | 3395, 3395, 100%                          | 3373, 3373, 100%                        |
| Requests              | [total, per second median]         | 20370, 66.43                              | 20238, 66                               |
| Latency, ms           | [min, max, median, p95, p99]       | 0, 7805, 10, 3117, 5576.2                 | 0, 3849, 10, 1884.6, 3117.1             |
| Scenario duration, ms | [min, max, median, p95, p99]       | 6118.2, 23159.6, 6170.6, 22036.6, 22925.7 | 6113.8, 16996.1, 6174, 15752.7, 16652.5 |

## #Prerequisites

To run this project, you need to have the following software installed.

- Git - [Download & Install Git](https://git-scm.com/downloads);
- Node.js & npm - [Download & Install Node.js](https://nodejs.org/en/download/);
- NestJS - [Download & Install NestJs](https://docs.nestjs.com/#installation);
- PostgreSQL (optional) - [Download & Install PostgreSQL](https://www.postgresql.org/download/);
- Docker (optional) - [Download & Install Docker](https://docs.docker.com/get-docker/).

#### Warning!

**NestJS must be installed globally**. Also, your computer must have **either** Docker or local PostgreSQL, or both.

## #Download this project

There are several ways you can download the project:

- As a zip archive:
  1. Select branch `task-9/nestjs`;
  2. Press the green **Code** button and select **Download ZIP**;
  3. Unzip the archive to your destination folder;
- Using `git clone`:
  1. Open the terminal;
  2. Enter `git clone https://github.com/va-z/rss-node-js-2021q2.git -b task-9/nestjs`;

You can set your environment variables in `.env` file before running.

## #Run locally

Before you run the project, install PostgreSQL and launch pgAdmin. Create a new database on port `5432` with the name `db` (`DB_PORT` and `DB` in `.env`). Set your PostgreSQL username in password in `.env` using `DB_USER` and `DB_PASSWORD` variables.

In `.env.`, set `USE_FASTIFY=true` if you want your app to use Fastify. Otherwise, set

1. Open the terminal in the project folder;
2. `npm install` - install all dependencies;
3. `npm run migration:run` - run migrations and create all entity tables in the database;
4. `npm run seed:run` - seed admin into the database;
5. `npm run start:dev` - start the project in dev mode;
6. `npm run lint` - check ESLint errors;

#### Warning!

Running `npm run seed:run` will result in an error if there already is an admin in the database. This is intentional behavior.

## #Run in Docker

Before you run the project, install Docker Desktop on your machine. Set your environment variables in `.env`.

1. Open the terminal in the project folder;
2. `docker-compose up build` - build project images and run the container;
3. Open Docker Desktop, select the `vasiliz/rss-node-js-2021-q2:app` container and open its command line. From there, run
4. `npm run seed:run` - seed admin into the database;
5. `npm run lint` - check ESLint errors;

#### Warning!

Running `npm run seed:run` will result in an error if there already is an admin in the database. This is intentional behavior.

## #Testing

When the application is running, open a terminal inside project folder **or** container (either one works) and enter:

- `npm run test:auth` - to run all tests with authorization;
- `npm run test:auth <suite name>` - to run only specific test suite with authorization (users, boards or tasks);

## #Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

In VSCode, press <kbd>F5</kbd> to debug. For more information, visit: https://code.visualstudio.com/docs/editor/debugging
