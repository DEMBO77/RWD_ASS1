var speed = ["slow", "fast"];
var easing = ["linear", "swing"];
var toRight = [true, true];
var ww = $(window).width();
var wh = $(window).height();
$(document).ready(function () {
    $("#fish1Id").animate({top: "+=1"}, "slow", "linear", function () {
        myRandMove($("#fish1Id"), 0, 700);
    });

    $("#fish2Id").animate({top: "+=1"}, "slow", "linear", function () {
        myRandMove($("#fish2Id"), 1, 700);
    });


    bubbleMove($("#bubble1Id"));
    bubbleMove($("#bubble2Id"));
    bubbleMove($("#bubble3Id"));

    loadImage("images/spongebob.png", 100, 100,  "spongebob", $("body"));
    $("#spongebob").offset({top: wh - $(this).height()});


});


$(window).dblclick(function(event){
    var x = event.pageX;
    var y = event.pageY;
    console.log(x+" "+y);

    var imgOrangeFish = $('#fish1Id');
    var pos = imgOrangeFish.position();
    var width = imgOrangeFish.width();
    var height = imgOrangeFish.height();
    if ((pos.left<x) && (x<(pos.left+width))){
        if (((pos.top+height)>y) && (y>pos.top)){

            imgOrangeFish.width(350);
            imgOrangeFish.height(350);
            setTimeout(function(){
                imgOrangeFish.width(250);
                imgOrangeFish.height(250);
                },1000);
        }
    }
});

function loadImage(path,w, h, id, target) {
    $('<img src="'+ path +'" id="'+ id +'">').on('load', function() {
        $(this).width(w).height(h);
        console.log(target);
        target.insertBefore($(this), target.childNodes[0] );
    });
}


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
        myRandMove($("#fish1Id"), 0, 700);
    });
});



$("#fish2Id").hover(function () {
    $("#fish2Id").stop(true);
    $("#fish2Id").animate({top: "+=1"}, "fast", "linear", function () {
        myRandMove($("#fish2Id"), 1, 700);
    });
}, function () {
    $("#fish2Id").animate({top: "+=1"}, "slow", "linear", function () {
        myRandMove($("#fish2Id"), 1, 700);
    });
});


function myRandMove(elt, id, delay) {

    x = Math.floor(Math.random()* (ww-elt.width()));
    y = Math.floor(Math.random()* (wh-elt.height()));
    var strX = (x <= elt.offset().left)? "-=":"+=", strY = (x <= elt.offset().left)? "-=":"+=";

    if(x <= elt.offset().left && toRight[id] === true    ){
        elt.css({'transform': 'scale(-1, 1)'});
        toRight[id] = false;
    }
    if(x >= elt.offset().left && !toRight[id]){
        elt.css({'transform': 'scale(1, 1)'});
        toRight[id] = true;
    }
    elt.animate({top: y, left: x}, 5000, easing[getRandom(1)], function () {
        myRandMove(elt, id, delay);
    });
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

$("#bubble1Id, #bubble2Id, #bubble3Id").click(function () {
   bubbleClicked($(this));
});

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

/*The given value is included in the random*/
function getRandom(value){
    return Math.floor(Math.random()*(value+1));
}




