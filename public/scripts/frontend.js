let debugMode = false
let showLifebar = true

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const socket = io()

const devicePixelRatio = window.devicePixelRatio || 1

function canvasSize() {
  canvas.width = innerWidth * devicePixelRatio
  canvas.height = innerHeight * devicePixelRatio
}
canvasSize()
window.addEventListener('resize', canvasSize)

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
    if (symbol == 199) {
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
    if (symbol == 199) {
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
    x: scaledCanvas.width / 2 - 288,
    y: 0
  }
}

//==================================== Informações das esferas =============================

socket.on('updatePlayersProjectiles', (backEndPlayersProjectiles) => {
  for (const id in backEndPlayersProjectiles) {
    const backEndProjectile = backEndPlayersProjectiles[id]

    if (!frontEndProjectiles[id]) {
      // Cria um novo projétil se ele ainda não existir
      frontEndProjectiles[id] = new Projectile(backEndProjectile)
    } else {
      // Atualiza os dados do projétil existente
      Object.assign(frontEndProjectiles[id], backEndProjectile)
    }
  }

  // Remove projéteis que não existem mais no back-end
  for (const id in frontEndProjectiles) {
    if (!backEndPlayersProjectiles[id]) {
      delete frontEndProjectiles[id]
    }
  }
})

// =================================== Informações dos jogadores ============================

const characters = [
  Arrow,
  WaterPrincess,
  windWarrior,
  FireKnight,
  MetalBladekeeper,
  GroundMonk,
  CrystalMauler
]

const frontEndPlayers = {}
const frontEndProjectiles = {}

socket.on('updateProjectiles', (backEndProjectiles) => {
  for (const id in backEndProjectiles) {
    const backEndProjectile = backEndProjectiles[id]

    if (!frontEndProjectiles[id]) {
      frontEndProjectiles[id] = new Projectile({
        playerId: backEndProjectile.playerId,
        position: backEndProjectile.position,
        velocity: backEndProjectile.velocity,
        width: backEndProjectile.width,
        height: backEndProjectile.height,
        imageSrc: backEndProjectile.imageSrc,
        frameMax: backEndProjectile.frameMax,
        offset: backEndProjectile.offset,
        scale: backEndProjectile.scale,
        inverter: backEndProjectile.inverter
      })
    } else {
      frontEndProjectiles[id].position = backEndProjectiles[id].position
    }
  }

  for (const frontEndProjectileId in frontEndProjectiles) {
    if (!backEndProjectiles[frontEndProjectileId]) {
      delete frontEndProjectiles[frontEndProjectileId]
    }
  }
})

socket.on('updatePlayers', (backEndPlayers) => {
  for (const id in backEndPlayers) {
    const backendPlayer = backEndPlayers[id]

    if (!frontEndPlayers[id]) {
      frontEndPlayers[id] = new Player(
        JSON.parse(JSON.stringify(characters[backendPlayer.character]))
      )

      frontEndPlayers[id].username = backendPlayer.username
      frontEndPlayers[id].protection = backendPlayer.protection
      frontEndPlayers[id].position = backendPlayer.position
      document.querySelector(
        '#leaderboardContainer'
      ).innerHTML += `<tr data-id="${id}" data-socre="${backendPlayer.score.kills}"><td>${backendPlayer.username}</td><td>${backendPlayer.score.kills}</td><td>${backendPlayer.score.deaths}</td>
            </tr>`
    } else {
      document.querySelector(
        `tr[data-id="${id}"]`
      ).innerHTML = `<tr data-id="${id}"><td>${backendPlayer.username}</td><td>${backendPlayer.score.kills}</td><td>${backendPlayer.score.deaths}</td>
            </tr>`

      document
        .querySelector(`tr[data-id="${id}"]`)
        .setAttribute('data-score', backendPlayer.score.kills)

      // coloca os 3lementos em ordem
      const parentTr = document.querySelector('#leaderboardContainer')
      const childTrs = Array.from(parentTr.querySelectorAll('tr'))

      childTrs.sort((a, b) => {
        const scoreA = Number(a.getAttribute('data-score'))
        const scoreB = Number(b.getAttribute('data-score'))

        return scoreB - scoreA
      })

      //  remove os elemntos antigos
      childTrs.forEach((tr) => {
        parentTr.removeChild(tr)
      })
      //  adiciona os elementos em ordem
      childTrs.forEach((tr) => {
        parentTr.appendChild(tr)
      })

      frontEndPlayers[id].life = backendPlayer.life
      frontEndPlayers[id].xp = backendPlayer.xp
      frontEndPlayers[id].protection = backendPlayer.protection
      frontEndPlayers[id].position = backendPlayer.position
      frontEndPlayers[id].velocity = backendPlayer.velocity
      frontEndPlayers[id].hitBox = backendPlayer.hitBox
      frontEndPlayers[id].direction = backendPlayer.direction
      frontEndPlayers[id].speed = backendPlayer.speed
      frontEndPlayers[id].status = backendPlayer.status
      frontEndPlayers[id].hitPower = backendPlayer.hitPower
      frontEndPlayers[id].inverter = backendPlayer.inverter
    }
  }

  for (const id in frontEndPlayers) {
    if (!backEndPlayers[id]) {
      const divToDelete = document.querySelector(`tr[data-id="${id}"]`)
      divToDelete.parentNode.removeChild(divToDelete)

      if (id === socket.id) {
        document.querySelector('#userForm').style.display = 'block'
      }

      delete frontEndPlayers[id]
    }
  }
})

// =================================== Gerenciador do jogo ============================
const playerInputs = []
let sequenceNumber = 0

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

  for (const id in frontEndProjectiles) {
    const frontEndProjectile = frontEndProjectiles[id]

    frontEndProjectile.update()
  }

  for (const id in frontEndPlayers) {
    const player = frontEndPlayers[id]

    player.update()

    player.checkForHorizontalCanvasCollision()
    socket.emit('checkForHorizontalCanvasCollision')
  }

  ctx.restore()

  requestAnimationFrame(game)
}

// =================================== Teclado ============================

window.addEventListener('keydown', (event) => {
  if (!frontEndPlayers[socket.id]) return
  switch (event.code) {
    case 'KeyW':
      frontEndPlayers[socket.id].direction.up = true
      socket.emit('keydown', 'KeyW')
      break
    case 'KeyA':
      frontEndPlayers[socket.id].direction.left = true
      socket.emit('keydown', 'KeyA')
      break
    case 'KeyS':
      frontEndPlayers[socket.id].direction.down = true
      frontEndPlayers[socket.id].speed = 2.5
      socket.emit('keydown', 'KeyS')
      break
    case 'KeyD':
      frontEndPlayers[socket.id].direction.right = true
      socket.emit('keydown', 'KeyD')
      break
    case 'ShiftLeft':
      frontEndPlayers[socket.id].status.defend = true
      socket.emit('keydown', 'ShiftLeft')
      break
    case 'KeyE':
      frontEndPlayers[socket.id].status.atack = 1
      socket.emit('keydown', 'KeyE')
      break
    case 'KeyF':
      frontEndPlayers[socket.id].status.atack = 2
      socket.emit('keydown', 'KeyF')
      break
    case 'KeyR':
      frontEndPlayers[socket.id].status.atack = 3
      socket.emit('keydown', 'KeyR')
      break
    case 'Space':
      if (frontEndPlayers[socket.id].xp >= 100) {
        frontEndPlayers[socket.id].status.atack = 4
      }
      socket.emit('keydown', 'Space')
      break
  }
})
window.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'KeyW':
      frontEndPlayers[socket.id].direction.up = false
      socket.emit('keyup', 'KeyW')
      break
    case 'KeyA':
      frontEndPlayers[socket.id].direction.left = false
      socket.emit('keyup', 'KeyA')
      break
    case 'KeyS':
      frontEndPlayers[socket.id].direction.down = false
      frontEndPlayers[socket.id].speed = 2
      socket.emit('keyup', 'KeyS')
      break
    case 'KeyD':
      frontEndPlayers[socket.id].direction.right = false
      socket.emit('keyup', 'KeyD')
      break
    case 'ShiftLeft':
      frontEndPlayers[socket.id].status.defend = false
      socket.emit('keyup', 'ShiftLeft')
      break
    case 'Period':
      debugMode ? (debugMode = false) : (debugMode = true)
      break
    case 'Comma':
      showLifebar ? (showLifebar = false) : (showLifebar = true)
      break
  }
})

document.querySelector('#userForm').addEventListener('submit', (event) => {
  event.preventDefault()
  document.querySelector('#playerSelect').style.display = 'none'
  let characterValue = Number(document.querySelector('form').character.value)
  if (characterValue == 7) {
    characterValue = Math.round(Math.random() * 6)
  }

  const usernameValue = document.querySelector('#usernameInput').value
  socket.emit('initGame', { characterValue, usernameValue })
  game()
})
