# Installation instructions

- run `npm install` or `yarn` to install all the packages
- run `npm run dev` to run the application in the development environment
- run `npm run build` to build the app in a production setting
- run `npm start` to start and run the API
- in order to test the application code `npm run test` can be used. In case if any caching problems or tests not running completely just press `a` to run all the tests, and run the test command with `-- --clearCache`
- and in order to get the coverage report of the test one can use `npm run test:coverage`
- one can change the base url of the shortened service in the `.env` file

_**OPEN API SPECIFICATION**_ has been followed to document the routes (_this can be seen in the routes file with `.yaml` file and within `route` file as comments_), but in order to build and host it one need another tools, which is not implemented, but one can easily do it with the following packages:

- _openapi-comment-parser_ (1.0.0)
- _swagger-ui-express_ (for front end hosting)

One can also use `docusaurus` which is considered modern

_Database is not considered, but one can easily change up the implementation within the data-access folder and bring in database_

Following packages are used for better development workflow:

- _prettier_
- _commitlint_
- _husky_
- _eslint_

And the following tools can be introduced to make the development much more easier;

- _docker_

The following code piece can be implemented for better performance and optimization:

- `rate limiting` - to secure the API calls from DDoS
- a `redis cache layer`, to reduce the hit on the DB layer (if one is implemented later on)

# Examples

### Encode

- _`curl -d '{"url": "https://www.example.com"}' -X POST -H 'Content-Type: application/json' http://localhost:3000/api/1.0/dev/url/encode`_
- response : _`{url: "https://short.est/OCscMSicYJ"}`_

### Decode

- _`curl -d '{"url": "https://short.est/OCscMSicYJ"}' -X POST -H 'Content-Type: application/json' http://localhost:3000/api/1.0/dev/url/encode`_
- response : _`{url: "https://www.example.com"}`_
