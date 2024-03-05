import { ReactNode } from 'react';
import Navbar from './Navbar';

type Props = {
  auth: {
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  },
  children: ReactNode;
}


const Layout: React.FC<Props> = (props: Props) => {
  const {auth, children} = props;
  const {isLoggedIn, setIsLoggedIn} = auth;

  return (
    <>
      <Navbar auth={{isLoggedIn, setIsLoggedIn}} />
      {children}
    </>
  );
}

export default Layout;
