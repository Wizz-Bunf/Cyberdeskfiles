const part_form = `
  <div class="form-mail form2 form">
    <label for="Email">E-mail:</label>
    <input type="email" name="Email" id="Email" required>
  </div>
  <div class="form-mail form2 form">
    <label for="name">Nom:</label>
    <input type="text" name="name" id="name" required>
  </div>
  <div class="form-mdp form2 form">
    <label for="mdp">Mot de passe:</label>
    <input type="password" name="mdp" id="mdp" required>
  </div>
  <div class="form-mdp form2 form">
    <label for="Cmdp">Confirmer le mot de passe:</label>
    <input type="password" name="Cmdp" id="Cmdp" required>
  </div>
  <button class="compte" type="submit">Créer un compte</button>`;

const pro_form = `
  <div class="form-mail form2 form">
    <label for="Email">E-mail:</label>
    <input type="email" name="Email" id="Email" required>
  </div>
  <div class="form-mail form2 form">
    <label for="name">Nom:</label>
    <input type="text" name="name" id="name" required>
  </div>
  <div class="form-SIRET form2 form">
    <label for="SIRET">SIRET:</label>
    <input type="text" name="SIRET" id="SIRET" required>
  </div>
  <div class="form-mdp form2 form">
    <label for="mdp">Mot de passe:</label>
    <input type="password" name="mdp" id="mdp" required>
  </div>
  <div class="form-mdp form2 form">
    <label for="Cmdp">Confirmer le mot de passe:</label>
    <input type="password" name="Cmdp" id="Cmdp" required>
  </div>
  <button type="submit">Créer un compte</button>`;

const subscribe_form = document.getElementById('subscribe');

function popup(type = 'part') {
  document.getElementById('overlay').style.display = "block";
  document.getElementById('popup-content').style.display = "block";
  subscribe_form.style.display = "block";
  subscribe_form.innerHTML = (type === 'pro') ? pro_form : part_form;
  subscribe_form.dataset.customerType = type;
}

function popupClose() {
  document.getElementById('overlay').style.display = "none";
  document.getElementById('popup-content').style.display = "none";
  subscribe_form.innerHTML = "";
}

function get_users() {
  let users = JSON.parse(localStorage.getItem('users'));
  if (!users) {
    users = [];
    localStorage.setItem('users', JSON.stringify(users));
  }
  return users;
}

function create_user(user) {
  const all_users = get_users();
  all_users.push(user);
  localStorage.setItem('users', JSON.stringify(all_users));
  console.log("Utilisateur enregistré :", user);
}

function get_max_id() {
  const users = get_users();
  return users.length;
}

function current_user(user) {
  sessionStorage.setItem('user', JSON.stringify(user));
  console.log(user, 'Utilisateur connecté');
}

document.addEventListener('submit', function (e) {
  if (e.target.id === 'subscribe') {
    e.preventDefault();
    const form = e.target;
    const customer_type = form.dataset.customerType;

    const customer = {
      type: customer_type,
      id: get_max_id() + 1,
      Email: form.querySelector('#Email').value,
      name: form.querySelector('#name').value,
      mdp: form.querySelector('#mdp').value,
      Cmdp: form.querySelector('#Cmdp').value
    };

    if (customer_type === 'pro') {
      customer.SIRET = form.querySelector('#SIRET').value;
    }

    console.log("Nouveau compte :", customer);
    create_user(customer);
    current_user(customer);
    window.location.replace(`Utilisateur.html?user=${encodeURIComponent(customer.Email)}&type=${encodeURIComponent(customer.type)}`);
  }
});

function get_user_by_email(email) {
  let all_users = JSON.parse(localStorage.getItem('users')) || [];
  console.log(all_users);

  all_users.forEach(user => {
    if (user.Email === email.value) {
      current_user(user);
      window.location.replace(`Utilisateur.html?user=${encodeURIComponent(user.Email)}&type=${encodeURIComponent(user.type)}`);
    } else {
      console.log('Utilisateur non trouvé');
    }
  });
}

function login_user(email, password, type) {
  const users = get_users();
  const user = users.find(u => u.Email === email && u.mdp === password && u.type === type);

  if (user) {
    current_user(user);
    window.location.replace(`Utilisateur.html?user=${encodeURIComponent(user.Email)}&type=${encodeURIComponent(user.type)}`);
  } else {
    alert("Identifiants incorrects ou utilisateur non trouvé.");
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const partLoginButton = document.getElementById("part_login");
  if (partLoginButton) {
    partLoginButton.addEventListener("click", function (event) {
      event.preventDefault();
      const email = document.getElementById('part_login_email').value;
      const password = document.getElementById('part_password').value;
      login_user(email, password, 'part');
    });
  }

  const proLoginButton = document.getElementById("pro_login");
  if (proLoginButton) {
    proLoginButton.addEventListener("click", function (event) {
      event.preventDefault();
      const email = document.getElementById('pro_login_email').value;
      const password = document.getElementById('pro_password').value;
      login_user(email, password, 'pro');
    });
  }
});


function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
document.addEventListener('DOMContentLoaded', function () {
  const user = JSON.parse(sessionStorage.getItem('user'));
  if (user) {
    const container = document.getElementById('user-info');
    if (container) {
      container.innerHTML = `
        <h1>${user.name}</h1>
        <p>E-mail : ${user.Email}</p>
        ${user.type === 'pro' ? `<p>SIRET : ${user.SIRET}</p>` : ''}
        <p>Type d'utilisateur : ${user.type === 'pro' ? 'Professionnel' : 'Particulier'}</p>
      `;
    } else {
      console.error("Élément avec l'ID 'user-info' non trouvé.");
    }
  } 
});


document.addEventListener("DOMContentLoaded", function () {
  afficherPanier();
});


