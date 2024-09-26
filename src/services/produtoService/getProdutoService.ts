import { Produto } from '../../models/produtosModel';
import { getProdutoRepository } from '../../repositories/produtoRepository';
export const getProdutoService = async (id :number ): Promise<Produto | null> => {
	//const catalogoPesquisado = await pesquisarCatalogoPeloIdRepository(produtoGetRequestDto.catalogoId);
	//const produto: Produto = getProdutoRepository(id);
	return await getProdutoRepository(id);
};