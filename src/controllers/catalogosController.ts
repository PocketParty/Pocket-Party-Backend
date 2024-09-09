import { Request, Response, Router } from 'express';
import { CatalogoPostPutRequestDto } from '../dto/catalogoDto/catalogoPostPutRequestDto';
import { CatalogoGetDeleteRequestDto } from '../dto/catalogoDto/catalogoGetDeleteRequestDto';
import { adicionarCatalogoService } from '../services/catalogoService/adicionarCatalogoService';
import { removerCatalogoService } from '../services/catalogoService/removerCatalogoService';

const router = Router();

router.post('/adicionar', async (req: Request, res: Response) => {
	const catalogoPostPutRequestDto: CatalogoPostPutRequestDto = req.body;
	const result = await adicionarCatalogoService(catalogoPostPutRequestDto);
	return res.status(201).json(result);
});

router.delete('/remover', async (req: Request, res: Response) => {
	const catalogoGetDeleteRequestDto: CatalogoGetDeleteRequestDto = req.body;
	await removerCatalogoService(catalogoGetDeleteRequestDto);
	return res.status(204).json();
});


export default router;
