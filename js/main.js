const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

letters.forEach(function (letter, idx) {
  const keyboard = document.querySelector(".keyboard");
  letter = document.createElement("button");
  letter.textContent = letters[idx];
  keyboard.appendChild(letter);
  console.log(letter);
});
