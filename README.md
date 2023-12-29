## How to Run This Project

1. Run `pnpm install` to install all dependencies

2. Run `pnpm setup:dev` to configure the docker

You can also configure the Docker by changing the `.env.development` environment variable

```bash
DATABASE_URL=
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASS=
DATABASE_PORT=
PORT=
```

3. Run `pnpm migrate:dev` to configure the database

4. Run `pnpm start:dev` to start the project
