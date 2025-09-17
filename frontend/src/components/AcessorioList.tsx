import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Acessorio } from '../types/acessorio';

interface AcessorioListProps {
  refreshKey: number;
  onUpdate: (id: number) => void;
}

export function AcessorioList({ refreshKey, onUpdate }: AcessorioListProps) {
  const [acessorios, setAcessorios] = useState<Acessorio[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAcessorios = async () => {
      try {
        const response = await axios.get('/api/acessorios');
        setAcessorios(response.data);
      } catch (err) {
        setError('Erro ao buscar acessórios');
        console.error(err);
      }
    };
    fetchAcessorios();
  }, [refreshKey]);

  const handleDelete = async (id: number) => {
    if (!confirm('Deseja realmente deletar este acessório?')) return;
    try {
      await axios.delete(`/api/acessorios/${id}`);
      setAcessorios(acessorios.filter((acessorio) => acessorio.id !== id));
      setError(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao deletar acessório');
      console.error(err);
    }
  };

  return (
    <div className="mt-6 fade-in">
      <h2 className="text-2xl font-semibold text-primary-400">Acessórios</h2>
      {error && <p className="text-red-400 mt-2">{error}</p>}
      {acessorios.length === 0 ? (
        <p className="text-gray-400 mt-2">Nenhum acessório cadastrado.</p>
      ) : (
        <ul className="mt-2 space-y-3">
          {acessorios.map((acessorio) => (
            <li key={acessorio.id} className="p-4 bg-gray-800 rounded-lg shadow-md border border-primary-600 flex justify-between items-center">
              <span>
                <span className="font-medium text-primary-400">ID: {acessorio.id} - </span>
                <span className="font-medium text-primary-500">{acessorio.nome}</span>
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => onUpdate(acessorio.id)}
                  className="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
                >
                  Atualizar
                </button>
                <button
                  onClick={() => handleDelete(acessorio.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Deletar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}