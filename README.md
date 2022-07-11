# EventWild at a Glance

EventWild is a full stack application that allows users to browse and reserve tickets for different events and manage their own events. Users are not required to sign up for an account if they are just browsing events. Logged in users can create, edit/delete their own events. Also, logged in users can reserve a tickets and cancel reservations for various events.
***

### Live site - https://eventwild.herokuapp.com/events

### Repo - https://github.com/lanakomar/EventWild-solo
***

## Getting Development Environment Up And Running
- Git Clone the repo to your local machine
- Install Dependencies:  run: 'npm install'
- Create a '.env' file that mirrors the '.env.example' file
- Create a user in your local postgreSQL database
- Then use the 'npx dotenv sequelize [suffix]' command with each suffix in order: 'db:create', 'db:migrate', 'db:seed:all'
- Start server:
    1. cd into backend folder, run npm start;
    2. cd into frontend folder, run npm start
***

## Application Architecture

EventWild is built on React/Redux frontend with an Express backend, using PostgreSQL as a database.

## Frontend Overview

EventWild depends on backend for queries and routes, but implemented frontend interactions to improve user experience.

### Frontend Technologies Used

- React

   Web pages of EventWild are rendered by React, a library for building reusable and responsive components.

- Redux

  The state of EventWild is kept in Redux store. That allows app's components access any state that it needs from the store.

- CSS

  EventWild uses CSS to style all of the HTML documents, including interactive buttons and dropdown menus.

- Javacript

  To improve user experience, EventWild uses Javacript to create a responsive experiance.

### Backend Overview

  EventWild uses an Express server with PostgreSQL database. EventWild also implemented features to protect user's password and information.

- Express.js

  The server of EventWild is set up with Express JS. It is minimal and flexible enough to carry out the desired functionality while maintining the code     dry.

- Express Validator

  Express Validator is powerful yet simple. EventWild makes sure when users are signing up, logging in, and creating new events or editing an existing     one, proper values have been inserted.

- PostgreSQL

  EventWild relies on PostgreSQL to maintain its relational database.

- Sequelize

  Sequelize makes it easy for EventWild to manage and query the database

- bcrypt

  EventWild values the security of users' passwords, that is why all of the passwords has been hashed by bcrypt before storing them into the database.

- CSRF Token

  A secure random CSRF token is generated on all forms that users fill in to prevent CSRF attacks.
