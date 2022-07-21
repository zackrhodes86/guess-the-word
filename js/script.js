const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector('.letter');
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessElement = document.querySelector(".remaining");
const remianingGuessSpan = document.querySelector(".remaining span");
const playAgain = document.querySelector(".play-again");
const message = document.querySelector(".message");

const word = "purple";

const updateText = function(word){
  placeholder = ""
  for(var letter in word){
    placeholder += '●';
  }
  console.log(placeholder);
  wordInProgress.innerText = placeholder;
};

updateText(word);

guessButton.addEventListener('click',function(e){
  e.preventDefault();
  const guess = letterInput.value;
  console.log(guess);
  letterInput.value ="";
});

console.log(`${guessButton}, ${guessButton}`);
