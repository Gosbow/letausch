var currentuser = "admin@letausch.com";

document.addEventListener("DOMContentLoaded", function (event) {
    const getURL = "http://letausch.ffkledering.at:3000/notification/" + currentuser;
    console.log(getURL);

    class Notification{
        constructor(data) {
            this.n_id = data.n_id;
            this.n_requester = data.n_requester;
            this.n_responder = data.n_responder;
            this.n_reqarticle = data.n_reqarticle;
            this.n_resarticle = data.n_resarticle;
            this.n_state = data.n_state;
            this.n_date = data.n_date;
        }
    }

    class mainDisplay {
        constructor() {
            this.notificationDisplay = document.getElementById("notificationDisplay");
            this.notifications = [];

            fetch(getURL)
                .then(function(response){
                    response.json()
                        .then(function(json){
                            for(let i = 0; i < json.length; i++){
                                display.notifications.push(new Notification(json[i]));
                            }
                            display.displayAll();
                        })
                })
        }

        displayAll() {
            let data = display.notifications;
            display.displayNone();
            for (let j = 0; j < data.length; j++) {
                display.displayNotification(data[j]);
            }
        }


        displayNone(){
            for(let i = 0; i < display.notifications.length; i++){
                if(document.getElementById(display.notifications[i].n_id)) {
                    display.notificationDisplay.removeChild(document.getElementById(display.notifications[i].n_id));
                }
            }
        }

        displayNotification(data) {

            if(data.n_state != 4){

                let notification = document.createElement("article");
                notification.setAttribute("class", "notifications");
                notification.id = "notification"+data.n_id;

                let notificationmessage = document.createElement("p");
                notificationmessage.id = "notificationmessage"+data.n_id;

                let notificationaction = document.createElement("button");
                notificationaction.id = "notificationaction"+data.n_id;


                if (data.n_state == 1) {
                    if (currentuser == data.n_responder) {
                        notificationmessage.innerHTML = data.n_date + "       " + data.n_requester + " möchte gerne + " + data.n_resarticle + " eintauschen."; // add as defined
                        notificationaction.innerHTML = "Eintauschen";
                        notificationaction.setAttribute("onclick", "eintauschen()");
                    } else if (currentuser == data.n_requester) {
                        notificationmessage.innerHTML = data.n_date + "       " + "Der Tausch für " + data.n_resarticle + " wurde bei " + data.n_responder + " angefragt."; // add as defined
                    }
                }
                else if (data.n_state == 2) {
                    if (currentuser == data.n_responder) {
                        notificationmessage.innerHTML = data.n_date + "       " + "Der Tausch für " + data.n_resarticle + " gegen " + data.n_reqarticle + " wurde bei " + data.n_responder + " angefragt."; // add as defined
                    } else if (currentuser == data.n_requester) {
                        notificationmessage.innerHTML = data.n_date + "       " + data.n_responder + " möchte gerne " + data.n_resarticle + " gegen " + data.n_reqarticle + " mit dir tauschen."; // add as defined
                        notificationaction.innerHTML = "Annehmen";
                        notificationaction.setAttribute("onclick", "annehmen()");
                    }
                }
                else if (data.n_state == 3) {
                    if (currentuser == data.n_responder) {
                        notificationmessage.innerHTML = data.n_date + "       " + "Der Tausch für " + data.n_resarticle + " gegen " + data.n_reqarticle + " wurde von " + data.n_responder + " bestätigt."; // add as defined
                        notificationaction.innerHTML = "Eintasuchen";
                        notificationaction.setAttribute("onclick", "kontaktdaten()");
                    } else if (currentuser == data.n_requester) {
                        notificationmessage.innerHTML = data.n_date + "       " + "Der Tausch für " + data.n_resarticle + " gegen " + data.n_reqarticle + " wurde von dir bestätigt. Warte auf Bestätigung von " + data.n_responder; // add as defined
                        notificationaction.innerHTML = "Annehmen";
                        notificationaction.setAttribute("onclick", "annehmen()");
                    }

                }else{
                    notificationmessage.innerHTML = "No message."; // add as defined
                    notificationaction.innerHTML = "no button";
                }
                document.getElementById("notificationDisplay").appendChild(notification);
                document.getElementById("notification"+data.n_id).appendChild(notificationmessage);
                document.getElementById("notification"+data.n_id).appendChild(notificationaction);

            }


        }
    }

    let display = new mainDisplay();

});





























/*
var getJSON = function(url, callback) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';

    xhr.onload = function () {
        //HTTP Status
        var n_state = xhr.n_state;

        if (n_state == 200) {
            callback(null, xhr.response);
        } else {
            callback(n_state);
        }
    }
    xhr.send();
}

function loadNotifications(){


    getJSON("http://letausch.ffkledering.at:3000/notification/" + currentuser, function (err, data) {
        if (err != null) {
            console.error(err);
            //document.getElementById("messages").innerHTML = "Sie sind noch nicht registriert. Bitte legen Sie einen Account an!"
        } else {
            var mydata = data;
            if (data.u_email == typedInUsername && mydata.u_pw == typedInPassword) {
                window.open("browse.html", "_self");
            } else {
                document.getElementById("messages").innerHTML = "Falsche Credentials!"
            }
        }
    });


    // GET ARTICLE TITLE A
    var titelA = "ABC";
    // GET ARTICLE TITLE B
    var titelB = "GGG";
    // GET REQUESTING USER A
    var userA = "Alice";
    // GET RESPONDING USER B
    var userB = "Bob";
    // GET STATUS
    var n_state = 0;

    var article = document.createElement("article");
    article.setAttribute("id", "atricle");

    var notificationaction = document.createElement("button");

    // <USER A> möchte gerne <TITLE B> eintauschen.                      <Eintauschen> --> POP UP mit Artikel von A wählen
    // <USER B> möchte gerne <TITLE A> gegen <TITLE B> mit dir tauschen. <Annehmen>    --> POP UP "warten auf bestätigung von A"
    // <USER B> hat den Tasuch <TITEL B> gegen <TITEL A> bestätigt.      <Kontaktdaten>--> POP UP Kontaktdaten
    // <USER A> hat den Tasuch <TITEL B> gegen <TITEL A> bestätigt.      <Kontaktdaten>--> POP UP Kontaktdaten

    var notification = document.createElement("p");


    if(n_state == 0){
        notification.innerHTML = "$userA möchte gerne <TITLE B> eintauschen."; // add as defined
        notificationaction.innerHTML = "Eintasuchen";
        notificationaction.setAttribute("onclick", "eintauschen()");
    }
    if(n_state == 1){
        notification.innerHTML = "<USER B> möchte gerne <TITLE A> gegen <TITLE B> mit dir tauschen."; // add as defined
        notificationaction.innerHTML = "Annehmen";
        notificationaction.setAttribute("onclick", "annehmen()");

    }
    if(n_state == 2){
        notification.innerHTML = "<USER A> hat den Tasuch <TITEL B> gegen <TITEL A> bestätigt."; // add as defined
        notificationaction.innerHTML = "Eintasuchen";
        notificationaction.setAttribute("onclick", "kontaktdaten()");
    }

    document.getElementById("content").appendChild(article);
    document.getElementById("article").appendChild(notification);
    document.getElementById("article").appendChild(notificationaction);
}

function eintauschen() {


    // PUSH STATUS n_state++
}

function annehmen() {


    // PUSH STATUS n_state++
}

function kontaktdaten() {


    // PUSH STATUS n_state++ = 4 (disabled)
}

loadPosts();

 */