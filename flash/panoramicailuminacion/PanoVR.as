/*****************************************************************************
CLASE PANOVR v.3 - 5/09/06
funcion: imagen panorámica 360º a partir de un MC.
autor: Vladimir Rojas

uso: var pano = new PanoVR(this, movieClip, movieClip);
funciones publicas: setPosition(x,y) / setDimension(width, height) / setMarco(grosor, color) / setTipo(queTipoMovimiento:Number) / 
setVelocidad(velocidad) / setAceleracion(aceleracion) / setPanos(MovieClip, MovieClip) /

guia:
-La panorámica se divide en 2 movieclips - "pano1a" "pano1b"
-Aceleración: Al soltar continua el movimiento por inercia. Sin inercia valor 0.
-Solapa: Margen de enlace de los dos MovieClips.

ejemplo:
var pano = new PanoVR(this, "pano1a", "pano1b");
pano.setPosition(50, 50)
pano.setDimension(500, 250)
******************************************************************************/
class PanoVR {
	//
	private var ruta:MovieClip;
	private var clip1:MovieClip;
	private var clip2:MovieClip;
	private var marco:MovieClip;
	private var mascara:MovieClip;
	private var mascara2:MovieClip;
	private var listener:Object;
	private var prof:Number;
	private var x:Number;
	private var y:Number;
	private var width:Number;
	private var height:Number;
	private var grosor:Number;
	private var color:Number;
	private var velocidad:Number;
	private var aceleracion:Number;
	private var solapa:Number;
	//
	//--CONSTRUCTOR------------------------------------
	public function PanoVR(queRuta:MovieClip, queClip1:String, queClip2:String) {
		ruta = queRuta;
		prof = ruta.getNextHighestDepth();
		clip1 = ruta.clip1 = ruta.createEmptyMovieClip("pano1", prof);
		clip2 = ruta.clip2 = ruta.createEmptyMovieClip("pano2", prof + 1);
		clip1.attachMovie(queClip1, queClip1, 1);
		clip2.attachMovie(queClip2, queClip2, 1);
		listener = new Object();
		//-- variables default -------
		x = clip1.x = clip2.x = 0;
		y = clip1.y = clip2.y = 0;
		width = clip1.width = clip2.width = 320;
		height = clip1.height = clip2.height = 240;
		grosor = 1;
		color = 0x000000;
		velocidad = 15;
		aceleracion = 0.15;
		solapa = 0;
		//-- inis --------------------
		iniPosicion();
		iniMascara();
		iniMarco();
		iniEvents();
	}
	//--INIS-----------------------------------------
	private function iniPosicion() {
		clip1._x = x;
		clip1._y = y;
		clip2._x = x + clip1._width;
		clip2._y = y;
	}
	//--------------------------------------------------
	private function iniMascara() {
		prof = ruta.getNextHighestDepth();
		mascara = ruta.createEmptyMovieClip("mask_mc", prof);
		mascara.beginFill(0xFF0000);
		mascara.lineStyle(1, 0x000000, 100);
		mascara.moveTo(x, y);
		mascara.lineTo(x + width, y);
		mascara.lineTo(x + width, y + height);
		mascara.lineTo(x, y + height);
		mascara.lineTo(x, y);
		mascara.endFill();
		mascara2 = mascara.duplicateMovieClip("mask2_mc", prof + 1);
		clip1.setMask(mascara);
		clip2.setMask(mascara2);
	}
	//--------------------------------------------------
	private function iniMarco() {
		prof = ruta.getNextHighestDepth();
		marco = ruta.createEmptyMovieClip("marco_mc", prof);
		marco.lineStyle(grosor, color, 100);
		marco.moveTo(x, y);
		marco.lineTo(x + width, y);
		marco.lineTo(x + width, y + height);
		marco.lineTo(x, y + height);
		marco.lineTo(x, y);
	}
	//--------------------------------------------------
	private function iniEvents() {
		clip1.velocidad = clip2.velocidad = velocidad;
		clip1.aceleracion = clip2.aceleracion = aceleracion;
		clip1.solapa = solapa;
		var pano1:MovieClip = clip1;
		var pano2:MovieClip = clip2;
		var mouseIsDown:Boolean = false;
		//
		listener.onMouseDown = function() {
			mouseIsDown = true;
			//controlamos que se esta dentro del area de la pano
			if (_xmouse > pano1.x & _xmouse < (pano1.x + pano1.width) & _ymouse > pano1.y & _ymouse < (pano1.y + pano1.height)) {
				pano1.onEnterFrame = function() {
					this.point2x = _xmouse;
					this.point2y = _ymouse;
					this.velx = (this.point2x - this.point1x) / this.velocidad * -1;
					this.vely = (this.point2y - this.point1y) / this.velocidad * -1 / 2;
					pano1._x += pano1.velx;
					pano1._y += pano1.vely;
					enlacaPanos(pano1, pano2);
					
				};
				pano1.point1x = _xmouse;
				pano1.point1y = _ymouse;
			}
		};
		listener.onMouseUp = function() {
			mouseIsDown = false;
			movimientoInercia(pano1);
		};
		listener.onMouseMove = function() {
			//controlamos que se esta dentro del area de la pano
			if (_xmouse > pano1.x & _xmouse < (pano1.x + pano1.width) & _ymouse > pano1.y & _ymouse < (pano1.y + pano1.height)) {
				if (mouseIsDown == false) {
					if (_xmouse > pano1.x & _xmouse < (pano1.x + pano1.width / 2)) {
						//-- izquierda
						pano1.onEnterFrame = movimientoAutoH;
						pano1.point1x = pano1.x + pano1.width / 2;
					} else if (_xmouse > (pano1.x + pano1.width - pano1.width / 2) & _xmouse < (pano1.x + pano1.width)) {
						//-- derecha
						pano1.onEnterFrame = movimientoAutoH;
						pano1.point1x = pano1.x + pano1.width - (pano1.width / 2);
					} else if (_ymouse > pano1.y & _ymouse < (pano1.y + pano1.height / 2)) {
						//-- arriba
						pano1.onEnterFrame = movimientoAutoV;
						pano1.point1y = pano1.y + (pano1.height / 0);
					} else if (_ymouse > (pano1.y + pano1.height - pano1.height / 0) & _ymouse < (pano1.y + pano1.height)) {
						//-- abajo
						pano1.onEnterFrame = movimientoAutoV;
						pano1.point1y = pano1.y + pano1.height - (pano1.height / 0);
					} else {
						//estamos fuera del area roll
						movimientoInercia(pano1);
					}
				}
			} else {
				//estamos fuera de la pano
				movimientoInercia(pano1);
			}
		};
		Mouse.addListener(listener);
		//
		function enlacaPanos(pano1, pano2) {
			if (pano1._x < pano1.x) {
				pano2._x = pano1._x + pano1._width - pano1.solapa;
			} else {
				pano2._x = pano1._x - pano1._width + pano1.solapa;
			}
			//vuelta
			if (pano1._x < pano1.x & pano2._x < pano2.x) {
				pano1._x = pano2._x + pano2._width - pano1.solapa;
			} else if (pano1._x > pano1.x & pano2._x > pano2.x) {
				pano1._x = pano2._x - pano2._width + pano1.solapa;
			}
			//controla eje Y                                           
			if (pano1._y > pano1.y) {
				pano1._y = pano1.y;
			} else if (pano1._y < pano1.y - pano1._height + pano1.height) {
				pano1._y = pano1.y - pano1._height + pano1.height;
			}
			pano2._y = pano1._y;
		}
		function movimientoInercia(quePano) {
			var pano1:MovieClip = quePano;
			var pano2:MovieClip = (pano1 == pano1._parent.clip1) ? pano1._parent.clip2 : pano1._parent.clip1;
			pano1.onEnterFrame = function() {
				var ac:Number = pano1.velx * pano1.aceleracion;
				pano1.velx -= ac;
				pano1._x += pano1.velx;
				if (ac < 0.01 & ac > -0.01) {
					delete pano1.onEnterFrame;
				}
				enlacaPanos(pano1, pano2);
			};
		}
		function movimientoAutoH() {
			this.point2x = _xmouse;
			this.velx = (this.point2x - this.point1x) / this.velocidad * -0.5;
			pano1._x += pano1.velx;
			enlacaPanos(pano1, pano2);
		}
		function movimientoAutoV() {
			this.point2y = _ymouse;
			this.vely = (this.point2y - this.point1y) / this.velocidad * -0.5 / 2;
			pano1._y += pano1.vely;
			enlacaPanos(pano1, pano2);
		}
	}
	//end iniEvents
	//--------------------------------------------------
	private function update() {
		iniPosicion();
		removeMovieClip(mascara);
		removeMovieClip(mascara2);
		iniMascara();
		removeMovieClip(marco);
		iniMarco();
		iniEvents();
	}
	//
	//--SETTERS-----------------------------------------
	public function setPosicion(queX:Number, queY:Number) {
		x = clip1.x = clip2.x = queX;
		y = clip1.y = clip2.y = queY;
		update();
	}
	//--------------------------------------------------
	public function setDimension(queW:Number, queH:Number) {
		width = clip1.width = clip2.width = queW;
		height = clip1.height = clip2.height = queH;
		update();
	}
	//--------------------------------------------------
	public function setMarco(queGrosor, queColor:Number) {
		grosor = queGrosor;
		color = queColor;
		update();
	}
	//--------------------------------------------------
	public function setVelocidad(queVelocidad:Number) {
		velocidad = clip1.velocidad = clip2.velocidad = queVelocidad;
		update();
	}
	//--------------------------------------------------
	public function setAceleracion(queAceleracion:Number) {
		aceleracion = clip1.aceleracion = clip2.aceleracion = queAceleracion;
		update();
	}
	//--------------------------------------------------
	public function setSolapa(queSolapa:Number) {
		solapa = clip1.solapa = clip2.solapa = queSolapa;
		update();
	}
	//--------------------------------------------------
	public function setPanos(queClip1:String, queClip2:String) {
		removeMovieClip(clip1.pano1);
		removeMovieClip(clip2.pano2);
		clip1.attachMovie(queClip1, queClip1, 1);
		clip2.attachMovie(queClip2, queClip2, 1);
		update();
	}
	//--------------------------------------------------
	public function clear() {
		removeMovieClip(clip1);
		removeMovieClip(clip2);
		removeMovieClip(mascara);
		removeMovieClip(mascara2);
	}
	//--------------------------------------------------
	//--------------------------------------------------
}







