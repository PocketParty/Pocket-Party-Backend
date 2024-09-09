import { CatalogoGetDeleteRequestDto } from '../../dto/catalogoDto/catalogoGetDeleteRequestDto';
import { CatalogoNaoExiste } from '../../error/CatalogoNaoExiste';
import { Catalogo } from '../../models/catalogoModel';
import { removerCatalogoRepository } from '../../repositories/catalogoRepository';
import { pesquisarCatalogoPeloIdRepository } from '../../repositories/catalogoRepository';

export const removerCatalogoService = async (catalogoPostPutRequestDto: CatalogoGetDeleteRequestDto): Promise<Catalogo | null> => {
	const catalogoPesquisado = await pesquisarCatalogoPeloIdRepository(catalogoPostPutRequestDto.id);
	if (catalogoPesquisado === null) {
		throw CatalogoNaoExiste()
	} 
	return await removerCatalogoRepository(catalogoPostPutRequestDto.id);
};
