import { EmpresaGetDeleteRequestDto } from '../../dto/empresaDto/empresaGetDeleteRequestDto';
import { Empresa } from '../../models/empresaModel';
import { pesquisarEmpresaPeloIdRepository } from '../../repositories/empresaRepository';

export const pesquisarEmpresaService = async (empresaGetDeleteRequestDto: EmpresaGetDeleteRequestDto): Promise<Empresa | null> => {
	return await pesquisarEmpresaPeloIdRepository(empresaGetDeleteRequestDto.id);
};