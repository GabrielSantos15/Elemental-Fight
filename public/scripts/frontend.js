let debugMode = false

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const socket = io()

const devicePixelRatio = window.devicePixelRatio || 1

canvas.width = innerWidth * devicePixelRatio
canvas.height = innerHeight * devicePixelRatio

const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4
}

const floorCollisions2D = []
for (let i = 0; i < floorCollisions.length; i += 36) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 36))
}
const collisionBlocks = []
floorCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol == 202) {
      collisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16
          }
        })
      )
    }
  })
})

const platformCollisions2D = []
for (let i = 0; i < platformCollisions.length; i += 36) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 36))
}

const platformCollisionBlocks = []
platformCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol == 202) {
      platformCollisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16
          },
          height: 4
        })
      )
    }
  })
})

const gravity = 0.1

// =================================== Informações do background ========================
const background = new Sprite({
  width: canvas.width,
  height: canvas.height,
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './images/background/background.png'
})

const backgroundHeight = 432

// ================================== Informações da camera ==============================
const camera = {
  position: {
    x: 0,
    y: -backgroundHeight + scaledCanvas.height
  }
}

// =================================== Informações do jogador ============================

const jogador = []
const characters = [Arrow, WaterPrincess]

const player = new Player(JSON.parse(JSON.stringify(characters[0])))
const frontEndPlayers = {}
jogador.push(player)

socket.on('updatePlayers', (backEndPlayers) => {
  for (const id in backEndPlayers) {
    const backendPlayer = backEndPlayers[id]

    if (!frontEndPlayers[id]) {
      frontEndPlayers[id] = new Player(
        JSON.parse(JSON.stringify(characters[backendPlayer.character]))
      )

      frontEndPlayers[id].position.x = backendPlayer.x
      frontEndPlayers[id].color = backendPlayer.color
    }else{
      frontEndPlayers[id].hitBox = backendPlayer.hitBox
      frontEndPlayers[id].direction = backendPlayer.direction
      frontEndPlayers[id].speed = backendPlayer.speed 
      frontEndPlayers[id].status = backendPlayer.status 

      console.log(frontEndPlayers)
    }
  }

  for (const id in frontEndPlayers) {
    if (!backEndPlayers[id]) {
      delete frontEndPlayers[id]
    }
  }

})

// =================================== Gerenciador do jogo ============================

function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.save()
  ctx.scale(4, 4)
  ctx.translate(camera.position.x, camera.position.y)
  background.draw()
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update()
  })
  platformCollisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update()
  })

  // retirar
  player.update()

  for (const id in frontEndPlayers) {
    const player = frontEndPlayers[id]
    player.update()
  }

  ctx.restore()

  requestAnimationFrame(game)
}
game()

// =================================== Teclado ============================

window.addEventListener('keydown', (event) => {
  if (!frontEndPlayers[socket.id]) return
  switch (event.code) {
    case 'KeyW':
      // frontEndPlayers[socket.id].direction.up = true
      socket.emit('keydown', 'KeyW')
      break
    case 'KeyA':
      // frontEndPlayers[socket.id].direction.left = true
      socket.emit('keydown', 'KeyA')
      break
    case 'KeyS':
      // frontEndPlayers[socket.id].direction.down = true
      // frontEndPlayers[socket.id].speed = 2.5
      socket.emit('keydown', 'KeyS')
      break
    case 'KeyD':
      // frontEndPlayers[socket.id].direction.right = true
      socket.emit('keydown', 'KeyD')
      break
    case 'ShiftLeft':
      // frontEndPlayers[socket.id].status.defend = true
      socket.emit('keydown', 'ShiftLeft')
      break
    case 'KeyE':
      // frontEndPlayers[socket.id].status.atack = 1
      socket.emit('keydown', 'KeyE')
      break
    case 'KeyF':
      // frontEndPlayers[socket.id].status.atack = 2
      socket.emit('keydown', 'KeyF')
      break
    case 'KeyR':
      // frontEndPlayers[socket.id].status.atack = 3
      socket.emit('keydown', 'KeyR')
      break
    case 'Space':
      // frontEndPlayers[socket.id].status.atack = 4
      socket.emit('keydown', 'Space')
      break
  }
})
window.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'KeyW':
      // frontEndPlayers[socket.id].direction.up = false
      socket.emit('keyup', 'KeyW')
      break
    case 'KeyA':
      // frontEndPlayers[socket.id].direction.left = false
      socket.emit('keyup', 'KeyA')
      break
    case 'KeyS':
      // frontEndPlayers[socket.id].direction.down = false
      // frontEndPlayers[socket.id].velocity.x = 2
      socket.emit('keyup', 'KeyS')
      break
    case 'KeyD':
      // frontEndPlayers[socket.id].direction.right = false
      socket.emit('keyup', 'KeyD')
      break
    case 'ShiftLeft':
      // frontEndPlayers[socket.id].status.defend = false
      socket.emit('keyup', 'ShiftLeft')
      break
    case 'Period':
      // debugMode ? (debugMode = false) : (debugMode = true)
      socket.emit('keyup', 'Period')
      break
  }
})
