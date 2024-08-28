import { ProdutoPostPutRequestDto } from '../../dto/produtoDto/produtoPostPutRequestDto';
import { CatalogoNaoExiste } from '../../error/CatalagoNaoExiste';
import { Produto } from '../../models/produtosModel';
import { pesquisarCatalogoPeloIdRepository } from '../../repositories/catalagoRepository';
import { adicionarProdutoRepository } from '../../repositories/produtoRepository';

export const adicionarProdutoService = async (produtoPostPutRequestDto: ProdutoPostPutRequestDto): Promise<Produto | null> => {
	const catalogoPesquisado = await pesquisarCatalogoPeloIdRepository(produtoPostPutRequestDto.catalogoId);
	if (catalogoPesquisado === null) {
		throw CatalogoNaoExiste()
	} 
	const produto: Produto = produtoPostPutRequestDto;
	return await adicionarProdutoRepository(produto);
};
