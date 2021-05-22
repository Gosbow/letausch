let counter = 3;
function logIn(){
    // Get the Creds!
    let typedInUsername = document.getElementById("username").value;
    let typedInPassword = document.getElementById("password").value;

    // Static Uname!
    let username = "romano@mimimi.at";
    let password = "NotThi$Time!";

    if(typedInUsername == username && typedInPassword == password)
    {

        document.writeln("Herzlich Willkommen!");
    }else{
        counter--;
        document.getElementById("messages").innerHTML="Eingabe falsch!";
        if(counter == 0){
            alert("Sorry, wird geschlossen. Bekomme deine Creds oder bleib draussen!");
            window.close();
        }
    }

}