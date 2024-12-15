import { Produto } from '../../models/produtosModel';
import { removerProdutoRepository } from '../../repositories/produtoRepository';
export const removerProdutoService = async (id :number ): Promise<Produto | null> => {
	return await removerProdutoRepository(id);
};