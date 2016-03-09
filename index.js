'use strict'

require('dotenv').config()

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

var express    = require('express') // import express.js
var bodyParser = require('body-parser') // parse request bodies
var path       = require('path')

var app    = express() // create the express application
var server = require('http').createServer(app) // create the server

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

var knex = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: 'knex,public',
  pool: {
    min: 0,
    max: 7
  }
})

// Start the app only when run with npm start
// Don't run it when imported into the tests
if (require.main === module) {
  server.listen(3000, function () {
    console.log('Streamer now running at port 3000!')
  })
}

// For testing purposes
exports = module.exports = app
