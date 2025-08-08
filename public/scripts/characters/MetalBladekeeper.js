const MetalBladekeeper = {
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
  imageSrc: './images/sprites/MetalBladekeeper/Idle.png',
  scale: 0.7,
  frameMax: 12,
  offset: { x: 100, y: 65 },
  inverter: false,
  sprites: {
    idle: {
      imageSrc: './images/sprites/MetalBladekeeper/Idle.png',
      frameMax: 8,
      image: new Image()
    },
    run: {
      imageSrc: './images/sprites/MetalBladekeeper/Run.png',
      frameMax: 8
    },
    slide: {
      imageSrc: './images/sprites/MetalBladekeeper/Slide.png',
      frameMax: 7
    },
    jumpUp: {
      imageSrc: './images/sprites/MetalBladekeeper/Jump_up.png',
      frameMax: 3
    },
    jumpDown: {
      imageSrc: './images/sprites/MetalBladekeeper/Jump_down.png',
      frameMax: 3
    },
    defend: {
      imageSrc: './images/sprites/MetalBladekeeper/Defend.png',
      frameMax: 12
    },
    takeHit: {
      imageSrc: './images/sprites/MetalBladekeeper/takeHit.png',
      frameMax: 6
    },
    death: {
      imageSrc: './images/sprites/MetalBladekeeper/Death.png',
      frameMax: 12
    },
    atack1: {
      typeProjectile: false,
      imageSrc: './images/sprites/MetalBladekeeper/Atack1.png',
      frameMax: 6,
      atackStart: 2,
      atackEnd: 4,
      hitBox: {
        width: 32,
        height: 11,
        position: {
          x: -5,
          y: 9
        },
        hitPower: 20
      }
    },
    atack2: {
      typeProjectile: true,
      imageSrc: './images/sprites/MetalBladekeeper/Atack2.png',
      frameMax: 13,
      atackStart: 3,
      atackEnd: 6,
      hitBox: {
        width: 15,
        height: 15,
        position: {
          x: 0,
          y: 3
        },
        velocity: {
          x: 2,
          y: 0
        },
        imageSrc: './images/sprites/MetalBladekeeper/projectiles/knife.png',
        offset: {
          x: 23,
          y: 22
        },
        scale: 0.7,
        hitPower: 5
      }
    },
    atack3: {
      typeProjectile: true,
      imageSrc: './images/sprites/MetalBladekeeper/Atack3.png',
      frameMax: 10,
      atackStart: 3,
      atackEnd: 6,
      hitBox: {
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
        imageSrc:
          './images/sprites/MetalBladekeeper/projectiles/knifesTrap.png',
        frameMax: 4,
        offset: {
          x: 10,
          y: 13
        },
        scale: 0.7,
        hitPower: 10
      }
    },
    atack4: {
      typeProjectile: true,
      imageSrc: './images/sprites/MetalBladekeeper/AtackSp.png',
      frameMax: 11,
      atackStart: 4,
      atackEnd: 9,
      hitBox: {
        width: 120,
        height: 40,
        position: {
          x: -60,
          y: -10
        },
        hitPower: 80
      }
    }
  }
}
