//EVENT LISTENERS

$(".img-box").click(function () {
    var userChosenImg = this.id;
    flipImage(userChosenImg);
})

// END OF EVENT LISTENERS

function flipImage(imageID) {

    $(document).ready(function () {
        document.querySelector("#" + imageID).classList.toggle("flip");
        var frontImg = "url(images/" + imageID + ".png)" + " center";
        var backImg = "url(images/question.png) center";
        flipSelect = $("#" + imageID);
        if (flipSelect.css("background-image").includes(imageID)) {
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

function flipAllImages() {

    // show and hide images (2 operations)
    var counter = 0;

    var run = setInterval(function () {

        $(".img-box").each(function () {
            var imageID = this.id;
            document.querySelector("#" + imageID).classList.toggle("flip");

            var frontImg = "url(images/" + imageID + ".png)" + " center";
            var backImg = "url(images/question.png) center";

            flipSelect = $("#" + imageID);


            if (flipSelect.css("background-image").includes(imageID)) {
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


function startGame() {
    flipAllImages();
}
