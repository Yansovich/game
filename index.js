const startBtnEl = document.getElementById('start')
const cardsEl = document.querySelectorAll('.card')
const timeControllerEl = document.querySelector('.time-list')
const modalEl = document.getElementById('modal')
const boardEl = document.getElementById('board')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')

let selectedTime = null
let time = null
let idSetInterval = null

function handlerStartBtn(e) {
    e.preventDefault() 
    cardsEl[0].classList.add('up')
}

startBtnEl.addEventListener('click', handlerStartBtn)

function handlerTimeController(e) {

    if(e.target.classList.contains('time-list__item')){
        cardsEl[1].classList.add('up')
        
        selectedTime = parseInt(e.target.dataset.time)
        time = selectedTime
        startGame()
        console.log(time);
    }
}

timeControllerEl.addEventListener('click', handlerTimeController)

function startGame () {
   setTime(time)
   idSetInterval = setInterval(decTime, 1000)
}

function finishGame() {
    console.log('Game over'); 
    clearInterval(idSetInterval)
}

function decTime () {
    if (time === 0) {
        finishGame ()
    } else {
        let current = --time
        // current = current < 10 ? "0" + current : current;
        if(current < 10) {
            current = '0' + current
        }
        setTime(current)
    }
}

function setTime(timeGame) {
    timeEl.innerHTML = `00:${timeGame}`
}


