import { CatalogoPostPutRequestDto } from '../../dto/catalogoDto/catalogoPostPutRequestDto';
import { EmpresaNaoExiste } from '../../error/EmpresaNaoExiste';
import { Catalogo } from '../../models/catalogoModel';
import { adicionarCatalogoRepository } from '../../repositories/catalogoRepository';
import { pesquisarEmpresaPeloIdRepository } from '../../repositories/empresaRepository';

export const adicionarCatalogoService = async (catalogoPostPutRequestDto: CatalogoPostPutRequestDto): Promise<Catalogo | null> => {
	const empresaPesquisada = await pesquisarEmpresaPeloIdRepository(catalogoPostPutRequestDto.empresaId);
	if (empresaPesquisada === null) {
		throw EmpresaNaoExiste()
	} 
	const catalogo: Catalogo = catalogoPostPutRequestDto;
	return await adicionarCatalogoRepository(catalogo);
};
