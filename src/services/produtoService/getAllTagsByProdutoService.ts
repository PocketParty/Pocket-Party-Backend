import { Tag } from '../../models/tagModel';
import { getTagsByProdutoRepository } from '../../repositories/produtoRepository';
export const getAllTagsByProdutoService = async (id:number): Promise<Tag[] | null> => {
	return await getTagsByProdutoRepository(id);
};
