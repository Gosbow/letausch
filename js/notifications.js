document.addEventListener("DOMContentLoaded", function (event) {
    const getURL = "http://letausch.ffkledering.at:3000/notification/";
    const getArticleURL = "http://letausch.ffkledering.at:3000/article/";


    /**
     * We are very sorry for the lack of human readability in this js file :(
     */

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

            if(data.n_state !== 4){

                let notification = document.createElement("article");
                notification.setAttribute("class", "notifications");
                notification.id = "notification"+data.n_id;

                let notificationmessage = document.createElement("p");
                notificationmessage.id = "notificationmessage"+data.n_id;

                let notificationaction = document.createElement("button");
                notificationaction.id = "notificationaction"+data.n_id;
                //notificationaction.addEventListener('click', putNot(data.n_id, data.), false);

                let articlesArea = document.createElement("span");
                articlesArea.id = "articlesArea";

                fetch(getArticleURL + data.n_resarticle)
                    .then(function(response){
                        response.json()
                            .then(function(json_responder){
                if (data.n_state === 1) {
                    if (userID === data.n_responder) {
                        notificationmessage.innerHTML = data.n_date + "       " + data.n_requester + " möchte gerne \"" + json_responder.a_title + "\" eintauschen."; // add as defined
                        // notificationmessage.innerHTML = new Date(Date.parse(data.n_date)).toLocaleDateString("en-UK", {timeZone: "Europe/Vienna"}) + "       " + data.n_requester + " möchte gerne \"" + json_responder.a_title + "\" eintauschen."; // add as defined

                        notificationaction.innerHTML = "Eintauschen";
                        notificationaction.addEventListener("click", function(){
                            fetch("http://letausch.ffkledering.at:3000/article/user/" + data.n_requester)
                                .then(function(response){
                                    response.json()
                                        .then(function(json){
                                            for(let i = 0; i < json.length; i++){
                                                notificationaction.style.display="none";
//-----------------------------------------------------------------------------------------------------------------------------------------------
                                                if(json[i].a_category === "Board Games") {
                                                    let article = document.createElement("article");
                                                    article.setAttribute("class", "articles");
                                                    article.id = "article_" + json[i].a_id;

                                                    let image = document.createElement("img");
                                                    image.src = json[i].a_imageurl;
                                                    image.alt = json[i].a_title + " cover/artwork";
                                                    article.appendChild(image);

                                                    let title = document.createElement("a");
                                                    let titleText = document.createElement("h2");
                                                    titleText.innerHTML = json[i].a_title;
                                                    title.appendChild(titleText);
                                                    article.appendChild(title);

                                                    let cat = document.createElement("p");
                                                    let b1 = document.createElement("b");
                                                    b1.innerHTML= "Category: ";
                                                    cat.appendChild(b1);
                                                    cat.appendChild(document.createTextNode(json[i].a_category));
                                                    article.appendChild(cat);

                                                    let pub = document.createElement("p");
                                                    let b2 = document.createElement("b");
                                                    b2.innerHTML= "Trade offer placed on: ";
                                                    pub.appendChild(b2);
                                                    pub.appendChild(document.createTextNode(new Date(Date.parse(json[i].a_publicationdate)).toLocaleDateString("en-UK", {timeZone: "Europe/Vienna"})));
                                                    article.appendChild(pub);

                                                    let auth = document.createElement("p");
                                                    let b3 = document.createElement("b");
                                                    b3.innerHTML= "Designer: ";
                                                    auth.appendChild(b3);
                                                    auth.appendChild(document.createTextNode(json[i].a_author));
                                                    article.appendChild(auth);

                                                    let genre = document.createElement("p");
                                                    let b4 = document.createElement("b");
                                                    b4.innerHTML= "Genre: ";
                                                    genre.appendChild(b4);
                                                    genre.appendChild(document.createTextNode(json[i].a_genre));
                                                    article.appendChild(genre);

                                                    let players = document.createElement("p");
                                                    let b5 = document.createElement("b");
                                                    b5.innerHTML= "Players: ";
                                                    players.appendChild(b5);
                                                    players.appendChild(document.createTextNode(json[i].a_bgame_players));
                                                    article.appendChild(players);

                                                    let playtime = document.createElement("p");
                                                    let b6 = document.createElement("b");
                                                    b6.innerHTML= "Playing Time: ";
                                                    playtime.appendChild(b6);
                                                    playtime.appendChild(document.createTextNode(json[i].a_bgame_playtime));
                                                    article.appendChild(playtime);

                                                    let desc = document.createElement("p");
                                                    let b7 = document.createElement("b");
                                                    b7.innerHTML= "Description: ";
                                                    desc.appendChild(b7);
                                                    desc.appendChild(document.createTextNode(json[i].a_description));
                                                    article.appendChild(desc);

                                                    let reqButton = document.createElement("button");
                                                    reqButton.innerHTML = "Tauschen";
                                                    reqButton.addEventListener('click', function(){
                                                        let putURL = getURL + data.n_id;

                                                        let current = new Date(Date.now());
                                                        let currentdateJSON =
                                                            current.getDate() + "." +
                                                            current.getMonth()+1 + "." +
                                                            current.getFullYear() + " " +
                                                            current.getHours() + ":" +
                                                            current.getMinutes() + ":" +
                                                            current.getSeconds();
                                                        // let currentdateJSON = new Date().toISOString();

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
                                                    article.appendChild(reqButton);

                                                    articlesArea.appendChild(article);
                                                }

                                                else if(json[i].a_category === "Video Games"){
                                                    let article = document.createElement("article");
                                                    article.setAttribute("class","articles");
                                                    article.id = "article_" + json[i].a_id;

                                                    let image = document.createElement("img");
                                                    image.src = json[i].a_imageurl;
                                                    image.alt = json[i].a_title + " cover/artwork";
                                                    article.appendChild(image);

                                                    let title = document.createElement("a");
                                                    let titleText = document.createElement("h2");
                                                    titleText.innerHTML = json[i].a_title;
                                                    title.appendChild(titleText);
                                                    article.appendChild(title);

                                                    let cat = document.createElement("p");
                                                    let b1 = document.createElement("b");
                                                    b1.innerHTML= "Category: ";
                                                    cat.appendChild(b1);
                                                    cat.appendChild(document.createTextNode(json[i].a_category));
                                                    article.appendChild(cat);

                                                    let pub = document.createElement("p");
                                                    let b2 = document.createElement("b");
                                                    b2.innerHTML= "Trade offer placed on: ";
                                                    pub.appendChild(b2);
                                                    pub.appendChild(document.createTextNode(new Date(Date.parse(json[i].a_publicationdate)).toLocaleDateString("en-UK", {timeZone: "Europe/Vienna"})));
                                                    article.appendChild(pub);

                                                    let auth = document.createElement("p");
                                                    let b3 = document.createElement("b");
                                                    b3.innerHTML= "Developer: ";
                                                    auth.appendChild(b3);
                                                    auth.appendChild(document.createTextNode(json[i].a_author));
                                                    article.appendChild(auth);

                                                    let platform = document.createElement("p");
                                                    let b6 = document.createElement("b");
                                                    b6.innerHTML= "Platform: ";
                                                    platform.appendChild(b6);
                                                    platform.appendChild(document.createTextNode(json[i].a_vgame_platform));
                                                    article.appendChild(platform);

                                                    let genre = document.createElement("p");
                                                    let b4 = document.createElement("b");
                                                    b4.innerHTML= "Genre: ";
                                                    genre.appendChild(b4);
                                                    genre.appendChild(document.createTextNode(json[i].a_genre));
                                                    article.appendChild(genre);

                                                    let desc = document.createElement("p");
                                                    let b7 = document.createElement("b");
                                                    b7.innerHTML= "Description: ";
                                                    desc.appendChild(b7);
                                                    desc.appendChild(document.createTextNode(json[i].a_description));
                                                    article.appendChild(desc);

                                                    let reqButton = document.createElement("button");
                                                    reqButton.innerHTML = "Tauschen";
                                                    reqButton.addEventListener('click', function(){
                                                        let putURL = getURL + data.n_id;

                                                        let current = new Date(Date.now());
                                                        let currentdateJSON =
                                                            current.getDate() + "." +
                                                            current.getMonth()+1 + "." +
                                                            current.getFullYear() + " " +
                                                            current.getHours() + ":" +
                                                            current.getMinutes() + ":" +
                                                            current.getSeconds();
                                                        // let currentdateJSON = new Date().toISOString();

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
                                                    article.appendChild(reqButton);


                                                    articlesArea.appendChild(article);
                                                }

                                                if(json[i].a_category === "Books"){
                                                        let article = document.createElement("article");
                                                        article.setAttribute("class","articles");
                                                        article.id = "article_" + json[i].a_id;

                                                        let image = document.createElement("img");
                                                        image.src = json[i].a_imageurl;
                                                        image.alt = json[i].a_title + " cover/artwork";
                                                        article.appendChild(image);

                                                        let title = document.createElement("a");
                                                        let titleText = document.createElement("h2");
                                                        titleText.innerHTML = json[i].a_title;
                                                        title.appendChild(titleText);
                                                        article.appendChild(title);

                                                        let cat = document.createElement("p");
                                                        let b1 = document.createElement("b");
                                                        b1.innerHTML= "Category: ";
                                                        cat.appendChild(b1);
                                                        cat.appendChild(document.createTextNode(json[i].a_category));
                                                        article.appendChild(cat);

                                                        let pub = document.createElement("p");
                                                        let b2 = document.createElement("b");
                                                        b2.innerHTML= "Trade offer placed on: ";
                                                        pub.appendChild(b2);
                                                        pub.appendChild(document.createTextNode(new Date(Date.parse(json[i].a_publicationdate)).toLocaleDateString("en-UK", {timeZone: "Europe/Vienna"})));
                                                        article.appendChild(pub);

                                                        let auth = document.createElement("p");
                                                        let b3 = document.createElement("b");
                                                        b3.innerHTML= "Author: ";
                                                        auth.appendChild(b3);
                                                        auth.appendChild(document.createTextNode(json[i].a_author));
                                                        article.appendChild(auth);

                                                        let isbn = document.createElement("p");
                                                        let b4 = document.createElement("b");
                                                        b4.innerHTML= "ISBN: ";
                                                        isbn.appendChild(b4);
                                                        isbn.appendChild(document.createTextNode(json[i].a_books_isbn));
                                                        article.appendChild(isbn);

                                                        let desc = document.createElement("p");
                                                        let b7 = document.createElement("b");
                                                        b7.innerHTML= "Description: ";
                                                        desc.appendChild(b7);
                                                        desc.appendChild(document.createTextNode(json[i].a_description));
                                                        article.appendChild(desc);

                                                    let reqButton = document.createElement("button");
                                                    reqButton.innerHTML = "Tauschen";
                                                    reqButton.addEventListener('click', function(){
                                                        let putURL = getURL + data.n_id;

                                                        let current = new Date(Date.now());
                                                        let currentdateJSON =
                                                            current.getDate() + "." +
                                                            current.getMonth()+1 + "." +
                                                            current.getFullYear() + " " +
                                                            current.getHours() + ":" +
                                                            current.getMinutes() + ":" +
                                                            current.getSeconds();
                                                        // let currentdateJSON = new Date().toISOString();

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
                                                    article.appendChild(reqButton);


                                                    articlesArea.appendChild(article);
                                                    }

                                                if(json[i].a_category === "Other"){
                                                        let article = document.createElement("article");
                                                        article.setAttribute("class","articles");
                                                        article.id = "article_" + json[i].a_id;

                                                        let image = document.createElement("img");
                                                        image.src = json[i].a_imageurl;
                                                        image.alt = json[i].a_title + " cover/artwork";
                                                        article.appendChild(image);

                                                        let title = document.createElement("a");
                                                        let titleText = document.createElement("h2");
                                                        titleText.innerHTML = json[i].a_title;
                                                        title.appendChild(titleText);
                                                        article.appendChild(title);

                                                        let cat = document.createElement("p");
                                                        let b1 = document.createElement("b");
                                                        b1.innerHTML= "Category: ";
                                                        cat.appendChild(b1);
                                                        cat.appendChild(document.createTextNode(json[i].a_category));
                                                        article.appendChild(cat);

                                                        let pub = document.createElement("p");
                                                        let b2 = document.createElement("b");
                                                        b2.innerHTML= "Trade offer placed on: ";
                                                        pub.appendChild(b2);
                                                        pub.appendChild(document.createTextNode(new Date(Date.parse(json[i].a_publicationdate)).toLocaleDateString("en-UK", {timeZone: "Europe/Vienna"})));
                                                        article.appendChild(pub);

                                                        let desc = document.createElement("p");
                                                        let b7 = document.createElement("b");
                                                        b7.innerHTML= "Description: ";
                                                        desc.appendChild(b7);
                                                        desc.appendChild(document.createTextNode(json[i].a_description));
                                                        article.appendChild(desc);

                                                        let reqButton = document.createElement("button");
                                                        reqButton.innerHTML = "Tauschen";
                                                        reqButton.addEventListener('click', function(){
                                                            let putURL = getURL + data.n_id;

                                                            let current = new Date(Date.now());
                                                            let currentdateJSON =
                                                                current.getDate() + "." +
                                                                current.getMonth()+1 + "." +
                                                                current.getFullYear() + " " +
                                                                current.getHours() + ":" +
                                                                current.getMinutes() + ":" +
                                                                current.getSeconds();
                                                            // let currentdateJSON = new Date().toISOString();

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
                                                        article.appendChild(reqButton);

                                                        articlesArea.appendChild(article);
                                                    }
                                                }
//-----------------------------------------------------------------------------------------------------------------------------------------------
                                        })
                                })

                        }, false);
                    } else if (userID === data.n_requester) {
                        notificationmessage.innerHTML = data.n_date + "       " + "Der Tausch für \"" + json_responder.a_title + "\" wurde bei " + data.n_responder + " angefragt."; // add as defined
                        notificationaction.style.display="none";
                    }
                }



                else if (data.n_state === 2) {
                    fetch(getArticleURL + data.n_reqarticle)
                        .then(function(response){
                            response.json()
                                .then(function(json_requester){

                                if (userID === data.n_responder) {
                                    notificationmessage.innerHTML = data.n_date + "       " + "Der Tausch für \"" + json_responder.a_title + "\" gegen \"" + json_requester.a_title + "\" wurde bei " + data.n_requester + " angefragt."; // add as defined
                                    notificationaction.style.display="none";
                                }

                                else if (userID === data.n_requester) {
                                    notificationmessage.innerHTML = data.n_date + "       " + data.n_responder + " möchte gerne \"" + json_responder.a_title + "\" gegen \"" + json_requester.a_title + "\" mit dir tauschen."; // add as defined
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
                                        // let currentdateJSON = new Date().toISOString();

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
                            })
                        })
                }
                else if (data.n_state === 3) {
                    fetch(getArticleURL + data.n_reqarticle)
                        .then(function(response){
                            response.json()
                                .then(function(json_requester){

                    notificationaction.style.display="none";
                    if (userID === data.n_responder) {

                        notificationmessage.innerHTML = data.n_date + "       " + "Der Tausch für \"" + json_responder.a_title + "\" gegen \"" + json_requester.a_title + "\" mit " + data.n_requester + " wurde bestätigt."; // add as defined

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
                        notificationmessage.innerHTML = data.n_date + "       " + "Der Tausch für \"" + json_responder.a_title + "\" gegen \"" + json_requester.a_title + "\" mit " + data.n_responder + " wurde bestätigt." ; // add as defined
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
                        })
                    })
                }else{
                    notificationmessage.innerHTML = "No message.";
                    notificationaction.innerHTML = "no button";
                }
                document.getElementById("notificationDisplay").appendChild(notification);
                document.getElementById("notification"+data.n_id).appendChild(notificationmessage);
                document.getElementById("notification"+data.n_id).appendChild(notificationaction);
                document.getElementById("notification"+data.n_id).appendChild(articlesArea);
                    })
                })

            }
        }
    }

    let display;
    fetch("http://letausch.ffkledering.at:3000/whoami")
        .then(result => result.json())
        .then(data => {
            display = new mainDisplay(data.iam);
        })
        .catch(error => console.error(error));

});