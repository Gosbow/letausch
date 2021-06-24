function submitPersonalData() {

    var uname = document.getElementById("username").value;
    var pw = document.getElementById("password").value;
    var fn = document.getElementById("firstname").value;
    var ln = document.getElementById("lastname").value;
    var tel = document.getElementById("tel").value;

    if(uname == "" ||pw == "" || fn == "" || ln == "")
    {
        document.getElementById("messages").innerHTML = "Bitte füllen Sie alle Pflichtfelder aus!";
    } else{
        postRegData(uname, pw, fn, ln, tel);
        window.open("../browse.html", "_self");
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
    tel.setAttribute("type", "tel");

    firstname.setAttribute("placeholder", "Vorname");
    firstname.setAttribute("required", "");

    lastname.setAttribute("placeholder", "Nachname");
    lastname.setAttribute("required", "");

    var submit = document.getElementById("register");

    submit.setAttribute("onclick", "submitPersonalData()")
}

