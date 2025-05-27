function navbar() {
  const container = document.getElementById("Header");
  container.innerHTML = "";

  // Recupt type d'utilisateur
  const user = JSON.parse(sessionStorage.getItem('user'));
  const userType = user ? user.type : null;

  const navbarHTML = `
    <div class="navbar">
      <div class="logo">
        <a href="/CyberdeskV2/HTML/accueil.html"><img src="/CyberdeskV2/img/Logo.png" alt="Logo"></a>
      </div>
      <div class="menuLink" id="menuList">
        <a href="/CyberdeskV2/HTML/Catalogue.html?${userType || 'Tous'}">Les produits</a>
        <a href="/Cyberdeskv2/HTML/Panier.html"><img class="panierIcon" src="/CyberdeskV2/img/panier.png" alt="" id="panierList"></a>
        ${user ? `
          <a href="/CyberdeskV2/HTML/Utilisateur.html?user=${encodeURIComponent(user.Email)}">${user.name}</a>
          <a href="#" id="logout">Déconnexion</a>
        ` : `
          <a href="/CyberdeskV2/HTML/Connect.html"><button class="contact">Connexion</button></a>
        `}
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

  // Deconnexion
  if (document.getElementById('logout')) {
    document.getElementById('logout').addEventListener('click', function () {
      sessionStorage.removeItem('user');
      window.location.replace('/CyberdeskV2/HTML/accueil.html');
    });
  }
}
navbar();

function Panier(){
  const panierList = document.getElementById("panierList");
}

function menuBurger() {
    const menuList = document.getElementById("menuList");
    menuList.classList.toggle("open");
}



//Footer
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

        
        </div>
        <a href="/Cyberdeskv2/HTML/Connect.html" <button class="contact">Connexion</button></a>
        </div>
    <div class="crédit">Créer par Bunf</div>
    



    `;
    container.innerHTML += navbarBottomHTML
}

navbarBottom();



