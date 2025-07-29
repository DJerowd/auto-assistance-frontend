import { useState } from 'react'
import api from '../Services/api'

export function useAddVehicle() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const addVehicle = async (vehicleData) => {
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      await api.post('/vehicles', vehicleData)
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao adicionar veículo')
    } finally {
      setLoading(false)
    }
  }

  return { addVehicle, loading, error, success }
}

export function useUpdateVehicle() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const updateVehicle = async (vehicleId, vehicleData) => {
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      await api.put(`/vehicles/${vehicleId}`, vehicleData)
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao atualizar veículo')
    } finally {
      setLoading(false)
    }
  }

  return { updateVehicle, loading, error, success }
}

export function useDeleteVehicle() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const deleteVehicle = async (vehicleId) => {
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      await api.delete(`/vehicles/${vehicleId}`)
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao excluir veículo')
    } finally {
      setLoading(false)
    }
  }

  return { deleteVehicle, loading, error, success }
} 