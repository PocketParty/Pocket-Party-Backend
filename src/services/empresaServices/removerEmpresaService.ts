import { Empresa } from '../../models/empresaModel';
import { removerEmpresaRepository,pesquisarEmpresaPeloIdRepository } from '../../repositories/empresaRepository';


export const removerEmpresaService = async (idEmpresa: number): Promise<Empresa | null> => {
const result = await pesquisarEmpresaPeloIdRepository(idEmpresa);
if (result !== null) {
	return await removerEmpresaRepository(idEmpresa);
} else {
	return null;
}
};