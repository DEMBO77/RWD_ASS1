$(window).click(function(event){
    var x = event.pageX;
    var y = event.pageY;
    console.log(x+" "+y);
    $("#fish1Id").animate({top: y, left: x});
});