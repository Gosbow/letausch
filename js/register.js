function submitPersonalData() {

    if(document.getElementById("username").value == "" ||
        document.getElementById("password").value == "" ||
        document.getElementById("firstname").value == "" ||
        document.getElementById("lastname").value == ""
    )
    {
        document.getElementById("messages").innerHTML = "Bitte füllen Sie alle Pflichtfelder aus!";
    } else{
        // PUSH USERNAME
        // PUSH PASSWORD
        // PUSH FIRSTNAME
        // PUSH LASTNAME

        window.open("../stoebern.html", "_self");
    }
}

function back(){
    window.open("index.html", "_self")
}

function register(){

    document.getElementById("loginregistermessage").innerHTML = "Bitte um Angabe Ihrer Daten!"

    var login = document.getElementById("login");
    login.setAttribute("onclick", "back()");

    var firstname = document.createElement("input");
    var lastname = document.createElement("input");
    var tel = document.createElement("input");
    var datasep = document.createElement("BR");
    var datasep2 = document.createElement("BR");


    document.getElementById("newfields").appendChild(firstname);
    document.getElementById("newfields").appendChild(lastname);
    document.getElementById("newfields").appendChild(tel);
    document.getElementById("newfields").appendChild(datasep);
    document.getElementById("newfields").appendChild(datasep2);

    tel.setAttribute("placeholder", "Telefonnummer (optional)");
    tel.setAttribute("required", "");
    tel.setAttribute("type", "tel")

    firstname.setAttribute("placeholder", "Vorname");
    firstname.setAttribute("required", "");

    lastname.setAttribute("placeholder", "Nachname");
    lastname.setAttribute("required", "");

    var submit = document.getElementById("register");

    submit.setAttribute("onclick", "submitPersonalData()")
}

