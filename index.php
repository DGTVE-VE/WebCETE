<?php

if (isset($_GET['seccion'])) {
$seccion = $_GET['seccion'];
} else {
$seccion = "home";
}
$secciones = array(
    "home" => "home.php",
    "audiovisual" => "audiovisual.php",
    "camarografo" => "camarografo.php",
    "conductor" => "conductor.php",
    "control" => "control.php",
    "diplomados" => "diplomados.php",
    "editor" => "editor.php",
    "educacion_distancia" => "educacion_distancia.php",
    "educacion_presencial" => "educacion_presencial.php",
    "elaborador" => "elaborador.php",
    "guionista" => "guionista.php",
    "iluminador" => "iluminador.php",
    "infografia" => "infografia.php",
    "ingenieria" => "ingenieria.php",
    "ninos" => "ninos.php",
    "nosotros" => "nosotros.php",
    "novedades" => "novedades.php",
    "podcast" => "podcast.php",
    "productor" => "productor.php",
    "recorridos" => "recorridos.php",
    "sistemaADistancia" => "sistemaADistancia.php",
    "sistemaPresencial" => "sistemaPresencial.php",
    "solicitud_inscripcion" => "solicitud_inscripcion.php",    
    "sistemaADistancia" => "sistemaADistancia.php",
    "sistemaPrsencial" => "sistemaPresencial.php",
    "sistemaBajoDemanda" => "sistemaBajoDemanda.php",
    "taller" =>"taller.php",
    "ninosTele" => "ninosTele.html",
    "boletin" => "boletin.html",
    "calendario" => "calendario.php",
    "podcast-interior" => "podcast-interior.php",
    "podcast-interior-tecnologias" => "podcast-interior-tecnologias.php",
    "podcast-interior-audiovisuales" => "podcast-interior-audiovisuales.php",
    "novedades-articulo" => "novedades-articulo.php",
    "novedades-articulo-ceremonia" => "novedades-articulo-ceremonia.php",
    "novedades-articulo-ninos" => "novedades-articulo-ninos.php",
    "novedades-articulo-conferencia" => "novedades-articulo-conferencia.php",
    "recorridosAula" => "recorridosAula.html",
    "recorridosAulaCapacitacion" => "recorridosAulaCapacitacion.html",
    "recorridosAulaCabina" => "recorridosAulaCabina.html",
    "recorridosAulaEstudio" => "recorridosAulaEstudio.html",
    "recorridosAulaIluminacion" => "recorridosAulaIluminacion.html",
    "recorridosAulaNinos" => "recorridosAulaNinos.html"
);
if (array_key_exists($seccion, $secciones)){    
    $script = $secciones[$seccion];
} else {
    
    $script = "home.php";
}

//print $script;
?>


<!doctype html>
<html class="no-js" lang="es-MX">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Capacitación</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="css/cete.css" rel="stylesheet" type="text/css">
        <link href="css/normalize.css" rel="stylesheet" type="text/css">
        <link href="css/main.css" rel="stylesheet" type="text/css">
        <!--<link href="css/footer.css" rel="stylesheet" type="text/css">-->
        <link href="//netdna.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
        <!--<link href="css/bootstrap.css" rel="stylesheet" type="text/css">-->
        <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" rel="stylesheet">
        
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js" type="text/javascript"></script>
        <!--<script src="js/jquery-1.11.1.min.js" type="text/javascript"></script>-->
        <!--<script src="js/bootstrap.min.js" type="text/javascript"></script>-->
        <script src="js/plugins.js"></script>
        <script src="js/main.js?c=$daTimestamp"></script>                                
        <script src="js/jsCete.js"></script>
        <script src="js/objetivo.js"></script>
        <script src="js/mision.js"></script>
        <script src="js/vision.js"></script>
        <script src="js/ninos-flash.js"></script>   
        <script src="js/podcast.js"></script>
        
    </head>
    <body class="center" align="justify">        
        <header id="top-header">
            <div id="logos-header" align="left">
                <img src="images/logo-home-cete.jpg">
            </div>

            <div id="menu-header" align="center">
                <ul class="main-nav">
                    <li><a class="menu-link no-link"  href="/" >INICIO </a>|</li>
                    <li><a class="menu-link no-link" data="canales"  href="/capacitacion" >CAPACITACIÓN</a>|</li>
                    <li><a class="menu-link no-link" data="quienes"  href="index.php?seccion=nosotros" >NOSOTROS</a>|</li>
                    <li><a class="menu-link no-link"  href="index.php?seccion=educacion_presencial">EDUCACIÓN PRESENCIAL</a> |</li>
                    <li><a class="menu-link no-link"  data="servicios" href="index.php?seccion=educacion_distancia" >EDUCACIÓN A DISTANCIA</a>|</li>
                </ul>
            </div>
            <div id="sociales-header">
                <a class="facebook" href="https://www.facebook.com/TvEducativaMx" target="_new"></a>
                <a class="twitter" href="https://twitter.com/tveducativamx" target="_new"></a>
                <a class="gplus" href="https://plus.google.com/109719447524198383168/posts" target="_new"></a>
                <a class="youtube" href="http://www.youtube.com/user/tveducativamx?feature=sub_widget_1" target="_new"></a>
            </div>
        </header>
        <section id="contenido-cete" align="justify">
            <?php include 'include/'.$script; ?>
        </section>
        <?php        include 'include/footer.php'; ?>
    </body>
