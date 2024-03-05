import '../styles/index.scss';
import { Link } from 'react-router-dom';
import { validateUsername } from '../utils/validations';
import { FormEvent } from 'react';

const Login = () => {
  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiUrl = "http://localhost:8080/api/auth/signin";
    const loginForm = document.getElementById('loginForm') as HTMLFormElement;
    if (loginForm) {
      const usernameInput = loginForm.elements.namedItem('username') as HTMLInputElement
      const passwordInput = loginForm.elements.namedItem('password') as HTMLInputElement

      const postData = {
        username: usernameInput.value,
        password: passwordInput.value
      }
      
      if(!validateUsername(postData.username)) {
        alert("Invalid Username");
        return;
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
              alert('Login exitoso: ' + response.body.username);
              window.location.href = '/';
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
  }
  return (
    <section id="login">
      <form onSubmit={login} id="loginForm">
        <Link to="/">Go back</Link>
        <h2>Login</h2>
        <input type="text" id="username" name="username" placeholder="username" required />
        
        <input type="password" id="password" name="password" placeholder="Password" required />
        
        <button type="submit">Login</button>
      </form>
    </section>
  );
}

export default Login;
