import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../Styles/components/menu.css';

export default function Menu({showMenu, setShowMenu}) {

    return (
        <div className={showMenu ? 'menu-bg menu-bg-show' : 'menu-bg'}>
            <nav className={showMenu ? 'menu menu-show' : 'menu'}>
                <Link to="/" onClick={() => { setShowMenu(false) }} className='menu-item'> Início </Link>
                <Link to="/about" onClick={() => { setShowMenu(false) }} className='menu-item'> Sobre </Link>
                <Link to="/dashboard" onClick={() => { setShowMenu(false) }} className='menu-item'> Dashboard </Link>
                <Link to="/garage" onClick={() => { setShowMenu(false) }} className='menu-item'> Garagem </Link>
            </nav>
        </div>
    )
}

Menu.propTypes = {
    showMenu: PropTypes.bool.isRequired,
    setShowMenu: PropTypes.func.isRequired,
}