var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;
var userClickedPattern = [];
var gamePattern = [];

$(document).keydown(function () {
  if (!started) {
    $("h1").html("Level 0");
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  level++;
  $("h1").html(`LEVEL ${level}`);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

$(".btn").click(function (event) {
  var userChosenColour = event.target.id;
  // var userChosenColour = $(this).attr("id");
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if( userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
    
  } else {
    var wrong = new Audio("./sounds/wrong.mp3");
    wrong.play();
    $("h1").html("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
  
  
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
  userClickedPattern = [];
}
