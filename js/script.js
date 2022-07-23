const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector('.letter');
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessElement = document.querySelector(".remaining");
const remianingGuessSpan = document.querySelector(".remaining span");
const playAgain = document.querySelector(".play-again");
const message = document.querySelector(".message");

let word = "purple";
let guessedLetters = [];
let remianingGuesses = 8;

const getWord = async function(){
  const res = await fetch('https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt');
  const words = await res.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholderText(word);
}
//start the game;
getWord();

//Display word with placeholders for current word
const placeholderText = function(word){
  placeholder = ""
  for(var letter in word){
    placeholder += '●';
  }
  console.log(placeholder);
  wordInProgress.innerText = placeholder;
};

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

playAgain.addEventListener('click',function(e){
  message.classList.remove("win");
  remianingGuesses = 8;
  guessedLetters = [];
  remianingGuessSpan.innerText = `${remianingGuesses} guesses`;
guessedLettersElement.innerHTML = "";
message.innerText = "";
  getWord();

  guessButton.classList.remove('hide');
  remainingGuessElement.classList.remove('hide');
  guessedLettersElement.classList.remove('hide');
  playAgain.classList.add('hide');
});

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
    updateLetters();
    console.log(guessedLetters);
    updateWordProgress(guessedLetters);
    countRemainingGuesses(letter);
  }
}

const updateLetters = function () {
  guessedLettersElement.innerHTML = '';
  for (const letter of guessedLetters){
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
}

const updateWordProgress = function (guessedLetters){
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const newPlaceholder = [];
  for(const letter of wordArray){
    if(guessedLetters.includes(letter)){
      newPlaceholder.push(letter.toUpperCase());
    } else {
      newPlaceholder.push("●");
    }
  }
  //console.log(newPlaceholder);
  wordInProgress.innerText = newPlaceholder.join("");
  checkIfWon();
}

const countRemainingGuesses = function (guess){
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");

    if(wordArray.includes(guess)){
      message.innerText = `${guess} is in the word!`
        //console.log("Hi");
    } else {
      remianingGuesses -= 1;
        //console.log("Hello");
    }
    if (remianingGuesses === 0){
      message.innerText = "You have no more guesses!"
      remainingGuessElement.innerText = `No more guesses :'(, the word was ${word}`;
      startOver();
    } else if (remianingGuesses === 1){
      remainingGuessElement.innerText = "This is your last guess!"
    } else {
      remianingGuessSpan.innerText = `${remianingGuesses} guesses`;
    }

}

const checkIfWon = function(){
  if (word.toUpperCase() === wordInProgress.innerText){
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
startOver();
  }

}

const startOver = function () {
  guessButton.classList.add('hide');
  remainingGuessElement.classList.add('hide');
  guessedLettersElement.classList.add('hide');
  playAgain.classList.remove('hide');
}
