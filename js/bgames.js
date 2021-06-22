document.addEventListener("DOMContentLoaded", function (event) {
    const searchURL = "http://localhost:3000/webapi/bgg/";
    let createTrue = true;

    function searchInput(){
        document.getElementById("a_title").value = "";
        document.getElementById("a_author").value = "";
        document.getElementById("a_publicationdate").value = "";
        document.getElementById("a_genre").value = "";
        document.getElementById("a_bgame_players").value = "";
        document.getElementById("a_bgame_playtime").value = "";
        document.getElementById("a_description").value = "";

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
        constructor(a_title, a_author, a_publicationdate, a_genre, a_bgame_players, a_bgame_playtime, a_description) {
            this.a_title = a_title;
            this.a_author = a_author;
            this.a_publicationdate = a_publicationdate;
            this.a_genre = a_genre;
            this.a_bgame_players = a_bgame_players;
            this.a_bgame_playtime = a_bgame_playtime;
            this.a_description = a_description;
            this.a_category = "Boardgame";
        }

        static printInput(input){
            document.getElementById("a_title").value = input.a_title;
            document.getElementById("a_author").value = input.a_author;
            document.getElementById("a_publicationdate").value = input.a_publicationdate;
            document.getElementById("a_genre").value = input.a_genre;
            document.getElementById("a_bgame_players").value = input.a_bgame_players;
            document.getElementById("a_bgame_playtime").value = input.a_bgame_playtime;
            if(!typeof input.a_description === undefined){
                document.getElementById("a_description").value = input.a_description;
            }
        }

        static postBoardGame(){
            let boardgame = new Boardgame(
                document.getElementById("a_title").value.toString(),
                document.getElementById("a_author").value.toString(),
                document.getElementById("a_publicationdate").value.toString(),
                document.getElementById("a_genre").value.toString());
                document.getElementById("a_bgame_players").value.toString();
                document.getElementById("a_bgame_playtime").value.toString();
                document.getElementById("a_description").value.toString();

            // To-Do implement fetch for POST METHOD
        }
    }

    let searchButton = document.getElementById("searchButton");
    searchButton.addEventListener('click', searchInput,false);

    let createButton = document.getElementById("createButton");
    createButton.addEventListener('click', Boardgame.postBoardGame,false);

    let updateButton = document.getElementById("updateButton").disabled = true;

});