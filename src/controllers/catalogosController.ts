import { Request, Response, Router } from 'express';
import { CatalagoPostPutRequestDto } from '../dto/catalagoDto/catalagoPostPutRequestDto';
import { adicionarCatalagoService } from '../services/catalogoService/adicionarCatalagoService';

const router = Router();

router.post('/adicionar', async (req: Request, res: Response) => {
	const catalagoPostPutRequestDto: CatalagoPostPutRequestDto = req.body;
	const result = await adicionarCatalagoService(catalagoPostPutRequestDto);
	if (result) {
		return res.status(201).json(result);
	} else {
		return res.status(404).json({ message: "Empresa nao existe" });
	}
});


export default router;
