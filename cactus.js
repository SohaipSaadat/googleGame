import {getCustomProperty, setCustomProperty,  incrementCustomProperty} from "./updateCustomProperty.js";
const worldElem = document.querySelector("[data-world]");
const CACTUS_INTERVAL_MIN = 500
const CACTUS_INTERVAL_MAX = 2000
const SPEED = 0.05
let nextTimeCactus;
export function setupCactus() {
    nextTimeCactus = CACTUS_INTERVAL_MIN;
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        cactus.remove()
    })
}

export function updateCactus(delta , speedScale) {
    document.querySelectorAll('[data-cactus]').forEach(cactus => {
        incrementCustomProperty(cactus, '--left' , SPEED * delta * speedScale * -1);
        if (getCustomProperty(cactus, '--left') <= -100) {
            cactus.remove()
        }
    })
    
    if (nextTimeCactus <= 0) {
        createCactus()
        nextTimeCactus = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
    }
    nextTimeCactus -= delta
}

export function getCactusRects() {
    return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
      return cactus.getBoundingClientRect()
    })
}

function createCactus() {
    const cactus = document.createElement('img');
    cactus.dataset.cactus = true
    cactus.src = "imgs/cactus.png"
    cactus.classList.add('cactus');
    setCustomProperty(cactus, '--left', 100)
    worldElem.append(cactus);
};

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
