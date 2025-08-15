import { useState, useEffect } from 'react'
import { buildVehicleQuery } from '../utils/buildQuery'
import { loadBlobImage } from '../utils/loadBlobImage'
import api from '../Services/api'

export function useVehicle( options = {}, dependencies = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const endpoint = buildVehicleQuery(dependencies[0], dependencies[1])

  useEffect(() => {
    let isMounted = true
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        const response = await api.request( { url: endpoint, ...options } );
        
        const vehicles = response.data.data.vehicles;
        const vehiclesWithBlobs = await Promise.all(
          vehicles.map(async (vehicle) => {
            try {
              const imageResponse = await api.get(vehicle.imageUrl, { responseType: 'blob' });
              const imageUrl = URL.createObjectURL(imageResponse.data);
              return { ...vehicle, image: imageUrl };
            } catch {
              return { ...vehicle, image: '/default-vehicle.png' };
            }
          })
        );
        const responseData = ({...response.data, data: {...response.data.data, vehicles: vehiclesWithBlobs}})

        if (isMounted) setData(responseData);
        // if (isMounted) setData(response.data)
      } catch (err) {
        if (isMounted) setError(err.response?.data?.message || 'Erro ao conectar com a API')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchData()
    return () => { isMounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return { data, loading, error }
}

export function useVehicleById( options = {}, dependencies = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const id = dependencies[0]

  useEffect(() => {
    let isMounted = true
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        const response = await api.request(
          { url: `/vehicles/${id}`, ...options }
        );
        const responseData = await loadBlobImage(response.data.data);
        if (isMounted) setData({...response.data, data: responseData})
      } catch (err) {
        if (isMounted) setError(err.response?.data?.message || 'Erro ao conectar com a API')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchData()
    return () => { isMounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return { data, loading, error }
} 

export function useAddVehicle() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const addVehicle = async (vehicleData) => {
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      await api.post('/vehicles', vehicleData,
        {headers: { 'Content-Type': 'multipart/form-data' }}
      )
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao adicionar veículo')
      if (err.response?.data?.details) setError(err.response?.data?.message + ' ' + err.response?.data?.details || 'Erro ao excluir veículo')
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

  const updateVehicle = async (id, data) => {
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      await api.put(`/vehicles/${id}`, data,
        {headers: { 'Content-Type': 'multipart/form-data' }}
      )
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao atualizar veículo')
      if (err.response?.data?.details) setError(err.response?.data?.message + ' ' + err.response?.data?.details || 'Erro ao excluir veículo')
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
      if (err.response?.data?.details) setError(err.response?.data?.message + ' ' + err.response?.data?.details || 'Erro ao excluir veículo')
    } finally {
      setLoading(false)
    }
  }

  return { deleteVehicle, loading, error, success }
} 