// Get the element with the ID of qwerty and save it to a variable.
const keyboardDiv = document.querySelector("#qwerty");

// Get the element with the ID of phrase and save it to a variable.
const phraseDiv = document.querySelector("#phrase");

// Create a missed variable, initialized to 0, that you’ll use later to keep track of the number of guesses the player has missed.
let missed = 0;

// Attach a event listener to the “Start Game” button to hide the start screen overlay.
const startGameButton = document.querySelector(".btn__reset");
startGameButton.addEventListener("click", myFunction = () => {
    document.querySelector("#overlay").style.display = "none";
});

// Create a phrases array that contains at least 5 different phrases as strings.
const phrasesArray = ["Stick to your guns", "Slippery slopes", "Son of a gun", "Step on it", "Stick a fork in it"];

// Create a getRandomPhraseAsArray function. It must take any given array of strings and return an array of characters.
function getRandomPhraseAsArray(arr){ 
    const max = arr.length;  
    const index = Math.floor((Math.random() * max));
    return Array.from(arr[index]);
}
const randomPhrase = getRandomPhraseAsArray(phrasesArray);

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
    
addPhraseToDisplay(getRandomPhraseAsArray(phrasesArray));

// Create a checkLetter function.
const checkLetter = (inputLetter) => {
    const letter = document.querySelectorAll(".letter");
    for (i = 0; i < letter.length; i++) {
        if (letter[i].textContent == inputLetter) {
            letter[i].className += " show";
            // Why am I doing this?
            // const correctLetter = letter[i];
            // return correctLetter;
        }
    }
}

addPhrasetoDisplay(getRandomPhraseAsArray(phrases)); 


console.log("breakpoint");