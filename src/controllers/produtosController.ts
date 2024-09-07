import { Request, Response, Router } from 'express';
import { ProdutoPostPutRequestDto } from '../dto/produtoDto/produtoPostPutRequestDto';
import { adicionarProdutoService } from '../services/produtoService/adicionarProdutoService';
import {getProdutoService} from '../services/produtoService/getProdutoService';
const router = Router();

router.post('/adicionar', async (req: Request, res: Response) => {
	const produtoPostPutRequestDto: ProdutoPostPutRequestDto = req.body;
	const result = await adicionarProdutoService(produtoPostPutRequestDto);
	return res.status(201).json(result);
});
router.get('/get/:id',async (req:Request,res:Response) => {
	const result = await getProdutoService(Number(req.params.id));
	return res.status(200).json(result);
});

export default router;
