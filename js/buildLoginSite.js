document.addEventListener("DOMContentLoaded", function (event){

    class LoginSite{


        constructor() {
            let  introText = "Das ist LeTausch. Hier können Sie Sachen finden und auch suchen um diese zu tauschen oder zu erwerben!";
            console.log("Ich bin der Konstruktor von LoginSite");
            this.headerbuildSite = document.getElementById("banner");
            this.headerHeadline = document.createElement("h1");
            this.headerHeadline.textContent = "LeTausch";
            this.introductionField = document.createElement("span");
            this.introductionField.textContent = introText;
            this.introductionField.id = "introText";
            this.messageHeadline = document.createElement("h2");
            this.messageHeadline.textContent = "Bitte loggen Sie sich ein!";
// Put all together:
            this.headerbuildSite.appendChild(this.headerHeadline);
            this.headerbuildSite.appendChild(this.introductionField);
            this.headerbuildSite.appendChild(this.messageHeadline);
            this.loginField();
        }

        loginField(){

            this.brSpace = document.createElement("br");
                this.mainbuildSite = document.getElementById("mainSite");
                this.selectbuildSite = document.createElement("section");
                this.labelinputSiteUname = document.createElement("label");
                this.labelinputSiteUname.setAttribute("for", "username");
                this.labelinputSitePassword = document.createElement("label");
                this.labelinputSitePassword.setAttribute("for", "password");
                this.inputSiteUname = document.createElement("input");
                this.inputSiteUname.type = "email";
                this.inputSiteUname.id = "username";
                this.inputSiteUname.placeholder = "E-Mail Adresse";
                this.inputSiteUname.required = true;
                this.inputSitepassword = document.createElement("input");
                this.inputSitepassword.type = "password";
                this.inputSitepassword.id = "password";
                this.inputSitepassword.placeholder = "Passwort"
                this.inputSitepassword.required = true;
                this.buttonLoginbuildSite = document.createElement("button");
                this.buttonLoginbuildSite.type = "button";
                this.buttonLoginbuildSite.id = "login";
                this.buttonLoginbuildSite.setAttribute("onclick", "logIn()");
            this.buttonLoginbuildSite.textContent = "Login";
                this.buttonRegisterbuildSite = document.createElement("button");
                this.buttonRegisterbuildSite.type = "button";
                this.buttonRegisterbuildSite.id = "register";
                this.buttonRegisterbuildSite.onclick = "register()";
                this.buttonRegisterbuildSite.textContent = "Registrieren";
                this.spanMessagebuildSite = document.createElement("span");
                this.spanMessagebuildSite.id = "messages";

                //Put them all together!
                this.mainbuildSite.appendChild(this.selectbuildSite);
                this.selectbuildSite.appendChild(this.labelinputSiteUname);
                this.selectbuildSite.appendChild(this.inputSiteUname);
            this.selectbuildSite.appendChild(document.createElement("br"));
                this.selectbuildSite.appendChild(this.labelinputSitePassword);
                this.selectbuildSite.appendChild(this.inputSitepassword);
                this.selectbuildSite.appendChild(this.brSpace);
                this.selectbuildSite.appendChild(this.buttonLoginbuildSite);
                this.selectbuildSite.appendChild(this.buttonRegisterbuildSite);
                this.selectbuildSite.appendChild(this.spanMessagebuildSite);
        }

        }

    let test = new LoginSite();
});