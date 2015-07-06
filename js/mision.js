/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function animateRight ($src, $tgt){
    var $parent = $src.parent();
    var width = $parent.width();    
    
    $src.css({position: 'absolute'});
    $tgt.hide().appendTo($parent).css({left: -width, position: 'absolute'});
    $tgt.hide();
    $src.animate({left : width}, 500, function(){
        $src.hide();
        $src.css({left: null, position: null});
    });
    $tgt.show().animate({left:0}, 500, function(){
        $tgt.css({left: null, position: null});
    });
}

function animateLeft($src, $tgt){
    var $parent = $src.parent();
    var width = $parent.width();    
    
    $src.css({position: 'absolute'});
    $tgt.hide().appendTo($parent).css({left: width, position: 'absolute'});
    $tgt.hide();
    $src.animate({left : -width}, 500, function(){
        $src.hide();
        $src.css({left: null, position: null});
    });
    $tgt.show().animate({left: 0}, 500, function(){
        $tgt.css({left: null, position: null});
    });
}

$(document).ready(function () {

    $(function () {
        var $first = $("#bloque-botones");
        var $second = $("#bloque-mision");
        $second.hide();
        
        $("#go-imagen-mision").hover(function(){
            //alert("hola");
            $("#go-imagen-mision").css("margin-top","-15px");
            
        },function(){
            $("#go-imagen-mision").css("margin-top","0px");
        });

        $("#go-mision").click(function () {
            animateLeft($first, $second);
//        var tmp = $first;
//        $first = $second;
//        $second = tmp;
        });

        $("#mision-regresar").click(function () {

            animateRight($second, $first);
//        var tmp = $first;
//        $first = $second;
//        $second = tmp;
        });
    });
});

