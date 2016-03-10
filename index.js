import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import knex from 'knex'

const port = process.env.PORT || 3000
const static_path = './public'
const app = express()
const server = http.Server(app)
const io = socketio(server)

dotenv.load()

app.use(express.static(static_path))
app.use(bodyParser.json())

const db = knex({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: 'knex,public',
  pool: {
    min: 0,
    max: 7
  }
})

app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: static_path
  })
})

io.on('connection', (socket) => {
  console.log('we got connected!')

  db('games').insert({ moves: '[]' }).returning('*').then((data) => {
    console.log('data', data)
    socket.emit('new game', data)
  })

  socket.on('move', (data) => {
    console.log('gotta move!', data)
  })

  socket.on('disconnect', () => {
    console.log('Hasta!')
  })
})

server.listen(port, () => {
  console.log(`Streamer running on port ${port}`)
})
