Backend:

1. initialize server's package.json
npm init -y

2. Install dependencies:
npm install bcryptjs
npm install cookie-parser
npm install cors
npm install csurf
npm install dotenv
npm install express
npm install express-async-handler
npm install express-validator
npm install helmet
npm install jsonwebtoken
npm install morgan
npm install per-env
npm install pg@">=8.4.1"
npm install sequelize@5
npm install sequelize-cli@5


3. Install the following packages as dev-dependencies:
npm install -D dotenv-cli
npm install -D nodemon

4. Create .env in the backend folder

5. To generate JWT and put it in .env
openssl rand -base64 10

6. In the backend create config folder,
   create index.js with environment variables settings

7. In the backend folder create .sequelizerc to configure db

8. Initialize db folder
npx sequelize init

9. Replace the content of config/database.js file

10. In psql: create user with the same credentials as in .env
psql
create user event_wild_app with password 'SuPeRsTrOnG!P@sSwOrD!' createdb;
\q

11. In terminal run command to create db
npx dotenv sequelize db:create

12. In backend create app.js,
    initialize express application,
    connect morgan, cookieParser(), express.json()
    add cors(), helmet, csurf

13. Create routes folder

14. Inside routes folder create index.js,
    connect routes in app.js(import routes!)

15. Create in the backend folder create folder bin,
    inside bin create file www,
    add server configurations inside www

16 In package.json add scripts:
    "scripts": {
    "sequelize": "sequelize",
    "sequelize-cli": "sequelize-cli",
    "start": "per-env",
    "start:development": "nodemon -r dotenv/config ./bin/www",
    "start:production": "node ./bin/www"
    }

17. Create api folder inside routes,
    inside api folder - index.js
    Create router in inidex.js, export it

18. In routes/index.js
   connect to the api router

19. Error Handling:
    404 error handler
    sequelize error handler
    error formatter

20. User Authentication:
    Create Users table
    npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string

    Configure migration file and model file, migrate
    npx dotenv sequelize db:migrate

    Undo migration:
    npx dotenv sequelize db:migrate:undo

    Check in the psql:
    psql <database name> -c '\d "Users"'

    Generate seeds file for Users table
    npx sequelize seed:generate --name usersData

    Seed the db
    npx dotenv sequelize db:seed:all

    Undo seeding
    npx dotenv sequelize db:seed:undo:all

    Check if users were created
    psql <database name> -c 'SELECT * FROM "Users"'

    In User model define model scopes
    Create User.prototype methods: toSafeObject()
                                   validatePassword(password)
                                   getCurrentUserById(id)
                                   login
                                   signup
    Create utils folder, iside - auth.js
    In auth.js: setTokenCookie
                restoreUser
                requireAuth

20. Create user auth api routes:
    Login: POST /api/session
    Logout: DELETE /api/session
    Signup: POST /api/users
    Get session user: GET /api/session


 ({
    email: 'spidey@spider.man,
    username: 'Spidey',
    password: 'password'
  })

21. Implement validation of the request body



Frontend:

1. Set up Redux
   Create frontend folder
   npx create-react-app . --template @appacademy/react-redux-v17 --use-npm
   npm install js-cookie

2. Set up proxy


window.csrfFetch('/api/test', {
  method: 'POST',
  body: JSON.stringify({ credential: 'Demo', password: 'demoPassword' })
}).then(res => res.json()).then(data => console.log(data));


window.store.dispatch(window.sessionActions.login({
  credential: 'Demo',
  password: 'demoPassword'
}));


window.csrfFetch('/api/session', {
  method: 'POST',
  body: JSON.stringify({ credential: 'Demo', password: 'demoPassword' })
}).then(res => res.json()).then(data => console.log(data));
