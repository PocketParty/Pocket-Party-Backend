import "express-async-errors"
import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import express from 'express';
import empresasController from "../src/controllers/empresasController";
import catalogoControler from "../src/controllers/catalogosController";
import produtoController from "../src/controllers/produtosController";
import { errorMiddleware } from "../src/middlewares/error";
import { EmpresaGetDeleteRequestDto } from "../src/dto/empresaDto/empresaGetDeleteRequestDto";
import { EmpresaContatoPatchRequestDto } from "../src/dto/empresaDto/empresaContatoPatchRequestDto";
import { EmpresaPostPutRequestDto } from "../src/dto/empresaDto/empresaPostPutRequestDto";

const app = express();
app.use(express.json());
app.use('/empresas', empresasController);
app.use('/catalogos', catalogoControler);
app.use('/produtos', produtoController);
app.use(errorMiddleware)
const server = app.listen(process.env.PORT, () => {
	console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
	console.log(`url = env(${process.env.DATABASE_URL})`)
});

const prisma = new PrismaClient();

beforeAll(async () => {
	prisma.$connect();
});

beforeEach(async () => {
	await prisma.$executeRaw`DELETE FROM Empresas;`
	await prisma.$executeRaw`DELETE FROM Catalogos;`
	await prisma.$executeRaw`DELETE FROM Produtos;`
	await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Empresas';`
	await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Catalogos';`
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
});

afterEach(async () => {
	await prisma.$executeRaw`DELETE FROM Empresas;`
	await prisma.$executeRaw`DELETE FROM Catalogos;`
	await prisma.$executeRaw`DELETE FROM Produtos;`
	await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Empresas';`
	await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Catalogos';`
	await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Produtos';`
});

afterAll(async () => {
	prisma.$disconnect();
	server.close()
});

describe('GET /empresas/pesquisar', () => {
	it('Pesquisa um empresa que nao existe', async () => {
		const empresaGetDeleteRequestDto: EmpresaGetDeleteRequestDto = {
			'id': 100
		}
		const response = await request(app).get('/empresas/pesquisar').send(empresaGetDeleteRequestDto);

		expect(response.status).toBe(404);
		expect(response.body).toEqual({ message: 'Empresa não exsite!' });
	});
	it('Pesquisa um empresa que existe', async () => {
		const empresaGetDeleteRequestDto: EmpresaGetDeleteRequestDto = {
			'id': 1
		}
		const response = await request(app).get('/empresas/pesquisar').send(empresaGetDeleteRequestDto);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('cnpj', 'cnpj fantasia');
	});
});

describe('DELETE /empresas/remover', () => {
	it('Remove uma empresa que nao existe', async () => {
		const empresaGetDeleteRequestDto: EmpresaGetDeleteRequestDto = {
			'id': 100
		}
		const response = await request(app).delete('/empresas/remover').send(empresaGetDeleteRequestDto);

		expect(response.status).toBe(404);
		expect(response.body).toEqual({ message: 'Empresa não exsite!' });
	});
	it('Remove uma empresa que existe', async () => {
		const empresaGetDeleteRequestDto: EmpresaGetDeleteRequestDto = {
			'id': 1
		}
		const response = await request(app).delete('/empresas/remover').send(empresaGetDeleteRequestDto);
		
		expect(response.status).toBe(204);
		expect(response.body).toEqual({});
	});
});

describe('PATCH /empresas/atualizar/contato', () => {
	it('Atualiza o contato de uma empresa que não existe', async () => {
		const empresaContatoPatchRequestDto: EmpresaContatoPatchRequestDto = {
			'id': 100,
			'telefone': 'telefone novo'
		}
		const response = await request(app).patch('/empresas/atualizar/contato').send(empresaContatoPatchRequestDto);
		
		expect(response.status).toBe(404);
		expect(response.body).toEqual({ message: 'Empresa não exsite!' });
	});
	it('Atualiza o contato de uma empresa que existe', async () => {
		const empresaContatoPatchRequestDto: EmpresaContatoPatchRequestDto = {
			'id': 1,
			'telefone': 'telefone novo'
		}
		const response = await request(app).patch('/empresas/atualizar/contato').send(empresaContatoPatchRequestDto);
		
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('telefone', 'telefone novo');
	});
});

describe('POST /empresas/adicionar', () => {
	it('Adiciona uma empresa', async () => {
		const empresaPostPutRequestDto: EmpresaPostPutRequestDto = {
			"nome": "nome string",
			"endereco": "endereco string",
			"telefone": "contato string",
			"cnpj": "cnpj string",
			"email": "email string",
			"username": "username string",
			"cep": "cep string",
			"senha": "123"
		}
		const response = await request(app).post('/empresas/adicionar').send(empresaPostPutRequestDto);
		
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('id');
	});
	it('Adiciona uma empresa já existente', async () => {
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
		const response = await request(app).post('/empresas/adicionar').send(empresaPostPutRequestDto);
		
		expect(response.status).toBe(404);
		expect(response.body).toEqual({ message: 'Já existe empresa cadastrada com o mesmo cnpj' });
	});
});