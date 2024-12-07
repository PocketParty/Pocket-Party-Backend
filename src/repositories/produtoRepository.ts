import { PrismaClient } from '@prisma/client';
import { Produto } from '../models/produtosModel';

const prisma = new PrismaClient();

export const adicionarProdutoRepository = async (produto: Produto): Promise<Produto | null> => {
	const { id,enterprise_id,name,price,photo_url,description } = produto
	let now = Date.now
	const resultProduto = await prisma.produtos.create({
		data: {
			id,
			enterprise_id,
			name,
			price,
			photo_url,
			description,
			created_at:now,
			updated_at:now
		}
	})
	return resultProduto;
};

export const removerProdutoRepository = async (id_prod: number): Promise<Produto | null> => {
	const resultProduto = await prisma.produtos.delete({
		where: {
			id_prod
		}
	})
	return resultProduto;
};

export const getProdutoRepository = async (id_prod:number): Promise<Produto | null> =>{
	const resultProduto = await prisma.produtos.findUnique({
		where: {
			id:id_prod
		}
	})
	return resultProduto
};

export const getProdutoByEnterpriseRepository = async (ent_id:number): Promise<Produto[] | null> =>{
	const resultProduto = await prisma.produtos.findMany({
		where: {
			enterprise_id:ent_id
		}
	})
	return resultProduto
};

export const getAllProdutoRepository = async (): Promise<Produto[]|null> => {
	const resultProduto = await prisma.produtos.findMany()
	return resultProduto;
}

export const atualizarProdutoRepository = async(id_prod: number, produto:Produto):Promise<Produto|null> => {
	const resutlProduto = await prisma.produtos.update({
		where:{ 
			id:id_prod
		}, data:{
			name: produto.name,
			price: produto.price,
			photo_url: produto.photo_url,
			description: produto.description,
			updated_at: Date.now
		}
	})
	return resutlProduto;
}

export const getByTagProdutoRepository = async(tag_id:number):Promise<Produto[]|null> =>{
	const resultProduto = await prisma.produtos.findMany({
		where:{
			tags:{
				some:{
					tag_id:tag_id
				}
			}
		}
	})
	return resultProduto;
}

export const getByEnterpriseAndByTagProdutoRepository = async(ent_id:number,tag_id:number):Promise<Produto[]|null> =>{
	const resultProduto = await prisma.produtos.findMany({
		where:{
			enterprise_id:ent_id,
			tags:{
				some:{
					tag_id:tag_id
				}
			}
		}
	})
	return resultProduto;
}