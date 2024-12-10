import { Produto } from '../../models/produtosModel';
import { getByTagProdutoRepository} from '../../repositories/produtoRepository';
export const getByTagProdutoService = async (tagId:number): Promise<Produto[] | null> => {
	return await getByTagProdutoRepository(tagId);
};