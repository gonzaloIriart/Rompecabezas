window.onload=function(){
    var horaDeAventuras = document.getElementById("hora-de-aventuras");
    var pikachu = document.getElementById("pikachu");   
    

    pikachu.addEventListener("click", function(){
        document.getElementById("1").src = "images/1.jpg";
       document.getElementById("2").src = "images/2.jpg";
       document.getElementById("3").src = "images/3.jpg";
       document.getElementById("4").src = "images/4.jpg";
       document.getElementById("5").src = "images/5.jpg";
       document.getElementById("6").src = "images/6.jpg";
       document.getElementById("7").src = "images/7.jpg";
       document.getElementById("8").src = "images/8.jpg";
       document.getElementById("img-objetivo").innerHTML = '<div class="grilla"><img class="imagen-pieza" src="images/1.jpg"><img class="imagen-pieza" src="images/2.jpg"><img class="imagen-pieza" src="images/3.jpg"><img class="imagen-pieza" src="images/4.jpg"><img class="imagen-pieza" src="images/5.jpg"><img class="imagen-pieza" src="images/6.jpg"><img class="imagen-pieza" src="images/7.jpg"><img class="imagen-pieza" src="images/8.jpg"></div>';
       iniciar();
      },true);
      
    
    

    horaDeAventuras.addEventListener("click", function(){
        
       document.getElementById("1").src = "images/10.jpg";
       document.getElementById("2").src = "images/20.jpg";
       document.getElementById("3").src = "images/30.jpg";
       document.getElementById("4").src = "images/40.jpg";
       document.getElementById("5").src = "images/50.jpg";
       document.getElementById("6").src = "images/60.jpg";
       document.getElementById("7").src = "images/70.jpg";
       document.getElementById("8").src = "images/80.jpg";
       document.getElementById("img-objetivo").innerHTML = '<img class="imagen-pieza" src="images/final.png">';
       iniciar();
      },true);
      /*display: grid;
      grid-template-columns:repeat(3,1fr);
  grid-template-rows:repeat(3,1fr);  */ 
    
}


// Arreglo que contiene las intrucciones del juego 
let instrucciones = ["Utilizar las flechas para mover las piezas", "Ordenar las piezas para llegar a la imagen objetivo"];
// Arreglo para ir guardando los movimientos que se vayan realizando
let movimientos = [];

let puntuacion;
let nombre;
//Arreglo de puntuaciones para realizar tabla de mejores resultados
let puntuaciones = [["J1", 5000],["Señor X", 1500],["Tompson", 3000]];

// Representación de la grilla. Cada número representa a una pieza.
// El 9 es la posición vacía
let grilla = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

//Utilizado para no repetir las instrucciones cuando se clickeen los botones
let flag = true;

/* Estas dos variables son para guardar la posición de la pieza vacía. 
Esta posición comienza siendo la [2, 2]*/
let filaVacia = 2;
let columnaVacia = 2;

//Restador de puntos por tiempo en segundos.
window.setInterval("restarPuntosPorSegundo()",1000);

//Boton de mostrar tabla en HTML
var botonTabla = document.getElementById("tabla-boton");
botonTabla.addEventListener("click", function(){
    ordenarPuntuaciones();
    var tablaPuntos = document.getElementById("tabla-puntos"); 
    var tabla   = document.createElement("table");
    var tblBody = document.createElement("tbody");
    // Crea las celdas
  for (var i = 0; i < puntuaciones.length; i++) {
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr"); 
    
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode("Nombre del Jugador: "+ puntuaciones[i][0] +", Puntuacion:  "+ puntuaciones[i][1]);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    
 
    // agrega la hilera al final de la tabla (al final del elemento tblbody)
    tblBody.appendChild(hilera);
  }
 
  // posiciona el <tbody> debajo del elemento <table>
  tabla.appendChild(tblBody);
  // appends <table> into <body>
  tablaPuntos.appendChild(tabla);
  // modifica el atributo "border" de la tabla y lo fija a "2";
  tabla.setAttribute("border", "2");
},true);



/* Esta función deberá recorrer el arreglo de instrucciones pasado por parámetro. 
Cada elemento de este arreglo deberá ser mostrado en la lista con id 'lista-instrucciones'. 
Para eso deberás usar la función ya implementada mostrarInstruccionEnLista().
Podés ver su implementación en la ultima parte de este codigo. */
function mostrarInstrucciones(instrucciones) {
   for (var i = 0; i < instrucciones.length; i++) {
        var ul = document.getElementById("lista-instrucciones");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(instrucciones[i]));
        ul.appendChild(li);
       }
    
}

/* COMPLETAR: Crear función que agregue la última dirección al arreglo de movimientos
y utilice actualizarUltimoMovimiento para mostrarlo en pantalla */

function agregarMovimientosAlArray(movimiento) {
    movimientos.push(movimiento);
    actualizarUltimoMovimiento(movimiento);    
}

function restarPuntos(){
    puntuacion-= 15;
    console
}
function restarPuntosPorSegundo(){
    puntuacion-= 3;
    console
}

/* Esta función va a chequear si el Rompecabezas esta en la posicion ganadora. 
Existen diferentes formas de hacer este chequeo a partir de la grilla. */
function chequearSiGano() {
    //COMPLETAR
    let gano = true;
    let suma = 0;
    for (i = 0; i < grilla.length; i++) {
        for (j = 0; j < grilla[i].length; j++) {
            suma++;
            if (grilla[i][j] !== suma) {
                gano = false;               
                break;
            }
        }
    }
    return gano;
}

// Implementar alguna forma de mostrar un cartel que avise que ganaste el juego
function mostrarCartelGanador() {
    alert("Objetivo cumplido, "+ nombre +"\n Tu puntuacion es de: " + puntuacion); //COMPLETAR

}

/* Función que intercambia dos posiciones en la grilla.
Pensar como intercambiar dos posiciones en un arreglo de arreglos. 
Para que tengas en cuenta:
Si queremos intercambiar las posiciones [1,2] con la [0, 0], si hacemos: 


En vez de intercambiar esos valores vamos a terminar teniendo en ambas posiciones el mismo valor.
Se te ocurre cómo solucionar esto con una variable temporal?
*/
function intercambiarPosicionesGrilla(filaPos1, columnaPos1, filaPos2, columnaPos2) {
    //usando destructuring se puede realizar el intercambio sin necesidad de utilizar variables temporales
    [grilla[filaPos1][columnaPos1], grilla[filaPos2][columnaPos2]] = [grilla[filaPos2][columnaPos2], grilla[filaPos1][columnaPos1]]

}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
    //COMPLETAR
    filaVacia = nuevaFila;
    columnaVacia = nuevaColumna;

}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna) {
    return (fila <= 2 && fila >= 0 && columna <= 2 && columna >= 0);
}

/* Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando su posición con otro elemento.
Las direcciones están dadas por números que representa: arriba (38), abajo (40), izquierda (37), derecha (39) */
function moverEnDireccion(direccion) {
    var nuevaFilaPiezaVacia;
    var nuevaColumnaPiezaVacia;

    // Mueve pieza hacia la abajo, reemplazandola con la blanca
    if (direccion === codigosDireccion.ABAJO) {
        nuevaFilaPiezaVacia = filaVacia + 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    }

    // Mueve pieza hacia arriba, reemplazandola con la blanca
    else if (direccion === codigosDireccion.ARRIBA) {
        nuevaFilaPiezaVacia = filaVacia - 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    }

    // Mueve pieza hacia la derecha, reemplazandola con la blanca
    else if (direccion === codigosDireccion.DERECHA) {
        nuevaFilaPiezaVacia = filaVacia;
        nuevaColumnaPiezaVacia = columnaVacia + 1;
    }

    // Mueve pieza hacia la izquierda, reemplazandola con la blanca
    else if (direccion === codigosDireccion.IZQUIERDA) {
        nuevaFilaPiezaVacia = filaVacia;
        nuevaColumnaPiezaVacia = columnaVacia - 1;
    }

    /* A continuación se chequea si la nueva posición es válida, si lo es, se intercambia. 
    Para que esta parte del código funcione correctamente deberás haber implementado 
    las funciones posicionValida, intercambiarPosicionesGrilla y actualizarPosicionVacia */

    if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {

        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);

        actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);

        //COMPLETAR: Agregar la dirección del movimiento al arreglo de movimientos
        agregarMovimientosAlArray(direccion);
        restarPuntos();

    }
}

function llenarTabla(){
    document.getElementById("tabla-puntos").innerHTML = '<img class="imagen-pieza" src="images/final.png">';
}


//////////////////////////////////////////////////////////
////////A CONTINUACIÓN FUNCIONES YA IMPLEMENTADAS.////////
/////////NO TOCAR A MENOS QUE SEPAS LO QUE HACES//////////
//////////////////////////////////////////////////////////

/* Las funciones y variables que se encuentran a continuación ya están implementadas.
No hace falta que entiendas exactamente que es lo que hacen, ya que contienen
temas aún no vistos. De todas formas, cada una de ellas tiene un comentario
para que sepas que se está haciendo a grandes rasgos. NO LAS MODIFIQUES a menos que
entiendas perfectamente lo que estás haciendo! */

/* codigosDireccion es un objeto que te permite reemplazar
el uso de números confusos en tu código. Para referirte a la dir
izquierda, en vez de usar el número 37, ahora podés usar:
codigosDireccion.IZQUIERDA. Esto facilita mucho la lectura del código. */
var codigosDireccion = {
    IZQUIERDA: 37,
    ARRIBA: 38,
    DERECHA: 39,
    ABAJO: 40
}

/* Funcion que realiza el intercambio logico (en la grilla) y ademas actualiza
el intercambio en la pantalla (DOM). Para que funcione debera estar implementada
la funcion intercambiarPosicionesGrilla() */
function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
    // Intercambio posiciones en la grilla
    var pieza1 = grilla[fila1][columna1];
    var pieza2 = grilla[fila2][columna2];

    intercambiarPosicionesGrilla(fila1, columna1, fila2, columna2);
    intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);

}

/* Intercambio de posiciones de los elementos del DOM que representan
las fichas en la pantalla */

function intercambiarPosicionesDOM(idPieza1, idPieza2) {
    // Intercambio posiciones en el DOM
    var elementoPieza1 = document.getElementById(idPieza1);
    var elementoPieza2 = document.getElementById(idPieza2);

    var padre = elementoPieza1.parentNode;

    var clonElemento1 = elementoPieza1.cloneNode(true);
    var clonElemento2 = elementoPieza2.cloneNode(true);

    padre.replaceChild(clonElemento1, elementoPieza2);
    padre.replaceChild(clonElemento2, elementoPieza1);
}

/* Actualiza la representación visual del último movimiento 
en la pantalla, representado con una flecha. */
function actualizarUltimoMovimiento(direccion) {
    ultimoMov = document.getElementById('flecha');
    switch (direccion) {
        case codigosDireccion.ARRIBA:
            ultimoMov.textContent = '↑';
            break;
        case codigosDireccion.ABAJO:
            ultimoMov.textContent = '↓';
            break;
        case codigosDireccion.DERECHA:
            ultimoMov.textContent = '→';
            break;
        case codigosDireccion.IZQUIERDA:
            ultimoMov.textContent = '←';
            break;
    }
}

/* Esta función permite agregar una instrucción a la lista
con idLista. Se crea un elemento li dinámicamente con el texto 
pasado con el parámetro "instrucción". */
function mostrarInstruccionEnLista(instruccion, idLista) {
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}

/* Función que mezcla las piezas del tablero una cantidad de veces dada.
Se calcula una posición aleatoria y se mueve en esa dirección. De esta forma
se mezclará todo el tablero. */

function mezclarPiezas(veces) {
    if (veces <= 0) {
        return;
    }

    var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA,
        codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA
    ];

    var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
    moverEnDireccion(direccion);

    setTimeout(function() {
        mezclarPiezas(veces - 1);
    }, 100);
}

/* capturarTeclas: Esta función captura las teclas presionadas por el usuario. Javascript
permite detectar eventos, por ejemplo, cuando una tecla es presionada y en 
base a eso hacer algo. No es necesario que entiendas como funciona esto ahora, 
en el futuro ya lo vas a aprender. Por ahora, sólo hay que entender que cuando
se toca una tecla se hace algo en respuesta, en este caso, un movimiento */
function capturarTeclas() {
    document.body.onkeydown = (function(evento) {
        if (evento.which === codigosDireccion.ABAJO ||
            evento.which === codigosDireccion.ARRIBA ||
            evento.which === codigosDireccion.DERECHA ||
            evento.which === codigosDireccion.IZQUIERDA) {

            moverEnDireccion(evento.which);

            var gano = chequearSiGano();
            if (gano) {
                setTimeout(function() {
                    nombre = prompt("Por favor ingrese su nombre");
                    mostrarCartelGanador();
                    puntuaciones.push([nombre,puntuacion]);
                    
                }, 500);
            }
            evento.preventDefault();
        }
    })
}

function ordenarPuntuaciones(){
    var minIdx, temp, 
      len = puntuaciones.length;
  for(var i = 0; i < len; i++){
    minIdx = i;
    for(var  j = i+1; j<len; j++){
       if(puntuaciones[j][1]>puntuaciones[minIdx][1]){
          minIdx = j;
       }
    }
    temp = puntuaciones[i];
    puntuaciones[i] = puntuaciones[minIdx];
    puntuaciones[minIdx] = temp;
  }
}  
/* Se inicia el rompecabezas mezclando las piezas 60 veces 
y ejecutando la función para que se capturen las teclas que 
presiona el usuario */
function iniciar() {
    
    if(flag){
     mostrarInstrucciones(instrucciones);
     flag = false;
    }    
    mezclarPiezas(30);
    puntuacion = 5000;
    capturarTeclas();   
}


