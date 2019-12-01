var speed = ["slow", "fast"];
var easing = ["linear", "swing"];
var toRight = [true, true, true];
var ww = $(window).width();
var wh = $(window).height();

$(document).ready(function () {
    $(".bubbleClass").each(function () {
        $(this).css({'z-index' : '1'});
    });

    $(".bubbleSmallClass").each(function(){
        $(this).width($(this).width() * 0.2);
        $(this).height($(this).height() * 0.2);
        $(this).css({'z-index' : '-1'});
    });

    $("#jellyfish").width(100).height(114);

    $("#fish1Id").animate({top: "+=1"}, "slow", "linear", function () {
        myRandMove($("#fish1Id"), 0, 5000);
    });

    $("#fish2Id").animate({top: "+=1"}, "slow", "linear", function () {
        myRandMove($("#fish2Id"), 1, 5000);
    });

    $(".bubbleClass").animate({top: - $(this).height()}, 2000, "swing",function(){
        bubbleMove($(this));
    });
    $(".bubbleClass").click(function () {
        bubbleClicked($(this));
    });

    var b = wh - $("#spongebob").height();
    $("#spongebob").offset({top: b});
    $("#spongebob").animate({left: ww + $("#spongebob").width()}, 10000, easing[getRandom(1)], function () {
        moveSpongeBob($(this));
    });

    $("#hippocampe").animate({left : "+=20"}, "slow", "linear", function () {
       myRandMove($(this), 3, 9000);
    });


    $("#jellyfish").animate({left : "+=20"}, "slow", "linear", function () {
        myRandMove($(this), null, 7000);
    });

    $("#nemo").animate({left : "+=20"}, "slow", "linear", function () {
        myRandMove($(this), 3, 8000);
        $("#shark").hide();
    });
});


$("#fish1Id").dblclick(function(event){
    var w = $(this).width(), h = $(this).height();
    $(this).width(350).height(350);
    var imageOrangeFish = $(this);
    setTimeout(function(){
        console.log(w);
        imageOrangeFish.width(w);
        imageOrangeFish.height(h);
    },1000);
});

$(window).click(function (event) {
    var coord = getPosition(event.pageX, event.pageY, $("#fish1Id"));
    var x = coord[0], y = coord[1];
    $("#fish1Id").stop(true);
    if(toRight[0] && x < $("#fish1Id").offset().left){
        $('#fish1Id').css({'transform': 'scale(-1, 1)'});
        toRight[0] = false;
    }else if(!toRight[0] && x > $("#fish1Id").offset().left){
        $('#fish1Id').css({'transform': 'scale(1, 1)'});
        toRight[0] = true;
    }
    $("#fish1Id").animate({top: y, left: x}, 1000, easing[getRandom(1)], function () {
        myRandMove($("#fish1Id"), 0, 5000);
    });
});

$("#fish2Id").hover(function () {
    $("#fish2Id").stop(true);
    $("#fish2Id").animate({top: "+=1"}, "fast", "linear", function () {
        myRandMove($("#fish2Id"), 1, 2500);
    });
}, function () {
    $("#fish2Id").animate({top: "+=1"}, "fast", "linear", function () {
        myRandMove($("#fish2Id"), 1, 5000);
    });
});

$("#jellyfish").click(function () {
    $(this).stop(true);
    $(this).animate({top: wh/2 - $(this).height()/2, left: ww/2 - $(this).width()/2+wh/2}, 1000, "linear", function () {
        moveJellyInCircle($(this), 0, wh/2 - $(this).height()/2);
    });

    function moveJellyInCircle(j, t, r) {
        t += 0.05;
        var xcenter = ww/2 - j.width()/2;
        var ycenter = wh/2 - j.height()/2;
        var newLeft = Math.floor(xcenter + (r * Math.cos(t)));
        var newTop = Math.floor(ycenter + (r * Math.sin(t)));
        if(t < Math.PI * 2){
            j.animate({top: newTop, left: newLeft}, 15, function() {
                moveJellyInCircle(j, t, r);
            });
        }else{
            myRandMove(j, null, 7000);
        }
    }
});

$("#nemo").dblclick(function(event){
    var w = $(this).width(), h = $(this).height();
    $("#shark").show()
    $("#nemo").hide();
    setTimeout(function(){
        console.log(w);
        $("#shark").hide();
        $("#nemo").show();
    },1000);
});

function myRandMove(elt, id, timeA) {

    x = Math.floor(Math.random()* (ww-elt.width()));
    y = Math.floor(Math.random()* (wh-elt.height()));
    var strX = (x <= elt.offset().left)? "-=":"+=", strY = (x <= elt.offset().left)? "-=":"+=";

    if(id!=null){
        if(x <= elt.offset().left && toRight[id] === true    ){
            elt.css({'transform': 'scale(-1, 1)'}); toRight[id] = false;
        }
        if(x >= elt.offset().left && !toRight[id]){
            elt.css({'transform': 'scale(1, 1)'}); toRight[id] = true;
        }
    }
    elt.animate({top: y, left: x}, timeA, easing[getRandom(1)], function () {
        myRandMove(elt, id, timeA);
    });
}

function bubbleClicked(bubble){
    bubble.stop(true).fadeOut();
    bubble.offset({top: wh+bubble.height()}).fadeIn();
    bubbleMove(bubble);
}

function bubbleMove(bubble){
    x = Math.floor(Math.random()*(ww-bubble.width()));
    bubble.offset({top: wh, left: x});

    bubble.animate({left: x, top: -bubble.height()}, 10000+getRandom(5)*1000, easing[getRandom(1)], function () {
       bubbleMove(bubble);
    });
}

function moveSpongeBob(bob){
    if(bob.offset().left === ww + bob.width()){
        bob.animate({left: - bob.width()*2}, 10000, easing[getRandom(1)], function () {;
            setTimeout(function () {
                moveSpongeBob(bob);
            }, 5000);
        });
    }else{
        bob.animate({left: ww + bob.width()}, 10000, easing[getRandom(1)], function () {
            setTimeout(function () {
                moveSpongeBob(bob);
            }, 5000);

        });
    }
}

/*The given value is included in the random*/
function getRandom(value){
    return Math.floor(Math.random()*(value+1));
}

/*Return position only for x and y as pageX and pageY*/
function getPosition(x, y, elt){
    if((x + elt.width()/2) >= ww){
        x = ww - elt.width()/2
    }
    if(y+elt.height()/2 >= $(window).height()){
        y = wh - elt.height()/2
    }

    if(x-elt.width()/2 <= 0){
        x = elt.width()/2
    }

    if(y - elt.height()/2 <= 0){
        y = elt.height()/2
    }
    x -= elt.width()/2;
    y -= elt.height()/2;
    return [x, y];
}









