document.addEventListener("DOMContentLoaded", function (event) {
    const getURL = "http://letausch.ffkledering.at:3000/notification/";

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

            fetch(getURL+userID)
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
                //notificationaction.addEventListener('click', putNot(data.n_id, data.), false);


                if (data.n_state === 1) {
                    if (userID === data.n_responder) {
                        notificationmessage.innerHTML = data.n_date + "       " + data.n_requester + " möchte gerne " + data.n_resarticle + " eintauschen."; // add as defined
                        notificationaction.innerHTML = "Eintauschen";
                        //notificationaction.setAttribute("onclick", "eintauschen()");
                        notificationaction.addEventListener("click", function(){
                            fetch("http://letausch.ffkledering.at:3000/article/user/" + userID)
                                .then(function(response){
                                    response.json()
                                        .then(function(json){
                                            for(let i = 0; i < json.length; i++){
                                                notificationaction.style.display="none";
                                                var element = document.createElement("p");
                                                element.setAttribute("id", "article"+i);
                                                element.innerHTML = json[i].a_title;

                                                var elementsub = document.createElement("button");
                                                elementsub.innerHTML = "Auswählen";

                                                //element.setAttribute("href", "http://letausch.ffkledering.at:3000/article/"+json[i].a_id)
                                                document.getElementById("notification"+data.n_id).appendChild(element);
                                                document.getElementById("notification"+data.n_id).appendChild(elementsub);

                                                elementsub.addEventListener('click', function(){
                                                    let putURL = getURL + data.n_id;

                                                    let current = new Date(Date.now());
                                                    let currentdateJSON =
                                                        current.getDate() + "." +
                                                        current.getMonth()+1 + "." +
                                                        current.getFullYear() + " " +
                                                        current.getHours() + ":" +
                                                        current.getMinutes() + ":" +
                                                        current.getSeconds();

                                                    fetch(putURL, {
                                                        method: "PUT",
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                        },
                                                        body: JSON.stringify({
                                                            "n_requester": data.n_requester,
                                                            "n_responder": data.n_responder,
                                                            "n_reqarticle": json[i].a_id, //data.n_reqarticle,
                                                            "n_resarticle": data.n_resarticle,
                                                            "n_state": 2,
                                                            "n_date": currentdateJSON
                                                        }),
                                                    })
                                                        .then(response => response.text())
                                                        .then(data => {
                                                            console.log("Notif PUT Success: ", data);
                                                            window.location.reload();
                                                        })
                                                        .catch((error) =>{
                                                            console.error("Notif PUT Error: ", error);
                                                        })
                                                }, false);
                                            }
                                        })
                                })

                        }, false);
                    } else if (userID === data.n_requester) {
                        notificationmessage.innerHTML = data.n_date + "       " + "Der Tausch für " + data.n_resarticle + " wurde bei " + data.n_responder + " angefragt."; // add as defined
                        notificationaction.style.display="none";
                    }
                }

                else if (data.n_state === 2) {
                    if (userID === data.n_responder) {
                        notificationmessage.innerHTML = data.n_date + "       " + "Der Tausch für " + data.n_resarticle + " gegen " + data.n_reqarticle + " wurde bei " + data.n_requester + " angefragt."; // add as defined
                        notificationaction.style.display="none";
                    }

                    else if (userID === data.n_requester) {
                        notificationmessage.innerHTML = data.n_date + "       " + data.n_responder + " möchte gerne " + data.n_resarticle + " gegen " + data.n_reqarticle + " mit dir tauschen."; // add as defined
                        notificationaction.innerHTML = "Annehmen";
                        notificationaction.addEventListener("click", addEventListener('click', function(){
                            let putURL = getURL + data.n_id;

                            let current = new Date(Date.now());
                            let currentdateJSON =
                                current.getDate() + "." +
                                current.getMonth()+1 + "." +
                                current.getFullYear() + " " +
                                current.getHours() + ":" +
                                current.getMinutes() + ":" +
                                current.getSeconds();

                            fetch(putURL, {
                                method: "PUT",
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    "n_requester": data.n_requester,
                                    "n_responder": data.n_responder,
                                    "n_reqarticle": data.n_reqarticle, //data.n_reqarticle,
                                    "n_resarticle": data.n_resarticle,
                                    "n_state": 3,
                                    "n_date": currentdateJSON
                                }),
                            })
                                .then(response => response.text())
                                .then(data => {
                                    console.log("Notif PUT Success: ", data);
                                    window.location.reload();
                                })
                                .catch((error) =>{
                                    console.error("Notif PUT Error: ", error);
                                })

                        }, false));
                    }
                }
                else if (data.n_state === 3) {
                    notificationaction.style.display="none";
                    if (userID === data.n_responder) {

                        notificationmessage.innerHTML = data.n_date + "       " + "Der Tausch für " + data.n_resarticle + " gegen " + data.n_reqarticle + " mit " + data.n_requester + " wurde bestätigt."; // add as defined

                        fetch("http://letausch.ffkledering.at:3000/users/" + data.n_requester)
                            .then(function (response) {
                                response.json()
                                    .then(function (json) {
                                        var element = document.createElement("p");
                                        element.setAttribute("id", "contact");
                                        if (json.u_tel != null) {
                                            element.innerHTML =
                                                "Kontaktdaten: Name: " + json.u_firstname + " " + json.u_lastname + ", \n" +
                                                "E-Mail: " + json.u_email + ", \n" +
                                                "Tel: " + json.u_tel;
                                        } else {
                                            element.innerHTML =
                                                "Kontaktdaten: Name: " + json.u_firstname + " " + json.u_lastname + ", \n" +
                                                "E-Mail: " + json.u_email;
                                        }
                                        document.getElementById("notification" + data.n_id).appendChild(element);
                                    })
                            });

                    } else if (userID === data.n_requester) {
                        notificationmessage.innerHTML = data.n_date + "       " + "Der Tausch für " + data.n_resarticle + " gegen " + data.n_reqarticle + " mit " + data.n_responder + " wurde bestätigt." ; // add as defined
                        //notificationaction.innerHTML = "Tausch abschließen";

                        fetch("http://letausch.ffkledering.at:3000/users/" + data.n_responder)
                            .then(function(response){
                                response.json()
                                    .then(function(json){
                                        var element = document.createElement("p");
                                        element.setAttribute("id", "contact");
                                        if(json.u_tel != ""){
                                            element.innerHTML =
                                                "Kontaktdaten: Name: " + json.u_firstname + " " + json.u_lastname + ", \n" +
                                                "E-Mail: " + json.u_email + ", \n" +
                                                "Tel: " + json.u_tel;
                                        } else{
                                            element.innerHTML =
                                                "Kontaktdaten: Name: " + json.u_firstname + " " + json.u_lastname + ", \n" +
                                                "E-Mail: " + json.u_email;
                                        }
                                        document.getElementById("notification"+data.n_id).appendChild(element);
                                    })
                            });
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
    //let display = new mainDisplay("roman@letausch.at");
    let display = new mainDisplay("bernhard@letausch.at");

    /*
    fetch("http://letausch.ffkledering.at:3000/whoami")
        .then(result => result.json())
        .then(data => {
            display = new mainDisplay(data.iam);
        })
        .catch(error => console.error(error));
    */
});