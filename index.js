// An useful array, helping us in detecting the collours in the very next code by inserting the name of our coloured lens
var buttonColours = ["green", "red", "yellow", "blue"];
// this array is useful when the computer is trying to generate a random lens click which we will randomly save the very new random lens click in this array
var gamePattern = [];
// this array helps in storing the sequence of clicks that the user has already clicked
var userClickedPattern = [];
var level = 0;
// this variable is great to detect if the user starts the game but in the begenning its value is false
var started = false;

// whenever it detects a click it will trigger this anonymouse call-back function which will store the sequence of user's lens ckicks
$(".lens").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatedClick(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// whenever it detects a keypress it will trigger this anonymouse call-back function which will check for the game if it starts and then it will call the function nextSequence
$(document).keydown(function() {
  if (!started) {
    $("h1").text("Level " + level);
    $('<style>h1:before{content:"Level ' + level + '"}</style>').appendTo('head');
    setTimeout(function() {
      nextSequence();
    }, 1000);
    started = true;
  }
});

// This Event is for Touch Screens
$(document).on("tap" ,function() {
  if (!started) {
    $("h1").text("Level " + level);
    $('<style>h1:before{content:"Level ' + level + '"}</style>').appendTo('head');
    setTimeout(function() {
      nextSequence();
    }, 1000);
    started = true;
  }
});

// this function every single time when it is called will reset the userClickedPattern to an empty array and will generate a random lens click
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  $('<style>h1:before{content:"Level ' + level + '"}</style>').appendTo('head');
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).css("background", "linear-gradient(-10deg, rgba(255, 255, 255, 0.8) 20%, rgba(220, 220, 220, 0.8) 70%)").css('height', '-=10px').css('width', '-=10px');
  setTimeout(function() {
    $("#" + randomChosenColour).css("background", '').css('height', '').css('width', '');
  }, 75);
  playSound(randomChosenColour);
}


function playSound(audioName) {
  var audio = new Audio("sounds/" + audioName + ".mp3");
  audio.play();
}


function animatedClick(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 50);
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      // check that they have finished their sequence
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      console.log("wrong");
      playSound("wrong");
      $("h1").addClass("game-over");
      setTimeout(function () {
        $("h1").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
      $('<style>h1:before{content: "Game Over, Press Any Key to Restart"}</style>').appendTo('head');
      restartGame();
    }
}

function restartGame() {
    level = 0;
    gamePattern = [];
    started = false;
}
