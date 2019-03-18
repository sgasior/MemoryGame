var gamePattern = ["img-0", "img-1", "img-2", "img-3", "img-4", "img-5", "img-6", "img-7", "img-8", "img-9", "img-0", "img-1", "img-2", "img-3", "img-4", "img-5", "img-6", "img-7", "img-8", "img-9"];
var playerFirstChoice = ["",""]; // element [0] is gamePattern and element [1] is imageID
var playerSecondChoice = ["",""]; // element [0] is gamePattern and element [1] is imageID
var winRoundCounter=0;
var started = false;
var score= 0;
//EVENT LISTENERS

/**
 * Listening if user clicked any of the img
 * Invoke flipping image
 */
$(".img-box").click(function () {
    var userChosenImg = this.id;
    flipImage(userChosenImg);
    checkRound(userChosenImg);
})


/**
 * Listening if user clicked any key
 * Starting game
 */
$(document).keydown(function () {
    if (!started) {
        started = true;
        startGame();
    }
});

// END OF EVENT LISTENERS

function checkRound(imageID) {


    if (playerFirstChoice[0].length==0){
        playerFirstChoice[0]= gamePattern[getNumberFromId(imageID)];
        playerFirstChoice[1] = imageID;
        $("#"+imageID).disableClick(true);
    }
    else {
        playerSecondChoice[0]= gamePattern[getNumberFromId(imageID)];
        playerSecondChoice[1] = imageID;

        // disable clicking more images (only two images in 1 round)
        $(".img-box").disableClick(true); // enable clicking images

        if (playerFirstChoice[0]===playerSecondChoice[0]){
            console.log("win");
            winRoundCounter+=1;
            score +=3;

        }
        else{
            console.log("lose");
            score -=1;
            setTimeout(function () {
                flipImage(playerSecondChoice[1]);
            }, 1200);

            setTimeout(function () {
                flipImage(playerFirstChoice[1]);
            }, 600);
        }
        if (winRoundCounter===10){
            $(".img-box").disableClick(true);
            $("h2").text("Contragulations! You scored "+score+" points.");
        }
        else{
            updateScoreHeader();
        }

        resetRound();
    }

}

function resetRound(){
    setTimeout(function () {
        playerFirstChoice = ["",""];
        playerSecondChoice = ["",""];
        $(".img-box").disableClick(false);
    }, 1500);

}

/**
 * Return number from imageID
 * example if imageID is img-7 then the return is 7
 */
function getNumberFromId(imageID){
    if (imageID.length === 5) {
        return  imageID.substr(imageID.length - 1, imageID.length);
    } else {
        return imageID.substr(imageID.length - 2, imageID.length);
    }
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


/**
 * Temporary disable onclick and jQuery click events
 * example $(".img-box").disableClick(true)
 */
$.fn.disableClick = function (disable){
    this.each(function() {
        if(disable){
            if(this.onclick)
                $(this).data('onclick', this.onclick).removeAttr('onclick');
            if($._data(this, 'events') && $._data(this, 'events').click)
                $(this).data('click', $.extend(true, {}, $._data(this, 'events').click)).off('click');
        }
        else{
            if($(this).data('onclick'))
                this.onclick = $(this).data('onclick');
            if($(this).data('click'))
                for(var i in $(this).data('click'))
                    $(this).on('click', $(this).data('click')[i].handler);
        }
    });
    return this;
};


/**
 * Flip images by their id (in turn: front and back side).
 */
function flipImage(imageID) {
    var numberOfId =getNumberFromId(imageID);
    $(document).ready(function () {
        document.querySelector("#" + imageID).classList.toggle("flip");
        var frontImg = "url(images/" + gamePattern[numberOfId] + ".png)" + " center";
        var backImg = "url(images/question.png) center";


        flipSelect = $("#" + imageID);

        if (flipSelect.css("background-image").includes(gamePattern[numberOfId])) {
            setTimeout(function () {
                flipSelect.css("background", backImg);
            }, 300)
        } else {
            setTimeout(function () {
                flipSelect.css("background", frontImg);
            }, 300)
        }
    });
}


/**
 * Flipping all images in one time
 */
function flipAllImages() {

    // show and hide images (2 operations)
    var counter = 0;

    var run = setInterval(function () {

        $(".img-box").each(function () {
            var imageID = this.id;

            if (imageID.length === 5) {
                var numberOfId = imageID.substr(imageID.length - 1, imageID.length);
            } else {
                var numberOfId = imageID.substr(imageID.length - 2, imageID.length);
            }

            document.querySelector("#" + imageID).classList.toggle("flip");
            var frontImg = "url(images/" + gamePattern[numberOfId] + ".png)" + " center";
            var backImg = "url(images/question.png) center";
            flipSelect = $("#" + imageID);

            if (flipSelect.css("background-image").includes(gamePattern[numberOfId])) {
                flipSelect.css("background", backImg);
            } else {
                flipSelect.css("background", frontImg);
            }
        })
        counter = counter + 1;
        if (counter === 2) {
            clearInterval(run);
        }
    }, 1500);

}


/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}



/**
 * Method called when site is opened first time
 */
function openingPage(){

    //disable clicking images
    // commented OUT only FOR DEV purpose
    //$(".img-box").disableClick(true);
}


// startGame() is invoked by clicking a key
function startGame() {
    shuffleArray(gamePattern);
    flipAllImages();
    $(".img-box").disableClick(false); // enable clicking images

    setTimeout(function () {
    updateScoreHeader();
    },3500);
}


function updateScoreHeader(){
        $("h2").text("Total score: "+score);
}


openingPage();

