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
  user_name = localStorage.getItem("User_Name");
  room_name = localStorage.getItem("room_name");

  //Agregamos saludo y nombre de usuario al inicio de nuestra pantalla
  //document.getElementById("wel_come").innerHTML="Welcome " + user_name; 

  function send(){
    msg = document.getElementById("msg").value;

    //Para guardar los datos en firebase usando push con un nombre secundario aleatorio
    firebase.database().ref(room_name).push({
        name:user_name,
        message:msg,
        like:0
    });

document.getElementById("msg").value = "";
  }

  function get_Data(){
    firebase.database().ref("/" + room_name).on("value", function(snapshot){
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot){
            child_key = childSnapshot.key;
            child_data = childSnapshot.val();

            if (child_key != "purpose"){
              firebase_message_id = childKey;
              message_data = child_data;

              console.log(firebase_message_id);
              console.log(message_data);

              name = message_data ['name'];
              message = message_data['message'];
              like = message_data['like'];

              name_with_tag = "<h4>" + name + "<img class='user_tick' src='tick.png' ></h4>";
              message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
              like_button = "<button class='btn btn-warning' id= " + firebase_message_id + " value = " + like + " onclick='updateLike(this.id)'><";
              span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like: " + like + "</span></button><hr>";

              row = name_with_tag + message_with_tag + like_button + span_with_tag;
              document.getElementById("output").innerHTML += row;
            }
        });
    });
        
    
  }
  get_Data();

  function updateLike(message_id){
    console.log("Haz click en el boton me gusta -" + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
      like: updated_likes
    });
  }

  function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("index.html");
  }