import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Hooks/useAuth'
import { PasswordInput, TextInput } from '../../Components/Inputs/FormInputs';

function Register() {
  const [ formData, setFormData ] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const { register, loading, error } = useAuth()

  function handleRegister(e) {
    e.preventDefault()
    register(formData)
  }

  return (
    <main className='sign'>
      <form className='sign-form' onSubmit={handleRegister}>

        <h2 className='title'>Criar uma conta</h2>

        <TextInput
          id="name"
          label="Username"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />

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

        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
          required
        />

        {error && <p className='text-error'>{error}</p>}

        <button className='btn' type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <p>Já tem uma conta? <Link className='link' to="/signin">Entrar</Link></p>

      </form>
    </main>
  )
}

export default Register 