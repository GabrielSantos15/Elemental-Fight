class Sprite {
  constructor({
    width,
    height,
    position,
    imageSrc,
    scale = 1,
    frameMax = 1,
    offset = { x: 0, y: 0 },
    inverter = false,
  }) {
    this.width = width;
    this.height = height;
    this.position = position;
    this.loaded = false
    this.image = new Image();
    this.image.onload = ()=>{this.loaded = true}
    this.image.src = imageSrc;
    this.scale = scale;
    this.frameMax = frameMax;
    this.frameCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.offset = offset;
    this.inverter = inverter;
  }

  draw() {
    if(!this.loaded)return

    if (this.inverter == true) {
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
      ctx.drawImage(
        this.image,
        this.frameCurrent * (this.image.width / this.frameMax),
        0,
        this.image.width / this.frameMax,
        this.image.height,
        canvas.width - (this.position.x + this.offset.x + this.width),
        this.position.y - this.offset.y,
        (this.image.width / this.frameMax) * this.scale,
        this.image.height * this.scale
      );
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
    } else {
      ctx.drawImage(
        this.image,
        this.frameCurrent * (this.image.width / this.frameMax),
        0,
        this.image.width / this.frameMax,
        this.image.height,
        this.position.x - this.offset.x,
        this.position.y - this.offset.y,
        (this.image.width / this.frameMax) * this.scale,
        this.image.height * this.scale
      );
    }
  }

  animeteFrames() {
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.frameCurrent < this.frameMax - 1) {
        this.frameCurrent++;
      } else {
        this.frameCurrent = 0;
      }
    }
  }

  updateSprite() {
    this.draw();
    this.animeteFrames();
  }
}
