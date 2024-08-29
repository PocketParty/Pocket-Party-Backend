import { Request, Response, Router } from 'express';
import { pesquisarEmpresaService } from '../services/empresaServices/pesquisarEmpresaService';
import { atualizarContatoEmpresaService } from '../services/empresaServices/atualizarContatoEmpresaService';
import { adicionarEmpresaService } from '../services/empresaServices/adicionarEmpresaService';
import { removerEmpresaService } from '../services/empresaServices/removerEmpresaService';
import { EmpresaGetDeleteRequestDto } from '../dto/empresaDto/empresaGetDeleteRequestDto';
import { EmpresaPostPutRequestDto } from '../dto/empresaDto/empresaPostPutRequestDto';
import { EmpresaContatoPatchRequestDto } from '../dto/empresaDto/empresaContatoPatchRequestDto';

const router = Router();

router.get('/pesquisar', async (req: Request, res: Response) => {
	const empresaGetDeleteRequestDto: EmpresaGetDeleteRequestDto = req.body;
	const result = await pesquisarEmpresaService(empresaGetDeleteRequestDto);
	return res.status(200).json(result);
});


router.post('/adicionar', async (req: Request, res: Response) => {
	const empresaPostPutRequestDto: EmpresaPostPutRequestDto = req.body;
	const result = await adicionarEmpresaService(empresaPostPutRequestDto);
	return res.status(201).json(result);
});

router.patch('/atualizar/contato', async (req: Request, res: Response) => {
	const empresaContatoPatchRequestDto: EmpresaContatoPatchRequestDto = req.body;
	const result = await atualizarContatoEmpresaService(empresaContatoPatchRequestDto);
	return res.status(201).json(result);
});

router.delete('/remover', async (req: Request, res: Response) => {
	const empresaGetDeleteRequestDto: EmpresaGetDeleteRequestDto = req.body;
	await removerEmpresaService(empresaGetDeleteRequestDto);
	return res.status(204).json();
});

export default router;
