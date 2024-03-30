const ALPHABETS = 'abcdefghijklmnopqrstuvwxyz';
const TRY_CONSTANT = 12;
const CHALLENGE_STRING = 'pythagorean theorem';
const challengeStringChars = CHALLENGE_STRING.split('');

const blanksDisplay = document.getElementById('blanksDisplay');
const tryCountDisplay = document.getElementById('numberOfTries');
const lettersGuessedDisplay = document.getElementById('lettersGuessed');
const keyboardDisplay = document.getElementById('keyboard');
const hangmanDisplay = document.getElementById('hangmanImage');

initialDisplay();
function initialDisplay() {
	blanksDisplay.innerText = challengeStringChars.map((x) =>
		x === ' ' ? ' ' : '_'
	);
	tryCountDisplay.innerText = TRY_CONSTANT;
	generateKeyboard(ALPHABETS);
	hangmanDisplay.src = './images/hangman-0.svg';
}
function generateKeyboard(letters) {
	for (char of letters) {
		const keyboardButton = document.createElement('button');
		keyboardButton.textContent = char;
		keyboardDisplay.appendChild(keyboardButton);
		keyboardButton.addEventListener('click', (e) => {
			handleUserGuess(e.target.innerText);
		});
	}
}
function handleUserGuess(key) {
	if (!CHALLENGE_STRING.includes(key)) {
		tryCountDisplay.innerText--;
		updateHangmanImage(tryCountDisplay.innerText);
		checkForDefeat(tryCountDisplay.innerText);
	}
	lettersGuessedDisplay.innerText += key;
	disableKey(key);
	blanksDisplay.innerText = challengeStringChars.map((x) =>
		x === ' ' ? ' ' : lettersGuessedDisplay.innerText.includes(x) ? x : '_'
	);
	checkForVictory();
}
function updateHangmanImage(numberOfTries) {
	const hangNumber = Math.floor((TRY_CONSTANT - numberOfTries) / 2);
	// -0 to -6
	hangmanDisplay.src = `./images/hangman-${hangNumber}.svg`;
}
function disableKey(letter) {
	for (const button of keyboardDisplay.children) {
		if (button.innerText === letter) {
			button.setAttribute('disabled', '');
		}
	}
}
function checkForDefeat(numberOfTries) {
	if (numberOfTries <= 0) {
		console.log('You lost!');
		for (const button of keyboardDisplay.children) {
			button.setAttribute('disabled', '');
		}
	}
}
function checkForVictory() {
	if (!blanksDisplay.innerText.includes('_')) {
		console.log('You won!');
	}
}
