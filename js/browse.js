document.addEventListener("DOMContentLoaded", function (event) {
    const getURL = "http://localhost:3000/article";
    // const getURL = "http://letausch.ffkledering.at:3000/article";

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
        constructor() {
            this.articleDisplay = document.getElementById("articleDisplay");
            this.articles = [];
            this.chosenArticle = 0;

            fetch(getURL)
                .then(function(response){
                    response.json()
                        .then(function(json){
                            for(let i = 0; i < json.length; i++){
                                display.articles.push(new Article(json[i]));
                            }
                            display.displayAll();
                        })
                })
        }

        displayAll(){
            let data = display.articles;
            display.displayNone();
            for(let j = 0; j < data.length; j++){
                if(data[j].a_category === "Boardgame" || data[j].a_category === "Videogame" ||
                    data[j].a_category === "Book" || data[j].a_category === "Other"){
                    display.displayArticle(data[j]);
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

        displayDetailView(id){
            display.displayNone();
            for(let i = 0; i < display.articles.length; i++){
                if(id === display.articles[i].a_id){
                    if(display.articles[i].a_category === "Boardgame"){
                        display.displayBoardGame(display.articles[i]);
                    }
                    if(display.articles[i].a_category === "Videogame"){
                        display.displayVideoGame(display.articles[i]);
                    }
                    if(display.articles[i].a_category === "Book"){
                        display.displayBook(display.articles[i]);
                    }
                    if(display.articles[i].a_category === "Other"){
                        display.displayOther(display.articles[i]);
                    }
                }
            }
        }

        displayArticle(data){
            let article = document.createElement("article");
            article.setAttribute("class","articles");
            article.id = data.a_id;

            let imageLink = document.createElement("a");
            imageLink.id ="image_link_id_"+data.a_id;
            imageLink.href = '#';
            imageLink.addEventListener('click', function(){
                display.chosenArticle = data.a_id
                console.log(display.chosenArticle);
                display.displayDetailView(display.chosenArticle);
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
                display.displayDetailView(display.chosenArticle);
            }, false);

            let title = document.createElement("h2");
            title.innerHTML = data.a_title;
            titleLink.appendChild(title);
            article.appendChild(titleLink);

            let cat = document.createElement("p");
            cat.innerHTML = "Category: " + data.a_category;
            article.appendChild(cat);

            let pub = document.createElement("p");
            pub.innerHTML = "Trade offer placed on: " + new Date(data.a_publicationdate).toLocaleDateString();
            article.appendChild(pub);

            display.articleDisplay.appendChild(article);
        }

        displayBoardGame(data){
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
            cat.innerHTML = "Category: " + data.a_category;
            article.appendChild(cat);

            let pub = document.createElement("p");
            pub.innerHTML = "Trade offer placed on: " + new Date(data.a_publicationdate).toLocaleDateString();
            article.appendChild(pub);

            let auth = document.createElement("p");
            auth.innerHTML = "Designer: " + data.a_author;
            article.appendChild(auth);

            let genre = document.createElement("p");
            genre.innerHTML = "Genre: " + data.a_genre;
            article.appendChild(genre);

            let players = document.createElement("p");
            players.innerHTML = "Players: " + data.a_bgame_players;
            article.appendChild(players);

            let playtime = document.createElement("p");
            playtime.innerHTML = "Playing Time: " + data.a_bgame_playtime;
            article.appendChild(playtime);

            let desc = document.createElement("p");
            desc.innerHTML = "Description: " + data.a_description;
            article.appendChild(desc);

            let backButton = document.createElement("button");
            backButton.innerHTML = "Back";
            backButton.addEventListener('click', display.displayAll, false);
            article.appendChild(backButton);

            let requestButton = document.createElement("button");
            requestButton.innerHTML = "Request Trade";
            article.appendChild(requestButton);

            display.articleDisplay.appendChild(article);
        }

        displayVideoGame(data){
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
            cat.innerHTML = "Category: " + data.a_category;
            article.appendChild(cat);

            let pub = document.createElement("p");
            pub.innerHTML = "Trade offer placed on: " + new Date(data.a_publicationdate).toLocaleDateString();
            article.appendChild(pub);

            let auth = document.createElement("p");
            auth.innerHTML = "Developer: " + data.a_author;
            article.appendChild(auth);

            let platform = document.createElement("p");
            platform.innerHTML = "Platform: " + data.a_vgame_platform;
            article.appendChild(platform);

            let genre = document.createElement("p");
            genre.innerHTML = "Genre: " + data.a_genre;
            article.appendChild(genre);

            let desc = document.createElement("p");
            desc.innerHTML = "Description: " + data.a_description;
            article.appendChild(desc);

            let backButton = document.createElement("button");
            backButton.innerHTML = "Back";
            backButton.addEventListener('click', display.displayAll, false);
            article.appendChild(backButton);

            let requestButton = document.createElement("button");
            requestButton.innerHTML = "Request Trade";
            article.appendChild(requestButton);

            display.articleDisplay.appendChild(article);
        }

        displayBook(data){
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
            cat.innerHTML = "Category: " + data.a_category;
            article.appendChild(cat);

            let pub = document.createElement("p");
            pub.innerHTML = "Trade offer placed on: " + new Date(data.a_publicationdate).toLocaleDateString();
            article.appendChild(pub);

            let auth = document.createElement("p");
            auth.innerHTML = "Author: " + data.a_author;
            article.appendChild(auth);

            let isbn = document.createElement("p");
            isbn.innerHTML = "ISBN: " + data.a_books_isbn;
            article.appendChild(isbn);

            let desc = document.createElement("p");
            desc.innerHTML = "Description: " + data.a_description;
            article.appendChild(desc);

            let backButton = document.createElement("button");
            backButton.innerHTML = "Back";
            backButton.addEventListener('click', display.displayAll, false);
            article.appendChild(backButton);

            let requestButton = document.createElement("button");
            requestButton.innerHTML = "Request Trade";
            article.appendChild(requestButton);

            display.articleDisplay.appendChild(article);
        }

        displayOther(data){
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
            cat.innerHTML = "Category: " + data.a_category;
            article.appendChild(cat);

            let pub = document.createElement("p");
            pub.innerHTML = "Trade offer placed on: " + new Date(data.a_publicationdate).toLocaleDateString();
            article.appendChild(pub);

            let desc = document.createElement("p");
            desc.innerHTML = "Description: " + data.a_description;
            article.appendChild(desc);

            let backButton = document.createElement("button");
            backButton.innerHTML = "Back";
            backButton.addEventListener('click', display.displayAll, false);
            article.appendChild(backButton);

            let requestButton = document.createElement("button");
            requestButton.innerHTML = "Request Trade";
            article.appendChild(requestButton);

            display.articleDisplay.appendChild(article);
        }

    }

    let display = new mainDisplay();

    // let bgameLink = document.getElementById("cat_bgames");
    // bgameLink.addEventListener('click', function(){
    //     console.log("TEST");
    // }, false);
    //
    // let vgameLink = document.getElementById("cat_vgames");
    // vgameLink.addEventListener('click', function(){
    //
    // }, false);
    //
    // let bookLink = document.getElementById("cat_books");
    // bookLink.addEventListener('click', function(){
    //
    // }, false);
    //
    // let otherLink = document.getElementById("cat_other");
    // otherLink.addEventListener('click', function(){
    //
    // }, false);

});