import { Empresa } from '../../models/empresaModel';
import { pesquisarTodasEmpresaRepository } from '../../repositories/empresaRepository';

export const pesquisarTodasEmpresaService = async (): Promise<Empresa[] | null> => {
	return await pesquisarTodasEmpresaRepository();
};