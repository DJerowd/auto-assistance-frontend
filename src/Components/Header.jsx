import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getLoggedInUser } from '../utils/auth';
import Menu from './Menu';

import '../Styles/components/header.css';

function Header() {
  const [showMenu, setShowMenu] = useState(false)
  const loggedInUser = getLoggedInUser()

  return (
    <header className='header'>
        <h1 className='title-header'>Auto Assistance</h1>

        {!loggedInUser ? (
          <nav>
            <Link className='link' to="/signin">Entre</Link>
            <Link className='link' to="/signup">Cadastre-se</Link>
          </nav>
        ) : ( 
          <nav>
            <button className='btn btn-header' onClick={() => { setShowMenu(!showMenu) }}>
              ☰ Menu
            </button>   
            <Menu showMenu={showMenu} setShowMenu={setShowMenu}/>
          </nav>
        )}
    </header>
  )
}

export default Header 