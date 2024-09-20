import "express-async-errors";
import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import {app,server} from "../src/index"
import { EmpresaPostPutRequestDto } from "../src/dto/empresaDto/empresaPostPutRequestDto";
import { ProdutoPostPutRequestDto } from "../src/dto/produtoDto/produtoPostPutRequestDto";
import { CatalagoPostPutRequestDto } from "../src/dto/catalagoDto/catalagoPostPutRequestDto";


const prisma = new PrismaClient();

beforeAll(async () => {
	prisma.$connect();
});
beforeEach(async () => {
	await prisma.$executeRaw`DELETE FROM Catalogos;`
	await prisma.$executeRaw`DELETE FROM Empresas;`
	await prisma.$executeRaw`DELETE FROM Produtos;`
	await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Catalogos';`
	await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Empresas';`
	await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Produtos';`
	const empresaPostPutRequestDto: EmpresaPostPutRequestDto = {
		"nome": "nome fantasia",
		"endereco": "endereco fantasia",
		"telefone": "contato fantasia",
		"cnpj": "cnpj fantasia",
		"email": "email fantasia",
		"username": "username fantasia",
		"cep": "cep fantasia",
		"senha": "fantasia"
	}
	await prisma.empresas.create({
		data: {
			...empresaPostPutRequestDto
		}
	});
	const empresa = await prisma.empresas.findFirstOrThrow()
	
	const catalagoPostPutRequestDto: CatalagoPostPutRequestDto = {
		"empresaId":empresa.id,
		"quantidade":1
	}
	await prisma.catalogos.create({
		data:{
			...catalagoPostPutRequestDto
		}
	})
});


afterEach(async () => {
	await prisma.$executeRaw`DELETE FROM Catalogos;`
	await prisma.$executeRaw`DELETE FROM Empresas;`
	await prisma.$executeRaw`DELETE FROM Produtos;`
	await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Catalogos';`
	await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Empresas';`
	await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Produtos';`

});

afterAll(async () => {
	prisma.$disconnect();
	server.close()
});

describe('POST /produtos/adicionar',() => {
	it('Adicionar um produto', async () =>{
		const produtoPostPutResquestDto: ProdutoPostPutRequestDto = {
			"catalogoId": 1,
			"preco":10.1,
			"notaAvaliacao":4.0,
			"imagem":"0",
			"tags":"tag1",
			"descricao":'descricao'
		}
		const response = await request(app).post("/produtos/adicionar").send(produtoPostPutResquestDto);
		console.log(response)
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('preco');
	})
})