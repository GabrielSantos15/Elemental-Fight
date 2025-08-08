const { match } = require('assert')
const os = require('os')
const express = require('express')
const app = express()

// socket.io setup

const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000 })

const port = 80

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// ip do servidor
function getLocalIp() {
  const interfaces = os.networkInterfaces()
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address
      }
    }
  }
  return 'localhost'
}

const backEndPlayers = {}
const backEndProjectiles = {}

io.on('connection', (socket) => {
  console.log('a user connected')

  io.emit('updatePlayers', backEndPlayers)

  socket.on('initGame', ({ characterValue, usernameValue }) => {
    const ip = getLocalIp()
    socket.emit('serverInfo', { ip, port })

    backEndPlayers[socket.id] = {
      username: usernameValue,
      life: 100,
      xp: 0,
      protection: true,
      protectionTime: 100,
      width: 12,
      height: 30,
      position: {
        x: 288,
        y: 0
      },
      velocity: {
        x: 0,
        y: 0
      },
      hitBox: {
        active: false,
        width: 0,
        height: 0,
        position: {
          x: 0,
          y: 0
        },
        hitPower: 0
      },
      direction: {
        up: false,
        down: false,
        left: false,
        right: false
      },
      speed: 2,
      status: {
        atack: 0,
        defend: false,
        takeHit: false,
        death: false
      },
      inverter: false,
      character: characterValue,
      hitboxInfo: hitboxInfos[characterValue], //index precisa ser igual ao character
      score: {
        kills: 0,
        deaths: 0
      }
    }
  })

  socket.on('disconnect', (reason) => {
    if (!backEndPlayers[socket.id]) return
    console.log(reason)
    delete backEndPlayers[socket.id]
    io.emit('updatePlayers', backEndPlayers)
  })

  socket.on('keydown', (keycode) => {
    if (!backEndPlayers[socket.id]) return
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
        if (backEndPlayers[socket.id].xp >= 100) {
          backEndPlayers[socket.id].status.atack = 4
          backEndPlayers[socket.id].xp = 0
        }
        break
    }
  })

  socket.on('keyup', (keycode) => {
    if (!backEndPlayers[socket.id]) return
    switch (keycode) {
      case 'KeyW':
        backEndPlayers[socket.id].direction.up = false
        break
      case 'KeyA':
        backEndPlayers[socket.id].direction.left = false
        break
      case 'KeyS':
        backEndPlayers[socket.id].direction.down = false
        backEndPlayers[socket.id].speed = 2
        break
      case 'KeyD':
        backEndPlayers[socket.id].direction.right = false
        break
      case 'ShiftLeft':
        backEndPlayers[socket.id].status.defend = false
        break
    }
  })

  socket.on('updatePosition', ({ direction, sequenceNumber }) => {
    if (!backEndPlayers[socket.id]) return
    backEndPlayers[socket.id].sequenceNumber = sequenceNumber
    backEndPlayers[socket.id].velocity.x = 0
    // movimentação
    if (
      !(
        backEndPlayers[socket.id].status.atack !== 0 ||
        backEndPlayers[socket.id].status.defend ||
        backEndPlayers[socket.id].status.death
      )
    ) {
      if (direction.left) {
        backEndPlayers[socket.id].velocity.x = -backEndPlayers[socket.id].speed
        backEndPlayers[socket.id].inverter = true
      }
      if (direction.right) {
        backEndPlayers[socket.id].velocity.x = backEndPlayers[socket.id].speed
        backEndPlayers[socket.id].inverter = false
      }
      if (direction.right && direction.left) {
        backEndPlayers[socket.id].velocity.x = 0
        backEndPlayers[socket.id].inverter = false
      }
    }

    // pulo
    if (direction.up && backEndPlayers[socket.id].velocity.y == 0) {
      backEndPlayers[socket.id].velocity.y = -4
    }

    backEndPlayers[socket.id].position.x += backEndPlayers[socket.id].velocity.x
  })

  socket.on('revive', () => {
    if (!backEndPlayers[socket.id]) return
    backEndPlayers[socket.id].life = 100
    backEndPlayers[socket.id].xp = 0
    backEndPlayers[socket.id].protection = true
    backEndPlayers[socket.id].protectionTime = 100
    backEndPlayers[socket.id].speed = 2
    backEndPlayers[socket.id].position = {
      x: 288,
      y: 0
    }
    backEndPlayers[socket.id].status = {
      atack: 0,
      defend: false,
      takeHit: false,
      death: false
    }
    backEndPlayers[socket.id].velocity = {
      x: 0,
      y: 0
    }
    backEndPlayers[socket.id].direction = {
      up: false,
      down: false,
      left: false,
      right: false
    }
    backEndPlayers[socket.id].inverter = false
  })

  socket.on('addHitbox', (atack) => {
    if (!backEndPlayers[socket.id]) return
    backEndPlayers[socket.id].hitBox.active = true

    if (backEndPlayers[socket.id].hitboxInfo[atack].typeProjectile) {
      const projectileId = Date.now() // ID único para o projétil
      if (!backEndPlayers[socket.id].inverter) {
        backEndProjectiles[projectileId] = {
          playerId: socket.id,
          lifeTime: backEndPlayers[socket.id].hitboxInfo[atack].lifeTime,
          width: backEndPlayers[socket.id].hitboxInfo[atack].width,
          height: backEndPlayers[socket.id].hitboxInfo[atack].height,
          position: {
            x:
              backEndPlayers[socket.id].position.x +
              backEndPlayers[socket.id].width +
              backEndPlayers[socket.id].hitboxInfo[atack].position.x,
            y:
              backEndPlayers[socket.id].position.y +
              backEndPlayers[socket.id].hitboxInfo[atack].position.y
          }, // Cópia do objeto
          velocity: {
            x: backEndPlayers[socket.id].hitboxInfo[atack].velocity.x,
            y: backEndPlayers[socket.id].hitboxInfo[atack].velocity.y
          }, // Cópia do objeto
          imageSrc: backEndPlayers[socket.id].hitboxInfo[atack].imageSrc,
          frameMax: backEndPlayers[socket.id].hitboxInfo[atack].frameMax,
          offset: backEndPlayers[socket.id].hitboxInfo[atack].offset,
          scale: backEndPlayers[socket.id].hitboxInfo[atack].scale,
          hitPower: backEndPlayers[socket.id].hitboxInfo[atack].hitPower,
          inverter: false
        }
      } else {
        backEndProjectiles[projectileId] = {
          playerId: socket.id,
          lifeTime: backEndPlayers[socket.id].hitboxInfo[atack].lifeTime,
          width: backEndPlayers[socket.id].hitboxInfo[atack].width,
          height: backEndPlayers[socket.id].hitboxInfo[atack].height,
          position: {
            x:
              backEndPlayers[socket.id].position.x -
              backEndPlayers[socket.id].hitboxInfo[atack].position.x -
              backEndPlayers[socket.id].hitboxInfo[atack].width,
            y:
              backEndPlayers[socket.id].position.y +
              backEndPlayers[socket.id].hitboxInfo[atack].position.y
          }, // Cópia do objeto
          velocity: {
            x: -backEndPlayers[socket.id].hitboxInfo[atack].velocity.x,
            y: backEndPlayers[socket.id].hitboxInfo[atack].velocity.y
          }, // Cópia do objeto
          imageSrc: backEndPlayers[socket.id].hitboxInfo[atack].imageSrc,
          frameMax: backEndPlayers[socket.id].hitboxInfo[atack].frameMax,
          offset: backEndPlayers[socket.id].hitboxInfo[atack].offset,
          scale: backEndPlayers[socket.id].hitboxInfo[atack].scale,
          hitPower: backEndPlayers[socket.id].hitboxInfo[atack].hitPower,
          inverter: true
        }
      }
    } else {
      backEndPlayers[socket.id].hitBox.width =
        backEndPlayers[socket.id].hitboxInfo[atack].width
      backEndPlayers[socket.id].hitBox.height =
        backEndPlayers[socket.id].hitboxInfo[atack].height

      if (!backEndPlayers[socket.id].inverter) {
        backEndPlayers[socket.id].hitBox.position.x =
          backEndPlayers[socket.id].position.x +
          backEndPlayers[socket.id].width +
          backEndPlayers[socket.id].hitboxInfo[atack].position.x
      } else {
        backEndPlayers[socket.id].hitBox.position.x =
          backEndPlayers[socket.id].position.x -
          backEndPlayers[socket.id].hitboxInfo[atack].width -
          backEndPlayers[socket.id].hitboxInfo[atack].position.x
      }
      backEndPlayers[socket.id].hitBox.position.y =
        backEndPlayers[socket.id].position.y +
        backEndPlayers[socket.id].hitboxInfo[atack].position.y

      backEndPlayers[socket.id].hitBox.hitPower =
        backEndPlayers[socket.id].hitboxInfo[atack].hitPower
    }
  })

  socket.on('removeHitbox', () => {
    if (!backEndPlayers[socket.id]) return

    backEndPlayers[socket.id].hitBox.active = false
    backEndPlayers[socket.id].hitBox.width = 0
    backEndPlayers[socket.id].hitBox.height = 0
    backEndPlayers[socket.id].hitBox.position.x = 0
    backEndPlayers[socket.id].hitBox.position.y = 0
    backEndPlayers[socket.id].hitBox.hitPower = 0
  })
  socket.on('disableTakeHit', () => {
    if (!backEndPlayers[socket.id]) return

    backEndPlayers[socket.id].status.takeHit = false
  })

  socket.on('checkDemage', () => {
    if (!backEndPlayers[socket.id]) return

    for (const id in backEndProjectiles) {
      const projectile = backEndProjectiles[id]

      if (
        projectile.playerId == socket.id ||
        backEndPlayers[socket.id].status.takeHit ||
        backEndPlayers[socket.id].protection
      ) {
        continue
      }
      if (
        collision({
          object1: backEndPlayers[socket.id],
          object2: projectile
        })
      ) {
        backEndPlayers[socket.id].status.takeHit = true
        backEndPlayers[socket.id].life -= backEndPlayers[socket.id].status
          .defend
          ? projectile.hitPower * 0.1
          : projectile.hitPower

        if (backEndPlayers[projectile.playerId].xp < 90)
          backEndPlayers[projectile.playerId].xp += 10

        if (backEndPlayers[socket.id].life <= 0) {
          backEndPlayers[socket.id].life = 0
          backEndPlayers[socket.id].status.death = true
          backEndPlayers[socket.id].score.deaths++
          if (backEndPlayers[projectile.playerId]) {
            backEndPlayers[projectile.playerId].score.kills++
          }
        }
      }
    }

    for (const id in backEndPlayers) {
      const player = backEndPlayers[id]

      if (
        player == backEndPlayers[socket.id] ||
        !player.hitBox.active ||
        backEndPlayers[socket.id].status.takeHit ||
        backEndPlayers[socket.id].protection
      ) {
        continue
      }
      if (
        collision({
          object1: backEndPlayers[socket.id],
          object2: player.hitBox
        })
      ) {
        backEndPlayers[socket.id].status.takeHit = true
        backEndPlayers[socket.id].life -= backEndPlayers[socket.id].status
          .defend
          ? player.hitBox.hitPower * 0.1
          : player.hitBox.hitPower

        if (backEndPlayers[id].xp < 90) backEndPlayers[id].xp += 10

        if (backEndPlayers[socket.id].life <= 0) {
          backEndPlayers[socket.id].life = 0
          backEndPlayers[socket.id].status.death = true
          backEndPlayers[socket.id].score.deaths++
          if (backEndPlayers[id]) {
            backEndPlayers[id].score.kills++
          }
        }
      }
    }
  })

  socket.on('applyGravity', () => {
    if (!backEndPlayers[socket.id]) return

    const gravity = 0.1
    backEndPlayers[socket.id].velocity.y += gravity
    backEndPlayers[socket.id].position.y += backEndPlayers[socket.id].velocity.y
  })

  socket.on('checkForHorizontalCanvasCollision', () => {
    if (!backEndPlayers[socket.id]) return

    if (
      backEndPlayers[socket.id].position.x +
        backEndPlayers[socket.id].width +
        backEndPlayers[socket.id].velocity.x >=
      576
    ) {
      backEndPlayers[socket.id].position.x =
        576 - backEndPlayers[socket.id].width
      backEndPlayers[socket.id].velocity.x = 0
    } else if (
      backEndPlayers[socket.id].position.x +
        backEndPlayers[socket.id].velocity.x <=
      0
    ) {
      backEndPlayers[socket.id].position.x = Math.abs(
        backEndPlayers[socket.id].velocity.x
      )
      backEndPlayers[socket.id].velocity.x = 0
    }
  })

  socket.on('checkForHorizontalCollisions', (collisionBlocks) => {
    if (!backEndPlayers[socket.id]) return

    for (let i = 0; i < collisionBlocks.length; i++) {
      const collisionBlock = collisionBlocks[i]
      if (
        collision({
          object1: backEndPlayers[socket.id],
          object2: collisionBlock
        })
      ) {
        if (backEndPlayers[socket.id].velocity.x > 0) {
          backEndPlayers[socket.id].velocity.x = 0
          backEndPlayers[socket.id].position.x =
            collisionBlock.position.x - backEndPlayers[socket.id].width - 0.01
          break
        }
        if (backEndPlayers[socket.id].velocity.x < 0) {
          backEndPlayers[socket.id].velocity.x = 0
          backEndPlayers[socket.id].position.x =
            collisionBlock.position.x + collisionBlock.width + 0.01
          break
        }
      }
    }
  })

  socket.on('checkForVerticalCollisions', (info) => {
    if (!backEndPlayers[socket.id]) return

    for (let i = 0; i < info.collisionBlocks.length; i++) {
      const collisionBlock = info.collisionBlocks[i]

      if (
        collision({
          object1: backEndPlayers[socket.id],
          object2: collisionBlock
        })
      ) {
        if (backEndPlayers[socket.id].velocity.y > 0) {
          backEndPlayers[socket.id].velocity.y = 0
          backEndPlayers[socket.id].position.y =
            collisionBlock.position.y - backEndPlayers[socket.id].height - 0.01
          break
        }
        if (backEndPlayers[socket.id].velocity.y < 0) {
          backEndPlayers[socket.id].velocity.y = 0.1
          backEndPlayers[socket.id].position.y =
            collisionBlock.position.y + collisionBlock.height + 0.1
          break
        }
      }
    }

    // colisão das plataformas
    for (let i = 0; i < info.platformCollisionBlocks.length; i++) {
      const platformCollisionBlock = info.platformCollisionBlocks[i]

      if (
        platformCollision({
          object1: backEndPlayers[socket.id],
          object2: platformCollisionBlock
        })
      ) {
        if (backEndPlayers[socket.id].velocity.y > 0) {
          backEndPlayers[socket.id].velocity.y = 0
          backEndPlayers[socket.id].position.y =
            platformCollisionBlock.position.y -
            backEndPlayers[socket.id].height -
            0.01
          break
        }
      }
    }
  })

  socket.on('endAtack', () => {
    if (!backEndPlayers[socket.id]) return

    backEndPlayers[socket.id].status.atack = 0
  })

  // console.log(backEndPlayers)
})

setInterval(() => {
  // xp para os player
  for (const id in backEndPlayers) {
    if (backEndPlayers[id].xp < 100) {
      backEndPlayers[id].xp += 0.025
    }

    if (backEndPlayers[id].protectionTime > 0) {
      backEndPlayers[id].protectionTime--
      if (backEndPlayers[id].protectionTime === 0) {
        backEndPlayers[id].protection = false
      }
    }
  }

  // update projectile positions
  for (const id in backEndProjectiles) {
    backEndProjectiles[id].position.x += backEndProjectiles[id].velocity.x
    backEndProjectiles[id].position.y += backEndProjectiles[id].velocity.y
    backEndProjectiles[id].lifeTime--

    if (
      backEndProjectiles[id].position.x >= 576 || // Limite direito
      backEndProjectiles[id].position.x + backEndProjectiles[id].width <= 0 || // Limite esquerdo
      backEndProjectiles[id].position.y + backEndProjectiles[id].height >=
        432 || // Limite inferior
      backEndProjectiles[id].position.y <= 0 || // Limite superior
      backEndProjectiles[id].lifeTime <= 0
    ) {
      delete backEndProjectiles[id]
      continue
    }
  }

  io.emit('updateProjectiles', backEndProjectiles)
  io.emit('updatePlayers', backEndPlayers)
}, 15)

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

console.log('server loaded')

function collision({ object1, object2 }) {
  return (
    object1.position.y + object1.height >= object2.position.y &&
    object1.position.y <= object2.position.y + object2.height &&
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.x + object1.width >= object2.position.x
  )
}
function platformCollision({ object1, object2 }) {
  return (
    object1.position.y + object1.height >= object2.position.y &&
    object1.position.y + object1.height <=
      object2.position.y + object2.height &&
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.x + object1.width >= object2.position.x
  )
}

const hitboxInfos = [
  // Arrow [0]
  {
    atack1: {
      typeProjectile: false,
      width: 45,
      height: 7,
      position: {
        x: 5,
        y: 5
      },
      hitPower: 20
    },
    atack2: {
      lifeTime: 500,
      typeProjectile: true,
      width: 5,
      height: 5,
      position: {
        x: 0,
        y: 5
      },
      velocity: {
        x: 5,
        y: 0
      },
      imageSrc: './images/sprites/Arrow/projectiles/arrow.png',
      frameMax: 1,
      offset: {
        x: 50,
        y: 30
      },
      scale: 0.5,
      hitPower: 10
    },
    atack3: {
      lifeTime: 90,
      typeProjectile: true,
      width: 40,
      height: 20,
      position: {
        x: 10,
        y: 10
      },
      velocity: {
        x: 0,
        y: 0
      },
      imageSrc: './images/sprites/Arrow/projectiles/teste.png',
      frameMax: 17,
      offset: {
        x: 45,
        y: 44
      },
      scale: 0.5,
      hitPower: 10
    },
    atack4: {
      lifeTime: 500,
      typeProjectile: true,
      width: 576,
      height: 5,
      position: {
        x: 0,
        y: 9
      },
      velocity: {
        x: 7,
        y: 0
      },
      imageSrc: './images/sprites/Arrow/projectiles/power.png',
      frameMax: 1,
      offset: {
        x: 0,
        y: 0
      },
      scale: 0.3,
      hitPower: 20
    }
  },
  // waterPrincess [1]
  {
    atack1: {
      typeProjectile: false,
      width: 45,
      height: 5,
      position: {
        x: -5,
        y: 8
      },
      hitPower: 20
    },
    atack2: {
      lifeTime: 500,
      typeProjectile: true,
      width: 5,
      height: 5,
      position: {
        x: 5,
        y: 8
      },
      velocity: {
        x: 6,
        y: 0
      },
      imageSrc: './images/sprites/WaterPrincess/projectiles/iceBall.png',
      frameMax: 1,
      offset: {
        x: 0,
        y: 0
      },
      scale: 0.7,
      hitPower: 20
    },
    atack3: {
      typeProjectile: false,
      width: 60,
      height: 45,
      position: {
        x: 10,
        y: -13
      },
      hitPower: 25
    },
    atack4: {
      typeProjectile: false,
      width: 70,
      height: 45,
      position: {
        x: 5,
        y: -15
      },
      hitPower: 40
    }
  },
  // wind [2]
  {
    atack1: {
      typeProjectile: false,
      width: 40,
      height: 15,
      position: {
        x: -20,
        y: 5
      },
      hitPower: 25
    },
    atack2: {
      typeProjectile: false,
      width: 55,
      height: 30,
      position: {
        x: -20,
        y: -5
      },
      hitPower: 30
    },
    atack3: {
      typeProjectile: false,
      width: 90,
      height: 30,
      position: {
        x: -10,
        y: 0
      },
      hitPower: 30
    },
    atack4: {
      typeProjectile: false,
      width: 80,
      height: 40,
      position: {
        x: -40,
        y: -10
      },
      hitPower: 35
    }
  },
  // fire [3]
  {
    atack1: {
      typeProjectile: false,
      width: 50,
      height: 55,
      position: {
        x: -10,
        y: -25
      },
      hitPower: 20
    },
    atack2: {
      typeProjectile: false,
      width: 85,
      height: 30,
      position: {
        x: -45,
        y: 0
      },
      hitPower: 20
    },
    atack3: {
      typeProjectile: false,
      width: 107,
      height: 35,
      position: {
        x: -45,
        y: -5
      },
      hitPower: 15
    },
    atack4: {
      typeProjectile: false,
      width: 60,
      height: 60,
      position: {
        x: 9,
        y: -30
      },
      hitPower: 80
    }
  },
  // metal [4]
  {
    atack1: {
      typeProjectile: false,
      width: 32,
      height: 11,
      position: {
        x: -5,
        y: 9
      },
      hitPower: 20
    },
    atack2: {
      lifeTime: 500,
      typeProjectile: true,
      width: 8,
      height: 3,
      position: {
        x: 5,
        y: 8
      },
      velocity: {
        x: 4,
        y: 0
      },
      imageSrc: './images/sprites/MetalBladekeeper/projectiles/knife.png',
      frameMax: 1,
      offset: {
        x: 23,
        y: 10
      },
      scale: 0.7,
      hitPower: 20
    },
    atack3: {
      lifeTime: 60,
      typeProjectile: true,
      width: 50,
      height: 15,
      position: {
        x: -15,
        y: 15
      },
      velocity: {
        x: 0,
        y: 0
      },
      imageSrc: './images/sprites/MetalBladekeeper/projectiles/knifesTrap.png',
      frameMax: 4,
      offset: {
        x: 10,
        y: 13
      },
      scale: 0.7,
      hitPower: 10
    },
    atack4: {
      typeProjectile: false,
      width: 125,
      height: 40,
      position: {
        x: -60,
        y: -10
      },
      hitPower: 80
    }
  },
  // ground [5]
  {
    atack1: {
      typeProjectile: false,
      width: 30,
      height: 10,
      position: {
        x: -5,
        y: 7
      },
      hitPower: 25
    },
    atack2: {
      typeProjectile: false,
      width: 30,
      height: 10,
      position: {
        x: -5,
        y: 7
      },
      hitPower: 15
    },
    atack3: {
      typeProjectile: false,
      width: 75,
      height: 30,
      position: {
        x: -5,
        y: 0
      },
      hitPower: 15
    },
    atack4: {
      typeProjectile: false,
      width: 60,
      height: 45,
      position: {
        x: -13,
        y: -15
      },
      hitPower: 25
    }
  },
  // cristal [6]
  {
    atack1: {
      typeProjectile: false,
      width: 40,
      height: 30,
      position: {
        x: -15,
        y: -5
      },
      hitPower: 20
    },
    atack2: {
      typeProjectile: false,
      width: 35,
      height: 30,
      position: {
        x: -15,
        y: -5
      },
      hitPower: 25
    },
    atack3: {
      typeProjectile: false,
      width: 85,
      height: 40,
      position: {
        x: -5,
        y: -10
      },
      hitPower: 25
    },
    atack4: {
      typeProjectile: false,
      width: 100,
      height: 50,
      position: {
        x: -13,
        y: -20
      },
      hitPower: 80
    }
  }
]
