import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../Hooks/useAuth';

import '../Styles/components/menu.css';

export default function Menu({showMenu, setShowMenu}) {
    const { logout } = useAuth();

    const handleLogout = () => {
        setShowMenu(false);
        logout();
    };

    return (
        <div className={showMenu ? 'menu-bg menu-bg-show' : 'menu-bg'} onClick={() => { setShowMenu(false) }}>
            <nav className={showMenu ? 'menu menu-show' : 'menu'}  onClick={e => e.stopPropagation()}>
                <Link to="/" onClick={() => { setShowMenu(false) }} className='menu-item'> Home </Link>
                <Link to="/dashboard" onClick={() => { setShowMenu(false) }} className='menu-item'> Dashboard </Link>
                <Link to="/garage" onClick={() => { setShowMenu(false) }} className='menu-item'> Garage </Link>
                <Link to="/reminders" onClick={() => { setShowMenu(false) }} className='menu-item'> Reminders </Link>
                <Link to="/settings" onClick={() => { setShowMenu(false) }} className='menu-item'> Settings </Link>
                <button className='menu-item' onClick={handleLogout}>Logout</button>
            </nav>
        </div>
    )
}

Menu.propTypes = {
    showMenu: PropTypes.bool.isRequired,
    setShowMenu: PropTypes.func.isRequired,
}