let counter = 3;

var getJSON = function(url, callback) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';

    xhr.onload = function () {
        //HTTP Status
        var status = xhr.status;

        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    }
    xhr.send();
}

function logIn(){
    // Get the Creds!
    let typedInUsername = document.getElementById("username").value;
    let typedInPassword = document.getElementById("password").value;

    if(typedInUsername == "" || typedInPassword == ""){
        document.getElementById("messages").innerHTML = "Bitte füllen Sie alle Felder aus!"
    }
    else {
        getJSON("http://letausch.ffkledering.at:3000/users/" + typedInUsername, function (err, data) {
            if (err != null) {
                console.error(err);
                document.getElementById("messages").innerHTML = "Sie sind noch nicht registriert. Bitte legen Sie einen Account an!"
            } else {
                var mydata = data;
                if (mydata.u_email == typedInUsername && mydata.u_pw == typedInPassword) {
                    window.open("browse.html", "_self");
                } else {
                    document.getElementById("messages").innerHTML = "Falsche Credentials!"
                }
            }
        });
    }
}

