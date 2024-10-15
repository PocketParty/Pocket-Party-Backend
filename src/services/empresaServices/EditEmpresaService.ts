import { EmpresaPatchRequestDto } from '../../dto/empresaDto/empresaPatchRequestDto';
import { EmpresaNaoExiste } from '../../error/EmpresaNaoExiste';
import { Empresa } from '../../models/empresaModel';
import {pesquisarEmpresaPeloIdRepository, updateEmpresaRepository } from '../../repositories/empresaRepository';

export const EditEmpresaService = async (idEmpresa: number,empresaPatchRequestDto: EmpresaPatchRequestDto): Promise<Empresa | null> => {
	const empresaPesquisada = await pesquisarEmpresaPeloIdRepository(idEmpresa);
	if (empresaPesquisada !== null) {
		const empresaAdicionada = await updateEmpresaRepository(idEmpresa, empresaPatchRequestDto);
		const { senha, ...empresaDto } = empresaAdicionada!;
		return empresaAdicionada;
	}
	throw EmpresaNaoExiste()
};
