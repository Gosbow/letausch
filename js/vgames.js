document.addEventListener("DOMContentLoaded", function (event) {
    const searchURL = "http://localhost:3000/webapi/gb/";
    let createTrue = true;

    function searchInput(){
        document.getElementById("a_title").value = "";
        document.getElementById("a_author").value = "";
        document.getElementById("a_publicationdate").value = "";
        document.getElementById("a_vgame_platform").value = "";
        document.getElementById("a_genre").value = "";
        document.getElementById("a_description").value = "";

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
        constructor(a_title, a_author, a_publicationdate, a_vgame_platform, a_genre, a_description) {
            this.a_title = a_title;
            this.a_author = a_author;
            this.a_publicationdate = a_publicationdate;
            this.a_vgame_platform = a_vgame_platform;
            this.a_genre = a_genre;
            this.a_description = a_description;
            this.a_category = "Videogame";
        }


        static printInput(input){
            document.getElementById("a_title").value = input.a_title;
            document.getElementById("a_author").value = input.a_author;
            document.getElementById("a_publicationdate").value = input.a_publicationdate;
            document.getElementById("a_vgame_platform").value = input.a_vgame_platform;
            document.getElementById("a_genre").value = input.a_genre;
            document.getElementById("a_description").value = input.a_description;
        }

        static postVideogame(){
            let videogame = new Videogame(
                document.getElementById("a_title").value.toString(),
                document.getElementById("a_author").value.toString(),
                document.getElementById("a_publicationdate").value.toString(),
                document.getElementById("a_vgame_platform").value.toString(),
                document.getElementById("a_genre").value.toString());
                document.getElementById("a_description").description.toString();

            // To-Do implement fetch for POST METHOD
        }
    }

    let searchButton = document.getElementById("searchButton");
    searchButton.addEventListener('click', searchInput,false);

    let createButton = document.getElementById("createButton");
    createButton.addEventListener('click', Videogame.postVideogame,false);

    let updateButton = document.getElementById("updateButton").disabled = true;

});