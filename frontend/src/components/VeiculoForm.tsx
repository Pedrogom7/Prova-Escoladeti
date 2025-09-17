import { useState } from 'react';
import axios from 'axios';
import type { CreateVeiculoDto } from '../types/veiculo';

interface VeiculoFormProps {
  onAction: () => void;
}

export function VeiculoForm({ onAction }: VeiculoFormProps) {
  const [formData, setFormData] = useState<CreateVeiculoDto>({
    modelo: '',
    anoFabricacao: 0,
    placa: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/veiculos', formData);
      setSuccess('Veículo criado com sucesso!');
      setFormData({ modelo: '', anoFabricacao: 0, placa: '' });
      setError(null);
      onAction();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar veículo');
      console.error(err);
      setSuccess(null);
    }
  };

  return (
    <div className="mt-6 fade-in">
      <h2 className="text-2xl font-semibold text-primary-400">Criar Veículo</h2>
      <form onSubmit={handleSubmit} className="mt-2 space-y-4 bg-gray-800 p-4 rounded-lg shadow-md">
        <div>
          <label className="block text-sm font-medium text-gray-300">Modelo</label>
          <input
            type="text"
            value={formData.modelo}
            onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
            className="mt-1 p-2 w-full bg-gray-700 border border-primary-600 rounded text-white focus:border-primary-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Ano de Fabricação</label>
          <input
            type="number"
            value={formData.anoFabricacao}
            onChange={(e) => setFormData({ ...formData, anoFabricacao: Number(e.target.value) })}
            className="mt-1 p-2 w-full bg-gray-700 border border-primary-600 rounded text-white focus:border-primary-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Placa</label>
          <input
            type="text"
            value={formData.placa}
            onChange={(e) => setFormData({ ...formData, placa: e.target.value })}
            className="mt-1 p-2 w-full bg-gray-700 border border-primary-600 rounded text-white focus:border-primary-500"
            maxLength={6}
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Criar
        </button>
        {error && <p className="text-red-400">{error}</p>}
        {success && <p className="text-primary-400">{success}</p>}
      </form>
    </div>
  );
}