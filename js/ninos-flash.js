/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

    

$(document).on('pagebeforeshow', '#popupswf', function () {

    $("#imagen-flash").hover(function () {
        //alert("hola");
        $("#imagen-flash").css("margin-top", "-15px");

    }, function () {
        $("#imagen-flash").css("margin-top", "0px");
    });


    $(document).on("popupafterclose", "#alertsPopup1", function (event, ui) {
        console.log("entro");
        elemento = $("#ninos-flash-exe");
        console.log(elemento);
        elemento.remove();
    });
    $(document).on("popupbeforeposition", "#alertsPopup1", function (event, ui) {
        console.log("entro a before");
        elemento = $("#alertsPopup1");
        console.log(elemento);
        elemento.append('<embed id="ninos-flash-exe" src="flash/menu.swf">');
//        elemento.append("<object type='application/x-shockwave-flash' width='740' height='470' data='flash/panoramaaula/panoaula.swf'><param name='movie' value='flash/panoramaaula/panoaula.swf'></object>'");
    });
});