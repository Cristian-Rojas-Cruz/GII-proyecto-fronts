import '../styles/index.scss';
import { Link } from "react-router-dom";
import { validateEmail, validateUsername } from '../utils/validations';
import { FormEvent } from 'react';

interface postUserData {
  username: string,
  email: string,
  roles: string[],
  password: string
}


const Registration = () => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiUrl = "http://localhost:8080/api/auth/signup";
    const registrationForm: HTMLFormElement = document.getElementById('registrationForm') as HTMLFormElement;
  
    if (registrationForm) {
      const passwordInput = registrationForm.elements.namedItem('password') as HTMLInputElement
      const confirmPasswordInput = registrationForm.elements.namedItem('confirmPassword')as HTMLInputElement;
      const usernameInput = registrationForm.elements.namedItem('username') as HTMLInputElement;
      const emailInput = registrationForm.elements.namedItem('email') as HTMLInputElement;
      const roleElement = document.getElementById('roles') as HTMLSelectElement;
      const roles = Array.from(roleElement.selectedOptions).map(option => option.value);


      const postData: postUserData = {
        username: usernameInput.value,
        email: emailInput.value,
        roles: roles,
        password: passwordInput.value
      }

      if (postData.password.length <= 2){
        alert("Password too little! minimun lenght 2");
        return;
      }
      if (postData.password !== confirmPasswordInput.value) {
        alert("Password and Confirm Password do not match!");
        return;
      }
      if(!validateUsername(postData.username)) {
        alert("Invalid Username");
        return;
      }
      if (!validateEmail(postData.email)) {
        alert("Invalid Email!");
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
              alert(response.body.message);
              window.location.href = '/';
          } else {
              throw response.body;
          }
      })
      .catch(error => {
          alert(error.message);
      });
    } 
  }
  

  return (
    <section id="registration">
      <form onSubmit={onSubmit} id="registrationForm">
          <Link to="/">Go back</Link>
          <h2>Registration</h2>
          <input type="text" id="username" name="username" placeholder="Username" required />

          <input type="email" id="email" name="email" placeholder="Email" required />
          
          <input type="password" id="password" name="password" placeholder="Password" required />
          
          <label htmlFor="confirmPassword">Confirm password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" required />

          <label htmlFor="roles">Select Role:</label>
          <select id="roles" name="roles" multiple required>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="user">User</option>
          </select>

          <button type="submit">Register</button>
      </form>
  </section>
  );
}

export default Registration;
