# Task-assistant

## Features

- **FastAPI** with Python 3.10
- **React** with Typescript, react-router
- Postgres
- SqlAlchemy with Alembic for migrations
- Pytest for backend tests
- Docker compose for easier development
- Nginx as a reverse proxy to allow backend and frontend on the same port

## Development

The only dependencies for this project should be docker and docker-compose.

### Quick Start
Use .env-template for create file .env and setup values

_Note: Ports might be like in nginx.conf_

Starting the project
(the first time it will take a while):

```bash
docker-compose up -d
```

And navigate to:
1. http://localhost:8000 for frontend
2. http://localhost:8000/api/docs Auto-generated docs will be at
3. http://localhost:5555/ for flower


_Note: If you see an Nginx error at first with a `502: Bad Gateway` page, you may have to wait._

### Rebuilding containers:

```
docker-compose build
```

### Restarting containers:

```
docker-compose restart
```

### Bringing containers down:

```
docker-compose down
```

## Migrations

Migrations are run using alembic. To run all migrations:

```
docker-compose run --rm backend alembic upgrade head
```

To create a new migration:

```
alembic revision -m "create users table"
```

And fill in `upgrade` and `downgrade` methods. For more information see
[Alembic's official documentation](https://alembic.sqlalchemy.org/en/latest/tutorial.html#create-a-migration-script).

### Backend Tests

```
docker-compose run backend pytest
```

any arguments to pytest can also be passed after this command

## Logging

```
docker-compose logs
```

Or for a specific service:

```
docker-compose logs -f name_of_service # frontend|backend|db
```
