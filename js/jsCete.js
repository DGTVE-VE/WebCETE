/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


    /* global oImageDiv */

//$("#go-feature").attr('tgl',0);
//    $("#go-feature").click(function(e){
//        e.preventDefault();
//        if($(this).attr('tgl')==0){
//            $(this).attr('tgl',1);
//            $("#regresa-feature").show();
//            $(".perfil-container").animate({
//                transform: 'translateX(1050px)'
//            },400);
//        } else {
//            $(this).attr('tgl',0);
//            $("#regresa-feature").hide();
//            $(".perfil-container").animate({
//                transform: 'translateX(0px)'
//            },400);
//        }
//    });
//    $("#regresa-feature").click(function(e){
//        e.preventDefault();
//        $("#go-feature").attr('tgl',0);
//        $("#regresa-feature").hide();
//        $(".perfil-container").animate({
//            transform: 'translateX(0px)'
//        },400);
//    });

//CALENDARIO

function showHideCanal12(){ 
    var divCalendario=document.getElementById('calendario-canal12');
    var divCalendario1=document.getElementById('calendario-canal22');
    if (divCalendario.style.display=='none'){
        divCalendario.style.display = 'inline';
        divCalendario1.style.display = 'none';
    } else {
        divCalendario1.style.display = 'none';
        divCalendario.style.display = 'none';
    }
    
//    divCalendario.style.display=(divCalendario.style.display=='none')?'inline':'none';
//    divCalendario1.style.display=(divCalendario1.style.display=='inline')?'none':'inline';
 } 
function showHideCanal22(){ 
    var divCalendario=document.getElementById('calendario-canal12');
    var divCalendario1=document.getElementById('calendario-canal22');
    if (divCalendario1.style.display=='none'){
        divCalendario1.style.display = 'inline';
        divCalendario.style.display = 'none';
    } else {
        divCalendario1.style.display = 'none';
        divCalendario.style.display = 'none';
    }
//     divCalendario1.style.display=(divCalendario1.style.display=='none')?'inline':'none';
//     divCalendario.style.display=(divCalendario.style.display=='inline')?'none':'inline';
 } 
