import { EmpresaDto } from '../../dto/empresaDto/EmpresaDto';
import { pesquisarTodasEmpresaPelaTagRepository, pesquisarTodasEmpresaRepository } from '../../repositories/empresaRepository';

export const pesquisarTodasEmpresaPelaTagService = async (tag: string): Promise<EmpresaDto[] | null> => {
	const empresas = await pesquisarTodasEmpresaPelaTagRepository(tag);

	if (!empresas) {
		return null;
	}

	return empresas.map(({ password_hash, ...empresaSemSenha }) => empresaSemSenha);
};