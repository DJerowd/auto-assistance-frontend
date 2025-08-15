import { useState, useEffect } from "react";
import { buildMaintenacesQuery } from "../utils/buildQuery";
import api from '../Services/api'

export default function useMaintenance( options = {}, dependencies = [] ) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const endpoint = buildMaintenacesQuery(dependencies[0], dependencies[1])

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      setLoading(true);
      setError(null)
      try {
        const response = await api.request({ url: endpoint, ...options });
        if (isMounted) setData(response.data.data);
      } catch (err) {
        if (isMounted) setError(err.response?.data?.message || 'Erro ao conectar com a API')
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchData();
    return () => { isMounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, loading, error };
}

export function useAddReminder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const addReminder = async (reminderData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await api.post(`/maintenances`, reminderData);
      setSuccess(true)
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'Erro ao criar lembrete')
    } finally {
      setLoading(false);
    }
  };

  return { addReminder, loading, error, success };
};

export function useUpdateReminder() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const updateReminder = async (id, data) => {
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      await api.put(`/maintenances/${id}`, data,
        {headers: { 'Content-Type': 'multipart/form-data' }}
      )
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao atualizar lembrete')
      if (err.response?.data?.details) setError(err.response?.data?.message + ' ' + err.response?.data?.details || 'Erro ao excluir lembrete')
    } finally {
      setLoading(false)
    }
  }

  return { updateReminder, loading, error, success }
}

export function useDeleteReminder() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const deleteReminder = async (id) => {
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      await api.delete(`/vehicles/${id}`)
      const response = await api.delete(`/maintenances/${id}`);
      setSuccess(true)
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Erro ao excluir veículo')
      if (error.response?.data?.details) setError(error.response?.data?.message + ' ' + error.response?.data?.details || 'Erro ao excluir veículo')
    } finally {
      setLoading(false)
    }
  }

  return { deleteReminder, loading, error, success }
} 
