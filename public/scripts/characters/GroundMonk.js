const GroundMonk = {
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
  imageSrc: './images/sprites/GroundMonk/Idle.png',
  scale: 0.85,
  frameMax: 12,
  offset: { x: 123, y: 80 },
  inverter: false,
  sprites: {
    idle: {
      imageSrc: './images/sprites/GroundMonk/Idle.png',
      frameMax: 6,
      image: new Image()
    },
    run: {
      imageSrc: './images/sprites/GroundMonk/Run.png',
      frameMax: 8
    },
    slide: {
      imageSrc: './images/sprites/GroundMonk/Slide.png',
      frameMax: 6
    },
    jumpUp: {
      imageSrc: './images/sprites/GroundMonk/Jump_up.png',
      frameMax: 3
    },
    jumpDown: {
      imageSrc: './images/sprites/GroundMonk/Jump_down.png',
      frameMax: 3
    },
    defend: {
      imageSrc: './images/sprites/GroundMonk/Defend.png',
      frameMax: 20
    },
    takeHit: {
      imageSrc: './images/sprites/GroundMonk/takeHit.png',
      frameMax: 6
    },
    death: {
      imageSrc: './images/sprites/GroundMonk/Death.png',
      frameMax: 20
    },
    atack1: {
      typeProjectile: false,
      imageSrc: './images/sprites/GroundMonk/Atack1.png',
      frameMax: 6,
      atackStart: 2,
      atackEnd: 5,
      hitBox: {
        width: 30,
        height: 10,
        position: {
          x: -5,
          y: 7
        },
        hitPower: 25
      }
    },
    atack2: {
      typeProjectile: false,
      imageSrc: './images/sprites/GroundMonk/Atack2.png',
      frameMax: 12,
      atackStart: 2,
      atackEnd: 10,
      hitBox: {
        width: 30,
        height: 10,
        position: {
          x: -5,
          y: 7
        },
        hitPower: 15
      }
    },
    atack3: {
      typeProjectile: false,
      imageSrc: './images/sprites/GroundMonk/Atack3.png',
      frameMax: 23,
      atackStart: 5,
      atackEnd: 21,
      hitBox: {
        width: 75,
        height: 30,
        position: {
          x: -5,
          y: 0
        },
        hitPower: 15
      }
    },
    atack4: {
      typeProjectile: false,
      imageSrc: './images/sprites/GroundMonk/AtackSp.png',
      frameMax: 25,
      atackStart: 4,
      atackEnd: 23,
      hitBox: {
        width: 60,
        height: 45,
        position: {
          x: -13,
          y: -15
        },
        hitPower: 25
      }
    }
  }
}
