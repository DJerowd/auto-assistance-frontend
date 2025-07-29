import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../Services/api'

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const register = async (userData) => {
    setLoading(true)
    setError(null)
    try {
      await api.post('/users/auth/register', userData)
      alert('Cadastro realizado!')
      navigate('/signin')
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message
      setError(errorMessage)
      alert('Erro ao cadastrar: ' + errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.post('/users/auth/login', credentials)
      const { token, user } = response.data.data
      console.log(response.data.data)
      localStorage.setItem('loggedInUser', JSON.stringify({ token, user }))
      alert('Login realizado!')
      navigate('/dashboard')
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message
      setError(errorMessage)
      alert('Erro ao fazer login: ' + errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('loggedInUser')
    navigate('/signin')
  }

  return {
    register,
    login,
    logout,
    loading,
    error
  }
} 