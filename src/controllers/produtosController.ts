import { Request, Response, Router } from 'express';
import { ProdutoPostPutRequestDto } from '../dto/produtoDto/produtoPostPutRequestDto';
import { adicionarProdutoService } from '../services/produtoService/adicionarProdutoService';
import {getProdutoService} from '../services/produtoService/getProdutoService';
import { getAllProdutoService } from '../services/produtoService/getAllProdutoService';
import { atualizarProdutoRepository } from '../repositories/produtoRepository';
import { atualizarProdutoService } from '../services/produtoService/atualizarProdutoService';
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
router.get('/get',async (req:Request,res:Response) => {
	const result = await getAllProdutoService();
	return res.status(200).json(result)
})
router.post('/atualizar/:id',async (req:Request, res:Response)=>{
	const produtoPostPutRequestDto: ProdutoPostPutRequestDto = req.body;
	const result = await atualizarProdutoService(Number(req.params.id),produtoPostPutRequestDto)
})
export default router;
