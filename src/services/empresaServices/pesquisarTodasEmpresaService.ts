import { EmpresaDto } from '../../dto/empresaDto/EmpresaDto';
import { pesquisarTodasEmpresaRepository } from '../../repositories/empresaRepository';

export const pesquisarTodasEmpresaService = async (): Promise<EmpresaDto[] | null> => {
	const empresas = await pesquisarTodasEmpresaRepository();

	if (!empresas) {
		return null;
	}

	return empresas.map(({ password_hash, ...empresaSemSenha }) => empresaSemSenha);
};