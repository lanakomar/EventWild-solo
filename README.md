# EventWild at a Glance

EventWild is a full stack application that allows users to browse and reserve tickets for different events and manage their own events. Users are not required to sign up for an account if they are just browsing events. Logged in users can create, edit/delete their own events. Also, logged in users can reserve a tickets and cancel reservations for various events.
</br>
<h5 align= "center" dir="auto">
   <a href="https://eventwild.herokuapp.com/events">» Live Link «</a>
</h5>
</br>

### Main Stack Technologies
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
</br>
![Express](https://img.shields.io/badge/express-000000.svg?style=for-the-badge&logo=express&logoColor=white)
![Sequelize](https://img.shields.io/badge/sequelize-%23323330.svg?style=for-the-badge&logo=sequelize&logoColor=52B0E7)
![PostgeSQL](https://img.shields.io/badge/postgresql-Eaeaea.svg?style=for-the-badge&logo=postgresql&logoColor=#4169E1)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
***

## Features

### User Auth
  - Create an account or Sign in and Log out
  - Sign in as Demo user to access full site functionality
### Events
  - Browse through 24 newest events
  - View details of the particular event
  - Create event
  - Edit and delete of your own event
### Tickets
  - Reserve a ticket/tickets for an event
  - Cancel ticket/tickets reservation
***  

<h4 align= "center">Main Page</h4>
<img width="1346" alt="Screen Shot 2022-07-11 at 12 32 07 PM" src="https://user-images.githubusercontent.com/97191078/178343945-d9588109-80e7-414d-bf9c-0d05c651371f.png">

<h4 align= "center">Create Event Form</h4>
<img width="1344" alt="Screen Shot 2022-07-11 at 12 25 54 PM" src="https://user-images.githubusercontent.com/97191078/178343985-9ea537b7-e44c-43b0-8845-a1086e128e92.png">

<h4 align= "center">Event's page</h4>
<img width="1345" alt="Screen Shot 2022-07-11 at 12 25 14 PM" src="https://user-images.githubusercontent.com/97191078/178344081-a82716d5-eee5-4496-a7d5-827df7eef285.png">

<h4 align= "center">Reserve a Ticket</h4>
<img width="1346" alt="Screen Shot 2022-07-11 at 12 25 37 PM" src="https://user-images.githubusercontent.com/97191078/178344119-de0e70f1-8d01-4c03-9fb9-26c1cbc27b3e.png">


## Getting Development Environment Up And Running
- Git Clone the repo to your local machine
- Install Dependencies:  run: 'npm install'
- Create a '.env' file that mirrors the '.env.example' file
- Create a user in your local postgreSQL database
- Then use the 'npx dotenv sequelize [suffix]' command with each suffix in order: 'create:db', 'db:migrate', 'db:seed:all'
- Start server:
    1. cd into backend folder, run npm start;
    2. cd into frintend folder, run npm start
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
