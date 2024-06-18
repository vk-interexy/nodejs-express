INSTALLATION:
-------------

1. `npm i` - installs node packages
2. `cp .env-default .env` - copies a templated config file


DEV RUNNING:
------------

1. `docker-compose up` - runs a mongo db in the Docker
2. `npm run develop` - runs a web script in dev mode (the server will be restarted after any change in the code)


PROD BUILDING AND RUNNING:
--------------------------

1. `npm run build` - builds the typescript code into the js.
2. `npm run start` - runs a web script in prod mode 

TESTING:
--------

You can test it using the `POSTMAN` for instance

1. `[GET] http://localhost:3001/users` - returns a list of users.
2. `[POST] http://localhost:3001/users` - creates a new user. As a payload you can use this: 

```
{
    "name": "Alex",
    "email": "alexermashev@gmail.com",
    "age": 18
}
```

APPLIED CHANGES:
----------------

1. The `typescript` integration was added.
2. Added a `prettier` and `jest` integration (for unit testing).
3. The folder structure was build based on the `Onion` architecture approach. https://blog.allegro.tech/2023/02/onion-architecture.html.
4. A global error handling was added.
6. A logging of every request was added.
5. Added email validator to be sure that we accept only once a user email.
6. Added a `docker-compose` file for running dependencies like mongo.
7. All configs are stored in the `.env` file

FOLDERS STRUCTURE
-----------------


1. `src/domain` - entities,  entity abstract repositories (`Domain Layer`)
2. `src/services` - concrete service implementation for interacting with the domain (business logic) (`Application Layer`)
3. `src/infrastructure` - db connections, db models, concrete entity repository implementations (`Infrastructure Layer`)
4. `src/api` - controllers, validators, responses (`Presentation Layer`)
