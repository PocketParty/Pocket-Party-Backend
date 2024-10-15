import "express-async-errors"
import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { EmpresaGetDeleteRequestDto } from "../src/dto/empresaDto/empresaGetDeleteRequestDto";
import { EmpresaContatoPatchRequestDto } from "../src/dto/empresaDto/empresaContatoPatchRequestDto";
import { EmpresaPostPutRequestDto } from "../src/dto/empresaDto/empresaPostPutRequestDto";
import {app,server} from "../src/index"
import { EmpresaLoginRequestDTO } from "../src/dto/empresaDto/EmpresaLoginRequestDTO";

const prisma = new PrismaClient();
let token:any;

beforeAll(async () => {
	prisma.$connect();
});

beforeEach(async () => {
	await prisma.$executeRaw`TRUNCATE TABLE "Empresas" RESTART IDENTITY CASCADE;`;
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
	await request(app).post('/empresas/adicionar').send(empresaPostPutRequestDto);
	const empresaLoginRequestDTO: EmpresaLoginRequestDTO = {
		'username': 'username fantasia',
		'senha': 'fantasia'
	}
	const response = await request(app).post('/auth/login/empresa').send(empresaLoginRequestDTO);
	token = response.body;
});

afterEach(async () => {
	await prisma.$executeRaw`TRUNCATE TABLE "Empresas" RESTART IDENTITY CASCADE;`;
});

afterAll(async () => {
	prisma.$disconnect();
	server.close()
});

describe('GET /empresas/pesquisar', () => {
	it('Pesquisa um empresa que existe', async () => {
		const response = await request(app).get('/empresas/pesquisar').set('Authorization', `${token}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('cnpj', 'cnpj fantasia');
	});
});

describe('DELETE /empresas/remover', () => {
	it('Remove uma empresa que existe', async () => {
		const empresaGetDeleteRequestDto: EmpresaGetDeleteRequestDto = {
			'id': 1
		}
		const response = await request(app).delete('/empresas/remover').set('Authorization', `${token}`);
		
		expect(response.status).toBe(204);
		expect(response.body).toEqual({});
	});
});

describe('PATCH /empresas/atualizar/contato', () => {
	it('Atualiza o contato de uma empresa que existe', async () => {
		const empresaContatoPatchRequestDto: EmpresaContatoPatchRequestDto = {
			'telefone': 'telefone novo'
		}
		const response = await request(app).patch('/empresas/atualizar/contato').send(empresaContatoPatchRequestDto).set('Authorization', `${token}`);;
		
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