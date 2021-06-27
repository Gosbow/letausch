document.addEventListener("DOMContentLoaded", function (event) {
    // const searchURL = "http://localhost:3000/webapi/ol/";
    // const postURL = "http://localhost:3000/article";
    const searchURL = "http://letausch.ffkledering.at:3000/webapi/ol/";
    const postURL = "http://letausch.ffkledering.at:3000/article";

    class Book{
        constructor(userID) {
            this.a_title = document.getElementById("a_title").value.toString();
            this.a_author = document.getElementById("a_author").value.toString();
            this.a_books_isbn = document.getElementById("a_books_isbn").value.toString();
            this.a_description = document.getElementById("a_description").value.toString();
            this.a_imageurl = "img/book_placeholder.jpg";
            this.a_publicationdate = new Date().toISOString();
            this.a_category = "Books";
            this.a_u_email = userID;
        }

        static getSearch(){
            Book.clearSearch();

            let input = document.getElementById("searchField").value;
            console.log("GET to server: " + searchURL + input);
            fetch(searchURL + input)
                .then(function(response){
                    response.json()
                        .then(function(json){
                            Book.printData(json);
                        })
                })
        }

        static clearSearch(){
            document.getElementById("a_title").value = "";
            document.getElementById("a_author").value = "";
            document.getElementById("a_books_isbn").value = "";
            document.getElementById("a_description").value = "";
            document.getElementById("a_imageurl").setAttribute("src","");
            document.getElementById("message").innerHTML = "";
        }

        static printData(data){
            document.getElementById("a_imageurl").setAttribute("src","img/book_placeholder.jpg");
            document.getElementById("a_title").value = data.a_title;
            document.getElementById("a_author").value = data.a_author;
            document.getElementById("a_books_isbn").value = data.a_books_isbn.toString();
            if(!typeof data.a_description === undefined){
                document.getElementById("a_description").value = data.a_description;
            }
        }

        static postBook(userID){
            let book = new Book(userID);

            fetch(postURL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            })
                .then(response => response.text())
                .then(data => {
                    console.log("Book POST Success: ", data);
                })
                .catch((error) =>{
                    console.error("Book POST Error: ", error);
                })
        }
    }

    fetch("http://letausch.ffkledering.at:3000/whoami")
        .then(result => result.json())
        .then(data => {

            let searchButton = document.getElementById("searchButton");
            searchButton.addEventListener('click', Book.getSearch,false);

            let createButton = document.getElementById("createButton");
            createButton.addEventListener('click', function(){
                if(document.getElementById("a_title").value === ""){
                    document.getElementById("message").innerHTML = "Please enter a title!";
                }
                else{
                    Book.postBook(data.iam);
                    Book.clearSearch();
                    document.getElementById("message").innerHTML = "Trade offer created successfully!";
                }
            },false);

        })
        .catch(error => console.error(error));

});