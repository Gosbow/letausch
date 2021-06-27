function postRegData(uname, pw, fn, ln, tel){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://letausch.ffkledering.at:3000/users/", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        "u_email": uname, "u_pw": pw, "u_firstname": fn, "u_tel":tel, "u_lastname":ln
    }));
}

function submitPersonalData() {

    var uname = document.getElementById("username").value;
    var pw = document.getElementById("password").value;
    var fn = document.getElementById("firstname").value;
    var ln = document.getElementById("lastname").value;
    var tel = document.getElementById("tel").value;

    if(uname === "" ||pw === "" || fn === "" || ln === "")
    {
        document.getElementById("messages").innerHTML = "Bitte füllen Sie alle Pflichtfelder aus!";
    } else{
        postRegData(uname, pw, fn, ln, tel);
        document.getElementById("messages").innerHTML = "Registrierung erfolgreich! Bitte loggen Sie sich ein!";
    }
}

function back(){
    window.open("index.html", "_self")
}

function register(){

    document.getElementById("loginregistermessage").innerHTML = "Bitte um Angabe Ihrer Daten!"

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
    tel.required = true;
    tel.setAttribute("id", "tel");
    tel.setAttribute("type", "tel");

    firstname.setAttribute("placeholder", "Vorname");
    firstname.required = true;
    firstname.setAttribute("id", "firstname");

    lastname.setAttribute("placeholder", "Nachname");
    lastname.required = true;
    lastname.setAttribute("id", "lastname");

    var login = document.getElementById("login");
    login.setAttribute("onclick", "back()");

    var submit = document.getElementById("register");
    submit.setAttribute("onclick", "submitPersonalData()")
}