window.onload = () => {
  fetch("http://127.0.0.1:8080")
    .then(res => {
        return res.json()
      }).then((data) => {
        contentSection = document.getElementById("content")
        content.innerHTML = `
          <h1>${data.message}</h1>
        `
      }) 
  .catch(error => {
      console.error('Error fetching data:', error);
  });
  const roles = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  let endpoint;
  if (!roles) {
      endpoint = '/api/test/all'
  } else if (roles.includes('ADMIN')) {
      endpoint = '/api/test/admin';
  } else if (roles.includes('MODERATOR')) {
      endpoint = '/api/test/mod';
  } else if (roles.includes('USER')) {
      endpoint = '/api/test/user';
  } else {
      endpoint = '/api/test/all'
  }

  fetch("http://127.0.0.1:8080" + endpoint, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  })
    .then(response => response.json())
    .then(data => {
      contentSection = document.getElementById("content")
      content.innerHTML += `
        <div class="info">${data.message}</div>
      `
    })
}
