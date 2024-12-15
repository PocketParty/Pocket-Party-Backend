import { ProdutoPatchReqDTO } from '../../dto/produtoDto/produtoPatchReqDTO';
import { ProdutoPostPutRequestDto } from '../../dto/produtoDto/produtoPostPutRequestDto';
import { Produto } from '../../models/produtosModel';
import {atualizarProdutoRepository } from '../../repositories/produtoRepository';

export const atualizarProdutoService = async (id: number,produtoPatchReqDTO:ProdutoPatchReqDTO): Promise<Produto | null> => {
	return await atualizarProdutoRepository(id,produtoPatchReqDTO);
};