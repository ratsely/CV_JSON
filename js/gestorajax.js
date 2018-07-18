/**
 * Carga de manera asíncrona el contenido de una URL
 * url Url del recurso de internet que se desea procesar
 */
function cargar(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            gestionarRespuesta(this.responseText);
        } else if (this.readyState == 4) {
            gestionarError();
        }
    };
    xhttp.open("GET", url, true);//Si en vez de true indicamos false, la petición es síncrona
    xhttp.send();
}
/**
 * Se invoca cuando el proceso no ha finalizado con status 200
 */
function gestionarError(){
    location.href="error.html";
}
/**
 * Se invoca cuando el proceso ha finalizado con status 200
 * respuesta Texto de la respuesta
 */
function gestionarRespuesta(respuesta){
    document.getElementById("datos").textContent="";
    var tabla = document.getElementById("tabla");

    let informacion = JSON.parse(respuesta);

    var email = document.createElement("p");
    var descripcion = document.createElement("p");
    var nombre = document.createElement("p");
    var idiomas = informacion.cv.idiomas;

    idiomas.forEach(language => {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.innerHTML = language.idioma;
        var td2 = document.createElement("td");
        td2.innerHTML=language.nivel;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tabla.appendChild(tr);
        
    });


    email.textContent = "Email: " + informacion.cv.email;
    descripcion.textContent = "Descripción: " + informacion.cv.descripcion;
    nombre.textContent = "Nombre: " + informacion.cv.nombre;
    
    document.getElementById("datos").appendChild(nombre);
    document.getElementById("datos").appendChild(email);
    document.getElementById("datos").appendChild(descripcion);

    console.log(informacion);
    
}