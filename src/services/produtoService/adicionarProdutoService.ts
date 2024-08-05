import { ProdutoPostPutRequestDto } from '../../dto/produtoDto/produtoPostPutRequestDto';
import { Produto } from '../../models/produtosModel';
import { pesquisarCatalogoPeloIdRepository } from '../../repositories/catalagoRepository';
import { adicionarProdutoRepository } from '../../repositories/produtoRepository';

export const adicionarProdutoService = async (produtoPostPutRequestDto: ProdutoPostPutRequestDto): Promise<Produto | null> => {
	const result = await pesquisarCatalogoPeloIdRepository(produtoPostPutRequestDto.catalogoId);
	if (result !== null) {
		const modelMap: Produto = produtoPostPutRequestDto;
		return await adicionarProdutoRepository(modelMap);
	} else {
		return null;
	}
};
