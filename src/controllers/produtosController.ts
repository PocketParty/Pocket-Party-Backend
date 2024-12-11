import { Request, Response, Router } from 'express';
import { ProdutoPostPutRequestDto } from '../dto/produtoDto/produtoPostPutRequestDto';
import { adicionarProdutoService } from '../services/produtoService/adicionarProdutoService';
import {getProdutoService} from '../services/produtoService/getProdutoService';
import { getAllProdutoService } from '../services/produtoService/getAllProdutoService';
import { getByTagProdutoService } from '../services/produtoService/getByTagProdutoService';
import { atualizarProdutoService } from '../services/produtoService/atualizarProdutoService';
import { getByEnterpriseIdProdutoService } from '../services/produtoService/getByEnterpriseIdProdutoService ';
import { getByEnterpriseAndByTagProdutoRepository } from '../repositories/produtoRepository';
import { getAllTagsByProdutoService } from '../services/produtoService/getAllTagsByProdutoService';
const router = Router();
//Add produto
router.post('/adicionar', async (req: Request, res: Response) => {
	const produtoPostPutRequestDto: ProdutoPostPutRequestDto = req.body;
	const result = await adicionarProdutoService(produtoPostPutRequestDto);
	return res.status(201).json(result);
});
//get produto por id
router.get('/get/:id',async (req:Request,res:Response) => {
	const result = await getProdutoService(Number(req.params.id));
	return res.status(200).json(result);
});
//get all produtos
router.get('/get',async (req:Request,res:Response) => {
	const result = await getAllProdutoService();
	return res.status(200).json(result)
})
//update
router.post('/atualizar/:id',async (req:Request, res:Response)=>{
	const produtoPostPutRequestDto: ProdutoPostPutRequestDto = req.body;
	const result = await atualizarProdutoService(Number(req.params.id),produtoPostPutRequestDto)
	return res.status(200).json(result)
})
// get by tag id 
router.get('/getByTag/:id',async (req:Request,res:Response)=>{
	const result = await getByTagProdutoService(Number(req.params.id));
	return res.status(200).json(result)
})
// get many by enterprise id
router.get('/getByEnterprise/:id',async(req:Request,res:Response)=>{
	const result = await getByEnterpriseIdProdutoService(Number(req.params.id));
	return res.status(200).json(result)
})
// get many vy enterprise id and tag id
router.get('/getByEnterprise/:id/byTag/:tagId',async(req:Request,res:Response)=>{
	const result = await getByEnterpriseAndByTagProdutoRepository(Number(req.params.id),Number(req.params.tagId));
	return res.status(200).json(result)
})
// get all tags by produto id
router.get('/getAllTags/:id', async (req:Request,res:Response)=>{
	const result = await getAllTagsByProdutoService(Number(req.params.id));
	return res.status(200).json(result)
})
export default router;
