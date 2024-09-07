import { EmpresaDto } from '../../dto/empresaDto/EmpresaDto';
import { EmpresaGetDeleteRequestDto } from '../../dto/empresaDto/empresaGetDeleteRequestDto';
import { EmpresaNaoExiste } from '../../error/EmpresaNaoExiste';
import { pesquisarEmpresaPeloIdRepository } from '../../repositories/empresaRepository';

export const pesquisarEmpresaService = async (empresaGetDeleteRequestDto: EmpresaGetDeleteRequestDto): Promise<EmpresaDto | null> => {
	const empresaPesquisada = await pesquisarEmpresaPeloIdRepository(empresaGetDeleteRequestDto.id);
	if (empresaPesquisada === null) {
		throw EmpresaNaoExiste()
	}
	const { senha, ...empresaDto } = empresaPesquisada!;
	return empresaDto;
};