document.addEventListener("DOMContentLoaded", function (event) {
    const searchURL = "http://localhost:3000/webapi/ol/";

    function searchInput(){
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("publicationdate").value = "";
        document.getElementById("books_isbn").value = "";

        let input = document.getElementById("searchField").value;
        console.log("GET to server: " + searchURL + input);
        fetch(searchURL + input)
            .then(function(response){
                response.json()
                    .then(function(json){
                        Book.printInput(json);
                    })
            })
    }

    class Book{
        constructor(title, author, publicationdate, books_isbn) {
            this.title = title;
            this.author = author;
            this.publicationdate = publicationdate;
            this.books_isbn = books_isbn;
        }

        static printInput(input){
            document.getElementById("title").value = input.title;
            document.getElementById("author").value = input.author;
            document.getElementById("publicationdate").value = input.publicationdate;
            document.getElementById("books_isbn").value = "" + input.books_isbn;
        }

        static postBook(){
            let book = new Book(
                document.getElementById("title").value.toString(),
                document.getElementById("author").value.toString(),
                document.getElementById("publicationdate").value.toString(),
                document.getElementById("books_isbn").value.toString());

            // To-Do implement fetch for POST METHOD
        }
    }


    let searchButton = document.getElementById("searchButton");
    searchButton.addEventListener('click', searchInput,false);

    let createButton = document.getElementById("createButton");
    createButton.addEventListener('click', Book.postBook,false);

});