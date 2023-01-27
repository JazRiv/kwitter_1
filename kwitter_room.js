
//AÑADE TUS ENLACES DE FIREBASE
// Your web app's Firebase configuration
var firebaseConfig = {
      apiKey: "AIzaSyBDQGafODwEv7lXzionnV_9sIXDDCigcsQ",
      authDomain: "kwitter-55dcf.firebaseapp.com",
      projectId: "kwitter-55dcf",
      storageBucket: "kwitter-55dcf.appspot.com",
      messagingSenderId: "845942669933",
      appId: "1:845942669933:web:5a0baef49d768d04acf564"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    //Guardar de manera local en nombre del usuario
    user_name = localStorage.getItem("user_name");

    //Agregamos saludo y nombre de usuario al inicio de nuestra pantalla
    document.getElementById("user_name").innerHTML="Welcome " + user_name;

    function addRoom(){
      //Agrega el nombre y el valor a nuestra nueva sala
      room_name = document.getElementById("room_name").value;

      //Crea una sala en firebase o en la base de datos con un nombre especifico
      firebase.database().ref("/").child(room_name).update({
            purpose:"Adding Room Name"
      });

      //Guarda el nombre de la nueva sala y va a aparecer en nuestra pantalla kwitter_page
      localStorage.setItem("room_name", room_name);
      window.location = "kwitter_page.html";
    }
//Se obtienen los datos de los nombres de las salas, las salas en tendencia 
function getData() {
      firebase.database().ref("/" + room_name).on('value', function(snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function(childSnapshot) {
            childKey  = childSnapshot.key;
            childData = childSnapshot.val;
            if (childKey != "purpose"){
               firebase_message_id = childKey;
               message_data = childData;
               
               console.log(firebase_message_id);
               console.log(message_data);
               name = message_data['name'];
               message = message_data['message'];
               like = message_data['like'];
               name_with_tag = "<h4>"+ name +" <img class='user_tick' src='tick.png'></h4>";
               message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
               like_button = "<button class='btn btn-warning' id="+ firebase_message_id + " onclick='updateLike(this.id)'>";
               span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
             //Inicio del código
               row = name_with_tag + message_with_tag + like_button + span_with_tag;
               document.getElementById("output").innerHTML + row;
      //Final del código
            }
      });
});
}
getData();

//Funcion para cerrar sesion 
function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace = "index.html";
}

function redirectionToRoomName(name){
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}