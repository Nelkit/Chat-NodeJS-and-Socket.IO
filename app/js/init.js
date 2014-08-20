$(document).ready(function() {

	function  alto() {
		var alto =  $(window).height();
		return alto;
	}

	function convertoAlto() {
		$(".columns").height(alto()-60);
	}

	function cerrarChat() {
		$("#ct-chat")
		.css("left","50%")
		.css("top","200px")
		.css("width","0px")
		.css("height","0px")
		.css("z-index","0")
		.css("opacity",'0');
	}

	function abrirChat(){
		convertoAlto();
		borrarNotificacion()
		$("#ct-chat")
		.css("left","0px")
		.css("top","0px")
		.css("width","100%")
		.css("height","100%")
		.css("opacity",'1')
		.css("z-index","200");
	}

	function borrarNotificacion() {
		$('head').children('style').remove();
		$('#messages').children('div').removeClass('no-leido');
	}

	$("#icon-chat").click(function() {
	  abrirChat();
	});

	$(".close").click(function() {
	  cerrarChat();
	});

	$("#enviarMensaje").click(function() {
	  var mensaje = $("#message").val(); 
	  var nombre = $("#name").val(); 
	  var f = new Date();
	  var date = f.getDate() + "/" + 
	  			(f.getMonth() +1) + "/" + 
	  			f.getFullYear()+', '+
	  			f.getHours()+':'+
	  			f.getMinutes()+':'+
	  			f.getSeconds();
	  
	  App.insertar(nombre+"(YO)" ,mensaje, 'leido', 'sending', 'left', date);

	  var session = {}
	  session.nombre = nombre;
	  session.mensaje = mensaje; 
	  session.estado = 'no-leido';
	  session.accion = 'receive';
	  session.align = 'right';
	  session.fecha = date;
	  App.ws.emit('mensaje',session)
	});

	var App = {};

	App.ws = io.connect('/')

	App.ws.on('ready', function() {
		console.log("los WebSockets Estan listos");
	})

	App.ws.on('mensaje', function(msg) {
		App.insertar(msg.nombre, msg.mensaje, msg.estado, msg.accion, msg.align, msg.fecha);
		App.notificacion();

	})

	App.notificacion = function() {
		var nro = $("#messages").children(".no-leido").length
		$('head').append("<style>.icon-chat:before{content:'"+nro+"'; !important; opacity:1}</style>");
	}

	App.insertar = function(nombre, msg, estado, accion,align, fecha) {
		$("#messages").append("<div class='width-12 row text-"+align+" "
		+estado+"'><sup class='user-chat "+align+"'>"+nombre+" | "+fecha+"</sup><span class='msj "+accion+"'>"
		+msg+"</span></div><br>");
		$("#message").val("");
	}

});

