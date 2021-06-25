document.addEventListener("DOMContentLoaded", function (event) {
    // const searchURL = "http://localhost:3000/webapi/bgg/";
    // const postURL = "http://localhost:3000/article";
    const searchURL = "http://letausch.ffkledering.at:3000/webapi/bgg/";
    const postURL = "http://letausch.ffkledering.at:3000/article";

    let createTrue = true;

    class BoardGame{
        constructor(data) {
            this.a_title = document.getElementById("a_title").value.toString();
            this.a_author = document.getElementById("a_author").value.toString();
            this.a_genre = document.getElementById("a_genre").value.toString();
            this.a_bgame_players = document.getElementById("a_bgame_players").value.toString();
            this.a_bgame_playtime = document.getElementById("a_bgame_playtime").value.toString();
            this.a_description = document.getElementById("a_description").value.toString();
            this.a_imageurl = document.getElementById("a_imageurl").getAttribute("src");

            this.a_publicationdate = new Date().toISOString();
            this.a_category = "Boardgame";
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

        static postBoardGame(){
            let boardgame = new BoardGame();

            fetch(postURL, {
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

        static putBoardGame(){
            let boardgame = new BoardGame();

            let putURL = postURL + "/ID!!";
0
            fetch(putURL, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(boardgame),
            })
                .then(response => response.text())
                .then(data => {
                    console.log("Boardgame PUT Success: ", data);
                })
                .catch((error) =>{
                    console.error("Boardgame PUT Error: ", error);
                })
        }

        static deleteBoardGame(){
            let deleteURL = postURL + "/ID!!!";

            fetch(deleteURL, {
                method: "DELETE"
            })
                .then(response => response.text())
                .then(data => {
                    console.log("Boardgame DELETE Success: ", data);
                })
                .catch((error) =>{
                    console.error("Boardgame DELETE Error: ", error);
                })
        }
    }

    let searchButton = document.getElementById("searchButton");
    searchButton.addEventListener('click', BoardGame.getSearch,false);

    let createButton = document.getElementById("createButton");
    createButton.addEventListener('click', BoardGame.postBoardGame,false);
    createButton.addEventListener('click', BoardGame.clearSearch,false);
    createButton.addEventListener('click',function(){
        document.getElementById("message").innerHTML = "Trade offer created successfully!";
    },false);

    let updateButton = document.getElementById("updateButton");
    updateButton.disabled = true;
});