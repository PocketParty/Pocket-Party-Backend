import { ProdutoPostPutRequestDto } from '../../dto/produtoDto/produtoPostPutRequestDto';
import { Produto } from '../../models/produtosModel';
import {atualizarProdutoRepository } from '../../repositories/produtoRepository';

export const atualizarProdutoService = async (id: number,produtoPostPutRequestDto: ProdutoPostPutRequestDto): Promise<Produto | null> => {
	const produto: Produto = produtoPostPutRequestDto;
	return await atualizarProdutoRepository(id,produto);
};