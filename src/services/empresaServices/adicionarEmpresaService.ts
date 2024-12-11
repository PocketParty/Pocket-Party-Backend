import { EmpresaDto } from '../../dto/empresaDto/EmpresaDto';
import { EmpresaPostPutRequestDto } from '../../dto/empresaDto/empresaPostPutRequestDto';
import { EmpresaComMesmoCnpj } from '../../error/EmpresaComMesmoCnpj';
import { EmpresaComMesmoUserName } from '../../error/EmpresaComMesmoUserName';
import { Empresa } from '../../models/empresaModel';
import { adicionarEmpresaRepository, buscarAdminPeloUserNameRepository, pesquisarEmpresaPeloCnpjRepository } from '../../repositories/empresaRepository';
import bcrypt from 'bcrypt';

export const adicionarEmpresaService = async (empresaPostPutRequestDto: EmpresaPostPutRequestDto): Promise<Empresa | null | EmpresaDto> => {
	const empresaPesquisadaCnpj = await pesquisarEmpresaPeloCnpjRepository(empresaPostPutRequestDto.cnpj);
	if (empresaPesquisadaCnpj !== null) {
		throw EmpresaComMesmoCnpj()
	}
	const empresaPesquisadaUserName = await buscarAdminPeloUserNameRepository(empresaPostPutRequestDto.username);
	if (empresaPesquisadaUserName !== null) {
		throw EmpresaComMesmoUserName()
	}
	const hashSenha = await bcrypt.hash(empresaPostPutRequestDto.password_hash, 10);
	const empresa: Empresa = empresaPostPutRequestDto;
	empresa.password_hash = hashSenha
	const empresaAdicionada = await adicionarEmpresaRepository(empresa);
	const { password_hash, ...empresaDto } = empresaAdicionada!;
	return empresaDto;

};
