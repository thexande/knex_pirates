# CRUD with Express/PostgreSQL/Knex - PART 1

## OBJECTIVES

* Be able to use `knex` to connect to a postgres database
* Be able to abstract SQL queries out of routes and into functions
* Be able to construct all 6 CRUD routes
* Be able to construct CRUD views  

## Setup

Generate a new Express app in this directory by typing `express . --ejs`
(you may use Jade if you like) then:

```
npm install
nodemon
```

## Instructions

### STEP 1: Create the index page

In `views/index.ejs` add the heading and a link to `/pirates`

### STEP 2: Create a new routes file for pirates and wire it up

```
touch routes/pirates.js
```

Wire up the routes file in `app.js` and while your at it, delete the users routes since
we won't be using them. (OR, just rename all the users stuff to be pirates :D )
Whichever way you slice it, you should end up with the following:

__app.js__
```js
var pirates = require('./routes/pirates');

app.use('/', pirates);
```

### STEP 3: Write the pirates index route

__routes/pirates.js__
```js
var express = require('express');
var router = express.Router();

router.get('/pirates', function(req, res, next) {
  res.render('pirates/index');
});

module.exports = router;
```

## STEP 4: Create the pirates index template

This page will eventually iterate over and display all of our pirates. For now,
just add a `New Pirate` link that takes the user to `pirates/new`

```
mkdir views/pirates
touch views/pirates/index.ejs
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Pirates</title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <a href="/pirates/new">New Pirate</a>
  </body>
</html>

```

### STEP 5: Create the `/pirates/new` route

__routes/pirates.js__

```js
router.get('/pirates/new', function(req, res, next) {
  res.render('pirates/new');
});
```
## STEP 6: Create the new pirate template

Create the `/pirates/new.ejs` template and add a form for the user to submit new
pirates.

__NOTE:__ Challenge yourself to style this form without using any additional ids or classes :)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Pirates</title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <div class="container">
      <h2>Add a new pirate</h2>
      <form  action="/" method="post">
        <input type="text" name="name" placeholder="Pirate Name">
        <input type="text" name="poison" placeholder="What's yer poison?">
        <input type="text" name="accessory" placeholder="Pirate accessory">
        <input type="submit">
      </form>
    </div>
  </body>
</html>

```

### STEP 7: Create the `/pirates` `POST` route:

| CRUD Action      | verb | path  
|------------------|------|-----------------|
| __CREATE__       | POST | '/pirates'  


```js
router.post('/pirates', function(req, res, next) {
  // in here is where you'll write the code to grab user input and add it
  // to your database.
  res.redirect('/pirates');
});
```

Now you have the basic flow setup, it's time to add Postgres.

## Adding our database

We'll talk to Postgres using Knex: http://knexjs.org/

### Create the database and schema:

```
createdb pirates_development
psql pirates_development
```

```sql
CREATE TABLE pirates (id serial, name text, poison text, accessory text)
```


__Install and configure knex:__

```
npm install --save pg knex
knex init
```

__Update `knexfile.js` with the following:__

```js
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/pirates_development'
  }
};
```

__Establish a connection to the database by creating a file named `db/knex.js` with the following:__

```js
var config = require('../knexfile.js')['development'];
module.exports = require('knex')(config);
```

## Abstracting our database calls out of our routes

We want to keep our routes lean and clean! All this raw SQl is making our routes
really 'noisy'. Let's pull these queries out into a separate file and just call
some pretty functions in our routes to get the job done.

```
mkdir lib
touch lib/queries.js
```

Now, instead of connecting to our database in our route files, we'll make that
connection in our `lib/queries.js` file where all of our queries will be written.

__In `lib/queries.js` establish a connection to the database:__

```js
var knex = require('../db/knex');
```
__THEN complete the functions below__

```js

module.exports = {
  create: function (pirate) {
    // write the raw SQl here
  },
  all: function () {
    // write the raw SQl here
  },
  find: function (id) {
    // write raw SQL here
  },
  updateOne: function (id) {
    // write raw SQL here
  },
  destroy: function (id) {
    // write raw SQL here
  }
}

```

## Complete our CRUD routes in `routes/pirates.js`

__Start by importing your queries:__

```js
var Pirates = require('../lib/queries')

```
__THEN use the functions to complete your routes:__

```js
router.post('/', function (req, res) {
  Pirates.create(req.body).then(function () {
    res.redirect('/pirates');
  })
})
```

### Showing all pirates on the index page

__Update the index route to pull all pirates from the database:__

```js
router.get('/', function(req, res, next) {
  Pirates.all().then(function (pirates) {
    res.render('pirates/index', {pirates: pirates});
  });
});
```
__Display all pirates in a table on the index page__

### Create the show page

Make each pirate name a link to the pirate `show` page. Then, complete your
route:

```js
router.get('/:id', function(req, res, next) {
  Pirates.find(req.params.id).then(function (pirate) {
    res.render('pirates/show', {pirate: pirate.rows[0]});
  })
});
```

__Create the show page and display all the pirate information.__

```
touch views/pirates/show.ejs
```
```html
<div class="container">
  <h1>Showing <%= pirate.name %></h1>
  <p>
    Poision: <%= pirate.poison %>
  </p>
  <p>
    Accessory: <%= pirate.accessory %>
  </p>
</div>

```
### Your turn!! - Edit / Update

__Here's what you have to do:__

- Create an edit route
- Create a form that has the fields from the pirate pre-populated
- The form should POST to `/pirates/:id`
- The update route should update that record, and redirect to the show page

- You can see how to define dynamic routes from the show route
- You can see how to find the individual record from the show route
- You know how to update a record in `SQL`, and you have a link to [SQL Quick Reference](http://www.w3schools.com/sql/sql_quickref.asp)
- You know how to redirect from the create route

---

### And finally, Delete

In this case, our `DELETE` route can be either `POST` or `GET`. See the note under __CRUD Routes__
for more details.

Then add your delete route that will delete the record from the table and then redirect to the index page.

# CRUD Routes (not _excatly_ RESTful)

| action      | verb        | path  
|-------------|-------------|--------------------------------|
| __NEW__     | GET         | '/pirates/new' (displays a form)
| __CREATE__  | POST        | '/pirates'       
| __READ__    | GET         | '/pirates'       
| __UPDATE__  | POST        | '/pirates/:id'       
| __DELETE__  | GET / POST  | '/pirates/:id/delete'
| __EDIT__    | GET         | '/pirates/:id/edit' (display pre-filled form)

Notice the above routes _don't_ include `PUT` or `DELETE` as route verbs. This is because
our browser (specifically the _action_ attribute in our form) is limited to just `GET` and `POST`. Because our backend (Node/Express) is rendering views and taking user input, our routes are also now limited by the browser.
