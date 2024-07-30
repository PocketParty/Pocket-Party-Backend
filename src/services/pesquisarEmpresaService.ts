import { Empresa } from '../models/empresaModel';
import { pesquisarEmpresaPeloIdRepository} from '../repositories/empresaRepository';

export const pesquisarEmpresaService = async(IdEmpresa: number): Promise<Empresa|null> => {
  return await pesquisarEmpresaPeloIdRepository(IdEmpresa);  
};