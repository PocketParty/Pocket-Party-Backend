import { Request, Response, Router } from 'express';
import { Empresa } from '../models/empresaModel';
import { pesquisarEmpresaService } from '../services/empresaServices/pesquisarEmpresaService';
import { atualizarContatoEmpresaService } from '../services/empresaServices/atualizarContatoEmpresaService';
import { adicionarEmpresaService } from '../services/empresaServices/adicionarEmpresaService';
import { removerEmpresaService } from '../services/empresaServices/removerEmpresaService';

const router = Router();

router.get('/pesquisar/empresa', async (req: Request, res: Response) => {
  const idEmpresa = req.body.id;
  const result = await pesquisarEmpresaService(idEmpresa);
  if (result) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json({ message: "Empresa não encontrada" });
  }
});

router.post('/adicionar/empresa', async (req: Request, res: Response) => {
  const empresa:Empresa = req.body;
  const result = await adicionarEmpresaService(empresa);	
  if (result) {
    return res.status(201).json(result);
  } else {
    return res.status(404).json({ message: "Empresa com cnpj já existente" });
  }
});

router.patch('/atualizar/empresa/contato', async (req: Request, res: Response) => {
  const idEmpresa = req.body.id;
  const contato = req.body.contato;
  const result = await atualizarContatoEmpresaService(idEmpresa,contato);
  if (result) {
    return res.status(201).json(result);
  } else {
    return res.status(404).json({ message: 'Empresa não encontrada' });
  }
});

router.delete('/deletar/empresa/', async (req: Request, res: Response) => {
	const idEmpresa = req.body.id;
	const result = await removerEmpresaService(idEmpresa);
	if (result) {
	  return res.status(204).json(result);
	} else {
	  return res.status(404).json({ message: 'Empresa não encontrada' });
	}
  });

export default router;
