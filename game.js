var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];

$("body").on("keypress", function(event) {
  if (event.key === "a") {
    nextSequence();
    level++;
    $("h1").text("Level " + level);
    addbuttons();
  }
});


function restart() {
  gamePattern = [];
  userClickedPattern = [];

  level = 0;

  nextSequence();
  level++;
  $("h1").text("Level " + level);
}


function nextSequence() {
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function addbuttons(){
  $(".btn").click(function(event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    $("div #" + userChosenColour).addClass("pressed");
    setTimeout(function() {
      $("#" + userChosenColour).removeClass("pressed");
    }, 100);
    var condition = checkAnswer();
    if (condition) {
      if (userClickedPattern.length == gamePattern.length) {
        userClickedPattern = [];
        setTimeout(function() {
          level++;
          $("h1").text("Level " + level);
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over, Press Any Key to Restart");
      $("body").off("keypress");
      $("body").on("keypress", function(event) {
        restart();
      });
    }
  });
}

function checkAnswer() {
  for (var i = 0; i < level;) {
    var state = userClickedPattern[i] == gamePattern[i];
    if (state) {
      if (i == level - 1) {
        return true;
      }
      if (i < level - 1) {
        if (userClickedPattern.length <= gamePattern.length) {
          if(userClickedPattern[i + 1] != undefined){
            i++;
          }
          else{
            return true;
          }
        }
        else {
          return false;
        }
      }
    } else {
        return false;
    }
  }
}
