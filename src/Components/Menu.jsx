import { useState } from 'react'
import { Link } from 'react-router-dom'

function Menu() {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div style={{ position: 'relative' }}>
      {/* Botão do menu */}
      <button
        onClick={() => { setShowMenu(!showMenu) }}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--color-light)',
          fontSize: 'var(--font-size-subtitle)',
          cursor: 'pointer',
          padding: 'var(--spacing-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-xs)'
        }}
      >
        ☰ Menu
      </button>

      {/* Menu dropdown */}
      {showMenu && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          background: 'var(--color-bg)',
          border: 'var(--border-width) solid var(--border-color)',
          zIndex: 999
        }}>
          <nav>
            <Link
              to="/"
              onClick={() => { setShowMenu(false) }}
              style={{
                display: 'block',
                padding: 'var(--spacing-md)',
                color: 'var(--color-light)',
                textDecoration: 'none',
                borderBottom: 'var(--border-width) solid var(--border-color)'
              }}
            >
              Início
            </Link>
            <Link
              to="/about"
              onClick={() => { setShowMenu(false) }}
              style={{
                display: 'block',
                padding: 'var(--spacing-md)',
                color: 'var(--color-light)',
                textDecoration: 'none',
                borderBottom: 'var(--border-width) solid var(--border-color)'
              }}
            >
              Sobre
            </Link>
            <Link
              to="/dashboard"
              onClick={() => { setShowMenu(false) }}
              style={{
                display: 'block',
                padding: 'var(--spacing-md)',
                color: 'var(--color-light)',
                textDecoration: 'none'
              }}
            >
              Dashboard
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}

export default Menu 