# SQL Intro & Postgres for Kilovolt Blog

**Author**: Koko Kassa and Steven Carpenter
**Version**: 1.0.0

## Overview
This is a demonstration of the Kilovolt blog using postgresSQL to store and
retrieve articles.

## Getting Started
The user needs to clone the repository to their local machine and navigate to
that directory. Following that, they need to use their postgresql installation
to create a database named kilovolt. This is necessary as all the data is
stored in this database. Then, they need to use the `npm install` command on
the command line in the project directory to install all the dependencies in
the package.json file. Once all this is complete they can open the webpage in
the browser using nodemon.

## Architecture
###Libraries Used
-pg - postgresql library
-fs - filesystem interaction library
-nodemon - monitororing library for restarting the server automagically
-express - MVC library
-body-parser - Library for parsing JSON

## Change Log
Thu Dec 14 09:37:04 2017 -0800: installed packages and got github all set up
Thu Dec 14 09:49:01 2017 -0800: passed the appropiate argument for instantiating a new Client and connected to th database
Thu Dec 14 10:10:37 2017 -0800: got connected to the right server and port
Thu Dec 14 10:12:37 2017 -0800: Merge pull request #1 from kowserk7/koko-steven
Thu Dec 14 10:27:15 2017 -0800: Removed JSON section from new page
Thu Dec 14 10:46:12 2017 -0800: Fixed linter errors
Thu Dec 14 10:47:05 2017 -0800: Uppackage-lock.json: Thu Dec 14 10:46:38 2017 -0800: Removed JSON code doing an export to the new page
Thu Dec 14 12:26:59 2017 -0800: responded to the first half of the comments
Thu Dec 14 12:48:07 2017 -0800: finished answering all the comments

## Credits and Collaborations
[Handlebars.js](http://handlebarsjs.com/)
[jQuery](https://jquery.com/)
[Highlight.js](https://highlightjs.org/)
[Marked.js](https://github.com/chjj/marked)
[NodeJS](https://nodejs.org)
[npm](https://www.npmjs.com/)
[PostgreSQL](https://www.postgresql.org/)
