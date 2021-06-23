document.addEventListener("DOMContentLoaded", function (event) {
    const getURL = "http://localhost:3000/article";

    class Article{
        constructor(data) {
            this.a_id = data.a_id;
            this.a_title = data.a_title;
            this.a_category = data.a_category;
            this.a_description = data.a_description;
            this.a_publicationdate = data.a_publicationdate;
            this.a_genre = data.a_genre;
            this.a_author = data.a_author;
            this.a_vgame_plattform = data.a_vgame_plattform;
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
            let articles = [];

            fetch(getURL)
                .then(function(response){
                    response.json()
                        .then(function(json){
                            for(let i = 0; i < json.length; i++){
                                articles.push(new Article(json[i]));
                            }
                            display.displayAll(articles);
                        })
                })
        }

        displayAll(data){
            for(let j = 0; j < data.length; j++){
                if(data[j].a_category === "Boardgame"){
                    display.displayBoardGame(data[j]);
                }
                if(data[j].a_category === "Videogame"){
                    display.displayVideoGame(data[j]);
                }
                if(data[j].a_category === "Book"){
                    // display.displayBook(data[j]);
                }
                if(data[j].a_category === "Other"){
                    // display.displayOther(data[j]);
                }
            }
        }

        displayBoardGame(data){
            let article = document.createElement("article");
            article.class = "articles";
            article.id = data.id;

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

            display.articleDisplay.appendChild(article);
        }

        displayVideoGame(data){
            let article = document.createElement("article");
            article.class = "articles";
            article.id = data.id;

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
            platform.innerHTML = "Platform: " + data.a_vgame_plattform;
            article.appendChild(platform);

            let genre = document.createElement("p");
            genre.innerHTML = "Genre: " + data.a_genre;
            article.appendChild(genre);

            let desc = document.createElement("p");
            desc.innerHTML = "Description: " + data.a_description;
            article.appendChild(desc);

            display.articleDisplay.appendChild(article);
        }

        // displayBook(data){
        //     let article = document.createElement("article");
        //     article.class = "articles";
        //     article.id = data.id;
        //
        //     let image = document.createElement("img");
        //     image.src = data.a_imageurl;
        //     image.alt = data.a_title + " cover/artwork";
        //     article.appendChild(image);
        //
        //     let title = document.createElement("a");
        //     let titleText = document.createElement("h2");
        //     titleText.innerHTML = data.a_title;
        //     title.appendChild(titleText);
        //     article.appendChild(title);
        //
        //     let cat = document.createElement("p");
        //     cat.innerHTML = "Category: " + data.a_category;
        //     article.appendChild(cat);
        //
        //     let pub = document.createElement("p");
        //     pub.innerHTML = "Trade offer placed on: " + new Date(data.a_publicationdate).toLocaleDateString();
        //     article.appendChild(pub);
        //
        //     let genre = document.createElement("p");
        //     genre.innerHTML = "Genre: " + data.a_genre;
        //     article.appendChild(genre);
        //
        //     let players = document.createElement("p");
        //     players.innerHTML = "Players: " + data.a_bgame_players;
        //     article.appendChild(players);
        //
        //     let playtime = document.createElement("p");
        //     playtime.innerHTML = "Playing Time: " + data.a_bgame_playtime;
        //     article.appendChild(playtime);
        //
        //     let desc = document.createElement("p");
        //     desc.innerHTML = "Description: " + data.a_description;
        //     article.appendChild(desc);
        //
        //     display.articleDisplay.appendChild(article);
        // }

    }

    let display = new mainDisplay();
});