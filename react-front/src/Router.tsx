import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = createBrowserRouter([
    { path: "/", element: <Home auth={{isLoggedIn, setIsLoggedIn}}/> },
    { path: "/login", element: <Login /> },
    { path: "/registration", element: <Registration />}
  ])

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = decodeToken(token);

      if (decodedToken.exp * 1000 > Date.now()) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      }
    }
  }, []);

  const decodeToken = (token: string) => {
    return JSON.parse(atob(token.split('.')[1]));
  };

  return (
    <RouterProvider router={router} />
  )
}

export default Router;