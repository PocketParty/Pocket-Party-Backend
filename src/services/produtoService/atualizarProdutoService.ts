import { ProdutoPostPutRequestDto } from '../../dto/produtoDto/produtoPostPutRequestDto';
import { CatalogoNaoExiste } from '../../error/CatalagoNaoExiste';
import { Produto } from '../../models/produtosModel';
import { pesquisarCatalogoPeloIdRepository } from '../../repositories/catalagoRepository';
import {atualizarProdutoRepository } from '../../repositories/produtoRepository';

export const atualizarProdutoService = async (id: number,produtoPostPutRequestDto: ProdutoPostPutRequestDto): Promise<Produto | null> => {
	const catalogoPesquisado = await pesquisarCatalogoPeloIdRepository(produtoPostPutRequestDto.catalogoId);
	if (catalogoPesquisado === null) {
		throw CatalogoNaoExiste()
	}
	const produto: Produto = produtoPostPutRequestDto;
	return await atualizarProdutoRepository(id,produto);
};