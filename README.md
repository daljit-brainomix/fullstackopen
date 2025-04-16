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

