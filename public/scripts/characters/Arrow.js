const Arrow = {
  life: 100,
  width: 12,
  height: 30,
  position: {
    x: 288,
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
  velocity: {
    x: 0,
    y: 0
  },
  speed: 2,
  status: {
    atack: 0,
    defend: false,
    takeHit: false,
    death: false
  },
  imageSrc: './images/sprites/Arrow/Idle.png',
  scale: 0.7,
  frameMax: 12,
  offset: { x: 95, y: 59 },
  inverter: false,
  sprites: {
    idle: {
      imageSrc: './images/sprites/Arrow/Idle.png',
      frameMax: 12,
      image: new Image()
    },
    run: {
      imageSrc: './images/sprites/Arrow/Run.png',
      frameMax: 10
    },
    slide: {
      imageSrc: './images/sprites/Arrow/Slide.png',
      frameMax: 13
    },
    jumpUp: {
      imageSrc: './images/sprites/Arrow/Jump_up.png',
      frameMax: 3
    },
    jumpDown: {
      imageSrc: './images/sprites/Arrow/Jump_down.png',
      frameMax: 3
    },
    defend: {
      imageSrc: './images/sprites/Arrow/Defend.png',
      frameMax: 19
    },
    takeHit: {
      imageSrc: './images/sprites/Arrow/takeHit.png',
      frameMax: 6
    },
    death: {
      imageSrc: './images/sprites/Arrow/Death.png',
      frameMax: 19
    },
    atack1: {
      typeProjectile: false,
      imageSrc: './images/sprites/Arrow/Atack1.png',
      frameMax: 10,
      atackStart: 6,
      atackEnd: 9,
      hitBox: {
        typeProjectile: false,
        width: 45,
        height: 7,
        position: {
          x: 5,
          y: 5
        },
        hitPower: 20
      }
    },
    atack2: {
      typeProjectile: true,
      imageSrc: './images/sprites/Arrow/Atack2.png',
      frameMax: 15,
      atackStart: 9,
      atackEnd: 11,
      hitBox: {
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
      }
    },
    atack3: {
      typeProjectile: true,
      imageSrc: './images/sprites/Arrow/Atack3.png',
      frameMax: 12,
      atackStart: 6,
      atackEnd: 9,
      hitBox: {
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
      hitPower: 30
    },
    atack4: {
      typeProjectile: true,
      imageSrc: './images/sprites/Arrow/AtackSp.png',
      frameMax: 17,
      atackStart: 10,
      atackEnd: 12,
      hitBox: {
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
    }
  }
}
