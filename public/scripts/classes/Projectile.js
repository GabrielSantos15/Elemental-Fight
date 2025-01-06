class Projectile extends Sprite {
  constructor({
    position,
    velocity,
    width,
    height,
    imageSrc,
    frameMax,
    offset,
    scale,
    inverter
  }) {
    super({
      width,
      height,
      position,
      imageSrc,
      frameMax,
      offset,
      scale,
      inverter
    })
    this.position = position
    this.velocity = velocity
    this.width = width
    this.height = height
  }
  update() {

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if(debugMode){
      ctx.fillStyle = "#f00"
      ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
    this.updateSprite()
    this.draw()
  }
}
