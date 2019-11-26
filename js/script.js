
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


$(window).click(function(event){
    var x = event.pageX;
    var y = event.pageY;

    var imgOrangeFish = $('#fish1Id');
    var width = imgOrangeFish.width();
    var height = imgOrangeFish.height();

    console.log(x+" "+y);
    imgOrangeFish.animate({top: y-(height/2), left: x-(width/2)});
});




