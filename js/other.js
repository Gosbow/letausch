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

        static clearData(){
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
    }

    let createButton = document.getElementById("createButton");
    createButton.addEventListener('click', Other.postOther,false);
    createButton.addEventListener('click', Other.clearData,false);
    createButton.addEventListener('click',function(){
        document.getElementById("message").innerHTML = "Trade offer created successfully!";
    },false);

    let updateButton = document.getElementById("updateButton");
    updateButton.disabled = true;
});