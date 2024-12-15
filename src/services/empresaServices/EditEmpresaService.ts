import { EmpresaDto } from '../../dto/empresaDto/EmpresaDto';
import { EmpresaPatchRequestDto } from '../../dto/empresaDto/empresaPatchRequestDto';
import { EmpresaNaoExiste } from '../../error/EmpresaNaoExiste';
import { Empresa } from '../../models/empresaModel';
import {pesquisarEmpresaPeloIdRepository, updateEmpresaRepository } from '../../repositories/empresaRepository';

export const EditEmpresaService = async (idEmpresa: number,empresaPatchRequestDto: EmpresaPatchRequestDto): Promise<Empresa | null | EmpresaDto> => {
	const empresaPesquisada = await pesquisarEmpresaPeloIdRepository(idEmpresa);
	if (empresaPesquisada !== null) {
		const empresaAdicionada = await updateEmpresaRepository(idEmpresa, empresaPatchRequestDto);
		const { password_hash, ...empresaDto } = empresaAdicionada!;
		return empresaDto;
	}
	throw EmpresaNaoExiste()
};
