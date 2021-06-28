<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

---

## old readme

# RS School REST service

## Требуемые приложения:

- Git - [Download & Install Git](https://git-scm.com/downloads);
- Node.js & npm - [Download & Install Node.js](https://nodejs.org/en/download/);
- Docker - [Download & Install Docker](https://docs.docker.com/get-docker/);
- PostgreSQL (опционально) - [Download & Install PostgreSQL](https://www.postgresql.org/download/)

## Скачать этот репозиторий:

- Zip архивом:
  - Выбрать интересующую ветку;
  - Нажать на кнопку **Code**, выбрать **Download ZIP**;
- С помощью `git clone`:
  - `git clone https://github.com/va-z/rss-node-js-2021q2.git <-b [branch_name]>`;

После успешного клонирования нужно перейти в директорию приложения - `cd ./rss-node-js-2021q2`. Открыть документацию при работающем приложении: `http://localhost:4000/doc/`. Локальные переменные находятся в файле `.env`.

## Работа в Docker:

1. Создать образы и запустить их контейнеры - `docker compose up --build`;
2. Завершить работу контейнеров - `docker compose down`;
3. Проверить образы с помощью _snyk_ - `docker scan [image-id]`;
4. Все тесты запускаются из контейнеров, удобно использовать Docker Desktop;
5. Запустить pgAdmin в браузере можно по адресу **localhost:8080**. Данные для входа и порт можно поменять в `.env`;

Миграции применяются автоматически при запуске приложения. Пересоздать миграцию - `npm run migration:generate`. Не забудьте удалить старую миграцию перед запуском приложения с новой миграцией!

Образ на DockerHub - [Download from DockerHub](https://hub.docker.com/r/vasiliz/rss-node-js-2021q2)

# Локальный запуск:

1. `npm install`;
2. Установите PosgreSQL, запустите pgAdmin;
3. На порте 5432 создайте новую базу данных с именем `db` либо любым другим, указанным в переменной `DB` из `.env`;
4. `npm run dev`;
5. `npm run test`;
6. `npm run lint`;

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
