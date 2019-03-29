const keyboardDiv = document.querySelector("#qwerty");
const phraseDiv = document.querySelector("#phrase");
const heartImages = document.querySelectorAll(".tries img");
const startButton = document.querySelector(".btn__reset");
const overlayDiv = document.querySelector("#overlay");
let quoteText = "";
let wrongGuesses = 0;
const phrasesArray = [
  "piece of cake",
  "be awesome",
  "close but no cigar",
  "cool as a cucumber",
  "saved by the bell"
];

// Attach event listener to start game button.
startButton.addEventListener("click", () => {
  overlayDiv.style.display = "none";
  if (startButton.className.includes("play_again")) {
    resetGame();
    newPhrase();
  } else {
    newPhrase();
  }
});

// Last used quote
let lastQuote;

//Generate random quote from array, but not same as last one.
const getRandomPhrase = arr => {
  let currentQuote = Math.floor(Math.random() * arr.length);
  if (currentQuote === lastQuote) {
    return getRandomPhrase();
  }
  return currentQuote;
};

// Take array of phrases, select one randomly and return phrase as array of characters.
const getRandomPhraseAsArray = arr => {
  const index = getRandomPhrase(arr);
  lastQuote = index;
  quoteText = arr[index];
  return Array.from(arr[index]);
};

// Take array of characters, creates new "li" element for each character.
const addPhraseToDisplay = arr => {
  const ul = phraseDiv.querySelector("ul");
  for (value of arr) {
    const li = document.createElement("li");
    li.textContent = value;
    if (value.match(/[a-z]/i)) {
      li.className = "letter";
    } else {
      li.className = "space";
    }
    ul.appendChild(li);
  }
};

// Check if given letter matches letters in phrase.
const checkLetter = letter => {
  const lettersFromArray = document.querySelectorAll(".letter");
  let correctLetter = null;
  for (value of lettersFromArray) {
    if (value.textContent === letter) {
      value.className += " show";
      correctLetter = letter;
    }
  }
  return correctLetter;
};

/* Listen for clicks inside "keyboardDiv", if element is a "button" disable it and set a class of "chosen", 
   check if buttons value is a letter in phrase, if not set one heart images src to "lostHeart". */
keyboardDiv.addEventListener("click", e => {
  const buttonPressed = e.target;
  let letterFound = "";
  if (buttonPressed.tagName === "BUTTON") {
    buttonPressed.className = "chosen";
    buttonPressed.setAttribute("disabled", "true");
    // Returns null if letter doesn't match
    letterFound = checkLetter(buttonPressed.textContent);
  }
  if (letterFound === null) {
    // Use "wrongGuesses" variable for accessing correct "heartImage"
    heartImages[wrongGuesses].src = "images/lostHeart.png";
    wrongGuesses += 1;
  }
  checkWin();
});

/* Check if the number of letters with class “show” is equal to the number of letters with class “letters”. 
If they’re equal, show the overlay screen with the “win” class and appropriate text. Otherwise, if the 
number of misses is equal to or greater than 5, show the overlay screen with the “lose” class and appropriate text. */
const checkWin = () => {
  const visibleLetters = document.querySelectorAll(".show").length;
  const totalLetters = document.querySelectorAll(".letter").length;
  if (visibleLetters === totalLetters) {
    overlayDiv.className = "win";
    overlayDiv.style.display = "";
    overlayDiv.querySelector(".title").textContent =
      "Congratulations, you won!";
    overlayDiv.querySelector(".btn__reset").textContent = "Play again";
    overlayDiv.querySelector(".btn__reset").className = "btn__reset play_again";
    overlayDiv.querySelector(".correct__phrase").textContent = quoteText;
  } else if (wrongGuesses >= 5) {
    overlayDiv.className = "lose";
    overlayDiv.style.display = "";
    overlayDiv.querySelector(".title").textContent = "Sorry, you lost";
    overlayDiv.querySelector(".btn__reset").textContent = "Play again";
    overlayDiv.querySelector(".btn__reset").className = "btn__reset play_again";
    overlayDiv.querySelector(".display__phrase").innerHTML =
      "<span class='quote__was'>the quote was:</span> " +
      "<span class='correct__phrase'>" +
      quoteText +
      "</span>";
  }
};

// Reset functions
const resetPhrase = () => {
  phraseDiv.removeChild(phraseDiv.querySelector("ul"));
  const ul = document.createElement("ul");
  phraseDiv.appendChild(ul);
};
const resetHearts = () => {
  for (value of heartImages) {
    value.src = "images/liveHeart.png";
  }
  wrongGuesses = 0;
};
const resetKeyboard = () => {
  const keyboardButtons = keyboardDiv.querySelectorAll("button");
  for (value of keyboardButtons) {
    value.removeAttribute("class");
    value.removeAttribute("disabled");
  }
};

// Group functions
const resetGame = () => {
  resetPhrase();
  resetHearts();
  resetKeyboard();
};
const newPhrase = () => {
  getRandomPhraseAsArray(phrasesArray);
  addPhraseToDisplay(getRandomPhraseAsArray(phrasesArray));
};
