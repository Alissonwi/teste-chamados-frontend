import { Chamado } from "./chamado";

export interface Detalhe {
    id: number;
    comentario: string;
    chamado: Chamado;
  }