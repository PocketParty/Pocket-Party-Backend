import { CatalagoPostPutRequestDto } from '../../dto/catalagoDto/catalagoPostPutRequestDto';
import { EmpresaNaoExiste } from '../../error/EmpresaNaoExiste';
import { Catalogo } from '../../models/catalogoModel';
import { adicionarCatalogoRepository } from '../../repositories/catalagoRepository';
import { pesquisarEmpresaPeloIdRepository } from '../../repositories/empresaRepository';

export const adicionarCatalagoService = async (catalagoPostPutRequestDto: CatalagoPostPutRequestDto): Promise<Catalogo | null> => {
	const empresaPesquisada = await pesquisarEmpresaPeloIdRepository(catalagoPostPutRequestDto.empresaId);
	if (empresaPesquisada === null) {
		throw EmpresaNaoExiste()
	} 
	const catalogo: Catalogo = catalagoPostPutRequestDto;
	return await adicionarCatalogoRepository(catalogo);
};
