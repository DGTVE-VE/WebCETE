//funcion para llamar a la programacion (probando con 1 canal)
function programacion() {
    //realizar el get del json general
    $.get('http://web1.televisioneducativa.gob.mx/gateways/programacion',function(result){
       //vamos a llenar un canal nada mas ahorita
        console.log(result);
        var completo = 0;
        var barras = [
            $("#programacion-aprende"),
            $("#programacion-ingenio"),
            $("#programacion-telesec"),
            $("#programacion-tvdocencia"),
            $("#programacion-telebachillerato"),
            $("#programacion-telemexico"),
            $("#programacion-tvuniversidad")
        ];

        //recorrer todos los canales
        $.each(result,function(index_canal,barra){
            completo = 0;
            $.each(barra.canal.programacion, function(index, programa){
                var elemento = $("<div/>").attr("class","prog-celda prog-horario");
                elemento.append($("<p/>").html(programa.serie2));
                barras[index_canal].append(elemento);
                completo++;
            });
            var nuevo = ((completo * 200) / 974) * 100;
            nuevo = Math.ceil(nuevo + 10);
            barras[index_canal].css('width',nuevo+'%');
        });
    });
}

function programacion_canal(canal) {
    //realizar el get del json general
    $.get('http://web1.televisioneducativa.gob.mx/gateways/programacion/'+canal+'?offset=1',function(result){
        //vamos a llenar un canal nada mas ahorita
        console.log(result);


        var completo = 0;
        /*
         <div class="miniprogra-hora clearfix 1stprg">
         <p class="pgr-hora">18:30</p>
         <p class="pgr-desc">Titulo del programa titulo del programa. Titulo.</p>
         </div>
         */

        $.each(result, function(index, programa){
            var elemento = $("<div/>").attr("class","miniprogra-hora clearfix");
            elemento.append($("<p/>").attr("class",'pgr-hora').html(programa.hra_inicial));
            elemento.append($("<p/>").attr("class",'pgr-desc').html(programa.serie2+' - '+programa.programa2));

            $(".miniprogra-horas").append(elemento);
        });

        //ocultar los track buttons
        if(result.length <= 4) {
            $(".track-buttons").hide();
        } else {

            //codigo de los track
            //miniprogra
            $(".abajo").click(function(e){
                e.preventDefault();
                console.log($(".miniprogra-horas").position());
                $(".miniprogra-horas").css('top','-=48px');
                console.log($(".miniprogra-horas").position());
            });
            $(".arriba").click(function(e){
                e.preventDefault();

                console.log($(".miniprogra-horas").position());
                if($(".miniprogra-horas").position().top < 0) {
                    $(".miniprogra-horas").css('top','+=48px');
                    console.log($(".miniprogra-horas").position());
                }
            });

        }

    });
}

//mapa en el contacto
function initialize_map() {
    var mapCanvas = document.getElementById('map-canvas');
    var mapOptions = {
        center: new google.maps.LatLng(19.4419099,-99.1154972),
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        navigationControl: true
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);
}

//setup del form de contacto
function contacto() {
    $("#envia-contacto").click(function(e){
        e.preventDefault();

        var datosform = {
            nombre : $("#contacto-nombre").val(),
            email : $("#contacto-email").val(),
            telefono : $("#contacto-telefono").val(),
            asunto : $("#contacto-asunto").val(),
            mensaje : $("#contacto-mensaje").val()
        };

        //realizar un post
        $.post('http://web1.televisioneducativa.gob.mx/gateways/contacto',datosform, function(result){
            console.log(result);
            limpiar_form();
            alert('gracias por enviar tus comentarios');
        });
    })
}
function limpiar_form() {
    $("#contacto-nombre").val('');
    $("#contacto-email").val('');
    $("#contacto-telefono").val('');
    $("#contacto-asunto").val('');
    $("#contacto-mensaje").val('');
}

function mediateca_featured() {
    //realizar un post
     $.get('http://web1.televisioneducativa.gob.mx/gateways/mediateca/random', function(result){
         var datos = result['resultados'];
         $("#contenido-mediateca").empty();
         $("#contenido-mediateca").append($("<div/>").attr("id","mediateca-holder"));
         if(datos.length > 0) {

             //recorrer
             $.each(datos,function(index, programa){
                 console.log(programa);
                 var imagen = $("<img/>").attr('class','imagen-media').attr('src','http://vodts.televisioneducativa.gob.mx/mat/d'+programa.i_thumb);
                 var elemento = $("<div/>").attr("class","video mediavideo").attr('data-vid',programa.mp4_arch);
                 var encabezado = $("<h3/>").text(programa.serie);
                 var materia = $("<p/>").text(programa.titulo);
                 elemento.append(imagen);
                 elemento.append(encabezado);
                 elemento.append(materia);
                 $("#mediateca-holder").append(elemento);
             });

             $(".mediavideo").click(function(){
                 console.log($(this).attr('data-vid'));
                 reproducir($(this).attr('data-vid'));
             });
             $(".reproductor-regresa").click(function(e){
                 e.preventDefault();
                 $("#mediateca-player").hide();
             });

             $("img.imagen-media").error(function(){
                 $(this).attr('src', 'http://web1.televisioneducativa.gob.mx/themes/simple/images/vid.png');
             });

         }
     });
}

//para mostrar el video en la mediateca
function reproducir(el_video) {
    flowplayer("mediateca-rep", "/themes/simple/streaming/flowplayer.swf", {

        onLoad: function() {},
        // commercial version license key
        key: '#$d5a982210533293804b',
        clip: {
            url: 'http://vodts.televisioneducativa.gob.mx/mat/d'+el_video,
            autoPlay: true
        },
        plugins: {
            controls: {
            },
            content: {
                url: "/themes/simple/streaming/flowplayer.swf",
                top: 0,
                left: 0,
                width: 400,
                height: 150,
                backgroundColor: 'transparent',
                backgroundGradient: 'none',
                border: 0,
                textDecoration: 'outline',
                style: {
                    body: {
                        fontSize: 14,
                        fontFamily: 'Arial',
                        textAlign: 'center',
                        color: '#ffffff'
                    }
                }
            }
        }
    });

    $("#mediateca-player").show();
}

$(document).ready(function(){

    //menu principal
    $(".gran-link").hover(function(){
        $("#gran-menu").show();
        $(".da-subnav").hide();
        $(".subnav-"+$(this).attr("data")).show();
    });
    $("#gran-menu").hover(function(){
        $("#gran-menu").show();
    }, function() {
        $("#gran-menu").hide();
    });
    $(".no-link").hover(function(){
        $("#gran-menu").hide();
    }, function() {
        $("#gran-menu").hide();
    });

//    $('#slider-home').bxSlider({
//        useCSS : false,
//        pager : false,
//        auto : true
//    });

//    $('#slider-noti').bxSlider({
//        mode : 'fade',
//        useCSS : false,
//        pager : false,
//        auto : true,
//        speed : 600,
//        pause : 5000
//    });

//    $('#slider-canal').bxSlider({
//        useCSS : false,
//        pager : false,
//        auto : true,
//        speed : 600,
//        pause : 5000
//    });

//    $('#slider-novedades').bxSlider({
//        useCSS : false,
//        pager : false,
//        auto : true,
//        mode: 'fade'
//    });

    $("#b-avanzada").click(function(e){
        e.preventDefault();

        $(".mediateca-wrapper").animate({
            transform: 'translateX(-300px)'
        },350);

    });

    $(".filtrar").click(function(e){
        e.preventDefault();
        $(".mediateca-wrapper").animate({
            transform: 'translateX(0px)'
        },400);
    });

    $(".enviar").click(function(e){
        e.preventDefault();
        alert('Gracias por suscribirte al boletín !');
        $(".news-top").hide();
    });

    //buscador de la mediateca
    $("#buscafield").keypress(function(e){
        //enter
        if(e.which == 13){
            //not empty
            var valor = $("#buscafield").val();
            if(valor != '') {
                //realizar un post
                $.post('http://web1.televisioneducativa.gob.mx/gateways/mediateca/buscar',{criterio:$("#buscafield").val()}, function(result){
                    var datos = result['resultados'];
                    $("#contenido-mediateca").empty();
                    $("#contenido-mediateca").append($("<div/>").attr("id","mediateca-holder"));
                    if(datos.length > 0) {

                        //recorrer
                        $.each(datos,function(index, programa){
                            console.log(programa);
                            var imagen = $("<img/>").attr('class','imagen-media').attr('src','http://vodts.televisioneducativa.gob.mx/mat/d'+programa.i_thumb);
                            var elemento = $("<div/>").attr("class","video mediavideo").attr('data-vid',programa.mp4_arch);
                            var encabezado = $("<h3/>").text(programa.serie);
                            var materia = $("<p/>").text(programa.titulo);
                            elemento.append(imagen);
                            elemento.append(encabezado);
                            elemento.append(materia);
                            $("#mediateca-holder").append(elemento);
                        });

                        //easy paginate
                        $('#mediateca-holder').easyPaginate({
                            paginateElement: 'div',
                            elementsPerPage: 4,
                            firstButton : false,
                            lastButton : false,
                            effect: 'default',
                            onFinish : function() {
                                //click en cada video
                                console.log('bitches');
                                $(".mediavideo").click(function(e){
                                    //e.preventDefault();
                                    reproducir($(this).attr('data-vid'));
                                    console.log('clicado');
                                });
                                $("img.imagen-media").error(function(){
                                    $(this).attr('src', 'http://web1.televisioneducativa.gob.mx/themes/simple/images/vid.png');
                                });
                            }
                        });

                    }
                });
            }
        }
    });

    $("#go-feature").attr('tgl',0);
    $("#go-feature").click(function(e){
        e.preventDefault();
        if($(this).attr('tgl')==0){
            $(this).attr('tgl',1);
            $("#regresa-feature").show();
            $(".perfil-container").animate({
                transform: 'translateX(1050px)'
            },400);
        } else {
            $(this).attr('tgl',0);
            $("#regresa-feature").hide();
            $(".perfil-container").animate({
                transform: 'translateX(0px)'
            },400);
        }
    });
    $("#regresa-feature").click(function(e){
        e.preventDefault();
        $("#go-feature").attr('tgl',0);
        $("#regresa-feature").hide();
        $(".perfil-container").animate({
            transform: 'translateX(0px)'
        },400);
    });


    $("#go-profile").attr('tgl',0);
    $("#go-profile").click(function(e){
        e.preventDefault();
        if($(this).attr('tgl')==0){
            $(this).attr('tgl',1);
            $("#regresa-profile").show();
            $(".perfil-container").animate({
                transform: 'translateX(-1050px)'
            },400);
        } else {
            $(this).attr('tgl',0);
            $("#regresa-profile").hide();
            $(".perfil-container").animate({
                transform: 'translateX(0px)'
            },400);
        }
    });
    $("#regresa-profile").click(function(e){
        e.preventDefault();
        $("#go-profile").attr('tgl',0);
        $("#regresa-profile").hide();
        $(".perfil-container").animate({
            transform: 'translateX(0px)'
        },400);
    });

//    $('audio,video').mediaelementplayer({
//        //mode: 'shim',
//        success: function(player, node) {
//            $('#' + node.id + '-mode').html('mode: ' + player.pluginType);
//            player.play();
//        }
//    });

    $(document).scroll(function(e){
        if($(this).scrollTop() >= 200){
            $(".awesome-bar").addClass('show');
        }else{
            $(".awesome-bar").removeClass('show');
        }
    });
    $("#awesome-cerrar").click(function(e){
        e.preventDefault();
        $(".awesome-bar").css('display','none');
    })

});