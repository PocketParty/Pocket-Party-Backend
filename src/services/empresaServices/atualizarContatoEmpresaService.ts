import { EmpresaContatoPatchRequestDto } from '../../dto/empresaDto/empresaContatoPatchRequestDto';
import { EmpresaDto } from '../../dto/empresaDto/EmpresaDto';
import { EmpresaNaoExiste } from '../../error/EmpresaNaoExiste';
import { atualizarContatoEmpresaRepository, pesquisarEmpresaPeloIdRepository } from '../../repositories/empresaRepository';

export const atualizarContatoEmpresaService = async (empresaContatoPatchRequestDto: EmpresaContatoPatchRequestDto): Promise<EmpresaDto | null> => {
	const empresaPesquisada = await pesquisarEmpresaPeloIdRepository(empresaContatoPatchRequestDto.id);
	if (empresaPesquisada === null) {
		throw EmpresaNaoExiste()
	}
	const empresaAtualizada =  await atualizarContatoEmpresaRepository(empresaContatoPatchRequestDto.id, empresaContatoPatchRequestDto.contato);
	const { senha, ...empresaDto } = empresaAtualizada!;
	return empresaDto;
};
