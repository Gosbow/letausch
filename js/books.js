document.addEventListener("DOMContentLoaded", function (event) {
    const searchURL = "http://openlibrary.org/search.json?q=";

    function searchInput(){
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("publicationdate").value = "";
        document.getElementById("books_isbn").value = "";

        let input = document.getElementById("searchField").value;
        input = input.replace(/\s/g, "+");
        console.log(searchURL + input);
        fetch(searchURL + input)
            .then(response => response.json())
            .then(function(data) {
                // console.log(data);
                Books.printInput(data, 1);
            });
    }

    class Books{
        constructor(title, author, publicationsdate, books_isbn) {
            this.title = title;
            this.author = author;
            this.publicationsdate = publicationsdate;
            this.book_isbn = books_isbn;
        }

        static printInput(input, index){
            console.log(input.docs[index]);
            let book = input.docs[index];
            document.getElementById("title").value = book.title.toString();
            document.getElementById("author").value = book.author_name.toString();
            document.getElementById("publicationdate").value = book.first_publish_year.toString();
            document.getElementById("books_isbn").value = book.isbn[0].toString();
        }

        static postBook(){
            let book = new Books(
                document.getElementById("title").value.toString(),
                document.getElementById("author").value.toString(),
                document.getElementById("publicationdate").value.toString(),
                document.getElementById("books_isbn").value.toString());

            // To-Do implement fetch for POST METHOOD
        }
    }


    let searchButton = document.getElementById("searchButton");
    searchButton.addEventListener('click', searchInput,false);

    let createButton = document.getElementById("createButton");
    createButton.addEventListener('click', Books.postBook,false);

});