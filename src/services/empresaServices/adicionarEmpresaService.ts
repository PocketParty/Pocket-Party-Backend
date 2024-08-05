import { Empresa } from '../../models/empresaModel';
import { adicionarEmpresaRepository, pesquisarEmpresaPeloIdRepository } from '../../repositories/empresaRepository';


export const adicionarEmpresaService = async (empresa: Empresa): Promise<Empresa | null> => {
	const result = await pesquisarEmpresaPeloIdRepository(empresa.id);
	if (result === null) {
		return await adicionarEmpresaRepository(empresa);
	} else {
		return null;
	}
};
