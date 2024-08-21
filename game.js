let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;
let gameOver = false;


$(document).keydown(() => {
    if (started != true){
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(this);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(latestColor){
    if (userClickedPattern[latestColor] === gamePattern[latestColor]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
                userClickedPattern = []
            }, 1000);
        }
    }else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);
        startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = 0;
}

function nextSequence(){
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    level += 1;
    $("#level-title").text("Level " + level);

    let i = 0;
    function nextButton(){
        if (i < gamePattern.length){
            $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(gamePattern[i]);
            i++;
            setTimeout(nextButton, 600);
        }else{
            setTimeout(() => {
                $("#level-title").text("Your turn"); 
            }, 350);
        }

    }
    nextButton();  

}

function playSound(name){
    let audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $(currentColor).addClass("pressed");
    setTimeout(() => {
        $(currentColor).removeClass("pressed");
    }, 100)
}



