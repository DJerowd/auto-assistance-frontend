import { Link } from 'react-router-dom'

import '../Styles/components/header.css';

function Header() {
  return (
    <header className='header'>
        <h1 className='title'>Auto Assistance</h1>
        <nav>
            <Link className='link' to="/">Início</Link>
            <Link className='link' to="/about">Sobre</Link>
        </nav>
    </header>
  )
}

export default Header 