import { PrismaClient } from '@prisma/client';
import { Produto } from '../models/produtosModel';

const prisma = new PrismaClient();

export const adicionarProdutoRepository = async (produto: Produto): Promise<Produto | null> => {
	const { catalogoId, imagem, preco, notaAvaliacao, descricao, tags } = produto
	const resultProduto = await prisma.produtos.create({
		data: {
			catalogoId,
			imagem,
			preco,
			notaAvaliacao,
			descricao,
			tags,
		}
	})
	return resultProduto;
};

export const removerProdutoRepository = async (id: number): Promise<Produto | null> => {
	const resultProduto = await prisma.produtos.delete({
		where: {
			id
		}
	})
	return resultProduto;
};

export const getProdutoRepository = async (id:number): Promise<Produto | null> =>{
	const resultProduto = await prisma.produtos.findUnique({
		where: {
			id
		}
	})
	return resultProduto
};

export const getAllProdutoRepository = async (): Promise<Produto[]|null> => {
	const resultProduto = await prisma.produtos.findMany()
	return resultProduto;
}

export const atualizarProdutoRepository = async(id: number, produto:Produto):Promise<Produto|null> => {
	const resutlProduto = await prisma.produtos.update({
		where:{ 
			id 
		}, data:{
			tags: produto.tags,
			preco: produto.preco,
			notaAvaliacao: produto.notaAvaliacao,
			descricao: produto.descricao,
			imagem: produto.imagem
		}
	})
	return resutlProduto;
}