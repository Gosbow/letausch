document.addEventListener("DOMContentLoaded", function (event) {
    // const searchURL = "http://localhost:3000/webapi/gb/";
    // const postURL = "http://localhost:3000/article";
    const searchURL = "http://letausch.ffkledering.at:3000/webapi/gb/";
    const postURL = "http://letausch.ffkledering.at:3000/article";

    let createTrue = true;

    class VideoGame{
        constructor() {
            this.a_title = document.getElementById("a_title").value.toString();
            this.a_author = document.getElementById("a_author").value.toString();
            this.a_vgame_platform = document.getElementById("a_vgame_platform").value.toString();
            this.a_genre = document.getElementById("a_genre").value.toString();
            this.a_description = document.getElementById("a_description").value.toString();
            this.a_imageurl = document.getElementById("a_imageurl").getAttribute("src");

            this.a_publicationdate = new Date().toISOString();
            this.a_category = "Videogame";
        }

        static getSearch(){
            VideoGame.clearSearch();

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

        static clearSearch(){
            document.getElementById("a_title").value = "";
            document.getElementById("a_author").value = "";
            document.getElementById("a_vgame_platform").value = "";
            document.getElementById("a_genre").value = "";
            document.getElementById("a_description").value = "";
            document.getElementById("a_imageurl").setAttribute("src","");
            document.getElementById("message").innerHTML = "";
            VideoGame.removePlatformSelect();
        }

        static removePlatformSelect(){
            let platform = document.getElementById("platform");
            let input = document.createElement("input");
            input.id = "a_vgame_platform";
            platform.removeChild(document.getElementById("a_vgame_platform"));
            platform.appendChild(input);
        }

        static printData(data){
            document.getElementById("a_title").value = data.a_title;
            document.getElementById("a_author").value = data.a_author;
            document.getElementById("a_genre").value = data.a_genre;
            document.getElementById("a_description").value = data.a_description;
            document.getElementById("a_imageurl").setAttribute("src", data.a_imageurl);

            let platform = document.getElementById("platform");
            if (data.a_vgame_platform.length > 1){
                let select = document.createElement("select");
                select.id = "a_vgame_platform";
                select.placeholder = "Choose platform.."
                for(let i = 0; i < data.a_vgame_platform.length; i++) {
                    let option = document.createElement("option");
                    option.value = data.a_vgame_platform[i];
                    option.innerHTML = data.a_vgame_platform[i];
                    select.appendChild(option);
                }
                platform.removeChild(document.getElementById("a_vgame_platform"));
                platform.appendChild(select);

                let removeButton = document.createElement("Button");
                removeButton.innerHTML = "Click to enter manually";
                removeButton.id = "removeButton";
                removeButton.addEventListener('click', VideoGame.removePlatformSelect, false);
                removeButton.addEventListener('click', function(){
                    document.getElementById("platform").removeChild(document.getElementById("removeButton"));
                }, false);
                platform.appendChild(removeButton);
            }
            else if(data.a_vgame_platform.length === 1){
                document.getElementById("a_vgame_platform").value = data.a_vgame_platform[0];
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
    createButton.addEventListener('click', VideoGame.clearSearch,false);
    createButton.addEventListener('click',function(){
        document.getElementById("message").innerHTML = "Trade offer created successfully!";
    },false);

    let updateButton = document.getElementById("updateButton");
    updateButton.disabled = true;
});