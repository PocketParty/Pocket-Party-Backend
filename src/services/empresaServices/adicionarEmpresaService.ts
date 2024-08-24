import { EmpresaPostPutRequestDto } from '../../dto/empresaDto/empresaPostPutRequestDto';
import { EmpresaComMesmoCnpj } from '../../error/EmpresaComMesmoCnpj';
import { Empresa } from '../../models/empresaModel';
import { adicionarEmpresaRepository, pesquisarEmpresaPeloCnpjRepository } from '../../repositories/empresaRepository';

export const adicionarEmpresaService = async (empresaPostPutRequestDto: EmpresaPostPutRequestDto): Promise<Empresa | null> => {
	const empresaPesquisada = await pesquisarEmpresaPeloCnpjRepository(empresaPostPutRequestDto.cnpj);
	if (empresaPesquisada === null) {
		const empresa:Empresa = empresaPostPutRequestDto;
		return await adicionarEmpresaRepository(empresa);
	}
	throw EmpresaComMesmoCnpj()
};
