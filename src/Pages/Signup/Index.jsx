import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleRegister(e) {
    e.preventDefault()
    alert('Cadastro realizado!')
    navigate('/signin')
  }

  return (
    <main className='sign'>
      <form className='sign-form' onSubmit={handleRegister}>

        <h2 className='title'>Criar uma conta</h2>

        <div>
          <label htmlFor="name">Nome</label>
          <input className='input' id="name" type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input className='input' id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>

        <div>
          <label htmlFor="password">Senha</label>
          <input className='input' id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>

        <button className='btn' type="submit">Cadastrar</button>

        <p>Já tem uma conta? <Link className='link' to="/signin">Entrar</Link></p>

      </form>
    </main>
  )
}

export default Register 