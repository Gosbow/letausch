document.addEventListener("DOMContentLoaded", function (event) {
    // const postURL = "http://localhost:3000/article";
    const postURL = "http://letausch.ffkledering.at:3000/article";

    class Other{
        constructor(userID) {
            this.a_title = document.getElementById("a_title").value;
            this.a_description = document.getElementById("a_description").value;
            this.a_imageurl = "img/other_placeholder.jpg";
            this.a_publicationdate = new Date().toISOString();
            this.a_category = "Other";
            this.a_u_email = userID;
        }

        static clearSearch(){
            document.getElementById("a_title").value = "";
            document.getElementById("a_description").value = "";
            document.getElementById("message").innerHTML = "";
        }

        static postOther(userID){
            let other = new Other(userID);

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
    }

    fetch("http://letausch.ffkledering.at:3000/whoami")
        .then(result => result.json())
        .then(data => {
            let createButton = document.getElementById("createButton");
            createButton.addEventListener('click', function(){
                if(document.getElementById("a_title").value === ""){
                    document.getElementById("message").innerHTML = "Please enter a title!";
                }
                else{
                    Other.postOther(data.iam);
                    Other.clearSearch();
                    document.getElementById("message").innerHTML = "Trade offer created successfully!";
                }
            },false);
       })
        .catch(error => console.error(error));
});