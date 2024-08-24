import { Request, Response, Router } from 'express';
import { pesquisarEmpresaService } from '../services/empresaServices/pesquisarEmpresaService';
import { atualizarContatoEmpresaService } from '../services/empresaServices/atualizarContatoEmpresaService';
import { adicionarEmpresaService } from '../services/empresaServices/adicionarEmpresaService';
import { removerEmpresaService } from '../services/empresaServices/removerEmpresaService';
import { EmpresaGetDeleteRequestDto } from '../dto/empresaDto/empresaGetDeleteRequestDto';
import { EmpresaPostPutRequestDto } from '../dto/empresaDto/empresaPostPutRequestDto';
import { EmpresaContatoPatchRequestDto } from '../dto/empresaDto/empresaContatoPatchRequestDto';
import { pesquisarTodasEmpresaService } from '../services/empresaServices/pesquisarTodasEmpresasService';

const router = Router();

router.get('/pesquisar', async (req: Request, res: Response) => {
	try {
		const empresaGetDeleteRequestDto: EmpresaGetDeleteRequestDto = req.body;
		const result = await pesquisarEmpresaService(empresaGetDeleteRequestDto);
		return res.status(200).json(result);
	} catch (error: any) {
		return res.status(error.statusCode).json({ message: error.message });
	}
});

router.get('/pesquisar/todas', async (req: Request, res: Response) => {
	try {
		const result = await pesquisarTodasEmpresaService();
		return res.status(200).json(result);
	} catch (error: any) {
		return res.status(error.statusCode).json({ message: error.message });
	}
});

router.post('/adicionar', async (req: Request, res: Response) => {
	try {
		const empresaPostPutRequestDto: EmpresaPostPutRequestDto = req.body;
		const result = await adicionarEmpresaService(empresaPostPutRequestDto);
		return res.status(201).json(result);
	} catch (error: any) {
		return res.status(error.statusCode).json({ message: error.message });
	}
});

router.patch('/atualizar/contato', async (req: Request, res: Response) => {
	try {
		const empresaContatoPatchRequestDto: EmpresaContatoPatchRequestDto = req.body;
		const result = await atualizarContatoEmpresaService(empresaContatoPatchRequestDto);
		return res.status(201).json(result);
	} catch (error: any) {
		return res.status(error.statusCode).json({ message: error.message });
	}
});

router.delete('/remover', async (req: Request, res: Response) => {
	try {
		const empresaGetDeleteRequestDto: EmpresaGetDeleteRequestDto = req.body;
		await removerEmpresaService(empresaGetDeleteRequestDto);
		return res.status(204).json();

	} catch (error: any) {
		return res.status(error.statusCode).json({ message: error.message });
	}
});

export default router;
