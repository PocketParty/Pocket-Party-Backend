import { EmpresaGetDeleteRequestDto } from '../../dto/empresaDto/empresaGetDeleteRequestDto';
import { Empresa } from '../../models/empresaModel';
import { removerEmpresaRepository, pesquisarEmpresaPeloIdRepository } from '../../repositories/empresaRepository';

export const removerEmpresaService = async (empresaGetDeleteRequestDto: EmpresaGetDeleteRequestDto): Promise<Empresa | null> => {
	const result = await pesquisarEmpresaPeloIdRepository(empresaGetDeleteRequestDto.id);
	if (result !== null) {
		return await removerEmpresaRepository(result.id!);
	} else {
		return null;
	}
};