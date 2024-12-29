const { match } = require('assert')
const express = require('express')
const app = express()

// socket.io setup
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000 })

const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

const backEndPlayers = {}

io.on('connection', (socket) => {
  console.log('a user connected')
  backEndPlayers[socket.id] = {
    hitBox: {
      width: 0,
      height: 0,
      position: {
        x: 0,
        y: 0,
      },
    },
    direction: {
      up: false,
      down: false,
      left: false,
      right: false,
    },
    speed: 2,
    status: {
      atack: 0,
      defend: false,
      takeHit: false,
      death: false,
    },

    character: Math.round(Math.random()),
    x: Math.round(Math.random() * 100),
    color: `hsl(${360 * Math.random()},100%,50%)`
  }

  io.emit('updatePlayers', backEndPlayers)

  socket.on('disconnect', (reason) => {
    console.log(reason)
    delete backEndPlayers[socket.id]
    io.emit('updatePlayers', backEndPlayers)
  })

  socket.on('keydown', (keycode) => {
    switch (keycode) {
      case 'KeyW':
        backEndPlayers[socket.id].direction.up = true
        break
      case 'KeyA':
        backEndPlayers[socket.id].direction.left = true
        break
      case 'KeyS':
        backEndPlayers[socket.id].direction.down = true
        backEndPlayers[socket.id].speed = 2.5
        break
      case 'KeyD':
        backEndPlayers[socket.id].direction.right = true
        break
      case 'ShiftLeft':
        backEndPlayers[socket.id].status.defend = true
        break
      case 'KeyE':
        backEndPlayers[socket.id].status.atack = 1
        break
      case 'KeyF':
        backEndPlayers[socket.id].status.atack = 2
        break
      case 'KeyR':
        backEndPlayers[socket.id].status.atack = 3
        break
      case 'Space':
        backEndPlayers[socket.id].status.atack = 4
        break
    }
  })
  
  socket.on('keyup', (keycode) => {
    switch (keycode) {
      case 'KeyW':
        backEndPlayers[socket.id].direction.up = false
        break
      case 'KeyA':
        backEndPlayers[socket.id].direction.left = false
        break
      case 'KeyWS':
        backEndPlayers[socket.id].direction.down = false
        backEndPlayers[socket.id].velocity.x = 2
        break
      case 'KeyD':
        backEndPlayers[socket.id].direction.right = false
        break
      case 'ShiftLeft':
        backEndPlayers[socket.id].status.defend = false
        break
      case 'Period':
        debugMode ? (debugMode = false) : (debugMode = true)
        break
    }
  })

  console.log(backEndPlayers)
})

setInterval(()=>{
  io.emit('updatePlayers', backEndPlayers)
},15)

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

console.log('server loaded')
