import { Produto } from '../../models/produtosModel';
import { getProdutoRepository } from '../../repositories/produtoRepository';
export const getProdutoService = async (id :number ): Promise<Produto | null> => {
	return await getProdutoRepository(id);
};