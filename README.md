
# LANGU UMBALA

https://langu-umbala.netlify.com/

## Screenshots

![alt text](screenshots/login.jpg "login page")

![alt text](screenshots/repetition.jpg "repetition page")

## Functional Specification

### Overview

The purpose of Langu Umbala is to help users to learn Vietnamese words through space-repetition behavior.
Disclaimer: This project is mainly built for learning purposes and not intended for production use.

Non-Goals
This version will not support the following features:

* Multiple language support
* Sharing between Accounts


### Functionality

#### Frontend

The frontend for the app will be built using React and Redux, and allow users to login, answer the questions, and see how many questions they have successfully answered. To answer a question the user will be shown a word in the language they are trying to learn in the center of the screen, and asked to type the corresponding word in their native language on the section right below. When they submit the they will be given feedback on whether they were correct, and they can click on the next button which will take them to the next question.

The frontend will need to submit information stating whether the question was answer correctly or not to the backend so that the spaced repetition algorithm can take that into account. This will also allow the user's score (how many questions they have answered correctly) to be updated.nd will take care of the rest.

##### Requirements

- Technologies: React, Redux
- Two pages: Landing page and spaced repetition page
- Landing page:
  - Welcome new users
  - Register/login
- Spaced repetition page:
  - Displays current words
  - Text input for answer
  - Notifies the user whether they were correct or incorrect
  - Submits correct/incorrect to backend
  - Displays a count of how many questions were answered correctly

#### Backend

The backend of the app plays three key roles. The first is authentication. To allow users to authenticate, the backend should use 
JWT authentication for passport.

The second role is to integrate the spaced repetition algorithm into your app. It should have an endpoint for the frontend to fetch the next question from, and an endpoint for the frontend to record what the user's response was.

The third role is to store the users' progress in a MongoDB database. This should include both the number of questions which they have answered correctly, plus any information about their answer history that your spaced repetition algorithm needs in order to generate a new sequence of words to test the user.

##### Requirements

- Technologies: Node.js, Express, MongoDB, Passport
- Allow users to register/login using local and jwt authentication
- Use the spaced repetition algorithm to generate the next word pair
- Words should be stored in a Mongo database
  - This should be a linked-list of questions for an MVP
- Store the number of questions which users have answered correctly in the database
- Store whatever information is needed for the algorithm about the user's answer history in the database



