import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Veiculo } from '../types/veiculo';
import type { Acessorio } from '../types/acessorio';

interface VeiculoListProps {
  refreshKey: number;
  onUpdate: (id: number) => void;
}

export function VeiculoList({ refreshKey, onUpdate }: VeiculoListProps) {
  const [veiculos, setVeiculos] = useState<(Veiculo & { acessorios: Acessorio[] })[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVeiculosAndAcessorios = async () => {
      try {
        console.log('Buscando veículos...');
        const veiculosResponse = await axios.get('/api/veiculos');
        const veiculosData = veiculosResponse.data;
        console.log('Veículos carregados:', veiculosData);

        const veiculosWithAcessorios = await Promise.all(
          veiculosData.map(async (veiculo: Veiculo) => {
            try {
              console.log('Buscando acessórios para veículo ID:', veiculo.id);
              const acessoriosResponse = await axios.get(`/api/veiculos/${veiculo.id}/acessorios`);
              console.log('Acessórios para veículo', veiculo.id, ':', acessoriosResponse.data);
              return { ...veiculo, acessorios: acessoriosResponse.data };
            } catch (err) {
              console.error(`Erro ao buscar acessórios para veículo ${veiculo.id}:`, err);
              return { ...veiculo, acessorios: [] }; // Fallback: acessórios vazios
            }
          })
        );
        setVeiculos(veiculosWithAcessorios);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar veículos:', err);
        setError('Erro ao buscar veículos. Verifique o console para detalhes.');
      }
    };
    fetchVeiculosAndAcessorios();
  }, [refreshKey]);

  const handleDelete = async (id: number) => {
    if (!confirm('Deseja realmente deletar este veículo?')) return;
    try {
      await axios.delete(`/api/veiculos/${id}`);
      setVeiculos(veiculos.filter((veiculo) => veiculo.id !== id));
      setError(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao deletar veículo');
      console.error(err);
    }
  };

  return (
    <div className="mt-6 fade-in">
      <h2 className="text-2xl font-semibold text-primary-400">Veículos</h2>
      {error && <p className="text-red-400 mt-2">{error}</p>}
      {veiculos.length === 0 ? (
        <p className="text-gray-400 mt-2">Nenhum veículo cadastrado.</p>
      ) : (
        <ul className="mt-2 space-y-3">
          {veiculos.map((veiculo) => (
            <li key={veiculo.id} className="p-4 bg-gray-800 rounded-lg shadow-md border border-primary-600">
              <div className="flex justify-between items-center">
                <span>
                  <span className="font-medium text-primary-400">ID: {veiculo.id} - </span>
                  <span className="font-medium text-primary-400">{veiculo.modelo}</span> ({veiculo.anoFabricacao}) - Placa: <span className="text-primary-500">{veiculo.placa}</span>
                </span>
                <div className="space-x-2">
                  <button
                    onClick={() => onUpdate(veiculo.id)}
                    className="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
                  >
                    Atualizar
                  </button>
                  <button
                    onClick={() => handleDelete(veiculo.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Deletar
                  </button>
                </div>
              </div>
              {veiculo.acessorios.length > 0 ? (
                <div className="mt-2">
                  <p className="text-sm text-gray-300">Acessórios associados:</p>
                  <ul className="list-disc list-inside text-sm text-primary-500">
                    {veiculo.acessorios.map((acessorio) => (
                      <li key={acessorio.id}>{acessorio.nome}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-2 text-sm text-gray-400">Nenhum acessório associado.</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}