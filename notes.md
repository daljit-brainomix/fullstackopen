### Create a new React project
#### npm 7+, extra double-dash is needed:

`npm create vite@latest introdemo -- --template react`

### Start the JSON Server without a separate installation by running the following npx command in the root directory of the application:

`https://github.com/typicode/json-server`

`npm install axios`
`npm install json-server --save-dev`

`npx json-server --port 3001 db.json`


```
Vite requires all env variables to start with VITE_

Vite loads .env variables only on startup. If you just added the .env file, restart the dev server:

or write directly

export VITE_SOME_KEY=54l41n3n4v41m34rv0 && npm run dev // For Linux/macOS Bash
($env:VITE_SOME_KEY="54l41n3n4v41m34rv0") -and (npm run dev) // For Windows PowerShell
set "VITE_SOME_KEY=54l41n3n4v41m34rv0" && npm run dev // For Windows cmd.exe

export VITE_WEATHER_API_KEY=asdfasfsadfsfsdf
```

On the BE server - `npm install cors`


A production build for applications created with Vite can be created with the command `npm run build`.


`MONGODB_URI="your_connection_string_here" npm run dev`

`npm install dotenv`

`npm install eslint @eslint/js --save-dev`

`npx eslint --init`

```
@eslint/create-config: v1.8.1

✔ What do you want to lint? · javascript
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · commonjs
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · no / yes
✔ Where does your code run? · browser
The config that you've selected requires the following dependencies:

eslint, @eslint/js, globals
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · npm
☕️Installing...
added 1 package, changed 1 package, and audited 170 packages in 646ms

39 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
Successfully created /home/dsingh/courses/fullstackopen/part4/blog/eslint.config.mjs file.
```

`https://eslint.style/packages/js`

`npm install --save-dev @stylistic/eslint-plugin-js`

`npx eslint index.js`

`https://dev.to/nermineslimane/always-separate-app-and-server-files--1nc7`

YouTube - Functional JavaScript
`https://www.youtube.com/watch?v=BMUiFMZr7vk&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84`

Transform list into something else
map - takes an array and transform that into an array of the same length with each individual items transformed.
filter -  tranforms an array to a smaller array
reject - Same as filter but inverted.

find -  Same as filter, but only returns first item. Transforms array to single item.
reduce - Traverses through all items/objects of an array 

`https://nodejs.org/api/assert.html#assertdeepstrictequalactual-expected-message`


```
{
  // ...
  "scripts": {

    "start": "NODE_ENV=production node index.js",
    "dev": "NODE_ENV=development node --watch index.js",
    "test": "NODE_ENV=test node --test",
    "lint": "eslint ."
  }
  // ...
}
```
We specified the mode of the application to be development in the npm run dev script. We also specified that the default npm start command will define the mode as production.

There is a slight issue in the way that we have specified the mode of the application in our scripts: it will not work on Windows. We can correct this by installing the cross-env package

`npm install cross-env`

Take a look at `https://github.com/node-config/node-config`

Let's use the supertest package to help us write our tests for testing the API.

https://github.com/visionmedia/supertest

npm install --save-dev supertest

The npm test command executes all of the tests. 
One option is https://nodejs.org/api/test.html#testonlyname-options-fn which runs `test.only()` tests

`npm test -- --test-only`

However it requires changing code back to `test()` later on.

Second option is to run tests of a specific file. `npm test -- tests/note_api.test.js`

To run all of the tests that contain notes in their name `npm run test -- --test-name-pattern="notes"`

-----------------------------------------------------

Async/await unclutters the code a bit, but the 'price' is the try/catch structure required for catching exceptions. All of the route handlers follow the same structure
```
try {
  // do the async operations here
} catch (exception) {
  next(exception)
}
```

The express-async-errors library has a solution for this.

`npm install express-async-errors`

Because of the library, we do not need the next(exception) call anymore. The library handles everything under the hood. If an exception occurs in an async route, the execution is automatically passed to the error-handling middleware.

---------------------------------------------------

Promise.all executes the promises it receives in parallel. If the promises need to be executed in a particular order, this will be problematic. In situations like this, the operations can be executed inside of a for...of block, that guarantees a specific execution order.