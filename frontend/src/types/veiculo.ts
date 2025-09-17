export interface Veiculo {
  id: number;
  modelo: string;
  anoFabricacao: number;
  placa: string;
}

export interface CreateVeiculoDto {
  modelo: string;
  anoFabricacao: number;
  placa: string;
}

export interface UpdateVeiculoDto {
  modelo?: string;
  anoFabricacao?: number;
  placa?: string;
}