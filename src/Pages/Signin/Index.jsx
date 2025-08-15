import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../../Hooks/useAuth'
import { TextInput, PasswordInput } from '../../Components/Inputs/FormInputs'

import '../../Styles/components/inputs.css'
import '../../Styles/components/buttons.css'
import '../../Styles/sign.css'

export default function Login() {
  const [ formData, setFormData ] = useState({ email: '', password: '' });
  const { login, loading, error } = useAuth();

  function handleLogin(e) {
    e.preventDefault()
    login(formData)
  }

  return (
    <main className='sign'>
      <form className='sign-form' onSubmit={handleLogin}>

        <h2 className='title'>Acesse sua conta</h2>
        
        <TextInput
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
        />

        <PasswordInput
          id="password"
          label="Password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          required
        />

        {error && <p className='text-error'>{error}</p>}

        <button className='btn' type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <p>Não tem uma conta? <Link className='link' to="/signup">Cadastre-se</Link></p>

      </form>
    </main>
  )
};