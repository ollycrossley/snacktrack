```
███████ ███    ██  █████   ██████ ██   ██ ████████ ██████   █████   ██████ ██   ██
██      ████   ██ ██   ██ ██      ██  ██     ██    ██   ██ ██   ██ ██      ██  ██
███████ ██ ██  ██ ███████ ██      █████      ██    ██████  ███████ ██      █████
     ██ ██  ██ ██ ██   ██ ██      ██  ██     ██    ██   ██ ██   ██ ██      ██  ██
███████ ██   ████ ██   ██  ██████ ██   ██    ██    ██   ██ ██   ██  ██████ ██   ██


```

# SnackTrack Back End

Welcome to the SnackTrack back end! Here you can find all the code necessary to operate your own SnackTrack API server!

You can find all the existent API info on https://snacktrack.onrender.com/

## Getting Started

Before commencing, please ensure you're running a version of Node.js that's **at least v20.3.1**

To have access to the code. You'll need to clone this git repository into your local device. To do this, please enter

`git clone https://github.com/ollycrossley/snacktrack/`

into your terminal and access the back-end folder.

<br>

In order to connect to your databases, please add two .env files. First, a .env.development for creating your main database, and then a .env.test for creating your test database.

In each of these files, include the following code:

```
MONGODB_URI="your_database_name_here"
```

Before creating your database, first ensure you have npm initialised on your local device. You can do this by running:

```
npm init -y
```

Then, install dotenv as a dependency to ensure your seed functions correctly. You can install this with:

```
npm i dotenv
```

<br>

After this, you can create your databases and run the seed files.

Your test file will seed whenever you run tests (more later).

To create your production database, type

```
npm run seed-prod
```

into your terminal.

<br>

Finally, before you can interact with the API on your own device, install express as a final dependency.
To do this, type

```
npm i express mongoose
```

into your terminal.

## Interacting with the Database

You'll be able to interact with the database using several HTTP methods (via express). These are GET, POST, PATCH, and DELETE. You can use these methods on various endpoints to interact with the database you'll have seeded by now.

To see what endpoints are available, the methods you can use on them, and further information about each of these, perform a GET request to

```
/api
```

Alternatively, visit

```
https://github.com/ollycrossley/snacktrack/api
```

## Testing

If you'd like to further work on this codebase, you're likely going to want to test things out too. For this, please ensure you have the necessary devDependencies installed for testing.

These are jest, jest-extended, jest-sorted, and supertest.

To install jest, type

```
npm i -D jest
```

into your terminal.<br>

To install jest-extended, type

```
npm i -D jest-extended
```

into your terminal.<br>

To install jest-sorted, type

```
npm i -D jest-sorted
```

into your terminal.<br>

To install supertest, type

```
npm i -D supertest
```

into your terminal.

<br>
After this, ensure your package.json file's updated to all jest to run. First ensure you have jest set to your npm test.

```
"scripts": {
    "test": "jest"
  }
```

Next, update your package.json to include the following:

```
"jest": {
    "setupFilesAfterEnv": [
      "jest-extended/all",
      "jest-sorted"
    ]
  }
```

Each time you run a test, a new test database will be seeded, ensuring you don't ever inadvertently interact with your development database in a way you wouldn't want to.

<br>
