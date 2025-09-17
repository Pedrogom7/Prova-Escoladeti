import { useState, useEffect } from 'react';
import axios from 'axios';
import type { UpdateAcessorioDto } from '../types/acessorio';

interface AcessorioUpdateFormProps {
  id: number;
  onAction: () => void;
  onClose: () => void;
}

export function AcessorioUpdateForm({ id, onAction, onClose }: AcessorioUpdateFormProps) {
  const [formData, setFormData] = useState<UpdateAcessorioDto>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcessorio = async () => {
      try {
        const response = await axios.get(`/api/acessorios/${id}`);
        setFormData({ nome: response.data.nome });
      } catch (err) {
        setError('Erro ao carregar acessório');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAcessorio();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirm('Deseja realmente atualizar este acessório?')) return;
    try {
      await axios.put(`/api/acessorios/${id}`, formData);
      setSuccess('Acessório atualizado com sucesso!');
      setError(null);
      onAction();
      setTimeout(onClose, 1500);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao atualizar acessório');
      console.error(err);
      setSuccess(null);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300">Nome</label>
        <input
          type="text"
          value={formData.nome || ''}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          className="mt-1 p-2 w-full bg-gray-700 border border-primary-600 rounded text-white focus:border-primary-500"
          maxLength={20}
          required
        />
      </div>
      <div className="flex space-x-2">
        <button type="submit" className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors flex-1">
          Atualizar
        </button>
        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
          Cancelar
        </button>
      </div>
      {error && <p className="text-red-400">{error}</p>}
      {success && <p className="text-primary-400">{success}</p>}
    </form>
  );
}