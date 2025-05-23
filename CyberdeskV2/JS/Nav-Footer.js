function navbar(header) {
    const container = document.getElementById("Header");
    container.innerHTML = "";
    const navbarHTML = `
<div class="navbar">
    <div class="logo">
        <a href="/CyberdeskV2/HTML/accueil.html"><img src="/CyberdeskV2/img/Logo.png" alt="Logo"></a>
    </div>
    <div class="menuLink" id="menuList">
    <a href="/CyberdeskV2/HTML/Catalogue.html?Tous">Les produits</a>
        <a href="/CyberdeskV2/HTML/E-book.html">E-Books</a>
        <a href="/CyberdeskV2/HTML/Jeux.html">Jeux</a>
        <a href="/CyberdeskV2/HTML/Exploit.html">Systéme d'exploitation</a>
        <a href="/CyberdeskV2/HTML/Bureautique.html">Bureautique & utilitaires</a>
        <a href="#"><img class="panierIcon" src="/CyberdeskV2/img/panier.png" alt=""></a>
        <button class="contact">Contactez-nous</button>
    </div>
    <div class="mobileMenu">
        <svg onclick="menuBurger()" width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_429_11066)">
                <path d="M3 6.00092H21M3 12.0009H21M3 18.0009H21" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_429_11066">
                    <rect width="24" height="24" fill="white" transform="translate(0 0.000915527)" />
                </clipPath>
            </defs>
        </svg>
    </div>
</div>


    `;
    container.innerHTML += navbarHTML;
}

navbar();



function menuBurger() {
    const menuList = document.getElementById("menuList");
    menuList.classList.toggle("open");
}




function navbarBottom(Footer) {
    const container = document.getElementById("FooterBase");
    container.innerHTML = "";
    const navbarBottomHTML = `
    <div id="Footer">
    <div class="footerItemC2">
        <div><a href="/CyberdeskV2/HTML/accueil.html"><img src="/CyberdeskV2/img/Logo.png" alt="Logo"></a></div>
        <div>Politique de confidentialité</div>
    </div>
        <div class="footerItem">
        <a href="/CyberdeskV2/HTML/Catalogue.html">Les produits</a>
        <a href="/CyberdeskV2/HTML/E-book.html">E-Books</a>
        <a href="/CyberdeskV2/HTML/Jeux.html">Jeux</a>
        <a href="/CyberdeskV2/HTML/Exploit.html">Systéme d'exploitation</a>
        <a href="/CyberdeskV2/HTML/Bureautique.html">Bureautique & utilitaires</a>
        
        </div>
        <button class="contact">Contactez-nous</button>
        </div>
    <div class="crédit">Créer par Bunf</div>
    



    `;
    container.innerHTML += navbarBottomHTML
}

navbarBottom();



