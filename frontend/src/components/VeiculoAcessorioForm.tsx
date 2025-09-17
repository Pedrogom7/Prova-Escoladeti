import { useState } from 'react';
import axios from 'axios';

interface VeiculoAcessorioFormProps {
  onAction: () => void;
}

export function VeiculoAcessorioForm({ onAction }: VeiculoAcessorioFormProps) {
  const [veiculoId, setVeiculoId] = useState('');
  const [acessorioId, setAcessorioId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`/api/veiculos/${veiculoId}/acessorios/${acessorioId}`);
      setSuccess('Acessório associado ao veículo com sucesso!');
      setVeiculoId('');
      setAcessorioId('');
      setError(null);
      onAction();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao associar acessório');
      console.error(err);
      setSuccess(null);
    }
  };

  return (
    <div className="mt-6 fade-in">
      <h2 className="text-2xl font-semibold text-primary-400">Associar Acessório a Veículo</h2>
      <form onSubmit={handleSubmit} className="mt-2 space-y-4 bg-gray-800 p-4 rounded-lg shadow-md">
        <div>
          <label className="block text-sm font-medium text-gray-300">ID do Veículo</label>
          <input
            type="number"
            value={veiculoId}
            onChange={(e) => setVeiculoId(e.target.value)}
            className="mt-1 p-2 w-full bg-gray-700 border border-primary-600 rounded text-white focus:border-primary-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">ID do Acessório</label>
          <input
            type="number"
            value={acessorioId}
            onChange={(e) => setAcessorioId(e.target.value)}
            className="mt-1 p-2 w-full bg-gray-700 border border-primary-600 rounded text-white focus:border-primary-500"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
          Associar
        </button>
        {error && <p className="text-red-400">{error}</p>}
        {success && <p className="text-primary-400">{success}</p>}
      </form>
    </div>
  );
}