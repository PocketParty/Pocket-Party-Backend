import "express-async-errors"
import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { EmpresaGetDeleteRequestDto } from "../src/dto/empresaDto/empresaGetDeleteRequestDto";
import { EmpresaPostPutRequestDto } from "../src/dto/empresaDto/empresaPostPutRequestDto";
import {app,server} from "../src/index"
import { EmpresaLoginRequestDTO } from "../src/dto/empresaDto/EmpresaLoginRequestDTO";
import { EmpresaPatchRequestDto } from "../src/dto/empresaDto/empresaPatchRequestDto";

const prisma = new PrismaClient();
let token:any;

beforeAll(async () => {
	prisma.$connect();
});

beforeEach(async () => {
	await prisma.$executeRaw`TRUNCATE TABLE "enterprises" RESTART IDENTITY CASCADE;`;
	const empresaPostPutRequestDto: EmpresaPostPutRequestDto = {
		"name": "nome fantasia",
		"username": "username fantasia",
		"cnpj": "cnpj fantasia",
		"password_hash": "fantasia",
		"atuacao": [],
		"descricao": null
	}
	await request(app).post('/empresas/adicionar').send(empresaPostPutRequestDto);
	const empresaLoginRequestDTO: EmpresaLoginRequestDTO = {
		'username': 'username fantasia',
		'password_hash': "fantasia"
	}
	const response = await request(app).post('/auth/login/empresa').send(empresaLoginRequestDTO);
	token = response.body;
});

afterEach(async () => {
	await prisma.$executeRaw`TRUNCATE TABLE "enterprises" RESTART IDENTITY CASCADE;`;
});

afterAll(async () => {
	prisma.$disconnect();
	server.close()
});

describe('GET /empresas/pesquisar', () => {
	it('Pesquisa um empresa que existe', async () => {
		const response = await request(app).get('/empresas/pesquisar').set('authorization', `${token}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('cnpj', 'cnpj fantasia');
	});
});

describe('GET /pesquisar/todas', () => {
	it('Pesquisa todas empresa que existe', async () => {
		const response = await request(app).get('/empresas/pesquisar/todas');

		expect(response.status).toBe(200);
		expect(response.body).toBeInstanceOf(Array);
		expect(response.body.length).toBe(1);
	});
});

describe('DELETE /empresas/remover', () => {
	it('Remove uma empresa que existe', async () => {
		const empresaGetDeleteRequestDto: EmpresaGetDeleteRequestDto = {
			'id': 1
		}
		const response = await request(app).delete('/empresas/remover').set('authorization', `${token}`);
		
		expect(response.status).toBe(204);
		expect(response.body).toEqual({});
	});
});
describe('PATCH /edit-empresa/:id', () => {
	it('Atualiza uma empresa que existe', async () => {
		const empresaPatchRequestDto: EmpresaPatchRequestDto = {
			atuacao: [],
			descricao: "descrição"
		}
		const response = await request(app).patch('/empresas/edit-empresa/1').send(empresaPatchRequestDto);
		
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('descricao', 'descrição');
	});
	it('Atualiza uma empresa que não existe', async () => {
		const empresaPatchRequestDto: EmpresaPatchRequestDto = {
			atuacao: [],
			descricao: "descrição"
		}
		const response = await request(app).patch('/empresas/edit-empresa/1000').send(empresaPatchRequestDto);
		
		expect(response.status).toBe(404);
		expect(response.body).toEqual({ message: 'Empresa não exsite!' });
	});
});

describe('POST /empresas/adicionar', () => {
	it('Adiciona uma empresa', async () => {
		const empresaPostPutRequestDto: EmpresaPostPutRequestDto = {
			"name": "nome fantasia 1",
			"username": "username fantasia 1",
			"cnpj": "cep fantasia 1",
			"password_hash": "fantasia 1",
			"atuacao": [],
			"descricao": null
		}
		const response = await request(app).post('/empresas/adicionar').send(empresaPostPutRequestDto);
		
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('enterprise_id');
	});
	it('Adiciona uma empresa com cnpj já existente', async () => {
		const empresaPostPutRequestDto: EmpresaPostPutRequestDto = {
			"name": "nome fantasia",
			"username": "username fantasia",
			"cnpj": "cnpj fantasia",
			"password_hash": "fantasia",
			"atuacao": [],
			"descricao": null
		}
		const response = await request(app).post('/empresas/adicionar').send(empresaPostPutRequestDto);
		
		expect(response.status).toBe(409);
		expect(response.body).toEqual({ message: 'Já existe empresa cadastrada com o mesmo cnpj' });
	});
	it('Adiciona uma empresa com username já existente', async () => {
		const empresaPostPutRequestDto: EmpresaPostPutRequestDto = {
			"name": "nome fantasia",
			"username": "username fantasia",
			"cnpj": "cnpj fantasia 1",
			"password_hash": "fantasia",
			"atuacao": [],
			"descricao": null
		}
		const response = await request(app).post('/empresas/adicionar').send(empresaPostPutRequestDto);
		
		expect(response.status).toBe(409);
		expect(response.body).toEqual({ message: 'UserName ja esta em uso' });
	});
});