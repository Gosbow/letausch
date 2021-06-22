document.addEventListener("DOMContentLoaded", function (event) {
    const searchURL = "http://localhost:3000/webapi/ol/";
    let createTrue = true;

    function searchInput(){
        document.getElementById("a_title").value = "";
        document.getElementById("a_author").value = "";
        document.getElementById("a_publicationdate").value = "";
        document.getElementById("a_books_isbn").value = "";
        document.getElementById("a_description").value = "";

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
        constructor(a_title, a_author, a_publicationdate, a_books_isbn, a_description) {
            this.a_title = a_title;
            this.a_author = a_author;
            this.a_publicationdate = a_publicationdate;
            this.a_books_isbn = a_books_isbn;
            this.a_description = a_description;
            this.a_category = "Book";
        }

        static printInput(input){
            document.getElementById("a_title").value = input.a_title;
            document.getElementById("a_author").value = input.a_author;
            document.getElementById("a_publicationdate").value = input.a_publicationdate;
            document.getElementById("a_books_isbn").value = input.a_books_isbn.toString();
            if(!typeof input.a_description === undefined){
                document.getElementById("a_description").value = input.a_description;
            }
        }

        static postBook(){
            let book = new Book(
                document.getElementById("a_title").value.toString(),
                document.getElementById("a_author").value.toString(),
                document.getElementById("a_publicationdate").value.toString(),
                document.getElementById("a_books_isbn").value.toString(),
                document.getElementById("a_description").value.toString());

            // To-Do implement fetch for POST METHOD
        }
    }


    let searchButton = document.getElementById("searchButton");
    searchButton.addEventListener('click', searchInput,false);

    let createButton = document.getElementById("createButton");
    createButton.addEventListener('click', Book.postBook,false);

    let updateButton = document.getElementById("updateButton").disabled = true;

});