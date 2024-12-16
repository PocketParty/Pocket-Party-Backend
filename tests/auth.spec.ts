import request from 'supertest';
import Jwt from 'jsonwebtoken';
import { app, server } from '../src/index';
import { PrismaClient } from '@prisma/client';
import { EmpresaPostPutRequestDto } from '../src/dto/empresaDto/empresaPostPutRequestDto';
import { EmpresaLoginRequestDTO } from '../src/dto/empresaDto/EmpresaLoginRequestDTO';

const prisma = new PrismaClient();

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

});

afterEach(async () => {
	await prisma.$executeRaw`TRUNCATE TABLE "enterprises" RESTART IDENTITY CASCADE;`;
});

afterAll(async () => {
	prisma.$disconnect();
	server.close()
});

describe('POST /auth/login/empresa', () => {
	it('Login realizado com sucesso', async () => {
		const empresaLoginRequestDTO: EmpresaLoginRequestDTO = {
			'username': 'username fantasia',
			'senha': "fantasia"
		}
		const response = await request(app).post('/auth/login/empresa').send(empresaLoginRequestDTO);
		expect(response.status).toBe(201);
		const decoded = Jwt.verify(response.body, process.env.SECRET!);
		expect(decoded).toEqual(expect.objectContaining({ username: 'username fantasia', id: 1 }));
	});
	it('Login passado incorreto', async () => {
		const empresaLoginRequestDTO: EmpresaLoginRequestDTO = {
			'username': 'username fant',
			'senha': "fantasia"
		}
		const response = await request(app).post('/auth/login/empresa').send(empresaLoginRequestDTO);
		expect(response.status).toBe(401);
		expect(response.body).toEqual({ message: 'Login ou senha incorretos!' });
	});
	it('Senha passado incorreto', async () => {
		const empresaLoginRequestDTO: EmpresaLoginRequestDTO = {
			'username': 'username fantasia',
			'senha': "fant"
		}
		const response = await request(app).post('/auth/login/empresa').send(empresaLoginRequestDTO);
		expect(response.status).toBe(401);
		expect(response.body).toEqual({ message: 'Login ou senha incorretos!' });
	});
});