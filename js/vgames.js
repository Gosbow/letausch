document.addEventListener("DOMContentLoaded", function (event) {
    const searchURL = "http://localhost:3000/webapi/gb/";
    const postURL = "http://localhost:3000/article";

    let createTrue = true;

    function searchInput(){
        document.getElementById("a_title").value = "";
        document.getElementById("a_author").value = "";
        document.getElementById("a_publicationdate").value = "";
        document.getElementById("a_vgame_platform").value = "";
        document.getElementById("a_genre").value = "";
        document.getElementById("a_description").value = "";

        let platform = document.getElementById("a_vgame_platform");
        while (platform.firstChild) {
            platform.removeChild(platform.lastChild);
        }

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
            document.getElementById("a_genre").value = input.a_genre;
            document.getElementById("a_description").value = input.a_description;
            let datalist = document.getElementById("a_vgame_platform");
            for(let i = 0; i < input.a_vgame_platform.length; i++) {
                let option = document.createElement("option");
                option.value = input.a_vgame_platform[i];
                datalist.appendChild(option);
            }
        }

        static postVideogame(){
            let videogame = new Videogame(
                document.getElementById("a_title").value.toString(),
                document.getElementById("a_author").value.toString(),
                document.getElementById("a_publicationdate").value.toString(),
                document.getElementById("a_vgame_platform").value.toString(),
                document.getElementById("a_genre").value.toString(),
                document.getElementById("a_description").value.toString());

            fetch(postURL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(videogame),
            })
                .then(response => response.text())
                .then(data => {
                    console.log("Videogame POST Success: ", data);
                })
                .catch((error) =>{
                    console.error("Videogame POST Error: ", error);
                })
        }
    }

    let searchButton = document.getElementById("searchButton");
    searchButton.addEventListener('click', searchInput,false);

    let createButton = document.getElementById("createButton");
    createButton.addEventListener('click', Videogame.postVideogame,false);

    let updateButton = document.getElementById("updateButton").disabled = true;

});