import { EmpresaGetDeleteRequestDto } from '../../dto/empresaDto/empresaGetDeleteRequestDto';
import { EmpresaNaoExiste } from '../../error/EmpresaNaoExiste';
import { Empresa } from '../../models/empresaModel';
import { removerEmpresaRepository, pesquisarEmpresaPeloIdRepository } from '../../repositories/empresaRepository';

export const removerEmpresaService = async (empresaGetDeleteRequestDto: EmpresaGetDeleteRequestDto): Promise<Empresa | null> => {
	const empresaPesquisada = await pesquisarEmpresaPeloIdRepository(empresaGetDeleteRequestDto.id);
	if (empresaPesquisada === null) {
		throw EmpresaNaoExiste()
	}
	return await removerEmpresaRepository(empresaGetDeleteRequestDto.id);
};