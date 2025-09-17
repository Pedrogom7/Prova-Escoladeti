import { useState, useEffect } from 'react';
import axios from 'axios';
import type { UpdateVeiculoDto } from '../types/veiculo';

interface VeiculoUpdateFormProps {
  id: number;
  onAction: () => void;
  onClose: () => void;
}

export function VeiculoUpdateForm({ id, onAction, onClose }: VeiculoUpdateFormProps) {
  const [formData, setFormData] = useState<UpdateVeiculoDto>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVeiculo = async () => {
      try {
        const response = await axios.get(`/api/veiculos/${id}`);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _, ...updateData } = response.data;
        setFormData(updateData);
      } catch (err) {
        setError('Erro ao carregar veículo');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVeiculo();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirm('Deseja realmente atualizar este veículo?')) return;
    try {
      await axios.put(`/api/veiculos/${id}`, formData);
      setSuccess('Veículo atualizado com sucesso!');
      setError(null);
      onAction();
      setTimeout(onClose, 1500);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao atualizar veículo');
      console.error(err);
      setSuccess(null);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300">Modelo</label>
        <input
          type="text"
          value={formData.modelo || ''}
          onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
          className="mt-1 p-2 w-full bg-gray-700 border border-primary-600 rounded text-white focus:border-primary-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Ano de Fabricação</label>
        <input
          type="number"
          value={formData.anoFabricacao || ''}
          onChange={(e) => setFormData({ ...formData, anoFabricacao: Number(e.target.value) })}
          className="mt-1 p-2 w-full bg-gray-700 border border-primary-600 rounded text-white focus:border-primary-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Placa</label>
        <input
          type="text"
          value={formData.placa || ''}
          onChange={(e) => setFormData({ ...formData, placa: e.target.value })}
          className="mt-1 p-2 w-full bg-gray-700 border border-primary-600 rounded text-white focus:border-primary-500"
          maxLength={6}
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