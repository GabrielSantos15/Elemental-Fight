const FireKnight = {
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
  imageSrc: './images/sprites/FireKnight/Idle.png',
  scale: 0.7,
  frameMax: 12,
  offset: { x: 103, y: 65 },
  inverter: false,
  sprites: {
    idle: {
      imageSrc: './images/sprites/FireKnight/Idle.png',
      frameMax: 8,
      image: new Image()
    },
    run: {
      imageSrc: './images/sprites/FireKnight/Run.png',
      frameMax: 8
    },
    slide: {
      imageSrc: './images/sprites/FireKnight/Slide.png',
      frameMax: 8
    },
    jumpUp: {
      imageSrc: './images/sprites/FireKnight/Jump_up.png',
      frameMax: 3
    },
    jumpDown: {
      imageSrc: './images/sprites/FireKnight/Jump_down.png',
      frameMax: 3
    },
    defend: {
      imageSrc: './images/sprites/FireKnight/Defend.png',
      frameMax: 13
    },
    takeHit: {
      imageSrc: './images/sprites/FireKnight/takeHit.png',
      frameMax: 6
    },
    death: {
      imageSrc: './images/sprites/FireKnight/Death.png',
      frameMax: 13
    },
    atack1: {
      typeProjectile: false,
      imageSrc: './images/sprites/FireKnight/Atack1.png',
      frameMax: 11,
      atackStart: 4,
      atackEnd: 8,
      hitBox: {
        width: 50,
        height: 55,
        position: {
          x: -10,
          y: -25
        },
        hitPower: 20
      }
    },
    atack2: {
      typeProjectile: false,
      imageSrc: './images/sprites/FireKnight/Atack2.png',
      frameMax: 19,
      atackStart: 6,
      atackEnd: 17,
      hitBox: {
        width: 85,
        height: 30,
        position: {
          x: -45,
          y: 0
        },
        hitPower: 20
      }
    },
    atack3: {
        typeProjectile: false,
        imageSrc: './images/sprites/FireKnight/Atack3.png',
        frameMax: 28,
        atackStart: 7,
        atackEnd: 24,
        hitBox: {
          width: 107,
          height: 35,
          position: {
            x: -45,
            y: -5
          },
          hitPower: 15
        }
    },
    atack4: {
      typeProjectile: false,
      imageSrc: './images/sprites/FireKnight/AtackSp.png',
      frameMax: 18,
      atackStart: 10,
      atackEnd: 15,
      hitBox: {
        width: 60,
        height: 60,
        position: {
          x: 9,
          y: -30
        },
        hitPower: 80
      }
    }
  }
}
