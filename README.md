# full-stack-js-bookshelf

## Overview
This is my first full-stack web application using
1. React as front end (create-react-app)
2. Node as back end (express)
3. Sqlite as database

## Local Usage
Follow the steps below to run this simple web app.
1. Run
```
git clone https://github.com/tony-507/full-stack-js-bookshelf
```
to download the repo.
2. Open terminal, and run
```
npm install
```
inside client folder and server folder.
3. Finally run
```
npm run devstart
```
in client folder to start the development environment.

## Features
My app has the following features:
1. Staff/ customer channels: Only staff can alter (add/ delete) database records, and know who is owning the books. Customers can only borrow/ return books, with 
limited visibility to book status (On Shelf/ Borrowed/ Not On Shelf)
2. Book Filtering: One can apply filter criteria to filter books. The filter criteria are selected to be top 5 items in each category.
3. Translation: The webpages have two language options -- traditional Chinese and English, but not for database records.
4. Account management: One can register a new account, and may even alter account information (not yet done).

## Current Objectives
1. Deployment to Heroku
2. Account information altering
3. Adaptation to REST API

## References
1. Backbone for the project: https://blog.alexdevero.com/react-express-sqlite-app/
2. Docs for different packages: knex, react-intl, express