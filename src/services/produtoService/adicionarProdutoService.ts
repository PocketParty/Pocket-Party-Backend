import { ProdutoPostPutRequestDto } from '../../dto/produtoDto/produtoPostPutRequestDto';
import { Produto } from '../../models/produtosModel';
import { adicionarProdutoRepository } from '../../repositories/produtoRepository';

export const adicionarProdutoService = async (produtoPostPutRequestDto: ProdutoPostPutRequestDto): Promise<Produto | null> => {

	const produto: Produto = produtoPostPutRequestDto;
	return await adicionarProdutoRepository(produto);
};
