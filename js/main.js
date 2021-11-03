// array of letters (A-Z) - keyboard
const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
// array of words
const words = ["cat", "dog", "animal", "car", "apple"];

// store randomly selected secret word
let word = "";
// store guessed letters
let guessed = [];
// maximum number of allowed guesses (secret word length)
let maxGuess = 0;

// generates keyboard layout

const message = document.getElementById("display-result");
const hint = document.getElementById("display-hint"); // display hint for player
const hintBtn = document.getElementById("hint"); //
hintBtn.addEventListener("click", displayHint); // shows hint to player when clicked
const keyboard = document.querySelector(".keyboard");
const guessedChar = document.getElementById("guessed"); // to display correct guesses

function generateKeyboard() {
  // creates button for each letters (keyboard)
  letters.forEach(function (letter, idx) {
    const keyboard = document.querySelector(".keyboard");
    letter = document.createElement("button");
    letter.textContent = letters[idx];
    keyboard.appendChild(letter);

    // add EventListener on every letter (keyboard elements)
    letter.addEventListener("click", function (move) {
      maxGuess--;
      message.textContent = `${maxGuess} guesses left`;
      // check if the secret word contains the target (guessed) letter
      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter.textContent) {
          // If true replace default _ value of the index to clicked letter
          guessed[i] = letter.textContent;
          letter.classList.add("button-green"); //Add green button class
        } else {
          letter.classList.add("key-disable"); // disable onclick
        }
      }

      guessedChar.textContent = guessed.join("  "); //  converst guessesd array to string and display correct guesses
      checkWin(); // check if the player wins
      console.log(guessed);
      console.log(word);
      console.log(maxGuess);
    });
  });
}

// check if the player guessed all correct
function checkWin() {
  if (word === guessed.join("")) {
    //if true display win message and disable entire keyboard
    message.textContent = "Congrats! You are a life saver";
    keyboard.classList.add("key-disable");
    hintBtn.classList.add("key-disable");
    hint.textContent = "Click Replay";
  }
  if (maxGuess <= 0) {
    // if player is out of guesses show looser message and disable entire keyboard
    message.textContent = "Game Over! ";
    keyboard.classList.add("key-disable");
    hintBtn.classList.add("key-disable");
    hint.textContent = "Click Replay";
  }
}

initialize();
//initialize the game
function initialize() {
  generateWord(); // select random word
  generateKeyboard(); // generate keyboard and handle move function
  for (let i = 0; i < word.length; i++) {
    // Set default value for guesses array to _  _ _ _ X length of secret word
    guessed[i] = "_";
  }
  guessedChar.innerHTML = guessed.join(" "); // Display default guessed Array to player
  wordLeangth = word.length + 1;
}

function generateWord() {
  // choose random world from array
  word = words[Math.floor(Math.random() * words.length)];
  maxGuess = word.length; // set maximum guesses to word length
  console.log(maxGuess);
}

function displayHint() {
  // display hint when hint clicked
  hint.textContent = `Starts with ${word[0]}`;
  guessed[0] = word[0];
}
