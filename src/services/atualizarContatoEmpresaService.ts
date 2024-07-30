import { Empresa } from '../models/empresaModel';
import { atualizarContatoEmpresaService,pesquisarEmpresaPeloIdRepository } from '../repositories/empresaRepository';


export const atualizarPesoUsuarioService = async (idEmpresa: number, contato: string): Promise<Empresa | null> => {
const result = await pesquisarEmpresaPeloIdRepository(idEmpresa);
if (result !== null) {
	return await atualizarContatoEmpresaService(idEmpresa, contato);
} else {
	return null;
}
};
