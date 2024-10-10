import { EmpresaContatoPatchRequestDto } from '../../dto/empresaDto/empresaContatoPatchRequestDto';
import { EmpresaDto } from '../../dto/empresaDto/EmpresaDto';
import { EmpresaNaoExiste } from '../../error/EmpresaNaoExiste';
import { atualizarContatoEmpresaRepository, pesquisarEmpresaPeloIdRepository } from '../../repositories/empresaRepository';

export const atualizarContatoEmpresaService = async (empresaContatoPatchRequestDto: EmpresaContatoPatchRequestDto, id: number): Promise<EmpresaDto | null> => {
	const empresaPesquisada = await pesquisarEmpresaPeloIdRepository(id);
	if (empresaPesquisada === null) {
		throw EmpresaNaoExiste()
	}
	const empresaAtualizada =  await atualizarContatoEmpresaRepository(id, empresaContatoPatchRequestDto.telefone);
	const { senha, ...empresaDto } = empresaAtualizada!;
	return empresaDto;
};
