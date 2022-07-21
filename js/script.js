const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector('.letter');
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessElement = document.querySelector(".remaining");
const remianingGuessSpan = document.querySelector(".remaining span");
const playAgain = document.querySelector(".play-again");
const message = document.querySelector(".message");

const word = "purple";
const guessedLetters = [];

//Display word with placeholders for current word
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
  //clear message text
  message.innerText = "";
  //grabbing what is entered in input
  const guess = letterInput.value;
  //checking to see if guess is a single letter
  const validGuess = checkInput(guess);

  if (validGuess){
    makeGuess(guess);
  }
  letterInput.value ="";
});

console.log(`${guessButton}, ${guessButton}`);


const checkInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.legnth === 0){
    message.innerText = "The input is empty";
  } else if (input.length > 1) {
    message.innerText = "Please only put one letter at a time";
  } else if (!input.match(acceptedLetter)) {
      message.innerText = "did you type a special charater or something?";
    } else {
      return input;
    }
  }

const makeGuess = function(letter){
  letter = letter.toUpperCase();
  if (guessedLetters.includes(letter)){
    message.innerText = "You have already guessed this letter. Please try a new letter"
  } else {
    guessedLetters.push(letter);
    console.log(guessedLetters);
  }
}
