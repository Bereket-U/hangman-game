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
// array of objects -> objects contain words with categories
const allWords = [
  (continents = {
    category: "Continent",
    words: ["Asia", "Africa", "Europe", "Antarctica", "Australia"],
  }),
  (car = {
    category: "car brand name",
    words: [
      "bmw",
      "ford",
      "tesla",
      "Lamborghini",
      "volkswagen",
      "Chevrolet",
      "Bugatti",
      "Studebaker",
      "Mercedes",
      "GMC",
      "Hyundai",
      "Kia",
      "Mazda",
      "Fiat",
      "Suzuki",
    ],
  }),
];

// store randomly selected secret word
let word = "";
let wordCategory;
// store guessed letters
let guessed;
// maximum number of allowed guesses (secret word length)
let maxGuess = 0;

let difficulty = 1;
console.log(difficulty);

let difficultyLevels = ["Easy", "Normal", "Hard"];

// generates keyboard layout

const message = document.getElementById("display-result");
const categoryHint = document.getElementById("display-category"); // display hint for player
const hintBtn = document.getElementById("hint");

const keyboard = document.querySelector(".keyboard");
const guessedChar = document.getElementById("guessed"); // to display correct guesses
const resetBtn = document.getElementById("reset");

hintBtn.addEventListener("click", displayHint); // shows hint to player
resetBtn.addEventListener("click", initialize); // resets the game

const difficultyOption = document.querySelector(".difficulty");

initialize();
generateKeyboard();
difficultyLevel();

//initialize the game
function initialize() {
  generateWord(); // select random word
  guessed = [];

  for (let i = 0; i < word.length; i++) {
    // Set default value for guesses array to _  _ _ _ X length of secret word
    guessed[i] = "_";
  }
  guessedChar.innerHTML = guessed.join(" "); // Display default guessed Array to player
  wordLeangth = word.length + 1;
  message.textContent = "Guess To Win";
  categoryHint.textContent = `It's a ${wordCategory}`;
  hintBtn.classList.remove("key-disable");
  keyboard.classList.remove("key-disable");
  keyboard.childNodes.forEach(function (letter) {
    // loop over all keyboad elements
    letter.classList.remove("button-green");
    letter.classList.remove("key-disable");
    guessedChar.style.color = "black";
  });
}

function generateKeyboard() {
  // creates button for each letters (keyboard)
  letters.forEach(function (letter, idx) {
    // const keyboard = document.querySelector(".keyboard");
    letter = document.createElement("button");
    letter.classList.add("button");
    letter.innerHTML = letters[idx];
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
        console.log(guessed);
        console.log(word);
        console.log(maxGuess);
        console.log(word.length);
      }

      guessedChar.textContent = guessed.join("  "); //  converst guessesd array to string and display correct guesses
      checkWin(); // check if the player wins
    });
  });

  const showAnswer = document.createElement("button");
  showAnswer.classList.add("button");
  showAnswer.innerHTML = "&#128526;";
  keyboard.appendChild(showAnswer);
  const dontCheat = "&#128540";

  showAnswer.addEventListener("click", function (cool) {
    message.innerHTML = `Try not to cheat next time ${dontCheat}`;
    keyboard.classList.add("key-disable");
    hintBtn.classList.add("key-disable");
    for (let i = 0; i < word.length; i++) {
      // filles the unanswerd charactors
      if (guessed[i] === "_") {
        guessed[i] = word[i];
        guessedChar.textContent = guessed.join("  ");
        guessedChar.style.color = "red";
      }
    }
  });
}

// check if the player guessed all correct
function checkWin() {
  if (word === guessed.join("")) {
    //if true display win message and disable entire keyboard
    message.textContent = "Congrats! You are a life saver";
    keyboard.classList.add("key-disable");
    hintBtn.classList.add("key-disable");
  }
  if (maxGuess <= 0 && word !== guessed.join("")) {
    // if player is out of guesses show looser message and disable entire keyboard
    message.textContent = "Game Over! It's on you!";
    keyboard.classList.add("key-disable");
    hintBtn.classList.add("key-disable");
    for (let i = 0; i < word.length; i++) {
      // Set default value for guesses array to _  _ _ _ X length of secret word
      if (guessed[i] === "_") {
        guessed[i] = word[i];
        guessedChar.textContent = guessed.join("  ");
        guessedChar.style.color = "red";
      }
    }
  }
}

// generates random word
function generateWord() {
  const categoryIndex = allWords.indexOf(
    allWords[Math.floor(Math.random() * allWords.length)]
  );

  wordCategory = allWords[categoryIndex].category; // value of category inside the object
  const wordsArray = allWords[categoryIndex].words; // words array inside the object
  let leveledWords = []; // leveld words based on thier length
  if (difficulty === 2) {
    wordsArray.forEach(function (wordCheck) {
      if (wordCheck.length >= 7) {
        leveledWords.push(wordCheck);
      }
      return;
    });
  } else if (difficulty === 1) {
    wordsArray.forEach(function (wordCheck) {
      if (wordCheck.length > 4 && wordCheck.length < 7) {
        leveledWords.push(wordCheck);
      }
      return;
    });
  } else if (difficulty === 0) {
    wordsArray.forEach(function (wordCheck) {
      if (wordCheck.length <= 4) {
        leveledWords.push(wordCheck);
      }
      return;
    });
  }
  word = leveledWords[Math.floor(Math.random() * leveledWords.length)];

  maxGuess = word.length; // set maximum guesses to word length
  console.log(maxGuess);
}

function displayHint() {
  // display hint first and last characters based on difficulty level

  message.textContent = `${maxGuess} guesses left`;
  if (difficulty === 0) {
    maxGuess--;
    message.textContent = `${maxGuess} guesses left`;
    guessed[0] = word[0];
    guessed[guessed.length - 1] = word[word.length - 1];
    guessedChar.textContent = guessed.join("  ");
    hintBtn.classList.add("key-disable");
  } else if (difficulty === 1) {
    guessed[0] = word[0];
    guessedChar.textContent = guessed.join("  ");
    hintBtn.classList.add("key-disable");
  } else if (difficulty === 2) {
    message.textContent = "Sorry! No hint this time";
    hintBtn.classList.add("key-disable");
  } else {
  }
}

function difficultyLevel() {
  difficultyLevels.forEach(function (level, idx) {
    level = document.createElement("input");
    level.setAttribute("type", "radio");
    level.setAttribute("name", "level");

    const label = document.createElement("label");
    label.setAttribute("for", "level");
    label.textContent = difficultyLevels[idx];

    difficultyOption.appendChild(level);
    difficultyOption.appendChild(label);

    level.addEventListener("click", function (select) {
      difficulty = idx;
      console.log(difficulty);
    });
  });
}
