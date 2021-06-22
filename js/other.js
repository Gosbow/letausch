document.addEventListener("DOMContentLoaded", function (event) {
    let createTrue = true;

    class Other{
        constructor(title, description) {
            this.a_title = a_title;
            this.a_description = a_description;
            this.a_category = "Other";
        }

        static printInput(input){
            document.getElementById("a_title").value = input.a_title;
            document.getElementById("a_description").value = input.a_description;
        }

        static postOther(){
            let other = new Other(
                document.getElementById("a_title").value,
                document.getElementById("a_description").description);

            // To-Do implement fetch for POST METHOD
        }
    }

    let createButton = document.getElementById("createButton");
    createButton.addEventListener('click', Other.postOther,false);

    let updateButton = document.getElementById("updateButton").disabled = true;

});