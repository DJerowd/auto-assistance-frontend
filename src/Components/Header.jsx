import { Link } from 'react-router-dom';
import { getLoggedInUser } from '../utils/auth';
import Menu from './Menu';

import '../Styles/components/header.css';

function Header() {
  const loggedInUser = getLoggedInUser()

  return (
    <header className='header'>
        <h1 className='title'>Auto Assistance</h1>

        {!loggedInUser ? (
            <nav>
              <Link className='link' to="/signin">Entre</Link>
              <Link className='link' to="/signup">Cadastre-se</Link>
          </nav>
        ) : (    
          <Menu />
        )}
    </header>
  )
}

export default Header 