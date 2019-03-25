// TODO
// Convert to uppercase or lowercase
// Add elses and error messages?
// Refactor

const keyboardDiv = document.querySelector("#qwerty");
const phraseDiv = document.querySelector("#phrase");
let missed = 0;
const phrases = [
    "stick to your guns",
    "slippery slopes", 
    "son of a gun", 
    "step on it", 
    "stick a fork in it"
];

// Attach a event listener to the “Start Game” button to hide the start screen overlay.
const startGameButton = document.querySelector(".btn__reset");
startGameButton.addEventListener("click", myFunction = () => {
    document.querySelector("#overlay").style.display = "none";
});

// Create a getRandomPhraseAsArray function. It must take any given array of strings and return an array of characters.
function getRandomPhraseAsArray(arr){ 
    const max = arr.length;  
    const index = Math.floor((Math.random() * max));
    return Array.from(arr[index]);
}
const randomPhrase = getRandomPhraseAsArray(phrases);

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

addPhraseToDisplay(getRandomPhraseAsArray(phrases));

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
        missed += 1;
        const parent = document.querySelector("#scoreboard ol");
        const child = document.querySelector("#scoreboard ol li");
        parent.removeChild(child);
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