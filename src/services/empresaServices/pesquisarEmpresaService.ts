import { EmpresaGetDeleteRequestDto } from '../../dto/empresaDto/empresaGetDeleteRequestDto';
import { EmpresaNaoExiste } from '../../error/EmpresaNaoExiste';
import { Empresa } from '../../models/empresaModel';
import { pesquisarEmpresaPeloIdRepository } from '../../repositories/empresaRepository';

export const pesquisarEmpresaService = async (empresaGetDeleteRequestDto: EmpresaGetDeleteRequestDto): Promise<Empresa | null> => {
	const empresaPesquisada = await pesquisarEmpresaPeloIdRepository(empresaGetDeleteRequestDto.id);
	if (empresaPesquisada === null) {
		throw EmpresaNaoExiste()
	}
	return empresaPesquisada
};