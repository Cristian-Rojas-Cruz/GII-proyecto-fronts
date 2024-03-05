const register = () => {
  const apiUrl = "http://localhost:8080/api/auth/signup";
  const registrationForm = document.getElementById('registrationForm');

  const password = registrationForm.elements['password'].value;
  const confirmPassword = registrationForm.elements['confirmPassword'].value;

  if (password != confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
  }

  const roleElement = document.getElementById('roles');
  const roles = Array.from(roleElement.selectedOptions).map(option => option.value);

  const postData = {
    username: registrationForm.elements['username'].value,
    email: registrationForm.elements['email'].value,
    roles: roles,
    password: password
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
          alert(response.body.message);
          window.location.href = '/front/pages/index.html';
      } else {
          throw response.body;
      }
  })
  .catch(error => {
      alert('Error registering user:', error.message);
  });
}
