const windWarrior = {
  life: 100,
  width: 12,
  height: 30,
  position: {
    x: 288,
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
  scale: 0.8,
  frameMax: 12,
  offset: { x: 109, y: 73},
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
        width: 40,
        height: 15,
        position: {
          x: -20,
          y: 5,
        },
        hitPower: 25
      },
    },
    atack2: {
      imageSrc: "./images/sprites/windWarrior/Atack2.png",
      frameMax: 18,
      atackStart: 9,
      atackEnd: 11,
      hitBox: {
        width: 50,
        height: 15,
        position: {
          x: -20,
          y: 5,
        },
        hitPower:30
      },
    },
    atack3: {
      imageSrc: "./images/sprites/windWarrior/Atack3.png",
      frameMax: 26,
      atackStart: 10,
      atackEnd: 14,
      hitBox: {
        width: 90,
        height: 30,
        position: {
          x: -10,
          y: 0,
        },
        hitPower: 30
      },
    },
    atack4: {
      imageSrc: "./images/sprites/windWarrior/AtackSp.png",
      frameMax: 30,
      atackStart: 8,
      atackEnd: 20,
      hitBox: {
        width: 80,
        height: 40,
        position: {
          x: -40,
          y: -10,
        },
        hitPower: 35
      },
    },
  },
};
