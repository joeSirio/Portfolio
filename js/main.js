let aboutLocation = 0;
let projectLocation = 0;

$(function(){
    aboutLocation = $("#About").offset().top - 76;
    projectLocation = $("#Projects").offset().top - 76;
    onScroll();
    animateScrolling();
    animateGreeting(['Name', 'Occupation']);

    window.addEventListener("scroll", onScroll)
    $(".skills-btn").hover(function() {
        $('.skills-info').addClass( "hover" );
      }, function() {
        $('.skills-info').removeClass( "hover" );
      });

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
            scrollTop: $($.attr(this, 'href')).offset().top - 75
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

function onProjectLinkClick(url){
    event.stopPropagation()
    console.log(url)
    var win = window.open(url, '_blank');
    win.focus();
}

function onScroll(){
    let pos = window.top.scrollY;
        $(".nav-link").removeClass('active');
    if(pos > projectLocation){
        $(".Projects-link").addClass('active');
    }
    else if(pos > aboutLocation){
        $(".About-link").addClass('active');
    }
    else{
        $(".Home-link").addClass('active');
    }
}
