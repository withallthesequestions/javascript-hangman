const TRIES_LEFT = 12;
const CHALLENGE_STRING = 'party pooper';
const ALPHABETS = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
];

const blanksDisplay = document.querySelector('#blanksDisplay');
const triesLeftDisplay = document.querySelector('#numberOfTries');
const lettersGuessedDisplay = document.querySelector('#lettersGuessed');
const keyboardDisplay = document.querySelector('#keyboard');
const hangmanDisplay = document.querySelector('#hangmanImage');

const challengeArray = CHALLENGE_STRING.split('');
/* 
 - It's tempting to incorporate the above array into the below `generateBlanks` function as a split-map-join operation. This would helps overall code readability. 
 - But a later function (`updateBlanksOnUserGuess`), also makes use of this array.
*/

const validateChallengeString = (string) => {
	const regex = /[^a-z\s]/gi;
	const invalidCharacters = string.match(regex);
	if (!!invalidCharacters) {
		for (const button of keyboardDisplay.children) {
			button.setAttribute('disabled', '');
		}
		return 'Error: Invalid character in challenge string';
	} else {
		blanksDisplay.innerText = generateBlanks(challengeArray);
	}
};

const generateBlanks = (arrayOfLetters) => {
	if (validateChallengeString(CHALLENGE_STRING)) {
		return validateChallengeString(CHALLENGE_STRING);
	} else {
		const blanksString = arrayOfLetters
			.map((letter) => (letter === ' ' ? `\xa0` : '_'))
			.join(' ');
		return blanksString;
	}
};

const renderScreenKeyboard = (letters) => {
	for (char of letters) {
		const kbdBtn = document.createElement('button');
		kbdBtn.textContent = char;
		keyboardDisplay.appendChild(kbdBtn);
		kbdBtn.addEventListener('click', (e) => {
			handleUserGuess(e.target.innerText);
		});
	}
};

const receiveUserKeyInputs = () => {
	addEventListener('keydown', (e) => {
		if (!ALPHABETS.includes(e.key)) {
			console.log('You pressed an invalid key!');
		} else handleUserGuess(e.key);
	});
};

const renderStartScreen = () => {
	triesLeftDisplay.innerText = TRIES_LEFT;
	hangmanDisplay.src = './images/hangman-0.svg';
	renderScreenKeyboard(ALPHABETS);
	receiveUserKeyInputs();
};

renderStartScreen();

const checkDefeatCondition = (numberOfTries) => {
	if (numberOfTries <= 0) {
		console.log('You lost');
		for (const button of keyboardDisplay.children) {
			button.setAttribute('disabled', '');
		}
	}
};

const updateHangmanImage = (numberOfTries) => {
	const hangNumber = Math.floor((TRIES_LEFT - numberOfTries) / 2);
	// -0 to -6
	hangmanDisplay.src = `./images/hangman-${hangNumber}.svg`;
};

const disableKey = (letter) => {
	const keyIndex = ALPHABETS.indexOf(letter);
	keyboardDisplay.children[keyIndex].setAttribute('disabled', '');
};

const updateBlanksOnUserGuess = () => {
	blanksDisplay.innerText = challengeArray
		.map((x) =>
			x === ' '
				? `\xa0`
				: lettersGuessedDisplay.innerText.includes(x)
				? x
				: '_'
		)
		.join(' ');
};

const checkVictoryCondition = () => {
	if (!blanksDisplay.innerText.includes('_')) {
		console.log('You won!');
	}
};

const handleUserGuess = (key) => {
	if (!CHALLENGE_STRING.includes(key)) {
		triesLeftDisplay.innerText--;
		checkDefeatCondition(triesLeftDisplay.innerText);
		updateHangmanImage(triesLeftDisplay.innerText);
	}
	lettersGuessedDisplay.innerText += key;
	disableKey(key);
	updateBlanksOnUserGuess();
	checkVictoryCondition();
};
