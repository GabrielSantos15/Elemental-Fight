const windWarrior = {
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
  imageSrc: "./images/sprites/windWarrior/Idle.png",
  scale: 0.7,
  frameMax: 12,
  offset: { x: 95, y: 59 },
  inverter: false,
  sprites: {
    idle: {
      imageSrc: "./images/sprites/windWarrior/Idle.png",
      frameMax: 8,
      image: new Image(),
    },
    run: {
      imageSrc: "./images/sprites/windWarrior/Run.png",
      frameMax: 8,
    },
    slide: {
      imageSrc: "./images/sprites/windWarrior/Slide.png",
      frameMax: 6,
    },
    jumpUp: {
      imageSrc: "./images/sprites/windWarrior/Jump_up.png",
      frameMax: 3,
    },
    jumpDown: {
      imageSrc: "./images/sprites/windWarrior/Jump_down.png",
      frameMax: 3,
    },
    defend: {
      imageSrc: "./images/sprites/windWarrior/Defend.png",
      frameMax: 8,
    },
    takeHit: {
      imageSrc: "./images/sprites/windWarrior/takeHit.png",
      frameMax: 6,
    },
    death: {
      imageSrc: "./images/sprites/windWarrior/Death.png",
      frameMax: 19,
    },
    atack1: {
      imageSrc: "./images/sprites/windWarrior/Atack1.png",
      frameMax: 8,
      atackStart: 4,
      atackEnd: 6,
      hitBox: {
        width: 50,
        height: 7,
        position: {
          x: 0,
          y: 5,
        },
        hitPower: 20
      },
    },
    atack2: {
      imageSrc: "./images/sprites/windWarrior/Atack2.png",
      frameMax: 18,
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
      imageSrc: "./images/sprites/windWarrior/Atack3.png",
      frameMax: 26,
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
      imageSrc: "./images/sprites/windWarrior/AtackSp.png",
      frameMax: 30,
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
