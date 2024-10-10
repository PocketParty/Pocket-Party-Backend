import { Request, Response, Router } from 'express';
import { pesquisarEmpresaService } from '../services/empresaServices/pesquisarEmpresaService';
import { atualizarContatoEmpresaService } from '../services/empresaServices/atualizarContatoEmpresaService';
import { adicionarEmpresaService } from '../services/empresaServices/adicionarEmpresaService';
import { removerEmpresaService } from '../services/empresaServices/removerEmpresaService';
import { EmpresaGetDeleteRequestDto } from '../dto/empresaDto/empresaGetDeleteRequestDto';
import { EmpresaPostPutRequestDto } from '../dto/empresaDto/empresaPostPutRequestDto';
import { EmpresaContatoPatchRequestDto } from '../dto/empresaDto/empresaContatoPatchRequestDto';
import { autenticarTokenEmpresa } from '../middlewares/autenticarTokenEmpresa';

const router = Router();

router.get('/pesquisar', autenticarTokenEmpresa, async (req: Request, res: Response) => {
	const empresaGetDeleteRequestDto: EmpresaGetDeleteRequestDto = req.body.tokenPayload;
	const result = await pesquisarEmpresaService(empresaGetDeleteRequestDto);
	return res.status(200).json(result);
});


router.post('/adicionar', async (req: Request, res: Response) => {
	const empresaPostPutRequestDto: EmpresaPostPutRequestDto = req.body;
	const result = await adicionarEmpresaService(empresaPostPutRequestDto);
	return res.status(201).json(result);
});

router.patch('/atualizar/contato', autenticarTokenEmpresa, async (req: Request, res: Response) => {
	const empresaContatoPatchRequestDto: EmpresaContatoPatchRequestDto = req.body;
	const { id } = req.body.tokenPayload;
	const result = await atualizarContatoEmpresaService(empresaContatoPatchRequestDto,id);
	return res.status(201).json(result);
});

router.delete('/remover', autenticarTokenEmpresa, async (req: Request, res: Response) => {
	const empresaGetDeleteRequestDto: EmpresaGetDeleteRequestDto = req.body.tokenPayload;
	await removerEmpresaService(empresaGetDeleteRequestDto);
	return res.status(204).json();
});

export default router;
