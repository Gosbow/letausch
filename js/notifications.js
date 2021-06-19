function loadPosts(){

    // GET ARTICLE TITLE A
    var titelA = "ABC";
    // GET ARTICLE TITLE B
    var titelB = "GGG";
    // GET REQUESTING USER A
    var userA = "Alice";
    // GET RESPONDING USER B
    var userB = "Bob";
    // GET STATUS
    var status = 0;

    var article = document.createElement("article");
    article.setAttribute("id", "atricle")

    var notificationaction = document.createElement("button");

    // <USER A> möchte gerne <TITLE B> eintauschen.                      <Eintauschen> --> POP UP mit Artikel von A wählen
    // <USER B> möchte gerne <TITLE A> gegen <TITLE B> mit dir tauschen. <Annehmen>    --> POP UP "warten auf bestätigung von A"
    // <USER A> hat den Tasuch <TITEL B> gegen <TITEL A> bestätigt.      <Kontaktdaten>--> POP UP Kontaktdaten
    var notification = document.createElement("p");


    if(status == 0){
        notification.innerHTML = "$userA möchte gerne <TITLE B> eintauschen."; // add as defined
        notificationaction.innerHTML = "Eintasuchen";
        notificationaction.setAttribute("onclick", "eintasuchen()");
    }
    if(status == 1){
        notification.innerHTML = "<USER B> möchte gerne <TITLE A> gegen <TITLE B> mit dir tauschen."; // add as defined
        notificationaction.innerHTML = "Annehmen";
        notificationaction.setAttribute("onclick", "annehmen()");

    }
    if(status == 2){
        notification.innerHTML = "<USER A> hat den Tasuch <TITEL B> gegen <TITEL A> bestätigt."; // add as defined
        notificationaction.innerHTML = "Eintasuchen";
        notificationaction.setAttribute("onclick", "kontaktdaten()");
    }

    document.getElementById("content").appendChild(article);
    document.getElementById("article").appendChild(notification);
    document.getElementById("article").appendChild(notificationaction);
}

function eintauschen() {


    // PUSH STATUS status++
}

function annehmen() {


    // PUSH STATUS status++
}

function kontaktdaten() {


    // PUSH STATUS status++ = 4 (disabled)
}

loadPosts();