/*----- constants -----*/

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

const allWords = [
  (continents = {
    category: "Continent",
    words: ["asia", "Africa", "europe", "Antarctica", "Australia"],
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

/*----- app's state (variables) -----*/

let word = "";
let wordCategory;
let guessed;
let maxGuess = 0;
let difficulty = 1;
let difficultyLevels = ["Easy", "Normal", "Hard"];

/*----- cached element references -----*/

const message = document.getElementById("display-result");
const categoryHint = document.getElementById("display-category"); // display hint for player
const hintBtn = document.getElementById("hint");

const keyboard = document.querySelector(".keyboard");
const guessedChar = document.getElementById("guessed"); // to display correct guesses
const resetBtn = document.getElementById("reset");
const hangman = document.getElementById("hangman-img");
const hangmanPic = document.createElement("img");
hangmanPic.setAttribute("src", "img/1.png");
hangman.appendChild(hangmanPic);

/*----- event listeners -----*/

hintBtn.addEventListener("click", displayHint); // shows hint to player
resetBtn.addEventListener("click", initialize); // resets the game

const difficultyOption = document.querySelector(".difficulty");

initialize();
generateKeyboard();
difficultyLevel();

/*----- functions -----*/

function initialize() {
  generateWord();
  guessed = [];
  // Set default value for guesses array to _ X length of secret word
  for (let i = 0; i < word.length; i++) {
    guessed[i] = "_";
  }
  hangmanPic.setAttribute("src", "img/6.png");
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
      message.textContent = `${maxGuess} guesses left`;
      //  check is the secret work contains this letter
      if (word.includes(letter.textContent.toLowerCase())) {
        letter.classList.add("button-green"); //Add green button class
        message.textContent = `${maxGuess} guesses left`;
      } else {
        letter.classList.add("key-disable");
        maxGuess--;
        message.textContent = `${maxGuess} guesses left`;
      }

      renderHangman();

      // loop over the word and replace the correct guesses
      for (let i = 0; i < word.length; i++) {
        if (word[i].toLowerCase() === letter.textContent.toLowerCase()) {
          // If true replace default _ value of the index to clicked letter
          guessed[i] = letter.textContent;
        }
      }

      guessedChar.textContent = guessed.join("  "); //  converst guessesd array to string and display correct guesses
      checkWin();
    });
  });

  const showAnswer = document.createElement("button");
  showAnswer.classList.add("button");
  showAnswer.innerHTML = "&#128526;";
  keyboard.appendChild(showAnswer);
  const dontCheat = "&#128540";

  showAnswer.addEventListener("click", function (cool) {
    message.innerHTML = `Try not to cheat next time ${dontCheat}`;
    hangmanPic.setAttribute("src", "img/6.png");
    keyboard.classList.add("key-disable");
    hintBtn.classList.add("key-disable");
    showAnswer.classList.add("key-disable");

    for (let i = 0; i < word.length; i++) {
      // fills the unanswerd charactors
      if (guessed[i] === "_") {
        guessed[i] = word[i];
        guessedChar.textContent = guessed.join("  ");
        guessedChar.style.color = "red";
      }
    }
  });
}

function checkWin() {
  if (word.toLowerCase() === guessed.join("").toLowerCase()) {
    //if true display win message and disable entire keyboard
    message.textContent = "Congrats! You are a life saver";
    keyboard.classList.add("key-disable");
    hintBtn.classList.add("key-disable");
    hangmanPic.setAttribute("src", "img/6.png");
  }
  if (maxGuess <= 0 && word.toLowerCase() !== guessed.join("").toLowerCase()) {
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
  maxGuess = word.length;
}

function displayHint() {
  message.textContent = `${maxGuess} guesses left`;
  if (difficulty === 0) {
    maxGuess--;
    message.textContent = `${maxGuess} guesses left`;
    guessed[0] = word[0];
    guessed[guessed.length - 1] = word[word.length - 1];
    guessedChar.textContent = guessed.join("  ");
    hintBtn.classList.add("key-disable");
  } else if (difficulty === 1) {
    maxGuess--;
    guessed[0] = word[0];
    message.textContent = `${maxGuess} guesses left`;
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
    });
  });
}

function renderHangman() {
  if (Math.round(word.length * 0.8) < maxGuess && maxGuess <= word.length) {
    hangmanPic.setAttribute("src", "img/6.png");
  } else if (
    Math.round(word.length * 0.6) < maxGuess &&
    maxGuess <= Math.round(word.length * 0.8)
  ) {
    hangmanPic.setAttribute("src", "img/1.png");
  } else if (
    Math.round(word.length * 0.4) < maxGuess &&
    maxGuess <= Math.round(word.length * 0.6)
  ) {
    hangmanPic.setAttribute("src", "img/2.png");
  } else if (
    Math.round(word.length * 0.2) < maxGuess &&
    maxGuess <= Math.round(word.length * 0.4)
  ) {
    hangmanPic.setAttribute("src", "img/3.png");
  } else if (
    Math.round(word.length * 0.01) < maxGuess &&
    maxGuess <= Math.round(word.length * 0.2)
  ) {
    hangmanPic.setAttribute("src", "img/4.png");
  } else if (maxGuess === 0) {
    hangmanPic.setAttribute("src", "img/5.png");
  }
}
