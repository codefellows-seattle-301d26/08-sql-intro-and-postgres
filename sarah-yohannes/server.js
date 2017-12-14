'use strict';

const fs = require('fs');
const express = require('express');
const { Client } = require('pg');

const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();


const conString = 'postgres://sarah:123@localhost:5432/kilovolt';
const client = new Client(conString);


// REVIEW: Use the client object to connect to our DB.
client.connect();



// REVIEW: Install the middleware plugins so that our app can use the body-parser module.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));


// REVIEW: Routes for requesting HTML resources
app.get('/new', (request, response) => {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // This line is saying, hey router (express, via 'app') when the 'view' requests '/new', go to the server/'controller' and get new.html from the public directory, then send that file to the client.  This corresponds to #2 and #5. 
  response.sendFile('new.html', {root: './public'});
});


// REVIEW: Routes for making API calls to use CRUD Operations on our database
app.get('/articles', (request, response) => {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? 

  //Answer This is doing part 3 and 4 in the diagram because we are only interacting between the server.js and the model.

  //Which method of article.js is interacting with this particular piece of `server.js`?

  //Answer: The fetch all method is connected to this section of code

  // this line says hey router, when the router asks for /articles, go to the model, and select EVERYTHING, then take the rows (ie all the article objects) from that 'select all' function and send them as the response, when 'app' ie 'express' ie the controller/router requests /articles.  Which is to say when something on the view, triggers a request for the URI '/articles'.

  //Comment Pt2:  What part of CRUD is being enacted/managed by this particular piece of code?
  //Anser: The read part becuase it isnt creating updating or destroying; It is just going into the database, selecting all the article objects, and returning them when requested.

  client.query('SELECT * FROM articles')
    .then(function(result) {
      response.send(result.rows);
    })
    .catch(function(err) {
      console.error(err)
    })
});

app.post('/articles', (request, response) => {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? 
  //Answer: 3 and 4
  //Which method of article.js is interacting with this particular piece of `server.js`? 
  // In Article.proptotype.insertRecord $.post. It is the only time in server.js that interacts with .post directly

  //COMMENT: What part of CRUD is being enacted/managed by this particular piece of code?
  // Answer: It is the Create part of CRUD, it is inserting a new article/record into the /articles database.
 
  client.query(
    `INSERT INTO
    articles(title, author, "authorUrl", category, "publishedOn", body)
    VALUES ($1, $2, $3, $4, $5, $6);
    `,
    [
      request.body.title,
      request.body.author,
      request.body.authorUrl,
      request.body.category,
      request.body.publishedOn,
      request.body.body
    ]
  )
    .then(function() {
      response.send('insert complete')
    })
    .catch(function(err) {
      console.error(err);
    });
});

app.put('/articles/:id', (request, response) => {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? 
  // RESPONSE: 3 and 4
  // Which method of article.js is interacting with this particular piece of `server.js`? 

  // RESPONSE: this is interacting with the updateRecord method.

  // What part of CRUD is being enacted/managed by this particular piece of code?
  // RESPONSE: this is Updating an existing record in the articles database.
  client.query(
    `UPDATE articles
    SET
      title=$1, author=$2, "authorUrl"=$3, category=$4, "publishedOn"=$5, body=$6
    WHERE article_id=$7;
    `,
    [
      request.body.title,
      request.body.author,
      request.body.authorUrl,
      request.body.category,
      request.body.publishedOn,
      request.body.body,
      request.params.id
    ]
  )
    .then(() => {
      response.send('update complete')
    })
    .catch(err => {
      console.error(err);
    });
});

app.delete('/articles/:id', (request, response) => {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? 
  // RESPONSE: 3 and 4
  //Which method of article.js is interacting with this particular piece of `server.js`? 
  // RESPONSE: this is interacting with the deleteRecord method in article.js, the app  makes a request to the database (client) saying DELETE the record at this article_id, the database executes the command and responds with wither complete or error.

  //What part of CRUD is being enacted/managed by this particular piece of code? 
  // RESPONSE: this is the delete part of crud
  
  client.query(
    `DELETE FROM articles WHERE article_id=$1;`,
    [request.params.id]
  )
    .then(() => {
      response.send('Delete complete')
    })
    .catch(err => {
      console.error(err);
    });
});

app.delete('/articles', (request, response) => {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? 
  // 3 and 4
  //Which method of article.js is interacting with this particular piece of `server.js`? 
  // this is interacting with the truncateTable method, which says go to articles and delete.
  //What part of CRUD is being enacted/managed by this particular piece of code?
  // this is corresponding to the Delete aspect of CRUD
  client.query(
    'DELETE FROM articles;'
  )
    .then(() => {
      response.send('Delete complete')
    })
    .catch(err => {
      console.error(err);
    });
});

// COMMENT: What is this function invocation doing?
// it's creating the database structure if it does not already exist and then calling the loadArticles function (load articles then accesses the hackeripsum file if there is not already content in the database)

loadDB();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});


//////// ** DATABASE LOADER ** ////////
////////////////////////////////////////
function loadArticles() {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // PUT YOUR RESPONSE HERE
  client.query('SELECT COUNT(*) FROM articles')
    .then(result => {
    // REVIEW: result.rows is an array of objects that PostgreSQL returns as a response to a query.
    // If there is nothing on the table, then result.rows[0] will be undefined, which will make count undefined. parseInt(undefined) returns NaN. !NaN evaluates to true.
    // Therefore, if there is nothing on the table, line 158 will evaluate to true and enter into the code block.
      if(!parseInt(result.rows[0].count)) {
        fs.readFile('./public/data/hackerIpsum.json', (err, fd) => {
          JSON.parse(fd.toString()).forEach(ele => {
            client.query(`
              INSERT INTO
              articles(title, author, "authorUrl", category, "publishedOn", body)
              VALUES ($1, $2, $3, $4, $5, $6);
            `,
              [ele.title, ele.author, ele.authorUrl, ele.category, ele.publishedOn, ele.body]
            )
          })
        })
      }
    })
}

function loadDB() {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // PUT YOUR RESPONSE HERE
  client.query(`
    CREATE TABLE IF NOT EXISTS articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      "authorUrl" VARCHAR (255),
      category VARCHAR(20),
      "publishedOn" DATE,
      body TEXT NOT NULL);`
  )
    .then(() => {
      loadArticles();
    })
    .catch(err => {
      console.error(err);
    });
}
