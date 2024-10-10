import { Request, Response, Router } from 'express';
import { EmpresaLoginRequestDTO } from '../dto/empresaDto/EmpresaLoginRequestDTO';
import { empresaLoginService } from '../services/empresaServices/empresaLoginService';

const router = Router();

router.post('/login/empresa', async (req: Request, res: Response) => {
	const empresaLoginRequestDTO: EmpresaLoginRequestDTO = req.body;
	const result = await empresaLoginService(empresaLoginRequestDTO);
	return res.status(201).json(result);

});

export default router;