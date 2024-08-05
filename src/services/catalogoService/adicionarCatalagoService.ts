import { CatalagoPostPutRequestDto } from '../../dto/catalagoDto/catalagoPostPutRequestDto';
import { Catalogo } from '../../models/catalogoModel';
import { adicionarCatalogoRepository } from '../../repositories/catalagoRepository';
import { pesquisarEmpresaPeloIdRepository } from '../../repositories/empresaRepository';

export const adicionarCatalagoService = async (catalagoPostPutRequestDto: CatalagoPostPutRequestDto): Promise<Catalogo | null> => {
	const result = await pesquisarEmpresaPeloIdRepository(catalagoPostPutRequestDto.empresaId);
	if (result !== null) {
		const modelMap: Catalogo = catalagoPostPutRequestDto;
		return await adicionarCatalogoRepository(modelMap);
	} else {
		return null;
	}
};
