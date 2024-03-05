import { useEffect, useState } from 'react';
import '../styles/index.scss';
import Layout from '../components/Layout';
import { useSearchParams } from 'react-router-dom';

type Props = {
  auth: {
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  },
}

const Home = (props: Props) => {
  const { isLoggedIn, setIsLoggedIn } = props.auth;
  const [apiResponse, setApiResponse] = useState()

  useEffect(() => {
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
    const getheaders = (token: string | null): HeadersInit => {
      if (token !== null) {
        return {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      } else {
        return {
          'Content-Type': 'application/json'
        }
      }

    }

    fetch("http://127.0.0.1:8080" + endpoint, {
      method: "GET",
      headers: getheaders(token)
    })
      .then(response => response.json())
      .then(data => {
        setApiResponse(data.message)
      })
  }, [])

  return (
    <Layout auth={{ isLoggedIn, setIsLoggedIn }}>
      <section id="content" className="container">
        <h1>Content Displayed based on the user role:</h1>
        <p className="info">
          {apiResponse}
        </p>
      </section>
    </Layout>
  );
}

export default Home;
