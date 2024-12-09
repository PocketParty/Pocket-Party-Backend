import { Request, Response, Router } from 'express';
import { pesquisarEmpresaService } from '../services/empresaServices/pesquisarEmpresaService';
import { adicionarEmpresaService } from '../services/empresaServices/adicionarEmpresaService';
import { removerEmpresaService } from '../services/empresaServices/removerEmpresaService';
import { EmpresaGetDeleteRequestDto } from '../dto/empresaDto/empresaGetDeleteRequestDto';
import { EmpresaPostPutRequestDto } from '../dto/empresaDto/empresaPostPutRequestDto';
import { autenticarTokenEmpresa } from '../middlewares/autenticarTokenEmpresa';
import { EmpresaPatchRequestDto } from '../dto/empresaDto/empresaPatchRequestDto';
import { EditEmpresaService } from '../services/empresaServices/EditEmpresaService';
import { pesquisarTodasEmpresaService } from '../services/empresaServices/pesquisarTodasEmpresaService';
import { pesquisarTodasEmpresaPelaTagService } from '../services/empresaServices/pesquisarTodasEmpresaPelaTagService';

const router = Router();

router.get('/pesquisar', autenticarTokenEmpresa, async (req: Request, res: Response) => {
	const empresaGetDeleteRequestDto: EmpresaGetDeleteRequestDto = req.body.tokenPayload;
	const result = await pesquisarEmpresaService(empresaGetDeleteRequestDto);
	return res.status(200).json(result);
});

router.get('/pesquisar/todas', async (req: Request, res: Response) => {
	const result = await pesquisarTodasEmpresaService();
	return res.status(200).json(result);
});

router.get('/pesquisar/:tag', async (req: Request, res: Response) => {
	const tag = req.params.tag;
	const result = await pesquisarTodasEmpresaPelaTagService(tag);
	return res.status(200).json(result);
});


router.post('/adicionar', async (req: Request, res: Response) => {
	const empresaPostPutRequestDto: EmpresaPostPutRequestDto = req.body;
	const result = await adicionarEmpresaService(empresaPostPutRequestDto);
	return res.status(201).json(result);
});

router.patch('/edit-empresa/:id', async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const empresaPatchRequestDto: EmpresaPatchRequestDto = req.body;
	const result = await EditEmpresaService(id,empresaPatchRequestDto);
	return res.status(201).json(result);
});

router.delete('/remover', autenticarTokenEmpresa, async (req: Request, res: Response) => {
	const empresaGetDeleteRequestDto: EmpresaGetDeleteRequestDto = req.body.tokenPayload;
	await removerEmpresaService(empresaGetDeleteRequestDto);
	return res.status(204).json();
});

export default router;
