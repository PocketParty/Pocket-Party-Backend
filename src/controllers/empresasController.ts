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
	const empresaGetDeleteRequestDto: EmpresaGetDeleteRequestDto = req.body;
	const result = await pesquisarEmpresaService(empresaGetDeleteRequestDto);
	if (result) {
		return res.status(200).json(result);
	} else {
		return res.status(404).json({ message: "Empresa não encontrada" });
	}
});

router.get('/pesquisar/todas', async (req: Request, res: Response) => {
	const result = await pesquisarTodasEmpresaService();
	if (result?.length != 0) {
		return res.status(200).json(result);
	} else {
		return res.status(404).json({ message: "Não existe empresa cadastrada" });
	}
});

router.post('/adicionar', async (req: Request, res: Response) => {
	const empresaPostPutRequestDto: EmpresaPostPutRequestDto = req.body;
	const result = await adicionarEmpresaService(empresaPostPutRequestDto);
	if (result) {
		return res.status(201).json(result);
	} else {
		return res.status(404).json({ message: "Empresa com cnpj já existente" });
	}
});

router.patch('/atualizar/contato', async (req: Request, res: Response) => {
	const empresaContatoPatchRequestDto: EmpresaContatoPatchRequestDto = req.body;
	const result = await atualizarContatoEmpresaService(empresaContatoPatchRequestDto);
	if (result) {
		return res.status(201).json(result);
	} else {
		return res.status(404).json({ message: 'Empresa não encontrada' });
	}
});

router.delete('/remover', async (req: Request, res: Response) => {
	const empresaGetDeleteRequestDto: EmpresaGetDeleteRequestDto = req.body;
	const result = await removerEmpresaService(empresaGetDeleteRequestDto);
	if (result) {
		return res.status(204).json(result);
	} else {
		return res.status(404).json({ message: 'Empresa não encontrada' });
	}
});

export default router;
