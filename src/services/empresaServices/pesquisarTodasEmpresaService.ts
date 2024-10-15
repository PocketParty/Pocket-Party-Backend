import { EmpresaDto } from '../../dto/empresaDto/EmpresaDto';
import { pesquisarTodasEmpresaRepository } from '../../repositories/empresaRepository';

export const pesquisarTodasEmpresaService = async (): Promise<EmpresaDto[] | null> => {
	return pesquisarTodasEmpresaRepository();
};