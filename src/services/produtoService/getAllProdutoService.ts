import { Produto } from '../../models/produtosModel';
import { getAllProdutoRepository} from '../../repositories/produtoRepository';
export const getAllProdutoService = async (): Promise<Produto[] | null> => {
	return await getAllProdutoRepository();
};