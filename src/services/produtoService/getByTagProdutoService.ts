import { Produto } from '../../models/produtosModel';
import { getByTagProdutoRepository} from '../../repositories/produtoRepository';
export const getByTagProdutoService = async (tag:string): Promise<Produto[] | null> => {
	return await getByTagProdutoRepository(tag);
};