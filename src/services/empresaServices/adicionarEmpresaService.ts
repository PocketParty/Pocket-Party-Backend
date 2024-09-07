import { EmpresaDto } from '../../dto/empresaDto/EmpresaDto';
import { EmpresaPostPutRequestDto } from '../../dto/empresaDto/empresaPostPutRequestDto';
import { EmpresaComMesmoCnpj } from '../../error/EmpresaComMesmoCnpj';
import { Empresa } from '../../models/empresaModel';
import { adicionarEmpresaRepository, pesquisarEmpresaPeloCnpjRepository } from '../../repositories/empresaRepository';
import bcrypt from 'bcrypt';

export const adicionarEmpresaService = async (empresaPostPutRequestDto: EmpresaPostPutRequestDto): Promise<EmpresaDto | null> => {
	const empresaPesquisada = await pesquisarEmpresaPeloCnpjRepository(empresaPostPutRequestDto.cnpj);
	if (empresaPesquisada === null) {
		const hashSenha = await bcrypt.hash(empresaPostPutRequestDto.senha, 10);
		const empresa: Empresa = empresaPostPutRequestDto;
		empresa.senha = hashSenha
		const empresaAdicionada = await adicionarEmpresaRepository(empresa);
		const { senha, ...empresaDto } = empresaAdicionada!;
		return empresaDto;
	}
	throw EmpresaComMesmoCnpj()
};
