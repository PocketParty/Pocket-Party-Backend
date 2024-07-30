import { Empresa } from '../models/empresaModel';
import { atualizarContatoEmpresaRepository,pesquisarEmpresaPeloIdRepository } from '../repositories/empresaRepository';


export const atualizarContatoEmpresaService = async (idEmpresa: number, contato: string): Promise<Empresa | null> => {
const result = await pesquisarEmpresaPeloIdRepository(idEmpresa);
if (result !== null) {
	return await atualizarContatoEmpresaRepository(idEmpresa, contato);
} else {
	return null;
}
};
