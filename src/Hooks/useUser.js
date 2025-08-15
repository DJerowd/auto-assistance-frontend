import { useState, useCallback } from "react";
import api from "../Services/api"; // Axios configurado com baseURL

export function useUpdateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const updateUser = useCallback(async (id, { name, email, password }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await api.put(`/users/${id}`, {
        name,
        email,
        password: password || undefined, // não envia se não existir
      });
      setSuccess(response.data?.message || "Usuário atualizado com sucesso");
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao atualizar usuário");
      throw err; // opcional — para permitir tratamento externo
    } finally {
      setLoading(false);
    }
  }, []);
  return { updateUser, loading, error, success };
}

export function useDeleteUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
  
    const deleteUser = useCallback(async (id) => {
      setLoading(true);
      setError(null);
      setSuccess(null);
      try {
        const response = await api.delete(`/users/${id}`);
        setSuccess(response.data?.message || "Usuário deletado com sucesso");
        return response.data;
      } catch (err) {
        setError(err.response?.data?.message || "Erro ao deletar usuário");
        throw err;
      } finally {
        setLoading(false);
      }
    }, []);
    
    return { deleteUser, loading, error, success };
  }
