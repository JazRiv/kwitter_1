/*Definimos la funcion, se obtiene el nombre del usuario del cuadro de entrada y se almacena en un variable, se almacena 
el valor de la variable en el valorde la variable en el almacenamiento local y se redirige a la pagina kwitter_room,html*/
/*function log_in(){
    user_name = document.getElementById("user_name").value;
    localStorage.setItem("user_name", name_user);
    window.location = "kwitter_room.html";
}*/

function addUser(){
    user_name = document.getElementById("user_name").value;
    localStorage.setItem("user_name", user_name);
    window.location = "kwitter_room.html";
}