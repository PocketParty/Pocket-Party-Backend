import { Produto } from '../../models/produtosModel';
import { getProdutoByEnterpriseRepository } from '../../repositories/produtoRepository';
export const getByEnterpriseIdProdutoService = async (id :number ): Promise<Produto[] | null> => {
	return await getProdutoByEnterpriseRepository(id);
};