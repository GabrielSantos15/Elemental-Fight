const CrystalMauler = {
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
  imageSrc: './images/sprites/CrystalMauler/Idle.png',
  scale: 0.7,
  frameMax: 12,
  offset: { x: 100, y: 65 },
  inverter: false,
  sprites: {
    idle: {
      imageSrc: './images/sprites/CrystalMauler/Idle.png',
      frameMax: 8,
      image: new Image()
    },
    run: {
      imageSrc: './images/sprites/CrystalMauler/Run.png',
      frameMax: 8
    },
    slide: {
      imageSrc: './images/sprites/CrystalMauler/Slide.png',
      frameMax: 8
    },
    jumpUp: {
      imageSrc: './images/sprites/CrystalMauler/Jump_up.png',
      frameMax: 3
    },
    jumpDown: {
      imageSrc: './images/sprites/CrystalMauler/Jump_down.png',
      frameMax: 3
    },
    defend: {
      imageSrc: './images/sprites/CrystalMauler/Defend.png',
      frameMax: 16
    },
    takeHit: {
      imageSrc: './images/sprites/CrystalMauler/takeHit.png',
      frameMax: 6
    },
    death: {
      imageSrc: './images/sprites/CrystalMauler/Death.png',
      frameMax: 15
    },
    atack1: {
      typeProjectile: false,
      imageSrc: './images/sprites/CrystalMauler/Atack1.png',
      frameMax: 7,
      atackStart: 3,
      atackEnd: 6,
      hitBox: {
        width: 40,
        height: 30,
        position: {
          x: -15,
          y: -5
        },
        hitPower: 20
      }
    },
    atack2: {
      typeProjectile: false,
      imageSrc: './images/sprites/CrystalMauler/Atack2.png',
      frameMax: 7,
      atackStart: 4,
      atackEnd: 6,
      hitBox: {
        width: 0,
        height: 0,
        position: {
          x: -0,
          y: 0
        },
        hitPower: 20
      }
    },
    atack3: {
      typeProjectile: false,
      imageSrc: './images/sprites/CrystalMauler/Atack3.png',
      frameMax: 17,
      atackStart: 7,
      atackEnd: 15,
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
      imageSrc: './images/sprites/CrystalMauler/AtackSp.png',
      frameMax: 15,
      atackStart: 8,
      atackEnd: 14,
      hitBox: {
        width: 100,
        height: 50,
        position: {
          x: -13,
          y: -20
        },
        hitPower: 80
      }
    }
  }
}
