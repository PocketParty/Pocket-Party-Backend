import { Produto } from '../../models/produtosModel';
import { getAllProdutoRepository, getProdutoRepository } from '../../repositories/produtoRepository';
export const getAllProdutoService = async (): Promise<Produto[] | null> => {
	//const catalogoPesquisado = await pesquisarCatalogoPeloIdRepository(produtoGetRequestDto.catalogoId);
	//const produto: Produto = getProdutoRepository(id);
	return await getAllProdutoRepository();
};