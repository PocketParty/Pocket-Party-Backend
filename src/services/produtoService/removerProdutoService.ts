import { Produto } from '../../models/produtosModel';
import { getProdutoRepository, removerProdutoRepository } from '../../repositories/produtoRepository';
export const removerProdutoService = async (id :number ): Promise<Produto | null> => {
	//const catalogoPesquisado = await pesquisarCatalogoPeloIdRepository(produtoGetRequestDto.catalogoId);
	//const produto: Produto = getProdutoRepository(id);
	return await removerProdutoRepository(id);
};