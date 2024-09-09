import { CatalogoGetDeleteRequestDto } from '../../dto/catalogoDto/catalogoGetDeleteRequestDto';
import { CatalogoDto } from '../../dto/catalogoDto/CatalogoDto';
import { CatalogoNaoExiste } from '../../error/CatalogoNaoExiste';
import { pesquisarCatalogoPeloIdRepository } from '../../repositories/catalogoRepository';

export const pesquisarCatalogoService = async (catalogoGetDeleteRequestDto: CatalogoGetDeleteRequestDto): Promise<CatalogoDto | null> => {
	const catalogoPesquisado = await pesquisarCatalogoPeloIdRepository(catalogoGetDeleteRequestDto.id);
	if (catalogoPesquisado === null) {
		throw CatalogoNaoExiste()
	}
	const { ...catalogoDto } = catalogoPesquisado!;
	return catalogoDto;
};
