import { EmpresaPostPutRequestDto } from '../../dto/empresaDto/empresaPostPutRequestDto';
import { Empresa } from '../../models/empresaModel';
import { adicionarEmpresaRepository, pesquisarEmpresaPeloCnpjRepository } from '../../repositories/empresaRepository';

export const adicionarEmpresaService = async (empresaPostPutRequestDto: EmpresaPostPutRequestDto): Promise<Empresa | null> => {
	const result = await pesquisarEmpresaPeloCnpjRepository(empresaPostPutRequestDto.cnpj);
	if (result === null) {
		const modelMap:Empresa = empresaPostPutRequestDto;
		return await adicionarEmpresaRepository(modelMap);
	} else {
		return null;
	}
};
