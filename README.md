## Portfolio Tracking API

The project can be found live at [heroku](https://sheltered-brook-46322.herokuapp.com/).

### Requirements
- Node LTS v10.5 & npm v6.0

### Technology Stack and Features:
- **Node**
- **Express + MongoDB**
- **Mongoose**
- **Docker** Support
- Request Validation with **Joi**
- Linting with **eslint**
- Logging with **winston** logger.
- Uses **helmet** to set some HTTP headers for security.
- Pre-commit hook to check lint errors using **Husky**.
- API documentation using **Swagger-jsdoc** and **Swagger UI**.

### Running Locally

Make sure you have node and npm installed.

- Clone the repository or Download zip.
- Run `npm install` in the directory.
- Set environment variables `cp .env.example .env`
- Run `npm run dev`

Dockerfile is present to build image and run container just remember to pass the env vars for container.

### How to use:

- I have feeded the mlab DB with three securities to begin with.
- Portfolio would be empty.
- Price of any security can be changed by the endpoint easily.
- Buy and sell securities by adding trades.
- Check holdings and portfolio by the respective APIs.
- Calculate returns by changing current price through API.

### Linting

- Run `npm run lint`

### Documentation

API is documented using swagger and open API specification.

You can check the documentation online at specified URLs:

- [Swagger Documentation](https://sheltered-brook-46322.herokuapp.com/api/docs/)
- [Postman Collection](https://documenter.getpostman.com/view/3432899/RztitA2H)

You can download/import the Postman Collection from this [URL](https://www.getpostman.com/collections/42ad05c74ee4f979fd95).

### Design Decision:

- **Folder Structure** - Folder Structure follows **MVC design pattern**.
- Routes, Controllers and models are seperated which makes testing specific unit easy.
- Swagger is used to document the API which makes the API easy to understand for other developers.
- Used gzip compression: Gzip compressing can greatly decrease the size of the response body and hence increase the speed of a web app. 
- Logging is being handled by winston which can be further extended for log files.
- Try/Catch and Promises are being used and handled properly so that app doesn't crashes.
- `env` file is used to assign values to environment variables like `MONGO_URI`.
- App uses async/await and latest ES6 features.
- Seperate Express `app` and `server` which makes testing the express app easy(example by using `supertest`).
- App follows `Fail-fast approach` and validates arguments using Joi.

### Code Style Practices:

- Uses ESLint and husky pre-commit hook to maintain code quality.
- Function and variable names are tried to be kept as self-explanatory.
-  Used `const` over `let`. Ditched the `var`.
- Requires come first, and not inside functions.
- Use Strict equals(===), arrow functions(=>) & avoided callback hell.

### Future Improvements which can be made:

- App can be run in a cluster by a process manager like pm2.
- Testing can be added using mocha and chai.
- Fixtures can be used for testing purposes.
- App structure can be changed to `component design pattern` so that scaling the application is more easy.
- Proper Error Handler can be made which makes error handling of the API more robust and handles the error centrally instead of the middleware.
