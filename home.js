// script.js

let timer;
let elapsedTime = 0;
let isRunning = false;
let startTime;
let updatedTime;
let difference;
let tInterval;
let lapCounter = 1;

const displayHours = document.getElementById('hours');
const displayMinutes = document.getElementById('minutes');
const displaySeconds = document.getElementById('seconds');
const displayMilliseconds = document.getElementById('milliseconds');
const lapList = document.getElementById('lapList');

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startTime = new Date().getTime();
        timer = setInterval(updateTime, 1);
        startButton.disabled = true;
        pauseButton.disabled = false;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    elapsedTime += difference;
    startTime = updatedTime;
    
    const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    
    displayHours.innerHTML = formatTime(hours);
    displayMinutes.innerHTML = formatTime(minutes);
    displaySeconds.innerHTML = formatTime(seconds);
    displayMilliseconds.innerHTML = formatTime(milliseconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    displayHours.innerHTML = "00";
    displayMinutes.innerHTML = "00";
    displaySeconds.innerHTML = "00";
    displayMilliseconds.innerHTML = "00";
    lapList.innerHTML = "";
    lapCounter = 1;
    startButton.disabled = false;
    pauseButton.disabled = true;
}

function recordLap() {
    if (isRunning) {
        const lapTime = document.createElement('li');
        lapTime.innerHTML = `Lap ${lapCounter}: ${displayHours.innerHTML}:${displayMinutes.innerHTML}:${displaySeconds.innerHTML}:${displayMilliseconds.innerHTML}`;
        lapList.appendChild(lapTime);
        lapCounter++;
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
