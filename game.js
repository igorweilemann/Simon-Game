var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = false;

$(document).keydown(function () {
    if (!started) {

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


// Adds click to .btn and saves the ID name in userClickedPattern array
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        // If the user got the most recent answer right , check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {
        $("h1").text("Game Over, press any key to restart.")
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 100);
        startOver();
    }

}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];

}

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    //Getting a random number 0 to 4, assigning to the position on array then pushing this string to the array
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Animation and Sound
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}