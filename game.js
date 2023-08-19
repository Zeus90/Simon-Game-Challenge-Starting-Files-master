var colorsArr = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickPatterns = [];

var started = false;
var level = 0;


$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){

    var chosenId = $(this).attr("id");
    userClickPatterns.push(chosenId);

    playSound(chosenId);
    animatePress(chosenId);

    checkAnswer(userClickPatterns.length - 1);
})


function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickPatterns[currentLevel]) {

        if (userClickPatterns.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {

        playSound("wrong");
        $("#level-title").text("Game Over! Press any key to restart");
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        
        startOver();
    }

}

function nextSequence(){

    userClickPatterns = [];
    level++;
    $("h1").text("Level " + level);
    var randNumb = Math.floor(Math.random() * 4) +1;
    var randomChosenColor = colorsArr[randNumb];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;

}

function playSound(name){

    var audioSound = new Audio("sounds/" + name + ".mp3");
    audioSound.play();
}

function animatePress(currentColor){
    
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}