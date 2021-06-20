document.addEventListener("DOMContentLoaded", function (event) {
    const searchURL = "http://localhost:3000/webapi/gb/";

    function searchInput(){
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("publicationdate").value = "";
        document.getElementById("vgame_platform").value = "";
        document.getElementById("genre").value = "";
        document.getElementById("description").value = "";

        let input = document.getElementById("searchField").value;
        console.log("GET to server: " + searchURL + input);
        fetch(searchURL + input)
            .then(function(response){
                response.json()
                    .then(function(json){
                        Videogame.printInput(json);
                    })
            })
    }

    class Videogame{
        constructor(title, author, publicationdate, vgame_platform, genre, description) {
            this.title = title;
            this.author = author;
            this.publicationdate = publicationdate;
            this.vgame_platform = vgame_platform;
            this.genre = genre;
            this.description = description;
        }


        static printInput(input){
            document.getElementById("title").value = input.title;
            document.getElementById("author").value = input.author;
            document.getElementById("publicationdate").value = input.publicationdate;
            document.getElementById("vgame_platform").value = input.vgame_platform;
            document.getElementById("genre").value = input.genre;
            document.getElementById("description").value = input.description;
        }

        static postVideogame(){
            let videogame = new Videogame(
                document.getElementById("title").value.toString(),
                document.getElementById("author").value.toString(),
                document.getElementById("publicationdate").value.toString(),
                document.getElementById("vgame_platform").value.toString(),
                document.getElementById("genre").value.toString());
                document.getElementById("description").description.toString();

            // To-Do implement fetch for POST METHOD
        }
    }

    let searchButton = document.getElementById("searchButton");
    searchButton.addEventListener('click', searchInput,false);

    let createButton = document.getElementById("createButton");
    createButton.addEventListener('click', Videogame.postVideogame,false);

});