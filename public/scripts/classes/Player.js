class Player extends Sprite {
  constructor({
    color = "#fff",
    life,
    width,
    height,
    position,
    hitBox,
    direction,
    velocity,
    speed,
    status,
    imageSrc,
    scale,
    frameMax,
    offset,
    inverter,
    sprites
  }) {
    super({
      width,
      height,
      position,
      imageSrc,
      scale,
      frameMax,
      offset,
      inverter
    })
    this.color = color
    this.life = life
    this.width = width
    this.height = height
    this.position = position
    this.hitBox = hitBox
    this.direction = direction
    this.velocity = velocity
    this.speed = speed
    this.status = status
    this.inverter = inverter
    this.sprites = sprites
    this.camerabox = {
      position: {
        x: this.position.x - 90,
        y: this.position.y - 30
      },
      width: 200,
      height: 80
    }
  }

  updateCamerabox() {
    this.camerabox = {
      position: {
        x: this.position.x - 90,
        y: this.position.y - 30
      },
      width: 200,
      height: 80
    }
  }

  checkForHorizontalCanvasCollision() {
    if (
      this.position.x + this.width + this.velocity.x >=
      background.image.width
    ) {
      this.position.x = background.image.width - this.width
      this.velocity.x = 0
    } else if (this.position.x + this.velocity.x <= 0) {
      this.position.x = Math.abs(this.velocity.x)
      this.velocity.x = 0
    }
  }

  shouldPanCameraToTheLeft({ canvas, camera }) {
    const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width
    const scaledDownCanvasWidth = canvas.width / 4

    if (cameraboxRightSide >= background.image.width) return

    if (
      cameraboxRightSide >=
      scaledDownCanvasWidth + Math.abs(camera.position.x)
    ) {
      camera.position.x -= this.velocity.x
    }
  }

  shouldPanCameraToTheRight({ canvas, camera }) {
    if (this.camerabox.position.x <= 0) return

    if (this.camerabox.position.x <= Math.abs(camera.position.x)) {
      camera.position.x -= this.velocity.x
    }
  }

  shouldPanCameraToTheDown({ canvas, camera }) {
    if (this.camerabox.position.y + this.velocity.y <= 0) return

    if (this.camerabox.position.y <= Math.abs(camera.position.y)) {
      camera.position.y -= this.velocity.y
    }
  }

  shouldPanCameraToTheUp({ canvas, camera }) {
    if (
      this.camerabox.position.y + this.camerabox.height + this.velocity.y >=
      background.image.height
    )
      return
    const scaledCanvasHeight = canvas.height / 4

    if (
      this.camerabox.position.y + this.camerabox.height >=
      Math.abs(camera.position.y) + scaledCanvasHeight
    ) {
      camera.position.y -= this.velocity.y
    }
  }

  update() {
    this.updateCamerabox()
    if (this.status.death && this.frameCurrent === this.frameMax - 1) return

    if (this.life <= 0) this.status.death = true

    // gerencia os sprite
    if (this.status.death) {
      this.switchSprite('death')
    } else if (this.status.takeHit) {
      this.switchSprite('takeHit')
    } else if (this.status.atack !== 0) {
      this.switchSprite('atack' + this.status.atack)
    } else if (this.status.defend) {
      this.switchSprite('defend')
    } else if (this.velocity.y < 0) {
      this.switchSprite('jumpUp')
      this.shouldPanCameraToTheDown({ camera, canvas })
    } else if (this.velocity.y > 0) {
      this.switchSprite('jumpDown')
      this.shouldPanCameraToTheUp({ canvas, camera })
    } else if (this.direction.down) {
      this.switchSprite('slide')
    } else if (this.direction.left || this.direction.right) {
      this.switchSprite('run')
    } else {
      this.switchSprite('idle')
    }

    this.velocity.x = 0
    // movimentação
    if (!(this.status.atack !== 0 || this.status.defend || this.status.death)) {
      if (this.direction.left) {
        this.velocity.x = -this.speed
        this.inverter = true
        this.shouldPanCameraToTheRight({ canvas, camera })
      }
      if (this.direction.right) {
        this.velocity.x = this.speed
        this.inverter = false
        this.shouldPanCameraToTheLeft({ canvas, camera })
      }
    }

    // pulo
    if (this.direction.up && this.velocity.y == 0) {
      this.velocity.y = -4
    }

    this.position.x += this.velocity.x

    this.checkForHorizontalCollisions()
    this.applyGravity()
    this.checkForVerticalCollisions()
    this.checkDemage()

    this.updateSprite()

    // desenha caixas de colisão

    if (debugMode) {
      ctx.fillStyle = '#00ff00'
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
      ctx.fillStyle = '#ff0000'
      ctx.fillRect(
        this.hitBox.position.x,
        this.hitBox.position.y,
        this.hitBox.width,
        this.hitBox.height
      )

      ctx.fillStyle = '#0000ff35'
      ctx.fillRect(
        this.camerabox.position.x,
        this.camerabox.position.y,
        this.camerabox.width,
        this.camerabox.height
      )
    }

    ctx.shadowColor = this.color
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
    this.draw()
    ctx.shadowColor = this.color
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0

  }

  checkForHorizontalCollisions() {
    for (let i = 0; i < collisionBlocks.length; i++) {
      const collisionBlock = collisionBlocks[i]

      if (
        collision({
          object1: this,
          object2: collisionBlock
        })
      ) {
        if (this.velocity.x > 0) {
          this.velocity.x = 0
          this.position.x = collisionBlock.position.x - this.width - 0.01
          break
        }
        if (this.velocity.x < 0) {
          this.velocity.x = 0
          this.position.x =
            collisionBlock.position.x + collisionBlock.width + 0.01
          break
        }
      }
    }
  }

  applyGravity() {
    this.velocity.y += gravity
    this.position.y += this.velocity.y
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < collisionBlocks.length; i++) {
      const collisionBlock = collisionBlocks[i]

      if (
        collision({
          object1: this,
          object2: collisionBlock
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0
          this.position.y = collisionBlock.position.y - this.height - 0.01
          break
        }
        if (this.velocity.y < 0) {
          this.velocity.y = 0
          this.position.y =
            collisionBlock.position.y + collisionBlock.height + 0.1
          break
        }
      }
    }

    // colisão das plataformas
    for (let i = 0; i < platformCollisionBlocks.length; i++) {
      const platformCollisionBlock = platformCollisionBlocks[i]

      if (
        platformCollision({
          object1: this,
          object2: platformCollisionBlock
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0
          this.position.y =
            platformCollisionBlock.position.y - this.height - 0.01
          break
        }
      }
    }
  }

  checkDemage() {
    jogador.map((p) => {
      if (p == this || this.status.takeHit || this.status.defend) return
      if (
        collision({ object1: this, object2: p.hitBox }) &&
        !this.status.takeHit
      ) {
        this.status.takeHit = true
        this.life -= p.hitBox.hitPower
        if (this.life < 0) this.life = 0

        if (jogador[0] == this) {
          document.querySelector('#lifep1').style.width = this.life + '%'
        } else {
          document.querySelector('#lifep2').style.width = this.life + '%'
        }
      }
    })
  }

  addHitbox(atack) {
    this.hitBox.width = this.sprites[atack].hitBox.width
    this.hitBox.height = this.sprites[atack].hitBox.height

    if (!this.inverter) {
      this.hitBox.position.x =
        this.position.x + this.width + this.sprites[atack].hitBox.position.x
    } else {
      this.hitBox.position.x =
        this.position.x -
        this.sprites[atack].hitBox.width -
        this.sprites[atack].hitBox.position.x
    }
    this.hitBox.position.y =
      this.position.y + this.sprites[atack].hitBox.position.y

    this.hitBox.hitPower = this.sprites[atack].hitBox.hitPower
  }
  removeHitbox() {
    this.hitBox.width = 0
    this.hitBox.height = 0
    this.hitBox.position.x = 0
    this.hitBox.position.y = 0
  }

  // aplica os sprites
  switchSprite(sprite) {
    if (this.imageSrc !== this.sprites[sprite].imageSrc) {
      this.imageSrc = this.sprites[sprite].imageSrc
      this.image.src = this.imageSrc
      this.frameMax = this.sprites[sprite].frameMax
      this.frameCurrent = 0
    }
    if (sprite === 'takeHit' && this.frameCurrent === this.frameMax - 1) {
      this.status.takeHit = false
    }
    switch (sprite) {
      case 'atack1':
        if (this.imageSrc !== this.sprites.atack1.imageSrc) {
          this.imageSrc = this.sprites.atack1.imageSrc
          this.image.src = this.imageSrc
          this.frameMax = this.sprites.atack1.frameMax
          this.frameCurrent = 0
        } else if (this.frameCurrent == this.frameMax - 1) {
          this.status.atack = 0
        } else if (this.frameCurrent == this.sprites.atack1.atackStart) {
          // adiciona a hitbox
          this.addHitbox('atack1')
        } else if (this.frameCurrent == this.sprites.atack1.atackEnd - 1) {
          // remove a hitbox
          this.removeHitbox()
        }
        break
      case 'atack2':
        if (this.imageSrc !== this.sprites.atack2.imageSrc) {
          this.imageSrc = this.sprites.atack2.imageSrc
          this.image.src = this.imageSrc
          this.frameMax = this.sprites.atack2.frameMax
          this.frameCurrent = 0
        } else if (this.frameCurrent == this.frameMax - 1) {
          this.status.atack = 0
        } else if (this.frameCurrent == this.sprites.atack2.atackStart) {
          // adiciona a hitbox
          this.addHitbox('atack2')
        } else if (this.frameCurrent == this.sprites.atack2.atackEnd - 1) {
          // remove a hitbox
          this.removeHitbox()
        }
        break
      case 'atack3':
        if (this.imageSrc !== this.sprites.atack3.imageSrc) {
          this.imageSrc = this.sprites.atack3.imageSrc
          this.image.src = this.imageSrc
          this.frameMax = this.sprites.atack3.frameMax
          this.frameCurrent = 0
        } else if (this.frameCurrent == this.frameMax - 1) {
          this.status.atack = 0
        } else if (this.frameCurrent == this.sprites.atack3.atackStart) {
          // adiciona a hitbox
          this.addHitbox('atack3')
        } else if (this.frameCurrent == this.sprites.atack3.atackEnd - 1) {
          // remove a hitbox
          this.removeHitbox()
        }
        break
      case 'atack4':
        if (this.imageSrc !== this.sprites.atack4.imageSrc) {
          this.imageSrc = this.sprites.atack4.imageSrc
          this.image.src = this.imageSrc
          this.frameMax = this.sprites.atack4.frameMax
          this.frameCurrent = 0
        } else if (this.frameCurrent == this.frameMax - 1) {
          this.status.atack = 0
        } else if (this.frameCurrent == this.sprites.atack4.atackStart) {
          // adiciona a hitbox
          this.addHitbox('atack4')
        } else if (this.frameCurrent == this.sprites.atack4.atackEnd - 1) {
          // remove a hitbox
          this.removeHitbox()
        }
        break
    }
  }
}
