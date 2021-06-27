document.addEventListener("DOMContentLoaded", function (event) {
    const getURL = "http://letausch.ffkledering.at:3000/notification";

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
        constructor(userID) {
            this.notificationDisplay = document.getElementById("notificationDisplay");
            this.notifications = [];
            this.userID = userID;

            fetch(getURL + "/" + userID)
                .then(function(response){
                    response.json()
                        .then(function(json){
                            for(let i = 0; i < json.length; i++){
                                display.notifications.push(new Notification(json[i]));
                            }
                            display.displayAll(userID);
                        })
                })
        }

        putNotification(notifID, notif){
            let putURL = getURL + '/' + notifID;

            fetch(putURL, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(notif),
            })
                .then(response => response.text())
                .then(data => {
                    console.log("Notif PUT Success: ", data);
                    window.location.reload();
                })
                .catch((error) =>{
                    console.error("Notif PUT Error: ", error);
                })
        }

        displayAll(userID) {
            let data = display.notifications;
            display.displayNone();
            for (let j = 0; j < data.length; j++) {
                display.displayNotification(userID, data[j]);
            }
        }


        displayNone(){
            for(let i = 0; i < display.notifications.length; i++){
                if(document.getElementById(display.notifications[i].n_id)) {
                    display.notificationDisplay.removeChild(document.getElementById(display.notifications[i].n_id));
                }
            }
        }

        displayNotification(userID, data) {

            if(data.n_state != 4){

                let notification = document.createElement("article");
                notification.setAttribute("class", "notifications");
                notification.id = "notification"+data.n_id;

                let notificationmessage = document.createElement("p");
                notificationmessage.id = "notificationmessage"+data.n_id;

                let notificationaction = document.createElement("button");
                notificationaction.id = "notificationaction"+data.n_id;


                if (data.n_state == 1) {
                    if (userID == data.n_responder) {
                        notificationmessage.innerHTML = data.n_date + "       " + data.n_requester + " möchte gerne " + data.n_resarticle + " eintauschen."; // add as defined
                        notificationaction.innerHTML = "Eintauschen";
                        notificationaction.setAttribute("onclick", "eintauschen()");
                    } else if (userID == data.n_requester) {
                        notificationmessage.innerHTML = data.n_date + "       " + "Der Tausch für " + data.n_resarticle + " wurde bei " + data.n_responder + " angefragt."; // add as defined
                        notificationaction.style.display="none";
                    }
                }
                else if (data.n_state == 2) {
                    if (userID == data.n_responder) {
                        notificationmessage.innerHTML = data.n_date + "       " + "Der Tausch für " + data.n_resarticle + " gegen " + data.n_reqarticle + " wurde bei " + data.n_responder + " angefragt."; // add as defined
                        notificationaction.style.display="none";
                    } else if (userID == data.n_requester) {
                        notificationmessage.innerHTML = data.n_date + "       " + data.n_responder + " möchte gerne " + data.n_resarticle + " gegen " + data.n_reqarticle + " mit dir tauschen."; // add as defined
                        notificationaction.innerHTML = "Annehmen";
                        //notificationaction.setAttribute("onclick", "annehmen()");
                        notificationaction.addEventListener('click', function(){
                            let notif = new Notification(
                                data.n_id,
                                data.n_requester,
                                data.n_responder,
                                data.n_reqarticle,
                                data.n_resarticle,
                                3,
                                data.n_date
                            );
                            display.putNotification(data.n_id, notif)
                        }, false);
                    }
                }
                else if (data.n_state == 3) {
                    if (userID == data.n_responder) {
                        notificationmessage.innerHTML = data.n_date + "       " + "Der Tausch für " + data.n_resarticle + " gegen " + data.n_reqarticle + " wurde von " + data.n_responder + " bestätigt. Warte auf Bestätigung von dir."; // add as defined
                        notificationaction.innerHTML = "Bestätigen";
                        notificationaction.setAttribute("onclick", "kontaktdaten()");
                    } else if (userID == data.n_requester) {
                        notificationmessage.innerHTML = data.n_date + "       " + "Der Tausch für " + data.n_resarticle + " gegen " + data.n_reqarticle + " wurde von dir bestätigt. Warte auf Bestätigung von " + data.n_responder; // add as defined
                        notificationaction.style.display="none";
                    }

                }else{
                    notificationmessage.innerHTML = "No message.";
                    notificationaction.innerHTML = "no button";
                }
                document.getElementById("notificationDisplay").appendChild(notification);
                document.getElementById("notification"+data.n_id).appendChild(notificationmessage);
                document.getElementById("notification"+data.n_id).appendChild(notificationaction);

            }
        }
    }

    let display = new mainDisplay("roman@letausch.at");
    //let display = new mainDisplay("bernhard@letausch.at");


    /*
    fetch("http://letausch.ffkledering.at:3000/whoami")
        .then(result => result.json())
        .then(data => {
            display = new mainDisplay(data.iam);
        })
        .catch(error => console.error(error));
    */

});

function eintauschen() {
    displayNone();
}

function annehmen() {
    // PUSH STATUS n_state++
}

function kontaktdaten() {
    // PUSH STATUS n_state++ = 4 (disabled)
}
