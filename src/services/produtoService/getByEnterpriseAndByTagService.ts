import { Produto } from '../../models/produtosModel';
import { getByEnterpriseAndByTagProdutoRepository } from '../../repositories/produtoRepository';
export const getByEnterpriseAndByTagService = async (entId :number ,tagName: string): Promise<Produto[] | null> => {
	return await getByEnterpriseAndByTagProdutoRepository(entId,tagName);
};