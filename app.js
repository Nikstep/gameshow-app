// TODO
// Convert to uppercase or lowercase
// Add elses and error messages?
// Refactor

const keyboardDiv = document.querySelector("#qwerty");
const phraseDiv = document.querySelector("#phrase");
const heartImages = document.querySelectorAll(".tries img");
const startButton = document.querySelector(".btn__reset");
const overlayDiv = document.querySelector("#overlay");
let wrongGuesses = 0;
const phrasesArray = [
    "stick to your guns",
    "slippery slopes", 
    "son of a gun", 
    "step on it", 
    "stick a fork in it"
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

// Create a getRandomPhraseAsArray function. It must take any given array of strings and return an array of characters.
function getRandomPhraseAsArray(arr){ 
    const max = arr.length;  
    const index = Math.floor((Math.random() * max));
    return Array.from(arr[index]);
}

// Set the game display.
const addPhraseToDisplay = (arr) => {
    const ul = document.querySelector("#phrase ul");
    for (i = 0; i < arr.length; i++) {
        let li = document.createElement("li")
        li.textContent = arr[i];
        // Give class of "letter" if it contains letter, if not give class of "space".
        if (arr[i].match(/[a-z]/i) ) {
            li.className = "letter";
        } else {
            li.className = "space";
        }
        ul.appendChild(li);
    }
}



// Create a checkLetter function.
const checkLetter = (inputLetter) => {
    const letterFromArray = document.querySelectorAll(".letter");
    let correctLetter = null;
    for (i = 0; i < letterFromArray.length; i++) {
        if (letterFromArray[i].textContent == inputLetter) {
            letterFromArray[i].className += " show";
            correctLetter = letterFromArray[i].textContent;
        }
    }
    return correctLetter;
}

// Add an event listener to the keyboard.
keyboardDiv.addEventListener("click", myFunction = (e) => {
    const buttonPressed = e.target;
    let letterFound = "";
    if (buttonPressed.tagName  === "BUTTON") {
        buttonPressed.className = "chosen";
        buttonPressed.setAttribute("disabled", "true");
        letterFound = checkLetter(buttonPressed.textContent);
    }
    if (letterFound == null) {
       hearts[missed].src = "images/lostHeart.png";
        missed += 1;
    }
    checkWin();
});

// Create a checkWin function.
const checkWin = () => {
    const showedLetters = document.querySelectorAll(".show").length;
    const totalLetters = document.querySelectorAll(".letter").length;
    if (showedLetters === totalLetters) {
        document.querySelector("#overlay").className = "win";
        document.querySelector("#overlay").style.display = "";
        document.querySelector("#overlay .title").textContent = "Congratulations, you won!"
        document.querySelector("#overlay .btn__reset").textContent = "Play again"
    } else if (missed >= 5) {
        document.querySelector("#overlay").className = "lose";
        document.querySelector("#overlay").style.display = "";
        document.querySelector("#overlay .title").textContent = "Sorry, you lost"
        document.querySelector("#overlay .btn__reset").textContent = "Play again"
    }
}

const resetPhrase = () => {
    const parent = document.querySelector("#phrase");
    const child = document.querySelector("#phrase ul")
    parent.removeChild(child);
    const ul = document.createElement("ul");
    parent.appendChild(ul);
}

const resetHearts = () => {
    for (i = 0; i < hearts.length; i++) {
        hearts[i].src = "images/liveHeart.png";
    }
    missed = 0;
}

const resetKeyboard = () => {
    const keyboardButtons = keyboardDiv.querySelectorAll("button");
    for (i = 0; i < keyboardButtons.length; i++) {
        keyboardButtons[i].removeAttribute("class");
        keyboardButtons[i].removeAttribute("disabled");
    }
}