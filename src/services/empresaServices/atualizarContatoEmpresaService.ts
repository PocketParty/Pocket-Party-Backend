import { EmpresaContatoPatchRequestDto } from '../../dto/empresaDto/empresaContatoPatchRequestDto';
import { Empresa } from '../../models/empresaModel';
import { atualizarContatoEmpresaRepository, pesquisarEmpresaPeloIdRepository } from '../../repositories/empresaRepository';

export const atualizarContatoEmpresaService = async (empresaContatoPatchRequestDto: EmpresaContatoPatchRequestDto): Promise<Empresa | null> => {
	const result = await pesquisarEmpresaPeloIdRepository(empresaContatoPatchRequestDto.id);
	if (result !== null) {
		return await atualizarContatoEmpresaRepository(result.id!, result.contato);
	} else {
		return null;
	}
};
