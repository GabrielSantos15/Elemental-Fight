const Arrow = {
  life: 100,
  width: 12,
  height: 30,
  position: {
    x: 162,
    y: 0,
  },

  hitBox: {
    width: 0,
    height: 0,
    position: {
      x: 0,
      y: 0,
    },
    hitPower : 0
  },
  direction: {
    up: false,
    down: false,
    left: false,
    right: false,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  speed: 2,
  status: {
    atack: 0,
    defend: false,
    takeHit: false,
    death: false,
  },
  imageSrc: "./images/sprites/Arrow/Idle.png",
  scale: 0.7,
  frameMax: 12,
  offset: { x: 95, y: 59 },
  inverter: false,
  sprites: {
    idle: {
      imageSrc: "./images/sprites/Arrow/Idle.png",
      frameMax: 12,
      image: new Image(),
    },
    run: {
      imageSrc: "./images/sprites/Arrow/Run.png",
      frameMax: 10,
    },
    slide: {
      imageSrc: "./images/sprites/Arrow/Slide.png",
      frameMax: 13,
    },
    jumpUp: {
      imageSrc: "./images/sprites/Arrow/Jump_up.png",
      frameMax: 3,
    },
    jumpDown: {
      imageSrc: "./images/sprites/Arrow/Jump_down.png",
      frameMax: 3,
    },
    defend: {
      imageSrc: "./images/sprites/Arrow/Defend.png",
      frameMax: 19,
    },
    takeHit: {
      imageSrc: "./images/sprites/Arrow/takeHit.png",
      frameMax: 6,
    },
    death: {
      imageSrc: "./images/sprites/Arrow/Death.png",
      frameMax: 19,
    },
    atack1: {
      imageSrc: "./images/sprites/Arrow/Atack1.png",
      frameMax: 10,
      atackStart: 6,
      atackEnd: 9,
      hitBox: {
        width: 25,
        height: 7,
        position: {
          x: 30,
          y: 5,
        },
        hitPower: 20
      },
    },
    atack2: {
      imageSrc: "./images/sprites/Arrow/Atack2.png",
      frameMax: 15,
      atackStart: 9,
      atackEnd: 11,
      hitBox: {
        width: 15,
        height: 15,
        position: {
          x: 18,
          y: 3,
        },
        hitPower:10
      },
    },
    atack3: {
      imageSrc: "./images/sprites/Arrow/Atack3.png",
      frameMax: 12,
      atackStart: 6,
      atackEnd: 9,
      hitBox: {
        width: 170 / 4,
        height: 60 / 4,
        position: {
          x: -100 / 4,
          y: -90 / 4,
        },
      },
      hitPower: 30
    },
    atack4: {
      imageSrc: "./images/sprites/Arrow/AtackSp.png",
      frameMax: 17,
      atackStart: 10,
      atackEnd: 12,
      hitBox: {
        width: 100,
        height: 5,
        position: {
          x: 0,
          y: 9,
        },
        hitPower: 40
      },
    },
  },
};
