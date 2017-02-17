'use strict';

var countdown = void 0;
var verifyTimer = 0;
var verifyTask = 0;
var timerDisplay = document.querySelector('.display-time-left');
var instructionDisplay = document.querySelector('.display-instruction');
var currentTaskDisplay = document.querySelector('.display-current-task');
var buttons = document.querySelector('.timer-button');
var audio = document.querySelector('audio');
var seconds = document.querySelector('.timer-button').dataset.time;

var playAudio = function playAudio() {
	audio.play();
};

var verifyPomodoro = function verifyPomodoro() {
	if (verifyTimer == 7) {
		playAudio();
		timer(1800);
		instructionDisplay.textContent = "Time to a BIG rest";
	} else if (verifyTimer % 2 == 0) {
		verifyTask++;
		playAudio();
		timer(1500);
		instructionDisplay.textContent = "Time to work";
		currentTaskDisplay.textContent = 'Current pomo:  ' + verifyTask;
	} else {
		playAudio();
		timer(300);
		instructionDisplay.textContent = "Time to rest";
	}
};

var timer = function timer(seconds) {
	clearInterval(countdown);
	var now = Date.now();
	var then = now + seconds * 1000;

	countdown = setInterval(function () {
		var secondsLeft = Math.round((then - Date.now()) / 1000);

		if (secondsLeft <= 0 && verifyTimer < 8) {
			clearInterval(countdown);
			verifyPomodoro();
			verifyTimer++;
		} else if (secondsLeft < 0) {
			clearInterval(countdown);
			return;
		}
		displayTimeLeft(secondsLeft);
	}, 1000);
};

var displayTimeLeft = function displayTimeLeft(seconds) {
	var minutes = Math.floor(seconds / 60);
	var remainderSeconds = seconds % 60;
	var display = minutes + ':' + (remainderSeconds < 10 ? '0' : '') + remainderSeconds;
	timerDisplay.textContent = display;
	document.title = display;
};

var startTimer = function startTimer() {
	verifyTimer = 0;
	verifyTask = 0;
	currentTaskDisplay.textContent = 'Current pomo:  ' + verifyTask;
	displayTimeLeft(seconds);
	timer(seconds);
};

buttons.addEventListener('click', startTimer);