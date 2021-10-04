# full-stack-js-bookshelf

## Overview
This is my first full-stack web application using
1. React as front end (create-react-app)
2. Node as back end (express)
3. Postgres as database

You may find a public deployed version at https://bkmangement.herokuapp.com/.

## Local Usage
Follow the steps below to run this simple web app.
1. Clone the codes by running
```
git clone https://github.com/tony-507/full-stack-js-bookshelf
```
to download the repo.

2. Open terminal, and run
```
npm install
```
to install client side dependencies.

3. Set connections to appropriate backend URLs by changing values of the variables
```
accountURL, bookURL
```
in the script ```./src/components/api/index```.

4. Finally run
```
npm run start
```
to start front-end or
```
npm run dev
```
to start both client and server side if you also have server side installed.

## Features
My app has the following features:
1. Three modes (public/ customer/ admin): The book records are visible even if the user is not logged, but the user cannot perform any operation on the book. A customer can borrow or return a book and an admin can add or remove a book record.
2. Book Filtering: One can apply filter criteria to filter books. The filter criteria are selected to be top 5 items in each category.
3. Book Detail: A dynamic page listing details of a book.
4. Translation: The webpages have two language options -- traditional Chinese and English, but not for database records.
5. Account management: One can register a new account, and may even alter account information (not yet done).

## Current Objectives
1. Account information altering
2. Adaptation to REST API
3. Use of webpacks to build source

## References
1. Backbone for the project: https://blog.alexdevero.com/react-express-sqlite-app/
2. Docs for different packages: knex, react-intl, express, react-router-dom, typescript
3. Stackexchange for answers to different bugs and errors
