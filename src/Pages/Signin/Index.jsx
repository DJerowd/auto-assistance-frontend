import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Hooks/useAuth'
import '../../Styles/components/inputs.css'
import '../../Styles/components/buttons.css'
import '../../Styles/sign.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading } = useAuth()

  function handleLogin(e) {
    e.preventDefault()
    login({ email, password })
  }

  return (
    <main className='sign'>
      <form className='sign-form' onSubmit={handleLogin}>

        <h2 className='title'>Acesse sua conta</h2>
        
        <div>
          <label htmlFor="email">Email</label>
          <input className='input' id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>

        <div>
          <label htmlFor="password">Senha</label>
          <input className='input' id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>

        <button className='btn' type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <p>Não tem uma conta? <Link className='link' to="/signup">Cadastre-se</Link></p>

      </form>
    </main>
  )
};