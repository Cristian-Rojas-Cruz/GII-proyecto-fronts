
function login() {
  const apiUrl = "http://localhost:8080/api/auth/signin";
  const loginForm = document.getElementById('loginForm');

  const postData = {
    username: loginForm.elements['username'].value,
    password: loginForm.elements['password'].value
  }

  fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json().then(data => ({ status: response.status, body: data })))
  .then(response => {
      if (response.status === 200) {
          alert('Registro exitoso: ' + response.body.username);
          window.location.href = '/front/pages/index.html';
          localStorage.setItem("role", response.body.roles)
          localStorage.setItem("token", response.body.accessToken)
      } else {
          throw response.body;
      }
  })
  .catch(error => {
      console.error('Error logging in:', error);
  });
}