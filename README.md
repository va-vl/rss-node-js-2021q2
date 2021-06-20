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

Миграции применяются автоматически при запуске приложения. Пересоздать миграцию - `npm run migration:generate`.

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
