import {getCustomProperty, setCustomProperty,  incrementCustomProperty} from "./updateCustomProperty.js";
const dinoElement = document.querySelector('[data-dino]');
const JUMP_SPEED = .45
const GRAVITY = 0.0015
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100
let isJumping
let dinoFrame
let currentFrameTime
let yVelocity;
export function updateDino(delta, speedScale) {
    handelRun(delta, speedScale)
    handelJump(delta)
}

export function setupDino() {
    isJumping = false
    dinoFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(dinoElement ,'--bottom', 0)
    document.removeEventListener('keydown', onJump)
    document.addEventListener('keydown' , onJump);
}

export function getDinoRect() {
    return dinoElement.getBoundingClientRect()
}
  
  export function setDinoLose() {
    dinoElement.src = "imgs/dino-lose.png"
}

function handelRun(delta, speedScale) {
    if (isJumping) {
        dinoElement.src = `imgs/dino-stationary.png`;
        return
    }
    if (currentFrameTime >= FRAME_TIME) {
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
        dinoElement.src = `imgs/dino-run-${dinoFrame}.png`
        currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
}
function handelJump(delta) {
    if (!isJumping)return
    incrementCustomProperty(dinoElement, '--bottom', yVelocity * delta );
    if (getCustomProperty(dinoElement , '--bottom') <= 0) {
        setCustomProperty(dinoElement, '--bottom' , 0);
        isJumping = false
    }
    yVelocity -= GRAVITY * delta
}

function onJump(event) {
    if (event.code !== "Space" || isJumping) return
    yVelocity = JUMP_SPEED;
    isJumping = true
}