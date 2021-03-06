document.addEventListener("DOMContentLoaded", function (event) {
    // const searchURL = "http://localhost:3000/webapi/bgg/";
    // const articleURL = "http://localhost:3000/article";
    const searchURL = "http://letausch.ffkledering.at:3000/webapi/bgg/";
    const articleURL = "http://letausch.ffkledering.at:3000/article";

    class BoardGame{
        constructor(userID) {
            this.a_title = document.getElementById("a_title").value.toString();
            this.a_author = document.getElementById("a_author").value.toString();
            this.a_genre = document.getElementById("a_genre").value.toString();
            this.a_bgame_players = document.getElementById("a_bgame_players").value.toString();
            this.a_bgame_playtime = document.getElementById("a_bgame_playtime").value.toString();
            this.a_description = document.getElementById("a_description").value.toString();
            this.a_imageurl = document.getElementById("a_imageurl").getAttribute("src");
            this.a_publicationdate = new Date().toISOString();
            this.a_category = "Board Games";
            this.a_u_email = userID;
        }

        static getSearch(){
            BoardGame.clearSearch();

            let input = document.getElementById("searchField").value;
            console.log("GET to server: " + searchURL + input);
            fetch(searchURL + input)
                .then(function(response){
                    response.json()
                        .then(function(json){
                            BoardGame.printData(json);
                        })
                })
        }

        static clearSearch(){
            document.getElementById("a_title").value = "";
            document.getElementById("a_author").value = "";
            document.getElementById("a_genre").value = "";
            document.getElementById("a_bgame_players").value = "";
            document.getElementById("a_bgame_playtime").value = "";
            document.getElementById("a_description").value = "";
            document.getElementById("a_imageurl").setAttribute("src","");
            document.getElementById("message").innerHTML = "";
        }

        static printData(data){
            document.getElementById("a_title").value = data.a_title;
            document.getElementById("a_author").value = data.a_author;
            document.getElementById("a_genre").value = data.a_genre;
            document.getElementById("a_bgame_players").value = data.a_bgame_players;
            document.getElementById("a_bgame_playtime").value = data.a_bgame_playtime;
            document.getElementById("a_imageurl").setAttribute("src", data.a_imageurl);
            if(!typeof data.a_description === undefined){
                document.getElementById("a_description").value = data.a_description;
            }
        }

        static postBoardGame(userID){
            let boardgame = new BoardGame(userID);

            fetch(articleURL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(boardgame),
            })
                .then(response => response.text())
                .then(data => {
                    console.log("Boardgame POST Success: ", data);
                })
                .catch((error) =>{
                    console.error("Boardgame POST Error: ", error);
                })
        }
    }

    fetch("http://letausch.ffkledering.at:3000/whoami")
            .then(result => result.json())
            .then(data => {

                let searchButton = document.getElementById("searchButton");
                searchButton.addEventListener('click', BoardGame.getSearch,false);

                let createButton = document.getElementById("createButton");
                createButton.addEventListener('click', function(){
                    if(document.getElementById("a_title").value === ""){
                        document.getElementById("message").innerHTML = "Please enter a title!";
                    }
                    else{
                        BoardGame.postBoardGame(data.iam);
                        BoardGame.clearSearch();
                        document.getElementById("message").innerHTML = "Trade offer created successfully!";
                    }
                },false);

            })
            .catch(error => console.error(error));
});