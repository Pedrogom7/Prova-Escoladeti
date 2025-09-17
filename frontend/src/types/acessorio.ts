export interface Acessorio {
  id: number;
  nome: string;
}

export interface CreateAcessorioDto {
  nome: string;
}

export interface UpdateAcessorioDto {
  nome?: string;
}