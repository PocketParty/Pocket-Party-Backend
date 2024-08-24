import { EmpresaContatoPatchRequestDto } from '../../dto/empresaDto/empresaContatoPatchRequestDto';
import { EmpresaNaoExiste } from '../../error/EmpresaNaoExiste';
import { Empresa } from '../../models/empresaModel';
import { atualizarContatoEmpresaRepository, pesquisarEmpresaPeloIdRepository } from '../../repositories/empresaRepository';

export const atualizarContatoEmpresaService = async (empresaContatoPatchRequestDto: EmpresaContatoPatchRequestDto): Promise<Empresa | null> => {
	const empresaPesquisada = await pesquisarEmpresaPeloIdRepository(empresaContatoPatchRequestDto.id);
	if (empresaPesquisada === null) {
		throw EmpresaNaoExiste()
	}
	return await atualizarContatoEmpresaRepository(empresaContatoPatchRequestDto.id, empresaContatoPatchRequestDto.contato);
};
