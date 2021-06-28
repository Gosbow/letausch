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
        constructor(a_title, a_author, a_genre, a_bgame_players, a_bgame_playtime, a_description, a_imageurl, a_publicationdate, userID) {
            this.a_title = a_title;
            this.a_author = a_author;
            this.a_genre = a_genre;
            this.a_bgame_players = a_bgame_players;
            this.a_bgame_playtime = a_bgame_playtime;
            this.a_description = a_description;
            this.a_imageurl = a_imageurl;
            this.a_publicationdate = a_publicationdate;
            this.a_category = "Board Games";
            this.a_u_email = userID;
        }
    }
    class VideoGame {
        constructor(a_title, a_author, a_vgame_platform, a_genre, a_description, a_imageurl, a_publicationdate, userID) {
            this.a_title = a_title;
            this.a_author = a_author;
            this.a_vgame_platform = a_vgame_platform;
            this.a_genre = a_genre;
            this.a_description = a_description;
            this.a_imageurl = a_imageurl;
            this.a_publicationdate = a_publicationdate;
            this.a_category = "Video Games";
            this.a_u_email = userID;
        }
    }
    class Book {
        constructor(a_title, a_author, a_books_isbn, a_description, a_imageurl, a_publicationdate, userID) {
            this.a_title = a_title;
            this.a_author = a_author;
            this.a_books_isbn = a_books_isbn;
            this.a_description = a_description;
            this.a_imageurl = a_imageurl;
            this.a_publicationdate = a_publicationdate;
            this.a_category = "Books";
            this.a_u_email = userID;
        }
    }
    class Other {
        constructor(a_title, a_description, a_imageurl, a_publicationdate, userID) {
            this.a_title = a_title;
            this.a_description = a_description;
            this.a_imageurl = a_imageurl;
            this.a_publicationdate = a_publicationdate;
            this.a_category = "Other";
            this.a_u_email = userID;
        }
    }

    class myAreaDisplay {
        constructor(userID) {
            this.areaDisplay = document.getElementById("myAreaDisplay");
            this.articles = [];
            this.userID = userID;

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

        displayAll() {
            let data = display.articles;
            let noData = false;

            for (let j = 0; j < data.length; j++) {
                if(display.articles[j].a_u_email === display.userID){
                    noData = true;
                    if(data[j].a_category === "Board Games"){
                        display.displayBoardGame(data[j]);
                    }
                    if(data[j].a_category === "Video Games"){
                        display.displayVideoGame(data[j]);
                    }
                    if(data[j].a_category === "Books"){
                        display.displayBook(data[j]);
                    }
                    if(data[j].a_category === "Other"){
                        display.displayOther(data[j]);
                    }
                }
            }

            if(noData === false){
                let def = document.createElement("article");
                def.className = "articles";
                let img = document.createElement("img");
                img.src = "img/catan.jpg";
                img.alt = "Settlers of Catan cover/artwork";
                def.appendChild(img);
                let head = document.createElement("h2");
                head.innerHTML = "This could be your trade offer!";
                def.appendChild(head);
                let cat = document.createElement("p");
                cat.innerHTML = "Board Games, Video Games, Books and more";
                def.appendChild(cat);
                let desc = document.createElement("p");
                desc.innerHTML = "Just navigate to \"My Area\" and get started now!";
                def.appendChild(desc);
                display.areaDisplay.appendChild(def);
            }
        }

        deleteArticleByID(articleID){
            let deleteURL = articleURL + '/' + articleID;

            fetch(deleteURL, {
                method: "DELETE"
            })
                .then(response => response.text())
                .then(data => {
                    console.log("Article DELETE Success: ", data);
                    window.location.reload();
                })
                .catch((error) =>{
                    console.error("Article DELETE Error: ", error);
                })
        }

        putArticle(articleID, article){
            let putURL = articleURL + '/' + articleID;

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
            b3.innerHTML = "Designer: "
            auth.appendChild(b3);
            let authValue = document.createElement("span");
            authValue.innerHTML = data.a_author.toString();
            authValue.id = "a_author_value_" + data.a_id;
            auth.id = "a_author_" + data.a_id;
            auth.appendChild(authValue);
            article.appendChild(auth);

            let genre = document.createElement("p");
            let b4 = document.createElement("b");
            b4.innerHTML = "Genre: "
            genre.appendChild(b4);
            let genreValue = document.createElement("span");
            genreValue.innerHTML = data.a_genre.toString();
            genreValue.id = "a_genre_value_" + data.a_id;
            genre.id = "a_genre_" + data.a_id;
            genre.appendChild(genreValue);
            article.appendChild(genre);

            let players = document.createElement("p");
            let b5 = document.createElement("b");
            b5.innerHTML = "Players: "
            players.appendChild(b5);
            let playersValue = document.createElement("span");
            playersValue.innerHTML = data.a_bgame_players.toString();
            playersValue.id = "a_bgame_players_value_" + data.a_id;
            players.id = "a_bgame_players_" + data.a_id;
            players.appendChild(playersValue);
            article.appendChild(players);

            let playtime = document.createElement("p");
            let b6 = document.createElement("b");
            b6.innerHTML = "Playing Time: "
            playtime.appendChild(b6);
            let playtimeValue = document.createElement("span");
            playtimeValue.innerHTML = data.a_bgame_playtime.toString();
            playtimeValue.id = "a_bgame_playtime_value_" + data.a_id;
            playtime.id = "a_bgame_playtime_" + data.a_id;
            playtime.appendChild(playtimeValue);
            article.appendChild(playtime);

            let desc = document.createElement("p");
            let b7 = document.createElement("b");
            b7.innerHTML = "Description: "
            desc.appendChild(b7);
            let descValue = document.createElement("span");
            descValue.innerHTML = data.a_description.toString();
            descValue.id = "a_description_value_" + data.a_id;
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
                    display.userID
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
            b3.innerHTML = "Developer: "
            auth.appendChild(b3);
            let authValue = document.createElement("span");
            authValue.innerHTML = data.a_author.toString();
            authValue.id = "a_author_value_" + data.a_id;
            auth.id = "a_author_" + data.a_id;
            auth.appendChild(authValue);
            article.appendChild(auth);

            let platform = document.createElement("p");
            let b4 = document.createElement("b");
            b4.innerHTML = "Platform: ";
            platform.appendChild(b4);
            let platformValue = document.createElement("span");
            platformValue.innerHTML = data.a_vgame_platform.toString();
            platformValue.id = "a_vgame_platform_value_" + data.a_id;
            platform.id = "a_vgame_platform_" + data.a_id;
            platform.appendChild(platformValue);
            article.appendChild(platform);

            let genre = document.createElement("p");
            let b5 = document.createElement("b");
            b5.innerHTML = "Genre: "
            genre.appendChild(b5);
            let genreValue = document.createElement("span");
            genreValue.innerHTML = data.a_genre.toString();
            genreValue.id = "a_genre_value_" + data.a_id;
            genre.id = "a_genre_" + data.a_id;
            genre.appendChild(genreValue);
            article.appendChild(genre);

            let desc = document.createElement("p");
            let b7 = document.createElement("b");
            b7.innerHTML = "Description: "
            desc.appendChild(b7);
            let descValue = document.createElement("span");
            descValue.innerHTML = data.a_description.toString();
            descValue.id = "a_description_value_" + data.a_id;
            desc.id = "a_description_" + data.a_id;
            desc.appendChild(descValue);
            article.appendChild(desc);

            let editButton = document.createElement("button");
            editButton.innerHTML = "Edit";
            editButton.addEventListener('click', function(){
                editButton.disabled = true;
                saveButton.disabled = false;
                display.editVideoGame(data.a_id, data);
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
                let videogame = new VideoGame(
                    data.a_title,
                    document.getElementById("a_author_input_" + data.a_id).value,
                    document.getElementById("a_vgame_platform_input_" + data.a_id).value,
                    document.getElementById("a_genre_input_" + data.a_id).value,
                    document.getElementById("a_description_input_" + data.a_id).value,
                    data.a_imageurl,
                    data.a_publicationdate,
                    display.userID
                );
                console.log(videogame);
                display.putArticle(data.a_id, videogame);
            }, false);
            article.appendChild(saveButton);

            display.areaDisplay.appendChild(article);
        }

        editVideoGame(id, data) {
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

            let platform = document.getElementById("a_vgame_platform_" + data.a_id);
            let platformInput = document.createElement("input");
            platformInput.id = "a_vgame_platform_input_" + data.a_id;
            platformInput.value = data.a_vgame_platform;
            platform.replaceChild(platformInput, document.getElementById("a_vgame_platform_value_" + data.a_id));

            let desc = document.getElementById("a_description_" + data.a_id);
            let descInput = document.createElement("input");
            descInput.id = "a_description_input_" + data.a_id;
            descInput.value = data.a_description;
            desc.replaceChild(descInput, document.getElementById("a_description_value_" + data.a_id));
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
            b3.innerHTML = "Author: "
            auth.appendChild(b3);
            let authValue = document.createElement("span");
            authValue.innerHTML = data.a_author.toString();
            authValue.id = "a_author_value_" + data.a_id;
            auth.id = "a_author_" + data.a_id;
            auth.appendChild(authValue);
            article.appendChild(auth);

            let isbn = document.createElement("p");
            let b4 = document.createElement("b");
            b4.innerHTML = "ISBN: "
            isbn.appendChild(b4);
            let isbnValue = document.createElement("span");
            isbnValue.innerHTML = data.a_books_isbn.toString();
            isbnValue.id = "a_books_isbn_value_" + data.a_id;
            isbn.id = "a_books_isbn_" + data.a_id;
            isbn.appendChild(isbnValue);
            article.appendChild(isbn);

            let desc = document.createElement("p");
            let b7 = document.createElement("b");
            b7.innerHTML = "Description: "
            desc.appendChild(b7);
            let descValue = document.createElement("span");
            descValue.innerHTML = data.a_description.toString();
            descValue.id = "a_description_value_" + data.a_id;
            desc.id = "a_description_" + data.a_id;
            desc.appendChild(descValue);
            article.appendChild(desc);

            let editButton = document.createElement("button");
            editButton.innerHTML = "Edit";
            editButton.addEventListener('click', function(){
                editButton.disabled = true;
                saveButton.disabled = false;
                display.editBook(data.a_id, data);
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
                let book = new Book(
                    data.a_title,
                    document.getElementById("a_author_input_" + data.a_id).value,
                    document.getElementById("a_books_isbn_input_" + data.a_id).value,
                    document.getElementById("a_description_input_" + data.a_id).value,
                    data.a_imageurl,
                    data.a_publicationdate,
                    display.userID
                );
                console.log(book);
                display.putArticle(data.a_id, book);
            }, false);
            article.appendChild(saveButton);

            display.areaDisplay.appendChild(article);
        }

        editBook(id, data) {
            let auth = document.getElementById("a_author_" + data.a_id);
            let authInput = document.createElement("input");
            authInput.id = "a_author_input_" + data.a_id;
            authInput.value = data.a_author;
            auth.replaceChild(authInput, document.getElementById("a_author_value_" + data.a_id));

            let isbn = document.getElementById("a_books_isbn_" + data.a_id);
            let isbnInput = document.createElement("input");
            isbnInput.id = "a_books_isbn_input_" + data.a_id;
            isbnInput.value = data.a_books_isbn;
            isbn.replaceChild(isbnInput, document.getElementById("a_books_isbn_value_" + data.a_id));

            let desc = document.getElementById("a_description_" + data.a_id);
            let descInput = document.createElement("input");
            descInput.id = "a_description_input_" + data.a_id;
            descInput.value = data.a_description;
            desc.replaceChild(descInput, document.getElementById("a_description_value_" + data.a_id));
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
            b7.innerHTML = "Description: "
            desc.appendChild(b7);
            let descValue = document.createElement("span");
            descValue.innerHTML = data.a_description.toString();
            descValue.id = "a_description_value_" + data.a_id;
            desc.id = "a_description_" + data.a_id;
            desc.appendChild(descValue);
            article.appendChild(desc);

            let editButton = document.createElement("button");
            editButton.innerHTML = "Edit";
            editButton.addEventListener('click', function(){
                editButton.disabled = true;
                saveButton.disabled = false;
                display.editOther(data.a_id, data);
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
                let other = new Other(
                    data.a_title,
                    document.getElementById("a_description_input_" + data.a_id).value,
                    data.a_imageurl,
                    data.a_publicationdate,
                    display.userID
                );
                console.log(other);
                display.putArticle(data.a_id, other);
            }, false);
            article.appendChild(saveButton);

            display.areaDisplay.appendChild(article);
        }

        editOther(id, data) {
            let desc = document.getElementById("a_description_" + data.a_id);
            let descInput = document.createElement("input");
            descInput.id = "a_description_input_" + data.a_id;
            descInput.value = data.a_description;
            desc.replaceChild(descInput, document.getElementById("a_description_value_" + data.a_id));
        }

        reload(){
            window.open("myarea.html", "_self");
        }
    }

    let display;
    fetch("http://letausch.ffkledering.at:3000/whoami")
        .then(result => result.json())
        .then(data => {
             display = new myAreaDisplay(data.iam);
        })
        .catch(error => console.error(error));

});