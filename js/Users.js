const part_form = `
    <div class="form-mail form2 form" >
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
    <div class="form-mail form2 form" >
      <label for="Email">E-mail:</label>
      <input type="email" name="Email" id="Email" required>
    </div>
    <div class="form-mail form2 form">
      <label for="name">Nom:</label>
      <input type="test" name="name" id="name" required>
    </div>
    <div class="form-SIRET form2 form">
      <label for="name">SIRET:</label>
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
    <button type="submit" >Créer un compte</button>`;

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
  console.log(user, 'grgrgr');
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
    console.log("Nouveau compte :", customer);
    create_user(customer);

  }
});

get_users();





document.addEventListener('DOMContentLoaded', function () {
  const partLoginButton = document.getElementById("part_login");
  if (partLoginButton) {
    partLoginButton.addEventListener("click", function (event) {
      event.preventDefault();
      const login = document.getElementById('login');
      get_user_by_email(login);
    });
  } else {
    console.log("Element with ID 'part_login' not found.");
  }
});

/**
 * compare email with all users email
 * return user in sessionStorage if user exists
 */
function get_user_by_email(email) {
  // Get all users from localStorage
  let all_users = JSON.parse(localStorage.getItem('users')) || [];  // Get users or empty array
  console.log(all_users);  // Debug: see users in localStorage

  // Loop through users to find the one with the matching email
  all_users.forEach(user => {
    if (user.Email === email.value) {
      // Store user in sessionStorage
      current_user(user);
      // Redirect to profile page with user email in the URL
      console.log('User found, redirecting to profile');
      window.location.replace(`${window.location.origin}/html/Profile.html?user=${encodeURIComponent(user.Email)}`);
    } else {
      console.log('User not found');
    }
  });
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);  
  return urlParams.get(param);  
}


function displayUserProfile() {
  const userEmail = getQueryParam('user'); 

  if (userEmail) {

    const all_users = JSON.parse(localStorage.getItem('users')) || [];
    const user = all_users.find(user => user.Email === userEmail);

    if (user) {

      document.getElementById('user-name').textContent = user.name;
      document.getElementById('Email').textContent = user.Email;
    } else {
 
      document.getElementById('user-name').textContent = 'Utilisateur non trouvé';
      document.getElementById('user-email').textContent = '';
    }
  } else {

    document.getElementById('user-name').textContent = 'Utilisateur non connecté';
    document.getElementById('user-email').textContent = '';
  }
}


displayUserProfile();

console.log(window.location.search);