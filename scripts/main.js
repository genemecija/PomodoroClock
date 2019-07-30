// Set elements as variables
var timerTypeDisplay = document.querySelector('#timerType')
var timerDisplay = document.querySelector('#timer')
var sessionTime = document.querySelector('#sessionTime')
var breakTime = document.querySelector('#breakTime')

var playButton = document.querySelector('#play')
var resetButton = document.querySelector('#reset')
var pauseButton = document.querySelector('#pause')
var stopButton = document.querySelector('#stop')

var increaseSessionTimeButton = document.querySelector('#sessionTimeUp')
var decreaseSessionTimeButton = document.querySelector('#sessionTimeDown')
var increaseBreakTimeButton = document.querySelector('#breakTimeUp')
var decreaseBreakTimeButton = document.querySelector('#breakTimeDown')

// Set state variables
let isPaused = false

// Converts timer duration from seconds to display format (minutes:seconds)
const convertSecondsToMinSec = function(seconds) {
    if (seconds < 60) {
        if (seconds<10) {
            return '00:0'+seconds
        } else {
            return '00:'+seconds
        }
    }
    let m = Math.floor(seconds/60)
    let s = seconds%60
    m = m<10 ? '0'+m : m
    s = s<10 ? '0'+s : s
    return m+':'+s
}

// Initalize timer and goal variables
var timer = null
let goal = sessionTime.textContent*60

// Starts or resumes timer
const timerStart = function() {
    if (timer != null && !isPaused) {
        return
    } else if (isPaused) {
        let timeRemaining = timerDisplay.textContent

        timeRemaining = Number(timeRemaining.split(':')[0])*60 + Number(timeRemaining.split(':')[1])
        
        goal = Number(timeRemaining)
    }

    if (timer === null) {
        if (isPaused) {
            isPaused = false
        } else {
            goal = sessionTime.textContent*60
        }
        timerDisplay.textContent = convertSecondsToMinSec(goal)
        let sessionTimerFinished = false
        var x = setInterval(function() {
            goal -= 1
            timerDisplay.textContent = convertSecondsToMinSec(goal)

            if (goal < 0) {
                sessionTimerFinished = !sessionTimerFinished
                if (sessionTimerFinished) {
                    timerTypeDisplay.textContent = 'Session'
                    goal = breakTime.textContent*60
                } else {
                    timerTypeDisplay.textContent = 'Break'
                    goal = sessionTime.textContent*60
                }
            }
        }, 1000)
        return x
    }
}


const playButtonPressed = function() {
    timer = timerStart()
}
const stopButtonPressed = function() {
    clearInterval(timer)
    timer = null
    isPaused = false
    timerDisplay.textContent = convertSecondsToMinSec(sessionTime.textContent*60)
    timerTypeDisplay.textContent = 'Session'
}
const pauseButtonPressed = function() {
    clearInterval(timer)
    timer = null
    isPaused = true
}
const resetButtonPressed = function() {
    sessionTime.textContent = 25
    breakTime.textContent = 5
    stopButtonPressed()
}


const increaseSessionTime = function() {
    if (timer == null) {
        sessionTime.textContent = Number(sessionTime.textContent) + 1
        timerDisplay.textContent = convertSecondsToMinSec(Number(sessionTime.textContent)*60)
    }
}
const increaseBreakTime = function() {
    if (timer == null) {
        breakTime.textContent = Number(breakTime.textContent) + 1
    }
}
const decreaseSessionTime = function() {
    if (timer == null && Number(sessionTime.textContent)>1) {
        sessionTime.textContent = Number(sessionTime.textContent) - 1
        timerDisplay.textContent = convertSecondsToMinSec(Number(sessionTime.textContent)*60)
    }
}
const decreaseBreakTime = function() {
    if (timer == null && Number(breakTime.textContent)>1) {
        breakTime.textContent = Number(breakTime.textContent) - 1
    }
}

playButton.addEventListener('click', playButtonPressed)
resetButton.addEventListener('click', resetButtonPressed)
pauseButton.addEventListener('click', pauseButtonPressed)
stopButton.addEventListener('click', stopButtonPressed)

increaseSessionTimeButton.addEventListener('click', increaseSessionTime)
increaseBreakTimeButton.addEventListener('click', increaseBreakTime)
decreaseSessionTimeButton.addEventListener('click', decreaseSessionTime)
decreaseBreakTimeButton.addEventListener('click', decreaseBreakTime)