import { Request, Response, Router } from 'express';
import { ProdutoPostPutRequestDto } from '../dto/produtoDto/produtoPostPutRequestDto';
import { adicionarProdutoService } from '../services/produtoService/adicionarProdutoService';

const router = Router();

router.post('/adicionar', async (req: Request, res: Response) => {
	const produtoPostPutRequestDto: ProdutoPostPutRequestDto = req.body;
	const result = await adicionarProdutoService(produtoPostPutRequestDto);
	return res.status(201).json(result);
});


export default router;
