document.addEventListener("DOMContentLoaded", function (event) {
    const searchURL = "https://www.giantbomb.com/api/search/format=json&resources=game&query=";
    const gameURL = "https://www.giantbomb.com/api/game/";
    const apiKey = "/&api_key=INSERT API KEY";


    function searchInput(){
        let input = document.getElementById("searchField").value;
        console.log(searchURL + input);
        fetch(searchURL + input,{
            mode: "no-cors"
        })
            // .then(function (response) {
            //     response.json()
                    .then(function (json) {
                        console.log(json);
                    })
            // })
        document.getElementById("result").value = input;
    }

    let searchButton = document.getElementById("searchButton");
    searchButton.addEventListener('click', searchInput,false);

});