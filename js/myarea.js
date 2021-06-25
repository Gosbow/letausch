document.addEventListener("DOMContentLoaded", function (event) {
    // const articleURL = "http://localhost:3000/article";
    const articleURL = "http://letausch.ffkledering.at:3000/article";

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

    class BoardGame {
        constructor(a_title, a_author, a_genre, a_bgame_players, a_bgame_playtime, a_description, a_imageurl, a_publicationdate) {
            this.a_title = a_title;
            this.a_author = a_author;
            this.a_genre = a_genre;
            this.a_bgame_players = a_bgame_players;
            this.a_bgame_playtime = a_bgame_playtime;
            this.a_description = a_description;
            this.a_imageurl = a_imageurl;
            this.a_publicationdate = a_publicationdate;
            this.a_category = "Boardgame";
        }
    }

    class myAreaDisplay {
        constructor() {
            this.areaDisplay = document.getElementById("myAreaDisplay");
            this.articles = [];

            fetch(articleURL)
                .then(function(response){
                    response.json()
                        .then(function(json){
                            for(let i = 0; i < json.length; i++){
                                display.articles.push(new Article(json[i]));
                            }
                            console.log(display.articles);
                            display.displayAll();
                        })
                })
        }

        // displayNone(){
        //     for(let i = 0; i < display.articles.length; i++){
        //         if(document.getElementById("article_" + display.articles[i].a_id)) {
        //             display.areaDisplay.removeChild(document.getElementById("article_" + display.articles[i].a_id));
        //         }
        //     }
        // }

        displayAll() {
            let data = display.articles.slice(7,8);         // SLICED FOR TESTING PURPOSES
            // console.log(data);
            // display.displayNone();
            for (let j = 0; j < data.length; j++) {
                if(data[j].a_category === "Boardgame"){
                    display.displayBoardGame(data[j]);
                }
                if(data[j].a_category === "Videogame"){
                    display.displayVideoGame(data[j]);
                }
                if(data[j].a_category === "Book"){
                    display.displayBook(data[j]);
                }
                if(data[j].a_category === "Other"){
                    display.displayOther(data[j]);
                }
            }
        }

        deleteArticleByID(id){
            let deleteURL = articleURL + '/' + id;

            fetch(deleteURL, {
                method: "DELETE"
            })
                .then(response => response.text())
                .then(data => {
                    console.log("Article DELETE Success: ", data);
                })
                .catch((error) =>{
                    console.error("Article DELETE Error: ", error);
                })
        }

        putArticle(id, article){
            let putURL = articleURL + '/' + id;

            fetch(putURL, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(article),
            })
                .then(response => response.text())
                .then(data => {
                    console.log("Article PUT Success: ", data);
                    window.location.reload();
                })
                .catch((error) =>{
                    console.error("Article PUT Error: ", error);
                })
        }

        displayBoardGame(data){
            let article = document.createElement("article");
            article.setAttribute("class","articles");
            article.id = "article_" + data.a_id;

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
            console.log(data.a_publicationdate);
            pub.innerHTML = "Trade offer placed on: " + new Date(Date.parse(data.a_publicationdate)).toLocaleDateString("en-UK", {timeZone: "Europe/Vienna"});
            article.appendChild(pub);

            let auth = document.createElement("p");
            let authValue = document.createElement("span");
            authValue.innerHTML = data.a_author.toString();
            authValue.id = "a_author_value_" + data.a_id;
            auth.innerHTML = "Designer: "
            auth.id = "a_author_" + data.a_id;
            auth.appendChild(authValue);
            article.appendChild(auth);

            let genre = document.createElement("p");
            let genreValue = document.createElement("span");
            genreValue.innerHTML = data.a_genre.toString();
            genreValue.id = "a_genre_value_" + data.a_id;
            genre.innerHTML = "Genre: ";
            genre.id = "a_genre_" + data.a_id;
            genre.appendChild(genreValue);
            article.appendChild(genre);

            let players = document.createElement("p");
            let playersValue = document.createElement("span");
            playersValue.innerHTML = data.a_bgame_players.toString();
            playersValue.id = "a_bgame_players_value_" + data.a_id;
            players.innerHTML = "Players: ";
            players.id = "a_bgame_players_" + data.a_id;
            players.appendChild(playersValue);
            article.appendChild(players);

            let playtime = document.createElement("p");
            let playtimeValue = document.createElement("span");
            playtimeValue.innerHTML = data.a_bgame_playtime.toString();
            playtimeValue.id = "a_bgame_playtime_value_" + data.a_id;
            playtime.innerHTML = "Playing Time: ";
            playtime.id = "a_bgame_playtime_" + data.a_id;
            playtime.appendChild(playtimeValue);
            article.appendChild(playtime);

            let desc = document.createElement("p");
            let descValue = document.createElement("span");
            descValue.innerHTML = data.a_description.toString();
            descValue.id = "a_description_value_" + data.a_id;
            desc.innerHTML = "Description: ";
            desc.id = "a_description_" + data.a_id;
            desc.appendChild(descValue);
            article.appendChild(desc);

            let editButton = document.createElement("button");
            editButton.innerHTML = "Edit";
            editButton.addEventListener('click', function(){
                editButton.disabled = true;
                saveButton.disabled = false;
                display.editBoardGame(data.a_id, data);
            }, false);
            article.appendChild(editButton);

            let deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete";
            deleteButton.addEventListener('click', function(){
                display.deleteArticleByID(data.a_id);
            }, false);
            article.appendChild(deleteButton);

            let saveButton = document.createElement("button");
            saveButton.innerHTML = "Save";
            saveButton.disabled = true;
            saveButton.addEventListener('click', function () {
                let boardgame = new BoardGame(
                    data.a_title,
                    document.getElementById("a_author_input_" + data.a_id).value,
                    document.getElementById("a_genre_input_" + data.a_id).value,
                    document.getElementById("a_bgame_players_input_" + data.a_id).value,
                    document.getElementById("a_bgame_playtime_input_" + data.a_id).value,
                    document.getElementById("a_description_input_" + data.a_id).value,
                    data.a_imageurl,
                    data.a_publicationdate,
                );
                console.log(boardgame);
                display.putArticle(data.a_id, boardgame);
            }, false);
            article.appendChild(saveButton);

            display.areaDisplay.appendChild(article);
        }

        editBoardGame(id, data) {
            let auth = document.getElementById("a_author_" + data.a_id);
            let authInput = document.createElement("input");
            authInput.id = "a_author_input_" + data.a_id;
            authInput.value = data.a_author;
            auth.replaceChild(authInput, document.getElementById("a_author_value_" + data.a_id));

            let genre = document.getElementById("a_genre_" + data.a_id);
            let genreInput = document.createElement("input");
            genreInput.id = "a_genre_input_" + data.a_id;
            genreInput.value = data.a_genre;
            genre.replaceChild(genreInput, document.getElementById("a_genre_value_" + data.a_id));

            let players = document.getElementById("a_bgame_players_" + data.a_id);
            let playersInput = document.createElement("input");
            playersInput.id = "a_bgame_players_input_" + data.a_id;
            playersInput.value = data.a_bgame_players;
            players.replaceChild(playersInput, document.getElementById("a_bgame_players_value_" + data.a_id));

            let playtime = document.getElementById("a_bgame_playtime_" + data.a_id);
            let playtimeInput = document.createElement("input");
            playtimeInput.id = "a_bgame_playtime_input_" + data.a_id;
            playtimeInput.value = data.a_bgame_playtime;
            playtime.replaceChild(playtimeInput, document.getElementById("a_bgame_playtime_value_" + data.a_id));

            let desc = document.getElementById("a_description_" + data.a_id);
            let descInput = document.createElement("input");
            descInput.id = "a_description_input_" + data.a_id;
            descInput.value = data.a_description;
            desc.replaceChild(descInput, document.getElementById("a_description_value_" + data.a_id));
        }






        // down below is not finished











        displayVideoGame(data){
            let article = document.createElement("article");
            article.setAttribute("class","articles");
            article.id = "article_" + data.a_id;

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
            pub.innerHTML = "Trade offer placed on: " + new Date(Date.parse(data.a_publicationdate)).toLocaleDateString("en-UK", {timeZone: "Europe/Vienna"});
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
            desc.id = "a_description_" + data.id;
            article.appendChild(desc);

            let backButton = document.createElement("button");
            backButton.innerHTML = "Edit Offer";
            article.appendChild(backButton);

            let requestButton = document.createElement("button");
            requestButton.innerHTML = "Delete Offer";
            article.appendChild(requestButton);

            display.areaDisplay.appendChild(article);
        }

        displayBook(data){
            let article = document.createElement("article");
            article.setAttribute("class","articles");
            article.id = "article_" + data.a_id;

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
            pub.innerHTML = "Trade offer placed on: " + new Date(Date.parse(data.a_publicationdate)).toLocaleDateString("en-UK", {timeZone: "Europe/Vienna"});
            article.appendChild(pub);

            let auth = document.createElement("p");
            auth.innerHTML = "Author: " + data.a_author;
            article.appendChild(auth);

            let isbn = document.createElement("p");
            isbn.innerHTML = "ISBN: " + data.a_books_isbn;
            article.appendChild(isbn);

            let desc = document.createElement("p");
            desc.innerHTML = "Description: " + data.a_description;
            desc.id = "a_description_" + data.id;
            article.appendChild(desc);

            let backButton = document.createElement("button");
            backButton.innerHTML = "Edit Offer";
            article.appendChild(backButton);

            let requestButton = document.createElement("button");
            requestButton.innerHTML = "Delete Offer";
            article.appendChild(requestButton);;

            display.areaDisplay.appendChild(article);
        }

        displayOther(data){
            let article = document.createElement("article");
            article.setAttribute("class","articles");
            article.id = "article_" + data.a_id;

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
            pub.innerHTML = "Trade offer placed on: " + new Date(Date.parse(data.a_publicationdate)).toLocaleDateString("en-UK", {timeZone: "Europe/Vienna"});
            article.appendChild(pub);

            let desc = document.createElement("p");
            desc.innerHTML = "Description: " + data.a_description;
            desc.id = "a_description_" + data.id;
            article.appendChild(desc);

            let backButton = document.createElement("button");
            backButton.innerHTML = "Edit Offer";
            article.appendChild(backButton);

            let requestButton = document.createElement("button");
            requestButton.innerHTML = "Delete Offer";
            article.appendChild(requestButton);

            display.areaDisplay.appendChild(article);
        }

        reload(){
            window.open("myarea.html", "_self");
        }

    }


    let display = new myAreaDisplay();
});