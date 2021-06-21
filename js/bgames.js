document.addEventListener("DOMContentLoaded", function (event) {
    const searchURL = "http://localhost:3000/webapi/bgg/";
    let createTrue = true;

    function searchInput(){
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("publicationdate").value = "";
        document.getElementById("genre").value = "";
        document.getElementById("bgame_players").value = "";
        document.getElementById("bgame_playtime").value = "";

        let input = document.getElementById("searchField").value;
        console.log("GET to server: " + searchURL + input);
        fetch(searchURL + input)
            .then(function(response){
                response.json()
                    .then(function(json){
                        Boardgame.printInput(json);
                    })
            })
    }

    class Boardgame{
        constructor(title, author, publicationsdate, genre, rating, bgame_players, bgame_playtime) {
            this.title = title;
            this.author = author;
            this.publicationsdate = publicationsdate;
            this.genre = genre;
            this.bgame_players = bgame_players;
            this.bgame_playtime = bgame_playtime;
            this.category = "Boardgame";
        }

        static printInput(input){
            document.getElementById("title").value = input.title;
            document.getElementById("author").value = input.author;
            document.getElementById("publicationdate").value = input.publicationsdate;
            document.getElementById("genre").value = input.genre;
            document.getElementById("bgame_players").value = input.bgame_players;
            document.getElementById("bgame_playtime").value = input.bgame_playtime;
        }

        static postBoardGame(){
            let boardgame = new Boardgame(
                document.getElementById("title").value.toString(),
                document.getElementById("author").value.toString(),
                document.getElementById("publicationdate").value.toString(),
                document.getElementById("genre").value.toString());
                document.getElementById("bgame_players").value.toString();
                document.getElementById("bgame_playtime").value.toString();

            // To-Do implement fetch for POST METHOD
        }
    }


    let searchButton = document.getElementById("searchButton");
    searchButton.addEventListener('click', searchInput,false);

    let createButton = document.getElementById("createButton");
    createButton.addEventListener('click', Boardgame.postBoardGame,false);

});