import { PrismaClient } from '@prisma/client';
import { Produto } from '../models/produtosModel';
import { ProdutoPatchReqDTO } from '../dto/produtoDto/produtoPatchReqDTO';

const prisma = new PrismaClient();

export const adicionarProdutoRepository = async (produto: Produto): Promise<Produto | null> => {
	const resultProduto = await prisma.products.create({
		data: {
			...produto	
		}
	})
	return resultProduto;
};

export const removerProdutoRepository = async (product_id: number): Promise<Produto | null> => {
	const resultProduto = await prisma.products.delete({
		where: {
			product_id
		}
	})
	return resultProduto;
};

export const getProdutoRepository = async (product_id:number): Promise<Produto | null> =>{
	const resultProduto = await prisma.products.findUnique({
		where: {
			product_id
		}
	})
	return resultProduto
};

export const getProdutoByEnterpriseRepository = async (enterprise_id:number): Promise<Produto[] | null> =>{
	const resultProduto = await prisma.products.findMany({
		where: {
			enterprise_id
		}
	})
	return resultProduto
};

export const getAllProdutoRepository = async (): Promise<Produto[]|null> => {
	const resultProduto = await prisma.products.findMany()
	return resultProduto;
}

export const atualizarProdutoRepository = async(product_id: number, produtoPatchReqDTO:ProdutoPatchReqDTO):Promise<Produto|null> => {
	const {name,price,photo_url,description,tags} = produtoPatchReqDTO
	const resutlProduto = await prisma.products.update({
		where:{ 
			product_id
		}, 
		data:{
			name: name,
			price: price,
			photo_url: photo_url,
			description: description,
			updated_at: String(Date.now),
			product_tags:{
				create: tags.map((tag)=>({
					tags: {
						connect:{
							tag_name: tag,
						},
					},
				})),
			},
		},
		include: {product_tags: {include: { tags: true}}}
	})
	return resutlProduto;
}

export const getByTagProdutoRepository = async(tagName:string):Promise<Produto[]|null> =>{
	
	const resultProduto = await prisma.products.findMany({
		where:{
			product_tags:{
				some:{
					tags:{
						tag_name: tagName,
					},
				},
			},
		},
		include: {
			product_tags:{
				include:{
					tags:true
				},
			},
		},
	})
	return resultProduto;
}

export const getByEnterpriseAndByTagProdutoRepository = async(ent_id:number,tagName:string):Promise<Produto[]|null> =>{
	const resultProduto = await prisma.products.findMany({
		where:{
			enterprise_id:ent_id,
			product_tags:{
				some:{
					tags:{
						tag_name: tagName,
					},
				},
			},
		},
		include: {
			product_tags:{
				include:{
					tags:true
				},
			},
		},
	})
	return resultProduto;
}