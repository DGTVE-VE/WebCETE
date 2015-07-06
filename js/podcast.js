/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {

    $(function () {
      
        var $first = $("#bloque-botones");
        var $second1 = $("#bloque1");
        var $second2 = $("#bloque2");
        var $second3 = $("#bloque3");
        
        var $podcast1 = $("#podcast1");
        var $podcast2 = $("#podcast2");
        var $podcast3 = $("#podcast3");
        
        var $divaudios1 = $("#divaudios1");
        var $divaudios2 = $("#divaudios2");
        var $divaudios3 = $("#divaudios3");
        
        var $regresar1 = $("#regresarpodcast1");
        var $regresar2 = $("#regresarpodcast2");
        var $regresar3 = $("#regresarpodcast3");
        
        var $pie = $ ("#imagenpiepodcast");
        
        var $ban1 = 0;
        var $ban2 = 0;
        var $ban3 = 0;
        
//        Primer  boton
        $podcast1.click(function () {
             animateLeft($first, $second1);
            if($ban1===0){
             $divaudios1.css("display","block");
             $ban1 = 1;
             $pie.css("display","none");
             }
        });
        
        $regresar1.click(function () {
             animateRight($second1, $first);            
            if($ban1===1){
             $divaudios1.css("display","none");
             $ban1 = 0;
             $pie.css("display","block");
             $second2.hide();
             $second3.hide();
              $divaudios2.css("display","none");
              $divaudios3.css("display","none");
             }
        });
//segundo botón        
        $podcast2.click(function () {
             animateLeft($first, $second2);
            if($ban2===0){
             $divaudios2.css("display","block");
             $ban2 = 1;
             $pie.css("display","none");
             }
        });
        
        $regresar2.click(function () {
             animateRight($second2, $first);            
            if($ban2===1){
             $divaudios2.css("display","none");
             $ban2 = 0;
             $pie.css("display","block");
             $second1.hide();
             $second3.hide();
              $divaudios3.css("display","none");
               $divaudios1.css("display","none");
             }
        });
            
//tercer botón        
        $podcast3.click(function () {
             animateLeft($first, $second3);
            if($ban3===0){
             $divaudios3.css("display","block");
             $ban3 = 1;
             $pie.css("display","none");
             }
        });
        
        $regresar3.click(function () {
             animateRight($second3, $first);            
            if($ban3===1){
             $divaudios3.css("display","none");
             $ban3 = 0;
             $pie.css("display","block");
             $second1.hide();
             $second2.hide();
              $divaudios2.css("display","none");
               $divaudios1.css("display","none");
             }
        });
        
        
    });
});
