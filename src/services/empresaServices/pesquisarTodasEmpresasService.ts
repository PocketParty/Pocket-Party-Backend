import { NenhumaEmpresaCadastrada } from '../../error/NenhumaEmpresaCadastrada';
import { Empresa } from '../../models/empresaModel';
import { pesquisarTodasEmpresaRepository } from '../../repositories/empresaRepository';

export const pesquisarTodasEmpresaService = async (): Promise<Empresa[] | null> => {
	const empresas = await pesquisarTodasEmpresaRepository(); 
	if (empresas?.length === 0) {
		throw NenhumaEmpresaCadastrada()
	}
	return empresas;
};