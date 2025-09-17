import { useState } from 'react';
import { VeiculoList } from './components/veiculoList';
import { AcessorioList } from './components/AcessorioList';
import { VeiculoForm } from './components/VeiculoForm';
import { AcessorioForm } from './components/AcessorioForm';
import { VeiculoAcessorioForm } from './components/VeiculoAcessorioForm';
import { VeiculoUpdateForm } from './components/VeiculoUpdateForm';
import { AcessorioUpdateForm } from './components/AcessorioUpdateForm';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showVeiculoModal, setShowVeiculoModal] = useState(false);
  const [showAcessorioModal, setShowAcessorioModal] = useState(false);
  const [selectedVeiculoId, setSelectedVeiculoId] = useState<number | null>(null);
  const [selectedAcessorioId, setSelectedAcessorioId] = useState<number | null>(null);

  const handleAction = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const openVeiculoModal = (id: number) => {
    if (confirm('Deseja atualizar este veículo?')) {
      setSelectedVeiculoId(id);
      setShowVeiculoModal(true);
    }
  };

  const openAcessorioModal = (id: number) => {
    if (confirm('Deseja atualizar este acessório?')) {
      setSelectedAcessorioId(id);
      setShowAcessorioModal(true);
    }
  };

  const closeVeiculoModal = () => {
    setShowVeiculoModal(false);
    setSelectedVeiculoId(null);
  };

  const closeAcessorioModal = () => {
    setShowAcessorioModal(false);
    setSelectedAcessorioId(null);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-black min-h-screen">
      <h1 className="text-3xl font-bold text-primary-400 text-center mb-8">Prova Nivelamento - Pedro Gomes</h1>
      <div className="max-w-4xl mx-auto space-y-6">
        <VeiculoForm onAction={handleAction} />
        <AcessorioForm onAction={handleAction} />
        <VeiculoAcessorioForm onAction={handleAction} />
        <VeiculoList
          refreshKey={refreshKey}
          onUpdate={openVeiculoModal}
        />
        <AcessorioList
          refreshKey={refreshKey}
          onUpdate={openAcessorioModal}
        />
      </div>

      {/* Modal para Atualizar Veículo */}
      {showVeiculoModal && selectedVeiculoId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-enter">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-primary-400 mb-4">Atualizar Veículo ID: {selectedVeiculoId}</h3>
            <VeiculoUpdateForm
              id={selectedVeiculoId}
              onAction={handleAction}
              onClose={closeVeiculoModal}
            />
          </div>
        </div>
      )}

      {/* Modal para Atualizar Acessório */}
      {showAcessorioModal && selectedAcessorioId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-enter">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-primary-400 mb-4">Atualizar Acessório ID: {selectedAcessorioId}</h3>
            <AcessorioUpdateForm
              id={selectedAcessorioId}
              onAction={handleAction}
              onClose={closeAcessorioModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;