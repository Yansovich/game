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
let score = 0

function handlerStartBtn(e) {
    e.preventDefault() 
    cardsEl[0].classList.add('up')
}

startBtnEl.addEventListener('click', handlerStartBtn)

// вставка элемента
// startBtnEl.addEventListener('click', function() {
//     let div = document.createElement('div');
//     div.textContent = 'dhsfds'
// //     cardsEl[0].append(div); 
//     cardsEl[0].insertAdjacentElement('beforeend', div);
// })

function handlerTimeController(e) {

    if(e.target.classList.contains('time-list__item')){
        cardsEl[1].classList.add('up')
        
        selectedTime = parseInt(e.target.dataset.time)
        time = selectedTime
        startGame()
        // console.log(time);
    }
}

timeControllerEl.addEventListener('click', handlerTimeController)

function handlerCircleClick(e) {
    if(e.target.classList.contains('circle')) {
        score++
        // console.log('click on circle');
        e.target.remove()
        createRandomCircle()
    }
}

boardEl.addEventListener('click', handlerCircleClick)

function createRandomCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    const size = getRandomIntInclusive(10,50)
    circle.style.width = circle.style.height = size + 'px'
    const {width, height} = boardEl.getBoundingClientRect()
    // console.log(width, height);
    // рандом цвет
    const randomBgCircleColor = getRandomColor()
    circle.style.backgroundColor = randomBgCircleColor
    // рандом размер
    const x = getRandomIntInclusive(0, width - size)
    const y = getRandomIntInclusive(0, height - size)

    circle.style.top = y + 'px'
    circle.style.left = x + 'px'

    boardEl.append(circle);
}

function startGame () {
   setTime(time)
   idSetInterval = setInterval(decTime, 1000)
   // создать рандом круги
   createRandomCircle()
}

function finishGame() {
    // console.log('Game over'); 
    scoreEl.innerHTML = score
    modalEl.classList.add('open')
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

function getRandomIntInclusive (min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); 
}

function getRandomColor () {
    return `rgb(${getRandomIntInclusive(0, 255)}, ${getRandomIntInclusive(0, 255)}, ${getRandomIntInclusive(0, 255)})`
}

modalEl.addEventListener('click', handlerModalClick)

function resetGame() {
    this.classList.remove('open')
    time = selectedTime
    score = 0
    boardEl.innerHTML = ''
}

function handlerModalClick(e) {
    if(e.target.getAttribute('id') === 'restart') {
        // console.log('restart');
        resetGame.call(this)
        startGame()
    }
    if(e.target.getAttribute('id') === 'cancel') {
        resetGame.call(this)
        cardsEl.forEach((card) => {
            card.classList.remove('up')
        })
    }
}