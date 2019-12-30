// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

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
  let guess = parseInt(guessInput.value);

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
      gameOver(false, `Game over, You lost. The correct answer was ${winningNum}`);
    } else {
      // Wrong answer - game continues

      //Tell user guess was incorrect
      guessInput.style.borderColor = "red";
      setMessage(`${guessInput.value} is not correct, you have ${guessesLeft} guesses left.`, "red");

      // Clear input
      guessInput.value = "";
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

// Get Winning Number
function getRandomNum(min, max){
  return Math.floor(Math.random() * (max-min+1)+min);
}

// Set Message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}