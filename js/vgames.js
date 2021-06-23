document.addEventListener("DOMContentLoaded", function (event) {
    const searchURL = "http://localhost:3000/webapi/gb/";
    const postURL = "http://localhost:3000/article";

    let createTrue = true;

    class VideoGame{
        constructor() {
            this.a_title = document.getElementById("a_title").value.toString();
            this.a_author = document.getElementById("a_author").value.toString();
            this.a_vgame_plattform = document.getElementById("a_vgame_platform").value.toString();
            this.a_genre = document.getElementById("a_genre").value.toString();
            this.a_description = document.getElementById("a_description").value.toString();
            this.a_imageurl = document.getElementById("a_imageurl").getAttribute("src");

            this.a_publicationdate = new Date().toISOString();
            this.a_category = "Videogame";
        }

        static getSearch(){
            document.getElementById("a_title").value = "";
            document.getElementById("a_author").value = "";
            document.getElementById("a_vgame_platform").value = "";
            document.getElementById("a_genre").value = "";
            document.getElementById("a_description").value = "";
            document.getElementById("a_imageurl").setAttribute("src","");

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
                            VideoGame.printData(json);
                        })
                })
        }

        static printData(data){
            document.getElementById("a_title").value = data.a_title;
            document.getElementById("a_author").value = data.a_author;
            document.getElementById("a_genre").value = data.a_genre;
            document.getElementById("a_description").value = data.a_description;
            document.getElementById("a_imageurl").setAttribute("src", data.a_imageurl);
            let datalist = document.getElementById("a_vgame_platform");
            for(let i = 0; i < data.a_vgame_plattform.length; i++) {
                let option = document.createElement("option");
                option.value = data.a_vgame_plattform[i]
                datalist.appendChild(option);
            }
        }

        static postVideoGame(){
            let videogame = new VideoGame();

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
                .catch((error) => {
                    console.error("Videogame POST Error: ", error);
                })
        }

        static putVideoGame(){
            let videogame = new VideoGame();

            let putURL = postURL + "/ID!!";

            fetch(putURL, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(videogame),
            })
                .then(response => response.text())
                .then(data => {
                    console.log("Videogame PUT Success: ", data);
                })
                .catch((error) =>{
                    console.error("Videogame PUT Error: ", error);
                })
        }

        static deleteVideoGame(){
            let deleteURL = postURL + "/ID!!!";

            fetch(deleteURL, {
                method: "DELETE"
            })
                .then(response => response.text())
                .then(data => {
                    console.log("Videogame DELETE Success: ", data);
                })
                .catch((error) =>{
                    console.error("Videogame DELETE Error: ", error);
                })
        }
    }

    let searchButton = document.getElementById("searchButton");
    searchButton.addEventListener('click', VideoGame.getSearch,false);

    let createButton = document.getElementById("createButton");
    createButton.addEventListener('click', VideoGame.postVideoGame,false);
    createButton.addEventListener('click', function(){
        document.getElementById("createButton").disabled = true;
    },false);

    let updateButton = document.getElementById("updateButton");
    updateButton.disabled = true;
});