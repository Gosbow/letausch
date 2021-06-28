document.addEventListener("DOMContentLoaded", function (event) {
    // const getURL = "http://localhost:3000/article";
    const getURL = "http://letausch.ffkledering.at:3000/article";

    class Article{
        constructor(data) {
            this.a_id = data.a_id;
            this.a_title = data.a_title;
            this.a_category = data.a_category;
            this.a_description = data.a_description;
            this.a_publicationdate = data.a_publicationdate;
            this.a_genre = data.a_genre;
            this.a_author = data.a_author;
            this.a_vgame_platform = data.a_vgame_platform;
            this.a_bgame_players = data.a_bgame_players;
            this.a_bgame_playtime = data.a_bgame_playtime;
            this.a_books_isbn = data.a_books_isbn;
            this.a_imageurl = data.a_imageurl;
            this.a_u_email = data.a_u_email;
        }
    }

    class mainDisplay {
        constructor(userID) {
            this.articleDisplay = document.getElementById("articleDisplay");
            this.articles = [];
            this.userID = userID;
            this.chosenArticle = 0;

            fetch(getURL)
                .then(function(response){
                    response.json()
                        .then(function(json){
                            for(let i = 0; i < json.length; i++){
                                display.articles.push(new Article(json[i]));
                            }
                            display.displayAll(userID);
                        })
                })
        }

        displayAll(userID) {
            let path = window.location.pathname;
            let page = path.split("/").pop();
            console.log(page);

            let data = display.articles;
            display.displayNone();
            for (let j = 0; j < data.length; j++) {
                if (page === "browse.html") {
                    if (data[j].a_category === "Board Games" || data[j].a_category === "Video Games" ||
                        data[j].a_category === "Books" || data[j].a_category === "Other") {
                        display.displayArticle(userID, data[j]);
                    }
                }
                if (page === "boardgames.html" && data[j].a_category === "Board Games") {
                    display.displayArticle(userID, data[j]);
                }
                if (page === "videogames.html" && data[j].a_category === "Video Games") {
                    display.displayArticle(userID, data[j]);
                }
                if (page === "books.html" && data[j].a_category === "Books") {
                    display.displayArticle(userID, data[j]);
                }
                if (page === "others.html" && data[j].a_category === "Other") {
                    display.displayArticle(userID, data[j]);
                }
            }
        }


        displayNone(){
            for(let i = 0; i < display.articles.length; i++){
                if(document.getElementById(display.articles[i].a_id)) {
                    display.articleDisplay.removeChild(document.getElementById(display.articles[i].a_id));
                }
            }
        }

        displayDetailView(userID, id){
            display.displayNone();
            for(let i = 0; i < display.articles.length; i++){
                if(id === display.articles[i].a_id){
                    if(display.articles[i].a_category === "Board Games"){
                        display.displayBoardGame(userID, display.articles[i]);
                    }
                    if(display.articles[i].a_category === "Video Games"){
                        display.displayVideoGame(userID, display.articles[i]);
                    }
                    if(display.articles[i].a_category === "Books"){
                        display.displayBook(userID, display.articles[i]);
                    }
                    if(display.articles[i].a_category === "Other"){
                        display.displayOther(userID, display.articles[i]);
                    }
                }
            }
        }

        displayArticle(userID, data){
            let article = document.createElement("article");
            article.setAttribute("class","articles");
            article.id = data.a_id;

            let imageLink = document.createElement("a");
            imageLink.id ="image_link_id_"+data.a_id;
            imageLink.href = '#';
            imageLink.addEventListener('click', function(){
                display.chosenArticle = data.a_id
                console.log(display.chosenArticle);
                display.displayDetailView(userID, display.chosenArticle);
            }, false);

            let image = document.createElement("img");
            image.src = data.a_imageurl;
            image.alt = data.a_title + " cover/artwork";
            imageLink.appendChild(image)
            article.appendChild(imageLink);

            let titleLink = document.createElement("a");
            titleLink.id ="title_link_id"+data.a_id;
            titleLink.href = '#';
            titleLink.addEventListener('click', function(){
                display.chosenArticle = data.a_id
                console.log(display.chosenArticle);
                display.displayDetailView(userID, display.chosenArticle);
            }, false);

            let title = document.createElement("h2");
            title.innerHTML = data.a_title;
            titleLink.appendChild(title);
            article.appendChild(titleLink);

            let cat = document.createElement("p");
            let b1 = document.createElement("b");
            b1.innerHTML= "Category: ";
            cat.appendChild(b1);
            cat.appendChild(document.createTextNode(data.a_category));
            article.appendChild(cat);

            let pub = document.createElement("p");
            let b2 = document.createElement("b");
            b2.innerHTML= "Trade offer placed on: ";
            pub.appendChild(b2);
            pub.appendChild(document.createTextNode(new Date(Date.parse(data.a_publicationdate)).toLocaleDateString("en-UK", {timeZone: "Europe/Vienna"})));
            article.appendChild(pub);

            display.articleDisplay.appendChild(article);
        }

        displayBoardGame(userID, data){
            let article = document.createElement("article");
            article.setAttribute("class","articles");
            article.id = data.a_id;

            let image = document.createElement("img");
            image.src = data.a_imageurl;
            image.alt = data.a_title + " cover/artwork";
            article.appendChild(image);

            let title = document.createElement("a");
            let titleText = document.createElement("h2");
            titleText.innerHTML = data.a_title;
            title.appendChild(titleText);
            article.appendChild(title);

            let cat = document.createElement("p");
            let b1 = document.createElement("b");
            b1.innerHTML= "Category: ";
            cat.appendChild(b1);
            cat.appendChild(document.createTextNode(data.a_category));
            article.appendChild(cat);

            let pub = document.createElement("p");
            let b2 = document.createElement("b");
            b2.innerHTML= "Trade offer placed on: ";
            pub.appendChild(b2);
            pub.appendChild(document.createTextNode(new Date(Date.parse(data.a_publicationdate)).toLocaleDateString("en-UK", {timeZone: "Europe/Vienna"})));
            article.appendChild(pub);

            let auth = document.createElement("p");
            let b3 = document.createElement("b");
            b3.innerHTML= "Designer: ";
            auth.appendChild(b3);
            auth.appendChild(document.createTextNode(data.a_author));
            article.appendChild(auth);

            let genre = document.createElement("p");
            let b4 = document.createElement("b");
            b4.innerHTML= "Genre: ";
            genre.appendChild(b4);
            genre.appendChild(document.createTextNode(data.a_genre));
            article.appendChild(genre);

            let players = document.createElement("p");
            let b5 = document.createElement("b");
            b5.innerHTML= "Players: ";
            players.appendChild(b5);
            players.appendChild(document.createTextNode(data.a_bgame_players));
            article.appendChild(players);

            let playtime = document.createElement("p");
            let b6 = document.createElement("b");
            b6.innerHTML= "Playing Time: ";
            playtime.appendChild(b6);
            playtime.appendChild(document.createTextNode(data.a_bgame_playtime));
            article.appendChild(playtime);

            let desc = document.createElement("p");
            let b7 = document.createElement("b");
            b7.innerHTML= "Description: ";
            desc.appendChild(b7);
            desc.appendChild(document.createTextNode(data.a_description));
            article.appendChild(desc);

            let backButton = document.createElement("button");
            backButton.innerHTML = "Back";
            backButton.addEventListener('click', display.displayAll, false);
            article.appendChild(backButton);

            let requestButton = document.createElement("button");
            requestButton.innerHTML = "Request Trade";
            requestButton.addEventListener('click', function(){

                let current = new Date(Date.now());
                let currentdateJSON =
                    current.getDate() + "." +
                    current.getMonth()+1 + "." +
                    current.getFullYear() + " " +
                    current.getHours() + ":" +
                    current.getMinutes() + ":" +
                    current.getSeconds();

                fetch("http://letausch.ffkledering.at:3000/notification", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            "n_requester": userID,
                            "n_responder": data.a_u_email,
                            "n_reqarticle": null,
                            "n_resarticle": data.a_id,
                            "n_state": 1,
                            "n_date": currentdateJSON
                        }
                    ),
                })
                    .then(response => response.text())
                    .then(data => {
                        console.log("Boardgame POST Success: ", data);
                    })
                    .catch((error) =>{
                        console.error("Boardgame POST Error: ", error);
                    })


            }, false);

            article.appendChild(requestButton);
            display.articleDisplay.appendChild(article);
        }

        displayVideoGame(userID, data){
            let article = document.createElement("article");
            article.setAttribute("class","articles");
            article.id = data.a_id;

            let image = document.createElement("img");
            image.src = data.a_imageurl;
            image.alt = data.a_title + " cover/artwork";
            article.appendChild(image);

            let title = document.createElement("a");
            let titleText = document.createElement("h2");
            titleText.innerHTML = data.a_title;
            title.appendChild(titleText);
            article.appendChild(title);

            let cat = document.createElement("p");
            let b1 = document.createElement("b");
            b1.innerHTML= "Category: ";
            cat.appendChild(b1);
            cat.appendChild(document.createTextNode(data.a_category));
            article.appendChild(cat);

            let pub = document.createElement("p");
            let b2 = document.createElement("b");
            b2.innerHTML= "Trade offer placed on: ";
            pub.appendChild(b2);
            pub.appendChild(document.createTextNode(new Date(Date.parse(data.a_publicationdate)).toLocaleDateString("en-UK", {timeZone: "Europe/Vienna"})));
            article.appendChild(pub);

            let auth = document.createElement("p");
            let b3 = document.createElement("b");
            b3.innerHTML= "Developer: ";
            auth.appendChild(b3);
            auth.appendChild(document.createTextNode(data.a_author));
            article.appendChild(auth);

            let platform = document.createElement("p");
            let b6 = document.createElement("b");
            b6.innerHTML= "Platform: ";
            platform.appendChild(b6);
            platform.appendChild(document.createTextNode(data.a_vgame_platform));
            article.appendChild(platform);

            let genre = document.createElement("p");
            let b4 = document.createElement("b");
            b4.innerHTML= "Genre: ";
            genre.appendChild(b4);
            genre.appendChild(document.createTextNode(data.a_genre));
            article.appendChild(genre);

            let desc = document.createElement("p");
            let b7 = document.createElement("b");
            b7.innerHTML= "Description: ";
            desc.appendChild(b7);
            desc.appendChild(document.createTextNode(data.a_description));
            article.appendChild(desc);

            let backButton = document.createElement("button");
            backButton.innerHTML = "Back";
            backButton.addEventListener('click', display.displayAll, false);
            article.appendChild(backButton);

            let requestButton = document.createElement("button");
            requestButton.innerHTML = "Request Trade";
            requestButton.addEventListener('click', function(){

                let current = new Date(Date.now());
                let currentdateJSON =
                    current.getDate() + "." +
                    current.getMonth()+1 + "." +
                    current.getFullYear() + " " +
                    current.getHours() + ":" +
                    current.getMinutes() + ":" +
                    current.getSeconds();

                fetch("http://letausch.ffkledering.at:3000/notification", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            "n_requester": userID,
                            "n_responder": data.a_u_email,
                            "n_reqarticle": null,
                            "n_resarticle": data.a_id,
                            "n_state": 1,
                            "n_date": currentdateJSON
                        }
                    ),
                })
                    .then(response => response.text())
                    .then(data => {
                        console.log("Boardgame POST Success: ", data);
                    })
                    .catch((error) =>{
                        console.error("Boardgame POST Error: ", error);
                    })


            }, false);
            article.appendChild(requestButton);

            display.articleDisplay.appendChild(article);
        }

        displayBook(userID, data){
            let article = document.createElement("article");
            article.setAttribute("class","articles");
            article.id = data.a_id;

            let image = document.createElement("img");
            image.src = data.a_imageurl;
            image.alt = data.a_title + " cover/artwork";
            article.appendChild(image);

            let title = document.createElement("a");
            let titleText = document.createElement("h2");
            titleText.innerHTML = data.a_title;
            title.appendChild(titleText);
            article.appendChild(title);

            let cat = document.createElement("p");
            let b1 = document.createElement("b");
            b1.innerHTML= "Category: ";
            cat.appendChild(b1);
            cat.appendChild(document.createTextNode(data.a_category));
            article.appendChild(cat);

            let pub = document.createElement("p");
            let b2 = document.createElement("b");
            b2.innerHTML= "Trade offer placed on: ";
            pub.appendChild(b2);
            pub.appendChild(document.createTextNode(new Date(Date.parse(data.a_publicationdate)).toLocaleDateString("en-UK", {timeZone: "Europe/Vienna"})));
            article.appendChild(pub);

            let auth = document.createElement("p");
            let b3 = document.createElement("b");
            b3.innerHTML= "Author: ";
            auth.appendChild(b3);
            auth.appendChild(document.createTextNode(data.a_author));
            article.appendChild(auth);

            let isbn = document.createElement("p");
            let b4 = document.createElement("b");
            b4.innerHTML= "ISBN: ";
            isbn.appendChild(b4);
            isbn.appendChild(document.createTextNode(data.a_books_isbn));
            article.appendChild(isbn);

            let desc = document.createElement("p");
            let b7 = document.createElement("b");
            b7.innerHTML= "Description: ";
            desc.appendChild(b7);
            desc.appendChild(document.createTextNode(data.a_description));
            article.appendChild(desc);

            let backButton = document.createElement("button");
            backButton.innerHTML = "Back";
            backButton.addEventListener('click', display.displayAll, false);
            article.appendChild(backButton);

            let requestButton = document.createElement("button");
            requestButton.innerHTML = "Request Trade";
            requestButton.addEventListener('click', function(){

                let current = new Date(Date.now());
                let currentdateJSON =
                    current.getDate() + "." +
                    current.getMonth()+1 + "." +
                    current.getFullYear() + " " +
                    current.getHours() + ":" +
                    current.getMinutes() + ":" +
                    current.getSeconds();

                fetch("http://letausch.ffkledering.at:3000/notification", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            "n_requester": userID,
                            "n_responder": data.a_u_email,
                            "n_reqarticle": null,
                            "n_resarticle": data.a_id,
                            "n_state": 1,
                            "n_date": currentdateJSON
                        }
                    ),
                })
                    .then(response => response.text())
                    .then(data => {
                        console.log("Boardgame POST Success: ", data);
                    })
                    .catch((error) =>{
                        console.error("Boardgame POST Error: ", error);
                    })


            }, false);


            article.appendChild(requestButton);

            display.articleDisplay.appendChild(article);
        }

        displayOther(userID, data){
            let article = document.createElement("article");
            article.setAttribute("class","articles");
            article.id = data.a_id;

            let image = document.createElement("img");
            image.src = data.a_imageurl;
            image.alt = data.a_title + " cover/artwork";
            article.appendChild(image);

            let title = document.createElement("a");
            let titleText = document.createElement("h2");
            titleText.innerHTML = data.a_title;
            title.appendChild(titleText);
            article.appendChild(title);

            let cat = document.createElement("p");
            let b1 = document.createElement("b");
            b1.innerHTML= "Category: ";
            cat.appendChild(b1);
            cat.appendChild(document.createTextNode(data.a_category));
            article.appendChild(cat);

            let pub = document.createElement("p");
            let b2 = document.createElement("b");
            b2.innerHTML= "Trade offer placed on: ";
            pub.appendChild(b2);
            pub.appendChild(document.createTextNode(new Date(Date.parse(data.a_publicationdate)).toLocaleDateString("en-UK", {timeZone: "Europe/Vienna"})));
            article.appendChild(pub);

            let desc = document.createElement("p");
            let b7 = document.createElement("b");
            b7.innerHTML= "Description: ";
            desc.appendChild(b7);
            desc.appendChild(document.createTextNode(data.a_description));
            article.appendChild(desc);

            let backButton = document.createElement("button");
            backButton.innerHTML = "Back";
            backButton.addEventListener('click', display.displayAll, false);
            article.appendChild(backButton);

            let requestButton = document.createElement("button");
            requestButton.innerHTML = "Request Trade";
            requestButton.addEventListener('click', function(){

                let current = new Date(Date.now());
                let currentdateJSON =
                    current.getDate() + "." +
                    current.getMonth()+1 + "." +
                    current.getFullYear() + " " +
                    current.getHours() + ":" +
                    current.getMinutes() + ":" +
                    current.getSeconds();

                fetch("http://letausch.ffkledering.at:3000/notification", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            "n_requester": userID,
                            "n_responder": data.a_u_email,
                            "n_reqarticle": null,
                            "n_resarticle": data.a_id,
                            "n_state": 1,
                            "n_date": currentdateJSON
                        }
                    ),
                })
                    .then(response => response.text())
                    .then(data => {
                        console.log("Boardgame POST Success: ", data);
                    })
                    .catch((error) =>{
                        console.error("Boardgame POST Error: ", error);
                    })


            }, false);

            article.appendChild(requestButton);

            display.articleDisplay.appendChild(article);
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