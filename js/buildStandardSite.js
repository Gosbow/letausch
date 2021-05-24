document.addEventListener("DOMContentLoaded", function (event){

    class buildSite{

        constructor() {
          if(!document.getElementById("Login")) {
            this.nav();
           }


           this.footer();
            // this.img
        }

        nav(){
            this.navbuildSite = document.getElementById("navigation");
            this.ulnavSite = document.createElement("ul");
            this.linavLogoutSite = document.createElement("li");
            this.liAnavSiteLogout = document.createElement("a");
            this.liAnavSiteLogout.id = "logout";
            this.liAnavSiteLogout.href = "index.html";
            this.liAnavSiteLogout.target = "_self";
            this.liAnavSiteLogout.textContent = "Abmelden"
            this.linavInserateSite = document.createElement("li");
            this.liAnavSiteInserate = document.createElement("a");
            this.liAnavSiteInserate.id = "logout";
            this.liAnavSiteInserate.href = "myarea.html";
            this.liAnavSiteInserate.target = "_self";
            this.liAnavSiteInserate.textContent = "Meine Inserate"
            this.linavAccountSite = document.createElement("li");
            this.liAnavSiteAccount = document.createElement("a");
            this.liAnavSiteAccount.id = "logout";
            this.liAnavSiteAccount.href = "myarea.html";
            this.liAnavSiteAccount.target = "_self";
            this.liAnavSiteAccount.textContent = "Mein Account"
            this.navHeader1Site = document.createElement("h1");
            this.navHeader1Site.id = "LeTausch-Logo";
            this.navHeader1Site.textContent = "LeTausch";
            //Search Bar:
            this.searchnavSite = document.createElement("input");
            this.searchnavSite.placeholder = "Suchen";
            this.searchnavSite.id = "search";
            this.searchnavSite.type = "text";
            this.searchnavSiteButton = document.createElement("button");
            this.searchnavSiteButton.id = "searchButton";
            this.searchnavSiteButton.textContent = "Suchen";

            // Build it:
            this.navbuildSite.appendChild(this.ulnavSite);
            this.ulnavSite.appendChild(this.linavLogoutSite);
            this.linavLogoutSite.appendChild(this.liAnavSiteLogout);
            this.ulnavSite.appendChild(this.linavInserateSite);
            this.linavInserateSite.appendChild(this.liAnavSiteInserate);
            this.ulnavSite.appendChild(this.linavAccountSite);
            this.linavAccountSite.appendChild(this.liAnavSiteAccount);
            this.navbuildSite.appendChild(this.searchnavSite);
            this.navbuildSite.appendChild(this.searchnavSiteButton);
            this.navbuildSite.appendChild(this.navHeader1Site);
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