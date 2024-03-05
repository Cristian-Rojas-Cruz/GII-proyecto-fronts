import { Link } from "react-router-dom";

type Props = {
  auth: {
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  },
}

const Navbar: React.FC<Props> = (props: Props) => {
  const {auth} = props;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    auth.setIsLoggedIn(false);
    window.location.reload();
  };
  
  const getNavItems = () => {
    if (auth.isLoggedIn) {
      return (
        <nav className="navbar__navigation">
          <Link to="/" onClick={handleLogout}>Log out</Link>
        </nav>
      )
    } else {
      return (
        <nav className="navbar__navigation">
          <Link to="/registration">Registration</Link>
          <Link to="/login">Login</Link>
        </nav>
      )
    }
  }

  return (
    <div className="navbar">
      <div className="container">
        <a className="navbar__logo" href="/">
          <img src="/images/logo.png" alt="Logo" />
        </a>
        { getNavItems() }
      </div>
    </div>
  );
}

export default Navbar;