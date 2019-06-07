$(function(){
    animateScrolling();
    animateGreeting(['Name', 'Occupation']);

    $(".mobile-togglers").on("click", function(){
        $("#MobileButton").toggle();
        $("#MobileClose").toggle();
        if($("#MobileMenu").css("display") == "none")
            $("#MobileMenu").css("display", "flex");
        else
            $("#MobileMenu").hide();
    });
});

function animateScrolling(){
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        if($("#MobileMenu").css("display") !== "none") {
            $("#MobileMenu").hide();
            $("#MobileButton").toggle();
            $("#MobileClose").toggle();
        }

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 750);
    });
}



function animateGreeting(identifiers){
    for(var i = 0; i < identifiers.length; i++) {

        var id = identifiers[i];
        $('#' + id).css("opacity", "1");
        var $greeting = $('#' + id);
        var $letterList = $('#' + id).html().split("");
        $('#' + id).html("");
        var tagGoing = "";

        //Loop through each letter and animate:
        $.each($letterList, function (idx, elem) {
            if (elem == "<") {
                tagGoing += elem;
            } else if (elem == ">") {
                tagGoing += elem;
                var $foundTag = $(tagGoing).appendTo($greeting);
                $foundTag.css({
                    opacity: 0
                });
                $foundTag.delay(idx * 70);
                $foundTag.animate({
                    opacity: 1
                }, 700);

                tagGoing = "";
            } else {
                if (tagGoing != "") {
                    tagGoing += elem;
                } else {
                    var newEL = $("<span/>").text(elem).css({
                        opacity: 0
                    });
                    newEL.appendTo($greeting);
                    newEL.delay(idx * 70);
                    newEL.animate({
                        opacity: 1
                    }, 700);
                }
            }
        });
    }
}
