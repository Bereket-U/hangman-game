/*----- constants -----*/

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

/*----- app's state (variables) -----*/

let word = ""; // store randomly selected secret word
let guessed = []; // store guessed letters
let maxGuess = 0; // maximum number of allowed guesses (secret word length)

/*----- cached element references -----*/

const message = document.getElementById("display-result");
const hint = document.getElementById("display-hint"); // display hint for player
const hintBtn = document.getElementById("hint");
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
      // check if the secret word contains the guessed letter
      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter.textContent) {
          guessed[i] = letter.textContent;
          letter.classList.add("button-green"); //Add green button class
        } else {
          letter.classList.add("key-disable"); // disable onclick
        }
      }

      guessedChar.textContent = guessed.join("  "); //  converst guessesd array to string and display correct guesses
      console.log(guessed);
      console.log(word);
      console.log(maxGuess);
    });
  });
}

initialize();

function initialize() {
  generateWord();
  generateKeyboard();
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
