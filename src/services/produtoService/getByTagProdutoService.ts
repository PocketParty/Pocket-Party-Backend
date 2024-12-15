import { Produto } from '../../models/produtosModel';
import { getByTagProdutoRepository} from '../../repositories/produtoRepository';
export const getByTagProdutoService = async (tagName:string): Promise<Produto[] | null> => {
	return await getByTagProdutoRepository(tagName);
};