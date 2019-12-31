// Game values
let min = 1,
    max = 1000,
    guess,
    lastGuess,
    warmth = 0;
    winningNum = getRandomNum(min, max),
    guessesLeft = 12;

    console.log(winningNum);
// UI elements
const game = document.querySelector("#game"),
      minNum = document.querySelector(".min-num"),
      maxNum = document.querySelector(".max-num"),
      guessBtn = document.querySelector("#guess-btn"),
      guessInput = document.querySelector("#guess-input"),
      message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener("mousedown", function(e){
  if(e.target.className === "play-again"){
    window.location.reload();
  }
})

// Listen for guess
guessBtn.addEventListener("click", function(){
  guess = parseInt(guessInput.value);

  // Validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}.`, "red");
  } else {

  // Check if won
  if(guess === winningNum){
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    // Wrong number
    guessesLeft -= 1;

    if(guessesLeft === 0){
      gameOver(false, `Game over. The correct answer was ${winningNum}`);
    } else {
      // Wrong answer - game continues

      //Tell user guess was incorrect
      guessInput.style.borderColor = "red";
      if(lastGuess === undefined)
      setMessage(`${guess} is incorrect, you have ${guessesLeft} guesses left.`, "red");
      else
      setMessage(`${getWarmth()}. you have ${guessesLeft} guesses left.`, "red");

      // Clear input
      lastGuess = guess;
      }
    }
  }
});

// End of game
function gameOver(won, msg){
  let color;
  won === true ? color = "green" : "red";

  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  setMessage(msg, color);

  // Play again?
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

// Determine warmth
function getWarmth(){
  const guessDifference = Math.abs(winningNum-guess);
  const lastGuessDifference = Math.abs(winningNum-lastGuess);
  let word = "",
      warmthWord,
      returnMsg;

  if(guessDifference>lastGuessDifference){
    if(warmth>0)
      warmth = 0;
    warmth -= 1;
  } else {
    if(warmth<0)
      warmth = 0;
    warmth += 1;
  }

  switch(warmth){
    case 1:
      warmthWord = "warmer.";
      break;
    case 2:
      warmthWord = "warmer!";
      break;
    case 3:
      warmthWord = "even warmer!";
      break;
    case 4:
      warmthWord = "warmeerrrrr!!!";
      warmth = 1;
      break;
    case -1:
      warmthWord = "colder.";
      break;
    case -2:
      warmthWord = "colder!";
      break;
    case -3:
      warmthWord = "even colder, what are you doing?!";
      break;
    case -4:
      warmthWord = "SO COLD. GO THE OTHER WAY.";
      warmth = -2;
      break;
  }

  if(guessDifference <= Math.ceil((max-min)*0.005)){
    word = "HOTTER THAN THE SUN!!!!!";
  } else if(guessDifference <= Math.ceil((max-min)*0.02)){
    word = "SHIT HOT!!";
  } else if(guessDifference <= Math.ceil((max-min)*0.05)){
    word = "super warm!";
  } else if(guessDifference <= Math.ceil((max-min)*0.15)){
    word = "pretty warm!";
  } else if(guessDifference <= Math.ceil((max-min)*0.25)){
    word = "warm!";
  } else if(guessDifference >= Math.ceil((max-min)*0.9)){
    word = "getting frostbite.";
  } else if(guessDifference >= Math.ceil((max-min)*0.8)){
    word = "very very cold.";
  } else if(guessDifference >= Math.ceil((max-min)*0.7)){
    word = "quite cold";
  } else if(guessDifference >= Math.ceil((max-min)*0.5)){
    word = "cold";
  } else {
    word = "lukewarm";
  }

  returnMsg = `Getting ${warmthWord} You're ${word}`;

  return returnMsg;
}

// Get Winning Number
function getRandomNum(min, max){
  return Math.floor(Math.random() * (max-min+1)+min);
}

// Set Message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}