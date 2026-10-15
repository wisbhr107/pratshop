export type Categoria = {
  id: string;
  nom: string;
};

export type Producte = {
  id: number;
  nom: string;
  descripcio: string;
  preu: number;
  categoriaId: string;
  estoc: number;
  imatge: string;
};

export type LiniaCarro = {
  producteId: number;
  unitats: number;
};