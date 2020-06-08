
window.addEventListener("load", superwooper, false);

function superwooper() {
    
    document.forms.calculo.boton.addEventListener("click", calculoBassoSellado, false); 
    document.forms.calculo.boton.addEventListener("dblclick", borrar, false); 

}

/*
 FUNCIÓN PARA CALCULAR SUBWOOFER SEALED O BASS REFLEX
*/

function calculoBassoSellado() {
    
     var miForm = document.forms["calculo"];
    
     var qtc = "0.707";
     var qes = miForm["qes"].value;
     var fr = miForm["fr"].value;
     var qts = miForm["qts"].value;
     var vas = miForm["vas"].value;
	 
	 /*
	 CALCULO VOLUMEN SELLADO
	 */
	 
	 var fc = (qtc*fr)/qts;
     var a = 1/(qtc*qtc)-2;
     var f3sellado = fc*(a+(a*a+4)/2)/2;
     var volumen = vas/(-1+(fc/fr)*(fc/fr));
	 
	 /*
	 CALCULO VOLUMEN BASS REFLEX
	 */
	 
	 var volumen2 = 20*vas*(Math.pow(qts,3.3));  
     var raiz = (vas *(fr*fr))/volumen;
     var f3bass = Math.sqrt(raiz);
   
     /*
	 EFICIENCIA SELLADO O BASS REFLEX
	 */
     var eficiencia = fr/qes;
     
     
     if (qes === "" | fr===""  |fr==="" | qts==="" | vas==="") {
         
         alert("Sugerencias: " + "\n" + 
				"1) No debes dejar campos vacios" + "\n" + 
				"2) Los campos deben ser numéricos" + "\n" + 
				"3) Necesitas los parámetros Thiele Small del driver");
         
         return false; 
    /*
	CONDICIONES:
	1.- Eficiencia < 50 -> SUBWOOFER SELLADO
	2.- Eficiencia >= 50 && <= 100 -> SUBWOOFER SELLADO o BASS REFLEX
	3.- Eficiencia > 100 -> SUBWOOFER BASS REFLEX
    */
         
     } else if (eficiencia<50) {
    
		document.forms.calculo.area.value = "Se recomienda un SubWoofer SELLADO " + "\n" + "\n" + "- Volumen: " + volumen.toFixed(2) + " litros " + "\n" + "- F3: " + f3sellado.toFixed(2) + " hz";

		graficaGoogleSellado(f3sellado);
		

     } else if (eficiencia>=50 && eficiencia<=100) {
     
		document.forms.calculo.area.value = "Se recomienda un SubWoofer SELLADO o BASS REFLEX" 
										+ "\n" + "- Volumen sellado: " + volumen.toFixed(2) + " litros " + "\n" + "- F3 sellado: " + f3sellado.toFixed(2) + " hz" 
										+ "\n" + "- Volumen bass reflex: " + volumen2.toFixed(2) + " litros " + "\n" + "- F3 bass reflex: " + f3bass.toFixed(2) + " hz";

	    graficaGoogleSelladoBassreflex (f3sellado , f3bass);


     } else { 
            
		document.forms.calculo.area.value = "Se recomienda un SubWoofer BASS REFLEX " + "\n" + "- Volumen: " + volumen2.toFixed(2) + " litros " + "\n" + "- F3: " + f3bass.toFixed(2) + " hz";
 		
 		graficaGoogleBassreflex (f3bass);
     }

}

 /*
 FUNCIÓN PARA MOSTRAR GRÁFICO EN SEALED
 @param la f3 del sellado
 */

function graficaGoogleSellado (f3sellado) {

	    /*
	    GRAFICA GOOGLE F3 SELLADO
		*/
		var data = google.visualization.arrayToDataTable([
	        ['ID', 'Frecuencia', 'SPL Decibelios', 'Marca'],
	        ['SELLADO', f3sellado,  90,    'F3 del driver'],
	        ['',        80,         90,          'LIMITES']
	      ]);

	      var options = {
	        title: 'F3 de un altavoz Sellado en anecoica o campo libre ',
	        backgroundColor: '#EBEBEB',
	        hAxis: {title: 'Frecuencia Hz'},
	        vAxis: {title: 'Decibelios Db'},
	        bubble: {textStyle: {fontSize: 11}}
	      };

      var chart = new google.visualization.BubbleChart(document.getElementById('chart_google'));
      chart.draw(data, options);

      /*
	  GRAFICA RESPONSIVE DE GOOGLE
      */

      function resizeHandler () {
        chart.draw(data, options);
		    }
		    if (window.addEventListener) {
		        window.addEventListener('resize', resizeHandler, false);
		    }
		    else if (window.attachEvent) {
		        window.attachEvent('onresize', resizeHandler);
		    }

   }

 /*
 FUNCIÓN PARA MOSTRAR GRÁFICO EN BASS REFLEX
 @param la f3 del bass reflex
 */

function graficaGoogleBassreflex (f3bass) {

	    /*
		GRAFICA GOOGLE F3 BASS REFLEX
		*/
		var data = google.visualization.arrayToDataTable([
	        ['ID', 'Frecuencia', 'SPL Decibelios', 'Marca'],
	        ['BASS',    f3bass,   90,      'F3 del driver'],
	        ['',        80,       90,            'LIMITES']
	      ]);

	      var options = {
	        title: 'F3 de un altavoz Bass Reflex en anecoica o campo libre ',
	        backgroundColor: '#EBEBEB',
	        hAxis: {title: 'Frecuencia Hz'},
	        vAxis: {title: 'Decibelios Db'},
	        bubble: {textStyle: {fontSize: 11}}
	      };

      var chart = new google.visualization.BubbleChart(document.getElementById('chart_google'));
      chart.draw(data, options);

      /*
	  GRAFICA RESPONSIVE DE GOOGLE
      */

      function resizeHandler () {
        chart.draw(data, options);
		    }
		    if (window.addEventListener) {
		        window.addEventListener('resize', resizeHandler, false);
		    }
		    else if (window.attachEvent) {
		        window.attachEvent('onresize', resizeHandler);
		    }    
}

 /*
 FUNCIÓN PARA MOSTRAR GRÁFICO EN SEALED y BASS REFLEX
 @param la f3 de cada subwoofer
 */

function graficaGoogleSelladoBassreflex (f3sellado , f3bass) {

	    /*
		GRAFICA GOOGLE F3 SELLADO BASS REFLEX
		*/
		var data = google.visualization.arrayToDataTable([
	        ['ID',      'Frecuencia', 'SPL Decibelios',          'Marca'],
	        ['SELLADO', f3sellado,     90,                  'F3 sellado'],
	        ['BASS',    f3bass,        90,              'F3 bass reflex'],
	        ['',        0,             90,                     'LIMITES'],
	        ['',        80,            90,                     'LIMITES']
	      ]);

	      var options = {
	        title: 'F3 de un altavoz Sellado - Bass reflex en anecoica o campo libre ',
	        backgroundColor: '#EBEBEB',
	        hAxis: {title: 'Frecuencia Hz'},
	        vAxis: {title: 'Decibelios Db'},
	        bubble: {textStyle: {fontSize: 11}}
	      };

	  var chart = new google.visualization.BubbleChart(document.getElementById('chart_google'));
      chart.draw(data, options);

      /*
		GRAFICA RESPONSIVE DE GOOGLE
      */

      function resizeHandler () {
        chart.draw(data, options);
		    }
		    if (window.addEventListener) {
		        window.addEventListener('resize', resizeHandler, false);
		    }
		    else if (window.attachEvent) {
		        window.attachEvent('onresize', resizeHandler);
		    }
}

 /*
 FUNCIÓN PARA LIMPIAR CAMPOS DE FORMULARIO - DOBLE CLICK
 */

function borrar() {

	 var miForm = document.forms["calculo"];
    
     miForm["qes"].value ="";
     miForm["fr"].value  ="";
     miForm["qts"].value ="";
     miForm["vas"].value ="";

     document.forms.calculo.area.value = "";
     document.getElementById('chart_google').innerHTML = "";


}

 

      
    







