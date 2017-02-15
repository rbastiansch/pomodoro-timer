let countdown;
let verifyTimer = 1;
const timerDisplay = document.querySelector('.display-time-left');
const instructionDisplay = document.querySelector('.display-instruction');
const buttons = document.querySelector('.timer-button');

function playAudio(){
	const audio = document.querySelector(`audio`);
	audio.play();
}

function verifyPomodoro(seconds){
	if(verifyTimer == 7){
		playAudio();
		timer(1800);
		instructionDisplay.textContent = "Time to a BIG rest";

	}else if(verifyTimer%2 == 0){
			
			playAudio();
			timer(1500);
			instructionDisplay.textContent = "Time to work";
		}else{			
			playAudio();
			timer(300);
			instructionDisplay.textContent = "Time to rest";
		}
}

function timer(seconds){

	clearInterval(countdown);

	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);

	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		
		displayTimeLeft(secondsLeft);
		if(secondsLeft <= 0 && verifyTimer < 8){
			clearInterval(countdown);
			verifyPomodoro(secondsLeft);
			verifyTimer++;
			
		}else if(secondsLeft <= 0){
			clearInterval(countdown);
			return;
		}
		
	}, 1000);
}

function displayTimeLeft(seconds){
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
	timerDisplay.textContent = display;
	document.title = display;
}

function startTimer(){
	const seconds = parseInt(this.dataset.time);
	verifyTimer = 1;
	timer(seconds);
	instructionDisplay.textContent = "Time to work";
}

buttons.addEventListener('click', startTimer);
