document.addEventListener("DOMContentLoaded", function (event){

    class buildSite{

        constructor(login) {
           if(login == "ok") {

           }


           this.footer();
            // this.img
        }

        footer(){
            this.footerbuildSite = document.getElementById("footer");
            this.divfooterSite = document.createElement("div");
            this.aAGBSite = document.createElement("a");
            this.aAGBSite.href = "agb.html";
            this.aAGBSite.target = "_self";
            this.aAGBSite.textContent = "AGB";
            this.aImpressumSite = document.createElement("a");
            this.aImpressumSite.href = "impressum.html";
            this.aImpressumSite.target = "_self";
            this.aImpressumSite.textContent = "Impressum";
            this.aKontaktSite = document.createElement("a");
            this.aKontaktSite.href = "kontakt.html";
            this.aKontaktSite.target = "_self";
            this.aKontaktSite.textContent = "Kontakt";

            //
            this.footerbuildSite.appendChild(this.divfooterSite);
            this.divfooterSite.appendChild(this.aAGBSite);
            this.divfooterSite.appendChild(this.aImpressumSite);
            this.divfooterSite.appendChild(this.aKontaktSite);
        }
    }

    let site = new buildSite();
});