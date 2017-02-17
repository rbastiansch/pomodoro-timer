let countdown;
let verifyTimer = 1;
let verifyTask = 1;
const timerDisplay = document.querySelector('.display-time-left');
const instructionDisplay = document.querySelector('.display-instruction');
const currentTaskDisplay = document.querySelector('.display-current-task');
const buttons = document.querySelector('.timer-button');
const audio = document.querySelector('audio');
const seconds = document.querySelector('.timer-button').dataset.time;

const playAudio = () => { audio.play(); }

const verifyPomodoro = () => {
	if(verifyTimer == 7){
		playAudio();
		timer(1800);
		instructionDisplay.textContent = "Time to a BIG rest";
	}else if(verifyTimer%2 == 0){
			verifyTask++;			
			playAudio();
			timer(1500);
			instructionDisplay.textContent = "Time to work";
			currentTaskDisplay.textContent = `Current pomo:  ${verifyTask}`;
		}else{			
			playAudio();
			timer(300);
			instructionDisplay.textContent = "Time to rest";			
		}
}

const timer = seconds => {
	clearInterval(countdown);
	const now = Date.now();
	const then = now + seconds * 1000;

	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);

		if(secondsLeft <= 0 && verifyTimer < 8){
			clearInterval(countdown);
			verifyPomodoro();
			verifyTimer++;
			
		}else if(secondsLeft <= 0){
			clearInterval(countdown);
			return;
		}
		displayTimeLeft(secondsLeft);		
	}, 1000);
}

const displayTimeLeft = seconds => {
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
	timerDisplay.textContent = display;
	document.title = display;
}

const startTimer = () => {	
	verifyTimer = 1;
	displayTimeLeft(seconds);
	timer(seconds);
	instructionDisplay.textContent = "Time to work";
	currentTaskDisplay.textContent = `Current Pomo:  ${verifyTask}`;
}

buttons.addEventListener('click', startTimer);
