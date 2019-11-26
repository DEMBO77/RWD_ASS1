var speed = ["slow", "fast"];
var easing = ["linear", "swing"];
var toRight = [true, true];
var ww = $(window).width();
var wh = $(window).height();

$(window).click(function(event){
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
    $("#fish1Id").animate({top: y, left: x}, "slow", "linear", function () {
        myRandMove($("#fish1Id"), 0);
    });
});

function getPosition(x, y, elt){
    if((x + elt.width()/2) >= ww){
        x = ww - $("#fish1Id").width()/2
    }
    if(y+elt.height()/2 >= $(window).height()){
        y = wh - $("#fish1Id").height()/2
    }

    if(x-elt.width()/2 <= 0){
        x = $("#fish1Id").width()/2
    }

    if(y - elt.height()/2 <= 0){
        y = $("#fish1Id").height()/2
    }
    x -= elt.width()/2;
    y -= elt.height()/2;
    return [x, y];
}

function getRandom(value){
    return Math.floor(Math.random()*(value+1));
}

myRandMove($("#fish1Id"), 0, 700);
myRandMove($("#fish2Id"), 1, 550);

function myRandMove(elt, id, delay = 700){
    var moveX = [10, 35, 50, 75, 100, 150, 300, 400][getRandom(7)] , moveY = [10, 20, 30, 100, 200][getRandom(4)];
    var direction = [-1, 0, 1];
    var dirX = direction[getRandom(2)], dirY = direction[getRandom(2)];

    var strX = (dirX<0)?"-=":"+=", strY = (dirY<0)?"-=":"+=";
    if(dirX === -1){
        elt.css({'transform': 'scale(-1, 1)'});
        toRight[id] = false;
    }else if(dirX === 1){
        elt.css({'transform': 'scale(1, 1)'});
        toRight[id] = true;
    }

    var xCoord = elt.offset().left, yCoord = elt.offset().top, x, y;
    if(dirX !== 0){
        if(dirX === 1){
            x = (xCoord+elt.width()+moveX >= ww)?(ww - elt.width()-xCoord).toString():moveX.toString();
        }else{
            x = (xCoord-moveX <= 0)?xCoord:moveX.toString();
        }
    }else{
        x = "0";
    }

    if(dirY !== 0){
        if(dirY === 1){
            y = (yCoord+elt.height()+moveY >= wh)?(wh-elt.height()-yCoord).toString():moveY.toString();
        }else{
            y = (yCoord-moveY <= 0)?yCoord:moveY.toString();
        }
    }else{
        y = "0";
    }
    elt.animate({top: strY+y, left: strX+x}, "slow", easing[getRandom(1)], setTimeout(function () {myRandMove(elt);}, delay));


}