document.addEventListener("DOMContentLoaded", function (event) {
    // const postURL = "http://localhost:3000/article";
    const postURL = "http://letausch.ffkledering.at:3000/article";

    let createTrue = true;

    class Other{
        constructor(data) {
            this.a_title = document.getElementById("a_title").value;
            this.a_description = document.getElementById("a_description").value;
            this.a_imageurl = "img/other_placeholder.jpg";
            this.a_publicationdate = new Date().toISOString();
            this.a_category = "Other";
        }

        static clearSearch(){
            document.getElementById("a_title").value = "";
            document.getElementById("a_description").value = "";
            document.getElementById("message").innerHTML = "";
        }

        static printData(data){
            document.getElementById("a_title").value = data.a_title;
            document.getElementById("a_description").value = data.a_description;
        }

        static postOther(){
            let other = new Other();

            fetch(postURL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(other),
            })
                .then(response => response.text())
                .then(data => {
                    console.log("Other Article POST Success: ", data);
                })
                .catch((error) =>{
                    console.error("Other Article POST Error: ", error);
                })
        }

        static putOther(){
            let other = new Other();

            let putURL = postURL + "/ID!!";

            fetch(putURL, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(other),
            })
                .then(response => response.text())
                .then(data => {
                    console.log("Other Article  PUT Success: ", data);
                })
                .catch((error) =>{
                    console.error("Other Article PUT Error: ", error);
                })
        }

        static deleteOther(){
            let deleteURL = postURL + "/ID!!!";

            fetch(deleteURL, {
                method: "DELETE"
            })
                .then(response => response.text())
                .then(data => {
                    console.log("Other Article DELETE Success: ", data);
                })
                .catch((error) =>{
                    console.error("Other Article DELETE Error: ", error);
                })
        }

        static getOtherByID(){
            let getURL = articleURL + "/19";

            console.log("GET to server: " + getURL);
            fetch(getURL)
                .then(function(response){
                    response.json()
                        .then(function(json){
                            Other.printData(json);
                        })
                })
        }
    }

    let createButton = document.getElementById("createButton");
    createButton.addEventListener('click', function(){
        if(document.getElementById("a_title").value === ""){
            document.getElementById("message").innerHTML = "Please enter a title!";
        }
        else{
            Other.postOther();
            Other.clearSearch();
            document.getElementById("message").innerHTML = "Trade offer created successfully!";
        }
    },false);
});