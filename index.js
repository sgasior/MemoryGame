var gamePattern = ["img-0", "img-1", "img-2", "img-3", "img-4", "img-5", "img-6", "img-7", "img-8", "img-9", "img-0", "img-1", "img-2", "img-3", "img-4", "img-5", "img-6", "img-7", "img-8", "img-9"];
var playerFirstChoice = "";
var playerSecondChoice = "";

//EVENT LISTENERS

/**
 * Listening if user clicked any of the img
 * Invoke flipping image
 */
$(".img-box").click(function () {
    var userChosenImg = this.id;
    flipImage(userChosenImg);
    //    TODO
    //    checkRound();
})

// END OF EVENT LISTENERS




/**
 * Flip images by their id (in turn front and back side).
 */
function flipImage(imageID) {
    if (imageID.length == 5) {
        var numberOfId = imageID.substr(imageID.length - 1, imageID.length);
    } else {
        var numberOfId = imageID.substr(imageID.length - 2, imageID.length);
    }
    $(document).ready(function () {
        document.querySelector("#" + imageID).classList.toggle("flip");
        var frontImg = "url(images/" + gamePattern[numberOfId] + ".png)" + " center";
        var backImg = "url(images/question.png) center";


        console.log("dla imageId= " + imageID + " frontImg= " + frontImg + " backImg= " + backImg);
        console.log("number of id= " + numberOfId + " gamePatern(...)" + gamePattern[numberOfId]);
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

            if (imageID.length == 5) {
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
        if (counter == 2) {
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


function startGame() {
    shuffleArray(gamePattern);
    flipAllImages();
}

startGame();
